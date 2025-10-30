import { useState, useEffect } from "react";
import FlightSearchForm from "./FlightSearchForm";

const HeroSection = () => {
  const slides = [
    {
      title: "Book Your Dream Flight Today",
      text: "Find the best deals on international and domestic flights with Loveable Travel. Enjoy flexible bookings, trusted airlines, and exclusive offers that make your journey smooth and memorable.",
      primaryBtn: "Book Free Consultation",
      secondaryBtn: "Explore Flight Deals",
      img: "/assets/images/hero/hero-flight.jpg",
    },
    {
      title: "Discover Amazing Travel Deals",
      text: "Unlock affordable international and local travel options. Enjoy unbeatable prices, premium comfort, and 24/7 support with Loveable Travel.",
      primaryBtn: "View Packages",
      secondaryBtn: "Get Price Quote",
      img: "/assets/images/hero/hero-flight1.jpg",
    },
    {
      title: "Plan Your Next Adventure Now",
      text: "From scenic getaways to business trips, Loveable Travel makes your flight booking fast, reliable, and affordable.",
      primaryBtn: "Start Planning",
      secondaryBtn: "Contact Us",
      img: "/assets/images/hero/hero-flight2.webp",
    },
  ];

  const [index, setIndex] = useState(0);
  const [fade, setFade] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        setIndex((prev) => (prev + 1) % slides.length);
        setFade(true);
      }, 500);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const slide = slides[index];

  return (
    <section
      className="relative bg-gradient-to-br from-primary/70 to-primary/50 text-primary-foreground py-20 md:py-32 px-4 sm:px-6 overflow-hidden"
      aria-label="Visa services hero section"
    >
      {/* Background Image */}
      <div
        className={`absolute inset-0 bg-cover bg-center transition-opacity duration-700 ${
          fade ? "opacity-40" : "opacity-0"
        }`}
        style={{ backgroundImage: `url(${slide.img})` }}
      ></div>

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/60 via-primary/40 to-primary/30"></div>

      {/* Decorative lights */}
      <div className="absolute -top-10 -right-10 w-52 sm:w-72 h-52 sm:h-72 bg-white/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-60 sm:w-80 h-60 sm:h-80 bg-white/10 rounded-full blur-3xl"></div>

      {/* Main Content */}
      <div className="relative z-10 container mx-auto">
        <div
          className={`text-center max-w-4xl mx-auto mb-12 px-4 sm:px-0 transition-opacity duration-700 ${
            fade ? "opacity-100" : "opacity-0"
          }`}
        >
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold mb-5 leading-tight tracking-tight drop-shadow-sm">
            {slide.title.split(" ").map((word, i) =>
              word === "Dream Flight" || word === "Flight" ? (
                <span key={i} className="text-secondary">
                  {word}{" "}
                </span>
              ) : (
                <span key={i}>{word} </span>
              )
            )}
          </h1>

          <p className="text-base sm:text-lg md:text-xl text-primary-foreground/90 leading-relaxed mb-8 sm:mb-10">
            {slide.text}
          </p>

          <div className="flex flex-col sm:flex-row justify-center items-center gap-4 flex-wrap">
            <button
              className="bg-secondary hover:bg-secondary/90 text-secondary-foreground font-semibold px-8 sm:px-10 py-3 sm:py-4 rounded-full shadow-lg transition-all duration-300 hover:scale-105 min-w-[200px]"
              onClick={() =>
                window.scrollTo({
                  top: document.body.scrollHeight,
                  behavior: "smooth",
                })
              }
            >
              {slide.primaryBtn}
            </button>

            <button className="border-2 border-secondary text-secondary hover:bg-secondary hover:text-secondary-foreground font-semibold px-8 sm:px-10 py-3 sm:py-4 rounded-full shadow-lg transition-all duration-300 hover:scale-105 min-w-[200px]">
              {slide.secondaryBtn}
            </button>
          </div>
        </div>

        <div className="max-w-5xl mx-auto mt-12 sm:mt-16 px-4 sm:px-0">
          <FlightSearchForm />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
