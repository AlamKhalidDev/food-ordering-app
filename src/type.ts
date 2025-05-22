import { MenuItem, Order, OrderItem, Restaurant, User } from "@prisma/client";

export interface OrderItemWithMenuItem extends OrderItem {
  menuItem: MenuItem & {
    restaurant: Restaurant;
  };
}

export interface RestaurantGroup {
  restaurant: Restaurant;
  items: OrderItemWithMenuItem[];
}

export interface OrderWithItems extends Order {
  orderItems: OrderItemWithMenuItem[];
  user?: User;
}

export interface RestaurantWithMenuItems extends Restaurant {
  menuItems: MenuItem[];
}