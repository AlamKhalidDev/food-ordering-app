import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { QuantityControls } from "./quantity-controls";
import { AddToCartButton } from "./add-to-cart-button";
import { OrderWithItems } from "@/type";
import { MenuItem } from "@prisma/client";

export function MenuItemCard({
  item,
  cart,
  handleAddToCart,
}: {
  item: MenuItem;
  cart: OrderWithItems | null;
  handleAddToCart: (formData: FormData) => Promise<void>;
}) {
  const cartItem = cart?.orderItems.find(
    (orderItem) => orderItem.menuItem.id === item.id
  );

  return (
    <Card className="overflow-hidden border-none shadow-md food-card-hover">
      <div
        className="menu-item-image"
        style={{
          backgroundImage: "url('/placeholder.svg?height=300&width=400')",
        }}
      />
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg">{item.name}</CardTitle>
          <p className="font-bold text-primary">${item.price.toFixed(2)}</p>
        </div>
      </CardHeader>
      <CardContent className="pb-2">
        <p className="text-sm text-muted-foreground line-clamp-2">
          {item.description}
        </p>
      </CardContent>
      <CardFooter className="pt-0 pb-4">
        {cartItem ? (
          <QuantityControls
            item={item}
            cart={cart}
            cartItem={cartItem}
            handleAddToCart={handleAddToCart}
          />
        ) : (
          <AddToCartButton
            itemId={item.id}
            cartId={cart?.id}
            handleAddToCart={handleAddToCart}
          />
        )}
      </CardFooter>
    </Card>
  );
}
