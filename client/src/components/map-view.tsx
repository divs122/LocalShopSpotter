import { useEffect, useRef } from "react";
import { Store } from "@shared/schema";
import { Card } from "@/components/ui/card";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

interface MapViewProps {
  stores: Store[];
}

export default function MapView({ stores }: MapViewProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);

  useEffect(() => {
    if (!mapRef.current || mapInstanceRef.current) return;

    // Initialize map
    const map = L.map(mapRef.current).setView([40.7128, -74.0060], 13);
    mapInstanceRef.current = map;

    // Add OpenStreetMap tiles
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    // Calculate bounds from store locations
    if (stores.length > 0) {
      const bounds = L.latLngBounds(stores.map(store => [
        parseFloat(store.latitude.toString()),
        parseFloat(store.longitude.toString())
      ]));

      // Add markers for each store
      stores.forEach((store) => {
        const marker = L.marker([
          parseFloat(store.latitude.toString()),
          parseFloat(store.longitude.toString())
        ]).addTo(map);

        // Add popup with store info
        marker.bindPopup(`
          <div style="padding: 8px; max-width: 200px;">
            <h3 style="font-weight: bold; margin-bottom: 4px;">${store.name}</h3>
            <p style="margin: 4px 0;">${store.category}</p>
            <p style="margin: 4px 0; font-size: 0.9em;">${store.address}</p>
          </div>
        `);
      });

      // Fit map to show all markers
      map.fitBounds(bounds);
    }

    // Cleanup function
    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, [stores]);

  return (
    <Card className="w-full h-[600px] overflow-hidden">
      <div ref={mapRef} className="w-full h-full" />
    </Card>
  );
}