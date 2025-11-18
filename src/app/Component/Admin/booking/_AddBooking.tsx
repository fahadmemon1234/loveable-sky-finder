"use client";
import React, { ChangeEvent, useState, useEffect } from "react";
import Select from "react-select";
import axios from "axios";
import { toast, Slide } from "react-toastify";
import RichTextEditor from "../../utility/RichTextEditor";
import Cookies from "js-cookie";

interface RowType {
  category: { value: string; label: string } | null;
  title: string;
  firstName: string;
  midName: string;
  surName: string;
  age: string;
  salePrice: number;
  adminPrice: number;
}

interface AddBookingProps {
  rows: RowType[];
  setRows: React.Dispatch<React.SetStateAction<RowType[]>>;
}

const AddBooking: React.FC<AddBookingProps> = ({ rows, setRows }) => {
  const paymentOptions = [
    { value: "0", label: "Select Payment Type", disabled: true },
    { value: "Cash", label: "Cash" },
    { value: "Card", label: "Card" },
    { value: "Bank", label: "Bank" },
    { value: "Online", label: "Online" },
    { value: "Other", label: "Other" },
  ];

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

  const categoryOptions = [
    { value: "Adult", label: "Adult" },
    { value: "Child", label: "Child" },
    { value: "Infant", label: "Infant" },
  ];

  const [Passanger, setPassanger] = useState("");

  const numPassengers = Math.max(1, parseInt(Passanger || "1", 10));

  // Generate rows based on passenger count
  useEffect(() => {
    const count = Math.min(Math.max(1, parseInt(Passanger || "1", 10)), 7); // 1-7 passengers
    const newRows = Array.from({ length: count }, () => ({
      category: null,
      title: "",
      firstName: "",
      midName: "",
      surName: "",
      age: "",
      salePrice: 0,
      adminPrice: 0,
    }));
    setRows(newRows);
  }, [numPassengers]);

  const handleRow = <K extends keyof RowType>(
    index: number,
    field: K,
    value: RowType[K]
  ) => {
    const newRows = [...rows];
    newRows[index][field] = value;
    setRows(newRows);
  };

  const formatPrice = (value: number) => {
    return value.toLocaleString("en-US", {
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    });
  };

  const [deposit, setDeposit] = useState(0);

  const [inquiryDetails, setInquiryDetails] = useState("");

  const [customerDetails, setCustomerDetails] = useState("");

  // header ------------------------------

  const [BookingDate, setBookingDate] = useState("");
  const [SupplierName, setSupplierName] = useState("");
  const [ReferencesNO, setReferencesNO] = useState("");
  const [FullName, setFullName] = useState("");
  const [Email, setEmail] = useState("");
  const [Phone, setPhone] = useState("");
  const [DepartureDate, setDepartureDate] = useState("");
  const [ReturnDate, setReturnDate] = useState("");
  const [FlightType, setFlightType] = useState("");
  const [FlightClass, setFlightClass] = useState("");
  const [PNRno, setPNRno] = useState("");
  const [airlineLocator, setairlineLocator] = useState("");
  const [PNRExpiryDate, setPNRExpiryDate] = useState("");
  const [FareExpiryDate, setFareExpiryDate] = useState("");
  const [PaymentType, setPaymentType] = useState("");
  const [AgentFlightDetails, setAgentFlightDetails] = useState("");
  const [CustomerFlightDetails, setCustomerFlightDetails] = useState("");
  const [Total, setTotal] = useState<number>(0);
  const [PayableToSupplier, setPayableToSupplier] = useState<number>(0);
  const [ReceivedAmount, setReceivedAmount] = useState<number>(0);
  const [RemainingProfit, setRemainingProfit] = useState<number>(0);

  useEffect(() => {
    const total = rows.reduce(
      (sum, row) =>
        sum + Number(row.salePrice || 0) + Number(row.adminPrice || 0),
      0
    );
    const payable = rows.reduce(
      (sum, row) => sum + Number(row.adminPrice || 0),
      0
    );
    const remaining =
      rows.reduce((sum, row) => sum + Number(row.salePrice || 0), 0) - payable;

    setTotal(total);
    setPayableToSupplier(payable);
    setRemainingProfit(remaining);
  }, [rows]);

  useEffect(() => {
    setReceivedAmount(deposit);
  }, [deposit]);

  // ------------------ details ------------------

  const handlePassangerChange = (val: string) => {
    if (parseInt(val) > 7) {
      toast.error("Maximum 7 Passengers are allowed", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        transition: Slide,
      });
      return false;
    }
    return true;
  };

  const handleSubmit = async () => {
    try {
      var user = Cookies.get("user");
      var parsedUser = JSON.parse(user!);
      debugger;
      var data = {
        BookingDate: BookingDate,
        user_id: parsedUser.id,
        SupplierName: SupplierName,
        ReferencesNO: ReferencesNO,
        FullName: FullName,
        Email: Email,
        Phone: Phone,
        DepartureDate: DepartureDate,
        ReturnDate: ReturnDate,
        FlightType: FlightType,
        FlightClass: FlightClass,
        PNRno: PNRno,
        airlineLocator: airlineLocator,
        PNRExpiryDate: PNRExpiryDate,
        FareExpiryDate: FareExpiryDate,
        PaymentType: PaymentType,
        AgentFlightDetails: AgentFlightDetails,
        CustomerFlightDetails: CustomerFlightDetails,
        Total: Total,
        PayableToSupplier: PayableToSupplier,
        ReceivedAmount: ReceivedAmount,
        RemainingProfit: RemainingProfit,
        Passengers: Passanger,
        PassengerDetails: rows.map((row) => ({
          Category: row.category?.value || "",
          Title: row.title,
          FirstName: row.firstName,
          MidName: row.midName,
          SurName: row.surName,
          Age: row.age,
          SalePrice: row.salePrice,
          AdminPrice: row.adminPrice,
        })),
      };

      var result = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/add-booking`,
        data,
        {
          headers: { "Content-Type": "application/json" },
          timeout: 120000, // 2 minutes
        }
      );

      if (result.status == 200) {
        toast.success(result.data.message, {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
          transition: Slide,
        });
      } else if (result.status == 404) {
        toast.error(result.data.message, {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
          transition: Slide,
        });
      }
    } catch (error: any) {
      toast.error(error.message, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        transition: Slide,
      });
    }
  };

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
              value={BookingDate}
              onChange={(e) => setBookingDate(e.target.value)}
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
              value={SupplierName}
              onChange={(e) => setSupplierName(e.target.value)}
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
              value={ReferencesNO}
              onChange={(e) => setReferencesNO(e.target.value)}
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
              value={FullName}
              onChange={(e) => setFullName(e.target.value)}
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
              value={Email}
              onChange={(e) => setEmail(e.target.value)}
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
              value={Phone}
              onChange={(e) => setPhone(e.target.value)}
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
            <label className="form-label" htmlFor="DepartureDate">
              Departure Date: <span className="validate">*</span>
            </label>

            <input
              type="date"
              id="DepartDate"
              className="form-control"
              value={DepartureDate}
              onChange={(e) => setDepartureDate(e.target.value)}
            />
          </div>
        </div>

        <div className="col-md-6 col-lg-6 col-sm-12">
          <div className="mb-4">
            <label className="form-label" htmlFor="ReturnDate">
              Return Date: <span className="validate">*</span>
            </label>

            <input
              type="date"
              id="ReturnDate"
              className="form-control"
              value={ReturnDate}
              onChange={(e) => setReturnDate(e.target.value)}
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
              value={FlightTypeOption.find(
                (option) => option.value === FlightType
              )}
              onChange={(option) => setFlightType(option?.value || "")}
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
              value={FlightClassOption.find(
                (option) => option.value === FlightClass
              )}
              onChange={(option) => setFlightClass(option?.value || "")}
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
              }}
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
              value={PNRno}
              onChange={(e) => setPNRno(e.target.value)}
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

            <input
              type="text"
              id="airlineLocator"
              className="form-control"
              placeholder="Enter airline Locator"
              value={airlineLocator}
              onChange={(e) => setairlineLocator(e.target.value)}
            />
          </div>
        </div>

        <div className="col-md-6 col-lg-6 col-sm-12">
          <div className="mb-4">
            <label className="form-label" htmlFor="PNRExpiryDate">
              PNR Expiry Date : <span className="validate">*</span>
            </label>

            <input
              type="date"
              id="PNRExpiryDate"
              className="form-control"
              value={PNRExpiryDate}
              onChange={(e) => setPNRExpiryDate(e.target.value)}
            />
          </div>
        </div>
      </div>

      <div className="row mb-10">
        <div className="col-md-6 col-lg-6 col-sm-12">
          <div className="mb-4">
            <label className="form-label" htmlFor="FareExpiryDate">
              Fare Expiry Date: <span className="validate">*</span>
            </label>

            <input
              type="date"
              id="FareExpiryDate"
              className="form-control"
              value={FareExpiryDate}
              onChange={(e) => setFareExpiryDate(e.target.value)}
            />
          </div>
        </div>

        <div className="col-md-6 col-lg-6 col-sm-12">
          <div className="mb-4">
            <label className="form-label" htmlFor="PaymentType">
              Payment Type: <span className="validate">*</span>
            </label>

            <Select
              id="PaymentType"
              options={paymentOptions}
              placeholder="Select Payment Type"
              isClearable={false}
              value={paymentOptions.find(
                (option) => option.value === PaymentType
              )}
              onChange={(option) => setPaymentType(option?.value || "")}
            />
          </div>
        </div>
      </div>

      <div className="row mb-10">
        <div className="col-md-6 col-lg-6 col-sm-12">
          <div className="mb-4">
            <label className="form-label" htmlFor="InquiryDetails">
              Agent Flight Details: <span className="validate">*</span>
            </label>

            <RichTextEditor
              value={AgentFlightDetails}
              onChange={setAgentFlightDetails} // updates state when user types
            />
          </div>
        </div>

        <div className="col-md-6 col-lg-6 col-sm-12">
          <div className="mb-4">
            <label className="form-label" htmlFor="InquiryDetails">
              Customer Flight Details: <span className="validate">*</span>
            </label>

            <RichTextEditor
              value={CustomerFlightDetails}
              onChange={setCustomerFlightDetails} // updates state when user types
            />
          </div>
        </div>
      </div>

      <div className="row mb-10">
        <div className="col-md-6 col-lg-6 col-sm-12">
          <div className="mb-4">
            <label className="form-label" htmlFor="Passanger">
              Passanger: <span className="validate">*</span>
            </label>

            <input
              type="text"
              id="Passanger"
              className="form-control"
              placeholder="Enter Passanger"
              value={Passanger}
              onChange={(e) => {
                const val = e.target.value;
                if (handlePassangerChange(val)) {
                  setPassanger(val);
                }
              }}
              min={1}
              max={7}
            />
          </div>
        </div>
      </div>

      <div className="row mb-10">
        <div className="col-12">
          <div
            className="table-responsive shadow-sm rounded-3"
            style={{ overflowX: "auto" }}
          >
            <table className="table table-bordered table-striped align-middle mb-0">
              <thead className="table-dark text-center">
                <tr>
                  <th style={{ width: "120px" }}>Category</th>
                  <th style={{ width: "100px" }}>Title</th>
                  <th style={{ width: "120px" }}>First Name</th>
                  <th style={{ width: "120px" }}>Mid Name</th>
                  <th style={{ width: "120px" }}>Sur Name</th>
                  <th style={{ width: "60px" }}>Age</th>
                  <th style={{ width: "100px" }}>Sale Price (£)</th>
                  <th style={{ width: "100px" }}>Admin (£)</th>
                </tr>
              </thead>

              <tbody>
                {rows.map((row, index) => (
                  <tr key={index}>
                    <td>
                      <Select
                        value={row.category}
                        onChange={(option) =>
                          handleRow(index, "category", option)
                        }
                        options={categoryOptions}
                        placeholder="Select Category"
                        className="react-select-container"
                        classNamePrefix="react-select"
                        menuPortalTarget={
                          typeof window !== "undefined" ? document.body : null
                        }
                        styles={{
                          menuPortal: (base) => ({ ...base, zIndex: 9999 }),
                          option: (provided) => ({
                            ...provided,
                            color: "#000",
                          }),
                          control: (provided) => ({
                            ...provided,
                            color: "#000",
                            minHeight: "38px",
                            borderRadius: "0.5rem",
                            boxShadow: "0 0 5px rgba(0,0,0,0.1)",
                          }),
                          singleValue: (provided) => ({
                            ...provided,
                            color: "#000",
                          }),
                        }}
                      />
                    </td>

                    <td>
                      <input
                        type="text"
                        className="form-control shadow-sm rounded-pill border-1"
                        placeholder="Title"
                        disabled={Passanger < "1"}
                        value={row.title || ""}
                        onChange={(e) =>
                          handleRow(index, "title", e.target.value)
                        }
                      />
                    </td>

                    <td>
                      <input
                        type="text"
                        className="form-control shadow-sm rounded-pill border-1"
                        placeholder="First Name"
                        disabled={Passanger < "1"}
                        value={row.firstName || ""}
                        onChange={(e) =>
                          handleRow(index, "firstName", e.target.value)
                        }
                      />
                    </td>

                    <td>
                      <input
                        type="text"
                        className="form-control shadow-sm rounded-pill border-1"
                        placeholder="Mid Name"
                        disabled={Passanger < "1"}
                        value={row.midName || ""}
                        onChange={(e) =>
                          handleRow(index, "midName", e.target.value)
                        }
                      />
                    </td>

                    <td>
                      <input
                        type="text"
                        className="form-control shadow-sm rounded-pill border-1"
                        placeholder="Sur Name"
                        disabled={Passanger < "1"}
                        value={row.surName || ""}
                        onChange={(e) =>
                          handleRow(index, "surName", e.target.value)
                        }
                      />
                    </td>

                    <td>
                      <input
                        type="number"
                        className="form-control shadow-sm rounded-pill border-1"
                        placeholder="Age"
                        disabled={Passanger < "1"}
                        value={row.age}
                        onChange={(e) =>
                          handleRow(index, "age", e.target.value)
                        }
                      />
                    </td>

                    <td>
                      <input
                        type="text"
                        className="form-control shadow-sm rounded-pill border-1"
                        placeholder="Sale Price"
                        disabled={Passanger < "1"}
                        value={formatPrice(row.salePrice)}
                        onChange={(e) => {
                          const val = Number(e.target.value.replace(/,/g, ""));
                          handleRow(index, "salePrice", isNaN(val) ? 0 : val);
                        }}
                      />
                    </td>

                    <td>
                      <input
                        type="text"
                        className="form-control shadow-sm rounded-pill border-1"
                        placeholder="Admin Price"
                        disabled={Passanger < "1"}
                        value={formatPrice(row.adminPrice)}
                        onChange={(e) => {
                          const val = Number(e.target.value.replace(/,/g, ""));
                          handleRow(index, "adminPrice", isNaN(val) ? 0 : val);
                        }}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div className="row mb-10 mt-10">
        <div className="col-md-3 col-lg-3 col-sm-6">
          <div className="mb-4">
            <label className="form-label">Total (£):</label>
            <input
              type="text"
              className="form-control"
              placeholder="Total"
              value={formatPrice(Total)}
              readOnly
            />
          </div>
        </div>

        <div className="col-md-3 col-lg-3 col-sm-6">
          <div className="mb-4">
            <label className="form-label">Payable to Supplier (£):</label>
            <input
              type="text"
              className="form-control"
              placeholder="Payable to Supplier"
              value={formatPrice(PayableToSupplier)}
              readOnly
            />
          </div>
        </div>

        <div className="col-md-3 col-lg-3 col-sm-6">
          <div className="mb-4">
            <label className="form-label">Received Amount (£):</label>
            <input
              type="text"
              className="form-control"
              value={formatPrice(ReceivedAmount)}
              onChange={(e) => {
                const val = parseFloat(e.target.value.replace(/,/g, ""));
                setDeposit(isNaN(val) ? 0 : val);
              }}
            />
          </div>
        </div>

        <div className="col-md-3 col-lg-3 col-sm-6">
          <div className="mb-4">
            <label className="form-label">Remaining Profit (£):</label>
            <input
              type="text"
              className="form-control"
              value={formatPrice(RemainingProfit)}
              readOnly
            />
          </div>
        </div>
      </div>

      <div className="row mb-10 mt-10">
        <div className="col-md-6 col-lg-6 col-sm-12"></div>
        <div className="col-md-6 col-lg-6 col-sm-12 d-flex justify-content-end">
          <button
            type="button"
            className="btn custom-btn"
            onClick={() => handleSubmit()}
          >
            Submit Booking
          </button>
        </div>
      </div>
    </>
  );
};

export default AddBooking;
