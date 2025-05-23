import { Store } from "lucide-react";
import { MenuItem } from "./menu-item";
import { OrderItemWithMenuItem, RestaurantGroup as RestaurantGroupType } from "@/type";

interface RestaurantGroupProps {
  group: RestaurantGroupType;
}

export function RestaurantGroup({ group }: RestaurantGroupProps) {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
        <Store className="h-4 w-4" />
        <span>{group.restaurant.name}</span>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {group.items.map((item: OrderItemWithMenuItem) => (
          <MenuItem key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
}
