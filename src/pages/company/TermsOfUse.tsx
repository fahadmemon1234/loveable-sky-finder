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

        <section className="py-16 px-4">
          <div className="container mx-auto max-w-4xl prose prose-lg">
            <h2>Acceptance of Terms</h2>
            <p className="text-muted-foreground">
              By accessing and using Loveable Travel's website and services, you accept and agree to
              be bound by these Terms of Use and our Privacy Policy.
            </p>

            <h2>Booking Terms</h2>
            <p className="text-muted-foreground">
              All flight bookings are subject to availability and confirmation. Prices are subject to
              change until payment is received and booking is confirmed. You are responsible for
              ensuring all passenger information is accurate.
            </p>

            <h2>Payment Terms</h2>
            <p className="text-muted-foreground">
              Payment must be made in full at the time of booking unless otherwise specified. We accept
              major credit cards and other payment methods as displayed on our website.
            </p>

            <h2>Cancellation & Refunds</h2>
            <p className="text-muted-foreground">
              Cancellation policies vary by airline and fare type. Refund eligibility depends on the
              specific fare rules of your booking. Processing fees may apply.
            </p>

            <h2>User Conduct</h2>
            <p className="text-muted-foreground">
              You agree not to use our website for any unlawful purpose or in any way that could damage,
              disable, or impair our services.
            </p>

            <h2>Changes to Terms</h2>
            <p className="text-muted-foreground">
              We reserve the right to modify these terms at any time. Continued use of our services
              after changes constitutes acceptance of the modified terms.
            </p>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default TermsOfUse;
