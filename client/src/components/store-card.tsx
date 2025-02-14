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
      <Card className="hover-lift glass cursor-pointer overflow-hidden group">
        <div className="aspect-[4/3] relative overflow-hidden">
          <img
            src={store.image}
            alt={store.name}
            className="w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent" />
          <div className="absolute bottom-4 left-4 right-4">
            <span className="px-3 py-1.5 text-xs font-medium bg-background/95 text-foreground rounded-full">
              {store.category}
            </span>
          </div>
        </div>
        <CardHeader>
          <CardTitle className="text-xl group-hover:text-primary transition-colors">
            {store.name}
          </CardTitle>
          <CardDescription className="line-clamp-2">
            {store.description}
          </CardDescription>
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