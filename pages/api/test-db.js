import { connectToDatabase } from "../../lib/mongoose";

export default async function handler(req, res) {
  try {
    await connectToDatabase();
    res.status(200).json({ message: "✅ MongoDB connected successfully!" });
  } catch (error) {
    res.status(500).json({ message: "❌ Connection failed", error: error.message });
  }
}
