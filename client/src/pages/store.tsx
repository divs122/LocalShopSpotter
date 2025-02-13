import { useQuery } from "@tanstack/react-query";
import { useRoute } from "wouter";
import { StoreWithProducts } from "@shared/schema";
import ProductCard from "@/components/product-card";
import { Card } from "@/components/ui/card";
import { MapPin, Phone, Clock } from "lucide-react";

export default function Store() {
  const [, params] = useRoute("/store/:id");
  const storeId = params?.id;

  const { data: store, isLoading } = useQuery<StoreWithProducts>({
    queryKey: [`/api/stores/${storeId}`],
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!store) {
    return <div>Store not found</div>;
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <Card className="mb-8 p-6">
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <img
                src={store.image}
                alt={store.name}
                className="w-full h-64 object-cover rounded-lg"
              />
            </div>
            <div>
              <h1 className="text-3xl font-bold mb-4">{store.name}</h1>
              <p className="text-muted-foreground mb-4">{store.description}</p>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <MapPin className="h-5 w-5 text-primary" />
                  <span>{store.address}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="h-5 w-5 text-primary" />
                  <span>(555) 123-4567</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-5 w-5 text-primary" />
                  <span>9:00 AM - 9:00 PM</span>
                </div>
              </div>
            </div>
          </div>
        </Card>

        <h2 className="text-2xl font-bold mb-6">Available Products</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {store.products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
}
