import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import { ToastContainer } from "react-toastify";
import "./globals.css";
import "react-toastify/dist/ReactToastify.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Sky Nova Travels | Admin Portal",
  description:
    "Discover seamless travel planning with Sky-Nova-Travels. From flights to tours, we make your journey unforgettable.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* <!-- Favicon --> */}
        <link rel="shortcut icon" href="/admin/favicon/favicon.ico" />
        {/* <!-- Bootstrap --> */}
        <link rel="stylesheet" href="/admin/assets/css/bootstrap.min.css" />
        {/* <!-- file upload --> */}
        <link rel="stylesheet" href="/admin/assets/css/file-upload.css" />
        {/* <!-- file upload --> */}
        <link rel="stylesheet" href="/admin/assets/css/plyr.css" />
        {/* <!-- DataTables --> */}
        <link
          rel="stylesheet"
          href="https://cdn.datatables.net/2.0.8/css/dataTables.dataTables.min.css"
        />
        {/* <!-- full calendar --> */}
        <link rel="stylesheet" href="/admin/assets/css/full-calendar.css" />
        {/* <!-- jquery Ui --> */}
        <link rel="stylesheet" href="/admin/assets/css/jquery-ui.css" />
        {/* <!-- editor quill Ui --> */}
        <link rel="stylesheet" href="/admin/assets/css/editor-quill.css" />
        {/* <!-- apex charts Css --> */}
        <link rel="stylesheet" href="/admin/assets/css/apexcharts.css" />
        {/* <!-- calendar Css --> */}
        <link rel="stylesheet" href="/admin/assets/css/calendar.css" />
        {/* <!-- jvector map Css --> */}
        <link rel="stylesheet" href="/admin/assets/css/jquery-jvectormap-2.0.5.css" />
        {/* <!-- Main css --> */}
        <link rel="stylesheet" href="/admin/assets/css/main.css" />
      </head>
      <body className={inter.className}>
        <div className="preloader">
          <div className="loader"></div>
        </div>

        <div className="side-overlay"></div>

        <ToastContainer />
        {children}

        {/* <!-- Jquery js --> */}
        <Script src="/admin/assets/js/jquery-3.7.1.min.js" />
        {/* <!-- Bootstrap Bundle Js --> */}
        <Script src="/admin/assets/js/boostrap.bundle.min.js" />
        {/* <!-- Phosphor Js --> */}
        <Script src="/admin/assets/js/phosphor-icon.js" />
        {/* <!-- file upload --> */}
        <Script src="/admin/assets/js/file-upload.js" />
        {/* <!-- file upload --> */}
        {/* <Script src="/assets/js/plyr.js" /> */}
        {/* <!-- dataTables --> */}
        <Script src="https://cdn.datatables.net/2.0.8/js/dataTables.min.js" />
        {/* <!-- full calendar --> */}
        <Script src="/admin/assets/js/full-calendar.js" />
        {/* <!-- jQuery UI --> */}
        <Script src="/admin/assets/js/jquery-ui.js" />
        {/* <!-- jQuery UI --> */}
        {/* <Script src="/assets/js/editor-quill.js" /> */}
        {/* <!-- apex charts --> */}
        <Script src="/admin/assets/js/apexcharts.min.js" />
        {/* <!-- jvectormap Js --> */}
        <Script src="/admin/assets/js/jquery-jvectormap-2.0.5.min.js" />
        {/* <!-- jvectormap world Js --> */}
        <Script src="/admin/assets/js/jquery-jvectormap-world-mill-en.js" />

        {/* <!-- main js --> */}
        <Script src="/assets/js/main.js" />
      </body>
    </html>
  );
}
