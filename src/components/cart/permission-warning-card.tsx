import { Card, CardContent } from "@/components/ui/card";
import { AlertTriangle } from "lucide-react";

export function PermissionWarningCard() {
  return (
    <Card className="border-yellow-200 bg-yellow-50">
      <CardContent className="pt-6">
        <div className="flex items-start gap-4">
          <div className="bg-yellow-100 p-2 rounded-full">
            <AlertTriangle className="h-5 w-5 text-yellow-600" />
          </div>
          <div>
            <h3 className="font-medium text-yellow-800">
              Members Cannot Place Orders
            </h3>
            <p className="text-sm text-yellow-700 mt-1">
              As a Team Member, you cannot place orders. Please contact your
              Manager or Admin to complete this order.
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
