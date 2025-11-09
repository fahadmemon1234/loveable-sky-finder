import { useState, useEffect } from "react";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import { CalendarIcon } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import Select from "react-select";
import { Phone } from "lucide-react";
import Swal from "sweetalert2";
import axios from "axios";

const FlightRequestForm = () => {
  const [departDate, setDepartDate] = useState<Date | null>(null);
  const [returnDate, setReturnDate] = useState<Date | null>(null);
  const [departureAirport, setDepartureAirport] = useState<any>(null);
  const [destinationAirport, setDestinationAirport] = useState<any>(null);
  const [selectedcabin, setSelectedCabin] = useState<{
    value: string;
    label: string;
  } | null>(null);
  const [selectedPassengers, setSelectedPassengers] = useState<{
    value: string;
    label: string;
  } | null>(null);
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const [open, setOpen] = useState(false);
  const [openReturn, setOpenReturn] = useState(false);

  const options = [
    { value: "economy", label: "Economy" },
    { value: "business", label: "Business" },
    { value: "first", label: "First Class" },
  ];

  const [selectedOption, setSelectedOption] = useState(null);

  const numberOptions = Array.from({ length: 10 }, (_, i) => ({
    value: (i + 1).toString(), // use string for consistency
    label: `${i + 1}`,
  }));

  const [numOption, setNumOption] = useState(null);

  const [loading, setLoading] = useState(false);

  const Validation = () => {
    if (!returnDate) {
      Swal.fire({
        icon: "error",
        position: "center",
        title: "Please enter the return date.",
      });
      return false;
    }

    if (!departureAirport) {
      Swal.fire({
        icon: "error",
        position: "center",
        title: "Please enter the departure airport.",
      });
      return false;
    }

    if (!destinationAirport) {
      Swal.fire({
        icon: "error",
        position: "center",
        title: "Please enter the destination airport.",
      });
      return false;
    }

    if (!selectedcabin) {
      Swal.fire({
        icon: "error",
        position: "center",
        title: "Please select the cabin class.",
      });
      return false;
    }

    if (!selectedPassengers) {
      Swal.fire({
        icon: "error",
        position: "center",
        title: "Please select the number of passengers.",
      });
      return false;
    }

    if (!fullName) {
      Swal.fire({
        icon: "error",
        position: "center",
        title: "Please enter the full name.",
      });
      return false;
    }

    if (!phone) {
      Swal.fire({
        icon: "error",
        position: "center",
        title: "Please enter the phone number.",
      });
      return false;
    }

    if (!email) {
      Swal.fire({
        icon: "error",
        position: "center",
        title: "Please enter the email address.",
      });
      return false;
    }

    if (!email.includes("@")) {
      Swal.fire({
        icon: "error",
        position: "center",
        title: "Please enter a valid email address.",
      });
      return false;
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (!Validation()) {
        setLoading(false);
        return;
      }

      const data = {
        departDate: format(departDate, "yyyy-MM-dd"),
        returnDate: format(returnDate, "yyyy-MM-dd"),
        departureAirport: departureAirport.label,
        destinationAirport: destinationAirport.label,
        cabin: selectedcabin?.value || "",
        passengers: selectedPassengers ? Number(selectedPassengers.value) : 0,
        fullName,
        phone,
        email,
        message,
      };

      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/callback-request`,
        data
      );
      if (response.status === 200) {
        Swal.fire({
          position: "center",
          icon: "success",
          title: response.data.message,
          showConfirmButton: false,
          timer: 1500,
        });
      } else if (response.status === 400) {
        Swal.fire({
          position: "center",
          icon: "error",
          title: response.data.message,
          showConfirmButton: false,
          timer: 1500,
        });
      } else if (response.status === 500) {
        Swal.fire({
          position: "center",
          icon: "error",
          title: response.data.message,
          showConfirmButton: false,
          timer: 1500,
        });
      } else {
        Swal.fire({
          position: "center",
          icon: "error",
          title: response.data.message,
          showConfirmButton: false,
          timer: 1500,
        });
      }

      setLoading(false);

      setDepartDate(undefined);
      setReturnDate(undefined);
      setDepartureAirport(null);
      setDestinationAirport(null);
      setSelectedCabin(null);
      setSelectedPassengers(null);
      setFullName("");
      setPhone("");
      setEmail("");
      setMessage("");
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong!",
      });
      setLoading(false);
    }
  };

  const handleSelect = (date: Date | undefined) => {
    setDepartDate(date);
    setOpen(false);
  };

  const handleSelectReturn = (date: Date | undefined) => {
    setReturnDate(date);
    setOpenReturn(false);
  };

  const [loadingFrom, setLoadingFrom] = useState(false);
  const [flights, setFlights] = useState([] as any);
  const [searchTerm, setSearchTerm] = useState<string | null>(null);
  // From
  useEffect(() => {
    const fetchAirports = async () => {
      setLoadingFrom(true);
      try {
        let response = null;

        if (searchTerm == null || searchTerm.trim().length === 0) {
          response = await axios.get(
            `${import.meta.env.VITE_API_URL}/api/airports`,
            {
              params: { mode: "all" },
            }
          );
        } else {
          response = await axios.get(
            `${import.meta.env.VITE_API_URL}/api/airports`,
            {
              params: { mode: "search", keyword: searchTerm },
            }
          );
        }

        // Map backend data to react-select options
        const options = (response.data.airports || []).map((a) => ({
          label: `${a.airport_code} - ${a.airport_name} (${a.city}, ${a.country})`,
          value: a.airport_code,
        }));
        setFlights(options);
      } catch (err) {
        console.error(err);
      } finally {
        setLoadingFrom(false);
      }
    };

    const delay = setTimeout(() => {
      if (searchTerm.trim().length === 0 || searchTerm.trim().length >= 1) {
        fetchAirports();
      }
    }, 500);

    return () => clearTimeout(delay);
  }, [searchTerm]);

  // to
  const [searchTermTo, setSearchTermTo] = useState("");
  const [LoadingTo, setLoadingTo] = useState(false);
  useEffect(() => {
    const fetchAirports = async () => {
      setLoadingTo(true);
      try {
        let response = null;
        if (searchTermTo.trim().length === 0) {
          response = await axios.get(
            `${import.meta.env.VITE_API_URL}/api/airports`,
            {
              params: { mode: "all" },
            }
          );
        } else {
          response = await axios.get(
            `${import.meta.env.VITE_API_URL}/api/airports`,
            {
              params: { mode: "search", search: searchTermTo },
            }
          );
        }

        const options = (response.data.airports || []).map((a) => ({
          label: `${a.airport_code} - ${a.airport_name} (${a.city}, ${a.country})`,
          value: a.airport_code,
          city: a.city,
          country: a.country,
        }));
        setFlights(options);
      } catch (err) {
        console.error(err);
      } finally {
        setLoadingTo(false);
      }
    };

    const delay = setTimeout(() => {
      fetchAirports();
    }, 500);

    return () => clearTimeout(delay);
  }, [searchTermTo]);

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
                    onSelect={handleSelectReturn}
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

              <Select
                id="from"
                value={departureAirport}
                onChange={(option) => {
                  setDepartureAirport(option); // keep selected airport visible
                  setSearchTerm(option?.label || ""); // keep search term synced
                }}
                onInputChange={(value, action) => {
                  if (action.action === "input-change") {
                    setSearchTerm(value);
                  }
                }}
                options={flights}
                isLoading={loadingFrom}
                placeholder="Search Departure airports..."
                noOptionsMessage={() =>
                  searchTerm.length < 3
                    ? "Type 3+ letters to search"
                    : "No results found"
                }
                className="react-select-container"
                classNamePrefix="react-select"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="destinationAirport">Destination Airport *</Label>
              <Select
                id="to"
                value={destinationAirport}
                onChange={(option) => {
                  setDestinationAirport(option); // keep selected airport visible
                  setSearchTermTo(option?.label || ""); // keep search term synced
                }}
                onInputChange={(value, action) => {
                  if (action.action === "input-change") {
                    setSearchTermTo(value);
                  }
                }}
                options={flights}
                isLoading={LoadingTo}
                placeholder="Search Destination airports..."
                noOptionsMessage={() =>
                  searchTermTo.length < 3
                    ? "Type 3+ letters to search"
                    : "No results found"
                }
                className="react-select-container"
                classNamePrefix="react-select"
              />
            </div>
          </div>

          {/* Row 3: Cabin & Passengers */}
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="cabin">Cabin *</Label>
              <Select
                id="cabin"
                value={selectedcabin}
                onChange={(option) => setSelectedCabin(option)}
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
                value={selectedPassengers}
                onChange={(option) => setSelectedPassengers(option)} // option has value & label
                options={numberOptions}
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
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Full Name"
                className="bg-white/70 border border-gray-200 focus:border-primary focus:ring-1 focus:ring-primary"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="contact">Contact Number *</Label>
              <Input
                id="contact"
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value.replace(/\D/g, ""))}
                placeholder="Enter your contact number"
                inputMode="numeric"
                pattern="[0-9]*"
                className="bg-white/70 border border-gray-200 focus:border-primary focus:ring-1 focus:ring-primary"
              />
            </div>
          </div>

          {/* Row 5: Email full row */}
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              className="bg-white/70 border border-gray-200 focus:border-primary focus:ring-1 focus:ring-primary"
            />
          </div>

          {/* Row 6: Any Comments full row */}
          <div className="space-y-2">
            <Label htmlFor="comments">Any Comments</Label>
            <Textarea
              id="comments"
              name="comments"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
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
