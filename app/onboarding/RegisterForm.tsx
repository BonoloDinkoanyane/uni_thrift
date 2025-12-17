"use client";

import { useState, useEffect, useTransition } from "react";
import Link from "next/link";
import AuthCard from "@/components/AuthCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { onboardingSchema, registerSchema } from "../utils/zodSchema";
import { parseWithZod } from "@conform-to/zod";
import { useActionState, } from "react";
import { useForm } from "@conform-to/react";
import { registerUser } from "../actions";
import { CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select"
import { getCampuses } from "../utils/uniSelector";
import { EyeOff, Eye } from 'lucide-react';

export default function Register({ universities }: { universities: { id: number; name: string }[] }) {

    const [lastResult, action] = useActionState(registerUser, undefined);
    const [form, fields] = useForm({
        lastResult,
        onValidate({ formData }) {
            return parseWithZod(formData, {
                schema: onboardingSchema,
            })
        },
        shouldValidate: "onBlur", //validates when the users clicks out of the input field
        shouldRevalidate: "onInput", //revalidates when the user types in the input field
    });

    const [formData, setFormData] = useState({
        password: "",
        confirmPassword: "",
    });

    const [selectedUniversity, setSelectedUniversity] = useState('')
    const [campuses, setCampuses] = useState<{ id: number; name: string }[]>([])
    const [selectedCampus, setSelectedCampus] = useState('')
    const [isPending, startTransition] = useTransition()

    const handleUniversityChange = (uniId: string) => {
        setSelectedUniversity(uniId)
        setSelectedCampus('')

        startTransition(async () => {
            //calling the server action directly to get campuses
            const data = await getCampuses(Number(uniId))
            setCampuses(data)
        })
    }

    const [agreedToTerms, setAgreedToTerms] = useState(false);

    const getPasswordStrength = (password: string) => {
        if (password.length === 0) return { strength: 0, label: "", color: "" };
        if (password.length < 6) return { strength: 25, label: "Weak", color: "bg-destructive" };
        if (password.length < 10) return { strength: 50, label: "Fair", color: "bg-yellow-500" };
        if (password.length < 14) return { strength: 75, label: "Good", color: "bg-blue-500" };
        return { strength: 100, label: "Strong", color: "bg-green-500" };
    };

    const passwordStrength = getPasswordStrength(formData.password);

    //toggle to view/hide password
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)

    return (
        <AuthCard
            title="Join UniThrift"
            subtitle="Create your account to start trading"
        >
            <CardContent>
                <form
                    action={action}
                    className="space-y-4"
                    id={form.id}
                    noValidate
                >
                    <input
                     type="hidden"
                     name={fields.university.name}
                     value={selectedUniversity}
                    />

                    <input
                     type="hidden"
                     name={fields.campus.name}
                     value={selectedCampus}
                    />

                    {/* Name Field */}
                    <div>
                        <div className="space-y-2">
                            <Label className="text-sm font-medium">
                                Full Name
                            </Label>
                            <Input
                                key={fields.fullName.key}
                                name={fields.fullName.name}
                                defaultValue={fields.fullName.initialValue as string}
                                placeholder="John Doe"
                                className="transition-all duration-200 focus:scale-[1.01]"
                                required
                            />
                        </div>
                        <p className="text-sm text-red-500">{fields.fullName.errors}</p>
                    </div>

                    {/* username Field
                    <div>
                        <div className="space-y-2">
                            <Label className="text-sm font-medium">
                                Username
                            </Label>
                            <Input
                                key={fields.username.key}
                                name={fields.username.name}
                                defaultValue={fields.username.initialValue as string}
                                placeholder="John Doe"
                                className="transition-all duration-200 focus:scale-[1.01]"
                                required
                            />
                        </div>
                        <p className="text-sm text-red-500">{fields.username.errors}</p>
                    </div> */}

                    {/* Email Field
                    <div>
                        <div className="space-y-2">
                            <Label className="text-sm font-medium">
                                University Email
                            </Label>
                            <Input
                                key={fields.email.key}
                                name={fields.email.name}
                                defaultValue={fields.email.initialValue as string}
                                placeholder="example@university.ac.za"
                                className="transition-all duration-200 focus:scale-[1.01]"
                                required
                            />
                        </div>
                        <p className="text-sm text-red-500">{fields.email.errors}</p>
                    </div> */}

                    {/* University Select */}
                    <div>
                        <div className="space-y-2">
                            <Label className="text-sm font-medium">
                                University
                            </Label>
                            <Select
                                value={selectedUniversity}
                                onValueChange={handleUniversityChange}
                            >
                                <SelectTrigger className="w-[285px]">
                                    <SelectValue placeholder="Select University" />
                                </SelectTrigger>

                                <SelectContent>
                                    {universities.map((uni) => (
                                        <SelectItem key={uni.id} value={uni.id.toString()}>
                                            {uni.name}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                        <p className="text-sm text-red-500">{fields.university.errors}</p>
                    </div>

                    {/* Campus Select */}
                    <div>
                        <div className="space-y-2">
                            <Label className="text-sm font-medium">
                                Campus (Optional)
                            </Label>
                            <Select
                                value={selectedCampus}
                                onValueChange={setSelectedCampus}
                                disabled={!selectedUniversity}
                            >
                                <SelectTrigger className="w-[285px]">
                                    <SelectValue placeholder="Select Campus" />
                                </SelectTrigger>
                                <SelectContent>
                                    {campuses.map((campus) => (
                                        <SelectItem key={campus.id} value={campus.id.toString()}>
                                            {campus.name}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                        <p className="text-sm text-red-500">{fields.campus.errors}</p>
                    </div>

                    {/* Password Field
                    <div>
                        <div className="space-y-2">
                            <Label className="text-sm font-medium">
                                Password
                            </Label>
                            <div className="relative">
                                <Input
                                    key={fields.password.key}
                                    name={fields.password.name}
                                    defaultValue={fields.password.initialValue as string}
                                    placeholder={!showPassword ? "••••••••" : ""} // dynamic placeholder
                                    type={showPassword ? "text" : "password"} // setting the toggle type to password
                                    onInput={(e) =>
                                        setFormData(prev => ({
                                        ...prev,
                                        password: (e.target as HTMLInputElement).value,
                                        }))
                                    }
                                    className="transition-all duration-200 focus:scale-[1.01] pr-12"
                                    required
                                />

                                <button
                                    type="button"
                                    onClick={() => setShowPassword(prev => !prev)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-primary hover:text-primary/80"
                                >
                                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                </button>
                            </div>

                    //         {/* Password Strength Indicator */
                    //         
                    //             <div className="space-y-1">
                    //                 <div className="flex items-center justify-between text-xs">
                    //                     <span className="text-muted-foreground">Password strength:</span>
                    //                     <span className={`font-medium ${passwordStrength.strength === 100 ? "text-green-500" :
                    //                         passwordStrength.strength >= 75 ? "text-blue-500" :
                    //                             passwordStrength.strength >= 50 ? "text-yellow-500" :
                    //                                 "text-destructive"
                    //                         }`}>
                    //                         {passwordStrength.label}
                    //                     </span>
                    //                 </div>
                    //                 <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                    //                     <div
                    //                         className={`h-full transition-all duration-300 ${passwordStrength.color}`}
                    //                         style={{ width: `${passwordStrength.strength}%` }}
                    //                     />
                    //                 </div>
                    //             </div>
                    //         )}
                    //     </div>
                    //     {fields.password.errors && fields.password.errors.length > 0 && (
                    //         <ul className="text-sm text-destructive list-disc list-inside space-y-1 mt-1">
                    //             {fields.password.errors.map((err, index) => (
                    //                 <li key={index}>{err}</li>
                    //             ))}
                    //         </ul>
                    //     )}
                    // </div> 

                    /* Confirm Password Field
                    <div>
                        <div className="space-y-2">
                            <Label className="text-sm font-medium">
                                Confirm Password
                            </Label>
                            <div className="relative">
                                <Input
                                    key={fields.confirmPassword.key}
                                    name={fields.confirmPassword.name}
                                    defaultValue={fields.confirmPassword.initialValue as string}
                                    type={showConfirmPassword ? "text" : "password"}
                                    placeholder={!showConfirmPassword ? "••••••••" : ""} // dynamic placeholder
                                    className="transition-all duration-200 focus:scale-[1.01]"
                                    onChange={(e) => setFormData(prev => ({ ...prev, confirmPassword: e.target.value }))}
                                    required
                                />

                                <button
                                    type="button"
                                    onClick={() => setShowConfirmPassword(prev => !prev)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-primary hover:text-primary/80"
                                >
                                    {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                </button>
                            </div>
                        </div>

                        {fields.confirmPassword.errors && fields.confirmPassword.errors.length > 0 && (
                            <ul className="text-sm text-red-500 list-disc list-inside mt-1">
                                {fields.confirmPassword.errors.map((err, index) => (
                                    <li key={index}>{err}</li>
                                ))}
                            </ul>
                        )}
                    </div> */}

                    {/* Terms and Conditions */}
                    <div className="flex items-start gap-2">
                        <input
                            type="checkbox"
                            id="terms"
                            checked={agreedToTerms}
                            onChange={(e) => setAgreedToTerms(e.target.checked)}
                            className="mt-1 h-4 w-4 rounded border-border text-primary focus:ring-2 focus:ring-primary/50"
                            required
                        />
                        <Label className="text-xs text-muted-foreground leading-relaxed cursor-pointer">
                            I agree to the{" "}
                            <Link href="/terms" className="text-primary hover:text-primary/80 transition-colors">
                                Terms of Service
                            </Link>{" "}
                            and {" "}
                            <Link href="/privacy" className="text-primary hover:text-primary/80 transition-colors">
                                Privacy Policy
                            </Link>
                        </Label>
                    </div>

                    {/* Submit Button */}
                    <Button
                        type="submit"
                        disabled={isPending}
                        className="w-full h-11 text-base font-semibold shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-[1.02]"
                    > {isPending ? "Creating account..." : "Submit"}
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
            </CardContent>
        </AuthCard>
    );
}
