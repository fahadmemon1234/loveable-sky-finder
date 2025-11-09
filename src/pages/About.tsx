import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import heroImage from "/assets/images/hero/hero-flight2.webp";
import { FaBullseye, FaGlobeAmericas } from "react-icons/fa";
import { useEffect, useState, useRef } from "react";
import {
  FaHandshake,
  FaMapMarkedAlt,
  FaMountain,
  FaStar,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const About = () => {
  const navigate = useNavigate();

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

  const welcomeRef = useRef(null);
  const [welcomeVisible, setWelcomeVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setWelcomeVisible(entry.isIntersecting),
      { threshold: 0.3 }
    );

    if (welcomeRef.current) observer.observe(welcomeRef.current);
    return () => observer.disconnect();
  }, []);

  const teamMembers = [
    {
      name: "John Doe",
      role: "Travel Consultant",
      image: "/assets/images/Team/team1.jpg",
    },
    {
      name: "Jane Smith",
      role: "Tour Guide",
      image: "/assets/images/Team/team2.jpg",
    },
    {
      name: "Alex Johnson",
      role: "Planner",
      image: "/assets/images/Team/team3.jpg",
    },
    {
      name: "Emily Brown",
      role: "Coordinator",
      image: "/assets/images/Team/team4.jpeg",
    },
    {
      name: "Michael Lee",
      role: "Designer",
      image: "/assets/images/Team/team5.jpeg",
    },
    {
      name: "Sarah Wilson",
      role: "Support",
      image: "/assets/images/Team/team6.jpeg",
    },
    {
      name: "David Kim",
      role: "Consultant",
      image: "/assets/images/Team/team7.webp",
    },
    {
      name: "Anna Davis",
      role: "Advisor",
      image: "/assets/images/Team/team8.jpg",
    },
    {
      name: "Chris Martin",
      role: "Manager",
      image: "/assets/images/Team/team9.jpg",
    },
  ];

  const teamRef = useRef(null);
  const [teamVisible, setTeamVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setTeamVisible(entry.isIntersecting),
      { threshold: 0.3 }
    );

    if (teamRef.current) observer.observe(teamRef.current);
    return () => observer.disconnect();
  }, []);
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

      <section
        ref={welcomeRef}
        className={`py-20 px-4 sm:px-6 bg-gradient-to-b from-blue-50 via-white to-blue-100 overflow-hidden
      ${
        welcomeVisible
          ? "opacity-100 translate-y-0"
          : "opacity-0 translate-y-10"
      }`}
      >
        {/* Decorative blur background for a premium feel */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-72 h-72 bg-blue-300/20 blur-3xl rounded-full" />
          <div className="absolute bottom-0 right-0 w-72 h-72 bg-sky-200/30 blur-3xl rounded-full" />
        </div>

        <div className="relative z-10 container mx-auto text-center">
          {/* Heading */}
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-black mb-3">
              Welcome to <span className="text-primary">Sky Nova Travels</span>
            </h2>
            <p className="text-muted-foreground text-base sm:text-lg">
              As your travel consultant, we're passionate about creating
              unforgettable travel experiences
            </p>
          </div>

          {/* Content */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
            {/* Left Side Text */}
            <div>
              <h3 className="text-xl sm:text-2xl font-semibold text-primary mb-4">
                Your Travel Consultant
              </h3>
              <p className="text-muted-foreground mb-4 leading-relaxed">
                As your travel consultant, we’re dedicated to crafting
                personalized journeys that reflect your style and spirit. Our
                team creates unique travel experiences that go beyond the
                ordinary—taking you off the beaten path and into the heart of
                your destination.
              </p>
              <p className="text-muted-foreground mb-4 leading-relaxed">
                We understand that every traveler is unique, so we take the time
                to learn your preferences, interests, and travel goals. Our
                creative and innovative approach ensures every trip feels
                special and effortless.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                From luxury getaways to adventure trips, we help turn your
                travel dreams into reality with attention to detail and
                commitment to excellence.
              </p>
            </div>

            {/* Right Side Image */}
            <div className="relative">
              <img
                src="/assets/images/about/welcome.avif"
                alt="Travel Consultant"
                className="rounded-2xl shadow-lg w-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section
        id="our-values"
        ref={sectionRef}
        className={`relative py-14 sm:py-20 px-4 sm:px-6 bg-gradient-to-br 
        from-[#fffbea] via-[#fef9e7] to-[#fff3cd] overflow-hidden
        transition-all duration-700 ease-out
        ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
      >
        {/* Background Glows */}
        <div className="absolute top-0 left-0 w-40 sm:w-60 h-40 sm:h-60 bg-yellow-100/40 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-52 sm:w-72 h-52 sm:h-72 bg-yellow-200/30 rounded-full blur-3xl" />

        <div className="relative z-10 container mx-auto text-center cursor-pointer">
          {/* Heading */}
          <div className="text-center mb-10 sm:mb-16 transition-all duration-1000">
            <h2 className="text-2xl sm:text-4xl font-bold text-primary mb-3">
              Our Values
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto text-sm sm:text-base leading-relaxed">
              The principles that guide us in delivering exceptional travel
              experiences.
            </p>
          </div>

          {/* Value Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-8">
            {[
              {
                icon: <FaHandshake className="text-4xl" />,
                title: "Personalized Service",
                text: "Tailoring our services to meet your unique needs and preferences, ensuring every journey is crafted just for you.",
              },
              {
                icon: <FaMapMarkedAlt className="text-4xl" />,
                title: "Expert Knowledge",
                text: "Drawing on our extensive experience and local insights to guide you to the best experiences and destinations.",
              },
              {
                icon: <FaMountain className="text-4xl" />,
                title: "Memorable Adventures",
                text: "We make every trip a memorable adventure, fostering lifelong memories and inspiring a love for exploration.",
              },
              {
                icon: <FaStar className="text-4xl" />,
                title: "Exceptional Service",
                text: "Providing exceptional travel services, exceeding expectations with creativity and attention to detail.",
              },
            ].map((item, i) => (
              <div
                key={i}
                className="group bg-white/90 backdrop-blur rounded-2xl border border-amber-200 shadow-lg hover:shadow-2xl hover:border-amber-400 transition-all duration-300 p-6 sm:p-8 text-center flex flex-col items-center"
              >
                <div className="flex items-center justify-center mb-5 text-amber-500 group-hover:scale-110 transition-transform duration-300">
                  {item.icon}
                </div>
                <h3 className="text-lg sm:text-xl font-semibold mb-3 text-gray-900 group-hover:text-amber-600 transition-colors">
                  {item.title}
                </h3>
                <p className="text-gray-700 text-sm sm:text-base leading-relaxed">
                  {item.text}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Subtle background lighting */}
        <div className="absolute top-0 left-0 w-40 sm:w-64 h-40 sm:h-64 bg-amber-200/40 rounded-full blur-3xl -z-10"></div>
        <div className="absolute bottom-0 right-0 w-48 sm:w-72 h-48 sm:h-72 bg-amber-300/30 rounded-full blur-3xl -z-10"></div>
      </section>

      {/* Our Team */}
      <section
        ref={teamRef}
        className={`relative py-20 px-4 bg-gradient-to-b from-blue-50 via-white to-blue-100 overflow-hidden`}
      >
        {/* Decorative Background Glows */}
        <div className="absolute top-0 left-0 w-72 h-72 bg-blue-200/30 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-blue-300/20 rounded-full blur-3xl"></div>

        <div className="container mx-auto max-w-6xl relative z-10 text-center">
          {/* Heading */}
          <h2 className="text-3xl sm:text-4xl font-bold text-primary mb-4">
            Our Team
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-sm sm:text-base leading-relaxed mb-12">
            Meet the dedicated professionals behind Sky Nova Travels who turn
            every trip into an unforgettable experience.
          </p>

          {/* Team Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 gap-6 sm:gap-8">
            {teamMembers.map((member, index) => (
              <div
                key={index}
                className="group relative bg-white/90 backdrop-blur rounded-2xl overflow-hidden border border-blue-200 shadow-lg hover:shadow-2xl hover:border-blue-400 transition-all duration-500"
              >
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-52 sm:h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end justify-center">
                  <div className="text-white pb-4">
                    <h3 className="text-lg font-semibold tracking-wide">
                      {member.name}
                    </h3>
                    <p className="text-sm text-blue-200">{member.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Get in Touch */}
      <section
        ref={valuesRef}
        className="relative py-24 px-6 bg-gradient-to-br from-[#fffbea] via-[#fef9e7] to-[#fff3cd] overflow-hidden"
      >
        {/* Soft Glowing Circles */}
        <div className="absolute top-0 left-1/4 w-60 h-60 bg-amber-200/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-1/4 w-72 h-72 bg-yellow-300/20 rounded-full blur-3xl animate-pulse"></div>

        <div
          className={`container mx-auto max-w-4xl text-center transform transition-all duration-700 ease-out ${
            valuesisVisible
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-10"
          }`}
        >
          <h2 className="text-4xl md:text-5xl font-extrabold text-primary mb-6 drop-shadow-md">
            Get in Touch
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground mb-10 leading-relaxed">
            Ready to start planning your dream trip? Contact us today to
            discover how we can help you create unforgettable travel
            experiences!
          </p>

          <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
            {/* Filled Gradient Button */}
            <button
              onClick={() => navigate("/contact")}
              className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-2xl text-lg px-6 py-3 font-semibold text-black bg-gradient-to-r from-amber-500 via-yellow-400 to-yellow-500 shadow-lg hover:shadow-2xl hover:scale-105 transition-transform ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 focus-visible:ring-offset-2"
            >
              Contact Us
            </button>

            {/* Outlined Button using primary color */}
            <a
              href="tel:+923153268177"
              className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-2xl text-lg px-6 py-3 font-semibold text-primary border-2 border-primary shadow-md 
             hover:bg-primary hover:!text-white hover:shadow-lg transition-all duration-300 
             focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
            >
              Call Now
            </a>
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
