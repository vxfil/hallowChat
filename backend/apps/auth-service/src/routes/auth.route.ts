import express from "express";
import * as AuthController from "../controllers/auth.controller";

const router = express.Router();

router.post("/sign", AuthController.signUp);
router.post("/sign/forgot", AuthController.forgotPassword);
router.post("/sign/verificate", AuthController.verification);
router.post("/auth", AuthController.signIn);
router.get("/auth/:id", AuthController.getVerification);
router.post("/auth/check", AuthController.checkCode);
router.post("/auth/change", AuthController.changePassword);
router.post("/auth/refresh_token", AuthController.refreshToken);
router.delete("/logout", AuthController.exit);
router.delete("/delete", AuthController.deleteUser);

export default router;
