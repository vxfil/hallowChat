import express from "express";
import * as AuthController from "../controllers/auth.controller";

const router = express.Router();

router.post("/login", AuthController.login);
router.post("/sign_up", AuthController.signUp);
router.post("/forgot", AuthController.forgot);
router.post("/confirmation", AuthController.confirm);
router.post("/verification", AuthController.verification);
router.post("/check", AuthController.check);
router.post("/change", AuthController.changePass);
router.post("/refresh_token", AuthController.refreshToken);
router.delete("/logout", AuthController.logout);
router.delete("/delete", AuthController.deleteProfile);

export default router;
