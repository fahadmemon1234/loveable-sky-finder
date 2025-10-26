import { useSearchParams } from "react-router-dom";
import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FlightResultCard from "@/components/FlightResultCard";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";

const mockFlights = [
  {
    id: 1,
    airline: "British Airways",
    from: "London",
    to: "New York",
    departTime: "10:00",
    arriveTime: "14:30",
    duration: "7h 30m",
    stops: 0,
    price: 450,
    refundable: true,
  },
  {
    id: 2,
    airline: "Emirates",
    from: "London",
    to: "New York",
    departTime: "14:00",
    arriveTime: "19:45",
    duration: "8h 45m",
    stops: 1,
    price: 380,
    refundable: false,
  },
  {
    id: 3,
    airline: "Delta Airlines",
    from: "London",
    to: "New York",
    departTime: "08:30",
    arriveTime: "13:00",
    duration: "7h 30m",
    stops: 0,
    price: 520,
    refundable: true,
  },
];

const Flights = () => {
  const [searchParams] = useSearchParams();
  const [sortBy, setSortBy] = useState("price");
  const [directOnly, setDirectOnly] = useState(false);

  const from = searchParams.get("from") || "London";
  const to = searchParams.get("to") || "New York";
  const departDate = searchParams.get("departDate");
  const returnDate = searchParams.get("returnDate");
  const adults = searchParams.get("adults") || "1";
  const flightClass = searchParams.get("class") || "economy";

  const filteredFlights = mockFlights.filter((flight) => {
    if (directOnly && flight.stops > 0) return false;
    return true;
  });

  const sortedFlights = [...filteredFlights].sort((a, b) => {
    if (sortBy === "price") return a.price - b.price;
    if (sortBy === "duration") return parseFloat(a.duration) - parseFloat(b.duration);
    return 0;
  });

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1 container mx-auto px-4 py-8">
        {/* Search Summary */}
        <Card className="mb-8">
          <CardContent className="p-6">
            <div className="flex flex-wrap items-center gap-4 text-sm">
              <div>
                <span className="font-semibold">{from}</span> → <span className="font-semibold">{to}</span>
              </div>
              <Separator orientation="vertical" className="h-4" />
              <div>{departDate}</div>
              {returnDate && (
                <>
                  <Separator orientation="vertical" className="h-4" />
                  <div>Return: {returnDate}</div>
                </>
              )}
              <Separator orientation="vertical" className="h-4" />
              <div>{adults} Adult(s)</div>
              <Separator orientation="vertical" className="h-4" />
              <div className="capitalize">{flightClass}</div>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <aside className="space-y-6">
            <Card>
              <CardContent className="p-6 space-y-4">
                <h3 className="font-semibold text-lg">Filters</h3>
                
                <div className="space-y-3">
                  <Label className="text-base">Stops</Label>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="direct"
                      checked={directOnly}
                      onCheckedChange={(checked) => setDirectOnly(checked as boolean)}
                    />
                    <Label htmlFor="direct" className="cursor-pointer font-normal">
                      Direct flights only
                    </Label>
                  </div>
                </div>

                <Separator />

                <div className="space-y-3">
                  <Label htmlFor="sort" className="text-base">Sort By</Label>
                  <Select value={sortBy} onValueChange={setSortBy}>
                    <SelectTrigger id="sort">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="price">Price: Low to High</SelectItem>
                      <SelectItem value="duration">Duration: Short to Long</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>
          </aside>

          {/* Results */}
          <div className="md:col-span-3 space-y-4">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold">{sortedFlights.length} Flights Found</h2>
            </div>

            {sortedFlights.length > 0 ? (
              sortedFlights.map((flight) => (
                <FlightResultCard
                  key={flight.id}
                  airline={flight.airline}
                  from={flight.from}
                  to={flight.to}
                  departTime={flight.departTime}
                  arriveTime={flight.arriveTime}
                  duration={flight.duration}
                  stops={flight.stops}
                  price={flight.price}
                  refundable={flight.refundable}
                />
              ))
            ) : (
              <Card>
                <CardContent className="p-12 text-center">
                  <p className="text-muted-foreground">No flights found matching your criteria.</p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Flights;
