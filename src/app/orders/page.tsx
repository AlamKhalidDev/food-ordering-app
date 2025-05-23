import { getUserOrders } from "@/lib/data";
import { getCurrentUser } from "@/lib/session";
import { OrderStatus, Role } from "@prisma/client";
import { Tabs, TabsContent, TabsList } from "@/components/ui/tabs";
import { OrderList } from "@/components/orders/order-list";
import { Clock, CheckCircle, XCircle, List } from "lucide-react";
import { TabTrigger } from "@/components/orders/tab-trigger";
import { redirect } from "next/navigation";

export default async function OrdersPage() {
  const user = await getCurrentUser();
  if (!user) {
    redirect("/login");
  }
  const orders = await getUserOrders();
  const canCancelOrder = user.role === Role.ADMIN || user.role === Role.MANAGER;

  const placedOrders = orders.filter(
    (order) => order.status === OrderStatus.PLACED
  );
  const completedOrders = orders.filter(
    (order) => order.status === OrderStatus.COMPLETED
  );
  const cancelledOrders = orders.filter(
    (order) => order.status === OrderStatus.CANCELLED
  );

  return (
    <div className="space-y-8 w-full">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Orders</h1>
          <p className="text-muted-foreground mt-1">
            {user.role === Role.ADMIN
              ? "All orders across the organization"
              : user.role === Role.MANAGER
              ? `Orders from ${user.country}`
              : "Your order history"}
          </p>
        </div>
      </div>

      <Tabs defaultValue="all" className="w-full">
        <TabsList className="grid grid-cols-4 mb-8 w-full">
          <TabTrigger value="all" icon={<List className="h-4 w-4" />}>
            All Orders
          </TabTrigger>
          <TabTrigger value="placed" icon={<Clock className="h-4 w-4" />}>
            Pending
          </TabTrigger>
          <TabTrigger
            value="completed"
            icon={<CheckCircle className="h-4 w-4" />}
          >
            Completed
          </TabTrigger>
          <TabTrigger value="cancelled" icon={<XCircle className="h-4 w-4" />}>
            Cancelled
          </TabTrigger>
        </TabsList>

        <TabsContent value="all">
          <OrderList orders={orders} canCancelOrder={canCancelOrder} />
        </TabsContent>
        <TabsContent value="placed">
          <OrderList orders={placedOrders} canCancelOrder={canCancelOrder} />
        </TabsContent>
        <TabsContent value="completed">
          <OrderList orders={completedOrders} canCancelOrder={canCancelOrder} />
        </TabsContent>
        <TabsContent value="cancelled">
          <OrderList orders={cancelledOrders} canCancelOrder={canCancelOrder} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
