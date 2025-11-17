"use client";
import React, { useEffect, useState } from "react";
import { withLayout } from "@/app/Component/Layout";
import AddBooking from "../_AddBooking";

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

const AddBookingData = () => {
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



    const [passanger, setPassanger] = useState("0");
    const [rows, setRows] = useState<Array<{
  category: { value: string; label: string } | null;
  title: string;
  firstName: string;
  midName: string;
  surName: string;
  age: string;
  salePrice: string;
  adminPrice: string;
}>>([]);

  return (
    <>
      <div className="card">
        <div className="card-header">
          <h3 className="card-title">Create Booking</h3>
        </div>
        <div className="card-body">
          <div className="row">
            <div className="col-md-12">
              <AddBooking bookings={bookings} setBookings={setBookings} passanger={passanger} setPassanger={setPassanger} rows={rows} setRows={setRows}  />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default withLayout(AddBookingData);
