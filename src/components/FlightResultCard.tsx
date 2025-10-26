import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Plane, Clock } from "lucide-react";

interface FlightResultCardProps {
  airline: string;
  from: string;
  to: string;
  departTime: string;
  arriveTime: string;
  duration: string;
  stops: number;
  price: number;
  refundable: boolean;
}

const FlightResultCard = ({
  airline,
  from,
  to,
  departTime,
  arriveTime,
  duration,
  stops,
  price,
  refundable,
}: FlightResultCardProps) => {
  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardContent className="p-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          {/* Flight Info */}
          <div className="flex-1 space-y-4">
            <div className="flex items-center gap-2">
              <Plane className="h-5 w-5 text-primary" />
              <span className="font-semibold text-lg">{airline}</span>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div>
                <div className="text-2xl font-bold">{departTime}</div>
                <div className="text-sm text-muted-foreground">{from}</div>
              </div>
              <div className="flex flex-col items-center justify-center">
                <div className="text-sm text-muted-foreground flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  {duration}
                </div>
                <div className="w-full h-px bg-border my-1"></div>
                <div className="text-xs text-muted-foreground">
                  {stops === 0 ? "Direct" : `${stops} stop${stops > 1 ? "s" : ""}`}
                </div>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold">{arriveTime}</div>
                <div className="text-sm text-muted-foreground">{to}</div>
              </div>
            </div>

            <div className="flex gap-2">
              {refundable ? (
                <Badge variant="secondary">Refundable</Badge>
              ) : (
                <Badge variant="outline">Non-refundable</Badge>
              )}
            </div>
          </div>

          {/* Price and Action */}
          <div className="flex flex-col items-end gap-4 md:border-l md:pl-6">
            <div className="text-right">
              <div className="text-3xl font-bold text-primary">${price}</div>
              <div className="text-sm text-muted-foreground">per person</div>
            </div>
            <Button className="w-full md:w-auto">Select Flight</Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default FlightResultCard;
