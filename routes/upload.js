const express = require("express");
const Upload = require("../models/Upload");
const auth = require("../middleware/auth");

const router = express.Router();

// Upload 2 base64 images
router.post("/upload", auth, async (req, res) => {
  try {
    const { title, description, images } = req.body;

    if (!images || images.length !== 2) {
      return res.status(400).json({ message: "Exactly 2 images must be uploaded" });
    }

    const upload = new Upload({
      title,
      description,
      images,
      uploadedBy: req.user.id,
    });

    await upload.save();
    res.status(201).json({ message: "Upload successful" });
  } catch (err) {
    res.status(500).json({ message: "Failed to upload images" });
  }
});

// Get uploads of the logged-in user
router.get("/my-uploads", auth, async (req, res) => {
  try {
    const uploads = await Upload.find({ uploadedBy: req.user.id });
    res.json(uploads);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch uploads" });
  }
});

module.exports = router;
