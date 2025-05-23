"use client";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { placeOrder } from "@/lib/actions";
import { Button } from "@/components/ui/button";
import { PaymentMethod, Role } from "@prisma/client";
import { AlertTriangle } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";
import { redirect, useRouter } from "next/navigation";

interface PaymentMethodFormProps {
  paymentMethods: PaymentMethod[];
  cartId: string;
  userRole: Role;
}

export function PaymentMethodForm({
  paymentMethods,
  cartId,
  userRole,
}: PaymentMethodFormProps) {
  const router = useRouter();
  if (paymentMethods.length === 0) {
    return (
      <div className="text-center space-y-2">
        <div className="flex items-center justify-center text-yellow-500">
          <AlertTriangle className="h-5 w-5" />
        </div>
        <p className="text-sm">No payment methods available</p>
        {userRole === Role.ADMIN && (
          <Link href="/payment-methods">
            <Button variant="outline" className="w-full">
              Add Payment Method
            </Button>
          </Link>
        )}
      </div>
    );
  }

  const handlePlaceOrder = async (formData: FormData) => {
    const result = await placeOrder(formData);
    if (result.error) {
      toast.error(result.error);
    }

    if (result.success) {
      toast.success("Order placed successfully!");
      router.push("/orders");
    }
  };

  return (
    <form action={handlePlaceOrder} className="space-y-4 w-full">
      <input type="hidden" name="orderId" value={cartId} />
      <div className="space-y-2">
        <label htmlFor="paymentMethod" className="text-sm font-medium">
          Payment Method
        </label>
        <Select name="paymentMethodId" required>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select payment method" />
          </SelectTrigger>
          <SelectContent>
            {paymentMethods.map((method) => (
              <SelectItem key={method.id} value={method.id}>
                {method.type} {method.isDefault && "(Default)"}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <Button type="submit" className="w-full">
        Place Order
      </Button>
    </form>
  );
}
