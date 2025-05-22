import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Role, User } from "@prisma/client";

interface AccessLevelCardProps {
  user: User;
}

export function AccessLevelCard({ user }: AccessLevelCardProps) {
  return (
    <Card className="col-span-3">
      <CardHeader>
        <CardTitle>Your Access Level</CardTitle>
        <CardDescription>Your permissions in the system</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-muted/50 p-3 rounded-lg">
              <p className="text-sm font-medium text-muted-foreground">Role</p>
              <p className="text-lg font-semibold">{user.role}</p>
            </div>
            <div className="bg-muted/50 p-3 rounded-lg">
              <p className="text-sm font-medium text-muted-foreground">
                Country
              </p>
              <p className="text-lg font-semibold">{user.country}</p>
            </div>
          </div>

          <div className="space-y-2">
            <p className="text-sm font-medium">Permissions</p>
            <ul className="space-y-1 bg-muted/50 p-3 rounded-lg">
              <li className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-green-500"></span>
                <span className="text-sm">View restaurants and menu items</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-green-500"></span>
                <span className="text-sm">Create order (add food items)</span>
              </li>
              <li className="flex items-center gap-2">
                <span
                  className={`h-2 w-2 rounded-full ${
                    user.role === Role.MEMBER ? "bg-red-500" : "bg-green-500"
                  }`}
                ></span>
                <span className="text-sm">Place order (checkout & pay)</span>
              </li>
              <li className="flex items-center gap-2">
                <span
                  className={`h-2 w-2 rounded-full ${
                    user.role === Role.MEMBER ? "bg-red-500" : "bg-green-500"
                  }`}
                ></span>
                <span className="text-sm">Cancel order</span>
              </li>
              <li className="flex items-center gap-2">
                <span
                  className={`h-2 w-2 rounded-full ${
                    user.role === Role.ADMIN ? "bg-green-500" : "bg-red-500"
                  }`}
                ></span>
                <span className="text-sm">Update payment method</span>
              </li>
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
