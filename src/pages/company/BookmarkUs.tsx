import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Bookmark, Globe } from "lucide-react";

const BookmarkUs = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <section className="bg-gradient-to-br from-primary to-primary/80 text-primary-foreground py-16 px-4">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl font-bold mb-4">Bookmark Us</h1>
          <p className="text-lg max-w-2xl mx-auto text-primary-foreground/90">
            Save Loveable Travel for quick and easy access
          </p>
        </div>
      </section>

      <section className="py-20 px-4 bg-gradient-to-b from-blue-50 via-white to-blue-100">
        <div className="container mx-auto max-w-4xl">
          {/* Hero Card */}
          <Card className="mb-12 bg-white/80 backdrop-blur-md shadow-xl border border-blue-200/40 rounded-3xl">
            <CardContent className="p-10 text-center">
              <Bookmark className="h-20 w-20 text-primary mx-auto mb-6 drop-shadow-lg" />
              <h2 className="text-3xl md:text-4xl font-extrabold mb-4 text-primary drop-shadow-md">
                Why Bookmark Us?
              </h2>
              <p className="text-muted-foreground text-lg md:text-xl leading-relaxed">
                Save time by bookmarking Loveable Travel. Get instant access to
                the best flight deals whenever you need them!
              </p>
            </CardContent>
          </Card>

          {/* Browsers Info Cards */}
          <div className="space-y-6">
            {[
              { name: "Google Chrome", shortcut: "Ctrl+D / Cmd+D" },
              { name: "Mozilla Firefox", shortcut: "Ctrl+D / Cmd+D" },
              { name: "Safari", shortcut: "Cmd+D" },
            ].map((browser, idx) => (
              <Card
                key={idx}
                className="bg-white/70 backdrop-blur-md rounded-2xl shadow-lg border border-blue-200/40 hover:scale-105 hover:shadow-2xl transition-transform"
              >
                <CardContent className="p-6 flex items-start gap-4">
                  <Globe className="h-8 w-8 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold text-lg mb-2 text-primary">
                      {browser.name}
                    </h3>
                    <p className="text-muted-foreground text-sm">
                      Press{" "}
                      {browser.shortcut.split("/").map((s, i) => (
                        <kbd
                          key={i}
                          className="px-2 py-1 bg-muted rounded mx-1 inline-block"
                        >
                          {s.trim()}
                        </kbd>
                      ))}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default BookmarkUs;
