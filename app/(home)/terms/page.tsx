import Footer from "@/app/components/Footer"

export default function TermsPage() {
    return (
        <div className="min-h-screen bg-background">
            {/* Hero Header */}
            <section className="relative pt-32 pb-16 overflow-hidden">
                <div className="absolute inset-0 bg-linear-to-br from-primary/10 via-secondary/10 to-accent/10 -z-10" />
                <div className="absolute top-20 right-10 w-96 h-96 bg-primary/20 rounded-full blur-3xl -z-10" />

                <div className="container mx-auto px-4 text-center">
                    <h1 className="text-5xl md:text-7xl font-black mb-6">
                        Terms of <span className="text-primary">Service</span>
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
                            <h2 className="text-3xl font-bold mb-4">Welcome to UniThrift</h2>
                            <p className="text-muted-foreground">
                                These Terms of Service ("Terms") govern your access to and use of UniThrift,
                                a peer-to-peer marketplace platform for university students to buy and sell
                                second-hand items within their campus community. By accessing or using UniThrift,
                                you agree to be bound by these Terms.
                            </p>
                        </div>

                        {/* 1. Acceptance of Terms */}
                        <div className="mb-12">
                            <h2 className="text-3xl font-bold mb-4">1. Acceptance of Terms</h2>
                            <p className="text-muted-foreground mb-4">
                                By creating an account, accessing, or using UniThrift, you acknowledge that you have
                                read, understood, and agree to be bound by these Terms and our Privacy Policy. If you
                                do not agree to these Terms, you may not use our platform.
                            </p>
                            <p className="text-muted-foreground">
                                We reserve the right to update these Terms at any time. Continued use of the platform
                                after changes are posted constitutes acceptance of the modified Terms.
                            </p>
                        </div>

                        {/* 2. Eligibility */}
                        <div className="mb-12">
                            <h2 className="text-3xl font-bold mb-4">2. Eligibility</h2>
                            <p className="text-muted-foreground mb-4">
                                To use UniThrift, you must:
                            </p>
                            <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                                <li>Be a currently enrolled student at a participating university</li>
                                <li>Be at least 18 years old or have parental/guardian consent</li>
                                <li>Have a valid university email address for verification</li>
                                <li>Provide accurate and complete registration information</li>
                                <li>Maintain the security of your account credentials</li>
                            </ul>
                        </div>

                        {/* 3. Account Responsibilities */}
                        <div className="mb-12">
                            <h2 className="text-3xl font-bold mb-4">3. Account Responsibilities</h2>
                            <p className="text-muted-foreground mb-4">
                                You are responsible for:
                            </p>
                            <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                                <li>Maintaining the confidentiality of your account and password</li>
                                <li>All activities that occur under your account</li>
                                <li>Notifying us immediately of any unauthorized use</li>
                                <li>Ensuring your account information remains accurate and up-to-date</li>
                                <li>Complying with all applicable laws and regulations</li>
                            </ul>
                        </div>

                        {/* 4. Listing and Selling Items */}
                        <div className="mb-12">
                            <h2 className="text-3xl font-bold mb-4">4. Listing and Selling Items</h2>
                            <h3 className="text-2xl font-semibold mb-3 mt-6">4.1 Prohibited Items</h3>
                            <p className="text-muted-foreground mb-4">
                                You may not list or sell:
                            </p>
                            <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                                <li>Illegal items or items that violate any laws</li>
                                <li>Stolen goods or counterfeit products</li>
                                <li>Weapons, drugs, or other dangerous materials</li>
                                <li>Items that infringe on intellectual property rights</li>
                                <li>Adult content or explicit materials</li>
                                <li>Academic work (essays, assignments, etc.) intended for plagiarism</li>
                                <li>University property without proper authorization</li>
                            </ul>

                            <h3 className="text-2xl font-semibold mb-3 mt-6">4.2 Listing Requirements</h3>
                            <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                                <li>Provide accurate, truthful descriptions of items</li>
                                <li>Use clear, authentic photos of the actual item</li>
                                <li>Set fair and reasonable prices</li>
                                <li>Specify item condition honestly (new, like new, good, fair, poor)</li>
                                <li>Respond promptly to buyer inquiries</li>
                                <li>Honor commitments to sell at listed prices</li>
                            </ul>
                        </div>

                        {/* 5. Buying Items */}
                        <div className="mb-12">
                            <h2 className="text-3xl font-bold mb-4">5. Buying Items</h2>
                            <p className="text-muted-foreground mb-4">
                                As a buyer, you agree to:
                            </p>
                            <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                                <li>Only make purchases you intend to complete</li>
                                <li>Communicate respectfully with sellers</li>
                                <li>Inspect items before finalizing transactions</li>
                                <li>Complete transactions in safe, public locations on campus</li>
                                <li>Report any issues or disputes promptly</li>
                                <li>Provide honest feedback and ratings after transactions</li>
                            </ul>
                        </div>

                        {/* 6. Transactions and Payments */}
                        <div className="mb-12">
                            <h2 className="text-3xl font-bold mb-4">6. Transactions and Payments</h2>
                            <p className="text-muted-foreground mb-4">
                                UniThrift facilitates connections between buyers and sellers but is not directly
                                involved in transactions. Users are responsible for:
                            </p>
                            <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                                <li>Negotiating payment methods and terms</li>
                                <li>Arranging safe meeting locations for exchanges</li>
                                <li>Verifying item condition before payment</li>
                                <li>Resolving disputes directly with the other party</li>
                            </ul>
                            <p className="text-muted-foreground mt-4">
                                We recommend using secure payment methods and meeting in public, well-lit areas
                                on campus. UniThrift is not liable for any financial losses resulting from transactions.
                            </p>
                        </div>

                        {/* 7. User Conduct */}
                        <div className="mb-12">
                            <h2 className="text-3xl font-bold mb-4">7. User Conduct</h2>
                            <p className="text-muted-foreground mb-4">
                                You agree not to:
                            </p>
                            <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                                <li>Harass, bully, or threaten other users</li>
                                <li>Use the platform for spam or fraudulent activities</li>
                                <li>Create multiple accounts to manipulate ratings or reviews</li>
                                <li>Interfere with or disrupt the platform's operation</li>
                                <li>Attempt to gain unauthorized access to the platform or user accounts</li>
                                <li>Collect or store personal data of other users</li>
                                <li>Use automated systems or bots without authorization</li>
                                <li>Misrepresent your identity or affiliation</li>
                            </ul>
                        </div>

                        {/* 8. Content and Intellectual Property */}
                        <div className="mb-12">
                            <h2 className="text-3xl font-bold mb-4">8. Content and Intellectual Property</h2>
                            <h3 className="text-2xl font-semibold mb-3">8.1 Your Content</h3>
                            <p className="text-muted-foreground mb-4">
                                You retain ownership of content you post on UniThrift (photos, descriptions, etc.).
                                By posting content, you grant UniThrift a non-exclusive, worldwide, royalty-free
                                license to use, display, and distribute your content on the platform.
                            </p>

                            <h3 className="text-2xl font-semibold mb-3 mt-6">8.2 Platform Content</h3>
                            <p className="text-muted-foreground">
                                UniThrift's branding, design, software, and other content are protected by
                                intellectual property laws. You may not copy, modify, or distribute our content
                                without permission.
                            </p>
                        </div>

                        {/* 9. Privacy and Data Protection */}
                        <div className="mb-12">
                            <h2 className="text-3xl font-bold mb-4">9. Privacy and Data Protection</h2>
                            <p className="text-muted-foreground">
                                Your privacy is important to us. Our collection, use, and protection of your
                                personal information is governed by our Privacy Policy. By using UniThrift, you
                                consent to our data practices as described in the Privacy Policy.
                            </p>
                        </div>

                        {/* 10. Safety and Security */}
                        <div className="mb-12">
                            <h2 className="text-3xl font-bold mb-4">10. Safety and Security</h2>
                            <p className="text-muted-foreground mb-4">
                                For your safety:
                            </p>
                            <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                                <li>Always meet in public places on campus</li>
                                <li>Bring a friend if possible</li>
                                <li>Trust your instincts - if something feels wrong, don't proceed</li>
                                <li>Never share sensitive personal or financial information</li>
                                <li>Report suspicious behavior or scams immediately</li>
                                <li>Use campus security resources when needed</li>
                            </ul>
                        </div>

                        {/* 11. Disclaimers */}
                        <div className="mb-12">
                            <h2 className="text-3xl font-bold mb-4">11. Disclaimers</h2>
                            <p className="text-muted-foreground mb-4">
                                UniThrift is provided "as is" without warranties of any kind. We do not:
                            </p>
                            <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                                <li>Guarantee the quality, safety, or legality of items listed</li>
                                <li>Verify the accuracy of user listings or profiles</li>
                                <li>Guarantee completion of any transaction</li>
                                <li>Take responsibility for disputes between users</li>
                                <li>Warrant uninterrupted or error-free service</li>
                            </ul>
                        </div>

                        {/* 12. Limitation of Liability */}
                        <div className="mb-12">
                            <h2 className="text-3xl font-bold mb-4">12. Limitation of Liability</h2>
                            <p className="text-muted-foreground">
                                To the maximum extent permitted by law, UniThrift and its operators shall not be
                                liable for any indirect, incidental, special, consequential, or punitive damages,
                                including but not limited to loss of profits, data, or other intangible losses
                                resulting from your use of the platform or any transactions conducted through it.
                            </p>
                        </div>

                        {/* 13. Indemnification */}
                        <div className="mb-12">
                            <h2 className="text-3xl font-bold mb-4">13. Indemnification</h2>
                            <p className="text-muted-foreground">
                                You agree to indemnify and hold harmless UniThrift, its operators, and affiliates
                                from any claims, damages, losses, or expenses (including legal fees) arising from
                                your use of the platform, violation of these Terms, or infringement of any third-party rights.
                            </p>
                        </div>

                        {/* 14. Account Termination */}
                        <div className="mb-12">
                            <h2 className="text-3xl font-bold mb-4">14. Account Termination</h2>
                            <p className="text-muted-foreground mb-4">
                                We reserve the right to suspend or terminate your account at any time for:
                            </p>
                            <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                                <li>Violation of these Terms</li>
                                <li>Fraudulent or illegal activity</li>
                                <li>Harassment or abuse of other users</li>
                                <li>Multiple complaints or negative ratings</li>
                                <li>Inactivity for extended periods</li>
                            </ul>
                            <p className="text-muted-foreground mt-4">
                                You may also delete your account at any time through your account settings.
                            </p>
                        </div>

                        {/* 15. Dispute Resolution */}
                        <div className="mb-12">
                            <h2 className="text-3xl font-bold mb-4">15. Dispute Resolution</h2>
                            <p className="text-muted-foreground mb-4">
                                In the event of disputes between users:
                            </p>
                            <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                                <li>Users should first attempt to resolve issues directly</li>
                                <li>Report unresolved issues to UniThrift support</li>
                                <li>We may provide mediation assistance but are not obligated to do so</li>
                                <li>Serious violations may result in account suspension or termination</li>
                            </ul>
                        </div>

                        {/* 16. Governing Law */}
                        <div className="mb-12">
                            <h2 className="text-3xl font-bold mb-4">16. Governing Law</h2>
                            <p className="text-muted-foreground">
                                These Terms shall be governed by and construed in accordance with the laws of
                                the jurisdiction where your university is located, without regard to conflict
                                of law provisions.
                            </p>
                        </div>

                        {/* 17. Changes to Terms */}
                        <div className="mb-12">
                            <h2 className="text-3xl font-bold mb-4">17. Changes to Terms</h2>
                            <p className="text-muted-foreground">
                                We may modify these Terms at any time. We will notify users of significant changes
                                via email or platform notification. Your continued use of UniThrift after changes
                                are posted constitutes acceptance of the modified Terms.
                            </p>
                        </div>

                        {/* 18. Contact Information */}
                        <div className="mb-12">
                            <h2 className="text-3xl font-bold mb-4">18. Contact Information</h2>
                            <p className="text-muted-foreground mb-4">
                                If you have questions about these Terms, please contact us at:
                            </p>
                            <div className="bg-muted p-6 rounded-lg">
                                <p className="text-muted-foreground mb-2">
                                    <strong>Email:</strong> support@unithrift.com
                                </p>
                                <p className="text-muted-foreground mb-2">
                                    <strong>Platform:</strong> Through the in-app support feature
                                </p>
                                <p className="text-muted-foreground">
                                    <strong>Response Time:</strong> We aim to respond within 48 hours
                                </p>
                            </div>
                        </div>

                        {/* Acceptance */}
                        <div className="mb-12 p-6 bg-primary/10 rounded-lg border-l-4 border-primary">
                            <h3 className="text-2xl font-bold mb-3">Acceptance</h3>
                            <p className="text-muted-foreground">
                                By using UniThrift, you acknowledge that you have read and understood these
                                Terms of Service and agree to be bound by them. If you do not agree to these
                                Terms, please do not use our platform.
                            </p>
                        </div>

                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
}
