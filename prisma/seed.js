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
      imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRnvr9LRGocwyY0SFKsdo-kUm6qCnYK8vFAdQ&s",
      country: Country.INDIA,
    },
  });

  const indianRestaurant2 = await prisma.restaurant.create({
    data: {
      name: "Spice Garden",
      description: "Traditional Indian dishes from all regions",
      imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQjKPPNSf6xr6fRvtmXLBGOmyMnr6jieQakeQ&s",
      country: Country.INDIA,
    },
  });

  const americanRestaurant1 = await prisma.restaurant.create({
    data: {
      name: "Burger Joint",
      description: "Classic American burgers and fries",
      imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT2C423Rit6_h35IYeDwCxc2pYbdWE0yt_NUw&s",
      country: Country.AMERICA,
    },
  });

  const americanRestaurant2 = await prisma.restaurant.create({
    data: {
      name: "Pizza Palace",
      description: "New York style pizzas with various toppings",
      imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRt69VdP5o8YBDMPIgyU48n9gLnndfcpwe62g&s",
      country: Country.AMERICA,
    },
  });

  await prisma.menuItem.createMany({
    data: [
      {
        name: "Butter Chicken",
        description: "Tender chicken in a rich buttery tomato sauce",
        imageUrl: "https://static01.nyt.com/images/2024/10/29/multimedia/Butter-Chickenrex-tbvz/Butter-Chickenrex-tbvz-mediumSquareAt3X.jpg",
        price: 12.99,
        restaurantId: indianRestaurant1.id,
      },
      {
        name: "Paneer Tikka",
        description: "Grilled cottage cheese with spices",
        imageUrl: "https://sharethespice.com/wp-content/uploads/2024/02/Paneer-Tikka-Featured.jpg",
        price: 10.99,
        restaurantId: indianRestaurant1.id,
      },
      {
        name: "Naan Bread",
        description: "Freshly baked Indian bread",
        imageUrl: "https://fullofplants.com/wp-content/uploads/2023/05/Homemade-Naan-Bread-Restaurant-Style-Vegan-thumb-1.jpg",
        price: 2.99,
        restaurantId: indianRestaurant1.id,
      },
      {
        name: "Biryani",
        description: "Fragrant rice dish with spices and vegetables",
        imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS0w_ScFOzjAgCrSBAyT6Q1ZvJXd5nLisnh0w&s",
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
        imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRPRKGeMstIZbp32iyiVk8FtraGv4UhEoJ1fg&s",
        price: 8.99,
        restaurantId: indianRestaurant2.id,
      },
      {
        name: "Chole Bhature",
        description: "Spicy chickpea curry with fried bread",
        imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRSHuqEQvNy--dkfLm4j4WW74dgvb2tb4HilQ&s",
        price: 9.99,
        restaurantId: indianRestaurant2.id,
      },
      {
        name: "Samosa",
        description: "Crispy pastry filled with spiced potatoes and peas",
        imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTdEDoOl6ZKEt8gFKPrXOb2Hw6wMfja-ruLdg&s",
        price: 4.99,
        restaurantId: indianRestaurant2.id,
      },
      {
        name: "Gulab Jamun",
        description: "Sweet milk solids balls soaked in sugar syrup",
        imageUrl: "https://theartisticcook.com/wp-content/uploads/2024/10/Gulab-Jamun-with-Milk-Powder.jpg",
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
        imageUrl: "https://www.unileverfoodsolutions.com.sg/dam/global-ufs/mcos/SEA/calcmenu/recipes/SG-recipes/vegetables-&-vegetable-dishes/%E7%BB%8F%E5%85%B8%E8%8A%9D%E5%A3%AB%E6%B1%89%E5%A0%A1/main-header.jpg",
        price: 8.99,
        restaurantId: americanRestaurant1.id,
      },
      {
        name: "Cheeseburger",
        description: "Classic burger with American cheese",
        imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTmabr4dqBCRVA4Jg3xjHROdF9hLrXOQT9utA&s",
        price: 9.99,
        restaurantId: americanRestaurant1.id,
      },
      {
        name: "French Fries",
        description: "Crispy golden fries with sea salt",
        imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR8bq8s2PsInxF5M1t6kMgsbNxhh9vf50y1YA&s",
        price: 3.99,
        restaurantId: americanRestaurant1.id,
      },
      {
        name: "Milkshake",
        description: "Thick and creamy vanilla milkshake",
        imageUrl: "https://www.allrecipes.com/thmb/uzxCGTc-5WCUZnZ7BUcYcmWKxjo=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/AR-48974-vanilla-milkshake-hero-4x3-c815295c714f41f6b17b104e7403a53b.jpg",
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
        imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSX2w-6ljxAJtEImAJ4zBsRnou1CoSAVmgvQw&s",
        price: 12.99,
        restaurantId: americanRestaurant2.id,
      },
      {
        name: "Pepperoni Pizza",
        description: "Pizza topped with pepperoni slices",
        imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTkb8bnpzQOP0j7G7CFRtJgdI1K2cIVbV-aZQ&s",
        price: 14.99,
        restaurantId: americanRestaurant2.id,
      },
      {
        name: "Garlic Bread",
        description: "Toasted bread with garlic butter",
        imageUrl: "https://www.simplyrecipes.com/thmb/CgwVUFFMrYJyGq9Ipmc0uZ_EqJM=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/__opt__aboutcom__coeus__resources__content_migration__simply_recipes__uploads__2006__09__Garlic-Bread-METHOD-2-bec7227928124a569a64dc7d0a85f3c1.jpg",
        price: 4.99,
        restaurantId: americanRestaurant2.id,
      },
      {
        name: "Caesar Salad",
        description: "Romaine lettuce with Caesar dressing and croutons",
        imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRq_QHLySdpuhk3weCNYHxYp6tc2naOquvCQQ&s",
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
