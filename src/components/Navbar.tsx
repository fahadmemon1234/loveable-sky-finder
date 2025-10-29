import { useState, useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { Menu, X, Plane } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { FaPhoneVolume } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [location.pathname]);

  const navLinks = [
    { title: "Home", path: "/" },
    { title: "About", path: "/about" },
    { title: "Flights", path: "/cheap-flights" },
    { title: "Contact", path: "/contact" },
  ];

  return (
    <>
      <header className="hidden md:block">
        <div className="bg-primary text-primary-foreground py-2 text-center text-sm">
          <div className="grid grid-cols-2 items-center justify-center">
            <div className="font-semibold">
              Free Cancellation on select flights!
            </div>
            <div>
              <FaPhoneVolume className="inline mb-1 mr-1" />
              <NavLink to="tel:+919876543210" className="font-semibold">
                +91 9876543210
              </NavLink>
              <span className="mx-2"> | </span>
              <MdEmail className="inline mb-1 mr-1" />
              <NavLink to="mailto:zooqa@example.com" className="font-semibold">
                zooqa@example.com
              </NavLink>
            </div>
          </div>
        </div>
      </header>

      <nav className="sticky top-0 z-50 w-full border-b bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/80">
        <div className="container mx-auto px-4">
          <div className="flex h-16 items-center justify-between">
            {/* Logo */}
            <NavLink
              to="/"
              className="flex items-center gap-2 font-bold text-xl text-primary"
            >
              <Plane className="h-6 w-6" />
              <span>Loveable Travel</span>
            </NavLink>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-6">
              {navLinks.map((link) => (
                <NavLink
                  key={link.path}
                  to={link.path}
                  className={({ isActive }) =>
                    `relative text-sm transition-all duration-300 pb-1
                    ${
                      isActive
                        ? "text-primary font-bold"
                        : "text-foreground hover:text-primary font-medium"
                    }`
                  }
                >
                  {link.title}
                  {/* Animated underline */}
                  <span className="absolute left-0 bottom-0 w-0 h-[2px] bg-primary transition-all duration-300 group-hover:w-full"></span>
                </NavLink>
              ))}
              <Button asChild>
                <NavLink to="/flights">Book Now</NavLink>
              </Button>
            </div>

            {/* Mobile Menu */}
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild className="md:hidden">
                <Button variant="ghost" size="icon">
                  {isOpen ? (
                    <X className="h-6 w-6" />
                  ) : (
                    <Menu className="h-6 w-6" />
                  )}
                </Button>
              </SheetTrigger>

              <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                <nav className="flex flex-col gap-4 mt-8">
                  {navLinks.map((link) => (
                    <NavLink
                      key={link.path}
                      to={link.path}
                      onClick={() => setIsOpen(false)}
                      className={({ isActive }) =>
                        `relative text-lg font-medium transition-all duration-300 
                        ${isActive ? "text-primary" : "hover:text-primary"}`
                      }
                    >
                      {link.title}
                      <span className="absolute left-0 bottom-0 w-0 h-[2px] bg-primary transition-all duration-300 group-hover:w-full"></span>
                    </NavLink>
                  ))}
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
