import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import heroImage from "/assets/images/hero/hero-flight2.webp";
import { FaBullseye, FaGlobeAmericas } from "react-icons/fa";
import { useEffect, useState, useRef } from "react";

const About = () => {
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  // Animation trigger using Intersection Observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.3 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const storyRef = useRef(null);
  const [Visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { threshold: 0.3 }
    );

    if (storyRef.current) observer.observe(storyRef.current);
    return () => observer.disconnect();
  }, []);

  const valuesRef = useRef(null);
  const [valuesisVisible, setValuesIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setValuesIsVisible(entry.isIntersecting),
      { threshold: 0.3 }
    );
    if (valuesRef.current) observer.observe(valuesRef.current);
    return () => observer.disconnect();
  }, []);

  const values = [
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
  ];

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
            Find Your Perfect Flight
          </h1>
          <p className="text-sm sm:text-base text-white/90 max-w-2xl leading-relaxed">
            Compare flights from hundreds of airlines and find the best deals
            for your next adventure
          </p>
        </div>
      </section>

      {/* Mission & Vision */}
      <section
        id="mission-vision"
        ref={sectionRef}
        className="relative py-16 sm:py-20 px-4 bg-gradient-to-br from-[#fffbea] via-[#fef9e7] to-[#fff3cd] overflow-hidden"
      >
        <div className="container mx-auto max-w-6xl relative z-10">
          {/* Section Heading */}
          <div
            className={`text-center mb-12 sm:mb-16 transition-all duration-1000 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3">
              Our Mission & Vision
            </h2>
            <p className="text-gray-700 max-w-2xl mx-auto text-sm sm:text-base leading-relaxed">
              We’re committed to shaping the future of travel through trust,
              innovation, and excellence.
            </p>
          </div>

          {/* Cards Grid */}
          <div
            className={`grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8 transition-all duration-1000 delay-200 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
          >
            {/* Mission Card */}
            <Card className="group bg-white/90 backdrop-blur rounded-2xl border border-amber-200 shadow-lg hover:shadow-2xl hover:border-amber-400 transition-all duration-300">
              <CardContent className="p-6 sm:p-8 flex flex-col items-center sm:items-start text-center sm:text-left">
                <div className="mb-4 sm:mb-6 text-amber-500 group-hover:scale-110 transition-transform duration-300">
                  <FaGlobeAmericas className="text-4xl sm:text-5xl" />
                </div>
                <h3 className="text-xl sm:text-2xl font-semibold mb-3 text-gray-900 group-hover:text-amber-600 transition-colors">
                  Our Mission
                </h3>
                <p className="text-gray-700 text-sm sm:text-base leading-relaxed">
                  To deliver seamless, affordable, and memorable travel
                  experiences to every traveler — connecting people with
                  destinations worldwide through technology and care.
                </p>
              </CardContent>
            </Card>

            {/* Vision Card */}
            <Card className="group bg-white/90 backdrop-blur rounded-2xl border border-amber-200 shadow-lg hover:shadow-2xl hover:border-amber-400 transition-all duration-300">
              <CardContent className="p-6 sm:p-8 flex flex-col items-center sm:items-start text-center sm:text-left">
                <div className="mb-4 sm:mb-6 text-amber-500 group-hover:scale-110 transition-transform duration-300">
                  <FaBullseye className="text-4xl sm:text-5xl" />
                </div>
                <h3 className="text-xl sm:text-2xl font-semibold mb-3 text-gray-900 group-hover:text-amber-600 transition-colors">
                  Our Vision
                </h3>
                <p className="text-gray-700 text-sm sm:text-base leading-relaxed">
                  To become the world’s most trusted travel brand, making
                  journeys easy, accessible, and enjoyable for everyone —
                  everywhere.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Soft glowing background lights */}
        <div className="absolute top-0 left-0 w-48 sm:w-64 h-48 sm:h-64 bg-amber-200/40 rounded-full blur-3xl -z-10"></div>
        <div className="absolute bottom-0 right-0 w-56 sm:w-72 h-56 sm:h-72 bg-amber-300/30 rounded-full blur-3xl -z-10"></div>
      </section>

      {/* Our Story */}
      <section
        ref={storyRef}
        className="relative py-16 px-4 bg-secondary/10 overflow-hidden"
      >
        <div
          className={`container mx-auto max-w-3xl text-center transform transition-all duration-700 ease-out ${
            Visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-8">Our Story</h2>

          <div className="prose prose-lg max-w-none text-muted-foreground">
            <p className="leading-relaxed">
              Founded in 2010, Bright Holiday & Flights Limited has become a
              leader in flights, hotels, car rentals, and Umrah services. Our
              mission is to make international travel accessible and enjoyable
              for everyone, connecting travelers with destinations worldwide.
            </p>
            <p className="leading-relaxed mt-4">
              We partner with hundreds of airlines, hotels, and travel providers
              to offer the best deals and a smooth booking experience. Our
              dedicated team works tirelessly to ensure your travel plans are
              seamless from start to finish.
            </p>
            <p className="leading-relaxed mt-4">
              Today, we proudly serve millions of travelers globally, helping
              them explore new destinations, create unforgettable memories, and
              enjoy travel with confidence.
            </p>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section
        ref={valuesRef}
        className="relative py-20 px-6 bg-gradient-to-br from-[#fffbea] via-[#fef9e7] to-[#fff3cd] overflow-hidden"
      >
        <div
          className={`container mx-auto max-w-6xl transform transition-all duration-700 ease-out ${
            valuesisVisible
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-10"
          }`}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-14 text-[#3b2f1a] drop-shadow-md">
            Our Core Values
          </h2>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {values.map(({ title, desc }) => (
              <Card
                key={title}
                className="bg-white/70 border border-[#d4af37]/40 rounded-2xl shadow-md hover:shadow-xl 
              hover:scale-105 transition-all duration-500 backdrop-blur-sm"
              >
                <CardContent className="p-8 text-center">
                  <h3 className="text-2xl font-semibold mb-3 text-[#3b2f1a]">
                    {title}
                  </h3>
                  <p className="text-[#3b2f1a]/80 text-base leading-relaxed">
                    {desc}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Soft golden overlay for depth */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#fff8dc]/40 via-transparent to-transparent pointer-events-none" />
      </section>

      <Footer />
    </div>
  );
};

export default About;
