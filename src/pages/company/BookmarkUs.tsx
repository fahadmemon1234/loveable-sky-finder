import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Bookmark, Globe } from "lucide-react";

const BookmarkUs = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1">
        <section className="bg-gradient-to-br from-primary to-primary/80 text-primary-foreground py-16 px-4">
          <div className="container mx-auto text-center">
            <h1 className="text-4xl font-bold mb-4">Bookmark Us</h1>
            <p className="text-lg max-w-2xl mx-auto text-primary-foreground/90">
              Save Loveable Travel for quick and easy access
            </p>
          </div>
        </section>

        <section className="py-16 px-4">
          <div className="container mx-auto max-w-4xl">
            <Card className="mb-8">
              <CardContent className="p-8 text-center">
                <Bookmark className="h-16 w-16 text-primary mx-auto mb-4" />
                <h2 className="text-2xl font-bold mb-4">Why Bookmark Us?</h2>
                <p className="text-muted-foreground">
                  Save time by bookmarking Loveable Travel. Get instant access to the best flight deals
                  whenever you need them!
                </p>
              </CardContent>
            </Card>

            <div className="space-y-6">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <Globe className="h-8 w-8 text-primary flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold text-lg mb-2">Google Chrome</h3>
                      <p className="text-muted-foreground text-sm">
                        Press <kbd className="px-2 py-1 bg-muted rounded">Ctrl+D</kbd> (Windows) or{" "}
                        <kbd className="px-2 py-1 bg-muted rounded">Cmd+D</kbd> (Mac)
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <Globe className="h-8 w-8 text-primary flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold text-lg mb-2">Mozilla Firefox</h3>
                      <p className="text-muted-foreground text-sm">
                        Press <kbd className="px-2 py-1 bg-muted rounded">Ctrl+D</kbd> (Windows) or{" "}
                        <kbd className="px-2 py-1 bg-muted rounded">Cmd+D</kbd> (Mac)
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <Globe className="h-8 w-8 text-primary flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold text-lg mb-2">Safari</h3>
                      <p className="text-muted-foreground text-sm">
                        Press <kbd className="px-2 py-1 bg-muted rounded">Cmd+D</kbd>
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default BookmarkUs;
