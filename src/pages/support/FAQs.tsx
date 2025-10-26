import SupportPageLayout from "@/components/SupportPageLayout";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FAQs = () => {
  const faqs = [
    {
      question: "How do I book a flight?",
      answer: "Simply enter your travel details on our homepage, search for available flights, and follow the booking process.",
    },
    {
      question: "Can I cancel my booking?",
      answer: "Cancellation policies vary by airline. Check your booking confirmation for specific terms and conditions.",
    },
    {
      question: "Do you charge booking fees?",
      answer: "We strive to keep our fees transparent. Any applicable fees will be clearly displayed before you complete your booking.",
    },
    {
      question: "How do I add baggage to my booking?",
      answer: "You can add baggage during the booking process or contact customer support to modify your existing booking.",
    },
    {
      question: "What payment methods do you accept?",
      answer: "We accept major credit cards, debit cards, and various online payment methods.",
    },
  ];

  return (
    <SupportPageLayout
      title="Frequently Asked Questions"
      description="Find answers to common questions"
    >
      <Accordion type="single" collapsible className="w-full">
        {faqs.map((faq, index) => (
          <AccordionItem key={index} value={`item-${index}`}>
            <AccordionTrigger className="text-left">{faq.question}</AccordionTrigger>
            <AccordionContent className="text-muted-foreground">
              {faq.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </SupportPageLayout>
  );
};

export default FAQs;
