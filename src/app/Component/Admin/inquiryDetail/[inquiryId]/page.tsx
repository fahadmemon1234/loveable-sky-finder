"use client";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { withLayout } from "../../../Layout";
import { decryptData } from "@/app/Component/utility/encryptDecrypt";
import axios from "axios";
import DataTable from "react-data-table-component";
import Select from "react-select";
import { toast, Slide } from "react-toastify";

interface Comment {
  id: number;
  inquiry_id: number;
  comment: string;
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

const InquiryDetail = () => {
  const params = useParams();
  const { inquiryId } = params;
  const id = decryptData(inquiryId);

  const [loading, setLoading] = useState(false);
  const [from, setFrom] = useState<any>(null);
  const [to, setTo] = useState<any>(null);
  const [departDate, setDepartDate] = useState<Date | undefined>();
  const [returnDate, setReturnDate] = useState<Date | undefined>();
  const [adults, setAdults] = useState("1");
  const [children, setChildren] = useState("0");
  const [infants, setInfants] = useState("0");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const [searchTerm, setSearchTerm] = useState("");
  const [flights, setFlights] = useState([]);

  const [loadingFrom, setLoadingFrom] = useState(false);
  // From
  useEffect(() => {
    const fetchAirports = async () => {
      setLoadingFrom(true);
      try {
        let response = null;

        if (searchTerm == null || searchTerm.trim().length === 0) {
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

        // Map backend data to react-select options
        const options = (response.data.airports || []).map((a: any) => ({
          label: `${a.airport_code} - ${a.airport_name} (${a.city}, ${a.country})`,
          value: a.airport_code,
        }));
        setFlights(options);
      } catch (err) {
        console.error(err);
      } finally {
        setLoadingFrom(false);
      }
    };

    const delay = setTimeout(() => {
      if (searchTerm.trim().length === 0 || searchTerm.trim().length >= 1) {
        fetchAirports();
      }
    }, 500);

    return () => clearTimeout(delay);
  }, [searchTerm]);

  // to
  const [searchTermTo, setSearchTermTo] = useState("");
  const [LoadingTo, setLoadingTo] = useState(false);
  useEffect(() => {
    const fetchAirports = async () => {
      setLoadingTo(true);
      try {
        let response = null;
        if (searchTermTo.trim().length === 0) {
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
              params: { mode: "search", search: searchTermTo },
            }
          );
        }

        const options = (response.data.airports || []).map((a: any) => ({
          label: `${a.airport_code} - ${a.airport_name} (${a.city}, ${a.country})`,
          value: a.airport_code,
          city: a.city,
          country: a.country,
        }));
        setFlights(options);
      } catch (err: any) {
        toast.error("Error fetching inquiries: " + err.message, {
          position: "top-right",
        });
      } finally {
        setLoadingTo(false);
      }
    };

    const delay = setTimeout(() => {
      fetchAirports();
    }, 500);

    return () => clearTimeout(delay);
  }, [searchTermTo]);

  const [inquiry, setInquiry] = useState<any>(null);

