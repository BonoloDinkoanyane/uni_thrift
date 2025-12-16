"use client";

import { useState } from "react";
import Link from "next/link";
import AuthCard from "@/components/AuthCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { signIn, signUp } from "@/app/actions";
import { Eye, EyeOff } from "lucide-react";
import { createLogger } from "@/lib/logger";

const logger = createLogger("LoginPage");

type AuthMode = "signin" | "signup";

export default function LoginPage() {

    const [mode, setMode] = useState<AuthMode>("signin");
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    // Sign In fields
    const [identifier, setIdentifier] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    // Sign Up fields
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [signupPassword, setSignupPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showSignupPassword, setShowSignupPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const getPasswordStrength = (password: string) => {
        if (password.length === 0) return { strength: 0, label: "", color: "" };
        if (password.length < 6) return { strength: 25, label: "Weak", color: "bg-destructive" };
        if (password.length < 10) return { strength: 50, label: "Fair", color: "bg-yellow-500" };
        if (password.length < 14) return { strength: 75, label: "Good", color: "bg-blue-500" };
        return { strength: 100, label: "Strong", color: "bg-green-500" };
    };

    const passwordStrength = getPasswordStrength(signupPassword);

    const handleSignIn = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setSuccess("");

        // Basic validation
        if (!identifier || !password) {
            setError("Please fill in all fields");
            return;
        }

        setIsLoading(true);
        logger.info("Sign in attempt", { identifier });

        try {
            const result = await signIn({ identifier, password });

            if (result?.error) {
                setError(result.error);
                logger.warn("Sign in failed", { error: result.error });
            } else {
                setSuccess("Sign in successful! Redirecting...");
                logger.info("Sign in successful", { identifier });
                // signIn action handles redirect
            }
        } catch (error) {
            // Check if this is a Next.js redirect (which is expected)
            if (error instanceof Error && error.message === "NEXT_REDIRECT") {
                throw error; // Re-throw to allow redirect to proceed
            }
            logger.error(error, { operation: "signIn" });
            setError("An unexpected error occurred. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    const handleSignUp = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setSuccess("");

        // Basic validation
        if (!username || !email || !signupPassword || !confirmPassword) {
            setError("Please fill in all fields");
            return;
        }

        // Password match validation
        if (signupPassword !== confirmPassword) {
            setError("Passwords do not match");
            return;
        }

        // Email validation (university email)
        if (!email.endsWith(".edu.za") && !email.endsWith(".ac.za")) {
            setError("Please use a valid university email (.edu.za or .ac.za)");
            return;
        }

        setIsLoading(true);
        logger.info("Sign up attempt", { username, email });

        try {
            const result = await signUp({
                username,
                email,
                password: signupPassword,
            });

            // Check if result is an object with error property
            if (result && typeof result === "object" && "error" in result) {
                setError(result.error);
                logger.warn("Sign up failed", { error: result.error });
            } else if (typeof result === "string") {
                // Handle "Account already exists" string response
                setError(result);
                logger.warn("Sign up failed", { error: result });
            } else {
                setSuccess("Account created successfully! Redirecting...");
                logger.info("Sign up successful", { username, email });
                // signUp action handles redirect
            }
        } catch (error) {
            // Check if this is a Next.js redirect (which is expected)
            if (error instanceof Error && error.message === "NEXT_REDIRECT") {
                throw error; // Re-throw to allow redirect to proceed
            }
            logger.error(error, { operation: "signUp" });
            setError("An unexpected error occurred. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    const switchMode = (newMode: AuthMode) => {
        setMode(newMode);
        setError("");
        setSuccess("");
        // Reset all fields
        setIdentifier("");
        setPassword("");
        setUsername("");
        setEmail("");
        setSignupPassword("");
        setConfirmPassword("");
    };

    return (
        <AuthCard
            title={mode === "signin" ? "Welcome Back" : "Join UniThrift"}
            subtitle={
                mode === "signin"
                    ? "Sign in to your UniThrift account"
                    : "Create your account to start trading"
            }
        >
            {/* Tab Navigation */}
            <div className="flex gap-2 mb-6 p-1 bg-muted/50 rounded-lg">
                <button
                    type="button"
                    onClick={() => switchMode("signin")}
                    className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all duration-200 ${mode === "signin"
                        ? "bg-background shadow-sm text-foreground"
                        : "text-muted-foreground hover:text-foreground"
                        }`}
                >
                    Sign In
                </button>
                <button
                    type="button"
                    onClick={() => switchMode("signup")}
                    className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all duration-200 ${mode === "signup"
                        ? "bg-background shadow-sm text-foreground"
                        : "text-muted-foreground hover:text-foreground"
                        }`}
                >
                    Sign Up
                </button>
            </div>

            {/* Sign In Form */}
            {mode === "signin" && (
                <form onSubmit={handleSignIn} className="space-y-4">
                    {/* Identifier Field */}
                    <div className="space-y-2">
                        <Label htmlFor="identifier" className="text-sm font-medium">
                            Email or Username
                        </Label>
                        <Input
                            id="identifier"
                            type="text"
                            placeholder="your@university.edu or username"
                            value={identifier}
                            onChange={(e) => setIdentifier(e.target.value)}
                            className="transition-all duration-200 focus:scale-[1.01]"
                            autoComplete="username"
                            required
                            disabled={isLoading}
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
                        <div className="relative">
                            <Input
                                id="password"
                                type={showPassword ? "text" : "password"}
                                placeholder="••••••••"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="transition-all duration-200 focus:scale-[1.01] pr-12"
                                autoComplete="current-password"
                                required
                                disabled={isLoading}
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                                disabled={isLoading}
                            >
                                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                            </button>
                        </div>
                    </div>

                    {/* Error/Success Message */}
                    {error && (
                        <div className="text-destructive text-sm bg-destructive/10 border border-destructive/20 rounded-md p-3">
                            {error}
                        </div>
                    )}
                    {success && (
                        <div className="text-green-600 text-sm bg-green-50 dark:bg-green-950/30 border border-green-200 dark:border-green-800 rounded-md p-3">
                            {success}
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
                </form>
            )}

            {/* Sign Up Form */}
            {mode === "signup" && (
                <form onSubmit={handleSignUp} className="space-y-4">
                    {/* Username Field */}
                    <div className="space-y-2">
                        <Label htmlFor="username" className="text-sm font-medium">
                            Username
                        </Label>
                        <Input
                            id="username"
                            type="text"
                            placeholder="johndoe"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="transition-all duration-200 focus:scale-[1.01]"
                            autoComplete="username"
                            required
                            disabled={isLoading}
                        />
                        <p className="text-xs text-muted-foreground">
                            Letters, numbers, and underscores only
                        </p>
                    </div>

                    {/* Email Field */}
                    <div className="space-y-2">
                        <Label htmlFor="email" className="text-sm font-medium">
                            University Email
                        </Label>
                        <Input
                            id="email"
                            type="email"
                            placeholder="you@university.ac.za"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="transition-all duration-200 focus:scale-[1.01]"
                            autoComplete="email"
                            required
                            disabled={isLoading}
                        />
                        <p className="text-xs text-muted-foreground">
                            Must be a .edu.za or .ac.za email
                        </p>
                    </div>

                    {/* Password Field */}
                    <div className="space-y-2">
                        <Label htmlFor="signup-password" className="text-sm font-medium">
                            Password
                        </Label>
                        <div className="relative">
                            <Input
                                id="signup-password"
                                type={showSignupPassword ? "text" : "password"}
                                placeholder={!showSignupPassword ? "••••••••" : ""}
                                value={signupPassword}
                                onChange={(e) => setSignupPassword(e.target.value)}
                                className="transition-all duration-200 focus:scale-[1.01] pr-12"
                                autoComplete="new-password"
                                required
                                disabled={isLoading}
                            />
                            <button
                                type="button"
                                onClick={() => setShowSignupPassword(!showSignupPassword)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                                disabled={isLoading}
                            >
                                {showSignupPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                            </button>
                        </div>

                        {/* Password Strength Indicator */}
                        {signupPassword && (
                            <div className="space-y-1">
                                <div className="flex items-center justify-between text-xs">
                                    <span className="text-muted-foreground">Password strength:</span>
                                    <span
                                        className={`font-medium ${passwordStrength.strength === 100
                                            ? "text-green-500"
                                            : passwordStrength.strength >= 75
                                                ? "text-blue-500"
                                                : passwordStrength.strength >= 50
                                                    ? "text-yellow-500"
                                                    : "text-destructive"
                                            }`}
                                    >
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
                        <Label htmlFor="confirm-password" className="text-sm font-medium">
                            Confirm Password
                        </Label>
                        <div className="relative">
                            <Input
                                id="confirm-password"
                                type={showConfirmPassword ? "text" : "password"}
                                placeholder={!showConfirmPassword ? "••••••••" : ""}
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                className="transition-all duration-200 focus:scale-[1.01] pr-12"
                                autoComplete="new-password"
                                required
                                disabled={isLoading}
                            />
                            <button
                                type="button"
                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                                disabled={isLoading}
                            >
                                {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                            </button>
                        </div>
                    </div>

                    {/* Error/Success Message */}
                    {error && (
                        <div className="text-destructive text-sm bg-destructive/10 border border-destructive/20 rounded-md p-3">
                            {error}
                        </div>
                    )}
                    {success && (
                        <div className="text-green-600 text-sm bg-green-50 dark:bg-green-950/30 border border-green-200 dark:border-green-800 rounded-md p-3">
                            {success}
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

                    {/* Terms Notice */}
                    <p className="text-xs text-center text-muted-foreground">
                        By signing up, you agree to our{" "}
                        <Link href="/terms" className="text-primary hover:text-primary/80">
                            Terms of Service
                        </Link>{" "}
                        and{" "}
                        <Link href="/privacy" className="text-primary hover:text-primary/80">
                            Privacy Policy
                        </Link>
                    </p>
                </form>
            )}
        </AuthCard>
    );
}
