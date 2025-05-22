import { LoginForm } from "@/components/auth/login-form";
import Link from "next/link";
import { UtensilsCrossed } from "lucide-react";

export default async function LoginPage() {
  return (
    <div className="flex min-h-screen flex-col md:flex-row">
      <div className="hidden md:flex md:w-1/2 bg-primary/10 auth-background items-center justify-center p-10">
        <div className="max-w-md">
          <div>
            <Link href="/" className="flex items-center gap-2 mb-8">
              <UtensilsCrossed className="h-8 w-8 text-primary" />
              <h1 className="text-3xl font-bold">FoodHub</h1>
            </Link>
          </div>
          <h2 className="text-3xl font-bold mb-6">Welcome back to FoodHub</h2>
          <p className="text-lg text-muted-foreground mb-8">
            Log in to your account to order delicious food from your favorite
            restaurants.
          </p>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <h3 className="font-medium mb-1">Fast Delivery</h3>
              <p className="text-sm text-muted-foreground">
                Get your food delivered quickly and efficiently
              </p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <h3 className="font-medium mb-1">Easy Ordering</h3>
              <p className="text-sm text-muted-foreground">
                Simple and intuitive ordering process
              </p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <h3 className="font-medium mb-1">Secure Payments</h3>
              <p className="text-sm text-muted-foreground">
                Safe and reliable payment methods
              </p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <h3 className="font-medium mb-1">Order Tracking</h3>
              <p className="text-sm text-muted-foreground">
                Track your order in real-time
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-1 items-center justify-center p-6 md:p-10">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center md:text-left">
            <div className="md:hidden flex items-center justify-center gap-2 mb-8">
              <UtensilsCrossed className="h-8 w-8 text-primary" />
              <h1 className="text-3xl font-bold">FoodHub</h1>
            </div>
            <h2 className="text-2xl font-bold tracking-tight">
              Sign in to your account
            </h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Enter your credentials to access the food ordering platform
            </p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border border-border">
            <LoginForm />
          </div>
          <p className="text-center text-sm text-muted-foreground">
            Don&apos;t have an account?{" "}
            <Link
              href="/register"
              className="text-primary font-medium hover:underline"
            >
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
