"use client";
import React, { useState, useEffect } from "react";
import { withLayout } from "../../Layout";
import Link from "next/link";
import { FaChevronRight } from "react-icons/fa";
import DataTable from "react-data-table-component";
import axios from "axios";
import { toast, Slide } from "react-toastify";
import Cookies from "js-cookie";
import { encryptData } from "../../utility/encryptDecrypt";
import { useRouter } from "next/navigation";

export interface FollowUpSchedule {
  id: number;
  inquiry_id: number;
  user_id: number;
  follow_up_date: string;
  follow_up_time: string;
  is_read: number;
  name: string;
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

const FollowupReminder = () => {
  const route = useRouter();

  // --------------------Browse Data start--------------------

  const [FollowUpSchedule, setFollowUpSchedule] = useState<FollowUpSchedule[]>(
    []
  );
  const [refresh, setRefresh] = useState(false);
  const [filterText, setFilterText] = useState("");
  const [userId, setUserId] = useState(0);

  const fetchInquiries = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/inquiry/getfollowupschedule`
      );

      var sortedData = response.data.sort(
        (a: FollowUpSchedule, b: FollowUpSchedule) => {
          return (
            new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
          );
        }
      );

      var user = Cookies.get("user");
      var parsedUser = JSON.parse(user!);
      setUserId(parsedUser.id);

      if (parsedUser.role !== "admin") {
        sortedData = sortedData.filter((inquiry: FollowUpSchedule) => {
          return inquiry.user_id === null || inquiry.user_id === parsedUser.id;
        });
      }

      setFollowUpSchedule(sortedData);
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

  const filteredItems = FollowUpSchedule.filter((item) =>
    Object.values(item).some((value) =>
      String(value).toLowerCase().includes(filterText.toLowerCase())
    )
  );

  // ------------------ Filter Logic End------------------

  // ------------------ Column Start------------------
  const columns = [
    {
      name: "Sr. No",
      cell: (row: FollowUpSchedule, index: number) => (
        <strong>{row.id.toString().padStart(3, "0")}</strong>
      ),
      width: "80px",
      sortable: false,
    },

    {
      name: "Follow-Up Date",
      selector: (row: FollowUpSchedule) =>
        new Intl.DateTimeFormat("en-GB", {
          day: "2-digit",
          month: "short",
          year: "numeric",
        }).format(new Date(row.follow_up_date)),
      sortable: true,
      width: "200px",
    },
    {
      name: "Follow-Up Time",
      cell: (row: FollowUpSchedule) => {
        const time = row.follow_up_time;
        const [h, m] = time.split(":");

        const hours = parseInt(h, 10);
        const minutes = m;

        const suffix = hours >= 12 ? "PM" : "AM";
        const formattedHour = hours % 12 === 0 ? 12 : hours % 12;

        return `${formattedHour}:${minutes} ${suffix}`;
      },
      sortable: true,
      width: "200px",
    },
    {
      name: "Inquiry ID",
      cell: (row: FollowUpSchedule) => (
        <a style={{ cursor: "pointer", color: "#007BFF" }} onClick={() => handleNext(row)}>
          <strong>{row.inquiry_id.toString().padStart(3, "0")}</strong>
        </a>
      ),
      width: "100px",
      sortable: false,
    },
    {
      name: "Status",
      cell: (row: FollowUpSchedule) => {
        const isRead = row.is_read === 1;

        return (
          <span className={`badge ${isRead ? "bg-success" : "bg-danger"}`}>
            {isRead ? "Read" : "Un-Read"}
          </span>
        );
      },
      sortable: true,
    },
    {
      name: "Name",
      selector: (row: FollowUpSchedule) => row.name,
      sortable: true,
    },
    {
      name: "Brand",
      cell: (row: FollowUpSchedule) => <span>Sky Nova Travels</span>,
    },
  ];

  // ------------------ Column End------------------

  // handleNext function
  const handleNext = async (row: FollowUpSchedule) => {
    try {
      const result = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/update-followup`,
        {
          id: row.id,
          is_read: 1,
        }
      );

      if (result.status === 200) {
        setRefresh(!refresh);

        // Use inquiry_id from the row
        route.push(
          `/Component/Admin/inquiryDetail/${encryptData(row.inquiry_id)}`
        );
      }
    } catch (error: any) {
      toast.error("Error fetching inquiries: " + error.message, {
        position: "top-right",
      });
    }
  };

  return (
    <>
      <div className="breadcrumbs-area">
        <h3>Follow Up Reminder</h3>
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
          <li>Follow Up Reminder</li>
        </ul>
      </div>

      <div className="card mb-6">
        <div className="card-header">
          <div className="row row-header">
            <div className="col-md-6">
              <h4>Follow Up Reminder</h4>
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

export default withLayout(FollowupReminder);
