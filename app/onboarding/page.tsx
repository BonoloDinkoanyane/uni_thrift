"use client";

import { useState } from "react";
import Link from "next/link";
import AuthCard from "@/components/AuthCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { registerSchema } from "../utils/zodSchema";
import { parseWithZod } from "@conform-to/zod";
import { useActionState } from "react";
import { useForm } from "@conform-to/react";
import { registerUser } from "../actions";
import { Card, CardTitle, CardDescription, CardAction, CardContent } from "@/components/ui/card";

export default function Register() {

    const [lastResult, action] = useActionState(registerUser, undefined);
    const [form, fields] = useForm({
        lastResult,
        onValidate({ formData }) {
            return parseWithZod(formData, {
                schema: registerSchema,
            })
        },
        shouldValidate: "onBlur", //validates when the users clicks out of the input field
        shouldRevalidate: "onInput", //revalidates when the user types in the input field
    });

    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        studentId: "",
        password: "",
        confirmPassword: "",
    });
    
    const [isLoading, setIsLoading] = useState(false);
    const [agreedToTerms, setAgreedToTerms] = useState(false);

    const getPasswordStrength = (password: string) => {
        if (password.length === 0) return { strength: 0, label: "", color: "" };
        if (password.length < 6) return { strength: 25, label: "Weak", color: "bg-destructive" };
        if (password.length < 10) return { strength: 50, label: "Fair", color: "bg-yellow-500" };
        if (password.length < 14) return { strength: 75, label: "Good", color: "bg-blue-500" };
        return { strength: 100, label: "Strong", color: "bg-green-500" };
    };

    const passwordStrength = getPasswordStrength(formData.password);

    return (
        <AuthCard
            title="Join UniThrift"
            subtitle="Create your account to start trading"
        >
            <form 
             action = {action}
             onSubmit={form.onSubmit} 
             className="space-y-4"
             id = {form.id}
             noValidate
             >
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
