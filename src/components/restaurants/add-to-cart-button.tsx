import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

export function AddToCartButton({
  itemId,
  cartId,
  handleAddToCart,
}: {
  itemId: string;
  cartId?: string;
  handleAddToCart: (formData: FormData) => Promise<void>;
}) {
  return (
    <form action={handleAddToCart} className="w-full">
      <input type="hidden" name="menuItemId" value={itemId} />
      <input type="hidden" name="orderId" value={cartId} />
      <input type="hidden" name="quantity" value={1} />
      <Button type="submit" className="w-full gap-2">
        <Plus className="h-4 w-4" />
        Add to Cart
      </Button>
    </form>
  );
}
