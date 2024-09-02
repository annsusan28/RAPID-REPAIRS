import { Router } from "express";
import {
  addJob,
  deleteJob,
  getNearbyServiceProviders,
  completeJob,
  getMyJobs,
} from "../controllers/job.controller";
import validateToken from "../middleware/validate-token";

const router = Router();

router.post("/", validateToken, addJob);
router.delete("/:id", validateToken, deleteJob);
router.post("/nearby", validateToken, getNearbyServiceProviders);
router.get("/complete/:id", validateToken, completeJob);
router.get("/my-jobs", validateToken, getMyJobs);

export default router;
