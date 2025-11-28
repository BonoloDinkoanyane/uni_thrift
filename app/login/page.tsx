"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import AuthCard from "@/components/AuthCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";

export default function LoginPage() {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        // Basic validation
        if (!email || !password) {
            setError("Please fill in all fields");
            return;
        }

        setIsLoading(true);

        // Redirect to Auth0 login via middleware
        window.location.href = "/auth/login";
    };

    const handleSocialLogin = (provider: string) => {
        window.location.href = `/auth/login?connection=${provider}`;
    };

    return (
        <AuthCard
            title="Welcome Back"
            subtitle="Sign in to your UniThrift account"
        >
            <form onSubmit={handleSubmit} className="space-y-4">
                {/* Email Field */}
                <div className="space-y-2">
                    <Label htmlFor="email" className="text-sm font-medium">
                        Email Address
                    </Label>
                    <Input
                        id="email"
                        type="email"
                        placeholder="you@university.edu"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="transition-all duration-200 focus:scale-[1.01]"
                        required
                    />
                </div>

                {/* Password Field */}
                <div className="space-y-2">
                    <div className="flex items-center justify-between">
                        <Label htmlFor="password" className="text-sm font-medium">
                            Password
                        </Label>
                        <Link
                            href="/forgot-password"
                            className="text-xs text-primary hover:text-primary/80 transition-colors"
                        >
                            Forgot password?
                        </Link>
                    </div>
                    <Input
                        id="password"
                        type="password"
                        placeholder="••••••••"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="transition-all duration-200 focus:scale-[1.01]"
                        required
                    />
                </div>

                {/* Error Message */}
                {error && (
                    <div className="text-destructive text-sm bg-destructive/10 border border-destructive/20 rounded-md p-3">
                        {error}
                    </div>
                )}

                {/* Submit Button */}
                <Button
                    type="submit"
                    className="w-full h-11 text-base font-semibold shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-[1.02]"
                    disabled={isLoading}
                >
                    {isLoading ? (
                        <span className="flex items-center gap-2">
                            <span className="h-4 w-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                            Signing in...
                        </span>
                    ) : (
                        "Sign In"
                    )}
                </Button>

                {/* Divider */}
                <div className="relative my-6">
                    <Separator />
                    <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-card px-2 text-xs text-muted-foreground">
                        Or continue with
                    </span>
                </div>

                {/* Sign Up Link */}
                <div className="text-center pt-4">
                    <p className="text-sm text-muted-foreground">
                        Don't have an account?{" "}
                        <Link
                            href="/register"
                            className="text-primary font-semibold hover:text-primary/80 transition-colors"
                        >
                            Sign up
                        </Link>
                    </p>
                </div>
            </form>
        </AuthCard>
    );
}
