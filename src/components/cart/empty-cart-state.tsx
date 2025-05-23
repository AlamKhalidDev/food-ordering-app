import { ShoppingBag, Store } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export function EmptyCartState() {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <div className="bg-muted/30 rounded-full p-6 mb-6">
        <ShoppingBag className="h-12 w-12 text-muted-foreground" />
      </div>
      <h1 className="text-2xl font-bold mb-2">Your cart is empty</h1>
      <p className="text-muted-foreground mb-6 max-w-md">
        Looks like you haven&apos;t added any items to your cart yet. Start browsing
        our restaurants to find delicious food.
      </p>
      <Link href="/restaurants">
        <Button className="gap-2">
          <Store className="h-4 w-4" />
          Browse Restaurants
        </Button>
      </Link>
    </div>
  );
}
