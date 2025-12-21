import { notFound, redirect } from "next/navigation";
import Link from "next/link";
import { requireUser } from "../utils/hooks";
import { db } from "@/lib/db";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Package, Star, LogOut, MapPin, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { logOut } from "@/app/utils/actions/account actions/actions";
import { getCurrentUser } from "../utils/sessionManagement/currentUser";

async function getUserData(username: string) {

  const data = await db.user.findUnique({
    where: {
      username,
    },
    select: {
      userId: true,
      name: true,
      username: true,
      email: true,
      avatarUrl: true,
      bio: true,
      onboardingComplete: true,
      universityId: true,
      campusId: true,
      isVerified: true,
      isBanned: true,
      createdAt: true,
      updatedAt: true,
      university: {
        select: {
          name: true,
        }
      },
      campus: {
        select: {
          name: true,
        }
      },
      // uses _count to get review count efficiently
      _count: {
        select: {
          reviewsReceived: true,
        }
      },
      // aggregates the rating directly in the database for improved efficiency
      reviewsReceived: {
        select: {
          rating: true,
        }
      }
    }
  });

  if (!data) return null;

  // Calculate average rating and count with null safety
  const ratings = data.reviewsReceived.map(r => r.rating) || [];
  const averageRating = ratings.length > 0
    ? ratings.reduce((sum, rating) => sum + rating, 0) / ratings.length
    : 0;

  return {
    userId: data.userId,
    name: data.name,
    username: data.username,
    email: data.email,
    avatarUrl: data.avatarUrl,
    bio: data.bio,
    onboardingComplete: data.onboardingComplete,
    universityId: data.universityId,
    campusId: data.campusId,
    isVerified: data.isVerified,
    isBanned: data.isBanned,
    createdAt: data.createdAt,
    updatedAt: data.updatedAt,
    universityName: data.university?.name || null,
    campusName: data.campus?.name || null,
    rating: averageRating,
    ratingCount: data._count.reviewsReceived,
  };
}

//this type represents the user data returned by getUserdata function
type UserData = NonNullable<Awaited<ReturnType<typeof getUserData>>>;

type PageProps = {
  params: Promise<{
    username: string;
  }>;
};

async function getListingData(userId: string, limit?: number) {
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
        },
        take: 1, // only need the first image for the image preview
      },
    },
    orderBy: {
      createdAt: "desc",
    },
    ...(limit && { take: limit }), // apply limit only if provided
  });

  // Transform images to array of URLs
  return listings.map(listing => ({
    ...listing,
    images: listing.images.map(img => img.url),
    id: listing.id,
    title: listing.title,
    price: listing.price,
    createdAt: listing.createdAt,
    status: listing.status,
    imageUrl: listing.images[0]?.url || null,
  }));
}

//type for listing data
type ListingData = Awaited<ReturnType<typeof getListingData>>;


/**
 * Profile Page Component
 * 
 * Can view:
 * - Your own profile: /your-username (with edit options)
 * - Other user's profile: /their-username (read-only)
 */
