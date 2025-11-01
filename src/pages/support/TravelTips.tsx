import SupportPageLayout from "@/components/SupportPageLayout";
import { Card, CardContent } from "@/components/ui/card";

const TravelTips = () => {
  const tips = [
    {
      title: "Book Early",
      content:
        "Booking flights 2-3 months in advance often gets you the best deals.",
    },
    {
      title: "Be Flexible",
      content:
        "Flying on weekdays or during off-peak hours can save you money.",
    },
    {
      title: "Pack Smart",
      content: "Check baggage restrictions and pack light to avoid extra fees.",
    },
    {
      title: "Travel Insurance",
      content: "Always consider travel insurance for peace of mind.",
    },
  ];

  return (
    <SupportPageLayout
      title="Travel Tips & Guides"
      description="Expert advice to help you travel smarter"
    >
      <div className="space-y-6">
        {tips.map((tip, index) => (
          <Card key={index}>
            <CardContent className="p-6">
              <h3 className="text-xl font-semibold mb-2">{tip.title}</h3>
              <p className="text-muted-foreground">{tip.content}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </SupportPageLayout>
  );
};

export default TravelTips;
