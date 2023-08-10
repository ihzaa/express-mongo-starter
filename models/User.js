import mongoose from "mongoose";

const Schema = mongoose.Schema(
  {
    full_name: {
      type: String,
    },
    email: {
      type: String,
    },
    password: {
      type: String,
    },
    status: {
      type: String,
      enum: ["active", "inactive"],
      default: "active",
    },
    role: {
      type: String,
      enum: ["admin", "casher", "employee"],
      default: "employee",
    },
    refresh_token: {
      type: String,
    },
    createdAt: {
      type: Number,
    },
    updatedAt: {
      type: Number,
    },
  },
  {
    timestamps: { currentTime: () => Math.floor(Date.now() / 1000) },
  }
);

export default mongoose.model("User", Schema);
