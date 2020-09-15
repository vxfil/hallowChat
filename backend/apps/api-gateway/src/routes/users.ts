import express from "express";
import * as userController from "../controllers/users.controller";

const router = express.Router();

router.get("/", userController.usersList);
router.get("/user/:id", userController.getUserById);
router.post("/user/create", userController.createUser);
router.post("/user/:id/update", userController.updateUser);
router.post("/find", userController.findByUsername);
router.delete("/user/:id/delete", userController.deleteUser);

export default router;
