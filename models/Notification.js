import mongoose from "mongoose";

const NotificationSchema = new mongoose.Schema({
  type: { type: String, enum: ["like", "comment"], required: true },
  postTitle: { type: String, required: true },
  postSlug: { type: String, required: true },
  userName: { type: String, required: true },
  comment: { type: String },
  read: { type: Boolean, default: false },
  timestamp: { type: Date, default: Date.now },
});

export default mongoose.models.Notification || mongoose.model("Notification", NotificationSchema);
