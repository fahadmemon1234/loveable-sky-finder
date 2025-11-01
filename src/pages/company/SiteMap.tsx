import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";

const SiteMap = () => {
  const sections = [
    {
      title: "Main Pages",
      links: [
        { title: "Home", href: "/" },
        { title: "Flights", href: "/flights" },
        { title: "Request a Callback", href: "/callback" },
        { title: "About", href: "/about" },
        { title: "Contact", href: "/contact" },
      ],
    },
    {
      title: "Support",
      links: [
        { title: "Travel Tips", href: "/support/travel-tips" },
        { title: "Privacy Policy", href: "/support/privacy-policy" },
        { title: "Enquiry Form", href: "/support/enquiry-form" },
        { title: "FAQs", href: "/support/faqs" },
        { title: "Passports & Visas", href: "/support/passports-visas" },
        { title: "Traveler's Health", href: "/support/travelers-health" },
        { title: "Travel Checklist", href: "/support/travel-checklist" },
      ],
    },
    {
      title: "Company",
      links: [
        { title: "About Us", href: "/company/about-us" },
        { title: "Contact Us", href: "/company/contact-us" },
        { title: "Bookmark Us", href: "/company/bookmark-us" },
        { title: "Site Map", href: "/company/site-map" },
        { title: "Disclaimer", href: "/company/disclaimer-policy" },
        { title: "Terms of Use", href: "/company/terms-of-use" },
        { title: "Business Partners", href: "/company/business-partners" },
      ],
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <section className="bg-gradient-to-br from-primary to-primary/80 text-primary-foreground py-16 px-4">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl font-bold mb-4">Site Map</h1>
          <p className="text-lg max-w-2xl mx-auto text-primary-foreground/90">
            Navigate our website easily
          </p>
        </div>
      </section>

      <section className="py-20 px-4 bg-gradient-to-b from-blue-50 via-white to-blue-100">
        <div className="container mx-auto max-w-6xl">
          <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {sections.map((section, idx) => (
              <Card
                key={idx}
                className="bg-white/80 backdrop-blur-md rounded-3xl shadow-xl border border-blue-200/40 hover:shadow-2xl hover:scale-105 transition-transform"
              >
                <CardContent className="p-6 flex flex-col h-full">
                  <h2 className="text-2xl font-bold mb-4 text-primary drop-shadow-sm">
                    {section.title}
                  </h2>
                  <ul className="space-y-2 mt-2 flex-1">
                    {section.links.map((link) => (
                      <li key={link.href}>
                        <Link
                          to={link.href}
                          className="text-gray-700 hover:text-primary transition-colors"
                        >
                          {link.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default SiteMap;
