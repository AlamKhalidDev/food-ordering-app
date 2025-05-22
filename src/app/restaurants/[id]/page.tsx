import { getRestaurant, getUserCart } from "@/lib/data";
import { notFound } from "next/navigation";
import { RestaurantHeader } from "@/components/restaurants/restaurant-header";
import { RestaurantDescription } from "@/components/restaurants/restaurant-description";
import MenuItemsList from "@/components/restaurants/menu-items-list";

export default async function RestaurantPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const restaurant = await getRestaurant(id);

  if (!restaurant) {
    notFound();
  }

  const cart = await getUserCart();

  return (
    <div className="space-y-8">
      <RestaurantHeader restaurant={restaurant} cart={cart} />
      <RestaurantDescription description={restaurant.description} />
      <MenuItemsList cart={cart} restaurant={restaurant} />
    </div>
  );
}
