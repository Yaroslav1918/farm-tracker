// lib/auth.ts
import jwt from "jsonwebtoken";

type UserPayload = {
  id: string;
  email: string;
};

export function verifyToken(token: string): UserPayload | null {
  try {
    return jwt.verify(token, process.env.JWT_SECRET!) as UserPayload;
  } catch {
    return null;
  }
}
