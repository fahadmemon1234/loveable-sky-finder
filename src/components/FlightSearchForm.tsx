import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import Swal from "sweetalert2";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarIcon, Loader2 } from "lucide-react";
import { format } from "date-fns";
import axios from "axios";
import Select from "react-select";

const FlightSearchForm = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [tripType, setTripType] = useState("round");
  const [from, setFrom] = useState<any>(null);
  const [to, setTo] = useState<any>(null);
  const [departDate, setDepartDate] = useState<Date>();
  const [returnDate, setReturnDate] = useState<Date>();
  const [adults, setAdults] = useState("1");
  const [children, setChildren] = useState("0");
  const [infants, setInfants] = useState("0");
  // const [flightClass, setFlightClass] = useState("0");
  // const [directOnly, setDirectOnly] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const Validation = () => {
    if (!from?.value) {
      Swal.fire({
        icon: "error",
        position: "center",
        title: "Please enter the departure city.",
      });
      return false;
    }

    if (!to?.value) {
      Swal.fire({
        icon: "error",
        position: "center",
        title: "Please enter the destination city.",
      });
      return false;
    }

    if (from.value === to.value) {
      Swal.fire({
        icon: "error",
        position: "center",
        title: "Invalid Selection",
        text: "Departure and destination cannot be the same.",
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

    if (!name) {
      Swal.fire({
        icon: "error",
        position: "center",
        title: "Please enter your name.",
      });
      return false;
    }

    if (!email) {
      Swal.fire({
        icon: "error",
        position: "center",
        title: "Please enter your email.",
      });
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      Swal.fire({
        icon: "error",
        position: "center",
        title: "Please enter a valid email address.",
      });
      return false;
    }

    if (!phone) {
      Swal.fire({
        icon: "error",
        position: "center",
        title: "Please enter your phone number.",
      });
      return false;
    }
    return true;
  };

  const getDeviceInfo = () => {
    debugger;
  const userAgent = navigator.userAgent.toLowerCase();

  let device = "Desktop";

  if (/mobile|iphone|ipad|android/.test(userAgent)) {
    device = "Mobile";
  }

  if (/tablet/.test(userAgent)) {
    device = "Tablet";
  }

  const browser = (() => {
    if (/chrome/.test(userAgent)) return "Chrome";
    if (/firefox/.test(userAgent)) return "Firefox";
    if (/safari/.test(userAgent)) return "Safari";
    if (/edge/.test(userAgent)) return "Edge";
    return "Unknown Browser";
  })();

  return {
    device,
    browser,
    userAgent: navigator.userAgent,
    platform: navigator.platform,
  };
};


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const deviceInfo = getDeviceInfo();

    if (!Validation()) {
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/inquiry`,
        {
          from: from.label,
          to: to.label,
          departDate: format(departDate, "yyyy-MM-dd"),
          ...(tripType === "round" && returnDate
            ? { returnDate: format(returnDate, "yyyy-MM-dd") }
            : {}),
          adults,
          children,
          infants,
          name,
          email,
          phone,
          tripType,
          deviceInfo,
        }
      );

      if (response.status === 200) {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Inquiry saved successfully",
          text: "Agent will contact you soon on your email or phone number.",
          showConfirmButton: false,
          timer: 1500,
        });
      } else if (response.status === 400) {
        Swal.fire({
          icon: "error",
          position: "center",
          title: "Bad Request",
          text: "Please check your details and try again.",
        });
      } else if (response.status === 500) {
        Swal.fire({
          icon: "error",
          position: "center",
          title: "Server Error",
          text: "Something went wrong on the server. Please try later.",
        });
      } else {
        Swal.fire({
          icon: "error",
          position: "center",
          title: "Unexpected Error",
          text: "An unexpected error occurred. Please try again.",
        });
      }

      setFrom(null);
      setTo(null);
      setDepartDate(undefined);
      setReturnDate(undefined);
      setAdults("1");
      setChildren("0");
      setInfants("0");
      setName("");
      setEmail("");
      setPhone("");
    } catch (error: any) {
      Swal.fire({
        icon: "error",
        position: "center",
        title: "Connection Error",
        text:
          error.response?.data?.message ||
          "Unable to connect to the server. Please try again.",
      });
    } finally {
      setLoading(false);
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

  const [searchTerm, setSearchTerm] = useState("");
  const [flights, setFlights] = useState([]);

  // useEffect(() => {
  //   // Run only when user has typed 3+ letters
  //   if (searchTerm.trim().length < 3) {
  //     setFlights([]);
  //     return;
  //   }

  //   const delay = setTimeout(() => {
  //     fetchAirports(searchTerm);
  //   }, 800); // wait 800ms after user stops typing

  //   return () => clearTimeout(delay);
  // }, [searchTerm]);

  // const fetchAirports = async (term: string) => {
  //   setLoading(true);
  //   try {
  //     const token = "TvGTbdm0YfEwbEffDYpinmYxxo89";
  //     const apiUrl = "https://test.api.amadeus.com/v1/reference-data/locations";

  //     const response = await axios.get(apiUrl, {
  //       params: {
  //         subType: "AIRPORT",
  //         keyword: term,
  //       },
  //       headers: {
  //         Authorization: `Bearer ${token}`,
  //       },
  //     });

  //     const airports = response.data?.data || [];

  //     // const formattedAirports = airports.map((a: any) => ({
  //     //   label: `${a.name} (${a.iataCode}) - ${a.address.cityName || ""}`,
  //     //   value: a.iataCode,
  //     // }));

  //     setFlights(formattedAirports);
  //   } catch (error) {
  //     console.error("Error fetching airports:", error);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  const [loadingFrom, setLoadingFrom] = useState(false);
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
    <form
      onSubmit={handleSubmit}
      className="bg-white/90 backdrop-blur-lg rounded-2xl shadow-xl p-8 space-y-8 max-w-4xl mx-auto border border-gray-100"
    >
      {/* Trip Type */}
      <div className="flex flex-wrap gap-6 justify-center">
        <RadioGroup
          value={tripType}
          onValueChange={setTripType}
          className="flex flex-wrap gap-4 justify-center"
        >
          {[
            { label: "Round Trip", value: "round" },
            { label: "One Way", value: "one" },
          ].map((option) => (
            <div
              key={option.value}
              className="flex items-center gap-2 cursor-pointer"
            >
              <RadioGroupItem
                value={option.value}
                id={option.value}
                className="text-primary focus:ring-primary"
              />
              <Label
                htmlFor={option.value}
                className="font-semibold text-gray-800 cursor-pointer"
              >
                {option.label}
              </Label>
            </div>
          ))}
        </RadioGroup>
      </div>

      {/* From & To */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="from" className="font-medium text-gray-700">
            From *
          </Label>

          <Select
            id="from"
            value={from}
            onChange={(option) => {
              setFrom(option); // keep selected airport visible
              setSearchTerm(option?.label || ""); // keep search term synced
            }}
            onInputChange={(value, action) => {
              if (action.action === "input-change") {
                setSearchTerm(value);
              }
            }}
            options={flights}
            isLoading={loadingFrom}
            placeholder="Search airports..."
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
          <Label htmlFor="to" className="font-medium text-gray-700">
            To *
          </Label>
          <Select
            id="to"
            value={to}
            onChange={(option) => {
              setTo(option); // keep selected airport visible
              setSearchTermTo(option?.label || ""); // optional: track search term
            }}
            onInputChange={(value, action) => {
              if (action.action === "input-change") {
                setSearchTermTo(value);
              }
            }}
            options={flights} // same flights array used for "from"
            isLoading={LoadingTo}
            placeholder="Destination city..."
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

      {/* Dates */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label className="font-medium text-gray-700">Depart Date *</Label>
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

        {tripType === "round" && (
          <div className="space-y-2">
            <Label className="font-medium text-gray-700">Return Date *</Label>
            <Popover open={openReturn} onOpenChange={setOpenReturn}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full justify-start text-left font-normal border-gray-300 hover:border-primary hover:bg-primary/5"
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
        )}
      </div>

      {/* Passenger Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { label: "Adults (12+ years)", value: adults, setValue: setAdults },
          {
            label: "Children (2–11 years)",
            value: children,
            setValue: setChildren,
          },
          {
            label: "Infants (below 2 years)",
            value: infants,
            setValue: setInfants,
          },
        ].map(({ label, value, setValue }) => (
          <div key={label} className="space-y-2">
            <Label className="font-medium text-gray-700">{label}</Label>
            <div className="flex items-center border rounded-lg bg-white overflow-hidden">
              <button
                type="button"
                onClick={() =>
                  setValue((prev) =>
                    Number(prev) > 0 ? String(Number(prev) - 1) : "0"
                  )
                }
                className="flex-1 py-2 text-lg font-bold text-primary hover:bg-primary/10"
              >
                –
              </button>
              <span className="flex-1 text-center border-x border-gray-200 font-medium text-gray-800 py-2">
                {value}
              </span>
              <button
                type="button"
                onClick={() =>
                  setValue((prev) =>
                    Number(prev) < 9 ? String(Number(prev) + 1) : "9"
                  )
                }
                className="flex-1 py-2 text-lg font-bold text-primary hover:bg-primary/10"
              >
                +
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Contact Info */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          {
            id: "name",
            label: "Name *",
            value: name,
            set: setName,
            placeholder: "Your Name",
          },
          {
            id: "email",
            label: "Email *",
            value: email,
            set: setEmail,
            placeholder: "Your Email",
          },
          {
            id: "phone",
            label: "Phone *",
            value: phone,
            set: setPhone,
            placeholder: "Your Phone",
          },
        ].map((field) => (
          <div key={field.id} className="space-y-2">
            <Label htmlFor={field.id} className="font-medium text-gray-700">
              {field.label}
            </Label>
            <Input
              id={field.id}
              placeholder={field.placeholder}
              value={field.value}
              type={field.id === "phone" ? "tel" : "text"}
              inputMode={field.id === "phone" ? "numeric" : undefined}
              pattern={field.id === "phone" ? "[0-9]*" : undefined}
              onChange={(e) =>
                field.set(
                  field.id === "phone"
                    ? e.target.value.replace(/\D/g, "")
                    : e.target.value
                )
              }
              className="border-gray-300 focus:ring-primary focus:border-primary"
            />
          </div>
        ))}
      </div>

      {/* Submit Button */}
      <Button
        type="submit"
        className="w-full py-4 text-lg font-semibold rounded-lg bg-primary text-white hover:bg-primary/90 transition-all duration-300 shadow-md"
        size="lg"
        disabled={loading}
      >
        {loading ? (
          <>
            <Loader2 className="mr-2 h-5 w-5 animate-spin" />
            Searching...
          </>
        ) : (
          "Submit Inquiry"
        )}
      </Button>
    </form>
  );
};

export default FlightSearchForm;
