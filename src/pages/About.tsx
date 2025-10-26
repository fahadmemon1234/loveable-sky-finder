import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Award, Users, Globe } from "lucide-react";

const About = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1">
        {/* Hero */}
        <section className="bg-gradient-to-br from-primary to-primary/80 text-primary-foreground py-20 px-4">
          <div className="container mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              About Loveable Travel
            </h1>
            <p className="text-lg max-w-2xl mx-auto text-primary-foreground/90">
              Bright Holiday & Flights Limited is your trusted partner in
              creating unforgettable travel experiences, offering flights,
              hotels, car rentals, and Umrah packages worldwide.
            </p>
          </div>
        </section>

        {/* Mission & Vision */}
        <section className="py-16 px-4">
          <div className="container mx-auto max-w-4xl">
            <div className="grid md:grid-cols-2 gap-8">
              <Card>
                <CardContent className="p-8">
                  <h2 className="text-2xl font-bold mb-4">Our Mission</h2>
                  <p className="text-muted-foreground">
                    To provide seamless, affordable, and memorable travel
                    experiences for every traveler, connecting people with
                    destinations worldwide through innovative booking solutions.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-8">
                  <h2 className="text-2xl font-bold mb-4">Our Vision</h2>
                  <p className="text-muted-foreground">
                    To become the world's most trusted travel platform, making
                    international travel accessible and enjoyable for everyone,
                    everywhere.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Our Story */}
        <section className="py-16 px-4">
          <div className="container mx-auto max-w-3xl">
            <h2 className="text-3xl font-bold text-center mb-8">Our Story</h2>
            <div className="prose prose-lg max-w-none">
              <p className="text-muted-foreground leading-relaxed">
                Founded in 2010, Bright Holiday & Flights Limited has become a
                leader in flights, hotels, car rentals, and Umrah services. Our
                mission is to make international travel accessible and enjoyable
                for everyone, connecting travelers with destinations worldwide.
              </p>
              <p className="text-muted-foreground leading-relaxed mt-4">
                We partner with hundreds of airlines, hotels, and travel
                providers to offer the best deals and a smooth booking
                experience. Our dedicated team works tirelessly to ensure your
                travel plans are seamless from start to finish.
              </p>
              <p className="text-muted-foreground leading-relaxed mt-4">
                Today, we proudly serve millions of travelers globally, helping
                them explore new destinations, create unforgettable memories,
                and enjoy travel with confidence.
              </p>
            </div>
          </div>
        </section>

        {/* Core Values */}
        <section className="py-16 px-4 bg-secondary/10">
          <div className="container mx-auto max-w-4xl">
            <h2 className="text-3xl font-bold text-center mb-12">
              Our Core Values
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              {[
                {
                  title: "Excellence",
                  desc: "Striving for excellence in everything we do, ensuring operational and service quality.",
                },
                {
                  title: "Customer Centricity",
                  desc: "Putting our customers first and exceeding their expectations in every interaction.",
                },
                {
                  title: "Integrity",
                  desc: "Maintaining consistency between our words and actions, ensuring trust and transparency.",
                },
                {
                  title: "Innovation",
                  desc: "Encouraging new ideas and solutions to continuously improve our services.",
                },
                {
                  title: "Accountability",
                  desc: "Taking ownership of our actions and delivering high-quality results.",
                },
                {
                  title: "Teamwork",
                  desc: "Collaborating effectively to achieve common goals and deliver better results.",
                },
                {
                  title: "Empowerment",
                  desc: "Giving employees the freedom and tools to take control and succeed.",
                },
                {
                  title: "Passion",
                  desc: "Maintaining a 'can-do' attitude to overcome challenges and achieve goals.",
                },
              ].map(({ title, desc }) => (
                <Card key={title}>
                  <CardContent className="p-6">
                    <h3 className="text-xl font-semibold mb-2">{title}</h3>
                    <p className="text-muted-foreground">{desc}</p>
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

export default About;
