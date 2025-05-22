import { PrismaClient, Role, Country } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  await prisma.orderItem.deleteMany();
  await prisma.order.deleteMany();
  await prisma.paymentMethod.deleteMany();
  await prisma.menuItem.deleteMany();
  await prisma.restaurant.deleteMany();
  await prisma.session.deleteMany();
  await prisma.user.deleteMany();

  const adminPassword = await bcrypt.hash("admin123", 10);
  const userPassword = await bcrypt.hash("password123", 10);

  const admin = await prisma.user.create({
    data: {
      name: "Nick Fury",
      email: "nick.fury@shield.com",
      password: adminPassword,
      role: Role.ADMIN,
      country: Country.AMERICA,
    },
  });

  const managerIndia = await prisma.user.create({
    data: {
      name: "Captain Marvel",
      email: "captain.marvel@shield.com",
      password: userPassword,
      role: Role.MANAGER,
      country: Country.INDIA,
    },
  });

  const managerAmerica = await prisma.user.create({
    data: {
      name: "Captain America",
      email: "captain.america@shield.com",
      password: userPassword,
      role: Role.MANAGER,
      country: Country.AMERICA,
    },
  });

  const memberIndia1 = await prisma.user.create({
    data: {
      name: "Thanos",
      email: "thanos@shield.com",
      password: userPassword,
      role: Role.MEMBER,
      country: Country.INDIA,
    },
  });

  const memberIndia2 = await prisma.user.create({
    data: {
      name: "Thor",
      email: "thor@shield.com",
      password: userPassword,
      role: Role.MEMBER,
      country: Country.INDIA,
    },
  });

  const memberAmerica = await prisma.user.create({
    data: {
      name: "Travis",
      email: "travis@shield.com",
      password: userPassword,
      role: Role.MEMBER,
      country: Country.AMERICA,
    },
  });

  const indianRestaurant1 = await prisma.restaurant.create({
    data: {
      name: "Taj Mahal",
      description: "Authentic Indian cuisine with a modern twist",
      country: Country.INDIA,
    },
  });

  const indianRestaurant2 = await prisma.restaurant.create({
    data: {
      name: "Spice Garden",
      description: "Traditional Indian dishes from all regions",
      country: Country.INDIA,
    },
  });

  const americanRestaurant1 = await prisma.restaurant.create({
    data: {
      name: "Burger Joint",
      description: "Classic American burgers and fries",
      country: Country.AMERICA,
    },
  });

  const americanRestaurant2 = await prisma.restaurant.create({
    data: {
      name: "Pizza Palace",
      description: "New York style pizzas with various toppings",
      country: Country.AMERICA,
    },
  });

  await prisma.menuItem.createMany({
    data: [
      {
        name: "Butter Chicken",
        description: "Tender chicken in a rich buttery tomato sauce",
        price: 12.99,
        restaurantId: indianRestaurant1.id,
      },
      {
        name: "Paneer Tikka",
        description: "Grilled cottage cheese with spices",
        price: 10.99,
        restaurantId: indianRestaurant1.id,
      },
      {
        name: "Naan Bread",
        description: "Freshly baked Indian bread",
        price: 2.99,
        restaurantId: indianRestaurant1.id,
      },
      {
        name: "Biryani",
        description: "Fragrant rice dish with spices and vegetables",
        price: 14.99,
        restaurantId: indianRestaurant1.id,
      },
    ],
  });

  await prisma.menuItem.createMany({
    data: [
      {
        name: "Masala Dosa",
        description: "Crispy rice crepe filled with spiced potatoes",
        price: 8.99,
        restaurantId: indianRestaurant2.id,
      },
      {
        name: "Chole Bhature",
        description: "Spicy chickpea curry with fried bread",
        price: 9.99,
        restaurantId: indianRestaurant2.id,
      },
      {
        name: "Samosa",
        description: "Crispy pastry filled with spiced potatoes and peas",
        price: 4.99,
        restaurantId: indianRestaurant2.id,
      },
      {
        name: "Gulab Jamun",
        description: "Sweet milk solids balls soaked in sugar syrup",
        price: 5.99,
        restaurantId: indianRestaurant2.id,
      },
    ],
  });

  await prisma.menuItem.createMany({
    data: [
      {
        name: "Classic Burger",
        description: "Beef patty with lettuce, tomato, and special sauce",
        price: 8.99,
        restaurantId: americanRestaurant1.id,
      },
      {
        name: "Cheeseburger",
        description: "Classic burger with American cheese",
        price: 9.99,
        restaurantId: americanRestaurant1.id,
      },
      {
        name: "French Fries",
        description: "Crispy golden fries with sea salt",
        price: 3.99,
        restaurantId: americanRestaurant1.id,
      },
      {
        name: "Milkshake",
        description: "Thick and creamy vanilla milkshake",
        price: 4.99,
        restaurantId: americanRestaurant1.id,
      },
    ],
  });

  await prisma.menuItem.createMany({
    data: [
      {
        name: "Margherita Pizza",
        description: "Classic pizza with tomato sauce, mozzarella, and basil",
        price: 12.99,
        restaurantId: americanRestaurant2.id,
      },
      {
        name: "Pepperoni Pizza",
        description: "Pizza topped with pepperoni slices",
        price: 14.99,
        restaurantId: americanRestaurant2.id,
      },
      {
        name: "Garlic Bread",
        description: "Toasted bread with garlic butter",
        price: 4.99,
        restaurantId: americanRestaurant2.id,
      },
      {
        name: "Caesar Salad",
        description: "Romaine lettuce with Caesar dressing and croutons",
        price: 7.99,
        restaurantId: americanRestaurant2.id,
      },
    ],
  });

  await prisma.paymentMethod.createMany({
    data: [
      {
        userId: admin.id,
        type: "Credit Card",
        details: "Visa ending in 1234",
        isDefault: true,
      },
      {
        userId: admin.id,
        type: "PayPal",
        details: "nick.fury@shield.com",
        isDefault: false,
      },
    ],
  });

  console.log("Database seeded successfully");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
