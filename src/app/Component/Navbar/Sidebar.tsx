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
          <img
            src="/assets/images/logo/Sky-Nova-Logo.png"
            alt="Logo"
            width={80}
            height={80}
          />
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
                  isActive("/Component/Admin/Inquiry") ? "activePage" : ""
                }`}
              >
                <Link
                  href="/Component/Admin/Inquiry"
                  className={`sidebar-menu__link `}
                >
                  <span className="icon">
                    <i className="ph ph-chat-circle-text"></i>
                  </span>
                  <span className="text">Inquiry</span>
                </Link>
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
