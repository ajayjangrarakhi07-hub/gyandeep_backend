const express = require("express");
const multer = require("multer");
const cloudinary = require("../config/cloudinary"); // remove .js
const fs = require("fs");

const router = express.Router();

/* ================= MULTER CONFIG ================= */

const upload = multer({
    dest: "uploads/",
    limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
});

/* ================= PROFILE IMAGE UPLOAD ================= */

router.post(
    "/profile-image",
    upload.single("profileImage"),
    async (req, res) => {
        try {
            if (!req.file) {
                return res.status(400).json({ message: "No file uploaded" });
            }

            console.log("Uploading to Cloudinary...");

            const result = await cloudinary.uploader.upload(req.file.path, {
                folder: "profile_images",
                resource_type: "image",
            });

            // Remove local file after upload
            fs.unlink(req.file.path, (err) => {
                if (err) console.log("File delete error:", err);
            });

            return res.status(200).json({
                success: true,
                imageUrl: result.secure_url,
            });

        } catch (error) {
            console.log("Upload Error:", error);

            return res.status(500).json({
                success: false,
                message: "Image upload failed",
            });
        }
    }
);

module.exports = router;