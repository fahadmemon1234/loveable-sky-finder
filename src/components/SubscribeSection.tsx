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
    <section
      className={`relative py-24 sm:py-28 px-4 sm:px-8 bg-gradient-to-b from-blue-50 via-white to-blue-100 overflow-hidden transition-all duration-700 ease-out`}
    >
      {/* Background Decoration */}
      <div className="absolute top-0 left-0 w-48 h-48 sm:w-72 sm:h-72 bg-blue-200/40 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-0 w-48 h-48 sm:w-72 sm:h-72 bg-blue-300/30 rounded-full blur-3xl" />

      {/* Main Content */}
      <div className="relative z-10 max-w-3xl mx-auto text-center">
        <h2 className="text-3xl sm:text-4xl font-extrabold text-blue-800 mb-4">
          Subscribe for Latest Deals
        </h2>
        <p className="text-base sm:text-lg text-blue-700/80 mb-8 leading-relaxed">
          Sign up now and get the best holiday and flight deals straight into
          your inbox!
        </p>

        {/* Subscribe Form */}
        <form
          onSubmit={handleSubscribe}
          className="flex flex-col sm:flex-row items-center justify-center bg-white/70 backdrop-blur-md rounded-full p-2 sm:p-3 shadow-xl border border-blue-100 max-w-xl mx-auto"
        >
          <input
            type="email"
            placeholder="Subscribe to our newsletter *"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="flex-1 w-full bg-transparent text-blue-800 placeholder-blue-600/60 outline-none px-4 py-3 sm:py-2 text-sm sm:text-base"
          />
          <button
            type="submit"
            className="bg-blue-700 text-white font-semibold px-6 py-2 sm:py-3 rounded-full mt-3 sm:mt-0 sm:ml-2 w-full sm:w-auto hover:bg-blue-800 transition-all duration-300 text-sm sm:text-base"
          >
            SUBSCRIBE
          </button>
        </form>

        {/* Privacy Info */}
        <p className="text-xs sm:text-sm mt-6 text-blue-700/70 max-w-md mx-auto leading-relaxed">
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
