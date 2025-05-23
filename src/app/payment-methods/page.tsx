import { getPaymentMethods } from "@/lib/data";
import { getCurrentUser } from "@/lib/session";
import { Role } from "@prisma/client";
import { redirect } from "next/navigation";
import { PaymentMethodCard } from "@/components/payment-methods/payment-method-card";
import { AddPaymentForm } from "@/components/payment-methods/add-payment-form";
import { AdminInfoCard } from "@/components/payment-methods/admin-info-card";

export default async function PaymentMethodsPage() {
  const user = await getCurrentUser();

  if (user?.role !== Role.ADMIN) {
    redirect("/dashboard");
  }

  const paymentMethods = await getPaymentMethods();

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Payment Methods</h1>
        <p className="text-muted-foreground mt-1">
          Manage your payment methods
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {paymentMethods.map((method) => (
          <PaymentMethodCard key={method.id} method={method} />
        ))}
      </div>

      <AddPaymentForm />
      <AdminInfoCard />
    </div>
  );
}
