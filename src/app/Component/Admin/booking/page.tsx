"use client";
import React, { useState, useEffect, useRef } from "react";
import { withLayout } from "../../Layout";
import Link from "next/link";
import { FaChevronRight } from "react-icons/fa";
import DataTable from "react-data-table-component";
import axios from "axios";
import { toast, Slide } from "react-toastify";
import Cookies from "js-cookie";
import LargeModal from "../../Modal/largeModal";
import AddBooking from "./_AddBooking";
import { useRouter } from "next/navigation";

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

  const [travelBooking, setTravelBooking] = useState<TravelBooking[]>([]);
  const [refresh, setRefresh] = useState(false);
  const [filterText, setFilterText] = useState("");
  const [userId, setUserId] = useState(0);

  const fetchBooking = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/bookings`
      );

      var sortedData = response.data.sort(
        (a: TravelBooking, b: TravelBooking) => {
          return (
            new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
          );
        }
      );

      var user = Cookies.get("user");
      var parsedUser = JSON.parse(user!);
      setUserId(parsedUser.id);

      if (parsedUser.role !== "admin") {
        sortedData = sortedData.filter((booking: TravelBooking) => {
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

  // ------------------ Filter Logic End------------------

  // ------------------ Column Start------------------
  const columns = [
    {
      name: "Sr. No",
      cell: (row: TravelBooking, index: number) => (
        <strong>{row.id.toString().padStart(3, "0")}</strong>
      ),
      width: "80px",
      sortable: false,
    },

    {
      name: "Brand",
      cell: (row: TravelBooking) => <span>Sky Nova Travels</span>,
    },
  ];

  // ------------------ Column End------------------

  const [bookings, setBookings] = useState<TravelBooking[]>([
    {
      user_id: 0,
      file_path: "",
      booking_date: "",
      travelling_date: "",
      ref_no: "",
      payment_date: "",
      payment_type: "0",
      file_status: "0",
      customer_name: "",
      email: "",
      phone: "",
      qty: 0,
      travel_type: "",
      status: "Pending",
      remarks: "",
      total_amount: 0,
      deposit_amount: 0,
      remaining_amount: 0,
      created_at: "",
      updated_at: "",
      id: 0,
    },
  ]);




  const filePathRef = useRef<HTMLInputElement>(null);
  const bookingDateRef = useRef<HTMLInputElement>(null);
  const travellingDateRef = useRef<HTMLInputElement>(null);
  const refNoRef = useRef<HTMLInputElement>(null);

  const paymentDateRef = useRef<HTMLInputElement>(null);
  const paymentTypeRef = useRef<HTMLSelectElement>(null);

  const totalAmountRef = useRef<HTMLInputElement>(null);
  const depositAmountRef = useRef<HTMLInputElement>(null);
  const remainingAmountRef = useRef<HTMLInputElement>(null);

  const fileStatusRef = useRef<HTMLInputElement>(null);

  const customerNameRef = useRef<HTMLInputElement>(null);
  const qtyRef = useRef<HTMLInputElement>(null);
  const travelTypeRef = useRef<HTMLInputElement>(null);

  const statusRef = useRef<HTMLInputElement>(null);
  const remarksRef = useRef<HTMLTextAreaElement>(null);

  // ------------------ Model Box Start------------------

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [Title, setTile] = useState("");

  const openModal = (id?: number) => {
    setTile("Add Booking");
    resetFields();
    setIsModalOpen(true);
  };

  const resetFields = () => {
    bookings.map((booking) => {
      booking.user_id = 0;
      booking.file_path = "";
      booking.booking_date = "";
      booking.travelling_date = "";
      booking.ref_no = "";
      booking.payment_date = "";
      booking.payment_type = "0";
      booking.file_status = "0";
      booking.customer_name = "";
      booking.qty = 0;
      booking.travel_type = "";
      booking.status = "Pending";
      booking.remarks = "";
      booking.total_amount = 0;
      booking.deposit_amount = 0;
      booking.remaining_amount = 0;
      booking.created_at = "";
      booking.updated_at = "";
      booking.id = 0;
    });
  };

  const closeModal = () => {
    setIsModalOpen(false);
    resetFields();
  };

  //   const Validation = () => {
  //     if (!comment) {
  //       toast.error("Comment is Required", {
  //         position: "top-right",
  //         autoClose: 2000,
  //         hideProgressBar: false,
  //         closeOnClick: true,
  //         pauseOnHover: true,
  //         draggable: true,
  //         progress: undefined,
  //         theme: "colored",
  //         transition: Slide,
  //       });
  //       commentRef.current?.focus();
  //       return false;
  //     }

  //     return true;
  //   };

  //   const handleSave = async (e: React.FormEvent) => {
  //     try {
  //       e.preventDefault();
  //       if (!Validation()) return;
  //       debugger;
  //       var user = Cookies.get("user");
  //       var parsedUser = JSON.parse(user!);

  //       const data = {
  //         userId: parsedUser.id,
  //         inquiry_id: selectedInquiryId,
  //         comment: comment,
  //       };

  //       const response = await axios.post(
  //         `${process.env.NEXT_PUBLIC_BASE_URL}/api/inquiry/AddComment`,
  //         data
  //       );

  //       if (response.data.status === 200) {
  //         toast.success(response.data.message, {
  //           position: "top-right",
  //           autoClose: 2000,
  //           hideProgressBar: false,
  //           closeOnClick: true,
  //           pauseOnHover: true,
  //           draggable: true,
  //           progress: undefined,
  //           theme: "colored",
  //           transition: Slide,
  //         });

  //         setIsModalOpen(false);
  //         setSelectedInquiryId(null);
  //         resetFields();
  //         setRefresh(!refresh);
  //       } else if (response.data.status === 400) {
  //         toast.error(response.data.message, {
  //           position: "top-right",
  //           autoClose: 2000,
  //           hideProgressBar: false,
  //           closeOnClick: true,
  //           pauseOnHover: true,
  //           draggable: true,
  //           progress: undefined,
  //           theme: "colored",
  //           transition: Slide,
  //         });
  //       }
  //     } catch (error: any) {
  //       toast.error(error.message, {
  //         position: "top-right",
  //         autoClose: 2000,
  //         hideProgressBar: false,
  //         closeOnClick: true,
  //         pauseOnHover: true,
  //         draggable: true,
  //         progress: undefined,
  //         theme: "colored",
  //         transition: Slide,
  //       });
  //     }
  //   };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    alert("Save");
  };

  // ------------------ Model Box End------------------

  const route = useRouter();

  const handleBooking = () => {
    route.push('/Component/Admin/booking/AddBooking');
  }

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
              <button className="btn btn-custom" onClick={() => handleBooking()}>
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

      <LargeModal
        title={Title}
        largeModalView={
          <AddBooking
            bookings={bookings} // pass bookings as prop
            setBookings={setBookings}
          />
        }
        onClose={closeModal}
        onSave={handleSave}
        show={isModalOpen}
      />
    </>
  );
};

export default withLayout(Booking);
