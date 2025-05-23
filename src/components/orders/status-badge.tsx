import { OrderStatus } from "@prisma/client";

interface StatusBadgeProps {
  status: OrderStatus;
}

export function StatusBadge({ status }: StatusBadgeProps) {
  const statusClass = {
    [OrderStatus.PLACED]: "order-status-placed",
    [OrderStatus.COMPLETED]: "order-status-completed",
    [OrderStatus.CANCELLED]: "order-status-cancelled",
    [OrderStatus.CART]: "order-status-cart",
  }[status];

  return (
    <span className={`order-status-badge ml-2 ${statusClass}`}>{status}</span>
  );
}
