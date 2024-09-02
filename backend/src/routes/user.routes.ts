import { Router } from "express";
import {
  addUser,
  getAllCustomerDetails,
  getAllServiceProviders,
  getCustomerById,
  getServiceProviderById,
  getUsers,
  loginUser,
  updateCustomer,
  updateServiceProvider,
  updateServiceProviderLocation,
  updateServiceProviderStatus,
} from "../controllers/user.controller";
import validateToken, {
  authGuard,
  getCurrentUser,
} from "../middleware/validate-token";
import { validateData } from "../middleware/validationMiddleware";
import {
  updateServiceProviderStatusSchema,
  updateUserSchema,
  userLoginSchema,
  userRegistrationSchema,
} from "../schema/userSchema";

const router = Router();

router.post("/", validateData(userRegistrationSchema), addUser);
router.post("/login", validateData(userLoginSchema), loginUser);
router.get("/users", validateToken, authGuard(["admin"]), getUsers);
router.get("/customer-details", validateToken, getAllCustomerDetails);
router.get("/current-user", getCurrentUser);
router.get(
  "/customer-details/:userId",
  validateToken,
  authGuard(["admin"]),
  getCustomerById
);

router.get(
  "/service-details/:userId",
  validateToken,
  authGuard(["admin"]),
  getServiceProviderById
);

router.post(
  "/update-service-provider/:userId",
  validateToken,
  authGuard(["admin", "service_provider"]),
  updateServiceProvider
);

router.post(
  "/update-customer/:userId",
  validateToken,
  authGuard(["admin", "customer"]),
  validateData(updateUserSchema),
  updateCustomer
);

router.get(
  "/service-providers",
  validateToken,
  authGuard(["admin", "customer", "service_provider"]),
  getAllServiceProviders
);

router.post(
  "/update-service-provider-status",
  validateToken,
  authGuard(["admin"]),
  validateData(updateServiceProviderStatusSchema),
  updateServiceProviderStatus
);

router.post(
  "/update-provider-location",
  validateToken,
  updateServiceProviderLocation
);

export default router;
