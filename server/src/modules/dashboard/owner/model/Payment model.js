import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema(
  {
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    amount: Number,

    status: {
      type: String,
      default: "SUCCESS",
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Payment", paymentSchema);