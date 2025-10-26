import SupportPageLayout from "@/components/SupportPageLayout";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle2 } from "lucide-react";

const TravelChecklist = () => {
  const checklist = [
    "Valid passport (6+ months validity)",
    "Visa (if required)",
    "Flight tickets and booking confirmations",
    "Travel insurance documents",
    "Credit/debit cards",
    "Emergency contact information",
    "Copies of important documents",
    "Prescribed medications",
    "Phone chargers and adapters",
    "Comfortable travel clothing",
  ];

  return (
    <SupportPageLayout
      title="Travel Preparation Checklist"
      description="Don't forget these essentials before you travel"
    >
      <Card>
        <CardContent className="p-6">
          <div className="space-y-4">
            {checklist.map((item, index) => (
              <div key={index} className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                <span className="text-muted-foreground">{item}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </SupportPageLayout>
  );
};

export default TravelChecklist;
