import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const DisclaimerPolicy = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-primary to-primary/80 text-primary-foreground py-16 px-4">
          <div className="container mx-auto text-center">
            <h1 className="text-4xl font-bold mb-4">Disclaimer Policy</h1>
            <p className="text-lg max-w-2xl mx-auto text-primary-foreground/90">
              Important information about our services
            </p>
          </div>
        </section>

        {/* Content Section */}
        <section className="py-16 px-4">
          <div className="container mx-auto max-w-4xl prose prose-lg">
            <h2 className="text-gray-900 font-bold mb-2">General Disclaimer</h2>
            <p className="text-muted-foreground mb-4">
              The information provided on this website is for general
              informational purposes only. While we strive to keep the
              information up to date and correct, we make no representations or
              warranties of any kind about the completeness, accuracy, or
              reliability of any information on the website.
            </p>

            <h2 className="text-gray-900 font-bold mb-2">Flight Information</h2>
            <p className="text-muted-foreground mb-4">
              Flight prices, schedules, and availability are subject to change
              without notice. All bookings are subject to airline terms and
              conditions. We recommend verifying all flight details before
              completing your booking.
            </p>

            <h2 className="text-gray-900 font-bold mb-2">Price Quotes</h2>
            <p className="text-muted-foreground mb-4">
              All fare costs are quoted in British Pounds. Fares are guaranteed
              only at the time of purchase. Non-refundable tickets are
              non-transferable. Names on tickets must match government-issued
              IDs.
            </p>

            <h2 className="text-gray-900 font-bold mb-2">Check Documents</h2>
            <p className="text-muted-foreground mb-4">
              Please verify your travel documents. Children must be accompanied
              by a parent or guardian. Individual airlines may have specific
              rules for unaccompanied minors.
            </p>

            <h2 className="text-gray-900 font-bold mb-2">
              Reconfirmations & Check-In
            </h2>
            <p className="text-muted-foreground mb-4">
              Domestic flights: confirm before departure and at stopovers.
              International: confirm at least 72 hours before. Check-in:
              Domestic 2 hours, International 3 hours prior to departure. Late
              arrival may lead to denied boarding.
            </p>

            <h2 className="text-gray-900 font-bold mb-2">
              Changes, Cancellations & Overbooking
            </h2>
            <p className="text-muted-foreground mb-4">
              Ticket changes may incur fees. Airlines may overbook flights;
              passengers denied boarding may be entitled to compensation.
              Refunds, credits, and penalties depend on airline rules.
            </p>

            <h2 className="text-gray-900 font-bold mb-2">Insurance</h2>
            <p className="text-muted-foreground mb-4">
              We recommend obtaining additional insurance, as personal coverage
              may not fully cover cancellations, accidents, or lost/damaged
              property.
            </p>

            <h2 className="text-gray-900 font-bold mb-2">
              Passport / Travel Visa
            </h2>
            <p className="text-muted-foreground mb-4">
              Travelers are responsible for ensuring valid travel documents
              (passport, visa, re-entry permits, etc.). Contact the relevant
              embassy or consulate for requirements.
            </p>

            <h2 className="text-gray-900 font-bold mb-2">
              Limitation of Liability
            </h2>
            <p className="text-muted-foreground mb-4">
              Bright Holiday & Flights Limited is not responsible for indirect
              or consequential loss arising from using this website or relying
              on its information.
            </p>

            <h2 className="text-gray-900 font-bold mb-2">Miscellaneous</h2>
            <p className="text-muted-foreground mb-4">
              Unauthorized practices like “back-to-back ticketing” or misusing
              flight coupons are prohibited. Airlines may charge extra for
              non-standard baggage or additional services.
            </p>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default DisclaimerPolicy;