  useEffect(() => {
    const fetchInquiry = async () => {
      try {
        if (!id) return;

        debugger;
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/inquiry/GetInquiryByID/${id}`
        );

        const data = response.data[0];
        // console.log("✅ Inquiry Data:", data);
        setInquiry(data);

        setFrom({
          label: data.from_location,
          value: data.from_location,
        });
        setTo({
          label: data.to_location,
          value: data.to_location,
        });

        setAdults(data.adults);
        setChildren(data.children);
        setInfants(data.infants);

        setDepartDate(new Date(data.departDate));
        setReturnDate(new Date(data.returnDate));

        setName(data.name);
        setEmail(data.email);
        setPhone(data.phone);
      } catch (err: any) {
        toast.error("Error fetching inquiries: " + err.message, {
          position: "top-right",
        });
      }
    };

    fetchInquiry();
  }, [id]);

  // -------------------------- Comment Fetch Start --------------------------------

  // --------------------Browse Data start--------------------

  const [comments, setComments] = useState<Comment[]>([]);
  const [refresh, setRefresh] = useState(false);
  const [filterText, setFilterText] = useState("");

  const fetchInquiries = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/inquiry/GetCommentsByID/${id}`
      );

      setComments(response.data);
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

  const filteredItems = comments.filter((item) =>
    Object.values(item).some((value) =>
      String(value).toLowerCase().includes(filterText.toLowerCase())
    )
  );

  // ------------------ Filter Logic End------------------

  // ------------------ Column Start------------------
  const columns = [
    {
      name: "Sr. No",
      cell: (_row: Comment, index: number) => (
        <strong>{(index + 1).toString().padStart(3, "0")}</strong>
      ),
      width: "80px",
      sortable: false,
    },
    {
      name: "Comment",
      cell: (row: Comment) => {
        return <span>{row.comment}</span>;
      },
      sortable: true,
      wrap: true,
      width: "650px",
      grow: 1,
    },

    {
      name: "Created Date",
      selector: (row: Comment) =>
        new Intl.DateTimeFormat("en-GB", {
          day: "2-digit",
          month: "short",
          year: "numeric",
        }).format(new Date(row.created_at)),
      sortable: true,
      width: "140px",
    },

    {
      name: "Created Time",
      selector: (row: Comment) =>
        new Intl.DateTimeFormat("en-GB", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
        }).format(new Date(row.created_at)),
      sortable: true,
      width: "150px",
    },
  ];

  // ------------------ Column End------------------

  return (
    <>
      <div className="card shadow-sm rounded mb-10">
        <div className="card-body">
          <div className="p-4 ">
            <form className="p-4  mt-5">
              <div className="d-flex flex-wrap justify-content-center gap-3 mb-3">
                <div className="form-check-inline form-check-inline">
                  <input
                    className="form-check-input custom-radio"
                    type="radio"
                    name="tripType"
                    id="round"
                    value="round"
                    checked={inquiry?.tripType === "round"}
                    onChange={() =>
                      setInquiry((prev: any) => ({
                        ...prev,
                        tripType: "round",
                      }))
                    }
                  />
                  <label
                    className="form-check-label fw-semibold"
                    htmlFor="round"
                    style={{ paddingLeft: "10px" }}
                  >
                    Round Trip
                  </label>
                </div>

                <div className="form-check-inline form-check-inline">
                  <input
                    className="form-check-input custom-radio"
                    type="radio"
                    name="tripType"
                    id="one"
                    value="one"
                    checked={inquiry?.tripType === "one"}
                    onChange={() =>
                      setInquiry((prev: any) => ({ ...prev, tripType: "one" }))
                    }
                  />
                  <label
                    className="form-check-label fw-semibold"
                    htmlFor="one"
                    style={{ paddingLeft: "10px" }}
                  >
                    One Way
                  </label>
                </div>
              </div>

              <div className="container">
                <div className="row mt-20 mb-20">
                  <div className="col-md-6">
                    <label
                      className="form-check-label mb-10 fw-semibold"
                      htmlFor="from"
                    >
                      From *
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
                      options={flights}
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

                  <div className="col-md-6">
                    <label
                      className="form-check-label mb-10 fw-semibold"
                      htmlFor="to"
                    >
                      To *
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
                      options={flights} // same flights array used for "from"
                      isLoading={LoadingTo}
                      placeholder="Destination city..."
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

                <div className="row mt-20 mb-20">
                  <div className="col-md-6">
                    <label
                      className="form-check-label mb-10 fw-semibold"
                      htmlFor="DepartDate"
                    >
                      Depart Date *
                    </label>

                    <input
                      type="date"
                      id="DepartDate"
                      className="form-control"
                      value={
                        departDate
                          ? new Date(
                              departDate.getTime() -
                                departDate.getTimezoneOffset() * 60000
                            )
                              .toISOString()
                              .split("T")[0]
                          : ""
                      } // Adjust for timezone to show correct local date
                      onChange={(e) =>
                        setDepartDate(
                          e.target.value ? new Date(e.target.value) : undefined
                        )
                      }
                    />
                  </div>

                  {inquiry?.tripType === "round" && (
                    <div className="col-md-6">
                      <label
                        className="form-check-label mb-10 fw-semibold"
                        htmlFor="returnDate"
                      >
                        Return Date *
                      </label>

                      <input
                        type="date"
                        id="returnDate"
                        className="form-control"
                        value={
                          returnDate
                            ? new Date(
                                returnDate.getTime() -
                                  returnDate.getTimezoneOffset() * 60000
                              )
                                .toISOString()
                                .split("T")[0]
                            : ""
                        } // Adjust for timezone to show correct local date
                        onChange={(e) =>
                          setReturnDate(
                            e.target.value
                              ? new Date(e.target.value)
                              : undefined
                          )
                        }
                      />
                    </div>
                  )}
                </div>

                <div className="row g-4 my-4 mb-20">
                  {[
                    {
                      label: "Adults (12+ years)",
                      value: adults,
                      setValue: setAdults,
                    },
                    {
                      label: "Children (2–11 years)",
                      value: children,
                      setValue: setChildren,
                    },
                    {
                      label: "Infants (below 2 years)",
                      value: infants,
                      setValue: setInfants,
                    },
                  ].map(({ label, value, setValue }) => (
                    <div className="col-md-4" key={label}>
                      <label className="form-label fw-semibold d-block mb-10">
                        {label}
                      </label>

                      <div
                        className="d-flex align-items-center justify-content-between border rounded-4 shadow-sm px-2 py-1 bg-white"
                        style={{ minHeight: "48px" }}
                      >
                        <button
                          type="button"
                          onClick={() =>
                            setValue((prev: any) =>
                              Number(prev) > 0 ? String(Number(prev) - 1) : "0"
                            )
                          }
                          className="btn fw-bold flex-fill"
                          style={{
                            backgroundColor: "#ecb51e",
                            color: "black !important",
                            border: "none",
                            borderRadius: "8px",
                            marginRight: "6px",
                            transition: "all 0.2s ease-in-out",
                          }}
                          onMouseEnter={(e) =>
                            (e.currentTarget.style.opacity = "0.9")
                          }
                          onMouseLeave={(e) =>
                            (e.currentTarget.style.opacity = "1")
                          }
                        >
                          –
                        </button>

                        <span
                          className="text-center fw-semibold flex-fill py-1"
                          style={{
                            minWidth: "50px",
                            border: "1px solid #eee",
                            borderRadius: "8px",
                          }}
                        >
                          {value}
                        </span>

                        <button
                          type="button"
                          onClick={() =>
                            setValue((prev: any) =>
                              Number(prev) < 9 ? String(Number(prev) + 1) : "9"
                            )
                          }
                          className="btn fw-bold flex-fill"
                          style={{
                            backgroundColor: "#ecb51e",
                            color: "black !important",
                            border: "none",
                            borderRadius: "8px",
                            marginLeft: "6px",
                            transition: "all 0.2s ease-in-out",
                          }}
                          onMouseEnter={(e) =>
                            (e.currentTarget.style.opacity = "0.9")
                          }
                          onMouseLeave={(e) =>
                            (e.currentTarget.style.opacity = "1")
                          }
                        >
                          +
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="row g-4 my-4 mb-20">
                  <div className="col-md-4">
                    <label
                      className="form-check-label mb-10 fw-semibold"
                      htmlFor="Name"
                    >
                      Name *
                    </label>

                    <input
                      type="text"
                      id="Name"
                      className="form-control"
                      placeholder="Enter Name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>

                  <div className="col-md-4">
                    <label
                      className="form-check-label mb-10 fw-semibold"
                      htmlFor="Email"
                    >
                      Email *
                    </label>

                    <input
                      type="text"
                      id="Email"
                      className="form-control"
                      placeholder="Enter Email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>

                  <div className="col-md-4">
                    <label
                      className="form-check-label mb-10 fw-semibold"
                      htmlFor="Phone"
                    >
                      Phone *
                    </label>

                    <input
                      type="text"
                      id="Phone"
                      className="form-control"
                      placeholder="Enter Phone"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                    />
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>

      <div className="card shadow-sm rounded mb-6">
        <div className="card-header">
          <div className="row row-header">
            <div className="col-md-6">
              <h4>Comments</h4>
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

export default withLayout(InquiryDetail);
