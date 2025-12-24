'use client';

import { editProfile } from '@/app/utils/actions/profile actions/actions';
import { profileEditSchema } from '@/app/utils/zodSchema';
import { useForm } from "@conform-to/react";
import { parseWithZod } from "@conform-to/zod";
import { Prisma } from '@prisma/client';
import { useActionState, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2 } from "lucide-react";
import { CharacterCountField } from '../CharacterCountField';
import { SubmitButton } from '../SubmitButton';
import { useRouter } from 'next/navigation';


// defining a specific type for only the data we need for editing
type EditProfileData = {
    userId: string;
    username: string;
    name: string | null;
    email: string;
    bio: string | null;
    avatarUrl: string | null;
}

type EditProfileProps = {
    data: EditProfileData;  // using the specific type instead of calling the full Prisma type
}

export function EditProfile({ data }: EditProfileProps) {

    // Form state hooks
    const [lastResult, action] = useActionState(editProfile, undefined);
    const router = useRouter();

    //if the data is undefined/null, set the initial state to empty string
    const [username, setUsername] = useState(data.username ?? "");
    const [name, setName] = useState(data.name ?? "");
    const [bio, setBio] = useState(data.bio ?? "");
    const [email, setEmail] = useState(data.email ?? "");

    //passing the default values int o useForm helps conform know the default/initial values 
    // and keeps the stable across re-renders, and preserves user edits if it fails
    const [form, fields] = useForm({
        lastResult,

        onValidate({ formData }) {
            return parseWithZod(formData, {
                schema: profileEditSchema
            });
        },
        shouldValidate: "onBlur",
        shouldRevalidate: "onInput",

        defaultValue: {
            username: data.username ?? "",
            name: data.name ?? "",
            email: data.email ?? "",
            bio: data.bio ?? "",
        },
    });

    // function syncs local state with Conform's field values when they change
    useEffect(() => {
        // When Conform updates field values (e.g., after validation error),
        // sync them back to local state
        if (fields.username.value !== undefined) {
            setUsername(fields.username.value);
        }
        if (fields.name.value !== undefined) {
            setName(fields.name.value);
        }
        if (fields.email.value !== undefined) {
            setEmail(fields.email.value);
        }
        if (fields.bio.value !== undefined) {
            setBio(fields.bio.value);
        }
    }, [fields.username.value, fields.name.value, fields.email.value, fields.bio.value]);


    // handles successful form submission
    useEffect(() => {
        // Type guard: check if lastResult has the expected structure
        if (
            lastResult && 
            typeof lastResult === 'object' && 
            'status' in lastResult && 
            lastResult.status === 'success'
        ) {
            // Safely access nested properties
            const result = lastResult as { status: 'success'; value?: { username?: string } };
            
            if (result.value?.username) {
                router.push(`/${result.value.username}`);
            } else {
                // Fallback: redirect using current username if new one isn't available
                router.push(`/${username}`);
            }
        }
    }, [lastResult, router, username]);

    // Debug: Log initial values
    useEffect(() => {
        console.log("Initial data:", {
            username: data.username,
            name: data.name,
            bio: data.bio,
            email: data.email
        });
        console.log("State after init:", {
            username,
            name,
            bio,
            email
        });
    }, []);

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
                    onSubmit={form.onSubmit}
                    action={action}
                    noValidate
                    className="space-y-6"
                >
                    {/* Form-level errors */}
                    {form.errors && form.errors.length > 0 && (
                        <div className="p-3 bg-destructive/10 border border-destructive rounded-md">
                            <p className="text-sm text-destructive font-medium">
                                {Array.isArray(form.errors) 
                                ? form.errors.join(", ") 
                                : typeof form.errors === 'string' 
                                ? form.errors 
                                : JSON.stringify(form.errors)}
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
                            value={name}
                            onChange={(e) => setName(e.target.value)}
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
                        <CharacterCountField
                            key={fields.username.key}
                            id={fields.username.id}
                            name={fields.username.name}
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            maxLength={30}
                            placeholder="johndoe"
                            aria-invalid={fields.username.errors ? true : undefined}
                            aria-describedby={fields.username.errors ? `${fields.username.id}-error` : undefined}
                            as='input'
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
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            type="email"
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
                        <CharacterCountField
                            key={fields.bio.key}
                            id={fields.bio.id}
                            name={fields.bio.name}
                            value={bio}
                            onChange={(e) => setBio(e.target.value)}
                            placeholder="Tell us about yourself..."
                            rows={4}
                            as='textarea'
                            maxLength={160}
                            aria-invalid={fields.bio.errors ? true : undefined}
                            aria-describedby={fields.bio.errors ? `${fields.bio.id}-error` : undefined}
                        />
                        {fields.bio.errors && (
                            <p id={`${fields.bio.id}-error`} className="text-sm text-red-600">
                                {fields.bio.errors}
                            </p>
                        )}
                    </div>

                    {/* Submit Button */}
                    <div className="flex items-center mt-6 justify-end">
                        <div>
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => router.back()}
                        >
                            Cancel
                        </Button>
                        </div>

                        <div className='w-50'>
                            <SubmitButton 
                             text="Save Changes" 
                             variant="default" 
                            />
                        </div>
                    </div>
                </form>
            </CardContent>
        </Card>
    );
}
