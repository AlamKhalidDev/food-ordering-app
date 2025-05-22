import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { MapPin } from "lucide-react";
import { Restaurant } from "@prisma/client";

export function RestaurantCard({ restaurant }: { restaurant: Restaurant }) {
  return (
    <Card
      key={restaurant.id}
      className="overflow-hidden border-none shadow-md food-card-hover"
    >
      <div
        className="restaurant-card-image"
        style={{
          backgroundImage: `url('/placeholder.svg?height=400&width=600')`,
        }}
      ></div>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-xl">{restaurant.name}</CardTitle>
            <CardDescription className="flex items-center gap-1 mt-1">
              <MapPin className="h-3 w-3" />
              <span>{restaurant.country}</span>
            </CardDescription>
          </div>
          <div className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full">
            {restaurant.menuItems.length} items
          </div>
        </div>
      </CardHeader>
      <CardContent className="pb-2">
        <p className="text-sm line-clamp-2">{restaurant.description}</p>
      </CardContent>
      <CardFooter className="pt-0 pb-4">
        <Link href={`/restaurants/${restaurant.id}`} className="w-full">
          <Button className="w-full">View Menu</Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
