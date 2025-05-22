import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { MapPin, ShoppingBag } from "lucide-react";
import { OrderWithItems, RestaurantWithMenuItems } from "@/type";

export function RestaurantHeader({
  restaurant,
  cart,
}: {
  restaurant: RestaurantWithMenuItems;
  cart: OrderWithItems | null;
}) {
  return (
    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">{restaurant.name}</h1>
        <p className="text-muted-foreground flex items-center gap-1 mt-1">
          <MapPin className="h-4 w-4" />
          <span>{restaurant.country}</span>
        </p>
      </div>
      <div className="flex items-center gap-2">
        <Badge
          variant="outline"
          className="bg-primary/10 text-primary border-primary/20"
        >
          {restaurant.menuItems.length} Menu Items
        </Badge>
        {cart && cart.orderItems.length > 0 && (
          <Link href="/cart">
            <Button variant="outline" className="gap-2">
              <ShoppingBag className="h-4 w-4" />
              <span>
                View Cart (
                {cart.orderItems.reduce(
                  (total, item) => total + item.quantity,
                  0
                )}
                )
              </span>
            </Button>
          </Link>
        )}
      </div>
    </div>
  );
}
