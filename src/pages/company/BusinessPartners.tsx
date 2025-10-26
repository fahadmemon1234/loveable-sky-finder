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

        <section className="py-16 px-4">
          <div className="container mx-auto max-w-6xl">
            <div className="text-center mb-12">
              <p className="text-muted-foreground max-w-2xl mx-auto">
                We partner with leading airlines around the world to bring you the best flight deals
                and most convenient travel options.
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {partners.map((partner) => (
                <Card key={partner} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6 flex flex-col items-center justify-center text-center h-32">
                    <Plane className="h-8 w-8 text-primary mb-2" />
                    <h3 className="font-semibold">{partner}</h3>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="mt-12 text-center">
              <Card className="bg-secondary/20">
                <CardContent className="p-8">
                  <h2 className="text-2xl font-bold mb-4">Become a Partner</h2>
                  <p className="text-muted-foreground mb-4">
                    Interested in partnering with Loveable Travel? Contact our partnership team to
                    explore opportunities.
                  </p>
                  <p className="text-primary font-semibold">partnerships@loveabletravel.com</p>
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
