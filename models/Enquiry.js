import mongoose from "mongoose";

const EnquirySchema = new mongoose.Schema(
  {
    firstName: String,
    lastName: String,
    email: String,
    phone: String,
    enquiryType: String,
    message: String,
  },
  { timestamps: true }
);

const Enquiry = mongoose.model("Enquiry", EnquirySchema);

export default Enquiry;
