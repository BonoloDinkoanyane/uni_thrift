"use client";

import {
    ShoppingBag,
    Search,
    MessageCircle,
    Handshake,
    Upload,
    Camera,
    DollarSign,
    Package,
    CheckCircle,
    Shield
} from "lucide-react";

export default function HowItWorks() {
    return (
        <section className="py-24 relative" id="how-it-works">
            <div className="absolute inset-0 -z-10">
                <div className="absolute inset-0 bg-linear-to-b from-background via-secondary/5 to-background" />
            </div>

            <div className="container mx-auto px-4">
                {/* Header */}
                <div className="text-center mb-20">
                    <h2 className="text-4xl md:text-6xl font-black mb-4">
                        How It <span className="text-secondary">Works</span>
                    </h2>
                    <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                        Simple, fast, and built for students. Start buying and selling in minutes.
                    </p>
                </div>

                {/* For Buyers */}
                <div className="mb-24">
                    <div className="flex items-center justify-center gap-3 mb-12">
                        <ShoppingBag className="w-8 h-8 text-primary" />
                        <h3 className="text-3xl md:text-4xl font-black">For Buyers</h3>
                    </div>

                    <div className="grid md:grid-cols-4 gap-6 max-w-6xl mx-auto">
                        <StepCard
                            number="1"
                            icon={<Search className="w-8 h-8" />}
                            title="Browse & Search"
                            description="Swipe through items or search for exactly what you need"
                            color="from-primary/20 to-primary/10"
                        />
                        <StepCard
                            number="2"
                            icon={<MessageCircle className="w-8 h-8" />}
                            title="Chat with Seller"
                            description="Message sellers instantly to ask questions or negotiate"
                            color="from-secondary/20 to-secondary/10"
                        />
                        <StepCard
                            number="3"
                            icon={<Handshake className="w-8 h-8" />}
                            title="Arrange Meetup"
                            description="Agree on a safe campus location and payment method"
                            color="from-accent/20 to-accent/10"
                        />
                        <StepCard
                            number="4"
                            icon={<CheckCircle className="w-8 h-8" />}
                            title="Complete Deal"
                            description="Meet up, inspect item, exchange payment, and you're done!"
                            color="from-primary/20 to-secondary/10"
                        />
                    </div>
                </div>

                {/* For Sellers */}
                <div className="mb-20">
                    <div className="flex items-center justify-center gap-3 mb-12">
                        <DollarSign className="w-8 h-8 text-secondary" />
                        <h3 className="text-3xl md:text-4xl font-black">For Sellers</h3>
                    </div>

                    <div className="grid md:grid-cols-4 gap-6 max-w-6xl mx-auto">
                        <StepCard
                            number="1"
                            icon={<Camera className="w-8 h-8" />}
                            title="Take Photos"
                            description="Snap clear photos of your item from multiple angles"
                            color="from-secondary/20 to-secondary/10"
                        />
                        <StepCard
                            number="2"
                            icon={<Upload className="w-8 h-8" />}
                            title="Create Listing"
                            description="Add title, description, price, and category in seconds"
                            color="from-accent/20 to-accent/10"
                        />
                        <StepCard
                            number="3"
                            icon={<MessageCircle className="w-8 h-8" />}
                            title="Chat with Buyers"
                            description="Respond to messages and answer buyer questions"
                            color="from-primary/20 to-primary/10"
                        />
                        <StepCard
                            number="4"
                            icon={<Package className="w-8 h-8" />}
                            title="Meet & Sell"
                            description="Meet on campus, hand over item, collect payment!"
                            color="from-secondary/20 to-accent/10"
                        />
                    </div>
                </div>

                {/* Payment & Delivery Info */}
                <div className="max-w-5xl mx-auto">
                    <div className="grid md:grid-cols-2 gap-8">
                        {/* Payment */}
                        <div className="bg-linear-to-br from-primary/10 to-primary/5 border border-primary/20 rounded-2xl p-8">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center">
                                    <DollarSign className="w-6 h-6 text-primary-foreground" />
                                </div>
                                <h4 className="text-2xl font-black">Payment</h4>
                            </div>
                            <ul className="space-y-4 text-muted-foreground">
                                <li className="flex items-start gap-3">
                                    <CheckCircle className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                                    <span><strong className="text-foreground">Cash:</strong> Simple and instant for in-person meetups</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <CheckCircle className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                                    <span><strong className="text-foreground">Venmo/Cash App/Zelle:</strong> Quick digital transfers</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <CheckCircle className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                                    <span><strong className="text-foreground">Your Choice:</strong> Buyers and sellers decide together</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <CheckCircle className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                                    <span><strong className="text-foreground">No Fees:</strong> Keep 100% of your money</span>
                                </li>
                            </ul>
                        </div>

                        {/* Delivery */}
                        <div className="bg-linear-to-br from-secondary/10 to-secondary/5 border border-secondary/20 rounded-2xl p-8">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-12 h-12 bg-secondary rounded-xl flex items-center justify-center">
                                    <Package className="w-6 h-6 text-secondary-foreground" />
                                </div>
                                <h4 className="text-2xl font-black">Delivery & Pickup</h4>
                            </div>
                            <ul className="space-y-4 text-muted-foreground">
                                <li className="flex items-start gap-3">
                                    <CheckCircle className="w-5 h-5 text-secondary mt-0.5 shrink-0" />
                                    <span><strong className="text-foreground">Campus Meetups:</strong> Library, student union, or coffee shops</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <CheckCircle className="w-5 h-5 text-secondary mt-0.5 shrink-0" />
                                    <span><strong className="text-foreground">Dorm Delivery:</strong> Arrange convenient drop-off times</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <CheckCircle className="w-5 h-5 text-secondary mt-0.5 shrink-0" />
                                    <span><strong className="text-foreground">Safe Locations:</strong> Always meet in public, well-lit areas</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <CheckCircle className="w-5 h-5 text-secondary mt-0.5 shrink-0" />
                                    <span><strong className="text-foreground">Flexible:</strong> Work out what's best for both parties</span>
                                </li>
                            </ul>
                        </div>
                    </div>

                    {/* Safety Note */}
                    <div className="mt-8 bg-linear-to-r from-accent/10 to-accent/5 border border-accent/20 rounded-2xl p-6">
                        <div className="flex items-start gap-4">
                            <Shield className="w-6 h-6 text-accent mt-1 shrink-0" />
                            <div>
                                <h5 className="font-bold text-lg mb-2">Safety First 🛡️</h5>
                                <p className="text-muted-foreground leading-relaxed">
                                    Always meet in public campus locations during daylight hours. Bring a friend if you're unsure.
                                    Trust your instincts—if something feels off, it probably is. Report any suspicious activity to campus security.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

const StepCard = ({
    number,
    icon,
    title,
    description,
    color
}: {
    number: string;
    icon: React.ReactNode;
    title: string;
    description: string;
    color: string;
}) => {
    return (
        <div className={`relative bg-linear-to-br ${color} border border-border/50 rounded-2xl p-6 hover:scale-105 transition-all shadow-lg`}>
            {/* Step Number */}
            <div className="absolute -top-4 -left-4 w-10 h-10 bg-linear-to-br from-primary to-secondary rounded-full flex items-center justify-center text-white font-black text-lg shadow-lg">
                {number}
            </div>

            {/* Icon */}
            <div className="mb-4 text-primary">
                {icon}
            </div>

            {/* Content */}
            <h4 className="font-black text-lg mb-2">{title}</h4>
            <p className="text-muted-foreground text-sm leading-relaxed">{description}</p>
        </div>
    );
};
