import { requireUser } from "@/app/utils/hooks/hooks";
import { db } from "@/lib/db";
import { redirect, notFound } from "next/navigation";
import { EditProfile } from "@/app/components/profile components/editProfile";

type PageProps = {
    params: Promise<{
        username: string;
    }>;
};

export default async function EditProfilePage({ params }: PageProps) {
    
    const session = await requireUser();

    // getting the username from the URL
    const { username } = await params;

    // security check - users can only edit their OWN profile
    // this prevents someone from going to /other_user/edit and editing someone else's profile
    if (session.username !== username) {
        // if its not their profile - redirect them to their own edit page
        redirect(`/${session.username}/edit`);
    }

    // user's complete profile data from the db
    const userData = await db.user.findUnique({
        where: {
            userId: session.userId,
        },
        select: {
            userId: true,
            username: true,
            name: true,
            email: true,
            bio: true,
            avatarUrl: true,
        },
    });

    if (!userData) {
        return notFound();
    }

    // TypeScript now knows user is not null here
    return (
        <div className="min-h-screen bg-background py-8 px-4">
            <div className="container mx-auto max-w-2xl">
                <EditProfile 
                 data={userData} 
                />
            </div>
        </div>
    );
}
