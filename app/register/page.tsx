"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import AuthCard from "@/components/AuthCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { registerSchema } from "../utils/zodSchema";
import { parseWithZod } from "@conform-to/zod";
import { useActionState } from "react";
import { useForm } from "@conform-to/react";
import { registerUser } from "../actions";

export default function Register() {

    const [lastResult, action] = useActionState(registerUser, undefined);
    const [form, fields] = useForm({
        lastResult,
        onValidate({formData}) {
            return parseWithZod(formData,{
                schema: registerSchema,
            })
        }, 
        shouldValidate: "onBlur", //validates when the users clicks out of the input field
        shouldRevalidate: "onInput", //revalidates when the user types in the input field
    });
    const router = useRouter();
    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        studentId: "",
        password: "",
        confirmPassword: "",
    });
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    const [agreedToTerms, setAgreedToTerms] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const getPasswordStrength = (password: string) => {
        if (password.length === 0) return { strength: 0, label: "", color: "" };
        if (password.length < 6) return { strength: 25, label: "Weak", color: "bg-destructive" };
        if (password.length < 10) return { strength: 50, label: "Fair", color: "bg-yellow-500" };
        if (password.length < 14) return { strength: 75, label: "Good", color: "bg-blue-500" };
        return { strength: 100, label: "Strong", color: "bg-green-500" };
    };

    const passwordStrength = getPasswordStrength(formData.password);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        // Validation
        if (!formData.fullName || !formData.email || !formData.password || !formData.confirmPassword) {
            setError("Please fill in all fields");
            return;
        }

        if (formData.password !== formData.confirmPassword) {
            setError("Passwords do not match");
            return;
        }

        if (formData.password.length < 8) {
            setError("Password must be at least 8 characters long");
            return;
        }

        if (!agreedToTerms) {
            setError("Please agree to the terms and conditions");
            return;
        }

        setIsLoading(true);

        // Redirect to Auth0 signup with metadata via middleware
        const params = new URLSearchParams({
            screen_hint: "signup",
            login_hint: formData.email,
        });

        window.location.href = `/auth/login?${params.toString()}`;
    };

    const handleSocialSignup = (provider: string) => {
        window.location.href = `/auth/login?connection=${provider}&screen_hint=signup`;
    };

    return (
        <AuthCard
            title="Join UniThrift"
            subtitle="Create your account to start trading"
        >
            <form onSubmit={handleSubmit} className="space-y-4">
                {/* Full Name Field */}
                <div className="space-y-2">
                    <Label htmlFor="fullName" className="text-sm font-medium">
                        Full Name
                    </Label>
                    <Input
                        id="fullName"
                        name="fullName"
                        type="text"
                        placeholder="John Doe"
                        value={formData.fullName}
                        onChange={handleChange}
                        className="transition-all duration-200 focus:scale-[1.01]"
                        required
                    />
                </div>

                {/* Email Field */}
                <div className="space-y-2">
                    <Label htmlFor="email" className="text-sm font-medium">
                        University Email
                    </Label>
                    <Input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="example@university.ac.za"
                        value={formData.email}
                        onChange={handleChange}
                        className="transition-all duration-200 focus:scale-[1.01]"
                        required
                    />
                </div>

                {/* Password Field */}
                <div className="space-y-2">
                    <Label htmlFor="password" className="text-sm font-medium">
                        Password
                    </Label>
                    <Input
                        id="password"
                        name="password"
                        type="password"
                        placeholder="••••••••"
                        value={formData.password}
                        onChange={handleChange}
                        className="transition-all duration-200 focus:scale-[1.01]"
                        required
                    />
                    {/* Password Strength Indicator */}
                    {formData.password && (
                        <div className="space-y-1">
                            <div className="flex items-center justify-between text-xs">
                                <span className="text-muted-foreground">Password strength:</span>
                                <span className={`font-medium ${passwordStrength.strength === 100 ? "text-green-500" :
                                    passwordStrength.strength >= 75 ? "text-blue-500" :
                                        passwordStrength.strength >= 50 ? "text-yellow-500" :
                                            "text-destructive"
                                    }`}>
                                    {passwordStrength.label}
                                </span>
                            </div>
                            <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                                <div
                                    className={`h-full transition-all duration-300 ${passwordStrength.color}`}
                                    style={{ width: `${passwordStrength.strength}%` }}
                                />
                            </div>
                        </div>
                    )}
                </div>

                {/* Confirm Password Field */}
                <div className="space-y-2">
                    <Label htmlFor="confirmPassword" className="text-sm font-medium">
                        Confirm Password
                    </Label>
                    <Input
                        id="confirmPassword"
                        name="confirmPassword"
                        type="password"
                        placeholder="••••••••"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        className="transition-all duration-200 focus:scale-[1.01]"
                        required
                    />
                </div>

                {/* Terms and Conditions */}
                <div className="flex items-start gap-2">
                    <input
                        type="checkbox"
                        id="terms"
                        checked={agreedToTerms}
                        onChange={(e) => setAgreedToTerms(e.target.checked)}
                        className="mt-1 h-4 w-4 rounded border-border text-primary focus:ring-2 focus:ring-primary/50"
                    />
                    <Label htmlFor="terms" className="text-xs text-muted-foreground leading-relaxed cursor-pointer">
                        I agree to the{" "}
                        <Link href="/terms" className="text-primary hover:text-primary/80 transition-colors">
                            Terms of Service
                        </Link>{" "}
                        and{" "}
                        <Link href="/privacy" className="text-primary hover:text-primary/80 transition-colors">
                            Privacy Policy
                        </Link>
                    </Label>
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
                            Creating account...
                        </span>
                    ) : (
                        "Create Account"
                    )}
                </Button>

                {/* Divider */}
                <div className="relative my-6">
                    <Separator />
                    <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-card px-2 text-xs text-muted-foreground">
                        Or sign up with
                    </span>
                </div>

                {/* Sign In Link */}
                <div className="text-center pt-4">
                    <p className="text-sm text-muted-foreground">
                        Already have an account?{" "}
                        <Link
                            href="/login"
                            className="text-primary font-semibold hover:text-primary/80 transition-colors"
                        >
                            Sign in
                        </Link>
                    </p>
                </div>
            </form>
        </AuthCard>
    );
}
