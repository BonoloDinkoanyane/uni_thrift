import Link from "next/link";
import { Facebook, Twitter, Instagram, Mail, MapPin, Phone } from "lucide-react";

export default function Footer() {
    return (
        <footer className="bg-card border-t border-border">
            <div className="container mx-auto px-4 py-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
                    {/* Brand */}
                    <div>
                        <h3 className="text-2xl font-black bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-4">
                            UniThrift
                        </h3>
                        <p className="text-muted-foreground mb-4 leading-relaxed">
                            The #1 student marketplace for buying, selling, and swapping on campus.
                            Built by students, for students.
                        </p>
                        <div className="flex gap-3">
                            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-muted hover:bg-primary hover:text-primary-foreground rounded-full flex items-center justify-center transition-all hover:scale-110">
                                <Facebook className="w-5 h-5" />
                            </a>
                            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-muted hover:bg-primary hover:text-primary-foreground rounded-full flex items-center justify-center transition-all hover:scale-110">
                                <Twitter className="w-5 h-5" />
                            </a>
                            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-muted hover:bg-primary hover:text-primary-foreground rounded-full flex items-center justify-center transition-all hover:scale-110">
                                <Instagram className="w-5 h-5" />
                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="font-bold text-lg mb-4">Quick Links</h4>
                        <ul className="space-y-2">
                            <li>
                                <Link href="/browse" className="text-muted-foreground hover:text-primary transition-colors">
                                    Browse Items
                                </Link>
                            </li>
                            <li>
                                <Link href="/register" className="text-muted-foreground hover:text-primary transition-colors">
                                    Sign Up
                                </Link>
                            </li>
                            <li>
                                <Link href="/login" className="text-muted-foreground hover:text-primary transition-colors">
                                    Login
                                </Link>
                            </li>
                            <li>
                                <Link href="/#how-it-works" className="text-muted-foreground hover:text-primary transition-colors">
                                    How It Works
                                </Link>
                            </li>
                            <li>
                                <Link href="/faq" className="text-muted-foreground hover:text-primary transition-colors">
                                    FAQ
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Support */}
                    <div>
                        <h4 className="font-bold text-lg mb-4">Support</h4>
                        <ul className="space-y-2">
                            <li>
                                <Link href="/help" className="text-muted-foreground hover:text-primary transition-colors">
                                    Help Center
                                </Link>
                            </li>
                            <li>
                                <Link href="/safety" className="text-muted-foreground hover:text-primary transition-colors">
                                    Safety Tips
                                </Link>
                            </li>
                            <li>
                                <Link href="/terms" className="text-muted-foreground hover:text-primary transition-colors">
                                    Terms of Service
                                </Link>
                            </li>
                            <li>
                                <Link href="/privacy" className="text-muted-foreground hover:text-primary transition-colors">
                                    Privacy Policy
                                </Link>
                            </li>
                            <li>
                                <Link href="/contact" className="text-muted-foreground hover:text-primary transition-colors">
                                    Contact Us
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h4 className="font-bold text-lg mb-4">Get in Touch</h4>
                        <ul className="space-y-3">
                            <li className="flex items-start gap-3 text-muted-foreground">
                                <Mail className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                                <a href="mailto:support@unithrift.com" className="hover:text-primary transition-colors">
                                    support@unithrift.com
                                </a>
                            </li>
                            <li className="flex items-start gap-3 text-muted-foreground">
                                <Phone className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                                <span>1-800-UNI-SHOP</span>
                            </li>
                            <li className="flex items-start gap-3 text-muted-foreground">
                                <MapPin className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                                <span>Available on 250+ campuses nationwide</span>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="border-t border-border pt-8">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                        <p className="text-muted-foreground text-sm">
                            © {new Date().getFullYear()} UniThrift. All rights reserved. Made with ❤️ for students.
                        </p>
                        <div className="flex gap-6 text-sm">
                            <Link href="/terms" className="text-muted-foreground hover:text-primary transition-colors">
                                Terms
                            </Link>
                            <Link href="/privacy" className="text-muted-foreground hover:text-primary transition-colors">
                                Privacy
                            </Link>
                            <Link href="/cookies" className="text-muted-foreground hover:text-primary transition-colors">
                                Cookies
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}
