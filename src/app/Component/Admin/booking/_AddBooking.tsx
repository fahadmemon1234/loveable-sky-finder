"use client";
import React, { ChangeEvent, useState, useEffect } from "react";
import Select from "react-select";
import axios from "axios";
import { toast, Slide } from "react-toastify";

interface TravelBooking {
  id: number; // Auto Increment ID
  user_id: number; // Foreign Key

  file_path: string; // Uploaded File Path

  booking_date: string;
  travelling_date: string; // YYYY-MM-DD
  ref_no: string;

  payment_date: string; // YYYY-MM-DD
  payment_type?: "0";

  total_amount?: number | null;
  deposit_amount?: number | null;
  remaining_amount?: number | null;

  file_status: "0";

  customer_name?: string | "";
  email: string;
  phone: string;
  qty: number;
  travel_type?: string | null;

  status?: string | null;
  remarks?: string | "";

  created_at: string; // timestamp
  updated_at?: string | null; // timestamp
}

interface AddBookingProps {
  bookings: TravelBooking[];
  setBookings: React.Dispatch<React.SetStateAction<TravelBooking[]>>;
}

const AddBooking: React.FC<AddBookingProps> = ({ bookings, setBookings }) => {
  const booking = bookings[0]; // single booking form

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setBookings([{ ...booking, [name]: value }]);
  };

  const paymentOptions = [
    { value: "0", label: "Select Payment Type", disabled: true },
    { value: "Cash", label: "Cash" },
    { value: "Card", label: "Card" },
    { value: "Bank", label: "Bank" },
    { value: "Online", label: "Online" },
    { value: "Other", label: "Other" },
  ];

  const handleSelectChange = (
    selected: { value: string; label: string } | null
  ) => {
    if (selected && selected.value !== "0") {
      setBookings([
        {
          ...booking,
          payment_type: selected.value as "0",
        },
      ]);
    }
  };

  const fileStatusOptions = [
    { value: "0", label: "Select File Status", isDisabled: true },
    { value: "Paid", label: "Paid" },
    { value: "Pending", label: "Pending" },
    { value: "Partial", label: "Partial" },
  ];

  // handle change
  const handleFileStatusChange = (
    selected: { value: string; label: string } | null
  ) => {
    if (selected && selected.value !== "0") {
      setBookings([
        {
          ...booking,
          file_status: selected.value as "0",
        },
      ]);
    }
  };

  const FlightTypeOption = [
    { value: "0", label: "Select Flight Type", disabled: true },
    { value: "OneWay", label: "One Way" },
    { value: "Return", label: "Return" },
  ];

  const FlightClassOption = [
    { value: "0", label: "Select Flight Class", disabled: true },
    { value: "Economy", label: "Economy" },
    { value: "PremiumEconomy", label: "Premium Economy" },
    { value: "Business", label: "Business" },
    { value: "FirstClass", label: "First Class" },
  ];

  // --------------------- api fetch ---------------

  const [from, setFrom] = useState<any>(null);
  const [to, setTo] = useState<any>(null);

  const [searchTerm, setSearchTerm] = useState("");
  const [flights, setFlights] = useState([]);

  const [loadingFrom, setLoadingFrom] = useState(false);
  // From
  useEffect(() => {
    const fetchAirports = async () => {
      setLoadingFrom(true);
      try {
        let response = null;

        if (searchTerm == null || searchTerm.trim().length === 0) {
          response = await axios.get(
            `${process.env.NEXT_PUBLIC_BASE_URL}/api/airports`,
            {
              params: { mode: "all" },
            }
          );
        } else {
          response = await axios.get(
            `${process.env.NEXT_PUBLIC_BASE_URL}/api/airports`,
            {
              params: { mode: "search", keyword: searchTerm },
            }
          );
        }

        // Map backend data to react-select options
        const options = (response.data.airports || []).map((a: any) => ({
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
            `${process.env.NEXT_PUBLIC_BASE_URL}/api/airports`,
            {
              params: { mode: "all" },
            }
          );
        } else {
          response = await axios.get(
            `${process.env.NEXT_PUBLIC_BASE_URL}/api/airports`,
            {
              params: { mode: "search", search: searchTermTo },
            }
          );
        }

        const options = (response.data.airports || []).map((a: any) => ({
          label: `${a.airport_code} - ${a.airport_name} (${a.city}, ${a.country})`,
          value: a.airport_code,
          city: a.city,
          country: a.country,
        }));
        setFlights(options);
      } catch (err: any) {
        toast.error("Error fetching inquiries: " + err.message, {
          position: "top-right",
        });
      } finally {
        setLoadingTo(false);
      }
    };

    const delay = setTimeout(() => {
      fetchAirports();
    }, 500);

    return () => clearTimeout(delay);
  }, [searchTermTo]);

  // Airplane
  const [selectedAirline, setSelectedAirline] = useState<any>(null); // store the selected option
  const [searchTermAirline, setSearchTermAirline] = useState("");
  const [LoadingAirline, setLoadingAirline] = useState(false);
  const [Airlineflights, setAirlineFlights] = useState([]);

  useEffect(() => {
    const fetchAirline = async () => {
      setLoadingAirline(true);
      try {
        let response = null;
        if (searchTermAirline.trim().length === 0) {
          response = await axios.get(
            `${process.env.NEXT_PUBLIC_BASE_URL}/api/airlines`,
            {
              params: { mode: "all" },
            }
          );
        } else {
          response = await axios.get(
            `${process.env.NEXT_PUBLIC_BASE_URL}/api/airlines`,
            {
              params: { mode: "search", search: searchTermAirline },
            }
          );
        }

        const options = (response.data.airlines || []).map((a: any) => ({
          label: `${a.airline_code} - ${a.airline_name}`,
          value: a.airline_code,
        }));

        setAirlineFlights(options);
      } catch (err: any) {
        toast.error("Error fetching inquiries: " + err.message, {
          position: "top-right",
        });
      } finally {
        setLoadingAirline(false);
      }
    };

    const delay = setTimeout(() => {
      fetchAirline();
    }, 500);

    return () => clearTimeout(delay);
  }, [searchTermAirline]);

  const [editorLoaded, setEditorLoaded] = useState(false);

  useEffect(() => {
    setEditorLoaded(true);
  }, []);

  // Going Stop-Over------------------

  const [goingStopOver, setGoingStopOver] = useState<any>(null);

  const [searchTermStopOver, setSearchTermStopOver] = useState("");
  const [stopOverFlights, setStopOverFlights] = useState([]);

  const [loadingStopOver, setLoadingStopOver] = useState(false);

  useEffect(() => {
    const fetchStopOver = async () => {
      setLoadingStopOver(true);
      try {
        let response = null;

        if (
          searchTermStopOver == null ||
          searchTermStopOver.trim().length === 0
        ) {
          response = await axios.get(
            `${process.env.NEXT_PUBLIC_BASE_URL}/api/airports`,
            {
              params: { mode: "all" },
            }
          );
        } else {
          response = await axios.get(
            `${process.env.NEXT_PUBLIC_BASE_URL}/api/airports`,
            {
              params: { mode: "search", keyword: searchTermStopOver },
            }
          );
        }

        // Map backend data to react-select options
        const options = (response.data.airports || []).map((a: any) => ({
          label: `${a.airport_code} - ${a.airport_name} (${a.city}, ${a.country})`,
          value: a.airport_code,
        }));
        setStopOverFlights(options);
      } catch (err) {
        console.error(err);
      } finally {
        setLoadingStopOver(false);
      }
    };

    const delay = setTimeout(() => {
      if (
        searchTermStopOver.trim().length === 0 ||
        searchTermStopOver.trim().length >= 1
      ) {
        fetchStopOver();
      }
    }, 500);

    return () => clearTimeout(delay);
  }, [searchTermStopOver]);

  // Return Stop-Over---------------------

  const [returnStopOver, setReturnStopOver] = useState<any>(null);

  const [returnSearchTerm, setReturnSearchTerm] = useState("");
  const [returnFlights, setReturnFlights] = useState([]);

  const [loadingReturn, setLoadingReturn] = useState(false);

  useEffect(() => {
    const fetchReturnStopOver = async () => {
      setLoadingReturn(true);
      try {
        let response = null;

        if (returnSearchTerm == null || returnSearchTerm.trim().length === 0) {
          response = await axios.get(
            `${process.env.NEXT_PUBLIC_BASE_URL}/api/airports`,
            {
              params: { mode: "all" },
            }
          );
        } else {
          response = await axios.get(
            `${process.env.NEXT_PUBLIC_BASE_URL}/api/airports`,
            {
              params: { mode: "search", keyword: returnSearchTerm },
            }
          );
        }

        // Map backend data to react-select options
        const options = (response.data.airports || []).map((a: any) => ({
          label: `${a.airport_code} - ${a.airport_name} (${a.city}, ${a.country})`,
          value: a.airport_code,
        }));
        setReturnFlights(options);
      } catch (err) {
        console.error(err);
      } finally {
        setLoadingReturn(false);
      }
    };

    const delay = setTimeout(() => {
      if (
        returnSearchTerm.trim().length === 0 ||
        returnSearchTerm.trim().length >= 1
      ) {
        fetchReturnStopOver();
      }
    }, 500);

    return () => clearTimeout(delay);
  }, [returnSearchTerm]);

  return (
    <>
      <div className="row mb-10">
        <div className="col-md-6 col-lg-6 col-sm-12">
          <div className="mb-4">
            <label className="form-label" htmlFor="Bookingdate">
              Booking Date: <span className="validate">*</span>
            </label>

            <input
              type="date"
              id="Bookingdate"
              className="form-control"
              placeholder="Enter Booking Date..."
              name="booking_date"
              value={booking.booking_date}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="col-md-6 col-lg-6 col-sm-12">
          <div className="mb-4">
            <label className="form-label" htmlFor="Supplier_Name">
              Supplier Name: <span className="validate">*</span>
            </label>

            <input
              type="text"
              id="Supplier_Name"
              className="form-control"
              placeholder="Enter Supplier Name..."
              name="Supplier_Name"
            />
          </div>
        </div>
      </div>

      {/* ---------------------------- Customer Details */}

      <div className="row mb-10">
        <div className="col-md-6 col-lg-6 col-sm-12">
          <div className="mb-4">
            <label className="form-label" htmlFor="Referencesno">
              References NO: <span className="validate">*</span>
            </label>

            <input
              type="text"
              id="Referencesno"
              className="form-control"
              placeholder="Enter References NO..."
              name="Referencesno"
              value={booking.ref_no}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="col-md-6 col-lg-6 col-sm-12">
          <div className="mb-4">
            <label className="form-label" htmlFor="FullName">
              Full Name: <span className="validate">*</span>
            </label>

            <input
              type="text"
              id="FullName"
              className="form-control"
              placeholder="Enter Full Name..."
              name="customer_name"
              value={booking.customer_name}
              onChange={handleChange}
            />
          </div>
        </div>
      </div>

      <div className="row mb-10">
        <div className="col-md-6 col-lg-6 col-sm-12">
          <div className="mb-4">
            <label className="form-label" htmlFor="Email">
              Email: <span className="validate">*</span>
            </label>

            <input
              type="email"
              id="Email"
              className="form-control"
              placeholder="Enter Email..."
              name="customer_email"
              value={booking.email}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="col-md-6 col-lg-6 col-sm-12">
          <div className="mb-4">
            <label className="form-label" htmlFor="Phone">
              Phone: <span className="validate">*</span>
            </label>

            <input
              type="text"
              id="Phone"
              className="form-control"
              placeholder="Enter Phone..."
              name="customer_phone"
              value={booking.phone}
              onChange={handleChange}
            />
          </div>
        </div>
      </div>

      <div className="row mb-10">
        <div className="col-md-6 col-lg-6 col-sm-12">
          <div className="mb-4">
            <label className="form-label" htmlFor="Departure">
              Departure Airport: <span className="validate">*</span>
            </label>

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
        </div>

        <div className="col-md-6 col-lg-6 col-sm-12">
          <div className="mb-4">
            <label className="form-label" htmlFor="ReturnAirport">
              Return Airport: <span className="validate">*</span>
            </label>

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
              placeholder=" Search airports..."
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
      </div>

      <div className="row mb-10">
        <div className="col-md-6 col-lg-6 col-sm-12">
          <div className="mb-4">
            <label className="form-label" htmlFor="FlightType">
              Flight Type: <span className="validate">*</span>
            </label>

            <Select
              id="flightType"
              options={FlightTypeOption}
              placeholder="Select Flight Type"
              isClearable={false}
            />
          </div>
        </div>

        <div className="col-md-6 col-lg-6 col-sm-12">
          <div className="mb-4">
            <label className="form-label" htmlFor="Flightclass">
              Flight Class: <span className="validate">*</span>
            </label>

            <Select
              id="flightClass"
              options={FlightClassOption}
              placeholder="Select Flight Class"
              isClearable={false}
            />
          </div>
        </div>
      </div>

      <div className="row mb-10">
        <div className="col-md-6 col-lg-6 col-sm-12">
          <div className="mb-4">
            <label className="form-label" htmlFor="goingStopOver">
              Going Stop-Over: <span className="validate">*</span>
            </label>

            <Select
              id="goingStopOver"
              value={goingStopOver}
              onChange={(option) => {
                setGoingStopOver(option);
                setSearchTermStopOver(option?.label || "");
              }}
              onInputChange={(value, action) => {
                if (action.action === "input-change") {
                  setSearchTermStopOver(value);
                }
              }}
              options={stopOverFlights}
              isLoading={loadingStopOver}
              placeholder="Search going stop-over airports..."
              noOptionsMessage={() =>
                searchTermStopOver.length < 3
                  ? "Type 3+ letters to search"
                  : "No results found"
              }
              className="react-select-container"
              classNamePrefix="react-select"
            />
          </div>
        </div>

        <div className="col-md-6 col-lg-6 col-sm-12">
          <div className="mb-4">
            <label className="form-label" htmlFor="returnStopOver">
              Return Stop-Over: <span className="validate">*</span>
            </label>

            <Select
              id="returnStopOver"
              value={returnStopOver}
              onChange={(option) => {
                setReturnStopOver(option);
                setReturnSearchTerm(option?.label || "");
              } }
              onInputChange={(value, action) => {
                if (action.action === "input-change") {
                  setReturnSearchTerm(value);
                }
              }}
              options={returnFlights}
              isLoading={loadingReturn}
              placeholder="Search return stop-over airports..."
              noOptionsMessage={() =>
                returnSearchTerm.length < 3
                  ? "Type 3+ letters to search"
                  : "No results found"
              }
              className="react-select-container"
              classNamePrefix="react-select"
            />
          </div>
        </div>
      </div>

      <div className="row mb-10">
        <div className="col-md-6 col-lg-6 col-sm-12">
          <div className="mb-4">
            <label className="form-label" htmlFor="DepartureDate">
              Departure Date: <span className="validate">*</span>
            </label>

            <input type="date" id="DepartDate" className="form-control" />
          </div>
        </div>

        <div className="col-md-6 col-lg-6 col-sm-12">
          <div className="mb-4">
            <label className="form-label" htmlFor="ReturnDate">
              Return Date: <span className="validate">*</span>
            </label>

            <input type="date" id="ReturnDate" className="form-control" />
          </div>
        </div>
      </div>

      <div className="row mb-10">
        <div className="col-md-6 col-lg-6 col-sm-12">
          <div className="mb-4">
            <label className="form-label" htmlFor="Airline">
              Airline: <span className="validate">*</span>
            </label>

            <Select
              id="Airline"
              value={selectedAirline}
              onChange={(option) => {
                setSelectedAirline(option); // store the selected option
              }}
              onInputChange={(value, action) => {
                if (action.action === "input-change") {
                  setSearchTermAirline(value); // track search input
                }
              }}
              options={Airlineflights}
              isLoading={LoadingAirline}
              placeholder="Search airlines..."
              noOptionsMessage={() =>
                searchTermAirline.length < 2
                  ? "Type 2+ letters to search"
                  : "No results found"
              }
              className="react-select-container"
              classNamePrefix="react-select"
            />
          </div>
        </div>

        <div className="col-md-6 col-lg-6 col-sm-12">
          <div className="mb-4">
            <label className="form-label" htmlFor="PNRno">
              PNR no: <span className="validate">*</span>
            </label>

            <input
              type="text"
              id="PNRno"
              className="form-control"
              placeholder="Enter PNR no"
            />
          </div>
        </div>
      </div>

      <div className="row mb-10">
        <div className="col-md-6 col-lg-6 col-sm-12">
          <div className="mb-4">
            <label className="form-label" htmlFor="airlineLocator">
              airline Locator: <span className="validate">*</span>
            </label>

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
              placeholder=" Search airports..."
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

        <div className="col-md-6 col-lg-6 col-sm-12">
          <div className="mb-4">
            <label className="form-label" htmlFor="PNRExpiryDate">
              PNR Expiry Date : <span className="validate">*</span>
            </label>

            <input type="date" id="PNRExpiryDate" className="form-control" />
          </div>
        </div>
      </div>

      <div className="row mb-10">
        <div className="col-md-6 col-lg-6 col-sm-12">
          <div className="mb-4">
            <label className="form-label" htmlFor="FareExpiryDate">
              Fare Expiry Date: <span className="validate">*</span>
            </label>

            <input type="date" id="FareExpiryDate" className="form-control" />
          </div>
        </div>
      </div>

      <div className="row mb-10">
        <div className="col-md-6 col-lg-6 col-sm-12">
          <div className="mb-4">
            <label className="form-label" htmlFor="InquiryDetails">
              Inquiry Details: <span className="validate">*</span>
            </label>

            {editorLoaded && (
              <div id="editorContainer">
                <textarea id="editor"></textarea>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default AddBooking;
