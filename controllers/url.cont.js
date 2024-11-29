import { nanoid } from "nanoid";
import URL from "../models/url.js";

const generateShortUrl = async (req, res) => {
  try {
    const body = req.body;

    // Check if the body or required properties are missing
    if (!body || !body.url) {
      return res.status(400).json({ msg: "Url is required" });
    }

    const shortId = nanoid(7);

    // Create a new short URL in the database
    await URL.create({
      shortId: shortId,
      redirectURL: body.url,
      visitHistory: [],
    });

    // Respond with the generated short ID
    return res.status(200).json({
      id: shortId,
    });
  } catch (error) {
    // Catch and handle unexpected errors
    console.error("Error in generateShortUrl:", error);
    return res.status(500).json({ msg: "Internal Server Error" });
  }
};

const getAnalytics = async (req, res) => {
  const shortId = req.params.shortId;
  const result = await URL.findOne({ shortId });
  return res.json({
    totalClicks: result.visitHistory.length,
    analytics: result.visitHistory,
  });
};
export { generateShortUrl, getAnalytics };
