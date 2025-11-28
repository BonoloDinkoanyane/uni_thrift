"use client";

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

// Categorized FAQs
const faqCategories = [
    {
        title: "Getting Started",
        icon: "🚀",
        faqs: [
            {
                question: "How do I sign up for UniThrift?",
                answer: "Simply click 'Get Started' and sign up with your university email (.edu). We verify all students to keep the marketplace safe and campus-exclusive."
            },
            {
                question: "Can I use UniThrift if I'm not a student?",
                answer: "UniThrift is exclusively for verified students with .edu email addresses. This keeps our marketplace safe and campus-focused."
            },
            {
                question: "How long does verification take?",
                answer: "Email verification is instant! Just click the link we send to your .edu email and you're ready to start buying and selling."
            }
        ]
    },
    {
        title: "For Buyers",
        icon: "🛍️",
        faqs: [
            {
                question: "How do I find items I need?",
                answer: "Browse by category, search for specific items, or swipe through our Tinder-style feed. You can filter by price, condition, and distance from your location."
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
                question: "What if the item isn't as described?",
                answer: "Always inspect items in person before paying. If something seems off, don't complete the transaction. You can report misleading listings through the app."
            }
        ]
    },
    {
        title: "For Sellers",
        icon: "💰",
        faqs: [
            {
                question: "What can I sell on UniThrift?",
                answer: "Almost anything! Textbooks, electronics, furniture, clothing, dorm supplies, sports equipment, art supplies, and more. Just make sure items comply with campus policies and local laws."
            },
            {
                question: "How do I create a good listing?",
                answer: "Take clear, well-lit photos from multiple angles. Write an honest description including condition, size, and any flaws. Price competitively by checking similar items."
            },
            {
                question: "How do I delete my listing?",
                answer: "Go to 'My Listings' in your profile, select the item, and click 'Delete' or 'Mark as Sold'. Easy!"
            },
            {
                question: "Can I edit my listing after posting?",
                answer: "Yes! You can edit the title, description, price, photos, and other details anytime from your listings page."
            }
        ]
    },
    {
        title: "Payment & Delivery",
        icon: "💳",
        faqs: [
            {
                question: "How do payments work?",
                answer: "Buyers and sellers arrange payment directly. We recommend meeting in person on campus for cash exchanges, or using trusted payment apps like Venmo, Cash App, or Zelle for added convenience."
            },
            {
                question: "Is UniThrift really free?",
                answer: "Yes! 100% free. No listing fees, no transaction fees, no hidden charges. We believe students should keep all their money."
            },
            {
                question: "How does delivery/pickup work?",
                answer: "Most transactions happen on campus! Meet at a public location like the library, student union, or a coffee shop. For larger items, coordinate a convenient pickup time and location."
            },
            {
                question: "What payment methods are accepted?",
                answer: "Cash is most common for in-person meetups. Many students also use Venmo, Cash App, Zelle, or PayPal. You and the other party decide what works best."
            }
        ]
    },
    {
        title: "About UniThrift",
        icon: "ℹ️",
        faqs: [
            {
                question: "What is UniThrift?",
                answer: "UniThrift is a student-only marketplace where you can buy, sell, and trade items with verified students on your campus. Think of it as a safe, campus-exclusive version of marketplace apps."
            },
            {
                question: "How many campuses are you on?",
                answer: "We're currently available on 250+ campuses nationwide and growing! Check if your university is listed when you sign up."
            },
            {
                question: "How do you make money if it's free?",
                answer: "We're currently focused on building the best experience for students. Our platform is completely free with no ads or fees."
            },
            {
                question: "What if I have an issue with a transaction?",
                answer: "Since transactions happen directly between students, we recommend meeting in safe, public campus locations. If you encounter any issues, you can report users through our platform, and we'll investigate."
            },
            {
                question: "How do I contact support?",
                answer: "Email us at support@unithrift.com or use the contact form in the app. We typically respond within 24 hours."
            }
        ]
    }
];

interface FAQCategoryProps {
    showAll?: boolean;
}

export default function FAQCategory({ showAll = true }: FAQCategoryProps) {
    return (
        <div className="space-y-16">
            {faqCategories.map((category, categoryIndex) => (
                <div key={categoryIndex}>
                    {/* Category Header */}
                    <div className="flex items-center gap-3 mb-8">
                        <span className="text-4xl">{category.icon}</span>
                        <h3 className="text-3xl font-black">{category.title}</h3>
                    </div>

                    {/* Category FAQs */}
                    <Accordion type="single" collapsible className="space-y-4">
                        {category.faqs.map((faq, faqIndex) => (
                            <AccordionItem
                                key={faqIndex}
                                value={`item-${categoryIndex}-${faqIndex}`}
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
                </div>
            ))}

            {/* Still have questions CTA */}
            <div className="mt-16 text-center p-8 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-2xl border border-primary/20">
                <h3 className="text-2xl font-bold mb-2">Still have questions?</h3>
                <p className="text-muted-foreground mb-4">
                    We're here to help! Reach out to our support team.
                </p>
                <a
                    href="mailto:support@unithrift.com"
                    className="text-primary font-semibold hover:underline text-lg"
                >
                    support@unithrift.com
                </a>
            </div>
        </div>
    );
}
