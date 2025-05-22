"use client";
import { addToCart } from "@/lib/actions";
import { MenuItemCard } from "./menu-item-card";
import { toast } from "sonner";
import { OrderWithItems, RestaurantWithMenuItems } from "@/type";

export default function MenuItemsList({
  cart,
  restaurant,
}: {
    cart: OrderWithItems | null;
    restaurant: RestaurantWithMenuItems;
}) {
  const handleAddToCart = async (formData: FormData) => {
    const result = await addToCart(formData);
    if (result.error) {
      toast.error(result.error);
    }
  };
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-semibold">Menu</h2>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {restaurant.menuItems.map((item) => (
          <MenuItemCard
            key={item.id}
            item={item}
            cart={cart}
            handleAddToCart={handleAddToCart}
          />
        ))}
      </div>
    </div>
  );
}
