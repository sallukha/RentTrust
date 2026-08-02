 import mongoose from "mongoose";

const propertySchema = new mongoose.Schema(
  {
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    title: String,

    rent: Number,

    status: {
      type: String,
      default: "ACTIVE",
    },

    isOccupied: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Property || mongoose.model("Property", propertySchema);
