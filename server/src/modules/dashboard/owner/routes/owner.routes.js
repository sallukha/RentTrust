import express from "express";
import { getOwnerDashboard } from "../controllers/owner.controller.js"
import { protect, requireRole } from "../../../../middlewares/auth.middleware.js";


const router=express.Router();

router.get("/dashboard", protect, requireRole("landlord", "admin"), getOwnerDashboard)

export default router;
