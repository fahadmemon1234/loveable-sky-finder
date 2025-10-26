import { useState } from "react";
import SupportPageLayout from "@/components/SupportPageLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";

const EnquiryForm = () => {
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    
    setTimeout(() => {
      toast.success("Enquiry submitted successfully!");
      setLoading(false);
      (e.target as HTMLFormElement).reset();
    }, 1000);
  };

  return (
    <SupportPageLayout
      title="Enquiry Form"
      description="Submit your travel enquiry and we'll get back to you"
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="firstName">First Name *</Label>
            <Input id="firstName" required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="lastName">Last Name *</Label>
            <Input id="lastName" required />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">Email *</Label>
          <Input id="email" type="email" required />
        </div>

        <div className="space-y-2">
          <Label htmlFor="phone">Phone Number</Label>
          <Input id="phone" type="tel" />
        </div>

        <div className="space-y-2">
          <Label htmlFor="enquiryType">Enquiry Type *</Label>
          <Select required>
            <SelectTrigger id="enquiryType">
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

        <div className="space-y-2">
          <Label htmlFor="message">Message *</Label>
          <Textarea id="message" required rows={6} />
        </div>

        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? "Submitting..." : "Submit Enquiry"}
        </Button>
      </form>
    </SupportPageLayout>
  );
};

export default EnquiryForm;
