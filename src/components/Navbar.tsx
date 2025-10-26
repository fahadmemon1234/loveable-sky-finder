import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X, ChevronDown, Plane } from "lucide-react";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const supportLinks = [
    { title: "Travel Tips", href: "/support/travel-tips" },
    { title: "Privacy Policy", href: "/support/privacy-policy" },
    { title: "Enquiry Form", href: "/support/enquiry-form" },
    { title: "FAQs", href: "/support/faqs" },
    { title: "Passports & Visas", href: "/support/passports-visas" },
    { title: "Traveler's Health", href: "/support/travelers-health" },
    { title: "Travel Checklist", href: "/support/travel-checklist" },
    { title: "Make Payment", href: "/support/make-payment" },
  ];

  const companyLinks = [
    { title: "About Us", href: "/company/about-us" },
    { title: "Contact Us", href: "/company/contact-us" },
    { title: "Bookmark Us", href: "/company/bookmark-us" },
    { title: "Site Map", href: "/company/site-map" },
    { title: "Disclaimer", href: "/company/disclaimer-policy" },
    { title: "Terms of Use", href: "/company/terms-of-use" },
    { title: "Business Partners", href: "/company/business-partners" },
  ];

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/80">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 font-bold text-xl text-primary">
            <Plane className="h-6 w-6" />
            <span>Loveable Travel</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            <Link to="/" className="text-sm font-medium text-foreground hover:text-primary transition-colors">
              Home
            </Link>
            <Link to="/flights" className="text-sm font-medium text-foreground hover:text-primary transition-colors">
              Flights
            </Link>
            
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="text-sm">Support</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2">
                      {supportLinks.map((link) => (
                        <li key={link.href}>
                          <NavigationMenuLink asChild>
                            <Link
                              to={link.href}
                              className="block select-none rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                            >
                              <div className="text-sm font-medium leading-none">{link.title}</div>
                            </Link>
                          </NavigationMenuLink>
                        </li>
                      ))}
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <NavigationMenuTrigger className="text-sm">Company</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2">
                      {companyLinks.map((link) => (
                        <li key={link.href}>
                          <NavigationMenuLink asChild>
                            <Link
                              to={link.href}
                              className="block select-none rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                            >
                              <div className="text-sm font-medium leading-none">{link.title}</div>
                            </Link>
                          </NavigationMenuLink>
                        </li>
                      ))}
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>

            <Link to="/contact" className="text-sm font-medium text-foreground hover:text-primary transition-colors">
              Contact
            </Link>
            
            <Button asChild>
              <Link to="/flights">Book Now</Link>
            </Button>
          </div>

          {/* Mobile Menu */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px]">
              <nav className="flex flex-col gap-4 mt-8">
                <Link to="/" onClick={() => setIsOpen(false)} className="text-lg font-medium hover:text-primary transition-colors">
                  Home
                </Link>
                <Link to="/flights" onClick={() => setIsOpen(false)} className="text-lg font-medium hover:text-primary transition-colors">
                  Flights
                </Link>
                <div className="space-y-2">
                  <h3 className="font-semibold text-sm text-muted-foreground">Support</h3>
                  {supportLinks.map((link) => (
                    <Link
                      key={link.href}
                      to={link.href}
                      onClick={() => setIsOpen(false)}
                      className="block py-2 text-sm hover:text-primary transition-colors"
                    >
                      {link.title}
                    </Link>
                  ))}
                </div>
                <div className="space-y-2">
                  <h3 className="font-semibold text-sm text-muted-foreground">Company</h3>
                  {companyLinks.map((link) => (
                    <Link
                      key={link.href}
                      to={link.href}
                      onClick={() => setIsOpen(false)}
                      className="block py-2 text-sm hover:text-primary transition-colors"
                    >
                      {link.title}
                    </Link>
                  ))}
                </div>
                <Link to="/contact" onClick={() => setIsOpen(false)} className="text-lg font-medium hover:text-primary transition-colors">
                  Contact
                </Link>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
