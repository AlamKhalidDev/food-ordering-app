"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Role, type User } from "@prisma/client";
import {
  LayoutDashboard,
  Store,
  ShoppingBag,
  CreditCard,
  ShoppingCart,
} from "lucide-react";

interface SideNavProps {
  user: User;
  className?: string;
}

export function SideNav({ user, className }: SideNavProps) {
  const pathname = usePathname();

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

  return (
    <div className={cn("pb-12 w-64 border-r bg-background", className)}>
      <div className="space-y-4 py-4">
        <div className="px-6 py-2">
          <h2 className="mb-2 px-2 text-lg font-semibold tracking-tight">
            Menu
          </h2>
          <div className="space-y-1">
            {routes.map((route) => (
              <Link
                key={route.href}
                href={route.href}
                className={cn(
                  "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                  pathname === route.href ||
                    pathname.startsWith(`${route.href}/`)
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                )}
              >
                {route.icon}
                {route.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
