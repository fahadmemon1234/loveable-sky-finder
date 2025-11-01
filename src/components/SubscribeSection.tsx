import { useState } from "react";
import Swal from "sweetalert2";

const SubscribeSection = () => {
  const [email, setEmail] = useState("");

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email) {
      Swal.fire({
        icon: "error",
        position: "center",
        title: "Please enter your email address.",
      });
      return;
    }

    Swal.fire({
      icon: "success",
      position: "center",
      title: "You have successfully subscribed to our newsletter.",
    });
    setEmail("");
  };

  return (
    <section className="relative w-full py-20 sm:py-24 lg:py-28 px-4 sm:px-8 bg-gradient-to-b from-blue-50 via-white to-blue-100 overflow-hidden transition-all duration-700 ease-out">
      {/* Background Decorations */}
      <div className="absolute top-0 left-0 w-40 h-40 sm:w-64 sm:h-64 bg-blue-200/40 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-0 w-40 h-40 sm:w-64 sm:h-64 bg-blue-300/30 rounded-full blur-3xl" />

      {/* Main Content */}
      <div className="relative z-10 max-w-3xl mx-auto text-center px-2 sm:px-0">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-blue-800 mb-4 leading-tight">
          Subscribe for Latest Deals
        </h2>
        <p className="text-sm sm:text-base lg:text-lg text-blue-700/80 mb-8 sm:mb-10 leading-relaxed max-w-2xl mx-auto">
          Sign up now and get the best holiday and flight deals straight into
          your inbox!
        </p>

        {/* Subscribe Form */}
        <form
          onSubmit={handleSubscribe}
          className="flex flex-col sm:flex-row items-center justify-between bg-white/80 backdrop-blur-lg rounded-full shadow-lg border border-blue-100 p-2 sm:p-3 max-w-xl mx-auto space-y-3 sm:space-y-0"
        >
          <input
            type="email"
            placeholder="Subscribe to our newsletter *"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="flex-1 w-full bg-transparent text-blue-800 placeholder-blue-600/70 outline-none px-4 py-3 text-sm sm:text-base"
          />
          <button
            type="submit"
            className="bg-blue-700 text-white font-semibold px-8 py-3 sm:py-2 rounded-full hover:bg-blue-800 transition-all duration-300 w-full sm:w-auto text-sm sm:text-base"
          >
            SUBSCRIBE
          </button>
        </form>

        {/* Privacy Info */}
        <p className="text-xs sm:text-sm mt-6 sm:mt-8 text-blue-700/70 max-w-md mx-auto leading-relaxed">
          Your privacy is important to us, so we’ll never spam you or share your
          info with third parties. Take a look at our{" "}
          <a
            href="/support/privacy-policy"
            className="underline font-medium hover:text-blue-800"
          >
            Privacy Policy
          </a>
          .
        </p>
      </div>
    </section>
  );
};

export default SubscribeSection;
