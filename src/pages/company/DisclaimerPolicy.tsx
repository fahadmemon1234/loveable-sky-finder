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
        <section className="py-20 px-4 bg-gradient-to-b from-blue-50 via-white to-blue-100">
          <div className="container mx-auto max-w-5xl">
            <div className="bg-white/90 backdrop-blur-md rounded-3xl shadow-xl border border-blue-200/30 p-10 space-y-10">
              <h1 className="text-3xl md:text-4xl font-extrabold text-primary mb-6 text-center drop-shadow-sm">
                Important Information
              </h1>

              <div className="space-y-8">
                {/* General Disclaimer */}
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">
                    General Disclaimer
                  </h2>
                  <p className="text-muted-foreground">
                    The information provided on this website is for general
                    informational purposes only. While we strive to keep the
                    information up to date and correct, we make no
                    representations or warranties about the completeness,
                    accuracy, or reliability.
                  </p>
                </div>

                {/* Flight Information */}
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">
                    Flight Information
                  </h2>
                  <p className="text-muted-foreground">
                    Flight prices, schedules, and availability are subject to
                    change without notice. All bookings are subject to airline
                    terms and conditions. Verify all flight details before
                    completing your booking.
                  </p>
                </div>

                {/* Price Quotes */}
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">
                    Price Quotes
                  </h2>
                  <p className="text-muted-foreground">
                    All fare costs are quoted in British Pounds. Fares are
                    guaranteed only at the time of purchase. Non-refundable
                    tickets are non-transferable. Names on tickets must match
                    government-issued IDs.
                  </p>
                </div>

                {/* Check Documents */}
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">
                    Check Documents
                  </h2>
                  <p className="text-muted-foreground">
                    Please verify your travel documents. Children must be
                    accompanied by a parent or guardian. Airlines may have rules
                    for unaccompanied minors.
                  </p>
                </div>

                {/* Reconfirmations & Check-In */}
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">
                    Reconfirmations & Check-In
                  </h2>
                  <p className="text-muted-foreground">
                    Domestic flights: confirm before departure and at stopovers.
                    International: confirm at least 72 hours before. Check-in:
                    Domestic 2 hours, International 3 hours prior to departure.
                    Late arrival may lead to denied boarding.
                  </p>
                </div>

                {/* Changes, Cancellations & Overbooking */}
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">
                    Changes, Cancellations & Overbooking
                  </h2>
                  <p className="text-muted-foreground">
                    Ticket changes may incur fees. Airlines may overbook
                    flights; passengers denied boarding may be entitled to
                    compensation. Refunds, credits, and penalties depend on
                    airline rules.
                  </p>
                </div>

                {/* Insurance */}
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">
                    Insurance
                  </h2>
                  <p className="text-muted-foreground">
                    We recommend obtaining additional insurance, as personal
                    coverage may not fully cover cancellations, accidents, or
                    lost/damaged property.
                  </p>
                </div>

                {/* Passport / Travel Visa */}
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">
                    Passport / Travel Visa
                  </h2>
                  <p className="text-muted-foreground">
                    Travelers are responsible for ensuring valid travel
                    documents (passport, visa, re-entry permits, etc.). Contact
                    the relevant embassy or consulate for requirements.
                  </p>
                </div>

                {/* Limitation of Liability */}
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">
                    Limitation of Liability
                  </h2>
                  <p className="text-muted-foreground">
                    Bright Holiday & Flights Limited is not responsible for
                    indirect or consequential loss arising from using this
                    website or relying on its information.
                  </p>
                </div>

                {/* Miscellaneous */}
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">
                    Miscellaneous
                  </h2>
                  <p className="text-muted-foreground">
                    Unauthorized practices like “back-to-back ticketing” or
                    misusing flight coupons are prohibited. Airlines may charge
                    extra for non-standard baggage or additional services.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default DisclaimerPolicy;
