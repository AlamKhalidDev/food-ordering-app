import { Button } from "@/components/ui/button";
import { OrderItemWithMenuItem, OrderWithItems } from "@/type";
import { MenuItem } from "@prisma/client";
import { Minus, Plus } from "lucide-react";

export function QuantityControls({
  item,
  cart,
  cartItem,
  handleAddToCart,
}: {
  item: MenuItem;
  cart: OrderWithItems | null;
  cartItem: OrderItemWithMenuItem;
  handleAddToCart: (formData: FormData) => Promise<void>;
}) {
  return (
    <div className="flex items-center justify-between w-full">
      <div className="flex items-center gap-2">
        <form action={handleAddToCart}>
          <input type="hidden" name="menuItemId" value={item.id} />
          <input type="hidden" name="orderId" value={cart!.id} />
          <input type="hidden" name="quantity" value={-1} />
          <Button
            variant="outline"
            size="icon"
            type="submit"
            disabled={cartItem.quantity <= 0}
            className="h-8 w-8"
          >
            <Minus className="h-4 w-4" />
          </Button>
        </form>
        <span className="font-medium w-6 text-center">{cartItem.quantity}</span>
        <form action={handleAddToCart}>
          <input type="hidden" name="menuItemId" value={item.id} />
          <input type="hidden" name="orderId" value={cart!.id} />
          <input type="hidden" name="quantity" value={1} />
          <Button
            variant="outline"
            size="icon"
            type="submit"
            className="h-8 w-8"
          >
            <Plus className="h-4 w-4" />
          </Button>
        </form>
      </div>
      <span className="font-medium">${cartItem.price.toFixed(2)}</span>
    </div>
  );
}
