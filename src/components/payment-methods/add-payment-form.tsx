"use client";

import { updatePaymentMethod } from "@/lib/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Plus } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { toast } from "sonner";

export function AddPaymentForm() {
  const handleUpdatePaymentMethod = async (formData: FormData) => {
    const result = await updatePaymentMethod(formData);
    if (result.error) {
      toast.error(result.error);
    } else {
      toast.success("Payment method updated successfully");
    }
  };
  return (
    <Card className="overflow-hidden food-card-hover">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2">
          <Plus className="h-5 w-5 text-primary" />
          Add New Payment Method
        </CardTitle>
        <CardDescription>
          Add a new payment method to your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form action={handleUpdatePaymentMethod} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="type">Payment Type</Label>
            <Input
              id="type"
              name="type"
              placeholder="Credit Card, PayPal, etc."
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="details">Details</Label>
            <Input
              id="details"
              name="details"
              placeholder="Card ending in 1234"
              required
            />
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox id="isDefault" name="isDefault" value="true" />
            <Label htmlFor="isDefault">Set as default payment method</Label>
          </div>

          <Button type="submit" className="w-full">
            Add Payment Method
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
