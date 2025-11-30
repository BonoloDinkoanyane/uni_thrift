import { getSession } from "@auth0/nextjs-auth0";
import { redirect } from "next/navigation";

export default async function ProfilePage() {
    const session = await getSession();

    if (!session?.user) {
        redirect("/login?returnTo=/profile");
    }

    return (
        <div className="min-h-screen bg-background">
            <div className="container mx-auto px-4 py-16">
                <div className="max-w-4xl mx-auto">
                    {/* Profile Header */}
                    <div className="bg-card border border-border rounded-2xl p-8 mb-8">
                        <div className="flex items-center gap-6">
                            {/* Avatar */}
                            <div className="w-24 h-24 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center text-white text-3xl font-bold">
                                {session.user.name?.charAt(0) || session.user.email?.charAt(0)}
                            </div>

                            {/* User Info */}
                            <div>
                                <h1 className="text-3xl font-black mb-2">
                                    {session.user.name || "Student"}
                                </h1>
                                <p className="text-muted-foreground">{session.user.email}</p>
                            </div>
                        </div>
                    </div>

                    {/* Profile Content */}
                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="bg-card border border-border rounded-2xl p-6">
                            <h2 className="text-xl font-bold mb-4">Account Details</h2>
                            <div className="space-y-3">
                                <div>
                                    <p className="text-sm text-muted-foreground">Email</p>
                                    <p className="font-medium">{session.user.email}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-muted-foreground">Name</p>
                                    <p className="font-medium">{session.user.name || "Not set"}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-muted-foreground">Member Since</p>
                                    <p className="font-medium">
                                        {new Date(session.user.updated_at || Date.now()).toLocaleDateString()}
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="bg-card border border-border rounded-2xl p-6">
                            <h2 className="text-xl font-bold mb-4">Quick Actions</h2>
                            <div className="space-y-3">
                                <a
                                    href="/listings/create"
                                    className="block px-4 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:opacity-90 transition-all text-center"
                                >
                                    Create Listing
                                </a>
                                <a
                                    href="/messages"
                                    className="block px-4 py-3 bg-secondary text-secondary-foreground rounded-lg font-semibold hover:opacity-90 transition-all text-center"
                                >
                                    Messages
                                </a>
                                <a
                                    href="/favorites"
                                    className="block px-4 py-3 bg-accent text-accent-foreground rounded-lg font-semibold hover:opacity-90 transition-all text-center"
                                >
                                    Favorites
                                </a>
                                <a
                                    href="/auth/logout"
                                    className="block px-4 py-3 bg-destructive text-destructive-foreground rounded-lg font-semibold hover:opacity-90 transition-all text-center"
                                >
                                    Logout
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
