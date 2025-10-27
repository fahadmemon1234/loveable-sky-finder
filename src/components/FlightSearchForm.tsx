import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Swal from "sweetalert2";
import { Checkbox } from "@/components/ui/checkbox";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarIcon, Loader2 } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

import axios from "axios";

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
  const [flightClass, setFlightClass] = useState("0");
  const [directOnly, setDirectOnly] = useState(false);

  const Validation = () => {
    if (!from) {
      Swal.fire({
        icon: "error",
        position: "center",
        title: "Please enter the departure city.",
      });
      return false;
    }

    if (!to) {
      Swal.fire({
        icon: "error",
        position: "center",
        title: "Please enter the destination city.",
      });
      return false;
    }

    if (!departDate) {
      Swal.fire({
        icon: "error",
        position: "center",
        title: "Please select the departure date.",
      });
      return false;
    }

    if (tripType === "round" && !returnDate) {
      Swal.fire({
        icon: "error",
        position: "center",
        title: "Please select the return date.",
      });
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!Validation()) {
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/inquiry`,
        {
          from,
          to,
          departDate: format(departDate, "yyyy-MM-dd"),
          ...(tripType === "round" && returnDate
            ? { returnDate: format(returnDate, "yyyy-MM-dd") }
            : {}),
          adults,
          children,
          infants,
          class: flightClass,
          direct: directOnly,
          tripType,
        }
      );

      setLoading(false);

      Swal.fire({
        position: "center",
        icon: "success",
        title: "Inquiry saved successfully",
        showConfirmButton: false,
        timer: 1500,
      });

      // console.log("Server response:", response.data);
    } catch (error: any) {
      setLoading(false);

      Swal.fire({
        icon: "error",
        position: "center",
        title: "Error",
        text:
          error.response?.data?.message ||
          "Unable to connect to the server. Please try again.",
      });

      // console.error("Error submitting inquiry:", error);
    }
  };

  // const [departDate, setDepartDate] = useState<Date | undefined>()
  const [open, setOpen] = useState(false);

  const handleSelect = (date: Date | undefined) => {
    setDepartDate(date);
    setOpen(false);
  };

  const [openReturn, setOpenReturn] = useState(false);
  const handleSelectReturn = (date: Date | undefined) => {
    setReturnDate(date);
    setOpenReturn(false);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-card/70 backdrop-blur-md rounded-lg shadow-lg p-6 space-y-6"
    >
      {/* Trip Type */}
      <RadioGroup
        value={tripType}
        onValueChange={setTripType}
        className="flex gap-4"
      >
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="round" id="round" />
          <Label htmlFor="round" className="text-foreground font-medium">
            Round Trip
          </Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="one" id="one" />
          <Label htmlFor="one" className="text-foreground font-medium">
            One Way
          </Label>
        </div>
      </RadioGroup>

      {/* From and To */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="from" className="text-foreground font-medium">
            From *
          </Label>
          <Input
            id="from"
            placeholder="Departure city"
            value={from}
            onChange={(e) => setFrom(e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="to" className="text-foreground font-medium">
            To *
          </Label>
          <Input
            id="to"
            placeholder="Destination city"
            value={to}
            onChange={(e) => setTo(e.target.value)}
          />
        </div>
      </div>

      {/* Dates */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label className="text-foreground font-medium">Depart Date *</Label>
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "w-full justify-start text-left font-normal",
                  !departDate && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {departDate ? format(departDate, "PPP") : "Pick a date"}
              </Button>
            </PopoverTrigger>

            <PopoverContent className="w-auto p-0">
              <Calendar
                key={departDate ? departDate.toString() : "default"}
                mode="single"
                selected={departDate}
                onSelect={handleSelect}
                disabled={(date) =>
                  date < new Date(new Date().setHours(0, 0, 0, 0))
                }
                defaultMonth={departDate || new Date()}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>

        {tripType === "round" && (
          <div className="space-y-2">
            <Label className="text-foreground font-medium">Return Date *</Label>
            <Popover open={openReturn} onOpenChange={setOpenReturn}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !returnDate && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {returnDate ? format(returnDate, "PPP") : "Pick a date"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={returnDate}
                  onSelect={handleSelectReturn}
                  disabled={(date) => {
                    const today = new Date();
                    const minDate = new Date(today);
                    minDate.setDate(today.getDate() + 2);
                    return date < minDate;
                  }}
                  defaultMonth={
                    new Date(new Date().setDate(new Date().getDate() + 2))
                  }
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>
        )}
      </div>

      {/* Passengers */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="space-y-2">
          <Label className="text-foreground font-medium">
            Adults (12+ years)
          </Label>
          <div
            className="flex items-center border rounded-md w-100 overflow-hidden"
            style={{ background: "white" }}
          >
            <button
              type="button"
              className="flex-1 text-lg font-semibold text-[#1c448e] hover:text-[#15336a] py-1"
              onClick={() =>
                setAdults((prev) =>
                  Number(prev) > 1 ? String(Number(prev) - 1) : "1"
                )
              }
            >
              –
            </button>

            <span
              style={{ color: "black" }}
              className="flex-1 text-base font-medium text-center select-none border-x border-gray-300 py-1"
            >
              {adults}
            </span>

            <button
              type="button"
              className="flex-1 text-lg font-semibold text-[#1c448e] hover:text-[#15336a] py-1"
              onClick={() =>
                setAdults((prev) =>
                  Number(prev) < 9 ? String(Number(prev) + 1) : "9"
                )
              }
            >
              +
            </button>
          </div>
        </div>

        <div className="space-y-2">
          <Label className="text-foreground font-medium">
            Children (2–11 years)
          </Label>
          <div
            className="flex items-center border rounded-md w-100 overflow-hidden"
            style={{ background: "white" }}
          >
            <button
              type="button"
              className="flex-1 text-lg font-semibold text-[#1c448e] hover:text-[#15336a] py-1"
              onClick={() =>
                setChildren((prev) =>
                  Number(prev) > 0 ? String(Number(prev) - 1) : "0"
                )
              }
            >
              –
            </button>

            <span
              style={{ color: "black" }}
              className="flex-1 text-base font-medium text-center select-none border-x border-gray-300 py-1"
            >
              {children}
            </span>

            <button
              type="button"
              className="flex-1 text-lg font-semibold text-[#1c448e] hover:text-[#15336a] py-1"
              onClick={() =>
                setChildren((prev) =>
                  Number(prev) < 9 ? String(Number(prev) + 1) : "9"
                )
              }
            >
              +
            </button>
          </div>
        </div>

        <div className="space-y-2">
          <Label className="text-foreground font-medium">
            Infants (below 2 years)
          </Label>
          <div
            className="flex items-center border rounded-md w-100 overflow-hidden"
            style={{ background: "white" }}
          >
            <button
              type="button"
              className="flex-1 text-lg font-semibold text-[#1c448e] hover:text-[#15336a] py-1"
              onClick={() =>
                setInfants((prev) =>
                  Number(prev) > 0 ? String(Number(prev) - 1) : "0"
                )
              }
            >
              –
            </button>

            <span
              style={{ color: "black" }}
              className="flex-1 text-base font-medium text-center select-none border-x border-gray-300 py-1"
            >
              {infants}
            </span>

            <button
              type="button"
              className="flex-1 text-lg font-semibold text-[#1c448e] hover:text-[#15336a] py-1"
              onClick={() =>
                setInfants((prev) =>
                  Number(prev) < 9 ? String(Number(prev) + 1) : "9"
                )
              }
            >
              +
            </button>
          </div>
        </div>
      </div>

      <div
        className="grid grid-cols-1 md:grid-cols-3 gap-4"
        style={{ alignItems: "center" }}
      >
        {/* Class */}
        <div className="space-y-2">
          <Label htmlFor="class" className="text-foreground font-medium">
            Class
          </Label>
          <Select value={flightClass} onValueChange={setFlightClass}>
            <SelectTrigger id="class">
              <SelectValue placeholder="Select a class" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="0" disabled>
                Select a class
              </SelectItem>
              <SelectItem value="economy">Economy</SelectItem>
              <SelectItem value="premium">Premium Economy</SelectItem>
              <SelectItem value="business">Business</SelectItem>
              <SelectItem value="first">First Class</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Airline */}
        <div className="space-y-2">
          <Label htmlFor="airline" className="text-foreground font-medium">
            Airline
          </Label>
          <Input id="airline" placeholder="Airline" className="form-control" />
        </div>

        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="direct"
              checked={directOnly}
              onCheckedChange={(checked) => setDirectOnly(checked as boolean)}
            />
            <Label
              htmlFor="direct"
              className="cursor-pointer text-foreground font-medium"
            >
              Direct flights only
            </Label>
          </div>
        </div>
      </div>

      {/* Direct Flights */}

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
