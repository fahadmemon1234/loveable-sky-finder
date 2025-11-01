import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import FlightSearchForm from "./FlightSearchForm";

// const HeroSection = () => {
//   const slides = [
//     {
//       title: "Book Your Dream Flight Today",
//       text: "Find the best deals on international and domestic flights with Loveable Travel. Enjoy flexible bookings, trusted airlines, and exclusive offers that make your journey smooth and memorable.",
//       primaryBtn: "Book Free Consultation",
//       secondaryBtn: "Explore Flight Deals",
//       img: "/assets/images/hero/hero-flight.jpg",
//     },
//     {
//       title: "Discover Amazing Travel Deals",
//       text: "Unlock affordable international and local travel options. Enjoy unbeatable prices, premium comfort, and 24/7 support with Loveable Travel.",
//       primaryBtn: "View Packages",
//       secondaryBtn: "Get Price Quote",
//       img: "/assets/images/hero/hero-flight1.jpg",
//     },
//     {
//       title: "Plan Your Next Adventure Now",
//       text: "From scenic getaways to business trips, Loveable Travel makes your flight booking fast, reliable, and affordable.",
//       primaryBtn: "Start Planning",
//       secondaryBtn: "Contact Us",
//       img: "/assets/images/hero/hero-flight2.webp",
//     },
//   ];

//   const [index, setIndex] = useState(0);
//   const [fade, setFade] = useState(true);

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setFade(false);
//       setTimeout(() => {
//         setIndex((prev) => (prev + 1) % slides.length);
//         setFade(true);
//       }, 500);
//     }, 5000);
//     return () => clearInterval(interval);
//   }, []);

//   const slide = slides[index];

//   return (
//     <section
//       className="relative bg-gradient-to-br from-primary/70 to-primary/50 text-primary-foreground py-20 md:py-32 px-4 sm:px-6 overflow-hidden"
//       aria-label="Visa services hero section"
//     >
//       {/* Background Image */}
//       <div
//         className={`absolute inset-0 bg-cover bg-center transition-opacity duration-700 ${
//           fade ? "opacity-40" : "opacity-0"
//         }`}
//         style={{ backgroundImage: `url(${slide.img})` }}
//       ></div>

//       {/* Overlay */}
//       <div className="absolute inset-0 bg-gradient-to-br from-primary/60 via-primary/40 to-primary/30"></div>

//       {/* Decorative lights */}
//       <div className="absolute -top-10 -right-10 w-52 sm:w-72 h-52 sm:h-72 bg-white/10 rounded-full blur-3xl"></div>
//       <div className="absolute bottom-0 left-0 w-60 sm:w-80 h-60 sm:h-80 bg-white/10 rounded-full blur-3xl"></div>

//       {/* Main Content */}
//       <div className="relative z-10 container mx-auto">
//         <div
//           className={`text-center max-w-4xl mx-auto mb-12 px-4 sm:px-0 transition-opacity duration-700 ${
//             fade ? "opacity-100" : "opacity-0"
//           }`}
//         >
//           <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold mb-5 leading-tight tracking-tight drop-shadow-sm">
//             {slide.title.split(" ").map((word, i) =>
//               word === "Dream Flight" || word === "Flight" ? (
//                 <span key={i} className="text-secondary">
//                   {word}{" "}
//                 </span>
//               ) : (
//                 <span key={i}>{word} </span>
//               )
//             )}
//           </h1>

//           <p className="text-base sm:text-lg md:text-xl text-primary-foreground/90 leading-relaxed mb-8 sm:mb-10">
//             {slide.text}
//           </p>

//           <div className="flex flex-col sm:flex-row justify-center items-center gap-4 flex-wrap">
//             <button
//               className="bg-secondary hover:bg-secondary/90 text-secondary-foreground font-semibold px-8 sm:px-10 py-3 sm:py-4 rounded-full shadow-lg transition-all duration-300 hover:scale-105 min-w-[200px]"
//               onClick={() =>
//                 window.scrollTo({
//                   top: document.body.scrollHeight,
//                   behavior: "smooth",
//                 })
//               }
//             >
//               {slide.primaryBtn}
//             </button>

