import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { RestaurantGroup } from "@/type";

interface CartHeaderProps {
  restaurantGroups: Record<string, RestaurantGroup>;
}

export function CartHeader({ restaurantGroups }: CartHeaderProps) {
  return (
    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Your Cart</h1>
        <p className="text-muted-foreground mt-1">
          {Object.keys(restaurantGroups).length > 1
            ? `Items from ${Object.keys(restaurantGroups).length} restaurants`
            : `Items from ${
                Object.values(restaurantGroups)[0].restaurant.name
              }`}
        </p>
      </div>
      <Link href="/restaurants">
        <Button variant="outline" size="sm" className="gap-2">
          <ArrowLeft className="h-4 w-4" />
          Continue Shopping
        </Button>
      </Link>
    </div>
  );
}
