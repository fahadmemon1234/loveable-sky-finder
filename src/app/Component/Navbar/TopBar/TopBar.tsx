"use client";
import React, { useState, useEffect } from "react";
import { useSidebar } from "../../context/SidebarContext";
import Link from "next/link";
import Cookies from "js-cookie";
import { ref, get } from "firebase/database";
import Image from "next/image";
import { db } from "@/app/lib/firebase";
import { AllData } from "../../utility/options";
import { toast } from "react-toastify";

const TopBar = () => {
  const { toggleSidebar } = useSidebar();

  const hadleLogout = () => {
    Cookies.remove(".AuthBearer");
    Cookies.remove("user_Uid");
    Cookies.remove("schoolName");
  };

  var Name = Cookies.get("schoolName");
  var Email = Cookies.get("email");
  var id = Cookies.get("user_Uid");

  const [user, setUser] = useState<AllData[]>([]);
  const [profileImageUrl, setProfileImageUrl] = useState<string>("");

  useEffect(() => {
    const fetchUserList = async () => {
      try {
        const userRef = ref(db, "users");
        const userSnapshot = await get(userRef);
        if (userSnapshot.exists()) {
          const data = userSnapshot.val();

          const formattedUserList: AllData[] = Object.keys(data)
            .map((key) => ({
              id: key,
              ...data[key],
            }))
            .filter((item) => item.UId === id);

          const sortedTableData = formattedUserList.sort((a, b) =>
            b.id.localeCompare(a.id)
          );

          setUser(sortedTableData);

          if (sortedTableData[0]?.ProfileImage) {
            setProfileImageUrl(sortedTableData[0].ProfileImage as string);
          }
        } else {
          toast.error("No data found", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
        }
      } catch (error: unknown) {
        const errorMessage =
          error instanceof Error ? error.message : String(error);
        toast.error("Error fetching class list: " + errorMessage, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
    };

    const userInterval = setInterval(fetchUserList, 2000);

    return () => {
      clearInterval(userInterval);
    };

    // fetchUserList();
  }, []);

  return (
    <>
      <div className="top-navbar flex-between gap-16">
        <div className="flex-align gap-16">
          {/* <!-- Toggle Button Start --> */}
          <button
            type="button"
            className="toggle-btn d-xl-none d-flex text-26 text-gray-500"
            onClick={toggleSidebar}
          >
            <i className="ph ph-list"></i>
          </button>
          {/* <!-- Toggle Button End --> */}

          <form action="#" className="w-350 d-sm-block d-none">
            <div className="position-relative">
              <button
                type="submit"
                className="input-icon text-xl d-flex text-gray-100 pointer-event-none"
              >
                <i className="ph ph-magnifying-glass"></i>
              </button>
              <input
                type="text"
                className="form-control ps-40 h-40 border-transparent focus-border-main-600 bg-main-50 rounded-pill placeholder-15"
                placeholder="Search..."
              />
            </div>
          </form>
        </div>

        <div className="flex-align gap-16">
          <div className="flex-align gap-8">
            {/* <!-- Notification Start --> */}
            {/* <div className="dropdown">
              <button
                className="dropdown-btn shaking-animation text-gray-500 w-40 h-40 bg-main-50 hover-bg-main-100 transition-2 rounded-circle text-xl flex-center"
                type="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <span className="position-relative">
                  <i className="ph ph-bell"></i>
                  <span className="alarm-notify position-absolute end-0"></span>
                </span>
              </button>
              <div className="dropdown-menu dropdown-menu--lg border-0 bg-transparent p-0">
                <div className="card border border-gray-100 rounded-12 box-shadow-custom p-0 overflow-hidden">
                  <div className="card-body p-0">
                    <div className="py-8 px-24 bg-main-600">
                      <div className="flex-between">
                        <h5 className="text-xl fw-semibold text-white mb-0">
                          Notifications
                        </h5>
                        <div className="flex-align gap-12">
                          <button
                            type="button"
                            className="bg-white rounded-6 text-sm px-8 py-2 hover-text-primary-600"
                          >
                            {" "}
                            New{" "}
                          </button>
                          <button
                            type="button"
                            className="close-dropdown hover-scale-1 text-xl text-white"
                          >
                            <i className="ph ph-x"></i>
                          </button>
                        </div>
                      </div>
                      
                    </div>
                    <div className="p-24 max-h-270 overflow-y-auto scroll-sm">
                      <div className="d-flex align-items-start gap-12">
                        <img
                          src="/assets/images/thumbs/notification-img1.png"
                          alt=""
                          className="w-48 h-48 rounded-circle object-fit-cover"
                        />
                        <div className="border-bottom border-gray-100 mb-24 pb-24">
                          <div className="flex-align gap-4">
                            <a
                              href="#"
                              className="fw-medium text-15 mb-0 text-gray-300 hover-text-main-600 text-line-2"
                            >
                              Ashwin Bose is requesting access to Design File -
                              Final Project.{" "}
                            </a>
                            <div className="dropdown flex-shrink-0">
                              <button
                                className="text-gray-200 rounded-4"
                                type="button"
                                data-bs-toggle="dropdown"
                                aria-expanded="false"
                              >
                                <i className="ph-fill ph-dots-three-outline"></i>
                              </button>
                              <div className="dropdown-menu dropdown-menu--md border-0 bg-transparent p-0">
                                <div className="card border border-gray-100 rounded-12 box-shadow-custom">
                                  <div className="card-body p-12">
                                    <div className="max-h-200 overflow-y-auto scroll-sm pe-8">
                                      <ul>
                                        <li className="mb-0">
                                          <a
                                            href="#"
                                            className="py-6 text-15 px-8 hover-bg-gray-50 text-gray-300 rounded-8 fw-normal text-xs d-block"
                                          >
                                            <span className="text">
                                              Mark as read
                                            </span>
                                          </a>
                                        </li>
                                        <li className="mb-0">
                                          <a
                                            href="#"
                                            className="py-6 text-15 px-8 hover-bg-gray-50 text-gray-300 rounded-8 fw-normal text-xs d-block"
                                          >
                                            <span className="text">
                                              Delete Notification
                                            </span>
                                          </a>
                                        </li>
                                        <li className="mb-0">
                                          <a
                                            href="#"
                                            className="py-6 text-15 px-8 hover-bg-gray-50 text-gray-300 rounded-8 fw-normal text-xs d-block"
                                          >
                                            <span className="text">Report</span>
                                          </a>
                                        </li>
                                      </ul>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="flex-align gap-6 mt-8">
                            <img
                              src="/assets/images/icons/google-drive.png"
                              alt=""
                            />
                            <div className="flex-align gap-4">
                              <p className="text-gray-900 text-sm text-line-1">
                                Design brief and ideas.txt
                              </p>
                              <span className="text-xs text-gray-200 flex-shrink-0">
                                2.2 MB
                              </span>
                            </div>
                          </div>
                          <div className="mt-16 flex-align gap-8">
                            <button
                              type="button"
                              className="btn btn-main py-8 text-15 fw-normal px-16"
                            >
                              Accept
                            </button>
                            <button
                              type="button"
                              className="btn btn-outline-gray py-8 text-15 fw-normal px-16"
                            >
                              Decline
                            </button>
                          </div>
                          <span className="text-gray-200 text-13 mt-8">
                            2 mins ago
                          </span>
                        </div>
                      </div>
                      <div className="d-flex align-items-start gap-12">
                        <img
                          src="/assets/images/thumbs/notification-img2.png"
                          alt=""
                          className="w-48 h-48 rounded-circle object-fit-cover"
                        />
                        <div className="">
                          <a
                            href="#"
                            className="fw-medium text-15 mb-0 text-gray-300 hover-text-main-600 text-line-2"
                          >
                            Patrick added a comment on Design Assets - Smart
                            Tags file:
                          </a>
                          <span className="text-gray-200 text-13">
                            2 mins ago
                          </span>
                        </div>
                      </div>
                    </div>
                    <a
                      href="#"
                      className="py-13 px-24 fw-bold text-center d-block text-primary-600 border-top border-gray-100 hover-text-decoration-underline"
                    >
                      {" "}
                      View All{" "}
                    </a>
                  </div>
                </div>
              </div>
            </div> */}
            {/* <!-- Notification Start --> */}

            {/* <!-- Language Start --> */}
            {/* <div className="dropdown">
              <button
                className="text-gray-500 w-40 h-40 bg-main-50 hover-bg-main-100 transition-2 rounded-circle text-xl flex-center"
                type="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <i className="ph ph-globe"></i>
              </button>
              <div className="dropdown-menu dropdown-menu--md border-0 bg-transparent p-0">
                <div className="card border border-gray-100 rounded-12 box-shadow-custom">
                  <div className="card-body">
                    <div className="max-h-270 overflow-y-auto scroll-sm pe-8">
                      <div className="form-check form-radio d-flex align-items-center justify-content-between ps-0 mb-16">
                        <label
                          className="ps-0 form-check-label line-height-1 fw-medium text-secondary-light"
                          htmlFor="arabic"
                        >
                          <span className="text-black hover-bg-transparent hover-text-primary d-flex align-items-center gap-8">
                            <img
                              src="/assets/images/thumbs/flag1.png"
                              alt=""
                              className="w-32-px h-32-px border borde border-gray-100 rounded-circle flex-shrink-0"
                            />
                            <span className="text-15 fw-semibold mb-0">
                              Arabic
                            </span>
                          </span>
                        </label>
                        <input
                          className="form-check-input"
                          type="radio"
                          name="language"
                          id="arabic"
                        />
                      </div>
                      <div className="form-check form-radio d-flex align-items-center justify-content-between ps-0 mb-16">
                        <label
                          className="ps-0 form-check-label line-height-1 fw-medium text-secondary-light"
                          htmlFor="germany"
                        >
                          <span className="text-black hover-bg-transparent hover-text-primary d-flex align-items-center gap-8">
                            <img
                              src="/assets/images/thumbs/flag2.png"
                              alt=""
                              className="w-32-px h-32-px border borde border-gray-100 rounded-circle flex-shrink-0"
                            />
                            <span className="text-15 fw-semibold mb-0">
                              Germany
                            </span>
                          </span>
                        </label>
                        <input
                          className="form-check-input"
                          type="radio"
                          name="language"
                          id="germany"
                        />
                      </div>
                      <div className="form-check form-radio d-flex align-items-center justify-content-between ps-0 mb-16">
                        <label
                          className="ps-0 form-check-label line-height-1 fw-medium text-secondary-light"
                          htmlFor="english"
                        >
                          <span className="text-black hover-bg-transparent hover-text-primary d-flex align-items-center gap-8">
                            <img
                              src="/assets/images/thumbs/flag3.png"
                              alt=""
                              className="w-32-px h-32-px border borde border-gray-100 rounded-circle flex-shrink-0"
                            />
                            <span className="text-15 fw-semibold mb-0">
                              English
                            </span>
                          </span>
                        </label>
                        <input
                          className="form-check-input"
                          type="radio"
                          name="language"
                          id="english"
                        />
                      </div>
                      <div className="form-check form-radio d-flex align-items-center justify-content-between ps-0">
                        <label
                          className="ps-0 form-check-label line-height-1 fw-medium text-secondary-light"
                          htmlFor="spanish"
                        >
                          <span className="text-black hover-bg-transparent hover-text-primary d-flex align-items-center gap-8">
                            <img
                              src="/assets/images/thumbs/flag4.png"
                              alt=""
                              className="w-32-px h-32-px border borde border-gray-100 rounded-circle flex-shrink-0"
                            />
                            <span className="text-15 fw-semibold mb-0">
                              Spanish
                            </span>
                          </span>
                        </label>
                        <input
                          className="form-check-input"
                          type="radio"
                          name="language"
                          id="spanish"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div> */}
            {/* <!-- Language Start --> */}
          </div>

          {/* <!-- User Profile Start --> */}
          <div className="dropdown">
            <button
              className="users arrow-down-icon border border-gray-200 rounded-pill p-4 d-inline-block pe-40 position-relative"
              type="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <span className="position-relative">
                <Image
                  src={
                    profileImageUrl
                      ? profileImageUrl
                      : "/assets/images/thumbs/user.png"
                  }
                  alt="Image"
                  className="h-32 w-32 rounded-circle"
                  width={128}
                  height={128}
                />
                <span className="activation-badge w-8 h-8 position-absolute inset-block-end-0 inset-inline-end-0"></span>
              </span>
            </button>
            <div className="dropdown-menu dropdown-menu--lg border-0 bg-transparent p-0">
              <div className="card border border-gray-100 rounded-12 box-shadow-custom">
                <div className="card-body">
                  <div className="flex-align gap-8 mb-20 pb-20 border-bottom border-gray-100">
                    <Image
                      src={
                        profileImageUrl
                          ? profileImageUrl
                          : "/assets/images/thumbs/user.png"
                      }
                      alt="Image"
                      className="w-54 h-54 rounded-circle"
                      width={128}
                      height={128}
                    />
                    <div className="">
                      <h4 className="mb-0">{Name}</h4>
                      <p className="fw-medium text-13 text-gray-200">{Email}</p>
                    </div>
                  </div>
                  <ul className="max-h-270 overflow-y-auto scroll-sm pe-4">
                    <li className="mb-4">
                      <Link
                        href="/Component/Admin/ProfileSetting"
                        className="py-12 text-15 px-20 hover-bg-gray-50 text-gray-300 rounded-8 flex-align gap-8 fw-medium text-15"
                      >
                        <span className="text-2xl text-primary-600 d-flex">
                          <i className="ph ph-gear"></i>
                        </span>
                        <span className="text">Account Settings</span>
                      </Link>
                    </li>

                    <li className="pt-8 border-top border-gray-100">
                      <Link
                        href="/Component/Accounts/Login"
                        onClick={hadleLogout}
                        className="py-12 text-15 px-20 hover-bg-danger-50 text-gray-300 hover-text-danger-600 rounded-8 flex-align gap-8 fw-medium text-15"
                      >
                        <span className="text-2xl text-danger-600 d-flex">
                          <i className="ph ph-sign-out"></i>
                        </span>
                        <span className="text">Log Out</span>
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          {/* <!-- User Profile Start --> */}
        </div>
      </div>
    </>
  );
};

export default TopBar;
