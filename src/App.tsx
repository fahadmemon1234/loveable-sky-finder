import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Flights from "./pages/Flights";
import About from "./pages/About";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";

// Support Pages
import TravelTips from "./pages/support/TravelTips";
import PrivacyPolicy from "./pages/support/PrivacyPolicy";
import EnquiryForm from "./pages/support/EnquiryForm";
import FAQs from "./pages/support/FAQs";
import PassportsVisas from "./pages/support/PassportsVisas";
import TravelersHealth from "./pages/support/TravelersHealth";
import TravelChecklist from "./pages/support/TravelChecklist";
import MakePayment from "./pages/support/MakePayment";

// Company Pages
import CompanyAboutUs from "./pages/company/AboutUs";
import CompanyContactUs from "./pages/company/ContactUs";
import BookmarkUs from "./pages/company/BookmarkUs";
import SiteMap from "./pages/company/SiteMap";
import DisclaimerPolicy from "./pages/company/DisclaimerPolicy";
import TermsOfUse from "./pages/company/TermsOfUse";
import BusinessPartners from "./pages/company/BusinessPartners";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* Main Pages */}
          <Route path="/" element={<Home />} />
          <Route path="/flights" element={<Flights />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          
          {/* Support Pages */}
          <Route path="/support/travel-tips" element={<TravelTips />} />
          <Route path="/support/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/support/enquiry-form" element={<EnquiryForm />} />
          <Route path="/support/faqs" element={<FAQs />} />
          <Route path="/support/passports-visas" element={<PassportsVisas />} />
          <Route path="/support/travelers-health" element={<TravelersHealth />} />
          <Route path="/support/travel-checklist" element={<TravelChecklist />} />
          <Route path="/support/make-payment" element={<MakePayment />} />
          
          {/* Company Pages */}
          <Route path="/company/about-us" element={<CompanyAboutUs />} />
          <Route path="/company/contact-us" element={<CompanyContactUs />} />
          <Route path="/company/bookmark-us" element={<BookmarkUs />} />
          <Route path="/company/site-map" element={<SiteMap />} />
          <Route path="/company/disclaimer-policy" element={<DisclaimerPolicy />} />
          <Route path="/company/terms-of-use" element={<TermsOfUse />} />
          <Route path="/company/business-partners" element={<BusinessPartners />} />
          
          {/* 404 Page */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
