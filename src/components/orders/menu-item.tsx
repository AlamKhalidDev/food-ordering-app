import { OrderItemWithMenuItem } from "@/type";
import Image from "next/image";

interface MenuItemProps {
  item: OrderItemWithMenuItem;
}

export function MenuItem({ item }: MenuItemProps) {
  return (
    <div className="flex items-start gap-3 p-3 rounded-lg border bg-background hover:bg-muted/50 transition-colors">
      <Image src={item.menuItem.imageUrl} alt={item.menuItem.name} width={56} height={56} className="h-14 w-14 rounded-md object-cover" />
      <div className="flex-1 min-w-0">
        <p className="font-medium truncate">{item.menuItem.name}</p>
        <div className="flex items-center justify-between mt-1">
          <p className="text-sm text-muted-foreground">Qty: {item.quantity}</p>
          <p className="font-medium">${item.price.toFixed(2)}</p>
        </div>
      </div>
    </div>
  );
}
