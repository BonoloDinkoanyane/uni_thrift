"use client";

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

// Preview FAQs for home page - just a few popular questions
const previewFaqs = [
    {
        question: "Is UniThrift really free?",
        answer: "Yes! 100% free. No listing fees, no transaction fees, no hidden charges. We believe students should keep all their money."
    },
    {
        question: "How do payments work?",
        answer: "Buyers and sellers arrange payment directly. We recommend meeting in person on campus for cash exchanges, or using trusted payment apps like Venmo, Cash App, or Zelle for added convenience."
    },
    {
        question: "How do I know if a seller is trustworthy?",
        answer: "All users are verified students with .edu emails. You can also check their profile ratings, reviews from other students, and chat with them before meeting."
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
                            Quick answers to common questions
                        </p>
                    </div>

                    {/* Preview FAQ Accordion */}
                    <Accordion type="single" collapsible className="space-y-4">
                        {previewFaqs.map((faq, index) => (
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

                    {/* View All FAQs CTA */}
                    <div className="mt-12 text-center">
                        <Link
                            href="/faq"
                            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-primary to-secondary text-primary-foreground rounded-xl font-bold text-lg hover:opacity-90 transition-all hover:scale-105 shadow-lg"
                        >
                            View All FAQs
                            <ArrowRight className="w-5 h-5" />
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
}
