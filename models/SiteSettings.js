import mongoose from "mongoose";

const SiteSettingsSchema = new mongoose.Schema(
  {
    trendingText: {
      type: String,
      default: "Raw thoughts, unfiltered stories, and real reflections on life, growth, and everything in between.",
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.SiteSettings || mongoose.model("SiteSettings", SiteSettingsSchema);
