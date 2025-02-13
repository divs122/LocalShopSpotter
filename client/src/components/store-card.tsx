import { Link } from "wouter";
import { Store } from "@shared/schema";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { MapPin } from "lucide-react";

interface StoreCardProps {
  store: Store;
}

export default function StoreCard({ store }: StoreCardProps) {
  return (
    <Link href={`/store/${store.id}`}>
      <Card className="hover-scale glass cursor-pointer overflow-hidden">
        <div className="aspect-[4/3] relative">
          <img
            src={store.image}
            alt={store.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
          <div className="absolute bottom-4 left-4 right-4">
            <span className="px-2 py-1 text-xs font-medium bg-accent/90 text-accent-foreground rounded-full">
              {store.category}
            </span>
          </div>
        </div>
        <CardHeader>
          <CardTitle className="text-xl">{store.name}</CardTitle>
          <CardDescription className="line-clamp-2">{store.description}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center text-muted-foreground">
            <MapPin className="h-4 w-4 mr-2" />
            <span className="text-sm truncate">{store.address}</span>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}