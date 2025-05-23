"use client";
import { Button } from "@/components/ui/button";
import { Minus, Plus, Trash } from "lucide-react";
import { addToCart, removeFromCart } from "@/lib/actions";
import { toast } from "sonner";
import { OrderItemWithMenuItem } from "@/type";
import Image from "next/image";

interface CartItemProps {
  item: OrderItemWithMenuItem;
  cartId: string;
}

export function CartItem({ item, cartId }: CartItemProps) {
  const handleAddToCart = async (formData: FormData) => {
    const result = await addToCart(formData);
    if (result.error) {
      toast.error(result.error);
    }
  };

  const handleRemoveFromCart = async (formData: FormData) => {
    const result = await removeFromCart(formData);
    if (result.error) {
      toast.error(result.error);
    }
  };
  return (
    <div className="flex items-center gap-2 md:gap-4 pb-4 border-b last:border-0 last:pb-0">
      <Image src={item.menuItem.imageUrl} alt={item.menuItem.name} width={64} height={64} className="rounded-md h-16 w-16" />
      <div className="flex-1 min-w-0">
        <p className="font-medium truncate">{item.menuItem.name}</p>
        <p className="text-sm text-muted-foreground">
          ${item.menuItem.price.toFixed(2)} x {item.quantity}
        </p>
      </div>
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2">
          <form action={handleAddToCart}>
            <input type="hidden" name="menuItemId" value={item.menuItem.id} />
            <input type="hidden" name="orderId" value={cartId} />
            <input type="hidden" name="quantity" value={-1} />
            <Button
              variant="outline"
              size="icon"
              type="submit"
              disabled={item.quantity <= 0}
              className="h-8 w-8"
            >
              <Minus className="h-4 w-4" />
            </Button>
          </form>
          <span className="font-medium w-6 text-center">{item.quantity}</span>
          <form action={handleAddToCart}>
            <input type="hidden" name="menuItemId" value={item.menuItem.id} />
            <input type="hidden" name="orderId" value={cartId} />
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
        <p className="font-medium w-20 text-right">${item.price.toFixed(2)}</p>
        <form action={handleRemoveFromCart}>
          <input type="hidden" name="orderItemId" value={item.id} />
          <input type="hidden" name="orderId" value={cartId} />
          <Button
            variant="ghost"
            size="icon"
            type="submit"
            className="h-8 w-8 text-muted-foreground hover:text-destructive"
          >
            <Trash className="h-4 w-4" />
          </Button>
        </form>
      </div>
    </div>
  );
}
