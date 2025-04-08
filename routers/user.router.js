import { Router } from "express";
import { UserController } from "../controllers/user.controller.js";
import { upload } from "../middleware/multer.middleware.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";

const router = Router();

router
  .route("/main")
  .post(upload.single("image"), uploadOnCloudinary, UserController);

export default router;
