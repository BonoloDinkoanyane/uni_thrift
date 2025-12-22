import { requireUser } from "@/app/utils/hooks/hooks";
import { db } from "@/lib/db";
import { redirect, notFound } from "next/navigation";
import { EditProfile } from "@/app/components/profile components/editProfile";

export default async function EditProfilePage() {
    // Require authentication
    const session = await requireUser();

    if (!session) {
        redirect("/login");
    }

    // Fetch user data for the form
    const user = await db.user.findUnique({
        where: { userId: session?.userId },
        select: {
            name: true,
            username: true,
            email: true,
            bio: true,
        },
    });

    // If user not found, redirect to login
    if (!user) {
        redirect("/login");
    }

    // TypeScript now knows user is not null here
    return (
        <div className="min-h-screen bg-background py-8 px-4">
            <div className="container mx-auto max-w-2xl">
                <EditProfile data={user} />
            </div>
        </div>
    );
}
