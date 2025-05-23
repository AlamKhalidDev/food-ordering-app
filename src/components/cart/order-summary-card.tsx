import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { CreditCard } from "lucide-react";
import { PaymentMethodForm } from "@/components/cart/payment-method-form";
import { PaymentMethod, Role } from "@prisma/client";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface OrderSummaryCardProps {
  cartTotal: number;
  tax: number;
  finalTotal: number;
  canPlaceOrder: boolean;
  paymentMethods: PaymentMethod[];
  cartId: string;
  userRole: Role;
}

export function OrderSummaryCard({
  cartTotal,
  tax,
  finalTotal,
  canPlaceOrder,
  paymentMethods,
  cartId,
  userRole,
}: OrderSummaryCardProps) {
  return (
    <Card className="sticky top-20">
      <CardHeader className="pb-3">
        <CardTitle className="text-xl flex items-center gap-2">
          <CreditCard className="h-5 w-5 text-primary" />
          Order Summary
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <p className="text-sm">Subtotal</p>
            <p className="font-medium">${cartTotal.toFixed(2)}</p>
          </div>
          <div className="flex items-center justify-between">
            <p className="text-sm">Delivery Fee</p>
            <p className="font-medium">$0.00</p>
          </div>
          <div className="flex items-center justify-between">
            <p className="text-sm">Tax</p>
            <p className="font-medium">${tax.toFixed(2)}</p>
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <p className="font-medium">Total</p>
            <p className="font-bold text-lg">${finalTotal.toFixed(2)}</p>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex flex-col items-stretch gap-4 pt-0">
        {canPlaceOrder ? (
          <PaymentMethodForm
            paymentMethods={paymentMethods}
            cartId={cartId}
            userRole={userRole}
          />
        ) : (
          <Button disabled className="w-full">
            Place Order
          </Button>
        )}
        <Link href="/restaurants">
          <Button variant="outline" className="w-full">
            Continue Shopping
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
