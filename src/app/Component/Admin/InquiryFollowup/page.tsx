"use client";
import React, { useEffect, useState, useRef } from "react";
import { withLayout } from "../../Layout";
import Link from "next/link";
import { FaChevronRight } from "react-icons/fa";
import DataTable from "react-data-table-component";
import axios from "axios";
import { toast, Slide } from "react-toastify";
import Cookies from "js-cookie";
import { FaRegComment, FaRegCalendarAlt } from "react-icons/fa";
import AddComment from "./_AddComment";
import SmallModal from "../../Modal/smallModal";

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

const InquiryFollowup = () => {
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
          return inquiry.view_id === parsedUser.id;
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
      cell: (_row: Inquiry, index: number) => (
        <strong>{(index + 1).toString().padStart(3, "0")}</strong>
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
      name: "Inquiry ID",
      cell: (_row: Inquiry, index: number) => (
        <strong>{_row.id.toString().padStart(3, "0")}</strong>
      ),
      width: "100px",
      sortable: false,
    },
    {
      name: "Inquiry Title",
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
    {
      name: "Going Date + Pax",
      selector: (row: Inquiry) => {
        const formattedDate = new Intl.DateTimeFormat("en-GB", {
          day: "2-digit",
          month: "short",
          year: "numeric",
        }).format(new Date(row.departDate));

        const totalPax =
          (Number(row.adults) || 0) +
          (Number(row.children) || 0) +
          (Number(row.infants) || 0);

        return `${formattedDate} | ${totalPax} Pax`;
      },
      sortable: true,
      width: "160px",
    },
    {
      name: "Phone",
      selector: (row: Inquiry) => {
        const phone = row.phone || "";
        const visibleCount = 4;
        if (phone.length <= visibleCount) return phone;

        const visiblePart = phone.slice(0, visibleCount);
        const hiddenPart = "*".repeat(phone.length - visibleCount);

        return visiblePart + hiddenPart;
      },
      sortable: true,
    },
    {
      name: "Pick By",
      width: "150px",
      cell: (row: Inquiry) => {
        const name = String(row.user_name || "");
        const displayName = name.length > 10 ? name.slice(0, 10) + "..." : name;

        return <span title={name}>{displayName}</span>;
      },
    },

    {
      name: "Action",
      width: "120px",
      cell: (row: Inquiry) => {
        const isViewed = !!row.view_id;

        return (
          <div className="flex items-center justify-center gap-2">
            <button
              type="button"
              className="cursor-pointer"
              style={{ paddingRight: "10px" }}
              onClick={() => openModal(row.id)}
            >
              <FaRegComment className="w-20 h-20 font-bold text-customColor" />
            </button>

            <button type="button" className="cursor-pointer">
              <FaRegCalendarAlt className="w-20 h-20 font-bold text-customColor-2" />
            </button>
          </div>
        );
      },
    },
  ];

  // ------------------ Column End------------------

  // ------------------ Model Box Start------------------

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [Title, setTile] = useState("");
  const [selectedInquiryId, setSelectedInquiryId] = useState<number | null>(
    null
  );

  const [comment, setComment] = useState<string>("");
  const commentRef = useRef<HTMLTextAreaElement>(null);

  const openModal = (id?: number) => {
    setTile("Add Comment");
    resetFields();
    if (typeof id === "number") {
      setSelectedInquiryId(id);
      setIsModalOpen(true);
    }
  };

  const resetFields = () => {
    setComment("");
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedInquiryId(null);
    resetFields();
  };

  const Validation = () => {
    if (!comment) {
      toast.error("Comment is Required", {
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
      commentRef.current?.focus();
      return false;
    }

    return true;
  };

  const handleSave = async (e: React.FormEvent) => {
    try {
      e.preventDefault();
      if (!Validation()) return;
      debugger;
      var user = Cookies.get("user");
      var parsedUser = JSON.parse(user!);

      const data = {
        userId: parsedUser.id,
        inquiry_id: selectedInquiryId,
        comment: comment,
      };

      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/inquiry/AddComment`,
        data
      );

      if (response.data.status === 200) {
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

        setIsModalOpen(false);
        setSelectedInquiryId(null);
        resetFields();
        setRefresh(!refresh);
      } else if (response.data.status === 400) {
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

  // ------------------ Model Box End------------------

  return (
    <>
      <div className="breadcrumbs-area">
        <h3>Inquiry Follow-Up</h3>
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
          <li>Inquiry Follow-Up</li>
        </ul>
      </div>

      <div className="card mb-6">
        <div className="card-header">
          <div className="row row-header">
            <div className="col-md-6">
              <h4>Inquiry Follow-Up</h4>
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

      <SmallModal
        title={Title}
        smallModalView={
          <AddComment
            comment={comment}
            setComment={setComment}
            commentRef={commentRef}
          />
        }
        onClose={closeModal}
        onSave={handleSave}
        show={isModalOpen}
      />
    </>
  );
};

export default withLayout(InquiryFollowup);
