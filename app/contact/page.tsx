import Footer from "../components/Footer";
import { Mail, MessageCircle, HelpCircle, AlertTriangle, FileText, Send } from "lucide-react";

export default function ContactPage() {
    const contactMethods = [
        {
            icon: Mail,
            title: "General Support",
            description: "For general questions and assistance",
            contact: "support@unithrift.com",
            responseTime: "24-48 hours"
        },
        {
            icon: AlertTriangle,
            title: "Report Issues",
            description: "Report scams, violations, or safety concerns",
            contact: "safety@unithrift.com",
            responseTime: "12-24 hours"
        },
        {
            icon: FileText,
            title: "Privacy & Legal",
            description: "Privacy requests and legal matters",
            contact: "privacy@unithrift.com",
            responseTime: "48-72 hours"
        },
        {
            icon: HelpCircle,
            title: "Technical Support",
            description: "App issues, bugs, or technical problems",
            contact: "tech@unithrift.com",
            responseTime: "24-48 hours"
        }
    ];

    return (
        <div className="min-h-screen bg-background">
            {/* Hero Header */}
            <section className="relative pt-32 pb-16 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-secondary/10 to-accent/10 -z-10" />
                <div className="absolute top-20 right-10 w-96 h-96 bg-primary/20 rounded-full blur-3xl -z-10" />

                <div className="container mx-auto px-4 text-center">
                    <h1 className="text-5xl md:text-7xl font-black mb-6">
                        Contact <span className="text-primary">Us</span>
                    </h1>
                    <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                        Have a question or need help? We're here for you.
                    </p>
                </div>
            </section>

            {/* Contact Methods */}
            <section className="py-12 relative">
                <div className="container mx-auto px-4">
                    <div className="max-w-5xl mx-auto">
                        <h2 className="text-3xl font-bold text-center mb-10">How Can We Help?</h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
                            {contactMethods.map((method, index) => (
                                <div
                                    key={index}
                                    className="bg-card border border-border rounded-2xl p-6 hover:shadow-lg transition-all hover:border-primary"
                                >
                                    <div className="flex items-start gap-4">
                                        <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                                            <method.icon className="w-6 h-6 text-primary" />
                                        </div>
                                        <div className="flex-1">
                                            <h3 className="text-xl font-bold mb-2">{method.title}</h3>
                                            <p className="text-muted-foreground text-sm mb-3">
                                                {method.description}
                                            </p>
                                            <a
                                                href={`mailto:${method.contact}`}
                                                className="text-primary hover:underline font-semibold break-all"
                                            >
                                                {method.contact}
                                            </a>
                                            <p className="text-xs text-muted-foreground mt-2">
                                                Response time: {method.responseTime}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Contact Form */}
                        <div className="bg-card border border-border rounded-2xl p-8 mb-12">
                            <div className="flex items-center gap-3 mb-6">
                                <MessageCircle className="w-8 h-8 text-primary" />
                                <h2 className="text-3xl font-bold">Send Us a Message</h2>
                            </div>

                            <form className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label htmlFor="name" className="block text-sm font-semibold mb-2">
                                            Your Name *
                                        </label>
                                        <input
                                            type="text"
                                            id="name"
                                            name="name"
                                            required
                                            className="w-full px-4 py-3 rounded-lg bg-background border border-border focus:border-primary outline-none transition-all"
                                            placeholder="John Doe"
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="email" className="block text-sm font-semibold mb-2">
                                            University Email *
                                        </label>
                                        <input
                                            type="email"
                                            id="email"
                                            name="email"
                                            required
                                            className="w-full px-4 py-3 rounded-lg bg-background border border-border focus:border-primary outline-none transition-all"
                                            placeholder="john.doe@university.edu"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label htmlFor="category" className="block text-sm font-semibold mb-2">
                                        Category *
                                    </label>
                                    <select
                                        id="category"
                                        name="category"
                                        required
                                        className="w-full px-4 py-3 rounded-lg bg-background border border-border focus:border-primary outline-none transition-all"
                                    >
                                        <option value="">Select a category</option>
                                        <option value="general">General Support</option>
                                        <option value="technical">Technical Issue</option>
                                        <option value="safety">Safety Concern / Report</option>
                                        <option value="account">Account Issue</option>
                                        <option value="payment">Payment / Transaction</option>
                                        <option value="privacy">Privacy / Legal</option>
                                        <option value="feature">Feature Request</option>
                                        <option value="other">Other</option>
                                    </select>
                                </div>

                                <div>
                                    <label htmlFor="subject" className="block text-sm font-semibold mb-2">
                                        Subject *
                                    </label>
                                    <input
                                        type="text"
                                        id="subject"
                                        name="subject"
                                        required
                                        className="w-full px-4 py-3 rounded-lg bg-background border border-border focus:border-primary outline-none transition-all"
                                        placeholder="Brief description of your issue"
                                    />
                                </div>

                                <div>
                                    <label htmlFor="message" className="block text-sm font-semibold mb-2">
                                        Message *
                                    </label>
                                    <textarea
                                        id="message"
                                        name="message"
                                        required
                                        rows={6}
                                        className="w-full px-4 py-3 rounded-lg bg-background border border-border focus:border-primary outline-none transition-all resize-none"
                                        placeholder="Please provide as much detail as possible..."
                                    />
                                </div>

                                <div>
                                    <label htmlFor="attachment" className="block text-sm font-semibold mb-2">
                                        Attachment (optional)
                                    </label>
                                    <input
                                        type="file"
                                        id="attachment"
                                        name="attachment"
                                        className="w-full px-4 py-3 rounded-lg bg-background border border-border focus:border-primary outline-none transition-all file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:bg-primary/10 file:text-primary hover:file:bg-primary/20 file:cursor-pointer"
                                    />
                                    <p className="text-xs text-muted-foreground mt-2">
                                        Screenshots or documents related to your inquiry (Max 5MB)
                                    </p>
                                </div>

                                <button
                                    type="submit"
                                    className="w-full bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-4 rounded-full font-semibold transition-all hover:scale-105 flex items-center justify-center gap-2"
                                >
                                    <Send className="w-5 h-5" />
                                    Send Message
                                </button>

                                <p className="text-xs text-muted-foreground text-center">
                                    By submitting this form, you agree to our{" "}
                                    <a href="/privacy" className="text-primary hover:underline">Privacy Policy</a>
                                </p>
                            </form>
                        </div>

                        {/* Additional Resources */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                            <a
                                href="/faq"
                                className="bg-card border border-border rounded-xl p-6 text-center hover:shadow-lg transition-all hover:border-primary group"
                            >
                                <HelpCircle className="w-10 h-10 text-primary mx-auto mb-3 group-hover:scale-110 transition-transform" />
                                <h3 className="font-bold mb-2">FAQ</h3>
                                <p className="text-sm text-muted-foreground">
                                    Find quick answers to common questions
                                </p>
                            </a>
                            <a
                                href="/help"
                                className="bg-card border border-border rounded-xl p-6 text-center hover:shadow-lg transition-all hover:border-primary group"
                            >
                                <MessageCircle className="w-10 h-10 text-primary mx-auto mb-3 group-hover:scale-110 transition-transform" />
                                <h3 className="font-bold mb-2">Help Center</h3>
                                <p className="text-sm text-muted-foreground">
                                    Browse our comprehensive guides
                                </p>
                            </a>
                            <a
                                href="/safety"
                                className="bg-card border border-border rounded-xl p-6 text-center hover:shadow-lg transition-all hover:border-primary group"
                            >
                                <AlertTriangle className="w-10 h-10 text-primary mx-auto mb-3 group-hover:scale-110 transition-transform" />
                                <h3 className="font-bold mb-2">Safety Tips</h3>
                                <p className="text-sm text-muted-foreground">
                                    Learn how to stay safe on campus
                                </p>
                            </a>
                        </div>

                        {/* Response Time Info */}
                        <div className="bg-gradient-to-br from-primary/10 to-secondary/10 border-2 border-primary/20 rounded-2xl p-8 text-center">
                            <h3 className="text-2xl font-bold mb-3">We're Here to Help!</h3>
                            <p className="text-muted-foreground mb-4">
                                Our support team typically responds within 24-48 hours during business days.
                                For urgent safety concerns, we aim to respond within 12 hours.
                            </p>
                            <p className="text-sm text-muted-foreground">
                                Before contacting us, you might find your answer faster in our{" "}
                                <a href="/faq" className="text-primary hover:underline font-semibold">FAQ</a> or{" "}
                                <a href="/help" className="text-primary hover:underline font-semibold">Help Center</a>
                            </p>
                        </div>

                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
}
