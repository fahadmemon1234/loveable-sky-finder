import { ReactNode } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";

interface SupportPageLayoutProps {
  title: string;
  description: string;
  children: ReactNode;
}

const SupportPageLayout = ({ title, description, children }: SupportPageLayoutProps) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1">
        <section className="bg-gradient-to-br from-primary to-primary/80 text-primary-foreground py-16 px-4">
          <div className="container mx-auto text-center">
            <h1 className="text-4xl font-bold mb-4">{title}</h1>
            <p className="text-lg max-w-2xl mx-auto text-primary-foreground/90">{description}</p>
          </div>
        </section>

        <section className="py-16 px-4">
          <div className="container mx-auto max-w-4xl">
            {children}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default SupportPageLayout;
