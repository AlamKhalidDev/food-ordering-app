import { cookies } from "next/headers";
import { prisma } from "@/lib/db";
import type { User } from "@prisma/client";

export async function getCurrentUser(): Promise<User | null> {
  try {
    const sessionToken = (await cookies()).get("session_token")?.value;

    if (!sessionToken) {
      return null;
    }

    const session = await prisma.session.findUnique({
      where: {
        token: sessionToken,
      },
      include: {
        user: true,
      },
    });

    if (!session || !session.user || new Date(session.expires) < new Date()) {
      return null;
    }

    return session.user;
  } catch (error) {
    console.error("Error getting current user:", error);
    return null;
  }
}

export function hasRole(user: User | null, roles: string | string[]): boolean {
  if (!user) {
    return false;
  }

  const allowedRoles = Array.isArray(roles) ? roles : [roles];

  return allowedRoles.includes(user.role);
}

export function hasCountryAccess(user: User | null, country: string): boolean {
  if (!user) {
    return false;
  }

  if (user.role === "ADMIN") {
    return true;
  }

  return user.country === country;
}
