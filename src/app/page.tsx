import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, UtensilsCrossed, ShieldCheck, Truck } from "lucide-react";

export default async function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="px-4 lg:px-6 h-16 flex items-center border-b bg-white/80 backdrop-blur-md">
        <div className="container flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <UtensilsCrossed className="h-6 w-6 text-primary" />
            <span className="font-bold text-xl">FoodHub</span>
          </Link>
          <nav className="flex gap-4 sm:gap-6">
            <Link
              href="/login"
              className="text-sm font-medium hover:text-primary transition-colors"
            >
              <Button variant="ghost" size="sm">
                Login
              </Button>
            </Link>
            <Link href="/register">
              <Button variant="default" size="sm">
                Sign Up
              </Button>
            </Link>
          </nav>
        </div>
      </header>
      <main className="flex-1">
        <section className="w-full py-6 md:py-12 lg:py-18 xl:py-24">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
              <div className="space-y-4">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl md:text-6xl">
                  Your Favorite Meals{" "}
                  <span className="text-primary">Delivered Hot</span>
                </h1>
                <p className="max-w-[600px] text-muted-foreground md:text-xl">
                  Discover the best restaurants in your area and get your food
                  delivered fast to your doorstep. Order now and enjoy!
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link href="/register">
                    <Button size="lg" className="gap-1.5">
                      Order Now
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </Link>
                  <Link href="/login">
                    <Button variant="outline" size="lg">
                      Sign In
                    </Button>
                  </Link>
                </div>
              </div>
              <div className="relative lg:block hidden">
                <div className="absolute -top-8 -right-8 w-72 h-72 bg-primary/10 rounded-full blur-3xl"></div>
                <div className="relative bg-white rounded-2xl shadow-xl overflow-hidden">
                  <div className="aspect-[4/3] bg-[url('/placeholder.svg?height=600&width=800')] bg-cover bg-center"></div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 bg-muted/50">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center text-center space-y-4 mb-12">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">
                  Why Choose FoodHub?
                </h2>
                <p className="max-w-[700px] text-muted-foreground md:text-lg">
                  We make food ordering simple, fast, and enjoyable
                </p>
              </div>
            </div>
            <div className="grid gap-6 lg:grid-cols-3 items-center">
              <div className="bg-white p-6 rounded-xl shadow-sm border border-border food-card-hover">
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <UtensilsCrossed className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-2">100+ Restaurants</h3>
                <p className="text-muted-foreground">
                  Explore diverse cuisines from local favorites to popular
                  chains
                </p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-sm border border-border food-card-hover">
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <Truck className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-2">Fast Delivery</h3>
                <p className="text-muted-foreground">
                  Get your food delivered in under 30 minutes
                </p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-sm border border-border food-card-hover">
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <ShieldCheck className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-2">Secure Payments</h3>
                <p className="text-muted-foreground">
                  Safe and encrypted payment processing
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="border-t bg-white">
        <div className="container flex flex-col md:flex-row gap-4 py-8 items-center justify-between">
          <div className="flex items-center gap-2">
            <UtensilsCrossed className="h-5 w-5 text-primary" />
            <p className="text-sm text-muted-foreground">
              &copy; {new Date().getFullYear()} FoodHub Inc. All rights
              reserved.
            </p>
          </div>
          <nav className="flex gap-4 sm:gap-6">
            <Link
              href="#"
              className="text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              Terms
            </Link>
            <Link
              href="#"
              className="text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              Privacy
            </Link>
            <Link
              href="#"
              className="text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              Contact
            </Link>
          </nav>
        </div>
      </footer>
    </div>
  );
}
