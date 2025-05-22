import { getCurrentUser } from "@/lib/session";
import { getUserOrders } from "@/lib/data";
import { Role, OrderStatus } from "@prisma/client";
import { ShoppingBag, MapPin, CreditCard, TrendingUp } from "lucide-react";
import { DashboardHeader } from "@/components/dashboard/dashboard-header";
import { StatCard } from "@/components/dashboard/stat-card";
import { RecentOrdersCard } from "@/components/dashboard/recent-orders-card";
import { AccessLevelCard } from "@/components/dashboard/access-level-card";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
  const user = await getCurrentUser();
  if (!user) {
    redirect("/login");
  }
  const orders = await getUserOrders();

  const stats = {
    total: orders.length,
    completed: orders.filter((o) => o.status === OrderStatus.COMPLETED).length,
    cancelled: orders.filter((o) => o.status === OrderStatus.CANCELLED).length,
    pending: orders.filter((o) => o.status === OrderStatus.PLACED).length,
  };

  return (
    <div className="space-y-8">
      <DashboardHeader user={user!} />

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total Orders"
          icon={ShoppingBag}
          value={stats.total}
          description={`All orders ${
            user!.role !== Role.ADMIN ? "in your country" : ""
          }`}
        />
        <StatCard
          title="Pending Orders"
          icon={TrendingUp}
          value={stats.pending}
          description="Orders waiting to be processed"
        />
        <StatCard
          title="Completed Orders"
          icon={MapPin}
          value={stats.completed}
          description="Successfully delivered orders"
        />
        <StatCard
          title="Cancelled Orders"
          icon={CreditCard}
          value={stats.cancelled}
          description="Orders that were cancelled"
        />
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <RecentOrdersCard orders={orders} user={user!} />
        <AccessLevelCard user={user!} />
      </div>
    </div>
  );
}
