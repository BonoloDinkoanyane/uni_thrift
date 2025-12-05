import { auth0 } from "@/lib/auth0";
import { redirect } from "next/navigation";
import Link from "next/link";
import { requireUser } from "../utils/hooks";
import { db } from "@/lib/db";

async function getUserdata(auth0Id: string) {
  if (!auth0Id) return null;

  const data = await db.user.findUnique({
    where: {
      auth0Id,
    },
    select: {
      id: true,
      name: true,
      username: true,
      email: true,
      avatarUrl: true,
      bio: true,
      createdAt: true,
      campus: {
        select: {
          name: true,
        }
      },
      reviewsReceived: {
        select: {
          rating: true,
        }
      }
    }
  });

  if (!data) return null;

  // Calculate average rating and count
  const ratings = data.reviewsReceived.map(r => r.rating);
  const averageRating = ratings.length > 0
    ? ratings.reduce((sum, rating) => sum + rating, 0) / ratings.length
    : 0;

  return {
    ...data,
    rating: averageRating,
    ratingCount: ratings.length,
    campusName: data.campus?.name || null,
  };
}

async function getListingData(userId: string) {
  const listings = await db.listing.findMany({
    where: {
      ownerId: userId,
    },
    select: {
      id: true,
      title: true,
      price: true,
      createdAt: true,
      status: true,
      images: {
        select: {
          url: true,
        }
      },
    },
    orderBy: {
      createdAt: "desc",
    },
    take: 5,
  });

  // Transform images to array of URLs
  return listings.map(listing => ({
    ...listing,
    images: listing.images.map(img => img.url),
  }));
}

export default async function ProfilePage() {

  const session = await requireUser();
  const auth0Id = session!.user.sub;

  if (!auth0Id) {
    redirect("/login");
  }

  const data = await getUserdata(auth0Id);

  if (!data?.id) {
    // User authenticated but not in database - redirect to setup
    redirect("/dashboard");
  }

  const listings = await getListingData(data.id);

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          {/* Profile Header */}
          <div className="bg-card border border-border rounded-2xl p-8 mb-8">
            <div className="flex items-center gap-6">
              {/* Avatar */}
              <div className="w-24 h-24 bg-linear-to-br from-primary to-secondary rounded-full flex items-center justify-center text-white text-3xl font-bold">
                {data.name?.charAt(0) || data.email?.charAt(0)}
              </div>

              {/* User Info */}
              <div>
                <h1 className="text-3xl font-black mb-2">
                  {data.name || "Student"}
                </h1>
                <p className="text-muted-foreground">{data.email}</p>
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
                  <p className="font-medium">{data.email}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Name</p>
                  <p className="font-medium">{data.name || "Not set"}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Member Since</p>
                  <p className="font-medium">
                    {data.createdAt ? new Date(data.createdAt).toLocaleDateString() : "N/A"}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-card border border-border rounded-2xl p-6">
              <h2 className="text-xl font-bold mb-4">Quick Actions</h2>
              <div className="space-y-3">
                <Link
                  href="/sell"
                  className="block px-4 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:opacity-90 transition-all text-center"
                >
                  Create Listing
                </Link>
                <Link
                  href="/messages"
                  className="block px-4 py-3 bg-secondary text-secondary-foreground rounded-lg font-semibold hover:opacity-90 transition-all text-center"
                >
                  Messages
                </Link>
                <Link
                  href="/favorites"
                  className="block px-4 py-3 bg-accent text-accent-foreground rounded-lg font-semibold hover:opacity-90 transition-all text-center"
                >
                  Favorites
                </Link>
                <Link
                  href="/api/auth/logout"
                  className="block px-4 py-3 bg-destructive text-destructive-foreground rounded-lg font-semibold hover:opacity-90 transition-all text-center"
                >
                  Logout
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
