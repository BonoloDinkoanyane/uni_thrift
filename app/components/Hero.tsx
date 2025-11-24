import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowUpRight, Heart, MapPin, MessageCircle, ShoppingBag, TrendingUp, Users, Zap } from "lucide-react";
import Link from "next/link";
import vercelLogo from "../../public/vercel.svg";

export default function Hero() {
    return (
        <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-32 pb-40 md:pt-40 md:pb-52 min-h-[85vh] flex items-center">
        {/* Hero background image */}
        <div className="absolute inset-0 -z-10">
          <img 
            src={vercelLogo} 
            alt="Students on campus" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-linear-to-br from-background/95 via-background/85 to-background/75" />
          <div className="absolute inset-0 bg-linear-to-t from-background via-transparent to-transparent" />
        </div>
        
        {/* Animated pattern overlay */}
        <div className="absolute inset-0 -z-5 opacity-10">
          <img 
            src={vercelLogo} 
            alt="" 
            className="w-full h-full object-cover animate-pulse"
            style={{ animationDuration: '4s' }}
          />
        </div>
        
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {/* Content */}
            <div className="text-center animate-in fade-in slide-in-from-bottom duration-700">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 backdrop-blur-sm rounded-full mb-6 animate-in fade-in slide-in-from-bottom-4 duration-700 border border-primary/20">
                <Zap className="w-4 h-4 text-primary animate-pulse" />
                <span className="text-sm font-medium text-primary">Campus Marketplace Revolution</span>
              </div>
              
              <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold mb-6 leading-tight">
                Your Campus,
                <br />
                <span className="bg-linear-to-r from-primary via-accent to-primary bg-clip-text text-transparent animate-gradient bg-size-[200%_auto]">
                  Your Marketplace
                </span>
              </h1>
              
              <p className="text-xl md:text-2xl text-foreground/80 mb-10 max-w-3xl mx-auto font-medium">
                Buy, sell, and swap with verified students on your campus. 
                From textbooks to tech, furniture to fashion—find it all in one swipe.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
                <Button asChild size="lg" className="bg-linear-to-r from-primary to-accent hover:opacity-90 shadow-2xl text-lg px-10 py-6 hover-scale">
                  <Link href="/browse">Start Shopping</Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="text-lg px-10 py-6 hover-scale border-2 backdrop-blur-sm bg-background/50">
                  <Link href="/sell">List an Item</Link>
                </Button>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-6 max-w-2xl mx-auto backdrop-blur-sm bg-background/30 rounded-2xl p-8 border border-border/50">
                <div className="text-center">
                  <div className="text-3xl md:text-4xl font-bold text-primary mb-1">10k+</div>
                  <div className="text-sm text-muted-foreground">Active Users</div>
                </div>
                <div className="text-center border-x border-border/50">
                  <div className="text-3xl md:text-4xl font-bold text-primary mb-1">50k+</div>
                  <div className="text-sm text-muted-foreground">Items Listed</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl md:text-4xl font-bold text-primary mb-1">200+</div>
                  <div className="text-sm text-muted-foreground">Campuses</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Floating badges */}
        <div className="absolute top-24 right-8 bg-primary text-primary-foreground px-6 py-3 rounded-full shadow-2xl animate-bounce backdrop-blur-sm" style={{ animationDuration: '3s' }}>
          <div className="text-sm font-semibold">🔥 Trending Now</div>
        </div>
        <div className="absolute bottom-32 left-8 bg-accent text-accent-foreground px-6 py-3 rounded-full shadow-2xl animate-bounce delay-500 backdrop-blur-sm" style={{ animationDuration: '3s' }}>
          <div className="text-sm font-semibold">💯 Verified Students</div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 relative">
        <div className="absolute inset-0 bg-linear-to-b from-background via-muted/30 to-background -z-10" />
        
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 animate-in fade-in slide-in-from-bottom duration-700">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">
              Built for <span className="text-primary">Student Life</span>
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Everything you need to buy, sell, and connect with your campus community
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            <FeatureCard
              icon={<Heart className="w-7 h-7" />}
              title="Swipe & Match"
              description="Addictive browsing experience inspired by apps you already love"
            />
            <FeatureCard
              icon={<Users className="w-7 h-7" />}
              title="Verified Students"
              description="Campus-only access with .edu email verification for safety"
            />
            <FeatureCard
              icon={<MessageCircle className="w-7 h-7" />}
              title="Instant Messaging"
              description="Chat directly with buyers and sellers in real-time"
            />
            <FeatureCard
              icon={<MapPin className="w-7 h-7" />}
              title="Campus Proximity"
              description="See how far items are from you with distance tracking"
            />
          </div>

          {/* Popular Categories */}
          <div className="mt-20">
            <h3 className="text-2xl md:text-3xl font-bold text-center mb-12">Popular Categories</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {['📚 Textbooks', '💻 Electronics', '🛋️ Furniture', '👕 Fashion', '🎮 Gaming', '🎨 Art Supplies'].map((category, idx) => (
                <div 
                  key={idx}
                  className="bg-card hover:bg-accent/50 rounded-xl p-6 text-center cursor-pointer transition-all hover-scale shadow-sm"
                >
                  <div className="text-3xl mb-2">{category.split(' ')[0]}</div>
                  <div className="text-sm font-medium">{category.split(' ').slice(1).join(' ')}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 relative">
        <div className="absolute inset-0 bg-linear-to-t from-background via-primary/5 to-background -z-10" />
        
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto relative">
            {/* Decorative elements */}
            <div className="absolute -top-12 -right-12 w-64 h-64 bg-primary/20 rounded-full blur-3xl -z-10 animate-pulse" />
            <div className="absolute -bottom-12 -left-12 w-64 h-64 bg-accent/20 rounded-full blur-3xl -z-10 animate-pulse delay-500" />
            
            <div className="bg-linear-to-br from-primary via-primary/90 to-accent rounded-3xl p-12 md:p-16 text-center text-primary-foreground shadow-2xl animate-in fade-in scale-in duration-700">
              <h2 className="text-3xl md:text-5xl font-bold mb-6">
                Join 10,000+ Students Today
              </h2>
              <p className="text-lg md:text-xl opacity-90 mb-8 max-w-2xl mx-auto">
                Sign up with your .edu email and discover the easiest way to buy and sell on campus
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild size="lg" variant="secondary" className="shadow-lg text-lg px-8 hover-scale">
                  <Link href="/auth">Get Started Free</Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="border-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/10 text-lg px-8 hover-scale">
                  <Link href="/browse">Browse Listings</Link>
                </Button>
              </div>
              
              <div className="mt-10 flex items-center justify-center gap-8 text-sm opacity-80">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-primary-foreground rounded-full animate-pulse" />
                  <span>No fees</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-primary-foreground rounded-full animate-pulse delay-200" />
                  <span>Verified students only</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-primary-foreground rounded-full animate-pulse delay-500" />
                  <span>100% free to use</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
    )
}

const FeatureCard = ({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) => {
  return (
    <div className="bg-card rounded-2xl p-8 shadow-soft hover:shadow-medium transition-shadow">
      <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary mb-4">
        {icon}
      </div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </div>
  );
};