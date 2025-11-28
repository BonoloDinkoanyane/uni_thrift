"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  Heart,
  MapPin,
  MessageCircle,
  ShoppingBag,
  Sparkles,
  TrendingUp,
  Users,
  Zap,
  Star,
  Rocket
} from "lucide-react";
import Link from "next/link";

export default function Hero() {
  return (
    <div className="min-h-screen bg-background overflow-hidden">
      {/* Hero Section */}
      <section className="relative pt-20 pb-32 md:pt-32 md:pb-40 min-h-[90vh] flex items-center">
        {/* Background pattern */}
        <div className="absolute inset-0 -z-20 opacity-30">
          <img
            src="/hero-pattern.png"
            alt=""
            className="w-full h-full object-cover"
          />
        </div>

        {/* Animated gradient background */}
        <div className="absolute inset-0 -z-10 bg-linear-to-br from-primary/10 via-secondary/10 to-accent/10" />

        {/* Floating gradient orbs */}
        <div className="absolute top-20 right-10 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-20 left-10 w-80 h-80 bg-secondary/20 rounded-full blur-3xl animate-float-delayed" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent/10 rounded-full blur-3xl animate-pulse" />

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-6xl mx-auto">
            {/* Content */}
            <div className="text-center animate-fade-in-up">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-linear-to-r from-primary/20 to-secondary/20 backdrop-blur-sm rounded-full mb-8 border border-primary/30 shadow-lg">
                <Sparkles className="w-4 h-4 text-primary animate-pulse" />
                <span className="text-sm font-semibold bg-linear-to-r from-primary to-secondary bg-clip-text text-transparent">
                  The #1 Student Marketplace 🎓
                </span>
              </div>

              {/* Main Headline */}
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-black mb-6 leading-[1.1] tracking-tight">
                <span className="block mb-2">Buy. Sell. Swap.</span>
                <span className="block bg-linear-to-r from-primary via-secondary to-accent bg-clip-text text-transparent animate-gradient bg-size-[200%_auto]">
                  All Campus Vibes ✨
                </span>
              </h1>

              {/* Subheadline */}
              <p className="text-lg md:text-2xl text-muted-foreground mb-10 max-w-3xl mx-auto font-medium leading-relaxed">
                Your campus marketplace where students buy, sell, and trade everything from textbooks to tech.
                <span className="text-primary font-bold"> Zero fees. All vibes. 🔥</span>
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
                <Button
                  asChild
                  size="lg"
                  className="bg-linear-to-r from-primary to-secondary hover:opacity-90 shadow-2xl text-lg px-10 py-7 font-bold transition-all hover:scale-105 hover:shadow-primary/50"
                >
                  <Link href="/browse" className="flex items-center gap-2">
                    Start Shopping <Rocket className="w-5 h-5" />
                  </Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="text-lg px-10 py-7 font-bold border-2 border-primary/30 hover:border-primary hover:bg-primary/5 transition-all hover:scale-105"
                >
                  <Link href="/register" className="flex items-center gap-2">
                    Join Free <ArrowRight className="w-5 h-5" />
                  </Link>
                </Button>
              </div>

              {/* Live Stats with Animation */}
              <div className="grid grid-cols-3 gap-6 max-w-3xl mx-auto">
                <StatCard number="15k+" label="Students" emoji="👥" />
                <StatCard number="75k+" label="Items" emoji="📦" />
                <StatCard number="250+" label="Campuses" emoji="🏫" />
              </div>
            </div>
          </div>
        </div>

      </section>

      {/* Features Section */}
      <section className="py-24 relative">
        <div className="absolute inset-0 bg-linear-to-b from-muted/30 via-background to-background -z-10" />

        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-black mb-4">
              Why Students <span className="text-primary">Love</span> Us
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Built by students, for students. Everything you need in one app.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
            <FeatureCard
              icon={<Heart className="w-8 h-8" />}
              title="Swipe to Shop"
              description="Tinder-style browsing makes shopping addictive and fun"
              gradient="from-primary/10 to-primary/5"
            />
            <FeatureCard
              icon={<Users className="w-8 h-8" />}
              title="Campus Only"
              description="Verified .edu emails only. Your classmates, your deals"
              gradient="from-secondary/10 to-secondary/5"
            />
            <FeatureCard
              icon={<MessageCircle className="w-8 h-8" />}
              title="Instant Chat"
              description="DM sellers instantly. No waiting, no hassle"
              gradient="from-accent/10 to-accent/5"
            />
            <FeatureCard
              icon={<MapPin className="w-8 h-8" />}
              title="Super Local"
              description="See exactly how far items are from your dorm"
              gradient="from-primary/10 to-accent/5"
            />
          </div>

          {/* Popular Categories */}
          <div className="mt-24">
            <h3 className="text-3xl md:text-4xl font-black text-center mb-12">
              Shop by <span className="text-secondary">Category</span>
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 max-w-6xl mx-auto">
              {[
                { emoji: '📚', name: 'Textbooks', color: 'from-primary/20 to-primary/10' },
                { emoji: '💻', name: 'Tech', color: 'from-secondary/20 to-secondary/10' },
                { emoji: '🛋️', name: 'Furniture', color: 'from-accent/20 to-accent/10' },
                { emoji: '👕', name: 'Fashion', color: 'from-primary/20 to-secondary/10' },
                { emoji: '🎮', name: 'Gaming', color: 'from-secondary/20 to-accent/10' },
                { emoji: '🎨', name: 'Art', color: 'from-accent/20 to-primary/10' }
              ].map((category, idx) => (
                <div
                  key={idx}
                  className={`bg-linear-to-br ${category.color} hover:scale-105 rounded-2xl p-6 text-center cursor-pointer transition-all shadow-lg hover:shadow-xl group`}
                >
                  <div className="text-5xl mb-3 group-hover:scale-110 transition-transform">{category.emoji}</div>
                  <div className="text-sm font-bold">{category.name}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 relative">
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-linear-to-br from-primary/20 via-secondary/20 to-accent/20" />
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/30 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-secondary/30 rounded-full blur-3xl" />
        </div>

        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto relative">
            <div className="bg-linear-to-br from-primary via-secondary to-accent rounded-3xl p-12 md:p-16 text-center text-primary-foreground shadow-2xl">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full mb-6">
                <Star className="w-4 h-4 fill-current" />
                <span className="text-sm font-bold">Join 15,000+ Students</span>
              </div>

              <h2 className="text-4xl md:text-6xl font-black mb-6">
                Ready to Start Trading?
              </h2>
              <p className="text-lg md:text-xl opacity-95 mb-10 max-w-2xl mx-auto font-medium">
                Sign up with your .edu email and start buying, selling, and swapping today.
                It's completely free! 🎉
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
                <Button
                  asChild
                  size="lg"
                  variant="secondary"
                  className="shadow-xl text-lg px-10 py-7 font-bold hover:scale-105 transition-all"
                >
                  <Link href="/register">Get Started Free</Link>
                </Button>
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="border-2 border-white/30 text-white hover:bg-white/10 text-lg px-10 py-7 font-bold hover:scale-105 transition-all"
                >
                  <Link href="/browse">Browse Listings</Link>
                </Button>
              </div>

              <div className="flex flex-wrap items-center justify-center gap-6 text-sm font-semibold opacity-90">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
                  <span>100% Free</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-white rounded-full animate-pulse" style={{ animationDelay: '200ms' }} />
                  <span>No Hidden Fees</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-white rounded-full animate-pulse" style={{ animationDelay: '400ms' }} />
                  <span>Students Only</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

// Stat Card Component
const StatCard = ({ number, label, emoji }: { number: string; label: string; emoji: string }) => {
  return (
    <div className="backdrop-blur-sm bg-card/50 border border-border/50 rounded-2xl p-6 hover:scale-105 transition-all shadow-lg hover:shadow-xl">
      <div className="text-4xl mb-2">{emoji}</div>
      <div className="text-3xl md:text-4xl font-black bg-linear-to-r from-primary to-secondary bg-clip-text text-transparent mb-1">
        {number}
      </div>
      <div className="text-sm text-muted-foreground font-semibold">{label}</div>
    </div>
  );
};

// Floating Badge Component
const FloatingBadge = ({ className, text, delay }: { className: string; text: string; delay: number }) => {
  return (
    <div
      className={`${className} bg-linear-to-r from-primary to-secondary text-primary-foreground px-6 py-3 rounded-full shadow-2xl backdrop-blur-sm font-bold text-sm animate-bounce`}
      style={{ animationDuration: '3s', animationDelay: `${delay}ms` }}
    >
      {text}
    </div>
  );
};

// Feature Card Component
const FeatureCard = ({
  icon,
  title,
  description,
  gradient
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  gradient: string;
}) => {
  return (
    <div className={`bg-linear-to-br ${gradient} border border-border/50 rounded-2xl p-8 hover:scale-105 transition-all shadow-lg hover:shadow-xl group`}>
      <div className="w-14 h-14 bg-linear-to-br from-primary to-secondary rounded-xl flex items-center justify-center text-white mb-5 group-hover:scale-110 transition-transform shadow-lg">
        {icon}
      </div>
      <h3 className="text-xl font-black mb-3">{title}</h3>
      <p className="text-muted-foreground leading-relaxed">{description}</p>
    </div>
  );
};