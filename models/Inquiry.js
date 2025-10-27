import mongoose from "mongoose";

const inquirySchema = new mongoose.Schema(
  {
    from: String,
    to: String,
    departDate: String,
    returnDate: String,
    adults: String,
    children: String,
    infants: String,
    class: String,
    direct: Boolean,
    tripType: String,
  },
  { timestamps: true }
);

const Inquiry = mongoose.model("Inquiry", inquirySchema);

export default Inquiry;
