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
      city: "London",
      img: "/assets/images/cardimg/London.jpg",
      price: "$500",
      region: "Europe",
    },
    {
      city: "Paris",
      img: "/assets/images/cardimg/Paris.jpg",
      price: "$600",
      region: "Europe",
    },
    {
      city: "Rome",
      img: "/assets/images/cardimg/Rome.jpg",
      price: "$550",
      region: "Europe",
    },
    {
      city: "New York",
      img: "/assets/images/cardimg/NewYork.jpg",
      price: "$700",
      region: "North America",
    },
    {
      city: "Toronto",
      img: "/assets/images/cardimg/Toronto.jpg",
      price: "$650",
      region: "North America",
    },
    {
      city: "Tokyo",
      img: "/assets/images/cardimg/Tokyo.jpg",
      price: "$800",
      region: "Asia",
    },
    {
      city: "Bangkok",
      img: "/assets/images/cardimg/Bangkok.jpg",
      price: "$400",
      region: "Asia",
    },
    {
      city: "Singapore",
      img: "/assets/images/cardimg/Singapore.jpg",
      price: "$750",
      region: "Asia",
    },
    {
      city: "Sydney",
      img: "/assets/images/cardimg/Sydney.jpg",
      price: "$900",
      region: "Australia",
    },
    {
      city: "Dubai",
      img: "/assets/images/cardimg/Dubai.jpg",
      price: "$450",
      region: "Middle East",
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
            {filteredDestinations.map(({ city, img, price }) => (
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
                  <button className="px-6 py-3 border border-white text-white rounded-md font-semibold text-lg hover:bg-white hover:text-[#1c448e] transition-colors">
                    More Info
                  </button>
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
