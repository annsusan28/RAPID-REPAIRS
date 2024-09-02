import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import connection from "../db/connection";

const validateToken = (req: Request, res: Response, next: NextFunction) => {
  const headerToken = req.headers["authorization"];
  if (headerToken != undefined && headerToken.startsWith("Bearer ")) {
    const bearerToken = headerToken.slice(7);
    try {
      const tokenValid = jwt.verify(
        bearerToken,
        process.env.SECRET_KEY || "johnWick123"
      );
      next();
    } catch (error) {
      res.status(400).json({
        error: "Invalid Token",
      });
    }
  } else {
    res.status(400).json({
      error: "Access Denied: Token must be provided in the header",
    });
  }
};

export const getCurrentUser = async (req: Request, res: Response) => {
  const headerToken = req.headers["authorization"];
  const db = await connection();
  if (headerToken != undefined && headerToken.startsWith("Bearer ")) {
    const bearerToken = headerToken.slice(7);
    try {
      const decodedToken = jwt.decode(bearerToken);
      const email = decodedToken.email;

      let query = "";

      if (decodedToken.userType === "admin") {
        query = "SELECT id,name,email,userType FROM users WHERE email = ?";
      } else if (decodedToken.userType === "customer") {
        query = "SELECT * FROM customer_details WHERE email = ?";
      } else if (decodedToken.userType === "service_provider") {
        query = "SELECT * FROM service_provider_details WHERE email = ?";
      }

      const [rows] = await db.execute(query, [email]);
      if (decodedToken.userType === "admin") {
        res.status(200).json(rows[0]);
      } else {
        res.status(200).json({
          ...rows[0],
          userType: decodedToken.userType,
        });
      }
    } catch (error) {
      res.status(400).json({
        error: "Invalid Token",
      });
    }
  } else {
    res.status(400).json({
      error: "Access Denied: Token must be provided in the header",
    });
  }
};

export function authGuard(permissions: string[]) {
  return (req: Request, res: Response, next: NextFunction) => {
    const headerToken = req.headers["authorization"];
    const bearerToken = headerToken.slice(7);
    try {
      const decodedToken = jwt.decode(bearerToken);
      if (decodedToken && permissions.includes(decodedToken.userType)) next();
      else
        res.status(403).json({
          error: "Permission denied",
        });
    } catch (error) {
      res.status(400).json({
        error: "Invalid Token",
      });
    }
  };
}

export default validateToken;