export default async function ProfilePage({ params }: PageProps) {

  // extracting the username from URL params
  const { username } = await params;

  // getting the currently logged-in user (doesn't redirect)
  // checks if the user is viewing their own profile vs someone else's
  const session = await getCurrentUser({ redirectIfNotFound: false });

  // fetching the profile data for the username in the URL
  const profileData = await getUserData(username);

  if (!profileData) {
    notFound(); // Shows 404 page
  }

  // checks if this is the current user's own profile
  const isOwnProfile = session?.userId === profileData.userId;

  // Handle banned users
  if (profileData.isBanned && !isOwnProfile) {
    // Don't show banned users' profiles to others
    notFound();
  }

  // this check handles incomplete onboarding
  if (!profileData.onboardingComplete && isOwnProfile) {
    // only redirects if viewing your own incomplete profile
    redirect("/onboarding");
  }

  if (!session) {
    redirect("/login");
  }

  const data = await getUserData(session.userId);

  // If user not in database, redirect to login
  if (!data) {
    redirect("/login");
  }

  const listings = await getListingData(data.userId);

  return (
    <div className="min-h-screen bg-linear-to-br from-background via-background to-primary/5 pb-20">
      <div className="container mx-auto px-4 py-8 max-w-4xl">

        {/* Header with gradient background */}
        <div className="relative mb-8 -mx-4 px-4 py-8 bg-linear-to-br from-primary/10 via-accent/5 to-transparent rounded-b-3xl">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-3xl font-bold mb-1">
                {isOwnProfile ? "My Profile" : `${profileData.name || profileData.username}'s Profile`}                             
              </h1>

              <p className="text-muted-foreground">
                {isOwnProfile 
                  ? "Manage your account and listings" 
                  : "View listings and reviews"}
              </p>
            </div>
            {/* only shows controls for a user's own profile */}
            {isOwnProfile && (
              <div className="flex gap-2">

                {/* Edit Profile Button */}
                <Link href="/profile/edit">
                  <Button variant="outline" size="sm" className="shadow-sm">
                    <Settings className="w-4 h-4 mr-2" />
                    Edit Profile
                  </Button>
                </Link>

                {/* Sign Out Button */}
                <form action={logOut}>
                  <Button type="submit" variant="outline" size="sm" className="shadow-sm">
                    <LogOut className="w-4 h-4 mr-2" />
                    Sign Out
                  </Button>
                </form>
              </div>
            )}
          </div>
        </div>

        {/* Profile Card */}
        <Card className="p-6 mb-8 shadow-md border-2 hover:shadow-lg transition-shadow">
          <div className="flex items-start gap-6">
            <div className="relative">
              <Avatar className="w-24 h-24 border-4 border-primary/10">
                <AvatarImage src={data?.avatarUrl || undefined} />
                <AvatarFallback className="text-2xl bg-linear-to-br from-primary/20 to-accent/20">
                  {data?.name?.charAt(0) || data?.email?.charAt(0) || "?"}
                </AvatarFallback>
              </Avatar>
              {data.isVerified && (
                <div className="absolute -bottom-1 -right-1 w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white text-xs font-bold shadow-md">
                  ✓
                </div>
              )}
            </div>

            <div className="flex-1">
              <h2 className="text-2xl font-bold mb-1">
                {data?.name}
              </h2>

              <p className="text-muted-foreground mb-1 text-sm">
                @{data?.username || "username"}
              </p>

              {/* only show email on own profile */}
              {isOwnProfile && (
                <p className="text-muted-foreground mb-3 text-sm">
                  {profileData.email}
                </p>
              )}

              {/* Bio section (if it exists) */}
              {profileData.bio && (
                <p className="text-sm text-foreground mb-3 bg-muted/30 rounded-lg px-3 py-2">
                  {profileData.bio}
                </p>
              )}

              {/* Rating section */}
              <div className="flex items-center gap-2 mb-3 bg-muted/50 rounded-lg px-3 py-2">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < Math.floor(data?.rating || 0)
                        ? "fill-yellow-400 text-yellow-400"
                        : "text-muted-foreground/30"
                        }`}
                    />
                  ))}
                </div>

                <span className="text-sm font-semibold">
                  {data?.rating?.toFixed(1) || "0.0"}
                </span>

                <span className="text-xs text-muted-foreground">
                  ({data?.ratingCount || 0} {data?.ratingCount === 1 ? 'review' : 'reviews'})
                </span>
              </div>

              {/* University and Campus */}
              {profileData.campusName && (
                <div className="flex items-center gap-2 text-sm bg-primary/5 text-primary rounded-lg px-3 py-2">
                  <MapPin className="w-4 h-4" />
                  <span className="font-medium">
                    {profileData.campusName}
                    {profileData.universityName && ` • ${profileData.universityName}`}
                  </span>
                </div>
              )}
            </div>
          </div>
        </Card>

        {/* Stats Cards */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          <Card className="p-4 text-center hover:shadow-md transition-shadow">
            <p className="text-2xl font-bold text-primary">
              {listings.length}
            </p>
            <p className="text-xs text-muted-foreground">
              {isOwnProfile ? "Active Listings" : "Listings"}
            </p>
          </Card>

          <Card className="p-4 text-center hover:shadow-md transition-shadow">
            <p className="text-2xl font-bold text-accent">
              {profileData.rating.toFixed(1)}
            </p>
            <p className="text-xs text-muted-foreground">
              Avg Rating
            </p>
          </Card>

          <Card className="p-4 text-center hover:shadow-md transition-shadow">
            <p className="text-2xl font-bold text-foreground">
              {profileData.ratingCount}
            </p>
            <p className="text-xs text-muted-foreground">
              Reviews
            </p>
          </Card>
        </div>

        {/* Listings Section */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-bold flex items-center gap-2">
              <Package className="w-5 h-5" />
              {isOwnProfile ? "My" : "Their"} Listings ({listings.length})
            </h3>

            {/* only show "Create Listing" button on a user's own profile */}
            {isOwnProfile && (
              <Link href="/sell">
                <Button size="sm">
                  Create Listing
                </Button>
              </Link>
            )}
          </div>

          {listings.length === 0 ? (
            <Card className="p-8 text-center">
              <p className="text-muted-foreground mb-4">
                {isOwnProfile 
                  ? "You haven't created any listings yet" 
                  : "This user hasn't created any listings yet"}
              </p>
              {/* only shows the "Create Your First Listing" button on a user's own profile */}
              {isOwnProfile && (
                <Link href="/sell">
                  <Button>
                    Create Your First Listing
                  </Button>
                </Link>
              )}
            </Card>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {listings.map((listing) => (
                <Link key={listing.id} href={`/product/${listing.id}`}>
                  <Card className="cursor-pointer hover:shadow-lg transition-shadow overflow-hidden">
                    <div className="aspect-square bg-linear-to-br from-primary/10 to-accent/10 flex items-center justify-center">
                      {listing.imageUrl ? (
                        <img
                          src={listing.imageUrl}
                          alt={listing.title}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <Package className="w-12 h-12 text-muted-foreground" />
                      )}
                    </div>
                    <div className="p-3">
                      <h4 className="font-semibold text-sm truncate mb-1">
                        {listing.title}
                      </h4>
                      <p className="text-primary font-bold">
                        R {listing.price}
                      </p>
                      <p className="text-xs text-muted-foreground capitalize">
                        {listing.status.toLowerCase()}
                      </p>
                    </div>
                  </Card>
                </Link>
              ))}
            </div>
          )}
        </div>

        {/* Reviews Section - Placeholder */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-bold flex items-center gap-2">
              <Star className="w-5 h-5" />
              Reviews ({profileData.ratingCount})
            </h3>
          </div>
          <Card className="p-8 text-center">
            <Star className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
            <p className="text-muted-foreground">
              Reviews section coming soon
            </p>
          </Card>
        </div>
      </div>
    </div>
  );
}

/**
 * this function generates static params for common profiles for optional optimisation
 * This pre-renders popular profile pages at build time
 */
export async function generateStaticParams() {
  // Fetch the top users or recent users
  const users = await db.user.findMany({
    select: { username: true },
    take: 50, // Pre-render top 50 profiles
    where: {
      onboardingComplete: true,
      isBanned: false,
    },
    orderBy: {
      createdAt: 'desc',
    },
  });

  return users.map((user) => ({
    username: user.username,
  }));
}
