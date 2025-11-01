import { Link } from "react-router-dom";
import {
  Facebook,
  Instagram,
  Linkedin,
  Youtube,
  Plane,
  Phone,
  Mail,
  MapPin,
} from "lucide-react";

const Footer = () => {
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
    { title: "About Us", href: "/about" },
    { title: "Contact Us", href: "/company/contact-us" },
    { title: "Bookmark Us", href: "/company/bookmark-us" },
    { title: "Site Map", href: "/company/site-map" },
    { title: "Disclaimer", href: "/company/disclaimer-policy" },
    { title: "Terms of Use", href: "/company/terms-of-use" },
    { title: "Business Partners", href: "/company/business-partners" },
  ];

  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 py-12 sm:py-14">
        {/* Top Grid Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand Info */}
          <div>
            <Link
              to="/"
              className="flex items-center gap-2 font-bold text-xl sm:text-2xl mb-3 sm:mb-4"
            >
              <img
                src="/assets/images/Logo/Logo-White.png"
                alt="logo"
                className="w-20"
              />
            </Link>
            <p className="text-sm sm:text-base text-primary-foreground/80 leading-relaxed">
              We specialize in creating unforgettable travel experiences. From
              international flights to dream vacations — we handle it all with
              care and precision.
            </p>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="font-semibold text-lg mb-4 sm:mb-5 border-l-4 border-white/50 pl-2">
              Company
            </h3>
            <ul className="space-y-2">
              {companyLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="text-sm sm:text-base text-primary-foreground/80 hover:text-white transition-colors"
                  >
                    {link.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Links */}
          <div>
            <h3 className="font-semibold text-lg mb-4 sm:mb-5 border-l-4 border-white/50 pl-2">
              Support
            </h3>
            <ul className="space-y-2">
              {supportLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="text-sm sm:text-base text-primary-foreground/80 hover:text-white transition-colors"
                  >
                    {link.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact & Social */}
          <div>
            <h3 className="font-semibold text-lg mb-4 sm:mb-5 border-l-4 border-white/50 pl-2">
              Contact Us
            </h3>
            <ul className="space-y-3 text-sm sm:text-base text-primary-foreground/80">
              <li className="flex items-start gap-2">
                <MapPin size={22} className="mt-1 text-white flex-shrink-0" />
                <span className="leading-snug">
                  63/66 Hatton Garden, Fifth Floor, Suite 23, London, England,
                  EC1N 8LE
                </span>
              </li>
              <li className="flex items-center gap-2">
                <Phone size={18} className="text-white flex-shrink-0" />
                <span>Free Phone: 0208 004 3311</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail size={18} className="text-white flex-shrink-0" />
                <a
                  href="mailto:sales@skynovatravels.co.uk"
                  className="hover:underline break-all"
                >
                  sales@skynovatravels.co.uk
                </a>
              </li>

              <li className="flex items-center gap-2">
                <Mail size={18} className="text-white flex-shrink-0" />
                <a
                  href="mailto:Meryy@skynovatravels.co.uk"
                  className="hover:underline break-all"
                >
                  Meryy@skynovatravels.co.uk
                </a>
              </li>
            </ul>

            {/* Social Icons */}
            <div className="flex gap-3 sm:gap-4 mt-5 flex-wrap">
              {[
                {
                  icon: Facebook,
                  href: "https://facebook.com",
                  label: "Facebook",
                },
                {
                  icon: Instagram,
                  href: "https://instagram.com",
                  label: "Instagram",
                },
                {
                  icon: Linkedin,
                  href: "https://linkedin.com",
                  label: "LinkedIn",
                },
                {
                  icon: Youtube,
                  href: "https://youtube.com",
                  label: "YouTube",
                },
              ].map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="bg-white/10 p-2 sm:p-2.5 rounded-full hover:bg-white/20 transition-all flex items-center justify-center"
                >
                  <Icon className="h-4 w-4 sm:h-5 sm:w-5" />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-10 sm:mt-12 pt-6 border-t border-white/20 flex flex-col sm:flex-col md:flex-row items-center justify-between gap-6">
          {/* Copyright */}
          <p className="text-xs sm:text-sm text-primary-foreground/80 text-center md:text-left">
            © {new Date().getFullYear()} Skynova Travels. All rights reserved.
          </p>

          {/* Payment Methods */}
          <div className="bg-white/90 px-4 sm:px-6 py-2 rounded-lg shadow flex flex-wrap justify-center items-center gap-3 sm:gap-4 w-full md:w-auto">
            <img
              src="/assets/images/payment/bank.png"
              alt="Bank Transfer"
              className="h-6 sm:h-7 w-auto"
            />

            <img
              src="/assets/images/payment/visa.png"
              alt="Visa"
              className="h-5 sm:h-6 w-auto"
            />
            <img
              src="/assets/images/payment/master-card.png"
              alt="Mastercard"
              className="h-5 sm:h-6 w-auto"
            />
            <img
              src="/assets/images/payment/PayPal.png"
              alt="PayPal"
              className="h-5 sm:h-6 w-auto"
            />
            <img
              src="/assets/images/payment/American.png"
              alt="American Express"
              className="h-5 sm:h-6 w-auto"
            />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
