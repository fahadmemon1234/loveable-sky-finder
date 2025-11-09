import { useState, useEffect, useRef } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FlightSearchForm from "@/components/FlightSearchForm";
import heroImage from "@/assets/hero-flight.jpg";
import { FaCalendarCheck, FaDollarSign, FaGlobeAmericas } from "react-icons/fa";
import { PiCurrencyGbpBold } from "react-icons/pi";
import { useNavigate } from "react-router-dom";

const CheapFlights = () => {

  const navigate = useNavigate();

  const destinations = [
    {
      city: "Dar-Es-Salaam",
      img: "/assets/images/Flight/Dar-Es-Salaam.jpg",
      price: "£327",
      region: "Africa",
      url: "/InquiryFlight/Dar-Es-Salaam",
    },
    {
      city: "Kuala Lumpur",
      img: "/assets/images/Flight/Kuala-Lumpur.jpeg",
      price: "£427",
      region: "Asia",
      url: "/InquiryFlight/Kuala-Lumpur",
    },
    {
      city: "Manila",
      img: "/assets/images/Flight/Manila.jpeg",
      price: "£437",
      region: "Asia",
      url: "/InquiryFlight/Manila",
    },
    {
      city: "Dhaka",
      img: "/assets/images/Flight/Dhaka.jpg",
      price: "£461",
      region: "Asia",
      url: "/InquiryFlight/Dhaka",
    },

    {
      city: "Istanbul",
      img: "/assets/images/Flight/Istanbul.jpg",
      price: "£137",
      region: "Europe",
      url: "/InquiryFlight/Istanbul",
    },

    {
      city: "Lagos",
      img: "/assets/images/Flight/Lagos.jpg",
      price: "£390",
      region: "Africa",
      url: "/InquiryFlight/Lagos",
    },
    {
      city: "Accra",
      img: "/assets/images/Flight/Accra.jpeg",
      price: "£401",
      region: "Africa",
      url: "/InquiryFlight/Accra",
    },
    {
      city: "Harare",
      img: "/assets/images/Flight/Harare.jpg",
      price: "£457",
      region: "Africa",
      url: "/InquiryFlight/Harare",
    },
    {
      city: "Nairobi",
      img: "/assets/images/Flight/Nairobi.jpeg",
      price: "£328",
      region: "Africa",
      url: "/InquiryFlight/Nairobi",
    },
    {
      city: "Entebbe",
      img: "/assets/images/Flight/Entebbe.webp",
      price: "£331",
      region: "Africa",
      url: "/InquiryFlight/Entebbe",
    },
    {
      city: "Addis-Ababa",
      img: "/assets/images/Flight/Addis-Ababa.avif",
      price: "£346",
      region: "Africa",
      url: "/InquiryFlight/Addis-Ababa",
    },
    {
      city: "Khartoum",
      img: "/assets/images/Flight/Khartoum.webp",
      price: "£364",
      region: "Africa",
      url: "/InquiryFlight/Khartoum",
    },
    {
      city: "Johannesburg",
      img: "/assets/images/Flight/Johannesburg.jpeg",
      price: "£372",
      region: "Africa",
      url: "/InquiryFlight/Johannesburg",
    },
    {
      city: "Abidjan",
      img: "/assets/images/Flight/Abidjan.webp",
      price: "£332",
      region: "Africa",
      url: "/InquiryFlight/Abidjan",
    },
    {
      city: "Abuja",
      img: "/assets/images/Flight/Abuja.jpg",
      price: "£560",
      region: "Africa",
      url: "/InquiryFlight/Abuja",
    },
    {
      city: "Algiers",
      img: "/assets/images/Flight/Algiers.jpg",
      price: "£191",
      region: "Africa",
      url: "/InquiryFlight/Algiers",
    },

    {
      city: "Banjul",
      img: "/assets/images/Flight/Banjul.jpg",
      price: "£595",
      region: "Africa",
      url: "/InquiryFlight/Banjul",
    },

    {
      city: "Bulawayo",
      img: "/assets/images/Flight/Bulawayo.webp",
      price: "£822",
      region: "Africa",
      url: "/InquiryFlight/Bulawayo",
    },
    {
      city: "Cairo",
      img: "/assets/images/Flight/Cairo.jpg",
      price: "£261",
      region: "Africa",
      url: "/InquiryFlight/Cairo",
    },
    {
      city: "Cape Town",
      img: "/assets/images/Flight/Cape-Town.webp",
      price: "£505",
      region: "Africa",
      url: "/InquiryFlight/Cape-Town",
    },
    {
      city: "Casablanca",
      img: "/assets/images/Flight/Casablanca.webp",
      price: "£158",
      region: "Africa",
      url: "/InquiryFlight/Casablanca",
    },
    {
      city: "Dakar",
      img: "/assets/images/Flight/Dakar.jpg",
      price: "£355",
      region: "Africa",
      url: "/InquiryFlight/Dakar",
    },
    {
      city: "Douala",
      img: "/assets/images/Flight/Douala.jpg",
      price: "£406",
      region: "Africa",
      url: "/InquiryFlight/Douala",
    },
    {
      city: "Durban",
      img: "/assets/images/Flight/Durban.jpeg",
      price: "£603",
      region: "Africa",
      url: "/InquiryFlight/Durban",
    },

    {
      city: "Gaborone",
      img: "/assets/images/Flight/Gaborone.jpg",
      price: "£572",
      region: "Africa",
      url: "/InquiryFlight/Gaborone",
    },
    {
      city: "Freetown",
      img: "/assets/images/Flight/Freetown.jpg",
      price: "£396",
      region: "Africa",
      url: "/InquiryFlight/Freetown",
    },
    {
      city: "Kigali",
      img: "/assets/images/Flight/Kigali.jpg",
      price: "£363",
      region: "Africa",
      url: "/InquiryFlight/Kigali",
    },
    {
      city: "Kinshasa",
      img: "/assets/images/Flight/Kinshasa.jpg",
      price: "£450",
      region: "Africa",
      url: "/InquiryFlight/Kinshasa",
    },
    {
      city: "Kilimanjaro",
      img: "/assets/images/Flight/Kilimanjaro.jpeg",
      price: "£404",
      region: "Africa",
      url: "/InquiryFlight/Kilimanjaro",
    },
    {
      city: "Lilongwe",
      img: "/assets/images/Flight/Lilongwe.webp",
      price: "£503",
      region: "Africa",
      url: "/InquiryFlight/Lilongwe",
    },
    {
      city: "Lusaka",
      img: "/assets/images/Flight/Lusaka.jpg",
      price: "£538",
      region: "Africa",
      url: "/InquiryFlight/Lusaka",
    },
    {
      city: "Luanda",
      img: "/assets/images/Flight/Luanda.jpg",
      price: "£415",
      region: "Africa",
      url: "/InquiryFlight/Luanda",
    },
    {
      city: "Mogadishu",
      img: "/assets/images/Flight/Mogadishu.webp",
      price: "£774",
      region: "Africa",
      url: "/InquiryFlight/Mogadishu",
    },
    {
      city: "Windhoek",
      img: "/assets/images/Flight/Windhoek.jpg",
      price: "£631",
      region: "Africa",
      url: "/InquiryFlight/Windhoek",
    },
    {
      city: "Mombasa",
      img: "/assets/images/Flight/Mombasa.jpg",
      price: "£490",
      region: "Africa",
      url: "/InquiryFlight/Mombasa",
    },
    {
      city: "Port Harcourt",
      img: "/assets/images/Flight/Port-Harcourt.jpg",
      price: "£729",
      region: "Africa",
      url: "/InquiryFlight/Port-Harcourt",
    },
    {
      city: "Paris",
      img: "/assets/images/Flight/Paris.jpg",
      price: "£123",
      region: "Europe",
      url: "/InquiryFlight/Paris",
    },
    {
      city: "Frankfurt",
      img: "/assets/images/Flight/Frankfurt.jpg",
      price: "£127",
      region: "Europe",
      url: "/InquiryFlight/Frankfurt",
    },
    {
      city: "Lisbon",
      img: "/assets/images/Flight/Lisbon.jpg",
      price: "£112",
      region: "Europe",
      url: "/InquiryFlight/Lisbon",
    },
    {
      city: "Melbourne",
      img: "/assets/images/Flight/Melbourne.jpg",
      price: "£546",
      region: "Europe",
      url: "/InquiryFlight/Melbourne",
    },
    {
      city: "Perth",
      img: "/assets/images/Flight/Perth.jpeg",
      price: "£566",
      region: "Australia",
      url: "/InquiryFlight/Perth",
    },
    {
      city: "Sydney",
      img: "/assets/images/Flight/Sydney.webp",
      price: "£612",
      region: "Australia",
      url: "/InquiryFlight/Sydney",
    },
    {
      city: "Buffalo",
      img: "/assets/images/Flight/Buffalo.jpg",
      price: "£789",
      region: "Australia",
      url: "/InquiryFlight/Buffalo",
    },
    {
      city: "Auckland",
      img: "/assets/images/Flight/Auckland.jpg",
      price: "£642",
      region: "Australia",
      url: "/InquiryFlight/Auckland",
    },
    {
      city: "Baltimore",
      img: "/assets/images/Flight/Baltimore.jpg",
      price: "£506",
      region: "Australia",
      url: "/InquiryFlight/Baltimore",
    },
    {
      city: "Washington Dulles",
      img: "/assets/images/Flight/Washington-Dulles.jpg",
      price: "£490",
      region: "Australia",
      url: "/InquiryFlight/Washington-Dulles",
    },
    {
      city: "San Francisco",
      img: "/assets/images/Flight/San-Francisco.jpeg",
      price: "£388",
      region: "Australia",
      url: "/InquiryFlight/San-Francisco",
    },
    {
      city: "Toronto",
      img: "/assets/images/Flight/Toronto.jpeg",
      price: "£416",
      region: "Australia",
      url: "/InquiryFlight/Toronto",
    },
    {
      city: "Miami",
      img: "/assets/images/Flight/Miami.jpeg",
      price: "£458",
      region: "Australia",
      url: "/InquiryFlight/Miami",
    },
    {
      city: "Washington Reagan(DC)",
      img: "/assets/images/Flight/Washington-Reagan.webp",
      price: "£590",
      region: "Australia",
      url: "/InquiryFlight/Washington-Reagan",
    },
    {
      city: "Islip",
      img: "/assets/images/Flight/Islip.jpeg",
      price: "£799",
      region: "Australia",
      url: "/InquiryFlight/Islip",
    },
    {
      city: "Jeddah",
      img: "/assets/images/Flight/Jeddah.jpeg",
      price: "£406",
      region: "Middle East",
      url: "/InquiryFlight/Jeddah",
    },
    {
      city: "Munich",
      img: "/assets/images/Flight/Munich.jpeg",
      price: "£108",
      region: "Europe",
      url: "/InquiryFlight/Munich",
    },
    {
      city: "New York",
      img: "/assets/images/Flight/New-York.jpg",
      price: "£371",
      region: "Europe",
      url: "/InquiryFlight/New-York",
    },
    {
      city: "Dubai",
      img: "/assets/images/Flight/Dubai.jpeg",
      price: "£290",
      region: "Middle East",
      url: "/InquiryFlight/Dubai",
    },
  ];

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

  const tips = [
    {
      icon: <FaCalendarCheck className="text-4xl text-[#05304c]" />,
      title: "Book in Advance",
      text: "Plan your trips early to secure the best fares and more seat options, especially during peak travel seasons.",
    },
    {
      icon: <PiCurrencyGbpBold className="text-4xl text-[#05304c]" />,
      title: "Compare Before You Buy",
      text: "Use trusted platforms to compare flights from multiple airlines to make sure you get the best price and value.",
    },
    {
      icon: <FaGlobeAmericas className="text-4xl text-[#05304c]" />,
      title: "Stay Flexible",
      text: "Be open to adjusting your dates and destinations — flexible travelers often find the best flight deals.",
    },
  ];

  const tipsRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  // Intersection Observer for scroll animation
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.2 }
    );

    if (tipsRef.current) observer.observe(tipsRef.current);
    return () => observer.disconnect();
  }, []);

  const popularRef = useRef(null);
  const [PoppularisVisible, setPoppularIsVisible] = useState(false);

  // Scroll Animation
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setPoppularIsVisible(entry.isIntersecting),
      { threshold: 0.2 }
    );
    if (popularRef.current) observer.observe(popularRef.current);
    return () => observer.disconnect();
  }, []);

    const handleNext = (url: string) => {
    navigate(url);
  };


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
            Find Your Perfect Flight
          </h1>
          <p className="text-sm sm:text-base text-white/90 max-w-2xl leading-relaxed">
            Compare flights from hundreds of airlines and find the best deals
            for your next adventure
          </p>
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
          <p className="text-gray-600 max-w-2xl mx-auto mb-10 text-sm sm:text-base text-center">
            Compare routes, fares, and airlines in seconds — plan your next
            journey with ease and confidence.
          </p>

          {/* Form container */}
          <FlightSearchForm />
        </div>
      </section>

      {/* Filtered Destinations */}
      <section
        className={`py-20 px-4 sm:px-6 bg-gradient-to-br from-[#fffbea] via-[#fef9e7] to-[#fff3cd] 
       overflow-hidden relative`}
      >
        {/* Decorative Background Glow */}
        <div className="absolute top-0 left-0 w-60 h-60 bg-yellow-100/40 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-72 h-72 bg-yellow-200/30 rounded-full blur-3xl" />

        <div className="relative z-10 container mx-auto text-center">
          {/* Section Heading */}
          <h2 className="text-3xl sm:text-4xl font-extrabold mb-6 tracking-tight text-primary">
            Featured Flight Deals
          </h2>
          <p className="text-muted-foreground mb-14 max-w-2xl mx-auto text-sm sm:text-base leading-relaxed">
            Explore our handpicked flight offers and enjoy exclusive discounts
            on top destinations around the world. Book now and make your next
            journey unforgettable.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
            {destinations.map(({ city, img, price, url }) => (
              <div
                key={city}
                className="relative group rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300"
              >
                <div
                  className="h-56 bg-cover bg-center group-hover:scale-110 transition-transform duration-500"
                  style={{ backgroundImage: `url(${img})` }}
                ></div>

                <div className="absolute inset-0 bg-black/30 group-hover:bg-black/50 transition-colors duration-300"></div>

                <div
                  className="absolute bottom-4 left-4 text-white z-10"
                  style={{ textAlign: "justify" }}
                >
                  <h3 className="text-2xl font-semibold">{city}</h3>
                  <p className="text-sm opacity-80">Explore deals</p>
                </div>

                <div className="absolute top-4 right-4 bg-white text-primary px-3 py-1 rounded-full text-sm font-medium z-10">
                  {price}
                </div>

                <div className="absolute inset-0 flex justify-center items-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20">
                  <button
                    onClick={() => handleNext(url)}
                    className="px-6 py-3 border border-white text-white rounded-md font-semibold text-lg hover:bg-white hover:text-[#1c448e] transition-colors"
                  >
                    More Info
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section
        ref={tipsRef}
        className={`relative py-20 sm:py-24 px-4 sm:px-8 bg-gradient-to-b from-blue-50 via-white to-blue-100 overflow-hidden transition-all duration-700 ease-out ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      >
        {/* Decorative Elements */}
        <div className="absolute top-0 left-0 w-48 h-48 bg-blue-200/40 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-48 h-48 bg-blue-300/30 rounded-full blur-3xl" />

        <div className="relative z-10 container mx-auto text-center">
          {/* Section Heading */}
          <h2 className="text-3xl sm:text-4xl font-extrabold mb-6 tracking-tight text-[#05304c]">
            Flight Booking Tips
          </h2>
          <p className="text-muted-foreground mb-14 max-w-2xl mx-auto text-sm sm:text-base leading-relaxed">
            Save time and money on your next journey with these expert flight
            booking insights.
          </p>

          {/* Tips Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {tips.map((tip, index) => (
              <div
                key={index}
                className="cursor-pointer group relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 border border-blue-100 hover:-translate-y-2"
              >
                <div className="flex flex-col items-center text-center space-y-4">
                  <div className="bg-blue-100 p-4 rounded-full group-hover:bg-blue-200 transition-colors duration-300">
                    {tip.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-[#05304c]">
                    {tip.title}
                  </h3>
                  <p className="text-[#05304c]/70 text-sm sm:text-base leading-relaxed">
                    {tip.text}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default CheapFlights;
