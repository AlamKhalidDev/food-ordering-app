import RestaurantsPage from "@/components/restaurants/restaurants-page";
import { getRestaurants } from "@/lib/data";

export default async function RestaurantsPageRoot() {
  const restaurants = await getRestaurants();
  return <RestaurantsPage restaurants={restaurants} />;
}
