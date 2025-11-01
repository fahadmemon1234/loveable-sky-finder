import mongoose from "mongoose";

const CallbackRequestSchema = new mongoose.Schema(
  {
    departDate: { type: Date, required: true },
    returnDate: { type: Date, required: true },
    departureAirport: { type: String, required: true },
    destinationAirport: { type: String, required: true },
    cabin: { type: String, required: true },
    passengers: { type: Number, required: true },
    fullName: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String, required: false },
    message: { type: String, required: false },
  },
  { timestamps: true }
);

const CallbackRequest = mongoose.model(
  "CallbackRequest",
  CallbackRequestSchema
);

export default CallbackRequest;
