import express from "express";
import {signUp, signIn} from "../controllers/auth.js";

const router = express.Router();

// AUTH ROUTES
router.post("/signup", signUp);   // Register a new user

router.post("/signin", signIn);   // Login user

export default router;