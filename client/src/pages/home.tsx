import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Store } from "@shared/schema";
import MapView from "@/components/map-view";
import StoreCard from "@/components/store-card";
import SearchFilters from "@/components/search-filters";
import { Button } from "@/components/ui/button";
import { Map, List } from "lucide-react";

export default function Home() {
  const [viewMode, setViewMode] = useState<"map" | "list">("map");
  const [searchQuery, setSearchQuery] = useState("");

  const { data: stores, isLoading } = useQuery<Store[]>({
    queryKey: ["/api/stores"],
  });

  const filteredStores = stores?.filter(store =>
    store.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background/95 to-accent/5">
      <div className="container mx-auto px-4 py-16 animate-fade-in">
        <div className="max-w-2xl mx-auto text-center mb-16 space-y-6">
          <h1 className="text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70 animate-slide-up">
            Discover Local Stores
          </h1>
          <p className="text-xl text-muted-foreground animate-slide-up" style={{ animationDelay: '0.1s' }}>
            Find amazing local businesses right in your neighborhood
          </p>
          <div className="max-w-xl mx-auto animate-slide-up" style={{ animationDelay: '0.2s' }}>
            <SearchFilters onSearch={setSearchQuery} />
          </div>
        </div>

        <div className="flex justify-center gap-2 mb-12 animate-fade-in" style={{ animationDelay: '0.3s' }}>
          <Button
            variant={viewMode === "map" ? "default" : "outline"}
            onClick={() => setViewMode("map")}
            className="transition-all duration-300 hover:scale-105"
          >
            <Map className="h-4 w-4 mr-2" />
            Map View
          </Button>
          <Button
            variant={viewMode === "list" ? "default" : "outline"}
            onClick={() => setViewMode("list")}
            className="transition-all duration-300 hover:scale-105"
          >
            <List className="h-4 w-4 mr-2" />
            List View
          </Button>
        </div>

        {isLoading ? (
          <div className="flex justify-center py-16">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
        ) : viewMode === "map" ? (
          <div className="rounded-2xl overflow-hidden shadow-xl animate-scale-in">
            <MapView stores={filteredStores || []} />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredStores?.map((store, index) => (
              <div
                key={store.id}
                className="animate-slide-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <StoreCard store={store} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}