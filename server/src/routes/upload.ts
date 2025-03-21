import express from "express";
import multer from "multer";
import checkBearerToken from '../middlewares/check-bearer-token'
import uploadAndDistribute from "../controllers/upload/upload-and-distibute-task";

const router = express.Router();
const upload = multer({ dest: "uploads/" });

router.post("/", [checkBearerToken], upload.single("file"), uploadAndDistribute);

export default router;
