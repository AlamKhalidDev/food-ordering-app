import type React from "react";
import "./globals.css";
import { Inter } from "next/font/google";
import { ThemeProvider } from "@/components/layout/theme-provider";
import { getCurrentUser } from "@/lib/session";
import { AppLayout } from "@/components/layout/app-layout";
import { Toaster } from "@/components/ui/sonner";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "FoodHub - Food Ordering App",
  description: "Role-based food ordering application",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getCurrentUser();

  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          {user ? (
            <AppLayout user={user}>{children}</AppLayout>
          ) : (
            <main>{children}</main>
          )}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
