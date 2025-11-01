import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Plane } from "lucide-react";

const BusinessPartners = () => {
  const partners = [
    "British Airways",
    "Emirates",
    "Delta Airlines",
    "Lufthansa",
    "Singapore Airlines",
    "Qatar Airways",
    "Air France",
    "KLM",
    "United Airlines",
    "American Airlines",
    "Cathay Pacific",
    "Turkish Airlines",
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1">
        <section className="bg-gradient-to-br from-primary to-primary/80 text-primary-foreground py-16 px-4">
          <div className="container mx-auto text-center">
            <h1 className="text-4xl font-bold mb-4">Business Partners</h1>
            <p className="text-lg max-w-2xl mx-auto text-primary-foreground/90">
              Trusted airline partnerships worldwide
            </p>
          </div>
        </section>

        <section className="py-20 px-4 bg-gradient-to-b from-blue-50 via-white to-blue-100">
          <div className="container mx-auto max-w-6xl">
            {/* Section Intro */}
            <div className="text-center mb-16 max-w-3xl mx-auto">
              <p className="text-lg text-muted-foreground">
                We partner with leading airlines around the world to bring you
                the best flight deals and most convenient travel options.
              </p>
            </div>

            {/* Partners Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-8">
              {partners.map((partner) => (
                <Card
                  key={partner}
                  className="flex flex-col items-center justify-center text-center p-6 rounded-2xl border border-gray-200 shadow-sm hover:shadow-lg transition-all duration-300 bg-white"
                >
                  <Plane className="h-10 w-10 text-primary mb-3" />
                  <h3 className="font-semibold text-gray-800">{partner}</h3>
                </Card>
              ))}
            </div>

            {/* Become a Partner Callout */}
            <div className="mt-16 text-center">
              <Card className="bg-primary/10 border border-primary/20 rounded-3xl shadow-md hover:shadow-xl transition-shadow duration-300">
                <CardContent className="p-10">
                  <h2 className="text-3xl font-bold mb-4 text-primary">
                    Become a Partner
                  </h2>
                  <p className="text-muted-foreground mb-4">
                    Interested in partnering with Loveable Travel? Contact our
                    partnership team to explore opportunities.
                  </p>
                  <a
                    href="mailto:partnerships@loveabletravel.com"
                    className="text-primary font-semibold hover:underline"
                  >
                    partnerships@loveabletravel.com
                  </a>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default BusinessPartners;
