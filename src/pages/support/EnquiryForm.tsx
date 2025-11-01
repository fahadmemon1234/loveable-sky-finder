import { useState } from "react";
import SupportPageLayout from "@/components/SupportPageLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import axios from "axios";
import Swal from "sweetalert2";
import { set } from "date-fns";

const EnquiryForm = () => {
  const [loading, setLoading] = useState(false);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [enquiryType, setEnquiryType] = useState("");
  const [message, setMessage] = useState("");

  const Validation = () => {
    if (!firstName) {
      Swal.fire({
        icon: "error",
        position: "center",
        title: "First Name are required",
      });
      return false;
    }

    if (!lastName) {
      Swal.fire({
        icon: "error",
        position: "center",
        title: "Last Name are required",
      });
      return false;
    }

    if (!email) {
      Swal.fire({
        icon: "error",
        position: "center",
        title: "Email are required",
      });
      return false;
    }

    if (!email.includes("@")) {
      Swal.fire({
        icon: "error",
        position: "center",
        title: "Invalid Email",
      });
      return false;
    }

    if (!phone) {
      Swal.fire({
        icon: "error",
        position: "center",
        title: "Phone are required",
      });
      return false;
    }

    if (!enquiryType) {
      Swal.fire({
        icon: "error",
        position: "center",
        title: "Enquiry Type are required",
      });
      return false;
    }

    if (!message) {
      Swal.fire({
        icon: "error",
        position: "center",
        title: "Message are required",
      });
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (!Validation()) {
        setLoading(false);
        return;
      }
      debugger;
      const data = {
        firstName,
        lastName,
        email,
        phone,
        enquiryType,
        message,
      };

      const result = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/enquiry`,
        data
      );
      if (result.status === 200) {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Enquiry saved successfully",
          text: "We will get back to you soon",
          showConfirmButton: false,
          timer: 1500,
        });
      } else if (result.status === 400) {
        Swal.fire({
          icon: "error",
          position: "center",
          title: "Something went wrong",
        });
      } else if (result.status === 500) {
        Swal.fire({
          icon: "error",
          position: "center",
          title: "Unexpected Error",
          text: "An unexpected error occurred. Please try again.",
        });
      } else {
        Swal.fire({
          icon: "error",
          position: "center",
          title: "Unexpected Error",
          text: "An unexpected error occurred. Please try again.",
        });
      }

      setFirstName("");
      setLastName("");
      setEmail("");
      setPhone("");
      setEnquiryType("");
      setMessage("");
      setLoading(false);
    } catch (error) {
      // console.log(error);

      Swal.fire({
        icon: "error",
        position: "center",
        title: "Something went wrong",
      });
      setLoading(false);
    }
  };

  return (
    <SupportPageLayout
      title="Enquiry Form"
      description="Submit your travel enquiry and we'll get back to you promptly"
    >
      <div className="bg-white/90 backdrop-blur-md rounded-3xl shadow-xl border border-gray-200 p-6 sm:p-8 max-w-full sm:max-w-xl md:max-w-3xl lg:max-w-4xl mx-auto">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Name Fields */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label
                htmlFor="firstName"
                className="font-semibold text-gray-700 text-base sm:text-lg"
              >
                First Name *
              </Label>
              <Input
                id="firstName"
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                placeholder="Enter your first name"
                className="w-full bg-white/80 border-gray-300 focus:border-primary focus:ring-primary"
              />
            </div>
            <div className="space-y-2">
              <Label
                htmlFor="lastName"
                className="font-semibold text-gray-700 text-base sm:text-lg"
              >
                Last Name *
              </Label>
              <Input
                id="lastName"
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                placeholder="Enter your last name"
                className="w-full bg-white/80 border-gray-300 focus:border-primary focus:ring-primary"
              />
            </div>
          </div>

          {/* Email & Phone */}
          <div className="space-y-2">
            <Label
              htmlFor="email"
              className="font-semibold text-gray-700 text-base sm:text-lg"
            >
              Email *
            </Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email address"
              className="w-full bg-white/80 border-gray-300 focus:border-primary focus:ring-primary"
            />
          </div>
          <div className="space-y-2">
            <Label
              htmlFor="phone"
              className="font-semibold text-gray-700 text-base sm:text-lg"
            >
              Phone Number
            </Label>
            <Input
              id="phone"
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Enter your Phone No"
              className="w-full bg-white/80 border-gray-300 focus:border-primary focus:ring-primary"
            />
          </div>

          {/* Enquiry Type */}
          <div className="space-y-2">
            <Label
              htmlFor="enquiryType"
              className="font-semibold text-gray-700 text-base sm:text-lg"
            >
              Enquiry Type *
            </Label>
            <Select value={enquiryType} onValueChange={setEnquiryType}>
              <SelectTrigger
                id="enquiryType"
                className="w-full bg-white/80 border-gray-300 focus:border-primary focus:ring-primary"
              >
                <SelectValue placeholder="Select enquiry type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="booking">Flight Booking</SelectItem>
                <SelectItem value="refund">Refund Request</SelectItem>
                <SelectItem value="general">General Enquiry</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Message */}
          <div className="space-y-2">
            <Label
              htmlFor="message"
              className="font-semibold text-gray-700 text-base sm:text-lg"
            >
              Message *
            </Label>
            <Textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              id="message"
              placeholder="Enter your message here..."
              rows={6}
              className="w-full bg-white/80 border-gray-300 focus:border-primary focus:ring-primary"
            />
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            className="w-full bg-gradient-to-r from-amber-500 via-yellow-400 to-yellow-500 text-black font-semibold rounded-2xl shadow-lg hover:shadow-2xl hover:scale-105 transition-transform duration-300"
            disabled={loading}
          >
            {loading ? "Submitting..." : "Submit Enquiry"}
          </Button>
        </form>
      </div>
    </SupportPageLayout>
  );
};

export default EnquiryForm;
