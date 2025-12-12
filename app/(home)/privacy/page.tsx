import Footer from "@/app/components/Footer"

export default function PrivacyPage() {
    return (
        <div className="min-h-screen bg-background">
            {/* Hero Header */}
            <section className="relative pt-32 pb-16 overflow-hidden">
                <div className="absolute inset-0 bg-linear-to-br from-primary/10 via-secondary/10 to-accent/10 -z-10" />
                <div className="absolute top-20 right-10 w-96 h-96 bg-primary/20 rounded-full blur-3xl -z-10" />

                <div className="container mx-auto px-4 text-center">
                    <h1 className="text-5xl md:text-7xl font-black mb-6">
                        Privacy <span className="text-primary">Policy</span>
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
                            <h2 className="text-3xl font-bold mb-4">Our Commitment to Your Privacy</h2>
                            <p className="text-muted-foreground">
                                At UniThrift, we take your privacy seriously. This Privacy Policy explains how we
                                collect, use, disclose, and safeguard your information when you use our peer-to-peer
                                marketplace platform. Please read this policy carefully to understand our practices
                                regarding your personal data.
                            </p>
                        </div>

                        {/* 1. Information We Collect */}
                        <div className="mb-12">
                            <h2 className="text-3xl font-bold mb-4">1. Information We Collect</h2>

                            <h3 className="text-2xl font-semibold mb-3 mt-6">1.1 Information You Provide</h3>
                            <p className="text-muted-foreground mb-4">
                                When you create an account and use UniThrift, you provide us with:
                            </p>
                            <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                                <li><strong>Account Information:</strong> Name, university email address, student ID verification, campus affiliation</li>
                                <li><strong>Profile Information:</strong> Profile photo, bio, preferred contact methods</li>
                                <li><strong>Listing Information:</strong> Item descriptions, photos, prices, categories</li>
                                <li><strong>Communication Data:</strong> Messages exchanged with other users through the platform</li>
                                <li><strong>Transaction History:</strong> Records of items bought and sold</li>
                                <li><strong>Feedback and Ratings:</strong> Reviews and ratings you give or receive</li>
                            </ul>

                            <h3 className="text-2xl font-semibold mb-3 mt-6">1.2 Automatically Collected Information</h3>
                            <p className="text-muted-foreground mb-4">
                                When you use our platform, we automatically collect:
                            </p>
                            <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                                <li><strong>Device Information:</strong> Device type, operating system, browser type, unique device identifiers</li>
                                <li><strong>Usage Data:</strong> Pages visited, features used, time spent on platform, search queries</li>
                                <li><strong>Location Data:</strong> General location (campus/city level) to show relevant listings</li>
                                <li><strong>Log Data:</strong> IP address, access times, error logs</li>
                                <li><strong>Cookies and Similar Technologies:</strong> Session data, preferences, authentication tokens</li>
                            </ul>

                            <h3 className="text-2xl font-semibold mb-3 mt-6">1.3 Information from Third Parties</h3>
                            <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                                <li><strong>University Verification:</strong> Confirmation of student status from your institution</li>
                                <li><strong>Authentication Providers:</strong> If you sign in with Google or other services</li>
                                <li><strong>Analytics Services:</strong> Aggregated usage statistics and platform performance metrics</li>
                            </ul>
                        </div>

                        {/* 2. How We Use Your Information */}
                        <div className="mb-12">
                            <h2 className="text-3xl font-bold mb-4">2. How We Use Your Information</h2>
                            <p className="text-muted-foreground mb-4">
                                We use your information to:
                            </p>

                            <h3 className="text-2xl font-semibold mb-3 mt-6">2.1 Provide and Improve Services</h3>
                            <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                                <li>Create and manage your account</li>
                                <li>Display your listings to other users in your campus community</li>
                                <li>Facilitate communication between buyers and sellers</li>
                                <li>Process and display user ratings and reviews</li>
                                <li>Provide customer support and respond to inquiries</li>
                                <li>Improve platform functionality and user experience</li>
                                <li>Develop new features and services</li>
                            </ul>

                            <h3 className="text-2xl font-semibold mb-3 mt-6">2.2 Safety and Security</h3>
                            <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                                <li>Verify student status and prevent unauthorized access</li>
                                <li>Detect and prevent fraud, scams, and abuse</li>
                                <li>Monitor and investigate suspicious activity</li>
                                <li>Enforce our Terms of Service</li>
                                <li>Protect users' safety and platform integrity</li>
                                <li>Resolve disputes between users</li>
                            </ul>

                            <h3 className="text-2xl font-semibold mb-3 mt-6">2.3 Communication</h3>
                            <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                                <li>Send transaction-related notifications</li>
                                <li>Provide updates about your account and listings</li>
                                <li>Share platform updates and new features</li>
                                <li>Send promotional content (with your consent)</li>
                                <li>Respond to your questions and feedback</li>
                            </ul>

                            <h3 className="text-2xl font-semibold mb-3 mt-6">2.4 Analytics and Research</h3>
                            <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                                <li>Analyze usage patterns and trends</li>
                                <li>Measure platform performance and effectiveness</li>
                                <li>Conduct market research to better serve students</li>
                                <li>Generate aggregated, de-identified statistics</li>
                            </ul>
                        </div>

                        {/* 3. How We Share Your Information */}
                        <div className="mb-12">
                            <h2 className="text-3xl font-bold mb-4">3. How We Share Your Information</h2>

                            <h3 className="text-2xl font-semibold mb-3">3.1 Public Information</h3>
                            <p className="text-muted-foreground mb-4">
                                The following information is visible to other verified users on your campus:
                            </p>
                            <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                                <li>Your name and profile photo</li>
                                <li>Your bio and campus affiliation</li>
                                <li>Your active listings (with item photos and descriptions)</li>
                                <li>Your ratings and reviews (as buyer and seller)</li>
                                <li>Public activity (number of items sold, account age)</li>
                            </ul>

                            <h3 className="text-2xl font-semibold mb-3 mt-6">3.2 With Your Consent</h3>
                            <p className="text-muted-foreground">
                                We may share information when you explicitly authorize us to do so, such as when
                                you choose to connect with third-party services or share listings on social media.
                            </p>

                            <h3 className="text-2xl font-semibold mb-3 mt-6">3.3 Service Providers</h3>
                            <p className="text-muted-foreground mb-4">
                                We share information with trusted third-party service providers who help us operate UniThrift:
                            </p>
                            <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                                <li>Cloud hosting and storage providers</li>
                                <li>Email and communication services</li>
                                <li>Analytics and performance monitoring tools</li>
                                <li>Customer support platforms</li>
                                <li>Security and fraud prevention services</li>
                            </ul>
                            <p className="text-muted-foreground mt-4">
                                These providers are contractually obligated to protect your data and use it only
                                for the purposes we specify.
                            </p>

                            <h3 className="text-2xl font-semibold mb-3 mt-6">3.4 Legal Requirements</h3>
                            <p className="text-muted-foreground mb-4">
                                We may disclose your information if required by law or in response to:
                            </p>
                            <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                                <li>Legal processes (subpoenas, court orders)</li>
                                <li>Law enforcement requests</li>
                                <li>Protection of our rights and property</li>
                                <li>Prevention of illegal activity or harm to others</li>
                                <li>Emergency situations involving safety risks</li>
                            </ul>

                            <h3 className="text-2xl font-semibold mb-3 mt-6">3.5 Business Transfers</h3>
                            <p className="text-muted-foreground">
                                If UniThrift is involved in a merger, acquisition, or sale of assets, your
                                information may be transferred as part of that transaction. We will notify you
                                of any such change in ownership or control of your personal information.
                            </p>
                        </div>

                        {/* 4. Data Security */}
                        <div className="mb-12">
                            <h2 className="text-3xl font-bold mb-4">4. Data Security</h2>
                            <p className="text-muted-foreground mb-4">
                                We implement industry-standard security measures to protect your information:
                            </p>
                            <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                                <li><strong>Encryption:</strong> Data is encrypted in transit (SSL/TLS) and at rest</li>
                                <li><strong>Access Controls:</strong> Limited employee access to personal data</li>
                                <li><strong>Regular Audits:</strong> Security reviews and vulnerability assessments</li>
                                <li><strong>Secure Infrastructure:</strong> Protected servers and databases</li>
                                <li><strong>Authentication:</strong> Secure login with university email verification</li>
                                <li><strong>Monitoring:</strong> Continuous monitoring for security threats</li>
                            </ul>
                            <p className="text-muted-foreground mt-4">
                                However, no method of transmission over the Internet is 100% secure. While we
                                strive to protect your data, we cannot guarantee absolute security.
                            </p>
                        </div>

                        {/* 5. Your Privacy Rights and Choices */}
                        <div className="mb-12">
                            <h2 className="text-3xl font-bold mb-4">5. Your Privacy Rights and Choices</h2>

                            <h3 className="text-2xl font-semibold mb-3">5.1 Access and Update</h3>
                            <p className="text-muted-foreground mb-4">
                                You can access and update your information through your account settings:
                            </p>
                            <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                                <li>View and edit your profile information</li>
                                <li>Update your contact preferences</li>
                                <li>Manage your listings and transaction history</li>
                                <li>Review your ratings and feedback</li>
                            </ul>

                            <h3 className="text-2xl font-semibold mb-3 mt-6">5.2 Data Portability</h3>
                            <p className="text-muted-foreground">
                                You can request a copy of your data in a portable format by contacting our
                                support team. We will provide your information in a commonly used, machine-readable format.
                            </p>

                            <h3 className="text-2xl font-semibold mb-3 mt-6">5.3 Deletion</h3>
                            <p className="text-muted-foreground mb-4">
                                You have the right to request deletion of your account and personal data:
                            </p>
                            <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                                <li>Delete your account through account settings</li>
                                <li>Request complete data deletion via support</li>
                                <li>We will delete your data within 30 days, except where retention is required by law</li>
                                <li>Some information may be retained in backups for a limited period</li>
                                <li>Public reviews may remain visible but will be anonymized</li>
                            </ul>

                            <h3 className="text-2xl font-semibold mb-3 mt-6">5.4 Communication Preferences</h3>
                            <p className="text-muted-foreground mb-4">
                                You can control what communications you receive:
                            </p>
                            <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                                <li>Opt out of promotional emails (unsubscribe links provided)</li>
                                <li>Manage push notification settings in your device or app settings</li>
                                <li>Note: You cannot opt out of essential service communications</li>
                            </ul>

                            <h3 className="text-2xl font-semibold mb-3 mt-6">5.5 Cookies and Tracking</h3>
                            <p className="text-muted-foreground">
                                You can control cookies through your browser settings. Note that disabling cookies
                                may affect platform functionality.
                            </p>
                        </div>

                        {/* 6. Data Retention */}
                        <div className="mb-12">
                            <h2 className="text-3xl font-bold mb-4">6. Data Retention</h2>
                            <p className="text-muted-foreground mb-4">
                                We retain your information for different periods depending on the type of data:
                            </p>
                            <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                                <li><strong>Account Data:</strong> Until you delete your account or request deletion</li>
                                <li><strong>Transaction Records:</strong> For a reasonable period to resolve disputes and comply with legal obligations</li>
                                <li><strong>Communication Logs:</strong> For the duration of your account plus a retention period for legal compliance</li>
                                <li><strong>Analytics Data:</strong> Aggregated and anonymized indefinitely</li>
                                <li><strong>Legal Compliance Data:</strong> As required by applicable laws and regulations</li>
                            </ul>
                        </div>

                        {/* 7. Children's Privacy */}
                        <div className="mb-12">
                            <h2 className="text-3xl font-bold mb-4">7. Children's Privacy</h2>
                            <p className="text-muted-foreground">
                                UniThrift is intended for university students who are at least 18 years old. We do
                                not knowingly collect information from children under 18 without parental consent.
                                If you are under 18, you must have your parent or guardian's permission to use UniThrift.
                                If we become aware that we have collected information from a child under 18 without
                                proper consent, we will take steps to delete that information.
                            </p>
                        </div>

                        {/* 8. International Users */}
                        <div className="mb-12">
                            <h2 className="text-3xl font-bold mb-4">8. International Users</h2>
                            <p className="text-muted-foreground">
                                UniThrift operates within specific university campuses. Your information is stored
                                and processed in data centers that may be located in different countries. By using
                                UniThrift, you consent to the transfer of your information to these locations.
                                We ensure appropriate safeguards are in place to protect your data in accordance
                                with this Privacy Policy.
                            </p>
                        </div>

                        {/* 9. Third-Party Links */}
                        <div className="mb-12">
                            <h2 className="text-3xl font-bold mb-4">9. Third-Party Links and Services</h2>
                            <p className="text-muted-foreground">
                                UniThrift may contain links to third-party websites or services. We are not
                                responsible for the privacy practices of these third parties. We encourage you
                                to read their privacy policies before providing any information to them.
                            </p>
                        </div>

                        {/* 10. California Privacy Rights */}
                        <div className="mb-12">
                            <h2 className="text-3xl font-bold mb-4">10. California Privacy Rights (CCPA)</h2>
                            <p className="text-muted-foreground mb-4">
                                If you are a California resident, you have additional rights under the California
                                Consumer Privacy Act (CCPA):
                            </p>
                            <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                                <li><strong>Right to Know:</strong> Request information about data collection and use</li>
                                <li><strong>Right to Delete:</strong> Request deletion of your personal information</li>
                                <li><strong>Right to Opt-Out:</strong> Opt out of the sale of personal information (Note: We do not sell personal information)</li>
                                <li><strong>Right to Non-Discrimination:</strong> Equal service regardless of privacy rights exercise</li>
                            </ul>
                            <p className="text-muted-foreground mt-4">
                                To exercise these rights, please contact us using the information provided in the
                                "Contact Us" section.
                            </p>
                        </div>

                        {/* 11. European Union Privacy Rights (GDPR) */}
                        <div className="mb-12">
                            <h2 className="text-3xl font-bold mb-4">11. European Union Privacy Rights (GDPR)</h2>
                            <p className="text-muted-foreground mb-4">
                                If you are in the European Union, you have rights under the General Data Protection
                                Regulation (GDPR):
                            </p>
                            <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                                <li><strong>Right of Access:</strong> Request copies of your personal data</li>
                                <li><strong>Right to Rectification:</strong> Request correction of inaccurate data</li>
                                <li><strong>Right to Erasure:</strong> Request deletion of your data</li>
                                <li><strong>Right to Restrict Processing:</strong> Request limited processing of your data</li>
                                <li><strong>Right to Data Portability:</strong> Receive your data in a portable format</li>
                                <li><strong>Right to Object:</strong> Object to processing of your data</li>
                                <li><strong>Rights Related to Automated Decision-Making:</strong> Not be subject to fully automated decisions</li>
                            </ul>
                        </div>

                        {/* 12. South African Privacy Rights (POPI Act) */}
                        <div className="mb-12">
                            <h2 className="text-3xl font-bold mb-4">12. South African Privacy Rights (POPI Act)</h2>
                            <p className="text-muted-foreground mb-4">
                                If you are in South Africa, your personal information is protected under the Protection
                                of Personal Information Act, 2013 (POPI Act). UniThrift is committed to complying with
                                POPI Act requirements when processing your personal information.
                            </p>

                            <h3 className="text-2xl font-semibold mb-3">12.1 Lawful Processing</h3>
                            <p className="text-muted-foreground mb-4">
                                We process your personal information lawfully and in accordance with the following conditions:
                            </p>
                            <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                                <li><strong>Accountability:</strong> We take responsibility for all personal information under our control</li>
                                <li><strong>Processing Limitation:</strong> We only process information that is adequate, relevant, and not excessive for our purposes</li>
                                <li><strong>Purpose Specification:</strong> We collect information for specific, explicitly defined, and lawful purposes</li>
                                <li><strong>Further Processing Limitation:</strong> We don't use your information for purposes incompatible with why we collected it</li>
                                <li><strong>Information Quality:</strong> We ensure information is complete, accurate, not misleading, and updated when necessary</li>
                                <li><strong>Openness:</strong> We maintain this Privacy Policy to inform you about our data practices</li>
                                <li><strong>Security Safeguards:</strong> We implement appropriate technical and organizational measures to secure your information</li>
                                <li><strong>Data Subject Participation:</strong> You have rights to access and correct your personal information</li>
                            </ul>

                            <h3 className="text-2xl font-semibold mb-3 mt-6">12.2 Your POPI Act Rights</h3>
                            <p className="text-muted-foreground mb-4">
                                As a South African data subject, you have the right to:
                            </p>
                            <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                                <li><strong>Be Notified:</strong> Know whether we hold personal information about you and request access to it</li>
                                <li><strong>Request Correction:</strong> Have incomplete, inaccurate, or misleading information corrected</li>
                                <li><strong>Request Deletion:</strong> Request destruction or deletion of your personal information in certain circumstances</li>
                                <li><strong>Object to Processing:</strong> Object to the processing of your personal information on reasonable grounds</li>
                                <li><strong>Object to Direct Marketing:</strong> Opt out of receiving direct marketing communications at any time</li>
                                <li><strong>Request Data Transfer:</strong> Request that we transfer your information to another responsible party</li>
                                <li><strong>Not Be Subject to Automated Decisions:</strong> Challenge decisions made solely by automated processing that affects you</li>
                                <li><strong>Lodge a Complaint:</strong> Submit a complaint to the Information Regulator if you believe we've violated the POPI Act</li>
                            </ul>

                            <h3 className="text-2xl font-semibold mb-3 mt-6">12.3 Special Personal Information</h3>
                            <p className="text-muted-foreground mb-4">
                                We do not generally process special personal information (such as race, health data, religious beliefs,
                                or biometric information) unless:
                            </p>
                            <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                                <li>Required by law</li>
                                <li>You have provided explicit consent</li>
                                <li>Processing is necessary for a legitimate purpose and authorized under the POPI Act</li>
                            </ul>

                            <h3 className="text-2xl font-semibold mb-3 mt-6">12.4 Cross-Border Data Transfers</h3>
                            <p className="text-muted-foreground mb-4">
                                If we transfer your personal information outside of South Africa, we ensure that:
                            </p>
                            <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                                <li>The recipient country has adequate data protection laws, or</li>
                                <li>We have appropriate safeguards in place (such as binding corporate rules or standard data protection clauses), or</li>
                                <li>You have consented to the transfer, or</li>
                                <li>The transfer is necessary for the performance of a contract or for your benefit</li>
                            </ul>

                            <h3 className="text-2xl font-semibold mb-3 mt-6">12.5 Information Officer</h3>
                            <p className="text-muted-foreground mb-4">
                                We have designated an Information Officer responsible for POPI Act compliance:
                            </p>
                            <div className="bg-muted p-6 rounded-lg">
                                <p className="text-muted-foreground mb-2">
                                    <strong>Information Officer:</strong> UniThrift POPI Compliance
                                </p>
                                <p className="text-muted-foreground mb-2">
                                    <strong>Email:</strong> popi@unithrift.com
                                </p>
                                <p className="text-muted-foreground">
                                    <strong>Alternative Contact:</strong> privacy@unithrift.com
                                </p>
                            </div>

                            <h3 className="text-2xl font-semibold mb-3 mt-6">12.6 How to Exercise Your Rights</h3>
                            <p className="text-muted-foreground mb-4">
                                To exercise any of your POPI Act rights, please:
                            </p>
                            <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                                <li>Submit a written request to our Information Officer at popi@unithrift.com</li>
                                <li>Provide sufficient detail to enable us to identify you and locate your information</li>
                                <li>Specify the right you wish to exercise and your preferred outcome</li>
                            </ul>
                            <p className="text-muted-foreground mt-4">
                                We will respond to your request within 30 days. If we need more time, we will inform you
                                and provide reasons for the delay. We may charge a reasonable fee for processing requests
                                in accordance with the POPI Act regulations.
                            </p>

                            <h3 className="text-2xl font-semibold mb-3 mt-6">12.7 Right to Complain</h3>
                            <p className="text-muted-foreground mb-4">
                                If you believe we have not complied with the POPI Act, you may lodge a complaint with:
                            </p>
                            <div className="bg-muted p-6 rounded-lg">
                                <p className="text-muted-foreground mb-2">
                                    <strong>The Information Regulator (South Africa)</strong>
                                </p>
                                <p className="text-muted-foreground mb-2">
                                    <strong>Email:</strong> inforeg@justice.gov.za
                                </p>
                                <p className="text-muted-foreground mb-2">
                                    <strong>Website:</strong> https://inforegulator.org.za
                                </p>
                                <p className="text-muted-foreground">
                                    <strong>Complaints:</strong> POPIAComplaints@inforegulator.org.za
                                </p>
                            </div>
                        </div>

                        {/* 13. Changes to This Privacy Policy */}
                        <div className="mb-12">
                            <h2 className="text-3xl font-bold mb-4">13. Changes to This Privacy Policy</h2>
                            <p className="text-muted-foreground">
                                We may update this Privacy Policy from time to time to reflect changes in our
                                practices, technology, legal requirements, or other factors. We will notify you
                                of significant changes by:
                            </p>
                            <ul className="list-disc pl-6 text-muted-foreground space-y-2 mt-4">
                                <li>Posting the updated policy on our platform</li>
                                <li>Sending you an email notification</li>
                                <li>Displaying a prominent notice on the platform</li>
                            </ul>
                            <p className="text-muted-foreground mt-4">
                                Your continued use of UniThrift after changes are posted constitutes acceptance
                                of the updated Privacy Policy.
                            </p>
                        </div>

                        {/* 14. Contact Us */}
                        <div className="mb-12">
                            <h2 className="text-3xl font-bold mb-4">14. Contact Us</h2>
                            <p className="text-muted-foreground mb-4">
                                If you have questions, concerns, or requests regarding this Privacy Policy or
                                our data practices, please contact us:
                            </p>
                            <div className="bg-muted p-6 rounded-lg">
                                <p className="text-muted-foreground mb-2">
                                    <strong>Privacy Team Email:</strong> privacy@unithrift.com
                                </p>
                                <p className="text-muted-foreground mb-2">
                                    <strong>General Support:</strong> support@unithrift.com
                                </p>
                                <p className="text-muted-foreground mb-2">
                                    <strong>Platform:</strong> Through the in-app support feature
                                </p>
                                <p className="text-muted-foreground">
                                    <strong>Response Time:</strong> We aim to respond to privacy inquiries within 48 hours
                                </p>
                            </div>
                        </div>

                        {/* Data Protection Commitment */}
                        <div className="mb-12 p-6 bg-primary/10 rounded-lg border-l-4 border-primary">
                            <h3 className="text-2xl font-bold mb-3">Our Commitment</h3>
                            <p className="text-muted-foreground">
                                At UniThrift, protecting your privacy is fundamental to our mission of creating a
                                safe, trustworthy marketplace for students. We are committed to transparency,
                                security, and giving you control over your personal information. We will continue
                                to evolve our practices to meet the highest standards of data protection while
                                providing you with the best possible service.
                            </p>
                        </div>

                        {/* Summary of Key Points */}
                        <div className="mb-12">
                            <h2 className="text-3xl font-bold mb-4">Summary of Key Points</h2>
                            <div className="bg-muted/50 p-6 rounded-lg">
                                <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                                    <li>We collect information you provide and usage data to operate the platform</li>
                                    <li>We use your data to facilitate transactions and improve services</li>
                                    <li>We share limited information with other users and trusted service providers</li>
                                    <li>We implement strong security measures to protect your data</li>
                                    <li>You have rights to access, update, and delete your information</li>
                                    <li>We do not sell your personal information to third parties</li>
                                    <li>We retain data only as long as necessary for legitimate purposes</li>
                                    <li>You can contact us anytime with privacy questions or concerns</li>
                                </ul>
                            </div>
                        </div>

                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
}
