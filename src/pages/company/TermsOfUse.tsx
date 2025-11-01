import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const TermsOfUse = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1">
        <section className="bg-gradient-to-br from-primary to-primary/80 text-primary-foreground py-16 px-4">
          <div className="container mx-auto text-center">
            <h1 className="text-4xl font-bold mb-4">Terms of Use</h1>
            <p className="text-lg max-w-2xl mx-auto text-primary-foreground/90">
              Please read these terms carefully before using our services
            </p>
          </div>
        </section>

        <section className="py-20 px-4 bg-gradient-to-b from-blue-50 via-white to-blue-100">
          <div className="container mx-auto max-w-5xl">
            <div className="bg-white/90 backdrop-blur-md rounded-3xl shadow-xl border border-blue-200/30 p-10 space-y-10">
              <div className="space-y-8">
                {/* Acceptance of Terms */}
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">
                    Acceptance of Terms
                  </h2>
                  <p className="text-muted-foreground">
                    By accessing and using Loveable Travel's website and
                    services, you accept and agree to be bound by these Terms of
                    Use and our Privacy Policy.
                  </p>
                </div>

                {/* Booking Terms */}
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">
                    Booking Terms
                  </h2>
                  <p className="text-muted-foreground">
                    All flight bookings are subject to availability and
                    confirmation. Prices are subject to change until payment is
                    received and booking is confirmed. You are responsible for
                    ensuring all passenger information is accurate.
                  </p>
                </div>

                {/* Payment Terms */}
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">
                    Payment Terms
                  </h2>
                  <p className="text-muted-foreground">
                    Payment must be made in full at the time of booking unless
                    otherwise specified. We accept major credit cards and other
                    payment methods as displayed on our website.
                  </p>
                </div>

                {/* Cancellation & Refunds */}
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">
                    Cancellation & Refunds
                  </h2>
                  <p className="text-muted-foreground">
                    Cancellation policies vary by airline and fare type. Refund
                    eligibility depends on the specific fare rules of your
                    booking. Processing fees may apply.
                  </p>
                </div>

                {/* User Conduct */}
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">
                    User Conduct
                  </h2>
                  <p className="text-muted-foreground">
                    You agree not to use our website for any unlawful purpose or
                    in any way that could damage, disable, or impair our
                    services.
                  </p>
                </div>

                {/* Changes to Terms */}
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">
                    Changes to Terms
                  </h2>
                  <p className="text-muted-foreground">
                    We reserve the right to modify these terms at any time.
                    Continued use of our services after changes constitutes
                    acceptance of the modified terms.
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

export default TermsOfUse;
