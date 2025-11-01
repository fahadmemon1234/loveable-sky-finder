import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import heroImage from "/assets/images/hero/hero-flight1.jpg";
import RequestForm from "@/components/requestForm";

const Callback = () => {
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
            Request a Callback
          </h1>
          <p className="text-sm sm:text-base text-white/90 max-w-2xl leading-relaxed">
            Fill out the form below and one of our travel experts will call you
            shortly to assist you with your plans.
          </p>
        </div>
      </section>

      <RequestForm />
      <Footer />
    </div>
  );
};

export default Callback;
