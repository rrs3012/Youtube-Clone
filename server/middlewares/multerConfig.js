import multer from "multer";
import path from "path";

// Custom storage configuration
const customStorage = multer.diskStorage({
  destination(req, file, done) {
    done(null, "uploads/");    // Save in upload folder
  },
  filename(req, file, done) {
    const ext = path.extname(file.originalname);
    const uniqueName = Date.now() + ext;
    done(null, uniqueName);
  },
});

// Validate file type function
const validateFileType = (req, file, done) => {
  const isAccepted = file.mimetype.startsWith("image/") || file.mimetype.startsWith("video/");
  if (isAccepted) {
    done(null, true);
  } else {
    done(new Error("Only image and video files are allowed."), false);
  }
};

// Multer upload configuration
const mediaUploader = multer({
  storage: customStorage,
  fileFilter: validateFileType,
});

// Exporting middleware to handle upload
export const uploadFiles = mediaUploader.fields([
  { name: "imgFile", maxCount: 1 },
  { name: "videoFile", maxCount: 1 },
]);

export default uploadFiles;
