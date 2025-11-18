"use client";
import React, { useEffect, useState } from "react";
import { withLayout } from "@/app/Component/Layout";
import AddBooking from "../_AddBooking";

const AddBookingData = () => {
  const [rows, setRows] = useState<
    Array<{
      category: { value: string; label: string } | null;
      title: string;
      firstName: string;
      midName: string;
      surName: string;
      age: string;
      salePrice: number;
      adminPrice: number;
    }>
  >([]);

  return (
    <>
      <div className="card">
        <div className="card-header">
          <h3 className="card-title">Create New Booking</h3>
        </div>
        <div className="card-body">
          <div className="row">
            <div className="col-md-12">
              <AddBooking rows={rows} setRows={setRows} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default withLayout(AddBookingData);
