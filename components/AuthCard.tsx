"use client";

import { ReactNode } from "react";
import { Card, CardTitle, CardDescription, CardAction, CardContent } from "@/components/ui/card";

interface AuthCardProps {
    children: ReactNode;
    title: string;
    subtitle?: string;
}

export default function AuthCard({ children, title, subtitle }: AuthCardProps) {
    return (
        <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
            {/* Animated gradient background */}
            <div className="absolute inset-0 bg-linear-to-br from-primary/20 via-background to-secondary/20 animate-gradient-shift" />

            {/* Floating orbs for visual interest */}
            <div className="absolute top-20 left-10 w-72 h-72 bg-primary/30 rounded-full blur-3xl animate-float" />
            <div className="absolute bottom-20 right-10 w-96 h-96 bg-secondary/20 rounded-full blur-3xl animate-float-delayed" />

            {/* Main card */}
            <div className="relative w-full max-w-md">
                <Card className="backdrop-blur-xl bg-card/80 border border-border/50 rounded-2xl shadow-2xl p-8 animate-fade-in-up">
                    {/* Header */}
                    <div className="text-center mb-8">
                        <CardTitle className="text-3xl font-bold bg-linear-to-r from-primary to-secondary bg-clip-text text-transparent mb-2">
                            {title}
                        </CardTitle>
                        {subtitle && (
                            <CardDescription className="text-muted-foreground text-sm">
                                {subtitle}
                            </CardDescription>
                        )}
                    </div>

                    {/* Content */}
                    <CardContent>{children}</CardContent>
                </Card>
            </div>
        </div>
    );
}
