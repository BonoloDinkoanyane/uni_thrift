import { auth0 } from "@/lib/auth0";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
    const session = await auth0.getSession();
    
    if (!session?.user) {
        redirect("/auth/login");
    }

    return (
        <div className="min-h-screen bg-background">
            <div className="container mx-auto px-4 py-16">
                <div className="max-w-6xl mx-auto">
                    <h1 className="text-4xl font-black mb-8">
                        Welcome back, {session.user.name?.split(" ")[0] || "Student"}! 👋
                    </h1>

                    {/* Dashboard Grid */}
                    <div className="grid md:grid-cols-3 gap-6 mb-8">
                        {/* Stats Cards */}
                        <div className="bg-linear-to-br from-primary/10 to-primary/5 border border-primary/20 rounded-2xl p-6">
                            <h3 className="text-sm font-semibold text-muted-foreground mb-2">
                                Active Listings
                            </h3>
                            <p className="text-4xl font-black text-primary">0</p>
                        </div>

                        <div className="bg-linear-to-br from-secondary/10 to-secondary/5 border border-secondary/20 rounded-2xl p-6">
                            <h3 className="text-sm font-semibold text-muted-foreground mb-2">
                                Total Sales
                            </h3>
                            <p className="text-4xl font-black text-secondary">0</p>
                        </div>

                        <div className="bg-linear-to-br from-accent/10 to-accent/5 border border-accent/20 rounded-2xl p-6">
                            <h3 className="text-sm font-semibold text-muted-foreground mb-2">
                                Messages
                            </h3>
                            <p className="text-4xl font-black text-accent">0</p>
                        </div>
                    </div>

                    {/* Recent Activity */}
                    <div className="bg-card border border-border rounded-2xl p-8">
                        <h2 className="text-2xl font-black mb-6">Recent Activity</h2>
                        <div className="text-center py-12 text-muted-foreground">
                            <p className="text-lg mb-4">No recent activity</p>
                            <p className="text-sm">
                                Start by creating your first listing or browsing items!
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
