"use client";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { withLayout } from "../../../Layout";
import { decryptData } from "@/app/Component/utility/encryptDecrypt";
import axios from "axios";
import Swal from "sweetalert2";
import { format } from "date-fns";
import Select from "react-select";

interface Inquiry {
  id: number;
  title: string;
  created_at: string;
  // add other fields as needed
}

const InquiryDetail = () => {
  const params = useParams();
  const { inquiryId } = params;
  const id = decryptData(inquiryId);

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!Validation()) {
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/inquiry`,
        {
          from: from.label,
          to: to.label,
          departDate: format(departDate as Date, "yyyy-MM-dd"),
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
    <div className="card shadow-sm rounded">
      <div className="p-4 ">
        <form className="p-4  mt-5">
          <div className="d-flex flex-wrap justify-content-center gap-3 mb-3">
            <div className="form-check-inline form-check-inline">
              <input
                className="form-check-input"
                type="radio"
                name="tripType"
                id="round"
                value="round"
                checked={tripType === "round"}
                onChange={() => setTripType("round")}
              />
              <label
                className="form-check-label fw-semibold"
                htmlFor="round"
                style={{ paddingLeft: "10px" }}
              >
                Round Trip
              </label>
            </div>

            <div className="form-check-inline form-check-inline">
              <input
                className="form-check-input"
                type="radio"
                name="tripType"
                id="one"
                value="one"
                checked={tripType === "one"}
                onChange={() => setTripType("one")}
              />
              <label
                className="form-check-label fw-semibold"
                htmlFor="one"
                style={{ paddingLeft: "10px" }}
              >
                One Way
              </label>
            </div>
          </div>

          <div className="container">
            <div className="row mt-20 mb-20">
              <div className="col-md-6">
                <label
                  className="form-check-label mb-10 fw-semibold"
                  htmlFor="from"
                >
                  From *
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

              <div className="col-md-6">
                <label
                  className="form-check-label mb-10 fw-semibold"
                  htmlFor="to"
                >
                  To *
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

            <div className="row mt-20 mb-20">
              <div className="col-md-6">
                <label
                  className="form-check-label mb-10 fw-semibold"
                  htmlFor="DepartDate"
                >
                  Depart Date *
                </label>

                <input
                  type="date"
                  id="DepartDate"
                  className="form-control"
                  value={
                    departDate
                      ? departDate.toISOString().split("T")[0] // convert Date -> string (YYYY-MM-DD)
                      : ""
                  }
                  onChange={(e) => setDepartDate(new Date(e.target.value))} // convert string -> Date
                />
              </div>

              {tripType === "round" && (
                <div className="col-md-6">
                  <label
                    className="form-check-label mb-10 fw-semibold"
                    htmlFor="returnDate"
                  >
                    Return Date *
                  </label>

                  <input
                    type="date"
                    id="returnDate"
                    className="form-control"
                    value={
                      returnDate
                        ? returnDate.toISOString().split("T")[0] // convert Date -> string (YYYY-MM-DD)
                        : ""
                    }
                    onChange={(e) => setReturnDate(new Date(e.target.value))} // convert string -> Date
                  />
                </div>
              )}
            </div>

            <div className="row g-4 my-4 mb-20">
              {[
                {
                  label: "Adults (12+ years)",
                  value: adults,
                  setValue: setAdults,
                },
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
                <div className="col-md-4" key={label}>
                  <label className="form-label fw-semibold d-block mb-10">
                    {label}
                  </label>

                  <div
                    className="d-flex align-items-center justify-content-between border rounded-4 shadow-sm px-2 py-1 bg-white"
                    style={{ minHeight: "48px" }}
                  >
                    <button
                      type="button"
                      onClick={() =>
                        setValue((prev: any) =>
                          Number(prev) > 0 ? String(Number(prev) - 1) : "0"
                        )
                      }
                      className="btn fw-bold flex-fill"
                      style={{
                        backgroundColor: "#ecb51e",
                        color: "black !important",
                        border: "none",
                        borderRadius: "8px",
                        marginRight: "6px",
                        transition: "all 0.2s ease-in-out",
                      }}
                      onMouseEnter={(e) =>
                        (e.currentTarget.style.opacity = "0.9")
                      }
                      onMouseLeave={(e) =>
                        (e.currentTarget.style.opacity = "1")
                      }
                    >
                      –
                    </button>

                    <span
                      className="text-center fw-semibold flex-fill py-1"
                      style={{
                        minWidth: "50px",
                        border: "1px solid #eee",
                        borderRadius: "8px",
                      }}
                    >
                      {value}
                    </span>

                    <button
                      type="button"
                      onClick={() =>
                        setValue((prev: any) =>
                          Number(prev) < 9 ? String(Number(prev) + 1) : "9"
                        )
                      }
                      className="btn fw-bold flex-fill"
                      style={{
                        backgroundColor: "#ecb51e",
                        color: "black !important",
                        border: "none",
                        borderRadius: "8px",
                        marginLeft: "6px",
                        transition: "all 0.2s ease-in-out",
                      }}
                      onMouseEnter={(e) =>
                        (e.currentTarget.style.opacity = "0.9")
                      }
                      onMouseLeave={(e) =>
                        (e.currentTarget.style.opacity = "1")
                      }
                    >
                      +
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="row g-4 my-4 mb-20">
              <div className="col-md-4">
                <label
                  className="form-check-label mb-10 fw-semibold"
                  htmlFor="Name"
                >
                  Name *
                </label>

                <input
                  type="text"
                  id="Name"
                  className="form-control"
                  placeholder="Enter Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              <div className="col-md-4">
                <label
                  className="form-check-label mb-10 fw-semibold"
                  htmlFor="Email"
                >
                  Email *
                </label>

                <input
                  type="text"
                  id="Email"
                  className="form-control"
                  placeholder="Enter Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

               <div className="col-md-4">
                <label
                  className="form-check-label mb-10 fw-semibold"
                  htmlFor="Phone"
                >
                  Phone *
                </label>

                <input
                  type="text"
                  id="Phone"
                  className="form-control"
                  placeholder="Enter Phone"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default withLayout(InquiryDetail);
