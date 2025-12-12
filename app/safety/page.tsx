import Footer from "../components/Footer";
import { Shield, MapPin, Users, Eye, Lock, AlertTriangle, CheckCircle, XCircle } from "lucide-react";

export default function SafetyPage() {
    return (
        <div className="min-h-screen bg-background">
            {/* Hero Header */}
            <section className="relative pt-32 pb-16 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-secondary/10 to-accent/10 -z-10" />
                <div className="absolute top-20 right-10 w-96 h-96 bg-primary/20 rounded-full blur-3xl -z-10" />

                <div className="container mx-auto px-4 text-center">
                    <div className="flex justify-center mb-6">
                        <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center">
                            <Shield className="w-10 h-10 text-primary" />
                        </div>
                    </div>
                    <h1 className="text-5xl md:text-7xl font-black mb-6">
                        Safety <span className="text-primary">Tips</span>
                    </h1>
                    <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                        Your safety is our priority. Follow these guidelines for secure transactions on campus.
                    </p>
                </div>
            </section>

            {/* Content */}
            <section className="py-12 relative">
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto">

                        {/* Meeting Safely */}
                        <div className="mb-12 bg-card border border-border rounded-2xl p-8">
                            <div className="flex items-center gap-4 mb-6">
                                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                                    <MapPin className="w-6 h-6 text-primary" />
                                </div>
                                <h2 className="text-3xl font-bold">Meeting Safely</h2>
                            </div>

                            <div className="space-y-4">
                                <div className="flex gap-3">
                                    <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                                    <div>
                                        <h3 className="font-semibold mb-1">Choose Public Locations</h3>
                                        <p className="text-muted-foreground">
                                            Always meet in well-lit, busy public areas on campus such as the student union,
                                            library lobby, cafeteria, or main campus quad during daylight hours.
                                        </p>
                                    </div>
                                </div>

                                <div className="flex gap-3">
                                    <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                                    <div>
                                        <h3 className="font-semibold mb-1">Bring a Friend</h3>
                                        <p className="text-muted-foreground">
                                            Consider bringing a friend or roommate along, especially for high-value items.
                                            There's safety in numbers.
                                        </p>
                                    </div>
                                </div>

                                <div className="flex gap-3">
                                    <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                                    <div>
                                        <h3 className="font-semibold mb-1">Stay in Public View</h3>
                                        <p className="text-muted-foreground">
                                            Remain in areas with security cameras and other people around. Avoid isolated
                                            locations, parking lots at night, or private dorm rooms.
                                        </p>
                                    </div>
                                </div>

                                <div className="flex gap-3">
                                    <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                                    <div>
                                        <h3 className="font-semibold mb-1">Use Campus Resources</h3>
                                        <p className="text-muted-foreground">
                                            Some campuses have designated "safe exchange zones" monitored by campus security.
                                            Check if your university offers this service.
                                        </p>
                                    </div>
                                </div>

                                <div className="flex gap-3">
                                    <XCircle className="w-6 h-6 text-red-500 flex-shrink-0 mt-1" />
                                    <div>
                                        <h3 className="font-semibold mb-1">Avoid Private Residences</h3>
                                        <p className="text-muted-foreground">
                                            Never meet at someone's private residence or invite them to yours for the first
                                            transaction, even if it seems convenient.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Personal Safety */}
                        <div className="mb-12 bg-card border border-border rounded-2xl p-8">
                            <div className="flex items-center gap-4 mb-6">
                                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                                    <Users className="w-6 h-6 text-primary" />
                                </div>
                                <h2 className="text-3xl font-bold">Personal Safety</h2>
                            </div>

                            <div className="space-y-4">
                                <div className="flex gap-3">
                                    <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                                    <div>
                                        <h3 className="font-semibold mb-1">Trust Your Instincts</h3>
                                        <p className="text-muted-foreground">
                                            If something feels off or makes you uncomfortable, don't proceed with the
                                            transaction. Your safety is more important than any sale.
                                        </p>
                                    </div>
                                </div>

                                <div className="flex gap-3">
                                    <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                                    <div>
                                        <h3 className="font-semibold mb-1">Keep Someone Informed</h3>
                                        <p className="text-muted-foreground">
                                            Let a friend or roommate know where you're going, who you're meeting, and when
                                            you expect to return. Share your location if possible.
                                        </p>
                                    </div>
                                </div>

                                <div className="flex gap-3">
                                    <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                                    <div>
                                        <h3 className="font-semibold mb-1">Stay Alert</h3>
                                        <p className="text-muted-foreground">
                                            Pay attention to your surroundings and avoid distractions. Put your phone away
                                            when walking to meet someone.
                                        </p>
                                    </div>
                                </div>

                                <div className="flex gap-3">
                                    <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                                    <div>
                                        <h3 className="font-semibold mb-1">Meet During Daylight</h3>
                                        <p className="text-muted-foreground">
                                            Schedule meetings during daytime hours when campus is active and well-populated.
                                            Avoid late night or early morning exchanges.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Transaction Safety */}
                        <div className="mb-12 bg-card border border-border rounded-2xl p-8">
                            <div className="flex items-center gap-4 mb-6">
                                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                                    <Eye className="w-6 h-6 text-primary" />
                                </div>
                                <h2 className="text-3xl font-bold">Transaction Safety</h2>
                            </div>

                            <div className="space-y-4">
                                <div className="flex gap-3">
                                    <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                                    <div>
                                        <h3 className="font-semibold mb-1">Inspect Before Paying</h3>
                                        <p className="text-muted-foreground">
                                            Thoroughly examine the item before handing over payment. Check for damage,
                                            functionality, and authenticity. Take your time.
                                        </p>
                                    </div>
                                </div>

                                <div className="flex gap-3">
                                    <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                                    <div>
                                        <h3 className="font-semibold mb-1">Use Secure Payment Methods</h3>
                                        <p className="text-muted-foreground">
                                            Prefer digital payment methods that leave a transaction record (mobile payment
                                            apps, bank transfers). Count cash carefully if using physical currency.
                                        </p>
                                    </div>
                                </div>

                                <div className="flex gap-3">
                                    <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                                    <div>
                                        <h3 className="font-semibold mb-1">Verify Item Details</h3>
                                        <p className="text-muted-foreground">
                                            Ensure the item matches the listing description and photos. For electronics,
                                            test functionality before completing the purchase.
                                        </p>
                                    </div>
                                </div>

                                <div className="flex gap-3">
                                    <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                                    <div>
                                        <h3 className="font-semibold mb-1">Get Everything in Writing</h3>
                                        <p className="text-muted-foreground">
                                            Use the platform's messaging system to document all agreements. Keep records
                                            of conversations and transaction details.
                                        </p>
                                    </div>
                                </div>

                                <div className="flex gap-3">
                                    <XCircle className="w-6 h-6 text-red-500 flex-shrink-0 mt-1" />
                                    <div>
                                        <h3 className="font-semibold mb-1">Never Send Money in Advance</h3>
                                        <p className="text-muted-foreground">
                                            Don't pay for items before seeing them in person. Avoid requests for deposits,
                                            wire transfers, or gift cards. These are common scam tactics.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Online Safety */}
                        <div className="mb-12 bg-card border border-border rounded-2xl p-8">
                            <div className="flex items-center gap-4 mb-6">
                                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                                    <Lock className="w-6 h-6 text-primary" />
                                </div>
                                <h2 className="text-3xl font-bold">Online Safety</h2>
                            </div>

                            <div className="space-y-4">
                                <div className="flex gap-3">
                                    <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                                    <div>
                                        <h3 className="font-semibold mb-1">Protect Personal Information</h3>
                                        <p className="text-muted-foreground">
                                            Never share your full address, dorm room number, social security number,
                                            bank details, or student ID number with other users.
                                        </p>
                                    </div>
                                </div>

                                <div className="flex gap-3">
                                    <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                                    <div>
                                        <h3 className="font-semibold mb-1">Use Platform Messaging</h3>
                                        <p className="text-muted-foreground">
                                            Keep all communication within UniThrift's messaging system. This provides a
                                            record and helps us help you if issues arise.
                                        </p>
                                    </div>
                                </div>

                                <div className="flex gap-3">
                                    <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                                    <div>
                                        <h3 className="font-semibold mb-1">Check User Profiles</h3>
                                        <p className="text-muted-foreground">
                                            Review the user's profile, ratings, and reviews before proceeding. Verified
                                            students with positive reviews are generally more trustworthy.
                                        </p>
                                    </div>
                                </div>

                                <div className="flex gap-3">
                                    <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                                    <div>
                                        <h3 className="font-semibold mb-1">Secure Your Account</h3>
                                        <p className="text-muted-foreground">
                                            Use a strong, unique password for your UniThrift account. Enable two-factor
                                            authentication if available. Never share your login credentials.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Recognizing Scams */}
                        <div className="mb-12 bg-card border border-border rounded-2xl p-8">
                            <div className="flex items-center gap-4 mb-6">
                                <div className="w-12 h-12 bg-red-500/10 rounded-full flex items-center justify-center">
                                    <AlertTriangle className="w-6 h-6 text-red-500" />
                                </div>
                                <h2 className="text-3xl font-bold">Recognizing Scams</h2>
                            </div>

                            <div className="p-6 bg-red-500/5 border border-red-500/20 rounded-xl mb-6">
                                <h3 className="font-semibold mb-3 text-red-600 dark:text-red-400">Red Flags to Watch For:</h3>
                                <ul className="space-y-2 text-muted-foreground">
                                    <li className="flex gap-2">
                                        <span className="text-red-500">•</span>
                                        <span>Prices that seem too good to be true</span>
                                    </li>
                                    <li className="flex gap-2">
                                        <span className="text-red-500">•</span>
                                        <span>Requests for payment before meeting in person</span>
                                    </li>
                                    <li className="flex gap-2">
                                        <span className="text-red-500">•</span>
                                        <span>Pressure to make quick decisions or complete transactions urgently</span>
                                    </li>
                                    <li className="flex gap-2">
                                        <span className="text-red-500">•</span>
                                        <span>Sellers who won't meet in person or show items via video call</span>
                                    </li>
                                    <li className="flex gap-2">
                                        <span className="text-red-500">•</span>
                                        <span>Requests to communicate outside the platform</span>
                                    </li>
                                    <li className="flex gap-2">
                                        <span className="text-red-500">•</span>
                                        <span>Requests for wire transfers, gift cards, or cryptocurrency</span>
                                    </li>
                                    <li className="flex gap-2">
                                        <span className="text-red-500">•</span>
                                        <span>Users with no reviews or very new accounts selling high-value items</span>
                                    </li>
                                    <li className="flex gap-2">
                                        <span className="text-red-500">•</span>
                                        <span>Photos that look professional or taken from other websites</span>
                                    </li>
                                    <li className="flex gap-2">
                                        <span className="text-red-500">•</span>
                                        <span>Poor grammar or vague responses to specific questions</span>
                                    </li>
                                </ul>
                            </div>

                            <div className="p-6 bg-primary/5 border border-primary/20 rounded-xl">
                                <h3 className="font-semibold mb-3">If You Suspect a Scam:</h3>
                                <ul className="space-y-2 text-muted-foreground">
                                    <li className="flex gap-2">
                                        <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                                        <span>Stop all communication with the suspicious user</span>
                                    </li>
                                    <li className="flex gap-2">
                                        <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                                        <span>Do not send any money or personal information</span>
                                    </li>
                                    <li className="flex gap-2">
                                        <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                                        <span>Report the user and listing immediately through our platform</span>
                                    </li>
                                    <li className="flex gap-2">
                                        <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                                        <span>Contact campus security if you feel threatened</span>
                                    </li>
                                    <li className="flex gap-2">
                                        <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                                        <span>Preserve all messages and evidence of the scam attempt</span>
                                    </li>
                                </ul>
                            </div>
                        </div>

                        {/* Emergency Contacts */}
                        <div className="mb-12 bg-gradient-to-br from-primary/10 to-secondary/10 border-2 border-primary/20 rounded-2xl p-8">
                            <h2 className="text-3xl font-bold mb-4 text-center">Emergency Contacts</h2>
                            <p className="text-muted-foreground text-center mb-6">
                                If you feel unsafe or experience an emergency:
                            </p>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div className="bg-background rounded-xl p-4 text-center">
                                    <h3 className="font-bold mb-2">Campus Security</h3>
                                    <p className="text-sm text-muted-foreground">
                                        Contact your campus security office immediately
                                    </p>
                                </div>
                                <div className="bg-background rounded-xl p-4 text-center">
                                    <h3 className="font-bold mb-2">Emergency Services</h3>
                                    <p className="text-sm text-muted-foreground">
                                        Call local emergency services (911 or equivalent)
                                    </p>
                                </div>
                                <div className="bg-background rounded-xl p-4 text-center">
                                    <h3 className="font-bold mb-2">Report to UniThrift</h3>
                                    <p className="text-sm text-muted-foreground">
                                        Report incidents through our platform or contact us
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Final Message */}
                        <div className="text-center p-6 bg-card border border-border rounded-2xl">
                            <h3 className="text-2xl font-bold mb-3">Remember: Your Safety Comes First</h3>
                            <p className="text-muted-foreground mb-4">
                                No transaction is worth compromising your safety. When in doubt, walk away.
                                We're here to support you in creating a safe marketplace community.
                            </p>
                            <p className="text-sm text-muted-foreground">
                                Have questions or concerns? <a href="/contact" className="text-primary hover:underline font-semibold">Contact our support team</a>
                            </p>
                        </div>

                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
}
