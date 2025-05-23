"use client";
import { PaymentMethod } from "@prisma/client";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CreditCard, Trash } from "lucide-react";
import { deletePaymentMethod } from "@/lib/actions";
import { toast } from "sonner";

export function PaymentMethodCard({ method }: { method: PaymentMethod }) {
  const handleDeletePaymentMethod = async (formData: FormData) => {
    const result = await deletePaymentMethod(formData);
    if (result.error) {
      toast.error(result.error);
    } else {
      toast.success("Payment method deleted successfully");
    }
  };
  return (
    <Card key={method.id} className="overflow-hidden food-card-hover">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2">
          <CreditCard className="h-5 w-5 text-primary" />
          <span>{method.type}</span>
          {method.isDefault && (
            <span className="ml-2 text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">
              Default
            </span>
          )}
        </CardTitle>
        <CardDescription>{method.details}</CardDescription>
      </CardHeader>
      <CardFooter className="flex justify-end gap-2 pt-0">
        <form action={handleDeletePaymentMethod} className="flex gap-2">
          <input type="hidden" name="id" value={method.id} />
          <Button
            variant="destructive"
            size="sm"
            type="submit"
            className="gap-1"
          >
            <Trash className="h-4 w-4" />
            Delete
          </Button>
        </form>
      </CardFooter>
    </Card>
  );
}
