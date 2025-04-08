import { User } from "../models/user.models.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import cloudinary from "cloudinary";
import multer from "multer";

// Configure Multer for file uploads
const storage = multer.diskStorage({});
const upload = multer({ storage });

// Configure Cloudinary
cloudinary.config({
  cloud_name: "your-cloud-name",
  api_key: "your-api-key",
  api_secret: "your-api-secret",
});

const UserController = {
  uploadLinks: asyncHandler(async (req, res) => {
    try {
      // Use Multer to handle file upload
      upload.single("file")(req, res, async (err) => {
        if (err) {
          return res
            .status(400)
            .json({ message: "File upload failed", error: err.message });
        }

        if (!req.file) {
          return res.status(400).json({ message: "No file provided" });
        }

        // Upload file to Cloudinary
        const result = await cloudinary.v2.uploader.upload(req.file.path);

        // Save the link to the User database
        const { userId } = req.body; // Assuming userId is sent in the request body
        const user = await User.findById(userId);

        if (!user) {
          return res.status(404).json({ message: "User not found" });
        }

        user.links.push(result.secure_url);
        await user.save();

        res
          .status(200)
          .json({
            message: "Link uploaded and saved successfully",
            link: result.secure_url,
          });
      });
    } catch (error) {
      res.status(500).json({ message: "Server error", error: error.message });
    }
  }),
};

export { UserController };
