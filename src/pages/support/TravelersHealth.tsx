import SupportPageLayout from "@/components/SupportPageLayout";
import { Card, CardContent } from "@/components/ui/card";

const TravelersHealth = () => {
  return (
    <SupportPageLayout
      title="Traveler's Health"
      description="Stay healthy during your travels"
    >
      <div className="space-y-6">
        <Card>
          <CardContent className="p-6">
            <h3 className="text-xl font-semibold mb-4">Before You Travel</h3>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground">
              <li>Consult your doctor about required vaccinations</li>
              <li>Pack a basic medical kit</li>
              <li>Bring copies of prescriptions</li>
              <li>Research medical facilities at your destination</li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <h3 className="text-xl font-semibold mb-4">During Travel</h3>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground">
              <li>Stay hydrated, especially on flights</li>
              <li>Wash hands frequently</li>
              <li>Be cautious with food and water in unfamiliar destinations</li>
              <li>Get adequate rest to combat jet lag</li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <h3 className="text-xl font-semibold mb-4">Travel Insurance</h3>
            <p className="text-muted-foreground">
              We strongly recommend purchasing comprehensive travel insurance that covers medical
              emergencies, evacuation, and trip cancellation.
            </p>
          </CardContent>
        </Card>
      </div>
    </SupportPageLayout>
  );
};

export default TravelersHealth;
