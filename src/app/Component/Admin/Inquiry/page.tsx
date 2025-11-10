"use client";
import React, { useState, useEffect } from "react";
import { withLayout } from "../../Layout";
import Link from "next/link";
import { FaChevronRight } from "react-icons/fa";
import DataTable from "react-data-table-component";
import axios from "axios";
import { toast } from "react-toastify";

interface Inquiry {
  id: number;
  from_location: string;
  to_location: string;
  departDate: string;
  returnDate?: string;
  adults: number;
  children: number;
  infants: number;
  name: string;
  email: string;
  phone: string;
  tripType?: string;
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

const Inquiry = () => {
  // --------------------Browse Data start--------------------

  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [refresh, setRefresh] = useState(false);
  const [filterText, setFilterText] = useState("");

  const fetchInquiries = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/inquiries`
      );
      const sortedData = response.data.sort(
        (a: Inquiry, b: Inquiry) => b.id - a.id
      );
      setInquiries(sortedData);
    } catch (error: any) {
      toast.error("Error fetching inquiries: " + error.message, {
        position: "top-right",
      });
    }
  };

  useEffect(() => {
    fetchInquiries();
  }, [refresh]);

  // --------------------Browse Data end--------------------

  // ------------------ Filter Logic Start------------------
  const handleFilter = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilterText(e.target.value);
  };

  const filteredItems = inquiries.filter((item) =>
    Object.values(item).some((value) =>
      String(value).toLowerCase().includes(filterText.toLowerCase())
    )
  );

  // ------------------ Filter Logic End------------------

  // ------------------ Column Start------------------
  const columns = [
    {
      name: "Action",
      cell: (row: Inquiry) => (
        <button type="button" className="btn btn-view btn-sm">
          View
        </button>
      ),
    },
    {
      name: "From",
      selector: (row: Inquiry) => row.from_location,
      sortable: true,
    },
    { name: "To", selector: (row: Inquiry) => row.to_location, sortable: true },
    { name: "Name", selector: (row: Inquiry) => row.name, sortable: true },
    { name: "Email", selector: (row: Inquiry) => row.email, sortable: true },
    { name: "Phone", selector: (row: Inquiry) => row.phone, sortable: true },
    {
      name: "Trip Type",
      selector: (row: Inquiry) => row.tripType || "-",
      sortable: true,
    },
    {
      name: "Depart Date",
      selector: (row: Inquiry) => row.departDate,
      sortable: true,
    },
    {
      name: "Return Date",
      selector: (row: Inquiry) => row.returnDate || "-",
      sortable: true,
    },
    {
      name: "Created Date",
      selector: (row: Inquiry) =>
        new Intl.DateTimeFormat("en-GB", {
          day: "2-digit",
          month: "short",
          year: "numeric",
        }).format(new Date(row.created_at)),
      sortable: true,
    },
  ];

  // ------------------ Column End------------------

  return (
    <>
      <div className="breadcrumbs-area">
        <h3>Inquiry</h3>
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
          <li>Inquiry</li>
        </ul>
      </div>

      <div className="card mb-6">
        <div className="card-header">
          <div className="row row-header">
            <div className="col-md-6">
              <h4>Inquiry</h4>
            </div>
            <div className="col-md-6 btn-Header">
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

export default withLayout(Inquiry);
