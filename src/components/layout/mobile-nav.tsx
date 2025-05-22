"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, ShoppingCart } from "lucide-react";
import { Role, type User } from "@prisma/client";
import { cn } from "@/lib/utils";
import { logout } from "@/lib/actions";
import { useRouter } from "next/navigation";
import {
  UtensilsCrossed,
  LayoutDashboard,
  Store,
  ShoppingBag,
  CreditCard,
  LogOut,
} from "lucide-react";

interface MobileNavProps {
  user: User;
}

export function MobileNav({ user }: MobileNavProps) {
  const [open, setOpen] = React.useState(false);
  const pathname = usePathname();
  const router = useRouter();

  const getRoutes = () => {
    const commonRoutes = [
      {
        href: "/dashboard",
        label: "Dashboard",
        icon: <LayoutDashboard className="h-5 w-5" />,
      },
      {
        href: "/restaurants",
        label: "Restaurants",
        icon: <Store className="h-5 w-5" />,
      },
      {
        href: "/orders",
        label: "Orders",
        icon: <ShoppingBag className="h-5 w-5" />,
      },
      {
        href: "/cart",
        label: "Cart",
        icon: <ShoppingCart className="h-5 w-5" />,
      },
    ];

    if (user.role === Role.ADMIN) {
      return [
        ...commonRoutes,
        {
          href: "/payment-methods",
          label: "Payment Methods",
          icon: <CreditCard className="h-5 w-5" />,
        },
      ];
    }

    return commonRoutes;
  };

  const routes = getRoutes();

  const handleLogout = async () => {
    await logout();
    router.push("/login");
    router.refresh();
    setOpen(false);
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          className="mr-2 px-0 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 lg:hidden"
        >
          <Menu className="h-6 w-6" />
          <span className="sr-only">Toggle Menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="pr-0 flex flex-col">
        <div className="px-7">
          <Link
            href="/dashboard"
            className="flex items-center gap-2 mb-8"
            onClick={() => setOpen(false)}
          >
            <UtensilsCrossed className="h-6 w-6 text-primary" />
            <span className="font-bold text-xl">FoodHub</span>
          </Link>
        </div>

        <nav className="flex flex-col space-y-1 px-6 flex-1">
          {routes.map((route) => (
            <Link
              key={route.href}
              href={route.href}
              onClick={() => setOpen(false)}
              className={cn(
                "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                pathname === route.href || pathname.startsWith(`${route.href}/`)
                  ? "bg-primary/10 text-primary"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              )}
            >
              {route.icon}
              {route.label}
            </Link>
          ))}
        </nav>
        <div className="px-1 py-2 mb-2">
          <div className="px-6 py-3 rounded-md bg-muted/50">
            <p className="text-sm font-medium">{user.name}</p>
            <p className="text-xs text-muted-foreground">{user.email}</p>
            <div className="flex items-center gap-2 mt-2">
              <span
                className={`px-2 py-1 rounded-full text-xs ${
                  user.role === "ADMIN"
                    ? "bg-red-100 text-red-800"
                    : user.role === "MANAGER"
                    ? "bg-blue-100 text-blue-800"
                    : "bg-green-100 text-green-800"
                }`}
              >
                {user.role}
              </span>
              <span className="px-2 py-1 rounded-full text-xs bg-gray-100 text-gray-800">
                {user.country}
              </span>
            </div>
          </div>
          <div className="px-6 border-t">
            <Button
              variant="ghost"
              className="w-full justify-start text-muted-foreground hover:text-foreground"
              onClick={handleLogout}
            >
              <LogOut className="mr-2 h-5 w-5" />
              Log out
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
