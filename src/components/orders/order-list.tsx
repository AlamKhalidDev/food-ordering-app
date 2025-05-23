import { OrderWithItems } from "@/type";
import { EmptyOrderState } from "./empty-order-state";
import { OrderCard } from "./order-card";

interface OrderListProps {
  orders: OrderWithItems[];
  canCancelOrder: boolean;
}

export function OrderList({ orders, canCancelOrder }: OrderListProps) {
  if (orders.length === 0) {
    return <EmptyOrderState />;
  }

  return (
    <div className="space-y-6">
      {orders.map((order) => (
        <OrderCard
          key={order.id}
          order={order}
          canCancelOrder={canCancelOrder}
        />
      ))}
    </div>
  );
}
