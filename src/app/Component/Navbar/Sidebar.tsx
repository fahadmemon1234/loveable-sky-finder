"use client";
import React, { ReactNode, useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { useSidebar } from "../context/SidebarContext";
import Link from "next/link";
interface NavbarProps {
  children?: ReactNode | null;
}

const Sidebar = ({ children }: NavbarProps) => {
  const { isSidebarActive } = useSidebar();
  const pathname = usePathname();
  const [openMenus, setOpenMenus] = useState<{ [key: string]: boolean }>({});

  const toggleMenu = (key: string) => {
    setOpenMenus((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  useEffect(() => {
    const studentPaths = [
      "/Component/Admin/admissionForm",
      "/Component/Admin/Student",
      "/Component/Admin/StudentDetail",
    ];
    const accountPaths = [
      "/Component/Admin/Account/Expenses",
      "/Component/Admin/Account/Fees",
      "/Component/Admin/Account/TeacherSalary",
    ];
    const attendancePaths = [
      "/Component/Admin/Attendance",
      "/Component/Admin/ViewAttendance",
    ];

    setOpenMenus({
      students: studentPaths.includes(pathname),
      accounts: accountPaths.includes(pathname),
      attendence: attendancePaths.includes(pathname),
    });
  }, [pathname]);

  const isActive = (path: string | string[]) => {
    if (Array.isArray(path)) {
      return path.includes(pathname);
    }
    return pathname === path;
  };

  return (
    <>
      <aside className={`sidebar ${isSidebarActive ? "active" : ""}`}>
        {/* <!-- sidebar close btn --> */}
        <button
          type="button"
          className="sidebar-close-btn text-gray-500 hover-text-white hover-bg-main-600 text-md w-24 h-24 border border-gray-100 hover-border-main-600 d-xl-none d-flex flex-center rounded-circle position-absolute"
        >
          <i className="ph ph-x"></i>
        </button>
        {/* <!-- sidebar close btn --> */}

        <Link
          href="/"
          className="sidebar__logo text-center p-20 position-sticky inset-block-start-0 bg-white w-100 z-1 pb-10"
        >
          <img src="/assets/images/logo/logo.png" alt="Logo" />
        </Link>

        <div className="sidebar-menu-wrapper overflow-y-auto scroll-sm">
          <div className="p-20 pt-10">
            <ul className="sidebar-menu">
              <li
                className={`sidebar-menu__item ${
                  isActive("/Component/Admin/Dashboard") ? "activePage" : ""
                }`}
              >
                <Link
                  href="/Component/Admin/Dashboard"
                  className={`sidebar-menu__link `}
                >
                  <span className="icon">
                    <i className="ph ph-squares-four"></i>
                  </span>
                  <span className="text">Dashboard</span>
                </Link>
              </li>

              <li
                className={`sidebar-menu__item ${
                  isActive("/Component/Admin/Class") ? "activePage" : ""
                }`}
              >
                <Link
                  href="/Component/Admin/Class"
                  className={`sidebar-menu__link `}
                >
                  <span className="icon">
                    <i className="ph ph-users-three"></i>
                  </span>
                  <span className="text">Class</span>
                </Link>
              </li>

              <li
                className={`sidebar-menu__item has-dropdown ${
                  openMenus["students"] ? "activePage" : ""
                }`}
                onClick={() => toggleMenu("students")}
              >
                <Link
                  href="#"
                  className="sidebar-menu__link"
                  onClick={(e) => e.preventDefault()}
                >
                  <span className="icon">
                    <i className="ph ph-graduation-cap"></i>
                  </span>
                  <span className="text">Student</span>
                </Link>

                {/* Add a condition to control submenu visibility */}
                <ul
                  className={`sidebar-submenu`}
                  style={{
                    display: openMenus["students"] ? "block" : "none",
                  }}
                >
                  <li
                    className={`sidebar-submenu__item ${
                      isActive("/Component/Admin/admissionForm")
                        ? "activePage"
                        : ""
                    }`}
                  >
                    <Link
                      href="/Component/Admin/admissionForm"
                      className="sidebar-submenu__link"
                    >
                      Admission Form
                    </Link>
                  </li>
                  <li
                    className={`sidebar-submenu__item ${
                      isActive("/Component/Admin/Student") ? "activePage" : ""
                    }`}
                  >
                    <Link
                      href="/Component/Admin/Student"
                      className="sidebar-submenu__link"
                    >
                      Student
                    </Link>
                  </li>
                </ul>
              </li>

              <li
                className={`sidebar-menu__item ${
                  isActive("/Component/Admin/Teacher") ? "activePage" : ""
                }`}
              >
                <Link
                  href="/Component/Admin/Teacher"
                  className={`sidebar-menu__link`}
                >
                  <span className="icon">
                    <i className="ph ph-chalkboard-teacher"></i>
                  </span>
                  <span className="text">Teacher</span>
                </Link>
              </li>

              <li
                className={`sidebar-menu__item ${
                  isActive("/Component/Admin/Library") ? "activePage" : ""
                }`}
              >
                <Link
                  href="/Component/Admin/Library"
                  className={`sidebar-menu__link`}
                >
                  <span className="icon">
                    <i className="ph ph-book"></i>
                  </span>
                  <span className="text">Library</span>
                </Link>
              </li>

              <li
                className={`sidebar-menu__item ${
                  isActive("/Component/Admin/Subject") ? "activePage" : ""
                }`}
              >
                <Link
                  href="/Component/Admin/Subject"
                  className={`sidebar-menu__link`}
                >
                  <span className="icon">
                    <i className="ph ph-books"></i>
                  </span>
                  <span className="text">Subject</span>
                </Link>
              </li>

              <li
                className={`sidebar-menu__item ${
                  isActive("/Component/Admin/Periods") ? "activePage" : ""
                }`}
              >
                <Link
                  href="/Component/Admin/Periods"
                  className={`sidebar-menu__link `}
                >
                  <span className="icon">
                    <i className="ph ph-clock"></i>
                  </span>
                  <span className="text">Period</span>
                </Link>
              </li>

              <li
                className={`sidebar-menu__item ${
                  isActive("/Component/Admin/Timetable") ? "activePage" : ""
                }`}
              >
                <Link
                  href="/Component/Admin/Timetable"
                  className={`sidebar-menu__link`}
                >
                  <span className="icon">
                    <i className="ph ph-calendar-blank"></i>
                  </span>
                  <span className="text">Timetable</span>
                </Link>
              </li>

              <li
                className={`sidebar-menu__item ${
                  isActive("/Component/Admin/Exam/ExamSchedule")
                    ? "activePage"
                    : ""
                }`}
              >
                <Link
                  href="/Component/Admin/Exam/ExamSchedule"
                  className={`sidebar-menu__link`}
                >
                  <span className="icon">
                    <i className="ph ph-test-tube"></i>
                  </span>
                  <span className="text">Exam</span>
                </Link>
              </li>

              <li
                className={`sidebar-menu__item ${
                  isActive("/Component/Admin/Holiday") ? "activePage" : ""
                }`}
              >
                <Link
                  href="/Component/Admin/Holiday"
                  className={`sidebar-menu__link`}
                >
                  <span className="icon">
                    <i className="ph ph-calendar-blank"></i>
                  </span>
                  <span className="text">Holiday</span>
                </Link>
              </li>

              <li
                className={`sidebar-menu__item has-dropdown ${
                  openMenus["accounts"] ? "activePage" : ""
                }`}
                onClick={() => toggleMenu("accounts")}
              >
                <Link
                  href="#"
                  className="sidebar-menu__link"
                  onClick={(e) => e.preventDefault()}
                >
                  <span className="icon">
                    <i className="ph ph-wallet"></i>
                  </span>
                  <span className="text">Account</span>
                </Link>

                {/* Add a condition to control submenu visibility */}
                <ul
                  className={`sidebar-submenu`}
                  style={{
                    display: openMenus["accounts"] ? "block" : "none",
                  }}
                >
                  <li
                    className={`sidebar-submenu__item ${
                      isActive("/Component/Admin/Account/Expenses")
                        ? "activePage"
                        : ""
                    }`}
                  >
                    <Link
                      href="/Component/Admin/Account/Expenses"
                      className="sidebar-submenu__link"
                    >
                      Expenses
                    </Link>
                  </li>
                  <li
                    className={`sidebar-submenu__item ${
                      isActive("/Component/Admin/Account/Fees")
                        ? "activePage"
                        : ""
                    }`}
                  >
                    <Link
                      href="/Component/Admin/Account/Fees"
                      className="sidebar-submenu__link"
                    >
                      Fees Collection
                    </Link>
                  </li>
                  <li
                    className={`sidebar-submenu__item ${
                      isActive("/Component/Admin/Account/TeacherSalary")
                        ? "activePage"
                        : ""
                    }`}
                  >
                    <Link
                      href="/Component/Admin/Account/TeacherSalary"
                      className="sidebar-submenu__link"
                    >
                      Teacher Salary
                    </Link>
                  </li>
                </ul>
              </li>

              <li
                className={`sidebar-menu__item has-dropdown ${
                  openMenus["attendence"] ? "activePage" : ""
                }`}
                onClick={() => toggleMenu("attendence")}
              >
                <Link
                  href="#"
                  className="sidebar-menu__link"
                  onClick={(e) => e.preventDefault()}
                >
                  <span className="icon">
                    <i className="ph ph-calendar-blank"></i>
                  </span>
                  <span className="text">Attendence</span>
                </Link>

                {/* Add a condition to control submenu visibility */}
                <ul
                  className={`sidebar-submenu`}
                  style={{
                    display: openMenus["attendence"] ? "block" : "none",
                  }}
                >
                  <li
                    className={`sidebar-submenu__item ${
                      isActive("/Component/Admin/Attendance")
                        ? "activePage"
                        : ""
                    }`}
                  >
                    <Link
                      href="/Component/Admin/Attendance"
                      className={`sidebar-submenu__link`}
                    >
                      Manage Attendance
                    </Link>
                  </li>

                  <li
                    className={`sidebar-submenu__item ${
                      isActive("/Component/Admin/ViewAttendance")
                        ? "activePage"
                        : ""
                    }`}
                  >
                    <Link
                      href="/Component/Admin/ViewAttendance"
                      className={`sidebar-submenu__link`}
                    >
                      View Attendance
                    </Link>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </aside>

      {children as ReactNode}
    </>
  );
};

export default Sidebar;
