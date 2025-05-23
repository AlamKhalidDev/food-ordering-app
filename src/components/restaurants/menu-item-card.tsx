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
import Image from "next/image";

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
      <Image src={item.imageUrl} alt={item.name} width={400} height={300} className="h-[300px]" />
      <CardHeader className="">
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg">{item.name}</CardTitle>
          <p className="font-bold text-primary">${item.price.toFixed(2)}</p>
        </div>
      </CardHeader>
      <CardContent className="">
        <p className="text-sm text-muted-foreground line-clamp-2">
          {item.description}
        </p>
      </CardContent>
      <CardFooter className="">
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
