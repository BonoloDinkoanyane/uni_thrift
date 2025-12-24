import { requireUser } from "@/app/utils/hooks/hooks";
import { db } from "@/lib/db";
import { redirect, notFound } from "next/navigation";
import { EditProfile } from "@/app/components/profile components/editProfile";


async function getData(userId: string){

    const data = await db.user.findUnique({
        where: { userId },
    });

    if (!data) {
        return notFound();
    }

    return data;
}

export default async function EditProfilePage() {
    // Require authentication
    const session = await requireUser();
    const data = await getData(session.userId);

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



    // TypeScript now knows user is not null here
    return (
        <div className="min-h-screen bg-background py-8 px-4">
            <div className="container mx-auto max-w-2xl">
                <EditProfile 
                 data={data} 
                />
            </div>
        </div>
    );
}
