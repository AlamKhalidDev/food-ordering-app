import { ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";

export function EmptyOrderState() {
  return (
    <Card>
      <CardContent className="flex flex-col items-center justify-center py-12">
        <ShoppingBag className="h-12 w-12 text-muted-foreground mb-4" />
        <p className="text-lg font-medium">No orders found</p>
        <p className="text-sm text-muted-foreground mb-6">
          You haven&apos;t placed any orders yet
        </p>
        <Button asChild>
          <Link href="/restaurants">Browse Restaurants</Link>
        </Button>
      </CardContent>
    </Card>
  );
}