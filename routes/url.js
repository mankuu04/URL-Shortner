import express from "express";
const router = express.Router();
import { generateShortUrl, getAnalytics } from "../controllers/url.cont.js";

router.post("/", generateShortUrl);
router.get("/analytics/:shortId", getAnalytics);

export { router };
