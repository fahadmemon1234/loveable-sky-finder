import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const DisclaimerPolicy = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1">
        <section className="bg-gradient-to-br from-primary to-primary/80 text-primary-foreground py-16 px-4">
          <div className="container mx-auto text-center">
            <h1 className="text-4xl font-bold mb-4">Disclaimer Policy</h1>
            <p className="text-lg max-w-2xl mx-auto text-primary-foreground/90">
              Important information about our services
            </p>
          </div>
        </section>

        <section className="py-16 px-4">
          <div className="container mx-auto max-w-4xl prose prose-lg">
            <h2>General Disclaimer</h2>
            <p className="text-muted-foreground">
              The information provided on this website is for general informational purposes only.
              While we strive to keep the information up to date and correct, we make no representations
              or warranties of any kind about the completeness, accuracy, or reliability of any
              information on the website.
            </p>

            <h2>Flight Information</h2>
            <p className="text-muted-foreground">
              Flight prices, schedules, and availability are subject to change without notice. All
              bookings are subject to airline terms and conditions. We recommend verifying all flight
              details before completing your booking.
            </p>

            <h2>Third-Party Services</h2>
            <p className="text-muted-foreground">
              Our website may contain links to third-party websites or services. We have no control
              over the content, policies, or practices of these sites and cannot accept responsibility
              for them.
            </p>

            <h2>Limitation of Liability</h2>
            <p className="text-muted-foreground">
              In no event will Loveable Travel be liable for any loss or damage including indirect or
              consequential loss arising from use of this website or reliance on information contained
              herein.
            </p>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default DisclaimerPolicy;
