"use client";
import { cancelOrder } from "@/lib/actions";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardContent,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { StatusBadge } from "./status-badge";
import { RestaurantGroup } from "./restaurant-group";
import { OrderStatus } from "@prisma/client";
import { toast } from "sonner";
import { OrderWithItems, RestaurantGroup as RestaurantGroupType } from "@/type";

interface OrderCardProps {
  order: OrderWithItems;
  canCancelOrder: boolean;
}

export function OrderCard({ order, canCancelOrder }: OrderCardProps) {
  const restaurantGroups = order.orderItems.reduce((groups, item) => {
    const restaurantId = item.menuItem.restaurant.id;
    if (!groups[restaurantId]) {
      groups[restaurantId] = {
        restaurant: item.menuItem.restaurant,
        items: [],
      };
    }
    groups[restaurantId].items.push(item);
    return groups;
  }, {} as Record<string, RestaurantGroupType>);

  const handleCancelOrder = async (formData: FormData) => {
    const result = await cancelOrder(formData);
    if (result.error) {
      toast.error(result.error);
    }

    if (result.success) {
      toast.success("Order cancelled successfully!");
    }
  };

  return (
    <Card key={order.id} className="overflow-hidden">
      <CardHeader className="pb-3 bg-muted/30">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <CardTitle className="text-lg flex items-center gap-2">
              Order #{order.id.slice(-6)}
              <StatusBadge status={order.status} />
            </CardTitle>
            <CardDescription className="mt-1">
              {new Date(order.createdAt).toLocaleDateString()} -
              {Object.keys(restaurantGroups).length > 1
                ? ` Order from ${
                    Object.keys(restaurantGroups).length
                  } restaurants`
                : ` Order from ${
                    (
                      Object.values(restaurantGroups)[0] as {
                        restaurant: { name: string };
                      }
                    ).restaurant.name
                  }`}
            </CardDescription>
          </div>
          <div className="text-right">
            <p className="font-bold text-lg">${order.total.toFixed(2)}</p>
            {"user" in order && (
              <p className="text-xs text-muted-foreground">
                Ordered by {order.user?.name} ({order.user?.country})
              </p>
            )}
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-6">
        <div className="space-y-6">
          {Object.values(restaurantGroups).map((group: RestaurantGroupType) => (
            <RestaurantGroup key={group.restaurant.id} group={group} />
          ))}

          {order.status === OrderStatus.PLACED && canCancelOrder && (
            <div className="flex justify-end">
              <form action={handleCancelOrder}>
                <input type="hidden" name="orderId" value={order.id} />
                <Button variant="destructive" type="submit" size="sm">
                  Cancel Order
                </Button>
              </form>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
