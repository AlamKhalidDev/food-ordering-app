# Food Ordering Application

A role-based food ordering web application where users (Admins, Managers, and Members) can perform specific functions based on their role, with country-based access restrictions.

## Features

- **Role-Based Access Control (RBAC)**:

  - Admins: Full access to all features
  - Managers: Can view, create, place, and cancel orders
  - Members: Can only view restaurants and create orders

- **Country-Based Access Restrictions**:

  - Non-admin users can only access data from their assigned country
  - Managers and members from India cannot see or interact with data from America and vice versa
  - Admins have global access across countries

- **Key Functionality**:
  - View restaurants and menu items
  - Create an order and add food items
  - Checkout cart and pay using existing payment method
  - Cancel order
  - Modify payment method

## Tech Stack

- Next.js 14 with App Router
- TypeScript
- Prisma ORM
- PostgreSQL
- Tailwind CSS
- shadcn/ui components

## Getting Started

### Prerequisites

- Node.js 18+
- PostgreSQL

### Installation

1. Install dependencies:

   ```bash
   npm install
   ```

2. Set up environment variables:

   ```env
   DATABASE_URL="postgresql://postgres:postgres@localhost:5432/food_ordering_app?schema=public"
   ```

   Update the `.env` file with your PostgreSQL connection string.

3. Set up the database:

   ```bash
   npx prisma migrate dev --name init
   ```

4. Seed the database:

   ```bash
   npm run seed
   ```

5. Run the development server:

   ```bash
   npm run dev
   ```

6. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Default Users

After seeding the database, you can log in with the following credentials:

- **Admin**:

  - Email: nick.fury@shield.com
  - Password: admin123
  - Role: ADMIN
  - Country: AMERICA

- **Manager (India)**:

  - Email: captain.marvel@shield.com
  - Password: password123
  - Role: MANAGER
  - Country: INDIA

- **Manager (America)**:

  - Email: captain.america@shield.com
  - Password: password123
  - Role: MANAGER
  - Country: AMERICA

- **Member (India)**:

  - Email: thanos@shield.com or thor@shield.com
  - Password: password123
  - Role: MEMBER
  - Country: INDIA

- **Member (America)**:
  - Email: travis@shield.com
  - Password: password123
  - Role: MEMBER
  - Country: AMERICA
