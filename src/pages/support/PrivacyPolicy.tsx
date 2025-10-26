import SupportPageLayout from "@/components/SupportPageLayout";

const PrivacyPolicy = () => {
  return (
    <SupportPageLayout
      title="Privacy Policy"
      description="How we protect and handle your personal information"
    >
      <div className="prose prose-lg max-w-none">
        <h2>Information Collection</h2>
        <p>
          We collect information you provide directly to us when you book flights, create an account,
          or contact our support team.
        </p>

        <h2>Data Usage</h2>
        <p>
          Your data is used solely to process bookings, improve our services, and communicate with you
          about your travel plans.
        </p>

        <h2>Data Security</h2>
        <p>
          We implement industry-standard security measures to protect your personal information from
          unauthorized access or disclosure.
        </p>

        <h2>Your Rights</h2>
        <p>
          You have the right to access, update, or delete your personal information at any time by
          contacting our support team.
        </p>
      </div>
    </SupportPageLayout>
  );
};

export default PrivacyPolicy;
