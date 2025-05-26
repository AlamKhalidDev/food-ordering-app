"use server";

import { prisma } from "@/lib/db";
import { Country, Role } from "@prisma/client";
import { cookies } from "next/headers";
import bcrypt from "bcryptjs";
import crypto from "crypto";

export async function login(formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user || !(await bcrypt.compare(password, user.password))) {
    return { error: "Invalid email or password" };
  }

  const token = crypto.randomBytes(32).toString("hex");
  const expires = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

  await prisma.session.create({
    data: {
      userId: user.id,
      token,
      expires,
    },
  });

  (await cookies()).set("session_token", token, {
    expires,
    httpOnly: true,
    path: "/",
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
  });

  return { success: true };
}

export async function register(formData: FormData) {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const countryKey = formData.get("country") as string | null;
  if (!countryKey || !(countryKey in Country)) {
    return { error: "Invalid country selected" };
  }
  const country = Country[countryKey as keyof typeof Country];

  if (!name || !email || !password) {
    return { error: "All fields are required" };
  }

  const existingUser = await prisma.user.findUnique({
    where: { email },
  });

  if (existingUser) {
    return { error: "Email already in use" };
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
      role: Role.MEMBER,
      country,
    },
  });

  return { success: true };
}

export async function logout() {
  const sessionToken = (await cookies()).get("session_token")?.value;

  if (sessionToken) {
    await prisma.session.delete({
      where: { token: sessionToken },
    });

    (await cookies()).delete("session_token");
  }

  return { success: true };
}
