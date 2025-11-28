"use client";

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const faqs = [
    {
        question: "How do I sign up for UniThrift?",
        answer: "Simply click 'Get Started' and sign up with your university email (.edu). We verify all students to keep the marketplace safe and campus-exclusive."
    },
    {
        question: "Is UniThrift really free?",
        answer: "Yes! 100% free. No listing fees, no transaction fees, no hidden charges. We believe students should keep all their money."
    },
    {
        question: "How do payments work?",
        answer: "Buyers and sellers arrange payment directly. We recommend meeting in person on campus for cash exchanges, or using trusted payment apps like Venmo, Cash App, or Zelle for added convenience."
    },
    {
        question: "How does delivery/pickup work?",
        answer: "Most transactions happen on campus! Meet at a public location like the library, student union, or a coffee shop. For larger items, coordinate a convenient pickup time and location."
    },
    {
        question: "What can I sell on UniThrift?",
        answer: "Almost anything! Textbooks, electronics, furniture, clothing, dorm supplies, sports equipment, art supplies, and more. Just make sure items comply with campus policies and local laws."
    },
    {
        question: "How do I know if a seller is trustworthy?",
        answer: "All users are verified students with .edu emails. You can also check their profile ratings, reviews from other students, and chat with them before meeting."
    },
    {
        question: "Can I negotiate prices?",
        answer: "Absolutely! Use our built-in chat to message sellers and negotiate. Most students are flexible and happy to work out a fair deal."
    },
    {
        question: "What if I have an issue with a transaction?",
        answer: "Since transactions happen directly between students, we recommend meeting in safe, public campus locations. If you encounter any issues, you can report users through our platform."
    },
    {
        question: "How do I delete my listing?",
        answer: "Go to 'My Listings' in your profile, select the item, and click 'Delete' or 'Mark as Sold'. Easy!"
    },
    {
        question: "Can I use UniThrift if I'm not a student?",
        answer: "UniThrift is exclusively for verified students with .edu email addresses. This keeps our marketplace safe and campus-focused."
    }
];

export default function FAQSection() {
    return (
        <section className="py-24 relative" id="faq">
            <div className="absolute inset-0 bg-gradient-to-b from-background via-muted/20 to-background -z-10" />

            <div className="container mx-auto px-4">
                <div className="max-w-4xl mx-auto">
                    {/* Header */}
                    <div className="text-center mb-16">
                        <h2 className="text-4xl md:text-6xl font-black mb-4">
                            Got <span className="text-primary">Questions?</span>
                        </h2>
                        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                            Everything you need to know about buying and selling on UniThrift
                        </p>
                    </div>

                    {/* FAQ Accordion */}
                    <Accordion type="single" collapsible className="space-y-4">
                        {faqs.map((faq, index) => (
                            <AccordionItem
                                key={index}
                                value={`item-${index}`}
                                className="bg-card border border-border/50 rounded-2xl px-6 shadow-sm hover:shadow-md transition-shadow"
                            >
                                <AccordionTrigger className="text-left font-bold text-lg hover:text-primary py-6">
                                    {faq.question}
                                </AccordionTrigger>
                                <AccordionContent className="text-muted-foreground pb-6 leading-relaxed">
                                    {faq.answer}
                                </AccordionContent>
                            </AccordionItem>
                        ))}
                    </Accordion>

                    {/* Still have questions CTA */}
                    <div className="mt-12 text-center p-8 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-2xl border border-primary/20">
                        <h3 className="text-2xl font-bold mb-2">Still have questions?</h3>
                        <p className="text-muted-foreground mb-4">
                            We're here to help! Reach out to our support team.
                        </p>
                        <a
                            href="mailto:support@unithrift.com"
                            className="text-primary font-semibold hover:underline"
                        >
                            support@unithrift.com
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
}
