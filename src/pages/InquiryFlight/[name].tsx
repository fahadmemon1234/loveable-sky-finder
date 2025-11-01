import React, { useEffect, useState, useRef } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FlightSearchForm from "@/components/FlightSearchForm";
import heroImage from "@/assets/hero-flight.jpg";
import { FaThumbsUp, FaCheck } from "react-icons/fa";
import { PiCurrencyGbpBold } from "react-icons/pi";
import { IoIosUnlock } from "react-icons/io";
import { MdOutlineFlightTakeoff } from "react-icons/md";
import { useParams } from "react-router-dom";

const InquiryFlight = () => {
  const { name } = useParams();

  const formRef = React.useRef<HTMLDivElement>(null);
  const [formisVisible, setFormisVisible] = React.useState(false);

  // Scroll Animation
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setFormisVisible(entry.isIntersecting),
      { threshold: 0.2 }
    );
    if (formRef.current) observer.observe(formRef.current);
    return () => observer.disconnect();
  }, []);

  const servicesRef = useRef(null);
  const [servicesisVisible, setServicesisVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setServicesisVisible(entry.isIntersecting),
      { threshold: 0.3 }
    );
    if (servicesRef.current) observer.observe(servicesRef.current);
    return () => observer.disconnect();
  }, []);

  const services = [
    {
      icon: <FaThumbsUp className="h-8 w-8" />,
      title: "Great Choice",
      text: "Explore a wide range of airfares, hotels, and vacation packages for every traveler.",
    },
    {
      icon: <PiCurrencyGbpBold className="h-8 w-8" />,
      title: "Low Prices",
      text: "Enjoy unbeatable deals with guaranteed best prices on all bookings.",
    },
    {
      icon: <FaCheck className="h-8 w-8" />,
      title: "Flexible Payment",
      text: "Book your trip now and pay later with easy, flexible payment plans.",
    },
    {
      icon: <IoIosUnlock className="h-8 w-8" />,
      title: "Secure Booking",
      text: "Book confidently with our verified and secure payment process.",
    },
    {
      icon: <MdOutlineFlightTakeoff className="h-8 w-8" />,
      title: "Installment Plan",
      text: "Pay in easy monthly installments — interest-free and hassle-free.",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      {/* Hero Section */}
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
            Book Cheap Flight Tickets to
          </h1>
          <h2 className="text-2xl sm:text-4xl font-bold bg-white text-primary p-3 rounded-3xl mb-3 drop-shadow-lg">
            {name}
          </h2>
        </div>
      </section>

      <section
        ref={formRef}
        className={`relative py-24 sm:py-28 px-4 sm:px-8 bg-gradient-to-b from-blue-50 via-white to-blue-100 overflow-hidden transition-all duration-700 ease-out ${
          formisVisible
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-10"
        }`}
      >
        {/* Decorative blur background for a premium feel */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-72 h-72 bg-blue-300/20 blur-3xl rounded-full" />
          <div className="absolute bottom-0 right-0 w-72 h-72 bg-sky-200/30 blur-3xl rounded-full" />
        </div>

        {/* Content container */}
        <div className="relative z-10 max-w-5xl mx-auto">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-primary mb-6 text-center">
            Find the Perfect Flight
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto mb-10 text-sm sm:text-base text-center">
            Compare routes, fares, and airlines in seconds — plan your next
            journey with ease and confidence.
          </p>

          {/* Form container */}
          <FlightSearchForm />
        </div>
      </section>

      {/* Our Services Section */}
      <section
        ref={servicesRef}
        className="relative py-20 px-4 sm:px-6 bg-gradient-to-br from-[#fffbea] via-[#fef9e7] to-[#fff3cd] overflow-hidden"
      >
        {/* Decorative Background Glow */}
        <div className="absolute top-0 left-0 w-60 h-60 bg-yellow-100/40 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-72 h-72 bg-yellow-200/30 rounded-full blur-3xl" />

        <div className="relative z-10 container mx-auto text-center cursor-pointer">
          {/* Section Title */}
          <h2
            className={`text-3xl sm:text-4xl font-extrabold mb-4 text-[#05304c] tracking-tight transition-all duration-700 ease-out ${
              servicesisVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
          >
            Our Services
          </h2>

          <p
            className={`text-muted-foreground mb-14 max-w-2xl mx-auto text-sm sm:text-base leading-relaxed transition-all duration-700 ease-out delay-150 ${
              servicesisVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-6"
            }`}
          >
            We’re dedicated to making your travel easier — with affordable,
            flexible, and secure services designed around your journey.
          </p>

          {/* Services Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 sm:gap-8">
            {services.map((service, index) => (
              <div
                key={index}
                className={`group bg-white rounded-2xl p-8 shadow-md hover:shadow-xl transition-all duration-500 border border-amber-100 hover:border-amber-400 hover:-translate-y-2 transform ${
                  servicesisVisible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-10"
                }`}
                style={{
                  transitionDelay: `${index * 120}ms`,
                }}
              >
                {/* Icon Container */}
                <div className="w-16 h-16 bg-amber-100 group-hover:bg-gradient-to-r group-hover:from-amber-400 group-hover:to-yellow-500 rounded-full flex items-center justify-center mx-auto transition-all duration-300">
                  <div className="text-amber-600 text-2xl group-hover:text-white transition-colors duration-300">
                    {service.icon}
                  </div>
                </div>

                {/* Text Content */}
                <h3 className="text-lg sm:text-xl font-semibold text-[#05304c] mt-5 mb-2 group-hover:text-amber-600 transition-colors">
                  {service.title}
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  {service.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default InquiryFlight;
