import Footer from "../components/Footer";
import { Cookie } from "lucide-react";

export default function CookiesPage() {
    return (
        <div className="min-h-screen bg-background">
            {/* Hero Header */}
            <section className="relative pt-32 pb-16 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-secondary/10 to-accent/10 -z-10" />
                <div className="absolute top-20 right-10 w-96 h-96 bg-primary/20 rounded-full blur-3xl -z-10" />

                <div className="container mx-auto px-4 text-center">
                    <div className="flex justify-center mb-6">
                        <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center">
                            <Cookie className="w-10 h-10 text-primary" />
                        </div>
                    </div>
                    <h1 className="text-5xl md:text-7xl font-black mb-6">
                        Cookie <span className="text-primary">Policy</span>
                    </h1>
                    <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                        Last updated: December 2025
                    </p>
                </div>
            </section>

            {/* Content */}
            <section className="py-12 relative">
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto prose prose-lg dark:prose-invert">

                        {/* Introduction */}
                        <div className="mb-12">
                            <h2 className="text-3xl font-bold mb-4">What Are Cookies?</h2>
                            <p className="text-muted-foreground">
                                Cookies are small text files that are placed on your device when you visit a website.
                                They help websites remember information about your visit, making your experience more
                                personalized and efficient. This Cookie Policy explains how UniThrift uses cookies
                                and similar technologies.
                            </p>
                        </div>

                        {/* How We Use Cookies */}
                        <div className="mb-12">
                            <h2 className="text-3xl font-bold mb-4">How We Use Cookies</h2>
                            <p className="text-muted-foreground mb-4">
                                UniThrift uses cookies to:
                            </p>
                            <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                                <li>Keep you signed in to your account</li>
                                <li>Remember your preferences and settings</li>
                                <li>Understand how you use our platform to improve your experience</li>
                                <li>Provide personalized content and recommendations</li>
                                <li>Ensure the security and integrity of our service</li>
                                <li>Analyze platform performance and usage patterns</li>
                            </ul>
                        </div>

                        {/* Types of Cookies */}
                        <div className="mb-12">
                            <h2 className="text-3xl font-bold mb-4">Types of Cookies We Use</h2>

                            <h3 className="text-2xl font-semibold mb-3 mt-6">1. Essential Cookies</h3>
                            <p className="text-muted-foreground mb-4">
                                These cookies are necessary for the platform to function properly. Without them,
                                you wouldn't be able to use basic features like logging in or navigating between pages.
                            </p>
                            <div className="bg-muted/50 p-6 rounded-lg mb-4">
                                <p className="text-sm text-muted-foreground mb-2"><strong>Examples:</strong></p>
                                <ul className="list-disc pl-6 text-muted-foreground space-y-1 text-sm">
                                    <li>Session cookies that keep you logged in</li>
                                    <li>Security cookies that protect against fraud</li>
                                    <li>Load balancing cookies for platform performance</li>
                                </ul>
                                <p className="text-sm text-muted-foreground mt-3">
                                    <strong>Duration:</strong> Session cookies (deleted when you close your browser)
                                    or persistent cookies (up to 1 year)
                                </p>
                            </div>

                            <h3 className="text-2xl font-semibold mb-3 mt-6">2. Functional Cookies</h3>
                            <p className="text-muted-foreground mb-4">
                                These cookies allow us to remember your choices and provide enhanced, personalized features.
                            </p>
                            <div className="bg-muted/50 p-6 rounded-lg mb-4">
                                <p className="text-sm text-muted-foreground mb-2"><strong>Examples:</strong></p>
                                <ul className="list-disc pl-6 text-muted-foreground space-y-1 text-sm">
                                    <li>Language and region preferences</li>
                                    <li>Dark mode or light mode theme settings</li>
                                    <li>Recently viewed items</li>
                                    <li>Saved search filters and preferences</li>
                                </ul>
                                <p className="text-sm text-muted-foreground mt-3">
                                    <strong>Duration:</strong> Persistent cookies (up to 2 years)
                                </p>
                            </div>

                            <h3 className="text-2xl font-semibold mb-3 mt-6">3. Analytics Cookies</h3>
                            <p className="text-muted-foreground mb-4">
                                These cookies help us understand how visitors interact with our platform by collecting
                                and reporting information anonymously.
                            </p>
                            <div className="bg-muted/50 p-6 rounded-lg mb-4">
                                <p className="text-sm text-muted-foreground mb-2"><strong>Examples:</strong></p>
                                <ul className="list-disc pl-6 text-muted-foreground space-y-1 text-sm">
                                    <li>Google Analytics cookies (page views, session duration)</li>
                                    <li>Feature usage statistics</li>
                                    <li>Performance monitoring</li>
                                    <li>Error tracking and debugging</li>
                                </ul>
                                <p className="text-sm text-muted-foreground mt-3">
                                    <strong>Duration:</strong> Persistent cookies (up to 24 months)
                                </p>
                            </div>

                            <h3 className="text-2xl font-semibold mb-3 mt-6">4. Marketing Cookies</h3>
                            <p className="text-muted-foreground mb-4">
                                These cookies track your activity to deliver relevant advertisements and measure
                                campaign effectiveness.
                            </p>
                            <div className="bg-muted/50 p-6 rounded-lg mb-4">
                                <p className="text-sm text-muted-foreground mb-2"><strong>Examples:</strong></p>
                                <ul className="list-disc pl-6 text-muted-foreground space-y-1 text-sm">
                                    <li>Social media integration cookies (Facebook, Instagram)</li>
                                    <li>Advertising network cookies</li>
                                    <li>Retargeting pixels</li>
                                    <li>Campaign tracking and attribution</li>
                                </ul>
                                <p className="text-sm text-muted-foreground mt-3">
                                    <strong>Duration:</strong> Persistent cookies (up to 12 months)
                                </p>
                                <p className="text-sm text-primary mt-2">
                                    <strong>Note:</strong> You can opt out of marketing cookies without affecting
                                    essential platform functionality.
                                </p>
                            </div>
                        </div>

                        {/* Third-Party Cookies */}
                        <div className="mb-12">
                            <h2 className="text-3xl font-bold mb-4">Third-Party Cookies</h2>
                            <p className="text-muted-foreground mb-4">
                                Some cookies are placed by third-party services that we use to enhance your experience:
                            </p>

                            <div className="space-y-4">
                                <div className="bg-muted/50 p-6 rounded-lg">
                                    <h4 className="font-semibold mb-2">Google Analytics</h4>
                                    <p className="text-sm text-muted-foreground mb-2">
                                        We use Google Analytics to understand how users interact with our platform.
                                        This helps us improve our services.
                                    </p>
                                    <p className="text-xs text-muted-foreground">
                                        Learn more: <a href="https://policies.google.com/technologies/cookies" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Google's Cookie Policy</a>
                                    </p>
                                </div>

                                <div className="bg-muted/50 p-6 rounded-lg">
                                    <h4 className="font-semibold mb-2">Social Media Platforms</h4>
                                    <p className="text-sm text-muted-foreground mb-2">
                                        When you interact with social media features (like sharing a listing), those
                                        platforms may set their own cookies.
                                    </p>
                                    <p className="text-xs text-muted-foreground">
                                        Platforms: Facebook, Instagram, Twitter/X
                                    </p>
                                </div>

                                <div className="bg-muted/50 p-6 rounded-lg">
                                    <h4 className="font-semibold mb-2">Authentication Services</h4>
                                    <p className="text-sm text-muted-foreground mb-2">
                                        If you sign in using Google or other third-party authentication, they may
                                        use cookies for login purposes.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Managing Cookies */}
                        <div className="mb-12">
                            <h2 className="text-3xl font-bold mb-4">Managing Your Cookie Preferences</h2>

                            <h3 className="text-2xl font-semibold mb-3">Browser Settings</h3>
                            <p className="text-muted-foreground mb-4">
                                Most web browsers allow you to control cookies through their settings. You can:
                            </p>
                            <ul className="list-disc pl-6 text-muted-foreground space-y-2 mb-6">
                                <li>View what cookies are stored and delete them individually</li>
                                <li>Block third-party cookies</li>
                                <li>Block all cookies from specific websites</li>
                                <li>Block all cookies (not recommended as it may break website functionality)</li>
                                <li>Delete all cookies when you close your browser</li>
                            </ul>

                            <div className="bg-primary/5 border border-primary/20 rounded-xl p-6 mb-6">
                                <h4 className="font-semibold mb-3">Browser-Specific Instructions:</h4>
                                <ul className="space-y-2 text-sm text-muted-foreground">
                                    <li>
                                        <strong>Chrome:</strong> Settings → Privacy and security → Cookies and other site data
                                    </li>
                                    <li>
                                        <strong>Firefox:</strong> Settings → Privacy & Security → Cookies and Site Data
                                    </li>
                                    <li>
                                        <strong>Safari:</strong> Preferences → Privacy → Manage Website Data
                                    </li>
                                    <li>
                                        <strong>Edge:</strong> Settings → Cookies and site permissions → Manage and delete cookies
                                    </li>
                                </ul>
                            </div>

                            <h3 className="text-2xl font-semibold mb-3 mt-6">Platform Settings</h3>
                            <p className="text-muted-foreground mb-4">
                                You can manage your cookie preferences for UniThrift through your account settings:
                            </p>
                            <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                                <li>Go to your Profile Settings</li>
                                <li>Navigate to Privacy Settings</li>
                                <li>Adjust your cookie preferences</li>
                                <li>Click Save to apply your preferences</li>
                            </ul>
                        </div>

                        {/* Impact of Disabling Cookies */}
                        <div className="mb-12">
                            <h2 className="text-3xl font-bold mb-4">Impact of Disabling Cookies</h2>
                            <p className="text-muted-foreground mb-4">
                                If you disable or refuse cookies, please note that:
                            </p>
                            <div className="space-y-4">
                                <div className="flex gap-3">
                                    <span className="text-red-500 text-xl">⚠️</span>
                                    <div>
                                        <p className="font-semibold mb-1">Essential Features May Not Work</p>
                                        <p className="text-sm text-muted-foreground">
                                            You may not be able to log in or access certain parts of the platform
                                        </p>
                                    </div>
                                </div>
                                <div className="flex gap-3">
                                    <span className="text-yellow-500 text-xl">⚠️</span>
                                    <div>
                                        <p className="font-semibold mb-1">Preferences Won't Be Saved</p>
                                        <p className="text-sm text-muted-foreground">
                                            Settings like theme, language, and search filters won't be remembered
                                        </p>
                                    </div>
                                </div>
                                <div className="flex gap-3">
                                    <span className="text-blue-500 text-xl">ℹ️</span>
                                    <div>
                                        <p className="font-semibold mb-1">Repeated Actions Required</p>
                                        <p className="text-sm text-muted-foreground">
                                            You may need to re-enter information and preferences each time you visit
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Other Tracking Technologies */}
                        <div className="mb-12">
                            <h2 className="text-3xl font-bold mb-4">Other Tracking Technologies</h2>
                            <p className="text-muted-foreground mb-4">
                                In addition to cookies, we may use other tracking technologies:
                            </p>

                            <h3 className="text-xl font-semibold mb-3">Web Beacons (Pixels)</h3>
                            <p className="text-muted-foreground mb-4">
                                Small graphic images embedded in web pages or emails to track user behavior and
                                measure campaign effectiveness.
                            </p>

                            <h3 className="text-xl font-semibold mb-3">Local Storage</h3>
                            <p className="text-muted-foreground mb-4">
                                HTML5 local storage allows us to store data on your device for improved performance
                                and offline capabilities.
                            </p>

                            <h3 className="text-xl font-semibold mb-3">Session Storage</h3>
                            <p className="text-muted-foreground mb-4">
                                Similar to local storage but data is cleared when you close your browser tab.
                            </p>
                        </div>

                        {/* Updates to Cookie Policy */}
                        <div className="mb-12">
                            <h2 className="text-3xl font-bold mb-4">Updates to This Cookie Policy</h2>
                            <p className="text-muted-foreground">
                                We may update this Cookie Policy from time to time to reflect changes in our practices
                                or for legal, regulatory, or operational reasons. We will notify you of any significant
                                changes by posting the updated policy on our platform and updating the "Last updated"
                                date at the top of this page.
                            </p>
                        </div>

                        {/* Contact Information */}
                        <div className="mb-12">
                            <h2 className="text-3xl font-bold mb-4">Questions About Cookies?</h2>
                            <p className="text-muted-foreground mb-4">
                                If you have questions about our use of cookies or this Cookie Policy, please contact us:
                            </p>
                            <div className="bg-muted p-6 rounded-lg">
                                <p className="text-muted-foreground mb-2">
                                    <strong>Email:</strong> privacy@unithrift.com
                                </p>
                                <p className="text-muted-foreground mb-2">
                                    <strong>General Support:</strong> support@unithrift.com
                                </p>
                                <p className="text-muted-foreground">
                                    <strong>Privacy Policy:</strong> <a href="/privacy" className="text-primary hover:underline">View our Privacy Policy</a>
                                </p>
                            </div>
                        </div>

                        {/* Summary Box */}
                        <div className="mb-12 p-6 bg-primary/10 rounded-lg border-l-4 border-primary">
                            <h3 className="text-2xl font-bold mb-3">In Summary</h3>
                            <p className="text-muted-foreground">
                                UniThrift uses cookies to provide you with a better, more personalized experience.
                                Essential cookies are necessary for the platform to function, while others help us
                                improve our services and understand how you use our platform. You have control over
                                your cookie preferences and can manage them at any time through your browser or
                                account settings.
                            </p>
                        </div>

                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
}
