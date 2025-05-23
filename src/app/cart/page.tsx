import { getCurrentUser } from "@/lib/session";
import { getUserCart, getAllPaymentMethods } from "@/lib/data";
import { Role } from "@prisma/client";
import { EmptyCartState } from "@/components/cart/empty-cart-state";
import { CartHeader } from "@/components/cart/cart-header";
import { RestaurantGroupCard } from "@/components/cart/restaurant-group-card";
import { PermissionWarningCard } from "@/components/cart/permission-warning-card";
import { OrderSummaryCard } from "@/components/cart/order-summary-card";
import { redirect } from "next/navigation";
import { RestaurantGroup } from "@/type";


export default async function CartPage() {
  const user = await getCurrentUser();
  if (!user) {
    redirect("/login");
  }
  const cart = await getUserCart();
  const paymentMethods = await getAllPaymentMethods();
  const canPlaceOrder = user.role === Role.ADMIN || user.role === Role.MANAGER;

  if (!cart || cart.orderItems.length === 0) {
    return <EmptyCartState />;
  }

  const restaurantGroups = cart.orderItems.reduce((groups, item) => {
    const restaurantId = item.menuItem.restaurant.id;
    if (!groups[restaurantId]) {
      groups[restaurantId] = {
        restaurant: item.menuItem.restaurant,
        items: [],
      };
    }
    groups[restaurantId].items.push(item);
    return groups;
  }, {} as Record<string, RestaurantGroup>);

  const cartTotal = cart.orderItems.reduce((sum, item) => sum + item.price, 0);
  const tax = cartTotal * 0.1;
  const finalTotal = cartTotal + tax;

  return (
    <div className="space-y-8 w-full">
      <CartHeader restaurantGroups={restaurantGroups} />
      <div className="grid gap-8 md:grid-cols-3 w-full">
        <div className="md:col-span-2 space-y-6 w-full">
          {Object.values(restaurantGroups).map((group) => (
            <RestaurantGroupCard
              key={group.restaurant.id}
              group={group}
              cartId={cart.id}
            />
          ))}
          {!canPlaceOrder && <PermissionWarningCard />}
        </div>
        <div className="w-full">
          <OrderSummaryCard
            cartTotal={cartTotal}
            tax={tax}
            finalTotal={finalTotal}
            canPlaceOrder={canPlaceOrder}
            paymentMethods={paymentMethods}
            cartId={cart.id}
            userRole={user.role}
          />
        </div>
      </div>
    </div>
  );
}
