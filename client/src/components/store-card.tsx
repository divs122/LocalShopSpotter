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
      <Card className="cursor-pointer hover:shadow-lg transition-shadow">
        <div className="aspect-video relative">
          <img
            src={store.image}
            alt={store.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute top-2 right-2 bg-accent text-accent-foreground px-2 py-1 rounded">
            {store.category}
          </div>
        </div>
        <CardHeader>
          <CardTitle>{store.name}</CardTitle>
          <CardDescription>{store.description}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center text-muted-foreground">
            <MapPin className="h-4 w-4 mr-2" />
            <span className="text-sm">{store.address}</span>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
