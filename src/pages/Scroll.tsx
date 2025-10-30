import { useState, useEffect } from "react";
import { ArrowUp } from "lucide-react";

const ScrollToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  // Show button when scrolling down
  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <button
      onClick={scrollToTop}
      className={`fixed bottom-6 right-6 z-50 flex items-center justify-center
        w-12 h-12 rounded-full shadow-lg transition-all duration-300
        bg-gradient-to-br from-amber-400 via-yellow-500 to-amber-600
        text-white hover:from-yellow-500 hover:to-amber-500
        hover:shadow-[0_0_15px_rgba(255,193,7,0.6)]
        transform hover:scale-110 active:scale-95
        ${isVisible ? "opacity-100 visible" : "opacity-0 invisible"}
      `}
      aria-label="Scroll to top"
    >
      <ArrowUp className="w-6 h-6 animate-pulse" />
    </button>
  );
};

export default ScrollToTopButton;
