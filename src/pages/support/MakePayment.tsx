import { useState } from "react";
import SupportPageLayout from "@/components/SupportPageLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { CreditCard, Lock } from "lucide-react";
import { toast } from "sonner";

const MakePayment = () => {
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    
    setTimeout(() => {
      toast.success("Payment processed successfully!");
      setLoading(false);
      (e.target as HTMLFormElement).reset();
    }, 1500);
  };

  return (
    <SupportPageLayout
      title="Make a Payment"
      description="Securely complete your booking payment"
    >
      <Card>
        <CardContent className="p-8">
          <div className="flex items-center justify-center gap-2 mb-6 text-muted-foreground">
            <Lock className="h-4 w-4" />
            <span className="text-sm">Secure Payment Gateway</span>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="bookingRef">Booking Reference *</Label>
              <Input id="bookingRef" required placeholder="Enter your booking reference" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="amount">Amount *</Label>
              <Input id="amount" type="number" required placeholder="0.00" step="0.01" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="cardName">Cardholder Name *</Label>
              <Input id="cardName" required placeholder="Name on card" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="cardNumber">Card Number *</Label>
              <div className="relative">
                <Input id="cardNumber" required placeholder="1234 5678 9012 3456" maxLength={19} />
                <CreditCard className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="expiry">Expiry Date *</Label>
                <Input id="expiry" required placeholder="MM/YY" maxLength={5} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="cvv">CVV *</Label>
                <Input id="cvv" type="password" required placeholder="123" maxLength={3} />
              </div>
            </div>

            <Button type="submit" className="w-full" size="lg" disabled={loading}>
              {loading ? "Processing..." : "Complete Payment"}
            </Button>
          </form>

          <p className="text-xs text-muted-foreground text-center mt-6">
            Your payment information is encrypted and secure
          </p>
        </CardContent>
      </Card>
    </SupportPageLayout>
  );
};

export default MakePayment;
