import { prisma } from "@/lib/db";
import { getCurrentUser, hasRole } from "@/lib/session";
import { OrderStatus, Role } from "@prisma/client";
import { redirect } from "next/navigation";

export async function getRestaurants() {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/login");
  }

  if (!hasRole(user, [Role.ADMIN, Role.MANAGER, Role.MEMBER])) {
    throw new Error("You don't have permission to view restaurants");
  }

  const countryFilter =
    user.role === Role.ADMIN ? {} : { country: user.country };

  return prisma.restaurant.findMany({
    where: countryFilter,
    include: {
      menuItems: true,
    },
  });
}

export async function getRestaurant(id: string) {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/login");
  }

  if (!hasRole(user, [Role.ADMIN, Role.MANAGER, Role.MEMBER])) {
    throw new Error("You don't have permission to view restaurants");
  }

  const restaurant = await prisma.restaurant.findUnique({
    where: { id },
    include: {
      menuItems: true,
    },
  });

  if (!restaurant) {
    return null;
  }

  if (user.role !== Role.ADMIN && restaurant.country !== user.country) {
    return null;
  }

  return restaurant;
}

export async function getUserCart() {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/login");
  }

  if (!hasRole(user, [Role.ADMIN, Role.MANAGER, Role.MEMBER])) {
    throw new Error("You don't have permission to create orders");
  }

  let cart = await prisma.order.findFirst({
    where: {
      userId: user.id,
      status: OrderStatus.CART,
    },
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

  if (!cart) {
    cart = await prisma.order.create({
      data: {
        userId: user.id,
        status: OrderStatus.CART,
        total: 0,
      },
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
  }

  return cart;
}

export async function getUserOrders() {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/login");
  }

  if (!hasRole(user, [Role.ADMIN, Role.MANAGER, Role.MEMBER])) {
    throw new Error("You don't have permission to view orders");
  }

  if (user.role === Role.ADMIN) {
    return prisma.order.findMany({
      where: {
        status: {
          not: OrderStatus.CART,
        },
      },
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
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            country: true,
            role: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });
  }

  if (user.role === Role.MANAGER) {
    return prisma.order.findMany({
      where: {
        status: {
          not: OrderStatus.CART,
        },
        orderItems: {
          some: {
            menuItem: {
              restaurant: {
                country: user.country,
              },
            },
          },
        },
      },
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
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            country: true,
            role: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });
  }

  return prisma.order.findMany({
    where: {
      userId: user.id,
      status: {
        not: OrderStatus.CART,
      },
    },
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
    orderBy: {
      createdAt: "desc",
    },
  });
}

export async function getPaymentMethods() {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/login");
  }

  if (user.role !== Role.ADMIN) {
    return [];
  }

  return prisma.paymentMethod.findMany({
    where: {
      userId: user.id,
    },
  });
}

export async function getAllPaymentMethods() {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/login");
  }

  return prisma.paymentMethod.findMany();
}
