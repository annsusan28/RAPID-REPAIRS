import { Router } from "express";
import validateToken, { authGuard } from "../middleware/validate-token";
import { validateData } from "../middleware/validationMiddleware";
import {
  addFeedbackSchema,
  updateFeedbackSchema,
} from "../schema/feedbackSchema";
import {
  addFeedback,
  deleteFeedbackByUserId,
  getAllFeedbacks,
  getFeedbackByUserId,
  updateFeedbackByUserId,
} from "../controllers/feedback.controller";

const router = Router();

router.post("/add-feedback", addFeedback);

router.get(
  "/get-feedback",
  validateToken,
  authGuard(["admin"]),
  getAllFeedbacks
);

router.get(
  "/get-my-feedback",
  validateToken,
  authGuard(["admin", "service_provider"]),
  getFeedbackByUserId
);
router.get(
  "/delete-feedback/:userId",
  validateToken,
  authGuard(["admin", "customer"]),
  deleteFeedbackByUserId
);

router.post(
  "/update-feedback/:userId",
  validateToken,
  authGuard(["admin", "customer"]),
  validateData(updateFeedbackSchema),
  updateFeedbackByUserId
);

export default router;
