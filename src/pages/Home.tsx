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

import { FaThumbsUp, FaCheck } from "react-icons/fa";
import { PiCurrencyGbpBold } from "react-icons/pi";
import { IoIosUnlock } from "react-icons/io";
import { MdOutlineFlightTakeoff } from "react-icons/md";

const Home = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      {/* Hero Section */}
      <section
        className="relative bg-gradient-to-br from-primary to-primary/80 text-primary-foreground py-20 md:py-28 px-4 overflow-hidden"
        aria-label="Visa services hero section"
      >
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center opacity-30"
          style={{ backgroundImage: `url(${heroImage})` }}
        ></div>

        {/* Overlay for better text visibility */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/90 to-primary/70"></div>

        {/* Main Content */}
        <div className="relative z-10 container mx-auto">
          <div className="max-w-3xl mx-auto text-center mb-12">
            {/* Headline */}
            <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
              Book Your Dream Flight Today
            </h1>

            {/* Subtext / Value Proposition */}
            <p className="text-lg md:text-xl text-primary-foreground/90 mb-8">
              Find the best deals on international and domestic flights with
              Loveable Travel. Enjoy flexible bookings, top airlines, and
              exclusive offers to make your journey stress-free.
            </p>

            {/* CTA Button */}
            <button
              className="bg-secondary hover:bg-secondary/90 text-secondary-foreground font-semibold px-8 py-3 rounded-lg shadow-lg transition-all duration-200"
              onClick={() =>
                window.scrollTo({
                  top: document.body.scrollHeight,
                  behavior: "smooth",
                })
              }
            >
              Book Free Consultation
            </button>
          </div>

          {/* Optional: You can replace <FlightSearchForm /> with a simple Visa Inquiry Form */}
          <div className="max-w-4xl mx-auto mt-10">
            <FlightSearchForm />
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 px-4 bg-[#f4fdff]">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-bold mb-12">Our Services</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-8">
            {/* Cheap Prices */}
            <div className="text-center space-y-4 p-6 bg-white rounded-2xl shadow-md hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                <FaThumbsUp className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold">Great choice</h3>
              <p className="text-sm text-muted-foreground">
                We offer widest choice of airfares, hotels & holiday packages.
              </p>
            </div>

            {/* Simple Way to Book */}
            <div className="text-center space-y-4 p-6 bg-white rounded-2xl shadow-md hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                <PiCurrencyGbpBold className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold">Low prices</h3>
              <p className="text-sm text-muted-foreground">
                Best price guaranteed, more savings.
              </p>
            </div>

            {/* Dedicated Customer Support */}
            <div className="text-center space-y-4 p-6 bg-white rounded-2xl shadow-md hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                <FaCheck className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold">Flexible payment</h3>
              <p className="text-sm text-muted-foreground">
                To facilitate our customers the bookings are made on minor
                initial deposit.
              </p>
            </div>

            {/* Financial Protection */}
            <div className="text-center space-y-4 p-6 bg-white rounded-2xl shadow-md hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                <IoIosUnlock className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold">Secure Buy</h3>
              <p className="text-sm text-muted-foreground">
                Get your tickets first, Pay after the confirmation by the
                airline.
              </p>
            </div>

            <div className="text-center space-y-4 p-6 bg-white rounded-2xl shadow-md hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                <MdOutlineFlightTakeoff className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold">Flight Installment Plan</h3>
              <p className="text-sm text-muted-foreground">
                Book your flight with easy monthly installments at 0% interest.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Popular Destinations */}
      <section className="py-20 px-6 bg-gradient-to-b from-secondary/10 to-secondary/30">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-bold mb-10 tracking-tight">
            Popular Destinations
          </h2>
          <p className="text-muted-foreground mb-12 max-w-2xl mx-auto">
            Discover top travel spots around the world and find your next
            adventure.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
            {[
              {
                city: "Manila, Philippines",
                img: "/assets/images/cardimg/Manila.jpg",
                price: "£437",
              },
              {
                city: "Lagos, Nigeria",
                img: "/assets/images/cardimg/Nigeria.jpg",
                price: "£390",
              },
              {
                city: "Accra, Ghana",
                img: "/assets/images/cardimg/Ghana.jpg",
                price: "£401",
              },
              {
                city: "Harare, Zimbabwe",
                img: "/assets/images/cardimg/Zimbabwe.jpg",
                price: "£457",
              },
            ].map(({ city, img, price }) => (
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
                    Book Now
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

export default Home;
