import Link from "next/link";
import Footer from "@/app/components/Footer"
import { MessageCircle, Book, Shield, CreditCard, Package, Users } from "lucide-react";

export default function HelpCenterPage() {
    const helpCategories = [
        {
            icon: Package,
            title: "Getting Started",
            description: "Learn how to create your first listing and start selling",
            articles: [
                { title: "How to create your first listing", link: "/faq#sellers" },
                { title: "Setting up your profile", link: "/onboarding" },
                { title: "Understanding item categories", link: "/faq#setup" },
                { title: "Best practices for photos", link: "/faq#sellers" }
            ]
        },
        {
            icon: CreditCard,
            title: "Payments & Transactions",
            description: "Everything about payments, pricing, and completing sales",
            articles: [
                { title: "How payments work on UniThrift", link: "/faq#payment" },
                { title: "Setting the right price", link: "/faq#sellers" },
                { title: "Handling payment methods", link: "/faq#payment" },
                { title: "Transaction best practices", link: "/faq#buyers" }
            ]
        },
        {
            icon: Shield,
            title: "Safety & Security",
            description: "Stay safe while buying and selling on campus",
            articles: [
                { title: "Meeting safely on campus", link: "/safety" },
                { title: "Recognizing scams", link: "/safety" },
                { title: "Reporting suspicious activity", link: "/contact" },
                { title: "Account security tips", link: "/safety" }
            ]
        },
        {
            icon: Users,
            title: "Buying & Selling",
            description: "Tips for successful transactions",
            articles: [
                { title: "How to buy items", link: "/faq#buyers" },
                { title: "Communicating with sellers", link: "/faq#buyers" },
                { title: "Negotiating prices", link: "/faq#buyers" },
                { title: "Leaving reviews and ratings", link: "/faq#buyers" }
            ]
        },
        {
            icon: Book,
            title: "Policies & Guidelines",
            description: "Understand our rules and regulations",
            articles: [
                { title: "Terms of Service", link: "/terms" },
                { title: "Privacy Policy", link: "/privacy" },
                { title: "Cookie Policy", link: "/cookies" },
                { title: "Community Guidelines", link: "/faq#about" }
            ]
        },
        {
            icon: MessageCircle,
            title: "Account & Support",
            description: "Managing your account and getting help",
            articles: [
                { title: "Managing your account", link: "/profile" },
                { title: "Contact support", link: "/contact" },
                { title: "Frequently asked questions", link: "/faq" },
                { title: "Student verification", link: "/faq#setup" }
            ]
        }
    ];

    return (
        <div className="min-h-screen bg-background">
            {/* Hero Header */}
            <section className="relative pt-32 pb-16 overflow-hidden">
                <div className="absolute inset-0 bg-linear-to-br from-primary/10 via-secondary/10 to-accent/10 -z-10" />
                <div className="absolute top-20 right-10 w-96 h-96 bg-primary/20 rounded-full blur-3xl -z-10" />

                <div className="container mx-auto px-4 text-center">
                    <h1 className="text-5xl md:text-7xl font-black mb-6">
                        Help <span className="text-primary">Center</span>
                    </h1>
                    <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
                        Find answers, learn tips, and get support for your UniThrift experience
                    </p>

                    {/* Search Bar */}
                    <div className="max-w-2xl mx-auto">
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="Search for help articles..."
                                className="w-full px-6 py-4 rounded-full bg-card border-2 border-border focus:border-primary outline-none transition-all"
                            />
                            <button className="absolute right-2 top-1/2 -translate-y-1/2 bg-primary hover:bg-primary/90 text-primary-foreground px-6 py-2 rounded-full transition-all">
                                Search
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            {/* Help Categories */}
            <section className="py-12 relative">
                <div className="container mx-auto px-4">
                    <div className="max-w-6xl mx-auto">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {helpCategories.map((category, index) => (
                                <div
                                    key={index}
                                    className="bg-card border border-border rounded-2xl p-6 hover:shadow-lg transition-all hover:border-primary"
                                >
                                    <div className="flex items-center gap-4 mb-4">
                                        <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                                            <category.icon className="w-6 h-6 text-primary" />
                                        </div>
                                        <h3 className="text-xl font-bold">{category.title}</h3>
                                    </div>
                                    <p className="text-muted-foreground mb-4">
                                        {category.description}
                                    </p>
                                    <ul className="space-y-2">
                                        {category.articles.map((article, idx) => (
                                            <li key={idx}>
                                                <Link
                                                    href={article.link}
                                                    className="text-sm text-primary hover:underline flex items-center gap-2"
                                                >
                                                    <span className="text-muted-foreground">→</span>
                                                    {article.title}
                                                </Link>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Quick Links */}
            <section className="py-12 bg-muted/30">
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto text-center">
                        <h2 className="text-3xl font-bold mb-6">Popular Resources</h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <Link
                                href="/faq"
                                className="bg-card border border-border rounded-xl p-6 hover:shadow-lg transition-all hover:border-primary"
                            >
                                <Book className="w-8 h-8 text-primary mx-auto mb-3" />
                                <h3 className="font-bold mb-2">FAQ</h3>
                                <p className="text-sm text-muted-foreground">
                                    Browse frequently asked questions
                                </p>
                            </Link>
                            <Link
                                href="/safety"
                                className="bg-card border border-border rounded-xl p-6 hover:shadow-lg transition-all hover:border-primary"
                            >
                                <Shield className="w-8 h-8 text-primary mx-auto mb-3" />
                                <h3 className="font-bold mb-2">Safety Tips</h3>
                                <p className="text-sm text-muted-foreground">
                                    Learn how to stay safe on campus
                                </p>
                            </Link>
                            <Link
                                href="/contact"
                                className="bg-card border border-border rounded-xl p-6 hover:shadow-lg transition-all hover:border-primary"
                            >
                                <MessageCircle className="w-8 h-8 text-primary mx-auto mb-3" />
                                <h3 className="font-bold mb-2">Contact Support</h3>
                                <p className="text-sm text-muted-foreground">
                                    Get in touch with our team
                                </p>
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* Still Need Help */}
            <section className="py-12">
                <div className="container mx-auto px-4">
                    <div className="max-w-2xl mx-auto text-center bg-linear-to-br from-primary/10 to-secondary/10 rounded-2xl p-8 border-2 border-primary/20">
                        <h2 className="text-3xl font-bold mb-4">Still need help?</h2>
                        <p className="text-muted-foreground mb-6">
                            Can't find what you're looking for? Our support team is here to help you.
                        </p>
                        <Link
                            href="/contact"
                            className="inline-block bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-3 rounded-full font-semibold transition-all hover:scale-105"
                        >
                            Contact Support
                        </Link>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
}
