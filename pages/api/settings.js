import { connectToDatabase } from "../../lib/mongoose";
import SiteSettings from "../../models/SiteSettings";

export default async function handler(req, res) {
  try {
    await connectToDatabase();

    if (req.method === "GET") {
      let settings = await SiteSettings.findOne();
      
      // Create default settings if none exist
      if (!settings) {
        settings = await SiteSettings.create({
          trendingText: "Raw thoughts, unfiltered stories, and real reflections on life, growth, and everything in between.",
        });
      }

      return res.status(200).json({ success: true, settings });
    }

    if (req.method === "PUT") {
      const { trendingText } = req.body;

      let settings = await SiteSettings.findOne();

      if (!settings) {
        settings = await SiteSettings.create({ trendingText });
      } else {
        settings.trendingText = trendingText;
        await settings.save();
      }

      return res.status(200).json({ success: true, settings });
    }

    return res.status(405).json({ success: false, error: "Method not allowed" });
  } catch (error) {
    console.error("Error managing site settings:", error);
    return res.status(500).json({ success: false, error: error.message });
  }
}
