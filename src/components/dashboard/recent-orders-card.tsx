import {
  Order,
  OrderStatus,
  User,
} from "@prisma/client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ShoppingBag } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

interface ExtendedOrder extends Order {
  orderItems: {
    quantity: number;
    menuItem: {
      name: string;
      restaurant: {
        name: string;
      };
    };
  }[];
}

interface RecentOrdersCardProps {
  orders: ExtendedOrder[];
  user: User;
}

export function RecentOrdersCard({ orders }: RecentOrdersCardProps) {
  return (
    <Card className="col-span-4">
      <CardHeader>
        <CardTitle>Recent Orders</CardTitle>
        <CardDescription>Your most recent orders</CardDescription>
      </CardHeader>
      <CardContent>
        {orders.length > 0 ? (
          <div className="space-y-6">
            {orders.slice(0, 5).map((order) => {
              const restaurantNames = Array.from(
                new Set(
                  order.orderItems.map((item) => item.menuItem.restaurant.name)
                )
              );
              return (
                <div key={order.id} className="space-y-2 border-b pb-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">
                        {restaurantNames.join(", ")}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {new Date(order.createdAt).toLocaleDateString("en-US", {
                          weekday: "short",
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })}
                      </p>
                    </div>
                    <div className="flex items-center gap-4">
                      <p className="font-medium">${order.total.toFixed(2)}</p>
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${
                          order.status === OrderStatus.PLACED
                            ? "bg-yellow-100 text-yellow-800"
                            : order.status === OrderStatus.COMPLETED
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {order.status}
                      </span>
                    </div>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {order.orderItems
                      .map((item) => `${item.quantity}x ${item.menuItem.name}`)
                      .join(", ")}
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-8 text-center">
            <ShoppingBag className="h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-medium">No orders yet</h3>
            <p className="text-sm text-muted-foreground mb-4">
              You haven&apos;t placed any orders yet.
            </p>
            <Link href="/restaurants">
              <Button>Browse Restaurants</Button>
            </Link>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
