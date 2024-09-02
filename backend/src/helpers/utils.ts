import jwt from "jsonwebtoken";

export const decodeToken = (headerToken: string) => {
  if (headerToken && headerToken.startsWith("Bearer ")) {
    const token = headerToken.slice(7);
    return jwt.decode(token);
  }
  throw new Error("Invalid or missing authorization header");
};
