import { connectToDatabase } from "../../lib/mongoose";
import Notification from "../../models/Notification";

export default async function handler(req, res) {
  await connectToDatabase();

  if (req.method === "GET") {
    try {
      // Get all notifications, sorted by newest first
      const notifications = await Notification.find({})
        .sort({ timestamp: -1 })
        .limit(50); // Limit to last 50 notifications

      return res.status(200).json({ success: true, notifications });
    } catch (error) {
      console.error("Error fetching notifications:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  }

  if (req.method === "PUT") {
    try {
      // Mark all notifications as read
      await Notification.updateMany({}, { read: true });

      return res.status(200).json({ success: true, message: "All notifications marked as read" });
    } catch (error) {
      console.error("Error marking notifications as read:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  }

  return res.status(405).json({ message: "Method not allowed" });
}
