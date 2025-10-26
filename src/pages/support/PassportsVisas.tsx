import SupportPageLayout from "@/components/SupportPageLayout";
import { Card, CardContent } from "@/components/ui/card";

const PassportsVisas = () => {
  return (
    <SupportPageLayout
      title="Passports & Visas"
      description="Essential information about travel documents"
    >
      <div className="space-y-6">
        <Card>
          <CardContent className="p-6">
            <h3 className="text-xl font-semibold mb-4">Passport Requirements</h3>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground">
              <li>Your passport must be valid for at least 6 months beyond your travel dates</li>
              <li>Ensure your passport has enough blank pages for entry/exit stamps</li>
              <li>Check if your destination requires a visa</li>
              <li>Keep photocopies of your passport in a separate location</li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <h3 className="text-xl font-semibold mb-4">Visa Information</h3>
            <p className="text-muted-foreground mb-4">
              Visa requirements vary by destination and nationality. We recommend:
            </p>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground">
              <li>Check visa requirements at least 8 weeks before travel</li>
              <li>Visit your destination country's embassy website</li>
              <li>Allow sufficient time for visa processing</li>
              <li>Keep all visa documentation with your passport</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </SupportPageLayout>
  );
};

export default PassportsVisas;
