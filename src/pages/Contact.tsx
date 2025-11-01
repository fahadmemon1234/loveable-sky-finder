import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Mail, Phone, MapPin } from "lucide-react";
import { toast } from "sonner";
import heroImage from "/assets/images/hero/contact.jpg";

const Contact = () => {
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      toast.success("Message sent successfully! We'll get back to you soon.");
      setLoading(false);
      (e.target as HTMLFormElement).reset();
    }, 1000);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      {/* Hero */}
      <section className="relative w-full h-[30vh] sm:h-[40vh] lg:h-[45vh] overflow-hidden">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url(${heroImage})`,
          }}
        ></div>

        {/* Overlay for better text visibility */}
        <div className="absolute inset-0 bg-black/40"></div>

        {/* Content */}
        <div className="relative z-10 flex flex-col justify-center items-center text-center h-full px-4">
          <h1 className="text-2xl sm:text-4xl font-bold text-white mb-3 drop-shadow-lg">
            Get in Touch
          </h1>
          <p className="text-sm sm:text-base text-white/90 max-w-2xl leading-relaxed">
            Have questions about your travel plans? We're here to help you every
            step of the way
          </p>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="py-24 px-4 bg-gradient-to-b from-blue-50 via-white to-blue-100 overflow-hidden relative">
        {/* Soft Glowing Circles */}
        <div className="absolute top-0 left-1/3 w-60 h-60 bg-blue-200/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-1/3 w-72 h-72 bg-blue-300/20 rounded-full blur-3xl animate-pulse"></div>

        <div className="container mx-auto max-w-6xl relative z-10 space-y-12">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div className="bg-white/80 backdrop-blur-md p-8 rounded-3xl shadow-xl border border-blue-200/40">
              <h2 className="text-3xl md:text-4xl font-extrabold mb-8 text-primary drop-shadow-md">
                Send us a Message
              </h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="name">Name *</Label>
                  <Input
                    id="name"
                    name="name"
                    required
                    placeholder="Your name"
                    className="bg-white/70 backdrop-blur-sm border border-gray-200 focus:border-primary focus:ring-1 focus:ring-primary"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email *</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    required
                    placeholder="your@email.com"
                    className="bg-white/70 backdrop-blur-sm border border-gray-200 focus:border-primary focus:ring-1 focus:ring-primary"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="subject">Subject *</Label>
                  <Input
                    id="subject"
                    name="subject"
                    required
                    placeholder="How can we help?"
                    className="bg-white/70 backdrop-blur-sm border border-gray-200 focus:border-primary focus:ring-1 focus:ring-primary"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="message">Message *</Label>
                  <Textarea
                    id="message"
                    name="message"
                    required
                    placeholder="Tell us more about your inquiry..."
                    rows={6}
                    className="bg-white/70 backdrop-blur-sm border border-gray-200 focus:border-primary focus:ring-1 focus:ring-primary"
                  />
                </div>
                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-amber-500 via-yellow-400 to-yellow-500 text-black font-semibold rounded-2xl shadow-lg hover:shadow-2xl hover:scale-105 transition-transform"
                  disabled={loading}
                >
                  {loading ? "Sending..." : "Send Message"}
                </Button>
              </form>
            </div>

            {/* Contact Info */}
            <div className="flex flex-col gap-6">
              <h2 className="text-3xl md:text-4xl font-extrabold text-primary drop-shadow-md">
                Get in Touch
              </h2>

              <div className="grid gap-6">
                {[
                  {
                    icon: <Mail className="h-6 w-6 text-primary" />,
                    title: "Email",
                    lines: [
                      "sales@skynovatravels.co.uk",
                      "Merry@skynovatravels.co.uk",
                    ],
                  },
                  {
                    icon: <Phone className="h-6 w-6 text-primary" />,
                    title: "Phone",
                    lines: ["+1 (555) 123-4567", "24/7 Customer Support"],
                  },
                  {
                    icon: <MapPin className="h-6 w-6 text-primary" />,
                    title: "Office",
                    lines: ["123 Travel Street", "London, UK", "EC1A 1BB"],
                  },
                ].map((item, idx) => (
                  <Card
                    key={idx}
                    className="bg-white/70 backdrop-blur-md rounded-3xl shadow-xl border border-blue-200/40"
                  >
                    <CardContent className="p-6 flex flex-col sm:flex-row items-start sm:items-center gap-4">
                      <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                        {item.icon}
                      </div>
                      <div>
                        <h3 className="font-semibold mb-1">{item.title}</h3>
                        {item.lines.map((line, i) => (
                          <p key={i} className="text-muted-foreground">
                            {line}
                          </p>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>

          {/* Full-width Map */}
          <div className="mt-12 rounded-3xl overflow-hidden shadow-xl border border-blue-200/40 h-64 sm:h-80 md:h-96 w-full">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d19800.123456!2d-0.1276!3d51.5074!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x48761b33333!2sLondon!5e0!3m2!1sen!2suk!4v1698712345678!5m2!1sen!2suk"
              width="100%"
              height="100%"
              className="border-0"
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>

        {/* Soft overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-white/40 via-transparent to-transparent pointer-events-none" />
      </section>

      <Footer />
    </div>
  );
};

export default Contact;