//             <button className="border-2 border-secondary text-secondary hover:bg-secondary hover:text-secondary-foreground font-semibold px-8 sm:px-10 py-3 sm:py-4 rounded-full shadow-lg transition-all duration-300 hover:scale-105 min-w-[200px]">
//               {slide.secondaryBtn}
//             </button>
//           </div>
//         </div>

//         <div className="max-w-5xl mx-auto mt-12 sm:mt-16 px-4 sm:px-0">
//           <FlightSearchForm />
//         </div>
//       </div>
//     </section>
//   );
// };

// export default HeroSection;

const HeroSection = () => {
  const slides = [
    {
      img: "/assets/images/hero/hero-flight.jpg",
      title: "Fly Beyond Ordinary",
      text: "Book flights to top destinations worldwide with unbeatable fares and personalized travel options made just for you.",
      btn: "Book Your Flight",
    },
    {
      img: "/assets/images/hero/hero-flight1.jpg",
      title: "Adventure Awaits Everywhere",
      text: "From mountain escapes to city lights, discover experiences that turn every journey into a story worth sharing.",
      btn: "Start Exploring",
    },
    {
      img: "/assets/images/hero/hero-flight2.webp",
      title: "Seamless Travel, Every Time",
      text: "Enjoy easy booking, trusted airlines, and 24/7 support that make traveling simpler, safer, and more rewarding.",
      btn: "Plan Your Trip",
    },
  ];

  const [index, setIndex] = useState(0);
  const [fade, setFade] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => handleNext(), 6000);
    return () => clearInterval(interval);
  }, [index]); // include index to re-sync animation timing

  const handleNext = () => {
    setFade(false);
    setTimeout(() => {
      setIndex((prev) => (prev + 1) % slides.length);
      setFade(true);
    }, 300);
  };

  const handlePrev = () => {
    setFade(false);
    setTimeout(() => {
      setIndex((prev) => (prev - 1 + slides.length) % slides.length);
      setFade(true);
    }, 300);
  };

  const slide = slides[index];

  return (
    <section className="relative w-full min-h-[70vh] sm:min-h-[75vh] md:h-[70vh] overflow-hidden flex items-center justify-center pt-20 sm:pt-24 md:pt-0">
      {/* Background Image with Overlay */}
      <div
        className={`absolute inset-0 bg-cover bg-center transition-opacity duration-700 ease-in-out ${
          fade ? "opacity-100" : "opacity-0"
        }`}
        style={{ backgroundImage: `url(${slide.img})` }}
      >
        <div className="absolute inset-0 bg-black/50" />
      </div>

      {/* Text Content */}
      <div className="relative z-10 text-center text-white px-4 sm:px-8 mt-0 md:mt-6 sm:mt-0">
        <h1 className="text-2xl sm:text-4xl md:text-6xl font-extrabold mb-3 sm:mb-4 drop-shadow-lg leading-tight">
          {slide.title}
        </h1>
        <p className="text-sm sm:text-base md:text-xl max-w-xl sm:max-w-2xl mx-auto mb-6 sm:mb-8 leading-relaxed text-white/90">
          {slide.text}
        </p>
        <button className="bg-white text-[#05304c] font-bold px-6 py-2 sm:px-10 sm:py-4 rounded-full shadow-md hover:bg-blue-100 transition-all duration-300 text-sm sm:text-base">
          {slide.btn}
        </button>
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={handlePrev}
        aria-label="Previous slide"
        className="hidden md:block absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white p-2 sm:p-3 rounded-full transition-all duration-300 z-20"
      >
        <ChevronLeft size={28} />
      </button>
      <button
        onClick={handleNext}
        aria-label="Next slide"
        className="hidden md:block absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white p-2 sm:p-3 rounded-full transition-all duration-300 z-20"
      >
        <ChevronRight size={28} />
      </button>

      {/* Dots Navigation */}
      <div className="hidden md:flex absolute bottom-6 left-1/2 -translate-x-1/2 gap-3 z-20">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              i === index
                ? "bg-white scale-110"
                : "bg-white/50 hover:bg-white/80"
            }`}
          />
        ))}
      </div>
    </section>
  );
};

export default HeroSection;
