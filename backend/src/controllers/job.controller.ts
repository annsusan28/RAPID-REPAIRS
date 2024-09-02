import { Request, Response } from "express";
import connection from "../db/connection";
import mysql from "mysql2/promise";
import { getDistance } from "geolib";
import { send } from "../mailer";
import { decodeToken } from "../helpers/utils";
import { ServiceProviderDetails } from "../types";
import { generateJobCompletionEmail } from "../templates/completeJobTemplate";
import { generateServiceProviderBookedEmail } from "../templates/createJobTemplate";
import jwt from "jsonwebtoken";
import { generateServiceProviderNotificationEmail } from "../templates/notifyJobTemplate";

export const addJob = async (req: Request, res: Response) => {
  const {
    district,
    city,
    latitude,
    longitude,
    service_type,
    assigned_to_user,
    created_by_user,
  } = req.body;

  const db = await connection();

  try {
    db.beginTransaction();

    const [check] = await db.execute<mysql.RowDataPacket[]>(
      "SELECT * FROM jobs WHERE assigned_to_user = ? AND created_by_user = ? AND status = 'booked' AND service_type = ?",
      [assigned_to_user, created_by_user, service_type]
    );

    if (check.length > 0) {
      res.status(400).json({
        error: "Job already exists",
      });
      return;
    }

    const [data] = await db.query<mysql.RowDataPacket[]>(
      "SELECT * from service_provider_details where user_id = ?",
      [assigned_to_user]
    );

    const [customerData] = await db.query<mysql.RowDataPacket[]>(
      "SELECT * from customer_details where user_id = ?",
      [created_by_user]
    );

    if (data.length < 0 || customerData.length < 0) {
      res.status(400).json({
        error: "Service Provider does not exist",
      });
      return;
    }

    const [result] = await db.query<mysql.ResultSetHeader>(
      "INSERT INTO jobs (district, city, latitude, longitude, service_type, assigned_to_user, created_by_user, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
      [
        district,
        city,
        latitude,
        longitude,
        service_type,
        assigned_to_user,
        created_by_user,
        "booked",
      ]
    );

    const [customer] = await db.query<mysql.ResultSetHeader>(
      "SELECT * from customer_details where user_id = ?",
      [created_by_user]
    );

    await db.commit();

    await send({
      from: process.env.MAIL_USER,
      to: `${customer[0].email}`,
      subject: `${service_type} Booked`,
      text: `Service Provider has been successfully booked for job ${result.insertId}!`,
      html: generateServiceProviderBookedEmail({
        customerName: customer[0].name,
        serviceType: service_type,
        serviceProviderName: data[0].name,
        serviceProviderEmail: data[0].email,
        serviceProviderPhone: data[0].phone_no,
      }),
    });

    await send({
      from: process.env.MAIL_USER,
      to: `${data[0].email}`,
      subject: `${service_type} Booked`,
      text: `You have been successfully booked for job ${result.insertId}!`,
      html: generateServiceProviderNotificationEmail({
        customerName: customer[0].name,
        serviceType: service_type,
        serviceProviderName: data[0].name,
        customerEmail: customer[0].email,
        customerPhone: customer[0].phone,
      }),
    });

    res.status(201).json({
      message: "Job added successfully",
    });
  } catch (error) {
    await db.rollback();
    console.error("Error adding job:", error);
    res.status(500).json({ error: "Error adding job" });
  }
};

export const deleteJob = async (req: Request, res: Response) => {
  const { id } = req.params;
  const db = await connection();

  try {
    db.beginTransaction();

    await db.query("DELETE FROM jobs WHERE id = ?", [id]);

    await db.commit();

    res.status(200).json({ message: "Job deleted successfully" });
  } catch (error) {
    await db.rollback();
    console.error("Error deleting job:", error);
    res.status(500).json({ error: "Error deleting job" });
  }
};

