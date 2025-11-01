import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useEffect, useRef, useState } from "react";
import {
  FaGlobe,
  FaMapMarkedAlt,
  FaHotel,
  FaPlaneDeparture,
  FaUsers,
} from "react-icons/fa";

import { FaThumbsUp, FaCheck } from "react-icons/fa";
import { PiCurrencyGbpBold } from "react-icons/pi";
import { IoIosUnlock } from "react-icons/io";
import { MdOutlineFlightTakeoff } from "react-icons/md";
import HeroSection from "@/components/HeroSection";
import FlightSearchForm from "@/components/FlightSearchForm";
import SubscribeSection from "@/components/SubscribeSection";

const Home = () => {
  const formRef = useRef(null);
  const [formisVisible, setFormIsVisible] = useState(false);

  // Scroll Animation
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setFormIsVisible(entry.isIntersecting),
      { threshold: 0.2 }
    );
    if (formRef.current) observer.observe(formRef.current);
    return () => observer.disconnect();
  }, []);

  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  // Scroll Animation
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.2 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const destinations = [
    {
      city: "Manila, Philippines",
      img: "/assets/images/cardimg/Manila.jpg",
      price: "£437",
      url: "/InquiryFlight/Manila-Philippines",
    },
    {
      city: "Lagos, Nigeria",
      img: "/assets/images/cardimg/Nigeria.jpg",
      price: "£390",
      url: "/InquiryFlight/Lagos-Nigeria",
    },
    {
      city: "Accra, Ghana",
      img: "/assets/images/cardimg/Ghana.jpg",
      price: "£401",
      url: "/InquiryFlight/Accra-Ghana",
    },
    {
      city: "Harare, Zimbabwe",
      img: "/assets/images/cardimg/Zimbabwe.jpg",
      price: "£457",
      url: "/InquiryFlight/Harare-Zimbabwe",
    },
    {
      city: "Nairobi, Kenya",
      img: "/assets/images/cardimg/nairobi-kenya.jpg",
      price: "£328",
      url: "/InquiryFlight/Nairobi-Kenya",
    },
    {
      city: "Entebbe, Uganda",
      img: "/assets/images/cardimg/Uganda.jpg",
      price: "£331",
      url: "/InquiryFlight/Entebbe-Uganda",
    },
    {
      city: "Addis Ababa, Ethiopia",
      img: "/assets/images/cardimg/Addis-Ababa-Ethiopia.jpg",
      price: "£346",
      url: "/InquiryFlight/Addis-Ababa-Ethiopia",
    },
    {
      city: "Johannesburg, South Africa",
      img: "/assets/images/cardimg/Johannesburg-South-Africa.jpeg",
      price: "£372",
      url: "/InquiryFlight/Johannesburg-South-Africa",
    },
    {
      city: "Abuja, Nigeria",
      img: "/assets/images/cardimg/Abuja-Nigeria.jpg",
      price: "£560",
      url: "/InquiryFlight/Abuja-Nigeria",
    },
    {
      city: "Dakar, Senegal",
      img: "/assets/images/cardimg/Dakar-Senegal.jpg",
      price: "£355",
      url: "/InquiryFlight/Dakar-Senegal",
    },
    {
      city: "Freetown, Sierra Leone",
      img: "/assets/images/cardimg/Freetown-Sierra-Leone.jpg",
      price: "£396",
      url: "/InquiryFlight/Freetown-Sierra-Leone",
    },
    {
      city: "Mombasa, Kenya",
      img: "/assets/images/cardimg/Mombasa-Kenya.jpg",
      price: "£490",
      url: "/InquiryFlight/Mombasa-Kenya",
    },
  ];

  const achievementsRef = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { threshold: 0.5 }
    );

    if (achievementsRef.current) observer.observe(achievementsRef.current);
    return () => observer.disconnect();
  }, []);

  const data = [
    {
      icon: (
        <FaGlobe className="text-3xl sm:text-4xl text-amber-500 group-hover:scale-110 transition-transform duration-300" />
      ),
      number: "95+",
      label: ["Countries", "Connected"],
    },
    {
      icon: (
        <FaMapMarkedAlt className="text-3xl sm:text-4xl text-amber-500 group-hover:scale-110 transition-transform duration-300" />
      ),
      number: "89+",
      label: ["Tour", "Places"],
    },
    {
      icon: (
        <FaHotel className="text-3xl sm:text-4xl text-amber-500 group-hover:scale-110 transition-transform duration-300" />
      ),
      number: "250+",
      label: ["Hotel", "Accommodation"],
    },
    {
      icon: (
        <FaPlaneDeparture className="text-3xl sm:text-4xl text-amber-500 group-hover:scale-110 transition-transform duration-300" />
      ),
      number: "2400+",
      label: ["Daily", "Flights"],
    },
    {
      icon: (
        <FaUsers className="text-3xl sm:text-4xl text-amber-500 group-hover:scale-110 transition-transform duration-300" />
      ),
      number: "Unlimited",
      label: ["Passenger", "Travel"],
    },
  ];

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
      <HeroSection />

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
        <div className="relative z-10 max-w-5xl mx-auto text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-primary mb-6">
            Find the Perfect Flight
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto mb-10 text-sm sm:text-base">
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
        className="py-20 px-4 sm:px-6 bg-gradient-to-br from-[#fffbea] via-[#fef9e7] to-[#fff3cd] overflow-hidden"
      >
        <div className="container mx-auto text-center">
          {/* Title */}
          <h2
            className={`text-3xl sm:text-4xl font-bold mb-4 text-gray-900 tracking-tight transition-all duration-700 ease-out ${
              servicesisVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
          >
            Our Services
          </h2>
          <p
            className={`text-muted-foreground mb-14 max-w-2xl mx-auto text-sm sm:text-base transition-all duration-700 ease-out delay-150 ${
              servicesisVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-6"
            }`}
          >
            We’re committed to delivering the best travel experiences —
            affordable, flexible, and secure.
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
                  transitionDelay: `${index * 120}ms`, // staggered animation
                }}
              >
                {/* Icon Container */}
                <div className="w-16 h-16 bg-amber-100 group-hover:bg-gradient-to-r group-hover:from-amber-400 group-hover:to-yellow-500 rounded-full flex items-center justify-center mx-auto transition-all duration-300">
                  <div className="text-amber-600 group-hover:text-muted">
                    {service.icon}
                  </div>
                </div>

                {/* Text Content */}
                <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mt-5 mb-2 group-hover:text-amber-600 transition-colors">
                  {service.title}
                </h3>
                <p className="text-sm text-gray-600 group-hover:text-gray-600 transition-colors duration-300">
                  {service.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Destinations */}
      <section
        ref={sectionRef}
        className={`relative py-24 sm:py-28 px-4 sm:px-8 bg-gradient-to-b from-blue-50 via-white to-blue-100 overflow-hidden transition-all duration-700 ease-out ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
      >
        {/* Decorative Background Blur */}
        <div className="absolute top-0 left-0 w-60 h-60 bg-blue-200/40 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-72 h-72 bg-blue-300/30 rounded-full blur-3xl" />

        <div className="relative z-10 container mx-auto text-center">
          {/* Section Heading */}
          <h2 className="text-3xl sm:text-4xl font-extrabold mb-6 tracking-tight text-blue-900">
            Popular Destinations
          </h2>
          <p className="text-blue-800/80 mb-14 max-w-2xl mx-auto text-sm sm:text-base leading-relaxed">
            Discover breathtaking destinations and enjoy unbeatable flight deals
            to your favorite cities worldwide.
          </p>

          {/* Destination Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {destinations.map(({ city, img, price, url }) => (
              <div
                key={city}
                className="group relative overflow-hidden rounded-2xl shadow-md hover:shadow-2xl bg-white/80 backdrop-blur-sm transition-all duration-500 border border-blue-100"
              >
                {/* Destination Image */}
                <img
                  src={img}
                  alt={city}
                  loading="lazy"
                  className="h-56 sm:h-64 md:h-72 w-full object-cover transition-transform duration-700 group-hover:scale-110"
                />

                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent transition-all duration-500 group-hover:from-black/70" />

                {/* Price Tag */}
                <div className="absolute top-3 right-3 sm:top-4 sm:right-4 bg-gradient-to-r from-amber-400 to-yellow-500 text-black px-3 sm:px-4 py-1 rounded-full text-xs sm:text-sm font-semibold shadow-md">
                  {price}
                </div>

                {/* City Info */}
                <div className="absolute bottom-5 left-5 z-10 text-left">
                  <h3 className="text-lg sm:text-xl md:text-2xl font-semibold text-white drop-shadow-md">
                    {city}
                  </h3>
                  <p className="text-xs sm:text-sm text-white/80">
                    Explore flight deals
                  </p>
                </div>

                {/* Hover CTA */}
                <div className="absolute inset-0 flex justify-center items-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-20">
                  <a
                    href={url}
                    className="px-5 py-2 sm:px-6 sm:py-3 bg-gradient-to-r from-amber-400 to-yellow-500 text-black font-semibold rounded-full text-sm sm:text-base hover:scale-105 hover:shadow-xl transition-all duration-300"
                  >
                    Book Now
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Travel Stats Section */}
      <section
        ref={achievementsRef}
        className={`relative py-14 px-4 sm:py-20 sm:px-6 bg-[#fdf8ec] overflow-hidden transition-all duration-700 ease-out ${
          visible ? "opacity-100 scale-100" : "opacity-0 scale-95"
        }`}
      >
        <div className="container mx-auto text-center relative z-10">
          <h2 className="text-2xl sm:text-4xl font-bold mb-3 text-gray-900 tracking-tight">
            Our Achievements
          </h2>
          <p className="text-gray-600 mb-10 sm:mb-14 max-w-2xl mx-auto text-sm sm:text-base">
            Trusted by thousands of travelers worldwide for delivering quality,
            safety, and unforgettable experiences.
          </p>

          {/* Cards Grid */}
          <div
            className={`grid grid-cols-2 xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6 md:gap-8 transition-all duration-1000 ease-out ${
              visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            {data.map(({ icon, number, label }, index) => (
              <div
                key={index}
                className={`group bg-white/90 backdrop-blur-sm rounded-xl p-4 sm:p-6 shadow-md hover:shadow-xl transition-all duration-500 border border-amber-100 hover:border-amber-400 flex flex-col items-center justify-center text-center min-h-[130px] sm:min-h-[160px]`}
                style={{
                  transitionDelay: `${index * 120}ms`, // stagger animation
                }}
              >
                <div className="flex flex-col items-center justify-center space-y-2 sm:space-y-3">
                  {icon}
                  <h3 className="text-lg sm:text-2xl font-bold text-gray-900">
                    {number}
                  </h3>
                  <p className="text-xs sm:text-sm font-medium text-gray-700 leading-tight">
                    {label[0]} <br /> {label[1]}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Subtle background glow */}
        <div className="absolute top-0 left-0 w-24 sm:w-40 h-24 sm:h-40 bg-amber-400/20 rounded-full blur-3xl -z-10"></div>
        <div className="absolute bottom-0 right-0 w-28 sm:w-52 h-28 sm:h-52 bg-yellow-300/20 rounded-full blur-3xl -z-10"></div>
      </section>

      <SubscribeSection />
      <Footer />
    </div>
  );
};

export default Home;
