import mongoose from "mongoose";

const subscribeSchema = new mongoose.Schema(
  {
    email: String,
  },
  { timestamps: true }
);

const Subscribe = mongoose.model("Subscribe", subscribeSchema);

export default Subscribe;