export const completeJob = async (req: Request, res: Response) => {
  const { id } = req.params;
  const db = await connection();

  try {
    db.beginTransaction();

    const [results] = await db.query("SELECT * FROM jobs WHERE job_id = ?", [
      id,
    ]);

    if (results[0].status === "complete") {
      res.status(404).json({ error: "Job already completed" });
      return;
    }

    if (results[0] === undefined) {
      res.status(404).json({ error: "Job not found" });
      return;
    }

    await db.query("UPDATE jobs SET status = ? WHERE job_id = ?", [
      "complete",
      id,
    ]);

    const [customer] = await db.query(
      "SELECT * FROM customer_details WHERE user_id = ?",
      [results[0].created_by_user]
    );

    const [data] = await db.query(
      "SELECT * FROM service_provider_details WHERE user_id = ?",
      [results[0].assigned_to_user]
    );

    await db.commit();

    const token = jwt.sign(
      {
        user_id: results[0].created_by_user,
      },
      process.env.SECRET_KEY || "johnWick123"
    );

    await send({
      from: process.env.MAIL_USER,
      to: `${customer[0].email}`,
      subject: "Job Completed",
      text: "Your job has been successfully completed!",
      html: generateJobCompletionEmail({
        customerName: customer[0].name,
        serviceProviderName: data[0].name,
        serviceType: results[0].service_type,
        feedbackLink: `http://localhost:5173/feedback/${results[0].assigned_to_user}/${token}/${results[0].job_id}`,
      }),
    });
    res.status(200).json({ message: "Job completed successfully" });
  } catch (error) {
    await db.rollback();
    console.error("Error completing job:", error);
    res.status(500).json({ error: "Error completing job" });
  }
};

export const getNearbyServiceProviders = async (
  req: Request,
  res: Response
) => {
  const { district, city, latitude, longitude, serviceType } = req.body;

  try {
    const db = await connection();

    const [rows] = await db.query<mysql.RowDataPacket[]>(
      "SELECT * FROM service_provider_details WHERE (city = ? OR district = ?) AND service_type = ? AND status = 'active'",
      [city, district, serviceType]
    );

    if (rows.length === 0) {
      res.status(404).json({ error: "No service providers found" });
      return;
    }

    const providers = rows as ServiceProviderDetails[];
    const nearbyProviders = providers.filter(
      (provider: ServiceProviderDetails) => {
        const distance = getDistance(
          { latitude: latitude, longitude: longitude },
          { latitude: provider.latitude, longitude: provider.longitude }
        );
        return distance <= 50;
      }
    );

    const mergedProviders = Array.from(
      new Set([...nearbyProviders, ...providers])
    );

    if (mergedProviders.length === 0) {
      res.status(404).json({ error: "No service providers found " });
      return;
    }

    res.status(200).json(mergedProviders);
  } catch (error) {
    console.error("Error fetching nearby jobs:", error);
    res.status(500).json({ error: "Error fetching nearby jobs" });
  }
};

const getQueryForUserType = (
  userType: string
): { userQuery: string; jobQuery: string } => {
  switch (userType) {
    case "admin":
      return {
        userQuery:
          "SELECT id, name, email, userType FROM users WHERE email = ?",
        jobQuery: "SELECT * FROM jobs",
      };
    case "customer":
      return {
        userQuery: "SELECT * FROM customer_details WHERE email = ?",
        jobQuery: `SELECT
                    jobs.*,
                    service_provider_details.name AS service_provider_name,
                    service_provider_details.email AS service_provider_email,
                    service_provider_details.phone_no AS service_provider_phone,
                    service_provider_details.city AS service_provider_city,
                    service_provider_details.district AS service_provider_district,
                    service_provider_details.latitude AS service_provider_latitude,
                    service_provider_details.longitude AS service_provider_longitude
                  FROM jobs
                  JOIN service_provider_details ON jobs.assigned_to_user = service_provider_details.user_id
                  WHERE jobs.created_by_user = ?
                  AND jobs.status IN ('complete', 'booked');`,
      };
    case "service_provider":
      return {
        userQuery: "SELECT * FROM service_provider_details WHERE email = ?",
        jobQuery: `SELECT
                    jobs.*,
                    customer_details.name AS customer_name,
                    customer_details.email AS customer_email,
                    customer_details.phone AS customer_phone
                  FROM jobs
                  JOIN customer_details ON jobs.created_by_user = customer_details.user_id
                  WHERE jobs.assigned_to_user = ?
                  AND jobs.status IN ('booked');`,
      };
    default:
      throw new Error("Invalid user type");
  }
};

export const getMyJobs = async (req: Request, res: Response) => {
  try {
    const headerToken = req.headers["authorization"];
    const decodedToken = decodeToken(headerToken);
    const email = decodedToken.email;
    const userType = decodedToken.userType;

    const { userQuery, jobQuery } = getQueryForUserType(userType);

    const db = await connection();
    const [userRows] = await db.execute(userQuery, [email]);

    if (!userRows[0] === undefined) {
      return res.status(404).json({ error: "User not found" });
    }

    const userId = userRows[0].user_id || userRows[0].id;
    const [jobRows] = await db.execute(jobQuery, [userId]);

    res.status(200).json(jobRows);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
