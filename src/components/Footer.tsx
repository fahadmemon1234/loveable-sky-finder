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
    { title: "About Us", href: "/company/about-us" },
    { title: "Contact Us", href: "/company/contact-us" },
    { title: "Bookmark Us", href: "/company/bookmark-us" },
    { title: "Site Map", href: "/company/site-map" },
    { title: "Disclaimer", href: "/company/disclaimer-policy" },
    { title: "Terms of Use", href: "/company/terms-of-use" },
    { title: "Business Partners", href: "/company/business-partners" },
  ];

  return (
    <footer className="bg-primary text-primary-foreground mt-20">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <Link
              to="/"
              className="flex items-center gap-2 font-bold text-xl mb-4"
            >
              <Plane className="h-6 w-6" />
              <span>Loveable Travel</span>
            </Link>
            <p className="text-sm text-primary-foreground/80">
              Your trusted partner for international flight bookings and travel
              experiences.
            </p>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Company</h3>
            <ul className="space-y-2">
              {companyLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="text-sm text-primary-foreground/80 hover:text-primary-foreground transition-colors"
                  >
                    {link.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Links */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Support</h3>
            <ul className="space-y-2">
              {supportLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="text-sm text-primary-foreground/80 hover:text-primary-foreground transition-colors"
                  >
                    {link.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social Media */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Follow Us</h3>
            <div className="flex gap-4">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:opacity-80 transition-opacity"
                aria-label="Facebook"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:opacity-80 transition-opacity"
                aria-label="Instagram"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:opacity-80 transition-opacity"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-5 w-5" />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:opacity-80 transition-opacity"
                aria-label="YouTube"
              >
                <Youtube className="h-5 w-5" />
              </a>
            </div>

            {/* Get in Touch */}

            <div className="mt-10">
              <h3 className="font-semibold text-lg mb-4">Get in Touch</h3>
              <ul className="space-y-3 text-sm text-primary-foreground/80">
                {/* Address */}
                <li className="flex items-start gap-2">
                  <MapPin size={30} className="mt-1 text-white" />
                  <span>
                    63/66 Hatton Garden, Fifth Floor, Suite 23, London, England,
                    EC1N 8LE
                  </span>
                </li>

                {/* Free Phone */}
                <li className="flex items-center gap-2">
                  <Phone size={20} className="text-white" />
                  <span>Free Phone: 0208 004 3311</span>
                </li>

                {/* Complaint */}
                <li className="flex items-center gap-2">
                  <Phone size={20} className="text-white" />
                  <span>Complaint: 0208 004 3311</span>
                </li>

                {/* Email */}
                <li className="flex items-center gap-2">
                  <Mail size={20} className="text-white" />
                  <a
                    href="mailto:info@brightholiday.co.uk"
                    className="hover:underline"
                  >
                    info@brightholiday.co.uk
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-primary-foreground/20 text-center">
          <p className="text-sm text-primary-foreground/80">
            Copyright © Loveable Travel 2025. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
