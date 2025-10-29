import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FlightSearchForm from "@/components/FlightSearchForm";
import heroImage from "@/assets/hero-flight.jpg";
import {
  FaGlobe,
  FaMapMarkedAlt,
  FaHotel,
  FaPlaneDeparture,
  FaUsers,
} from "react-icons/fa";
import { url } from "inspector";

const CheapFlights = () => {
  const regions = [
    "Asia",
    "Africa",
    "Europe",
    "Australia",
    "Oceania",
    "North America",
    "Middle East",
  ];
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

  const regionsData = regions.map((region) => ({
    name: region,
    count: destinations.filter((d) => d.region === region).length,
  }));

  const [selectedRegion, setSelectedRegion] = useState<string>("All");
  const allCount = regionsData.reduce((acc, r) => acc + r.count, 0);

  const filteredDestinations =
    selectedRegion === "All"
      ? destinations
      : destinations.filter((d) => d.region === selectedRegion);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary to-primary/80 text-primary-foreground py-20 px-4 overflow-hidden">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center opacity-30"
          style={{ backgroundImage: `url(${heroImage})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-primary/90 to-primary/70" />

        <div className="container mx-auto relative z-10">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Book Your Dream Flight Today
            </h1>
            <p className="text-lg font-medium text-primary-foreground/80">
              Hello Passenger. Where do you want to go?
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <FlightSearchForm />
          </div>
        </div>
      </section>

      {/* Select your Region */}

      <section className="py-12 px-4 bg-[#f4fdff]">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-8">Select Your Region</h2>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-8 gap-3">
            {/* All Option */}
            <div
              onClick={() => setSelectedRegion("All")}
              className={`rounded-xl shadow-sm p-3 flex flex-col items-center justify-center cursor-pointer transition transform hover:-translate-y-0.5 hover:shadow-md ${
                selectedRegion === "All"
                  ? "bg-primary text-white border border-primary"
                  : "bg-white text-primary border border-gray-200"
              }`}
            >
              <h3 className="text-lg font-semibold mb-1">All</h3>
              <p
                className={`text-xs ${
                  selectedRegion === "All"
                    ? "text-white/80"
                    : "text-muted-foreground"
                }`}
              >
                {allCount} Destinations
              </p>
            </div>

            {regionsData.map(({ name, count }) => (
              <div
                key={name}
                onClick={() => setSelectedRegion(name)}
                className={`rounded-xl shadow-sm p-3 flex flex-col items-center justify-center cursor-pointer transition transform hover:-translate-y-0.5 hover:shadow-md ${
                  selectedRegion === name
                    ? "bg-primary text-white border border-primary"
                    : "bg-white text-primary border border-gray-200"
                }`}
              >
                <h3 className="text-md font-semibold mb-1">{name}</h3>
                <p
                  className={`text-xs ${
                    selectedRegion === name
                      ? "text-white/80"
                      : "text-muted-foreground"
                  }`}
                >
                  {count} Destinations
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Filtered Destinations */}
      <section className="py-20 px-6 bg-gradient-to-b from-secondary/10 to-secondary/30">
        <div className="container mx-auto text-center">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
            {filteredDestinations.map(({ city, img, price, url }) => (
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
                  <a href={url} className="px-6 py-3 border border-white text-white rounded-md font-semibold text-lg hover:bg-white hover:text-[#1c448e] transition-colors">
                    More Info
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Travel Stats Section */}
      <section className="py-20 px-6 bg-[#f4fdff]">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-bold mb-12">Our Achievements</h2>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-8 text-center">
            <div className="space-y-2 flex flex-col items-center">
              <FaGlobe className="text-4xl text-[#1c448e]" />
              <h3 className="text-3xl font-bold text-[#1c448e]">95+</h3>
              <p className="text-sm font-medium">
                Countries <br /> Connected
              </p>
            </div>

            <div className="space-y-2 flex flex-col items-center">
              <FaMapMarkedAlt className="text-4xl text-[#1c448e]" />
              <h3 className="text-3xl font-bold text-[#1c448e]">89+</h3>
              <p className="text-sm font-medium">
                Tour <br /> Places
              </p>
            </div>

            <div className="space-y-2 flex flex-col items-center">
              <FaHotel className="text-4xl text-[#1c448e]" />
              <h3 className="text-3xl font-bold text-[#1c448e]">250+</h3>
              <p className="text-sm font-medium">
                Hotel <br /> Accommodation
              </p>
            </div>

            <div className="space-y-2 flex flex-col items-center">
              <FaPlaneDeparture className="text-4xl text-[#1c448e]" />
              <h3 className="text-3xl font-bold text-[#1c448e]">2400+</h3>
              <p className="text-sm font-medium">
                Daily <br /> Flights
              </p>
            </div>

            <div className="space-y-2 flex flex-col items-center">
              <FaUsers className="text-4xl text-[#1c448e]" />
              <h3 className="text-3xl font-bold text-[#1c448e]">Unlimited</h3>
              <p className="text-sm font-medium">
                Passenger <br /> Travel
              </p>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default CheapFlights;
