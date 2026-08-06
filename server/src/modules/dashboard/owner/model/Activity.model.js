import mongoose from "mongoose";

const activitySchema = new mongoose.Schema(
  {
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    message: String,
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Activity || mongoose.model("Activity", activitySchema);
