import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon, Loader2 } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

const FlightSearchForm = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [tripType, setTripType] = useState("round");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [departDate, setDepartDate] = useState<Date>();
  const [returnDate, setReturnDate] = useState<Date>();
  const [adults, setAdults] = useState("1");
  const [children, setChildren] = useState("0");
  const [infants, setInfants] = useState("0");
  const [flightClass, setFlightClass] = useState("economy");
  const [directOnly, setDirectOnly] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!from || !to || !departDate) {
      toast.error("Please fill in all required fields");
      return;
    }

    if (tripType === "round" && !returnDate) {
      toast.error("Please select a return date");
      return;
    }

    if (tripType === "round" && returnDate && departDate > returnDate) {
      toast.error("Return date must be after departure date");
      return;
    }

    setLoading(true);
    
    setTimeout(() => {
      const params = new URLSearchParams({
        from,
        to,
        departDate: format(departDate, "yyyy-MM-dd"),
        ...(tripType === "round" && returnDate ? { returnDate: format(returnDate, "yyyy-MM-dd") } : {}),
        adults,
        children,
        infants,
        class: flightClass,
        direct: directOnly.toString(),
        tripType,
      });
      
      navigate(`/flights?${params.toString()}`);
      setLoading(false);
    }, 1000);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-card rounded-lg shadow-lg p-6 space-y-6">
      {/* Trip Type */}
      <RadioGroup value={tripType} onValueChange={setTripType} className="flex gap-4">
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="round" id="round" />
          <Label htmlFor="round">Round Trip</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="one" id="one" />
          <Label htmlFor="one">One Way</Label>
        </div>
      </RadioGroup>

      {/* From and To */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="from">From *</Label>
          <Input
            id="from"
            placeholder="Departure city"
            value={from}
            onChange={(e) => setFrom(e.target.value)}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="to">To *</Label>
          <Input
            id="to"
            placeholder="Destination city"
            value={to}
            onChange={(e) => setTo(e.target.value)}
            required
          />
        </div>
      </div>

      {/* Dates */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>Depart Date *</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn("w-full justify-start text-left font-normal", !departDate && "text-muted-foreground")}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {departDate ? format(departDate, "PPP") : "Pick a date"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar mode="single" selected={departDate} onSelect={setDepartDate} initialFocus />
            </PopoverContent>
          </Popover>
        </div>
        {tripType === "round" && (
          <div className="space-y-2">
            <Label>Return Date *</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn("w-full justify-start text-left font-normal", !returnDate && "text-muted-foreground")}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {returnDate ? format(returnDate, "PPP") : "Pick a date"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar mode="single" selected={returnDate} onSelect={setReturnDate} initialFocus />
              </PopoverContent>
            </Popover>
          </div>
        )}
      </div>

      {/* Passengers */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="space-y-2">
          <Label htmlFor="adults">Adults (12+ years)</Label>
          <Select value={adults} onValueChange={setAdults}>
            <SelectTrigger id="adults">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {[1, 2, 3, 4, 5, 6].map((num) => (
                <SelectItem key={num} value={num.toString()}>
                  {num}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="children">Children (2-11 years)</Label>
          <Select value={children} onValueChange={setChildren}>
            <SelectTrigger id="children">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {[0, 1, 2, 3, 4].map((num) => (
                <SelectItem key={num} value={num.toString()}>
                  {num}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="infants">Infants (below 2 years)</Label>
          <Select value={infants} onValueChange={setInfants}>
            <SelectTrigger id="infants">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {[0, 1, 2].map((num) => (
                <SelectItem key={num} value={num.toString()}>
                  {num}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Class */}
      <div className="space-y-2">
        <Label htmlFor="class">Class</Label>
        <Select value={flightClass} onValueChange={setFlightClass}>
          <SelectTrigger id="class">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="economy">Economy</SelectItem>
            <SelectItem value="premium">Premium Economy</SelectItem>
            <SelectItem value="business">Business</SelectItem>
            <SelectItem value="first">First Class</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Direct Flights */}
      <div className="flex items-center space-x-2">
        <Checkbox id="direct" checked={directOnly} onCheckedChange={(checked) => setDirectOnly(checked as boolean)} />
        <Label htmlFor="direct" className="cursor-pointer">
          Direct flights only
        </Label>
      </div>

      {/* Submit Button */}
      <Button type="submit" className="w-full" size="lg" disabled={loading}>
        {loading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Searching...
          </>
        ) : (
          "Find Deals"
        )}
      </Button>
    </form>
  );
};

export default FlightSearchForm;
