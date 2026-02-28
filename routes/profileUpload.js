import express from "express";
import multer from "multer";
import cloudinary from "../config/cloudinary.js";
import fs from "fs";

const router = express.Router();

/* ================= MULTER CONFIG ================= */

const upload = multer({
    dest: "uploads/",
    limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
});

/* ================= PROFILE IMAGE UPLOAD ================= */

router.post("/profile-image", upload.single("profileImage"), async (req, res) => {
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
        fs.unlinkSync(req.file.path);

        res.status(200).json({
            success: true,
            imageUrl: result.secure_url,
        });

    } catch (error) {
        console.log("Upload Error:", error);
        res.status(500).json({ message: "Image upload failed" });
    }
});

export default router;