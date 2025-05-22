import { RegisterForm } from "@/components/auth/register-form";
import Link from "next/link";
import { UtensilsCrossed } from "lucide-react";

export default async function RegisterPage() {
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
          <h2 className="text-3xl font-bold mb-6">Join FoodHub Today</h2>
          <p className="text-lg text-muted-foreground mb-8">
            Create an account to start ordering delicious food from your
            favorite restaurants.
          </p>
          <div className="grid grid-cols-1 gap-4">
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <h3 className="font-medium mb-1">For Members</h3>
              <p className="text-sm text-muted-foreground">
                Browse restaurants and create orders in your country
              </p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <h3 className="font-medium mb-1">For Managers</h3>
              <p className="text-sm text-muted-foreground">
                Manage orders and restaurants in your assigned country
              </p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <h3 className="font-medium mb-1">For Admins</h3>
              <p className="text-sm text-muted-foreground">
                Full control over the system with global access
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
              Create an account
            </h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Sign up to start ordering delicious food from your favorite
              restaurants
            </p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border border-border">
            <RegisterForm />
          </div>
          <p className="text-center text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link
              href="/login"
              className="text-primary font-medium hover:underline"
            >
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
