import { AlertTriangle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export function AdminInfoCard() {
  return (
    <Card className="border-blue-200 bg-blue-50">
      <CardContent className="pt-6">
        <div className="flex items-start gap-4">
          <div className="bg-blue-100 p-2 rounded-full">
            <AlertTriangle className="h-5 w-5 text-blue-600" />
          </div>
          <div>
            <h3 className="font-medium text-blue-800">Admin Only Feature</h3>
            <p className="text-sm text-blue-700 mt-1">
              Only administrators can manage payment methods. These payment
              methods will be available for all orders placed by you.
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
