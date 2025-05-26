"use server";

import { prisma } from "@/lib/db";
import { getCurrentUser, hasRole } from "@/lib/session";
import { Role } from "@prisma/client";
import { revalidatePath } from "next/cache";

export async function updatePaymentMethod(formData: FormData) {
  const user = await getCurrentUser();

  if (!user) {
    return { error: "Not authenticated" };
  }

  if (!hasRole(user, [Role.ADMIN])) {
    return { error: "You don't have permission to manage payment methods" };
  }

  const id = formData.get("id") as string;
  const type = formData.get("type") as string;
  const details = formData.get("details") as string;
  const isDefault = formData.get("isDefault") === "true";

  if (isDefault) {
    await prisma.paymentMethod.updateMany({
      where: {
        userId: user.id,
        isDefault: true,
      },
      data: {
        isDefault: false,
      },
    });
  }

  if (id) {
    await prisma.paymentMethod.update({
      where: { id },
      data: {
        type,
        details,
        isDefault,
      },
    });
  } else {
    await prisma.paymentMethod.create({
      data: {
        userId: user.id,
        type,
        details,
        isDefault,
      },
    });
  }

  revalidatePath("/payment-methods");
  return { success: true };
}

export async function deletePaymentMethod(formData: FormData) {
  const user = await getCurrentUser();

  if (!user) {
    return { error: "Not authenticated" };
  }

  if (!hasRole(user, [Role.ADMIN])) {
    return { error: "You don't have permission to manage payment methods" };
  }

  const id = formData.get("id") as string;

  await prisma.paymentMethod.delete({
    where: { id },
  });

  revalidatePath("/payment-methods");
  return { success: true };
}
