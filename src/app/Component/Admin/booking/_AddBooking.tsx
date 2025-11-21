"use client";
import React, { useState, useEffect } from "react";
import Select from "react-select";
import axios from "axios";
import { toast, Slide } from "react-toastify";
import RichTextEditor from "../../utility/RichTextEditor";
import Cookies from "js-cookie";
import Loader from "../../utility/Loader";
import { useRouter, useSearchParams } from "next/navigation";

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
  const router = useRouter();

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
  const [fromFlights, setFromFlights] = useState([]);

  const [loadingFrom, setLoadingFrom] = useState(false);
  // From
  useEffect(() => {
    const fetchAirports = async () => {
      setLoadingFrom(true);
      try {
        let response;

        if (!searchTerm.trim()) {
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

        const options = (response.data.airports || []).map((a: any) => ({
          label: `${a.airport_code} - ${a.airport_name} (${a.city}, ${a.country})`,
          value: a.airport_code,
        }));

        setFromFlights(options); // IMPORTANT
      } finally {
        setLoadingFrom(false);
      }
    };

    const delay = setTimeout(fetchAirports, 500);
    return () => clearTimeout(delay);
  }, [searchTerm]);

  // to
  const [toFlights, setToFlights] = useState([]);
  const [searchTermTo, setSearchTermTo] = useState("");
  const [LoadingTo, setLoadingTo] = useState(false);
  useEffect(() => {
    const fetchAirports = async () => {
      setLoadingTo(true);
      try {
        let response;

        if (!searchTermTo.trim()) {
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
              params: { mode: "search", keyword: searchTermTo },
            }
          );
        }

        const options = (response.data.airports || []).map((a: any) => ({
          label: `${a.airport_code} - ${a.airport_name} (${a.city}, ${a.country})`,
          value: a.airport_code,
        }));

        setToFlights(options); // IMPORTANT
      } finally {
        setLoadingTo(false);
      }
    };

    const delay = setTimeout(fetchAirports, 500);
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

  const formatPrice = (value?: number | null) => {
    if (value == null || isNaN(value)) return "0.00";
    return value.toLocaleString("en-US", {
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    });
  };

  const [deposit, setDeposit] = useState(0);
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

  // ------------- Validation --------------

  const Validation = () => {
    if (!BookingDate) {
      toast.error("Booking Date is Required", {
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

    if (!SupplierName) {
      toast.error("Supplier Name is Required", {
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

    if (!ReferencesNO) {
      toast.error("References NO is Required", {
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

    if (!FullName) {
      toast.error("Full Name is Required", {
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

    if (!Email) {
      toast.error("Email is Required", {
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

    if (Email.includes("@") == false) {
      toast.error("Invalid Email", {
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

    if (!Phone) {
      toast.error("Phone is Required", {
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

    if (!from) {
      toast.error("Departure Airport is Required", {
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

    if (!to) {
      toast.error("Return Airport is Required", {
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

    if (!DepartureDate) {
      toast.error("Departure Date is Required", {
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

    if (FlightType == "Return") {
      if (!ReturnDate) {
        toast.error("Return Date is Required", {
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

      if (DepartureDate > ReturnDate) {
        toast.error("Departure Date should be less than Return Date", {
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
    }

    if (!FlightType) {
      toast.error("Flight Type is Required", {
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

    if (!FlightClass) {
      toast.error("Flight Class is Required", {
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

    if (!PNRno) {
      toast.error("PNRno is Required", {
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

    if (!airlineLocator) {
      toast.error("Airline Locator is Required", {
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

    if (!PNRExpiryDate) {
      toast.error("PNR Expiry Date is Required", {
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

    if (!FareExpiryDate) {
      toast.error("Fare Expiry Date is Required", {
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

    if (!PaymentType) {
      toast.error("Payment Type is Required", {
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

    if (!AgentFlightDetails) {
      toast.error("Agent Flight Details is Required", {
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

    if (!CustomerFlightDetails) {
      toast.error("Customer Flight Details is Required", {
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

    if (!Passanger) {
      toast.error("Passanger is Required", {
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

  const validateRows = () => {
    for (let i = 0; i < rows.length; i++) {
      const row = rows[i];

      // Category select validation
      if (!row.category?.value) {
        toast.error(`Row ${i + 1}: Category is required`, {
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

      // Required text fields
      if (!row.firstName || !row.surName) {
        toast.error(`Row ${i + 1}: First Name & Sur Name are required`, {
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

      // Age validation
      if (!row.age || row.age <= "0") {
        toast.error(`Row ${i + 1}: Age must be a valid number`, {
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

      // Sale Price & Admin Price validation
      if (row.salePrice === undefined || isNaN(row.salePrice)) {
        toast.error(`Row ${i + 1}: Sale Price must be a number`, {
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
      if (row.adminPrice === undefined || isNaN(row.adminPrice)) {
        toast.error(`Row ${i + 1}: Admin Price must be a number`, {
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
    }

    return true;
  };

  const [isLoading, setIsLoading] = useState(false);

  const resetField = () => {
    setBookingDate("");
    setSupplierName("");
    setReferencesNO("");
    setFullName("");
    setEmail("");
    setPhone("");
    setFrom(null);
    setTo(null);
    setSelectedAirline(null);
    setGoingStopOver(null);
    setReturnStopOver(null);
    setDepartureDate("");
    setReturnDate("");
    setFlightType("");
    setFlightClass("");
    setPNRno("");
    setairlineLocator("");
    setPNRExpiryDate("");
    setFareExpiryDate("");
    setPaymentType("");
    setAgentFlightDetails("");
    setCustomerFlightDetails("");
    setPassanger("");
    setRows([
      {
        category: null,
        title: "",
        firstName: "",
        surName: "",
        midName: "",
        age: "",
        salePrice: 0,
        adminPrice: 0,
      },
    ]);
  };

  const handleSubmit = async () => {
    try {
      if (!Validation()) return;

      if (!validateRows()) return;

      setIsLoading(true);

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
        Departureairport: from.label,
        Returnairport: to.label,
        Goingstopover: goingStopOver.label,
        Returnstopover: returnStopOver.label,
        Airline: selectedAirline.label,
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

        resetField();

        router.push(`/Component/Admin/booking`);
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
    } finally {
      setIsLoading(false); // loader stop
    }
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    // Must start with +, followed by 7 to 15 digits (international format)
    if (/^\+\d{0,15}$/.test(val)) {
      setPhone(val);
    }
  };

  // ---------------------------- Edit ---------------------

  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  useEffect(() => {
    if (id) {
      getBookingById(id);
    }
  }, [id]);

  const getBookingById = async (id: string) => {
    setIsLoading(true);
    try {
      const numericId = Number(id);

      var result = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/get-booking-by-id/${numericId}`,
        {
          headers: { "Content-Type": "application/json" },
          timeout: 120000, // 2 minutes
        }
      );

      // console.log(result.data);

      if (result.data.booking_date) {
        const date = new Date(result.data.booking_date);
        const formattedDate = date.toISOString().split("T")[0]; // yyyy-mm-dd
        setBookingDate(formattedDate);
      }

      setSupplierName(result.data.supplier_name);
      setReferencesNO(result.data.reference_no);
      setFullName(result.data.full_name);
      setEmail(result.data.email);
      setPhone(result.data.phone);
      setFrom({
        label: result.data.departure_airport,
        value: result.data.departure_airport,
      });
      setTo({
        label: result.data.return_airport,
        value: result.data.return_airport,
      });

      if (result.data.departure_date) {
        const date = new Date(result.data.departure_date);
        const formattedDate = date.toISOString().split("T")[0]; // yyyy-mm-dd
        setDepartureDate(formattedDate);
      }

      if (result.data.return_date) {
        const date = new Date(result.data.return_date);
        const formattedDate = date.toISOString().split("T")[0]; // yyyy-mm-dd
        setReturnDate(formattedDate);
      }

      setFlightType(result.data.flight_type);
      setFlightClass(result.data.flight_class);
      setGoingStopOver({
        label: result.data.going_stopover,
        value: result.data.going_stopover,
      });
      setReturnStopOver({
        label: result.data.return_stopover,
        value: result.data.return_stopover,
      });
      setSelectedAirline({
        label: result.data.airline,
        value: result.data.airline,
      });
      setPNRno(result.data.pnr);
      setairlineLocator(result.data.airline_locator);

      if (result.data.pnr_expiry) {
        const date = new Date(result.data.pnr_expiry);
        const formattedDate = date.toISOString().split("T")[0]; // yyyy-mm-dd
        setPNRExpiryDate(formattedDate);
      }

      if (result.data.fare_expiry) {
        const date = new Date(result.data.fare_expiry);
        const formattedDate = date.toISOString().split("T")[0]; // yyyy-mm-dd
        setFareExpiryDate(formattedDate);
      }

      setPaymentType(result.data.payment_type);
      setAgentFlightDetails(result.data.agent_flight_details);
      setCustomerFlightDetails(result.data.customer_flight_details);
      setPassanger(result.data.passanger);

      const passengerRows: RowType[] = result.data.details.map((p: any) => ({
        category: { label: p.category, value: p.category },
        title: p.title,
        firstName: p.first_name,
        midName: p.mid_name,
        surName: p.sur_name,
        age: p.age,
        salePrice: p.sale_price,
        adminPrice: p.admin_price,
      }));
      setRows(passengerRows);

      setTotal(result.data.total ?? 0);
      setPayableToSupplier(result.data.payable_supplier ?? 0);
      setReceivedAmount(result.data.received_amount ?? 0);
      setRemainingProfit(result.data.remaining_profit ?? 0);
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
    } finally {
      setIsLoading(false); // loader stop
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
              min={new Date().toISOString().split("T")[0]}
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
              type="tel"
              id="Phone"
              className="form-control"
              placeholder="Enter International Phone (e.g. +923001234567)"
              name="customer_phone"
              value={Phone}
              onChange={handlePhoneChange}
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
              options={fromFlights}
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
              options={toFlights} // same flights array used for "from"
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
              min={new Date().toISOString().split("T")[0]}
            />
          </div>
        </div>

        {FlightType === "Return" && (
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
                min={
                  DepartureDate
                    ? new Date(
                        new Date(DepartureDate).getTime() +
                          2 * 24 * 60 * 60 * 1000
                      )
                        .toISOString()
                        .split("T")[0]
                    : new Date(new Date().getTime() + 2 * 24 * 60 * 60 * 1000)
                        .toISOString()
                        .split("T")[0]
                }
              />
            </div>
          </div>
        )}

        {FlightType === "" && (
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
                min={
                  DepartureDate
                    ? new Date(
                        new Date(DepartureDate).getTime() +
                          2 * 24 * 60 * 60 * 1000
                      )
                        .toISOString()
                        .split("T")[0]
                    : new Date(new Date().getTime() + 2 * 24 * 60 * 60 * 1000)
                        .toISOString()
                        .split("T")[0]
                }
              />
            </div>
          </div>
        )}
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
              min={new Date().toISOString().split("T")[0]}
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
              min={new Date().toISOString().split("T")[0]}
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

      {/* ------------------- Table ------------------- */}

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
                if (val > Total) {
                  setReceivedAmount(0);
                  setDeposit(0);

                  toast.error("Received amount cannot be greater than total.", {
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
                } else {
                  setReceivedAmount(isNaN(val) ? 0 : val);
                  setDeposit(isNaN(val) ? 0 : val);
                }
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
          {isLoading ? (
            <Loader />
          ) : (
            <button
              type="button"
              className="btn custom-btn"
              onClick={handleSubmit}
            >
              Submit Booking
            </button>
          )}
        </div>
      </div>
    </>
  );
};

export default AddBooking;
