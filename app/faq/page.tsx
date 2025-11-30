import FAQCategory from "../components/FAQCategory";
import Footer from "../components/Footer";

export default function FAQPage() {
    return (
        <div className="min-h-screen bg-background">
            {/* Hero Header */}
            <section className="relative pt-32 pb-16 overflow-hidden">
                <div className="absolute inset-0 bg-liinear-to-br from-primary/10 via-secondary/10 to-accent/10 -z-10" />
                <div className="absolute top-20 right-10 w-96 h-96 bg-primary/20 rounded-full blur-3xl -z-10" />

                <div className="container mx-auto px-4 text-center">
                    <h1 className="text-5xl md:text-7xl font-black mb-6">
                        Frequently Asked <span className="text-primary">Questions</span>
                    </h1>
                    <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                        Everything you need to know about buying, selling, and using UniThrift
                    </p>
                </div>
            </section>

            {/* FAQ Categories */}
            <section className="py-12 relative">
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto">
                        <FAQCategory />
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
}
