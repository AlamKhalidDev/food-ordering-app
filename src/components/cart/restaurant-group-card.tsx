import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Store, MapPin } from "lucide-react";
import { CartItem } from "@/components/cart/cart-item";
import { RestaurantGroup } from "@/type";

interface RestaurantGroupCardProps {
  group: RestaurantGroup
  cartId: string;
}

export function RestaurantGroupCard({
  group,
  cartId,
}: RestaurantGroupCardProps) {
  return (
    <Card className="overflow-hidden">
      <CardHeader className="pb-3 bg-muted/30">
        <CardTitle className="text-xl flex items-center gap-2">
          <Store className="h-5 w-5 text-primary" />
          {group.restaurant.name}
        </CardTitle>
        <CardDescription className="flex items-center gap-1">
          <MapPin className="h-3.5 w-3.5" />
          {group.restaurant.country}
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-6">
        <div className="space-y-4">
          {group.items.map((item) => (
            <CartItem key={item.id} item={item} cartId={cartId} />
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
