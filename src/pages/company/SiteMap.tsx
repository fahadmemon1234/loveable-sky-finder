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
        { title: "Make Payment", href: "/support/make-payment" },
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

      <main className="flex-1">
        <section className="bg-gradient-to-br from-primary to-primary/80 text-primary-foreground py-16 px-4">
          <div className="container mx-auto text-center">
            <h1 className="text-4xl font-bold mb-4">Site Map</h1>
            <p className="text-lg max-w-2xl mx-auto text-primary-foreground/90">
              Navigate our website easily
            </p>
          </div>
        </section>

        <section className="py-16 px-4">
          <div className="container mx-auto max-w-5xl">
            <div className="grid md:grid-cols-3 gap-8">
              {sections.map((section) => (
                <Card key={section.title}>
                  <CardContent className="p-6">
                    <h2 className="text-xl font-bold mb-4">{section.title}</h2>
                    <ul className="space-y-2">
                      {section.links.map((link) => (
                        <li key={link.href}>
                          <Link
                            to={link.href}
                            className="text-muted-foreground hover:text-primary transition-colors"
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
      </main>

      <Footer />
    </div>
  );
};

export default SiteMap;
