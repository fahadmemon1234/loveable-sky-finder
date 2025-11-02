import React, { ReactNode, useState, useEffect } from "react";
import Sidebar from "./Navbar/Sidebar";
import TopBar from "./Navbar/TopBar/TopBar";
import { SidebarProvider } from "./context/SidebarContext";
import Footer from "./Footer/page";
import Loader from "./utility/Loader";

interface NavbarProps {
  children: ReactNode;
}

interface LayoutProps {
  children: ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <SidebarProvider>
      
      <Sidebar>
        <div className="dashboard-main-wrapper">
          <TopBar />
          <div className="dashboard-body">
            {/* {children} */}
            {isLoading ? <Loader /> : children}
          </div>
          <Footer />
        </div>
      </Sidebar>
    </SidebarProvider>
  );
};

// Higher-Order Component pattern
export const withLayout = (Component: React.FC) => {
  const WrappedComponent = (props: any) => (
    <Layout>
      <Component {...props} />
    </Layout>
  );

  WrappedComponent.displayName = `WithLayout(${
    Component.displayName || Component.name || "Component"
  })`;

  return WrappedComponent;
};
