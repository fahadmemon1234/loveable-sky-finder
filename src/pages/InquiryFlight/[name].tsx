import React from "react";
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
              Book Cheap Flight Tickets to
            </h1>
            <h3
              className="font-medium text-primary-foreground/80"
              style={{ fontSize: "40px" }}
            >
              {name}
            </h3>
          </div>

          <div className="max-w-4xl mx-auto">
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

      <Footer />
    </div>
  );
};

export default InquiryFlight;
