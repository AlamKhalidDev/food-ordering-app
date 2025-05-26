"use server";

import { prisma } from "@/lib/db";
import { getCurrentUser, hasRole } from "@/lib/session";
import { OrderStatus, Role } from "@prisma/client";
import { revalidatePath } from "next/cache";

export async function addToCart(formData: FormData) {
  const user = await getCurrentUser();

  if (!user) {
    return { error: "Not authenticated" };
  }

  if (!hasRole(user, [Role.ADMIN, Role.MANAGER, Role.MEMBER])) {
    return { error: "You don't have permission to create orders" };
  }

  const menuItemId = formData.get("menuItemId") as string;
  const quantity = Number.parseInt(formData.get("quantity") as string, 10);
  const orderId = formData.get("orderId") as string;

  const menuItem = await prisma.menuItem.findUnique({
    where: { id: menuItemId },
    include: {
      restaurant: true,
    },
  });

  if (!menuItem) {
    return { error: "Menu item not found" };
  }

  if (
    user.role !== Role.ADMIN &&
    menuItem.restaurant.country !== user.country
  ) {
    return { error: "You cannot order from this restaurant" };
  }

  const existingItem = await prisma.orderItem.findFirst({
    where: {
      orderId,
      menuItemId,
    },
  });

  if (existingItem) {
    const newQuantity = existingItem.quantity + quantity;

    if (newQuantity <= 0) {
      await prisma.orderItem.delete({
        where: { id: existingItem.id },
      });
    } else {
      await prisma.orderItem.update({
        where: { id: existingItem.id },
        data: {
          quantity: newQuantity,
          price: menuItem.price * newQuantity,
        },
      });
    }
  } else if (quantity > 0) {
    await prisma.orderItem.create({
      data: {
        orderId,
        menuItemId,
        quantity,
        price: menuItem.price * quantity,
      },
    });
  }

  const orderItems = await prisma.orderItem.findMany({
    where: { orderId },
  });

  const total = orderItems.reduce((sum, item) => sum + item.price, 0);

  await prisma.order.update({
    where: { id: orderId },
    data: { total },
  });

  revalidatePath(`/restaurants/${menuItem.restaurantId}`);
  revalidatePath("/cart");
  return { success: true };
}

export async function placeOrder(formData: FormData) {
  const user = await getCurrentUser();

  if (!user) {
    return { error: "Not authenticated" };
  }

  if (!hasRole(user, [Role.ADMIN, Role.MANAGER])) {
    return { error: "You don't have permission to place orders" };
  }

  const orderId = formData.get("orderId") as string;
  const paymentMethodId = formData.get("paymentMethodId") as string;

  const order = await prisma.order.findUnique({
    where: { id: orderId },
    include: {
      orderItems: {
        include: {
          menuItem: {
            include: {
              restaurant: true,
            },
          },
        },
      },
    },
  });

  if (!order) {
    return { error: "Order not found" };
  }

  if (order.orderItems.length === 0) {
    return { error: "Your cart is empty" };
  }

  if (user.role !== Role.ADMIN) {
    const hasInvalidRestaurant = order.orderItems.some(
      (item) => item.menuItem.restaurant.country !== user.country
    );

    if (hasInvalidRestaurant) {
      return {
        error: "You cannot place orders for restaurants outside your country",
      };
    }
  }

  await prisma.order.update({
    where: { id: orderId },
    data: {
      status: OrderStatus.PLACED,
      paymentMethodId,
    },
  });

  revalidatePath("/orders");
  return { success: true };
  // redirect("/orders");
}

export async function cancelOrder(formData: FormData) {
  const user = await getCurrentUser();

  if (!user) {
    return { error: "Not authenticated" };
  }

  if (!hasRole(user, [Role.ADMIN, Role.MANAGER])) {
    return { error: "You don't have permission to cancel orders" };
  }

  const orderId = formData.get("orderId") as string;

  const order = await prisma.order.findUnique({
    where: { id: orderId },
    include: {
      orderItems: {
        include: {
          menuItem: {
            include: {
              restaurant: true,
            },
          },
        },
      },
    },
  });

  if (!order) {
    return { error: "Order not found" };
  }

  if (user.role !== Role.ADMIN) {
    const hasInvalidRestaurant = order.orderItems.some(
      (item) => item.menuItem.restaurant.country !== user.country
    );

    if (hasInvalidRestaurant) {
      return {
        error: "You cannot cancel orders for restaurants outside your country",
      };
    }
  }

  await prisma.order.update({
    where: { id: orderId },
    data: {
      status: OrderStatus.CANCELLED,
    },
  });

  revalidatePath("/orders");
  return { success: true };
}

export async function removeFromCart(formData: FormData) {
  const user = await getCurrentUser();

  if (!user) {
    return { error: "Not authenticated" };
  }

  const orderItemId = formData.get("orderItemId") as string;
  const orderId = formData.get("orderId") as string;

  await prisma.orderItem.delete({
    where: { id: orderItemId },
  });

  const orderItems = await prisma.orderItem.findMany({
    where: { orderId },
  });

  const total = orderItems.reduce((sum, item) => sum + item.price, 0);

  await prisma.order.update({
    where: { id: orderId },
    data: { total },
  });

  revalidatePath("/cart");
  return { success: true };
}
