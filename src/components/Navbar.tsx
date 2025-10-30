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

  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
      <header>
        <div className="bg-gradient-to-r from-amber-500 via-yellow-500 to-amber-400 text-black py-2 text-center text-sm shadow-md">
          <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-1 md:gap-0">
            {/* Left Text */}
            <div className="font-semibold tracking-wide text-xs sm:text-sm md:block">
              Free Cancellation on select flights!
            </div>

            {/* Contact Info */}
            <div className="flex flex-wrap items-center justify-center gap-x-2 gap-y-1 text-xs sm:text-sm">
              <div className="flex items-center">
                <FaPhoneVolume className="inline mr-1 text-black" />
                <NavLink
                  to="tel:+919876543210"
                  className="font-semibold hover:text-gray-800 transition-colors duration-200"
                >
                  +91 9876543210
                </NavLink>
              </div>

              <span className="hidden sm:inline text-black">|</span>

              <div className="flex items-center">
                <MdEmail className="inline mr-1 text-black" />
                <NavLink
                  to="mailto:zooqa@example.com"
                  className="font-semibold hover:text-gray-800 transition-colors duration-200"
                >
                  zooqa@example.com
                </NavLink>
              </div>
            </div>
          </div>
        </div>
      </header>

      <nav
        className={`sticky top-0 z-50 w-full border-b transition-all duration-500 ${
          isScrolled
            ? "bg-white/90 backdrop-blur-md shadow-[0_2px_12px_rgba(0,0,0,0.08)]"
            : "bg-gradient-to-r from-[#fffbea]/80 via-[#fef9e7]/80 to-[#fff3cd]/80 backdrop-blur-sm"
        }`}
      >
        <div className="container mx-auto px-4">
          <div className="flex h-16 items-center justify-between">
            {/* Logo */}
            <NavLink
              to="/"
              className="flex items-center gap-2 font-bold text-xl bg-gradient-to-r from-amber-500 to-yellow-600 text-transparent bg-clip-text"
            >
              <Plane className="h-6 w-6 text-amber-500" />
              <span>Loveable Travel</span>
            </NavLink>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <NavLink
                  key={link.path}
                  to={link.path}
                  className={({ isActive }) =>
                    `relative text-sm tracking-wide transition-all duration-300 pb-1 after:absolute after:left-0 after:bottom-0 after:h-[2px] after:w-0 after:bg-gradient-to-r after:from-amber-400 after:to-yellow-500 after:transition-all after:duration-300 hover:after:w-full
                  ${
                    isActive
                      ? "text-amber-600 font-semibold after:w-full"
                      : "text-gray-700 hover:text-amber-600"
                  }`
                  }
                >
                  {link.title}
                </NavLink>
              ))}
              <Button
                asChild
                className="bg-gradient-to-r from-amber-500 to-yellow-500 text-white font-medium shadow-md hover:shadow-lg hover:scale-105 transition-transform"
              >
                <NavLink to="/flights">Book Now</NavLink>
              </Button>
            </div>

            {/* Mobile Menu */}
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild className="md:hidden">
                <Button variant="ghost" size="icon" className="text-amber-600">
                  {isOpen ? (
                    <X className="h-6 w-6" />
                  ) : (
                    <Menu className="h-6 w-6" />
                  )}
                </Button>
              </SheetTrigger>

              <SheetContent
                side="right"
                className="w-[300px] sm:w-[400px] bg-gradient-to-b from-[#fffbea] via-[#fef9e7] to-[#fff3cd]"
              >
                <nav className="flex flex-col gap-6 mt-10 text-center">
                  {navLinks.map((link) => (
                    <NavLink
                      key={link.path}
                      to={link.path}
                      onClick={() => setIsOpen(false)}
                      className={({ isActive }) =>
                        `relative text-lg font-semibold transition-all duration-300 
                      ${
                        isActive
                          ? "text-amber-600"
                          : "text-gray-700 hover:text-amber-600"
                      }`
                      }
                    >
                      {link.title}
                    </NavLink>
                  ))}

                  <Button
                    asChild
                    className="bg-gradient-to-r from-amber-500 to-yellow-500 text-white font-medium shadow-md hover:shadow-lg"
                  >
                    <NavLink to="/flights">Book Now</NavLink>
                  </Button>
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
