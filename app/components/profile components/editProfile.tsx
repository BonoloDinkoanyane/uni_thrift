'use client';

import { editProfile } from '@/app/utils/actions/profile actions/actions';
import { profileEditSchema } from '@/app/utils/zodSchema';
import { useForm } from "@conform-to/react";
import { useFormState } from "react-dom";
import { parseWithZod } from "@conform-to/zod";
import { Prisma } from '@prisma/client';
import { useActionState, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2 } from "lucide-react";

interface IAppProps {
    data: Prisma.UserGetPayload<{
        select: {
            name: true;
            username: true;
            email: true;
            bio: true;
        }
    }>
}

export function EditProfile({ data }: IAppProps) {
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Form state hooks
    const [lastResult, action] = useActionState(editProfile, undefined);
    const [form, fields] = useForm({
        lastResult,

        onValidate({ formData }) {
            return parseWithZod(formData, {
                schema: profileEditSchema
            });
        },
        shouldValidate: "onBlur",
        shouldRevalidate: "onInput",
    });

    // Handle form submission with loading state
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        setIsSubmitting(true);
        // The form action will handle the actual submission
        // This just manages the loading state
    };

    return (
        <Card className="w-full max-w-2xl">
            <CardHeader>
                <CardTitle>Edit Profile</CardTitle>
                <CardDescription>
                    Update your profile information below
                </CardDescription>
            </CardHeader>
            <CardContent>
                <form
                    id={form.id}
                    onSubmit={handleSubmit}
                    action={action}
                    noValidate
                    className="space-y-6"
                >
                    {/* Form-level errors */}
                    {form.errors && form.errors.length > 0 && (
                        <div className="p-3 bg-destructive/10 border border-destructive rounded-md">
                            <p className="text-sm text-destructive font-medium">
                                {Array.isArray(form.errors) ? form.errors.join(", ") : typeof form.errors === 'string' ? form.errors : JSON.stringify(form.errors)}
                            </p>
                        </div>
                    )}

                    {/* Full Name Field */}
                    <div className="space-y-2">
                        <Label htmlFor={fields.name.id} className="text-sm font-medium">
                            Name
                        </Label>
                        <Input
                            key={fields.name.key}
                            id={fields.name.id}
                            name={fields.name.name}
                            defaultValue={data.name || ""}
                            placeholder="John Doe"
                            className="transition-all duration-200 focus:scale-[1.01]"
                            aria-invalid={fields.name.errors ? true : undefined}
                            //aria-describedby={fields.name.errors ? `${fields.name.id}-error` : undefined}
                        />
                        {fields.name.errors && (
                            <p id={`${fields.name.id}-error`} className="text-sm text-red-600">
                                {fields.name.errors}
                            </p>
                        )}
                    </div>

                    {/* Username Field */}
                    <div className="space-y-2">
                        <Label htmlFor={fields.username.id} className="text-sm font-medium">
                            Username
                        </Label>
                        <Input
                            key={fields.username.key}
                            id={fields.username.id}
                            name={fields.username.name}
                            defaultValue={data.username || ""}
                            placeholder="johndoe"
                            className="transition-all duration-200 focus:scale-[1.01]"
                            aria-invalid={fields.username.errors ? true : undefined}
                            aria-describedby={fields.username.errors ? `${fields.username.id}-error` : undefined}
                        />
                        {fields.username.errors && (
                            <p id={`${fields.username.id}-error`} className="text-sm text-red-600">
                                {fields.username.errors}
                            </p>
                        )}
                    </div>

                    {/* Email Field */}
                    <div className="space-y-2">
                        <Label htmlFor={fields.email.id} className="text-sm font-medium">
                            Email
                        </Label>
                        <Input
                            key={fields.email.key}
                            id={fields.email.id}
                            name={fields.email.name}
                            type="email"
                            defaultValue={data.email || ""}
                            placeholder="john@university.ac.za"
                            className="transition-all duration-200 focus:scale-[1.01]"
                            aria-invalid={fields.email.errors ? true : undefined}
                            aria-describedby={fields.email.errors ? `${fields.email.id}-error` : undefined}
                        />
                        {fields.email.errors && (
                            <p id={`${fields.email.id}-error`} className="text-sm text-red-600">
                                {fields.email.errors}
                            </p>
                        )}
                    </div>

                    {/* Bio Field */}
                    <div className="space-y-2">
                        <Label htmlFor={fields.bio.id} className="text-sm font-medium">
                            Bio
                            <span className="text-muted-foreground font-normal ml-2">(Optional)</span>
                        </Label>
                        <Textarea
                            key={fields.bio.key}
                            id={fields.bio.id}
                            name={fields.bio.name}
                            defaultValue={data.bio || ""}
                            placeholder="Tell us about yourself..."
                            rows={4}
                            maxLength={160}
                            className="transition-all duration-200 focus:scale-[1.01] resize-none"
                            aria-invalid={fields.bio.errors ? true : undefined}
                            aria-describedby={fields.bio.errors ? `${fields.bio.id}-error` : undefined}
                        />
                        {fields.bio.errors && (
                            <p id={`${fields.bio.id}-error`} className="text-sm text-red-600">
                                {fields.bio.errors}
                            </p>
                        )}
                        <p className="text-xs text-muted-foreground">
                            {(data.bio?.length || 0)}/160 characters
                        </p>
                    </div>

                    {/* Submit Button */}
                    <div className="flex gap-3 pt-4">
                        <Button
                            type="submit"
                            disabled={isSubmitting}
                            className="flex-1"
                        >
                            {isSubmitting ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Saving...
                                </>
                            ) : (
                                "Save Changes"
                            )}
                        </Button>
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => window.history.back()}
                            disabled={isSubmitting}
                        >
                            Cancel
                        </Button>
                    </div>
                </form>
            </CardContent>
        </Card>
    );
}