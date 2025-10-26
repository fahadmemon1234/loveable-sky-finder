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
            <h1 className="text-4xl md:text-5xl font-bold mb-4">About Loveable Travel</h1>
            <p className="text-lg max-w-2xl mx-auto text-primary-foreground/90">
              Your trusted partner in creating unforgettable travel experiences
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
                    To provide seamless, affordable, and memorable travel experiences for every traveler,
                    connecting people with destinations worldwide through innovative booking solutions.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-8">
                  <h2 className="text-2xl font-bold mb-4">Our Vision</h2>
                  <p className="text-muted-foreground">
                    To become the world's most trusted travel platform, making international travel
                    accessible and enjoyable for everyone, everywhere.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="py-16 px-4 bg-secondary/20">
          <div className="container mx-auto">
            <div className="grid md:grid-cols-3 gap-8 text-center">
              <div className="space-y-4">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                  <Globe className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-3xl font-bold text-primary">150+</h3>
                <p className="text-muted-foreground">Countries Served</p>
              </div>
              <div className="space-y-4">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                  <Users className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-3xl font-bold text-primary">1M+</h3>
                <p className="text-muted-foreground">Happy Travelers</p>
              </div>
              <div className="space-y-4">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                  <Award className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-3xl font-bold text-primary">15+</h3>
                <p className="text-muted-foreground">Years of Excellence</p>
              </div>
            </div>
          </div>
        </section>

        {/* Our Story */}
        <section className="py-16 px-4">
          <div className="container mx-auto max-w-3xl">
            <h2 className="text-3xl font-bold text-center mb-8">Our Story</h2>
            <div className="prose prose-lg max-w-none">
              <p className="text-muted-foreground leading-relaxed">
                Founded in 2010, Loveable Travel began with a simple mission: to make international travel
                accessible to everyone. What started as a small startup has grown into a leading travel
                platform, serving millions of travelers worldwide.
              </p>
              <p className="text-muted-foreground leading-relaxed mt-4">
                We've partnered with hundreds of airlines and travel providers to offer you the best deals
                and most convenient booking experience. Our dedicated team works around the clock to ensure
                your travel plans go smoothly from start to finish.
              </p>
              <p className="text-muted-foreground leading-relaxed mt-4">
                Today, we're proud to be a trusted name in travel, helping people explore new destinations,
                reconnect with loved ones, and create memories that last a lifetime.
              </p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default About;
