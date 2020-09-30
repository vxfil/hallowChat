import express from "express";
import * as userController from "../controllers/user.controller";

const router = express.Router();

router.get("/", userController.usersList);
router.get("/:id", userController.getUserById);
router.post("/create", userController.createUser);
router.post("/find", userController.getUserByUsername);
router.post("/:id/update", userController.updateUser);
router.post("/check", userController.checkUser);
router.delete("/:id", userController.deleteUser);

export default router;
