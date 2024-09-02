import { Request, Response } from "express";
import connection from "../db/connection";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import mysql from "mysql2/promise";
import dayjs from "dayjs";

export const addUser = async (req: Request, res: Response) => {
  const { name, email, password, userType } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);

  const db = await connection();

  try {
    const [existingUser] = await db.query<mysql.ResultSetHeader>(
      "SELECT * FROM users WHERE email = ?",
      [email]
    );

    if (existingUser[0] !== undefined) {
      return res.status(400).json({
        error: "Email is already in use",
      });
    }

    db.beginTransaction();
    const [userResult] = await db.query<mysql.ResultSetHeader>(
      "INSERT INTO users (name, email, password, userType) VALUES (?, ?, ?, ?)",
      [name, email, hashedPassword, userType]
    );
    const userId = userResult.insertId;

    if (userType === "service_provider") {
      await db.query(
        "INSERT INTO service_provider_details (user_id, name, email, status) VALUES (?, ?, ?, ?)",
        [userId, name, email, "inactive"]
      );
    } else if (userType === "customer") {
      await db.query(
        "INSERT INTO customer_details (user_id, name, email, status) VALUES (?, ?, ?, ?)",
        [userId, name, email, "active"]
      );
    }

    await db.commit();

    res.json({
      msg: "User added successfully",
    });
  } catch (error) {
    await db.rollback();
    console.error("Error adding user and details:", error);
    res.status(500).json({ msg: "Error adding user and details" });
  }
};

export const loginUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const db = await connection();

    const [rows] = await db.execute("SELECT * FROM users WHERE email = ?", [
      email,
    ]);

    if (Array.isArray(rows) && rows.length === 0) {
      res.status(404).json({
        msg: "No user exists with this email",
      });
    } else {
      const user = rows[0];
      const userPassword = user.password;
      const isMatch = await bcrypt.compare(password, userPassword);
      if (isMatch) {
        const token = jwt.sign(
          {
            email: email,
            userType: user.userType,
            user_id: user.id,
          },
          process.env.SECRET_KEY || "johnWick123",
          { expiresIn: "30d" }
        );
        res.json({
          token,
          userType: user.userType,
          email: user.email,
          name: user.name,
          id: user.id,
        });
      } else {
        res.status(401).json({
          msg: "Incorrect Password",
        });
      }
    }
  } catch (err) {
    console.error("Error during query execution:", err);
    res.status(500).json({ msg: "Internal server error" });
  }
};

export const getUsers = async (req: Request, res: Response) => {
  try {
    const db = await connection();
    const [rows] = await db.query("SELECT id,name,email,userType FROM users");
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getAllCustomerDetails = async (req: Request, res: Response) => {
  try {
    const db = await connection();
    const [rows] = await db.query("SELECT * FROM customer_details");
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateCustomer = async (req: Request, res: Response) => {
  const { userId } = req.params;
  const { name, phone, address, status } = req.body;

  try {
    const db = await connection();

    const sql = `
      UPDATE customer_details
      SET name = ?, phone = ?, address = ?, status = ?
      WHERE user_id = ?
    `;
    const values = [
      name ? name : null,
      phone ? phone : null,
      address ? address : null,
      status ? status : null,
      userId,
    ];

    const [result] = await db.execute<mysql.ResultSetHeader>(sql, values);

    if (result.affectedRows === 0) {
      res.status(404).json({ message: "Customer not found" });
    } else {
      res.json({ message: "Customer updated successfully" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateServiceProvider = async (req: Request, res: Response) => {
  const { userId } = req.params;
  const {
    name,
    email,
    role,
    service_type,
    years_of_experience,
    birth_date,
    city,
    qualification,
    district,
    phone_no,
  } = req.body;

  try {
    const db = await connection();

    const sql = `
      UPDATE service_provider_details
      SET name = ?, email = ?, role = ?, service_type = ?, years_of_experience = ?, birth_date = ?, city = ?, qualification = ?, district = ?, phone_no = ?
      WHERE user_id = ?
    `;
    const values = [
      name ? name : null,
      email ? email : null,
      role ? role : null,
      service_type ? service_type : null,
      years_of_experience ? years_of_experience : null,
      birth_date ? dayjs(birth_date).format("YYYY-MM-DD") : null,
      city ? city : null,
      qualification ? qualification : null,
      district ? district : null,
      phone_no ? phone_no : null,
      userId,
    ];

    const [result] = await db.execute<mysql.ResultSetHeader>(sql, values);

    if (result.affectedRows === 0) {
      res.status(404).json({ message: "Service provider not found" });
    } else {
      res.json({ message: "Service provider updated successfully" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getAllServiceProviders = async (req: Request, res: Response) => {
  try {
    const db = await connection();
    const [rows] = await db.query("SELECT * FROM service_provider_details");
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateServiceProviderStatus = async (
  req: Request,
  res: Response
) => {
  const { userId, status } = req.body;
  try {
    const db = await connection();
    const [result] = await db.execute<mysql.ResultSetHeader>(
      "UPDATE service_provider_details SET status = ? WHERE user_id = ?",
      [status, userId]
    );

    if (result.affectedRows === 0) {
      res.status(404).json({ message: "User not found" });
    } else {
      res.json({ message: "Status updated successfully" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getServiceProviderById = async (req: Request, res: Response) => {
  const userId = req.params.userId;

  try {
    const db = await connection();
    const [rows] = await db.query(
      "SELECT * FROM service_provider_details WHERE user_id = ?",
      [userId]
    );
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getCustomerById = async (req: Request, res: Response) => {
  const userId = req.params.userId;

  try {
    const db = await connection();
    const [rows] = await db.query(
      "SELECT * FROM customer_details WHERE user_id = ?",
      [userId]
    );
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateServiceProviderLocation = async (
  req: Request,
  res: Response
) => {
  const headerToken = req.headers["authorization"];
  const { latitude, longitude } = req.body;
  const bearerToken = headerToken.slice(7);
  try {
    const decodedToken = jwt.decode(bearerToken);
    const db = await connection();
    const [result] = await db.execute<mysql.ResultSetHeader>(
      "UPDATE service_provider_details SET latitude = ?, longitude = ? WHERE email = ?",
      [latitude, longitude, decodedToken.email]
    );

    if (result.affectedRows === 0) {
      res.status(404).json({ message: "User not found" });
    } else {
      res.json({ message: "Location updated successfully" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
