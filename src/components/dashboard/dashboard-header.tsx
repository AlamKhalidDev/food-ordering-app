import { Role, User } from "@prisma/client";

interface DashboardHeaderProps {
  user: User;
}

export function DashboardHeader({ user }: DashboardHeaderProps) {
  return (
    <div>
      <h1 className="text-3xl font-bold tracking-tight">
        Welcome back, {user.name}
      </h1>
      <p className="text-muted-foreground mt-1">
        Here&apos;s an overview of your{" "}
        {user.role === Role.ADMIN ? "organization" : "account"}
      </p>
    </div>
  );
}
