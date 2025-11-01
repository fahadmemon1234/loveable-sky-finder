import { useState } from "react";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import { CalendarIcon, Loader2 } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import Select from "react-select";
import { Phone } from "lucide-react";

const FlightRequestForm = () => {
  const options = [
    { value: "economy", label: "Economy" },
    { value: "business", label: "Business" },
    { value: "first", label: "First Class" },
  ];

  const [selectedOption, setSelectedOption] = useState(null);

  const numberoptions = Array.from({ length: 10 }, (_, i) => ({
    value: i + 1,
    label: `${i + 1}`,
  }));

  const [numOption, setNumOption] = useState(null);

  const [loading, setLoading] = useState(false);

  const [departDate, setDepartDate] = useState<Date>();
  const [returnDate, setReturnDate] = useState<Date>();
  const [open, setOpen] = useState(false);
  const [openReturn, setOpenReturn] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Simulate submission
    setTimeout(() => {
      alert("Flight request submitted!");
      setLoading(false);
    }, 1500);
  };

  const handleSelect = (date: Date | undefined) => {
    setDepartDate(date);
    setOpen(false);
  };

  const handleSelectReturn = (date: Date | undefined) => {
    setReturnDate(date);
    setOpenReturn(false);
  };

  return (
    <section className="py-16 px-4 bg-gradient-to-b from-blue-50 via-white to-blue-100">
      <div className="container mx-auto max-w-5xl">
        <div className="bg-primary text-white rounded-t-2xl px-6 py-4 shadow-md">
          <h2 className="text-lg md:text-xl font-bold">
            Flights Quote Request
          </h2>
        </div>
        <form
          onSubmit={handleSubmit}
          className="bg-white/80 backdrop-blur-md p-8 rounded-br-3xl rounded-bl-3xl shadow-xl border border-primary/10 space-y-6"
        >
          <div className="flex items-center gap-3 bg-primary/10 border border-primary rounded-xl p-4 text-gray-800 shadow-sm">
            <Phone className="text-primary w-5 h-5" />
            <p>
              Request a quote or for an immediate response call us on{" "}
              <span className="font-semibold text-primary">020 4628 6567</span>
            </p>
          </div>

          {/* Row 1: Departure & Return Dates */}
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="departure">Departure Date *</Label>
              <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full justify-start text-left font-normal border-gray-300 hover:border-primary hover:bg-primary/5 placeholder:text-gray-300"
                  >
                    <CalendarIcon className="mr-2 h-4 w-4 text-primary" />
                    {departDate ? format(departDate, "PPP") : "Pick a date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={departDate}
                    onSelect={handleSelect}
                    disabled={(date) =>
                      date < new Date(new Date().setHours(0, 0, 0, 0))
                    }
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
            <div className="space-y-2">
              <Label htmlFor="return">Return Date *</Label>
              <Popover open={openReturn} onOpenChange={setOpenReturn}>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full justify-start text-left font-normal border-gray-300 hover:border-primary hover:bg-primary/5 placeholder:text-gray-300"
                  >
                    <CalendarIcon className="mr-2 h-4 w-4 text-primary" />
                    {returnDate ? format(returnDate, "PPP") : "Pick a date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={returnDate}
                    onSelect={setReturnDate}
                    disabled={(date) =>
                      date <
                      new Date(new Date().setDate(new Date().getDate() + 2))
                    }
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>

          {/* Row 2: Departure & Destination Airports */}
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="departureAirport">Departure Airport *</Label>
              <Input
                id="departureAirport"
                type="text"
                required
                placeholder="e.g., JFK"
                className="bg-white/70 border border-gray-200 focus:border-primary focus:ring-1 focus:ring-primary"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="destinationAirport">Destination Airport *</Label>
              <Input
                id="destinationAirport"
                type="text"
                required
                placeholder="e.g., LHR"
                className="bg-white/70 border border-gray-200 focus:border-primary focus:ring-1 focus:ring-primary"
              />
            </div>
          </div>

          {/* Row 3: Cabin & Passengers */}
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="cabin">Cabin *</Label>
              <Select
                id="cabin"
                value={selectedOption}
                onChange={setSelectedOption}
                options={options}
                placeholder="Select Cabin"
                className="react-select-container"
                classNamePrefix="react-select"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="passengers">Number of Passengers *</Label>
              <Select
                id="passengers"
                value={numOption}
                onChange={setNumOption}
                options={numberoptions}
                placeholder="Select number of passengers"
                className="react-select-container"
                classNamePrefix="react-select"
              />
            </div>
          </div>

          {/* Row 4: Name & Contact Number */}
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Your Name *</Label>
              <Input
                id="name"
                type="text"
                required
                placeholder="Full Name"
                className="bg-white/70 border border-gray-200 focus:border-primary focus:ring-1 focus:ring-primary"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="contact">Contact Number *</Label>
              <Input
                id="contact"
                type="tel"
                required
                placeholder="+1 555 123 4567"
                className="bg-white/70 border border-gray-200 focus:border-primary focus:ring-1 focus:ring-primary"
              />
            </div>
          </div>

          {/* Row 5: Email full row */}
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="your@email.com"
              className="bg-white/70 border border-gray-200 focus:border-primary focus:ring-1 focus:ring-primary"
            />
          </div>

          {/* Row 6: Any Comments full row */}
          <div className="space-y-2">
            <Label htmlFor="comments">Any Comments</Label>
            <Textarea
              id="comments"
              rows={4}
              placeholder="Additional details..."
              className="bg-white/70 border border-gray-200 focus:border-primary focus:ring-1 focus:ring-primary"
            />
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            className="w-full bg-gradient-to-r from-amber-500 via-yellow-400 to-yellow-500 text-black font-semibold rounded-2xl shadow-lg hover:shadow-2xl hover:scale-105 transition-transform"
            disabled={loading}
          >
            {loading ? "Submitting..." : "Submit Request"}
          </Button>
        </form>
      </div>
    </section>
  );
};

export default FlightRequestForm;
