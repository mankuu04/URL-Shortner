import express from "express";
const app = express();
import dotenv from "dotenv";

import { router as urlRoute } from "./routes/url.js";
import connectDB from "./db/index.js";
import URL from "./models/url.js";
const PORT = 3000;

dotenv.config();
app.use(express.json());

app.get("/", (req, res) => {
  res.send("working fine");
});

connectDB();

app.get("/:shortId", async (req, res) => {
  try {
    const shortId = req.params.shortId;

    const entry = await URL.findOneAndUpdate(
      { shortId },
      { $push: { visitHistory: { timestamps: Date.now() } } },
      { new: true },
    );

    if (!entry) {
      return res.status(404).json({ msg: "Short URL not found" });
    }

    res.redirect(`http://${entry.redirectURL}`);
  } catch (error) {
    console.error("Error in /:shortId route:", error);
    res.status(500).json({ msg: "Internal Server Error" });
  }
});

app.use("/url", urlRoute);

app.listen(PORT, () => {
  console.log(`server started at port ${PORT}`);
});
