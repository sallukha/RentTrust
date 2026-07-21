import express from "express";
import { getOwnerDashboard } from "../controllers/owner.controller.js"


const router=express.Router();

router.get("/dashboard", getOwnerDashboard)

export default router;