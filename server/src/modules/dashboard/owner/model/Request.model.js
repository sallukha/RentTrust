import mongoose from "mongoose";

const requestSchema = new mongoose.Schema(
  {
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    tenant: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    property: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Property",
    },
    status: {
      type: String,
      default: "PENDING",
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Request", requestSchema);