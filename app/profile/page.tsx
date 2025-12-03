import { auth0 } from "@/lib/auth0";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/db";
import { requireUser } from "../utils/hooks";
import { Button } from "@/components/ui/button";
import { MapPin, Package, Star } from "lucide-react";
import { Card } from "@/components/ui/card";
import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";

async function getUserdata(userId: string) {
  const data = await prisma.user.findUnique({
    where: {
      id: userId,
    },
    select: {
      name: true,
      username: true,
      email: true,
      avatarUrl: true,
      bio: true,
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
  const listings = await prisma.listing.findMany({
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
  const data = await getUserdata(session!.user?.id as string);
  const listings = await getListingData(session!.user?.id as string);

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          {/* Profile Card with enhanced design */}
          <Card className="p-6 mb-8 shadow-md border-2 hover:shadow-lg transition-shadow">
            <div className="flex items-start gap-6">
              <div className="relative">
                <Avatar className="w-24 h-24 border-4 border-primary/10">
                  <AvatarImage src={data?.avatarUrl || undefined} />
                  <AvatarFallback className="text-2xl bg-gradient-to-br from-primary/20 to-accent/20">
                    {data?.name?.charAt(0) || data?.email?.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <div className="absolute -bottom-1 -right-1 w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white text-xs font-bold shadow-md">
                  ✓
                </div>
              </div>

              <div className="flex-1">
                <h2 className="text-2xl font-bold mb-1">
                  {data?.name || "Student"}
                </h2>
                <p className="text-muted-foreground mb-3 text-sm">{data?.email}</p>

                {/* Rating with enhanced styling */}
                <div className="flex items-center gap-2 mb-3 bg-muted/50 rounded-lg px-3 py-2">
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${i < Math.floor(data?.rating || 0)
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

                {data?.campusName && (
                  <div className="flex items-center gap-2 text-sm bg-primary/5 text-primary rounded-lg px-3 py-2 ">
                    <MapPin className="w-4 h-4" />
                    <span className="font-medium">{data.campusName}</span>
                  </div>
                )}
              </div>
            </div>
          </Card>

          {/* Listings Section */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold flex items-center gap-2">
                <Package className="w-5 h-5" />
                My Listings ({listings.length})
              </h3>
              <Link href="/sell">
                <Button size="sm">
                  Create Listing
                </Button>
              </Link>
            </div>

            {listings.length === 0 ? (
              <Card className="p-8 text-center">
                <p className="text-muted-foreground mb-4">
                  You haven't created any listings yet
                </p>
                <Link href="/sell">
                  <Button>
                    Create Your First Listing
                  </Button>
                </Link>
              </Card>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {listings.map((listing) => (
                  <Link key={listing.id} href={`/product/${listing.id}`}>
                    <Card className="cursor-pointer hover:shadow-lg transition-shadow overflow-hidden">
                      <div className="aspect-square bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center">
                        {listing.images && listing.images[0] ? (
                          <img
                            src={listing.images[0]}
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
                        <p className="text-primary font-bold">${listing.price}</p>
                        <p className="text-xs text-muted-foreground capitalize">
                          {listing.status}
                        </p>
                      </div>
                    </Card>
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Reviews Section */}
          {/* <div className="mb-8">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-xl font-bold flex items-center gap-2">
                            <Star className="w-5 h-5" />
                            Reviews ({profile?.rating_count || 0})
                            </h3>
                        </div>
                        
                        {profile && <ReviewsList sellerId={profile.id} />}
                        </div> */}
        </div>
      </div>
    </div>
  );
}
