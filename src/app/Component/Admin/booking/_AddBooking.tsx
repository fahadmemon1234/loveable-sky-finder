import React, { ChangeEvent } from "react";
import Select from "react-select";

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

  return (
    <>
      <div className="row mb-10">
        <div className="col-md-4 col-lg-4 col-sm-12">
          <div className="mb-4">
            <label className="form-label" htmlFor="file_path">
              File Upload: <span className="validate">*</span>
            </label>

            <input
              type="file"
              id="file_path"
              className="form-control"
              placeholder="File Path"
              name="file_path"
              value={booking.file_path || ""}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="col-md-4 col-lg-4 col-sm-12">
          <div className="mb-4">
            <label className="form-label" htmlFor="bookingDate">
              Booking Date: <span className="validate">*</span>
            </label>

            <input
              type="date"
              id="bookingDate"
              className="form-control"
              placeholder="Enter Booking Date..."
              name="booking_date"
              value={booking.booking_date}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="col-md-4 col-lg-4 col-sm-12">
          <div className="mb-4">
            <label className="form-label" htmlFor="travellingDate">
              Travelling Date: <span className="validate">*</span>
            </label>

            <input
              type="date"
              id="travellingDate"
              placeholder="Enter Travelling Date..."
              className="form-control"
              name="travellingDate"
              value={booking.travelling_date}
              onChange={handleChange}
            />
          </div>
        </div>
      </div>

      <div className="row mb-10">
        <div className="col-md-4 col-lg-4 col-sm-12">
          <div className="mb-4">
            <label className="form-label" htmlFor="ReferenceNo">
              Reference No: <span className="validate">*</span>
            </label>

            <input
              type="text"
              id="ReferenceNo"
              className="form-control"
              placeholder="Enter Reference No..."
              name="ReferenceNo"
              value={booking.ref_no || ""}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="col-md-4 col-lg-4 col-sm-12">
          <div className="mb-4">
            <label className="form-label" htmlFor="paymentDate">
              Payment Date: <span className="validate">*</span>
            </label>

            <input
              type="date"
              id="paymentDate"
              className="form-control"
              placeholder="Enter Payment Date..."
              name="payment_date"
              value={booking.payment_date}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="col-md-4 col-lg-4 col-sm-12">
          <div className="mb-4">
            <label className="form-label" htmlFor="paymentType">
              Payment Type: <span className="validate">*</span>
            </label>

            <Select
              id="paymentType"
              options={paymentOptions}
              value={paymentOptions.find(
                (opt) => opt.value === booking.payment_type
              )}
              onChange={handleSelectChange}
              placeholder="Select Payment Type"
              isClearable={false}
            />
          </div>
        </div>
      </div>

      <div className="row mb-10">
        <div className="col-md-4 col-lg-4 col-sm-12">
          <div className="mb-4">
            <label className="form-label" htmlFor="Customername">
              Customer Name: <span className="validate">*</span>
            </label>

            <input
              type="text"
              id="Customername"
              className="form-control"
              placeholder="Enter Customer Name..."
              name="Customername"
              value={booking.customer_name || ""}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="col-md-4 col-lg-4 col-sm-12">
          <div className="mb-4">
            <label className="form-label" htmlFor="email">
              Email: <span className="validate">*</span>
            </label>

            <input
              type="text"
              id="email"
              className="form-control"
              placeholder="Enter Email..."
              name="email"
              value={booking.email}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="col-md-4 col-lg-4 col-sm-12">
          <div className="mb-4">
            <label className="form-label" htmlFor="Phone">
              Phone: <span className="validate">*</span>
            </label>

            <input
              type="text"
              id="Phone"
              className="form-control"
              placeholder="Enter Phone..."
              name="Phone"
              value={booking.phone}
              onChange={handleChange}
            />
          </div>
        </div>
      </div>

      <div className="row mb-10">
        <div className="col-md-4 col-lg-4 col-sm-12">
          <div className="mb-4">
            <label className="form-label" htmlFor="passenger">
              Passenger: <span className="validate">*</span>
            </label>

            <input
              type="number"
              id="passenger"
              className="form-control"
              placeholder="Enter Passenger..."
              name="Passenger"
              value={booking.qty || 0}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="col-md-4 col-lg-4 col-sm-12">
          <div className="mb-4">
            <label className="form-label" htmlFor="email">
              Payment Status: <span className="validate">*</span>
            </label>

            <Select
              id="fileStatus"
              options={fileStatusOptions}
              value={fileStatusOptions.find(
                (opt) => opt.value === booking.file_status
              )}
              onChange={handleFileStatusChange}
              placeholder="Select File Status"
              isClearable={false}
            />
          </div>
        </div>

        <div className="col-md-4 col-lg-4 col-sm-12">
          <div className="mb-4">
            <label className="form-label" htmlFor="remarks">
              Remarks: <span className="validate">*</span>
            </label>

            <textarea
              rows={3}
              id="remarks"
              className="form-control"
              placeholder="Enter Remarks..."
              name="remarks"
              value={booking.remarks}
              onChange={handleChange}
            />
          </div>
        </div>
      </div>

      <div className="row mb-10">
        <div className="col-md-4 col-lg-4 col-sm-12">
          <div className="mb-4">
            <label className="form-label" htmlFor="deposit">
              Deposit Amount: <span className="validate">*</span>
            </label>

            <input
              type="text"
              id="deposit"
              className="form-control"
              placeholder="Enter Deposit..."
              name="deposit_amount"
              value={
                booking.deposit_amount
                  ? booking.deposit_amount.toLocaleString("en-US")
                  : ""
              }
              onChange={(e) => {
                const raw = e.target.value.replace(/,/g, "");
                const num = Number(raw);

                const remaining = booking.total_amount
                  ? booking.total_amount - num
                  : 0;

                setBookings([
                  {
                    ...booking,
                    deposit_amount: num,
                    remaining_amount: remaining,
                  },
                ]);
              }}
            />
          </div>
        </div>

        <div className="col-md-4 col-lg-4 col-sm-12">
          <div className="mb-4">
            <label className="form-label" htmlFor="Remaining">
              Remaining Amount: <span className="validate">*</span>
            </label>

            <input
              type="text"
              id="Remaining"
              className="form-control"
              placeholder="Enter Remaining..."
              name="remaining_amount"
              value={
                booking.remaining_amount
                  ? booking.remaining_amount.toLocaleString("en-US")
                  : ""
              }
              readOnly
            />
          </div>
        </div>

        <div className="col-md-4 col-lg-4 col-sm-12">
          <div className="mb-4">
            <label className="form-label" htmlFor="totalAmount">
              Total Amount: <span className="validate">*</span>
            </label>

            <input
              type="text"
              id="totalAmount"
              className="form-control"
              placeholder="Enter Total Amount..."
              name="totalAmount"
              value={
                booking.total_amount
                  ? booking.total_amount.toLocaleString("en-US")
                  : ""
              }
              onChange={(e) => {
                const raw = e.target.value.replace(/,/g, "");
                const num = Number(raw);

                const remaining = booking.deposit_amount
                  ? num - booking.deposit_amount
                  : num;

                setBookings([
                  {
                    ...booking,
                    total_amount: num,
                    remaining_amount: remaining,
                  },
                ]);
              }}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default AddBooking;
