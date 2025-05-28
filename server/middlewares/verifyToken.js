import jwt from "jsonwebtoken";
import { createError } from "../error.js";

// Token verification middleware
export const verifyToken = (req, res, next) => {
  const token = req.cookies?.access_token;

  if (!token) {
    return next(createError(401, "Authentication required."));
  }

  // Verify the token using JWT secret key
  jwt.verify(token, process.env.JWT, (err, decodedData) => {
    if (err) {
      return next(createError(403, "Invalid or expired token."));
    }

    req.user = decodedData;
    next();
  });
};