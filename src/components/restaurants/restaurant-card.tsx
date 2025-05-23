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
import { RestaurantWithMenuItems } from "@/type";
import Image from "next/image";

export function RestaurantCard({ restaurant }: { restaurant: RestaurantWithMenuItems }) {
  return (
    <Card
      key={restaurant.id}
      className="overflow-hidden border-none shadow-md food-card-hover"
    >
      <Image src={restaurant.imageUrl} alt={restaurant.name} width={400} height={200} className="h-[300px]" />
      <CardHeader className="">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-xl">{restaurant.name}</CardTitle>
            <CardDescription className="flex items-center gap-1">
              <MapPin className="h-3 w-3" />
              <span>{restaurant.country}</span>
            </CardDescription>
          </div>
          <div className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full">
            {restaurant.menuItems.length} items
          </div>
        </div>
      </CardHeader>
      <CardContent className="">
        <p className="text-sm line-clamp-2">{restaurant.description}</p>
      </CardContent>
      <CardFooter className="p=0">
        <Link href={`/restaurants/${restaurant.id}`} className="w-full">
          <Button className="w-full">View Menu</Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
