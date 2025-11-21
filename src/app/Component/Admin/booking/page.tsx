"use client";
import React, { useState, useEffect, useRef } from "react";
import { withLayout } from "../../Layout";
import Link from "next/link";
import { FaChevronRight } from "react-icons/fa";
import DataTable from "react-data-table-component";
import axios from "axios";
import { toast, Slide } from "react-toastify";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { FiEdit } from "react-icons/fi";

interface BookingHeader {
  id: number; // Auto increment, optional
  user_id: number;

  booking_date: string; // YYYY-MM-DD
  supplier_name: string;
  reference_no: string;

  full_name: string;
  email: string;
  phone: string;

  departure_airport: string;
  return_airport: string;

  departure_date: string;
  return_date: string;

  flight_type: string;
  flight_class: string;

  going_stopover: string;
  return_stopover: string;

  airline: string;
  pnr: string;
  airline_locator: string;

  pnr_expiry: string;
  fare_expiry: string;
  payment_type: string;

  agent_flight_details: string; // Rich text HTML
  customer_flight_details: string; // Rich text HTML

  total: number;
  payable_supplier: number;
  received_amount: number;
  remaining_profit: number;

  created_at: string;
}

const FilterComponent = ({
  onFilter,
  filterText,
}: {
  onFilter: (e: React.ChangeEvent<HTMLInputElement>) => void;
  filterText: string;
}) => (
  <input
    type="text"
    placeholder="Search..."
    className="form-control"
    value={filterText}
    onChange={onFilter}
    style={{ marginTop: "2%", width: "40%", float: "right" }}
  />
);

const Booking = () => {
  // --------------------Browse Data start--------------------

  const [travelBooking, setTravelBooking] = useState<BookingHeader[]>([]);
  const [refresh, setRefresh] = useState(false);
  const [filterText, setFilterText] = useState("");
  const [userId, setUserId] = useState(0);

  const fetchBooking = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/bookings`
      );

      var sortedData = response.data.sort(
        (a: BookingHeader, b: BookingHeader) => {
          return (
            new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
          );
        }
      );

      var user = Cookies.get("user");
      var parsedUser = JSON.parse(user!);
      setUserId(parsedUser.id);

      if (parsedUser.role !== "admin") {
        sortedData = sortedData.filter((booking: BookingHeader) => {
          return booking.user_id === null || booking.user_id === parsedUser.id;
        });
      }

      setTravelBooking(sortedData);
    } catch (error: any) {
      toast.error("Error fetching inquiries: " + error.message, {
        position: "top-right",
      });
    }
  };

  useEffect(() => {
    fetchBooking();
  }, [refresh]);

  // --------------------Browse Data end--------------------

  // ------------------ Filter Logic Start------------------
  const handleFilter = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilterText(e.target.value);
  };

  const filteredItems = travelBooking.filter((item) =>
    Object.values(item).some((value) =>
      String(value).toLowerCase().includes(filterText.toLowerCase())
    )
  );

  const formatDateShort = (dateString: string) => {
    if (!dateString) return "";

    const date = new Date(dateString);

    return date.toLocaleDateString("en-GB", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  // ------------------ Filter Logic End------------------

  // ------------------ Column Start------------------
  const columns = [
    {
      name: "Sr. No",

      cell: (row: BookingHeader, index: number) => (
        <strong>{row.id.toString().padStart(3, "0")}</strong>
      ),
      width: "80px",
      sortable: false,
    },
    {
      name: "Booking Date",
      cell: (row: BookingHeader) => (
        <span>{formatDateShort(row.booking_date)}</span>
      ),
      width: "120px",
    },
    {
      name: "Supplier Name",
      cell: (row: BookingHeader) => <span>{row.supplier_name}</span>,
      width: "120px",
    },
    {
      name: "Reference No",
      cell: (row: BookingHeader) => <span>{row.reference_no}</span>,
      width: "120px",
    },
    {
      name: "Full Name",
      cell: (row: BookingHeader) => <span>{row.full_name}</span>,
      width: "120px",
    },
    {
      name: "Email",
      cell: (row: BookingHeader) => <span>{row.email}</span>,
      width: "220px",
    },
    {
      name: "Phone",
      cell: (row: BookingHeader) => <span>{row.phone}</span>,
      width: "150px",
    },
    {
      name: "Departure Airport",
      cell: (row: BookingHeader) => (
        <span
          style={{
            display: "inline-block",
            maxWidth: "120px",
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
          title={row.departure_airport} // hover per full text
        >
          {row.departure_airport}
        </span>
      ),
      width: "150px",
    },
    {
      name: "Return Airport",
      cell: (row: BookingHeader) => (
        <span
          style={{
            display: "inline-block",
            maxWidth: "120px",
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
          title={row.return_airport}
        >
          {row.return_airport}
        </span>
      ),
      width: "150px",
    },
    {
      name: "Departure Date",
      cell: (row: BookingHeader) => (
        <span>{formatDateShort(row.departure_date)}</span>
      ),
      width: "120px",
    },
    {
      name: "Return Date",
      cell: (row: BookingHeader) => (
        <span>{formatDateShort(row.return_date)}</span>
      ),
      width: "150px",
    },
    {
      name: "Flight Type",
      cell: (row: BookingHeader) => <span>{row.flight_type}</span>,
      width: "100px",
    },

    {
      name: "Flight Class",
      cell: (row: BookingHeader) => <span>{row.flight_class}</span>,
      width: "150px",
    },
    {
      name: "Brand",
      cell: (row: BookingHeader) => <span>Sky Nova Travels</span>,
      width: "150px",
    },
    {
      name: "Action",
      cell: (row: BookingHeader) => (
        <Link
          href={`/Component/Admin/booking/AddBooking?id=${row.id}`}
          style={{
            display: "flex",
            alignItems: "center",
            cursor: "pointer",
            padding: "4px",
          }}
        >
          <FiEdit size={18} />
        </Link>
      ),
      width: "100px",
    },
  ];

  // ------------------ Column End------------------

  const route = useRouter();

  const handleBooking = () => {
    route.push("/Component/Admin/booking/AddBooking");
  };

  // --------------- Edit ---------------

  return (
    <>
      <div className="breadcrumbs-area">
        <h3>Booking</h3>
        <ul>
          <li>
            <Link href="/Component/Admin/Dashboard">Admin</Link>
            <FaChevronRight
              style={{
                color: `hsl(var(--main))`,
                marginLeft: "10px",
                fontSize: "15px",
              }}
            />
          </li>
          <li>Booking</li>
        </ul>
      </div>

      <div className="card mb-6">
        <div className="card-header">
          <div className="row row-header">
            <div className="col-md-6">
              <h4>Booking</h4>
            </div>
            <div className="col-md-6 btn-Header">
              <button
                className="btn btn-custom"
                onClick={() => handleBooking()}
              >
                Add Booking
              </button>
              <br />
              <FilterComponent
                onFilter={handleFilter}
                filterText={filterText}
              />
            </div>
          </div>
        </div>
        <div className="card-body">
          <div className="row">
            <div className="col-md-12 col-lg-12 col-sm-12">
              <DataTable
                columns={columns}
                data={filteredItems}
                responsive
                pagination
                highlightOnHover
                striped
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default withLayout(Booking);
