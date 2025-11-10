"use client";
import React, { useState, useEffect } from "react";
import { withLayout } from "../../Layout";
import Link from "next/link";
import { FaChevronRight } from "react-icons/fa";
import DataTable from "react-data-table-component";
import axios from "axios";
import { toast, Slide } from "react-toastify";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { encryptData } from "../../utility/encryptDecrypt";

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
  view_id?: number;
  user_name?: string;
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
  const router = useRouter();

  // --------------------Browse Data start--------------------

  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [refresh, setRefresh] = useState(false);
  const [filterText, setFilterText] = useState("");
  const [userId, setUserId] = useState(0);

  const fetchInquiries = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/inquiries`
      );

      var sortedData = response.data.sort((a: Inquiry, b: Inquiry) => {
        return (
          new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
        );
      });

      var user = Cookies.get("user");
      var parsedUser = JSON.parse(user!);
      setUserId(parsedUser.id);

      if (parsedUser.role !== "admin") {
        sortedData = sortedData.filter((inquiry: Inquiry) => {
          return inquiry.view_id === null || inquiry.view_id === parsedUser.id;
        });
      }

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
      name: "Sr. No",
      cell: (row: Inquiry, index: number) => (
        <strong>{row.id.toString().padStart(3, "0")}</strong>
      ),
      width: "80px",
      sortable: false,
    },

    {
      name: "Inquiry Date",
      selector: (row: Inquiry) =>
        new Intl.DateTimeFormat("en-GB", {
          day: "2-digit",
          month: "short",
          year: "numeric",
        }).format(new Date(row.created_at)),
      sortable: true,
      width: "140px",
    },
    {
      name: "To",
      cell: (row: Inquiry) => {
        const loc = row.to_location || "";
        const firstVisible = 3; // starting characters
        const visibleStart = loc.slice(0, firstVisible);
        const hiddenPart = "*******"; // hamesha 5 stars

        return (
          <span style={{ whiteSpace: "nowrap" }}>
            <strong>Flight Search: </strong>
            {visibleStart} - {hiddenPart}
          </span>
        );
      },
      sortable: true,
      width: "250px",
    },
    { name: "Name", selector: (row: Inquiry) => row.name, sortable: true },
    {
      name: "Email",
      selector: (row: Inquiry) => {
        const email = row.email || "";
        const [namePart, domainPart] = email.split("@");

        if (!namePart || !domainPart) return email;

        const hiddenName = namePart.slice(0, 3) + "***";
        const hiddenDomain = domainPart.slice(0, 2) + "...";

        return `${hiddenName}@${hiddenDomain}`;
      },
      sortable: true,
    },
    {
      name: "Phone",
      selector: (row: Inquiry) => {
        const phone = row.phone || "";

        // Keep first 4 characters visible (country code + first digits)
        const visibleCount = 4;
        if (phone.length <= visibleCount) return phone;

        const visiblePart = phone.slice(0, visibleCount);
        const hiddenPart = "*".repeat(phone.length - visibleCount);

        return visiblePart + hiddenPart;
      },
      sortable: true,
    },
    {
      name: "Brand",
      cell: (row: Inquiry) => <span>Sky Nova Travels</span>,
    },
    {
      name: "Action",
      cell: (row: Inquiry) => {
        const isViewed = !!row.view_id;

        return (
          <button
            type="button"
            className={`btn ${isViewed ? "btn-viewed" : "btn-view"} btn-sm`}
            onClick={(e) => {
              e.preventDefault();
              if (isViewed && row.view_id) {
                handlePush(row.view_id);
              } else {
                handleView(row.id, userId);
              }
            }}
          >
            {isViewed ? row.user_name : "View"}
          </button>
        );
      },
    },
  ];

  // ------------------ Column End------------------

  // ----------------- Update data ------------------------

  const handleView = async (id: number, userId: number) => {
    try {
      debugger;
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/update-inquiry`,
        {
          id: id,
          view_id: userId,
        }
      );

      if (response.status === 200) {
        toast.success(response.data.message, {
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

        setRefresh(!refresh);
        router.push(`/Component/Admin/inquiryFollowup/${encryptData(id)}`);
      } else if (response.status === 404) {
        toast.error(response.data.message, {
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
      toast.error("Error updating inquiry: " + error.message, {
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

  const handlePush = async (userId: number) => {
    if (userId) {
      router.push(`/Component/Admin/inquiryFollowup/${encryptData(userId)}`);
    }
  };

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
