import { useEffect, useRef } from "react";
import { Store } from "@shared/schema";
import { Card } from "@/components/ui/card";
import { AlertCircle } from "lucide-react";

interface MapViewProps {
  stores: Store[];
}

declare global {
  interface Window {
    google: any;
  }
}

export default function MapView({ stores }: MapViewProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const googleMapRef = useRef<any>(null);

  useEffect(() => {
    const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

    if (!apiKey) {
      console.error("Google Maps API key is missing");
      return;
    }

    const loadGoogleMaps = () => {
      // Remove any existing Google Maps scripts
      const existingScript = document.querySelector('script[src*="maps.googleapis.com"]');
      if (existingScript) {
        existingScript.remove();
      }

      const script = document.createElement("script");
      script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}`;
      script.async = true;
      script.defer = true;
      document.head.appendChild(script);

      script.onerror = () => {
        console.error("Failed to load Google Maps script");
      };

      script.onload = () => {
        if (!mapRef.current) return;

        try {
          // Calculate the center point from store locations
          const bounds = new window.google.maps.LatLngBounds();
          stores.forEach((store) => {
            bounds.extend({
              lat: parseFloat(store.latitude.toString()),
              lng: parseFloat(store.longitude.toString()),
            });
          });

          const center = stores.length > 0
            ? bounds.getCenter()
            : { lat: 40.7128, lng: -74.0060 }; // Default to NYC

          googleMapRef.current = new window.google.maps.Map(mapRef.current, {
            zoom: stores.length > 0 ? 12 : 13,
            center,
            styles: [
              {
                featureType: "poi",
                elementType: "labels",
                stylers: [{ visibility: "off" }],
              },
            ],
          });

          if (stores.length > 0) {
            stores.forEach((store) => {
              const marker = new window.google.maps.Marker({
                position: {
                  lat: parseFloat(store.latitude.toString()),
                  lng: parseFloat(store.longitude.toString()),
                },
                map: googleMapRef.current,
                title: store.name,
              });

              const infoWindow = new window.google.maps.InfoWindow({
                content: `
                  <div style="padding: 8px; max-width: 200px;">
                    <h3 style="font-weight: bold; margin-bottom: 4px;">${store.name}</h3>
                    <p style="margin: 4px 0;">${store.category}</p>
                    <p style="margin: 4px 0; font-size: 0.9em;">${store.address}</p>
                  </div>
                `,
              });

              marker.addListener("click", () => {
                infoWindow.open(googleMapRef.current, marker);
              });
            });

            // Fit map to show all markers
            googleMapRef.current.fitBounds(bounds);
          }
        } catch (error) {
          console.error("Error initializing map:", error);
        }
      };
    };

    loadGoogleMaps();

    // Cleanup
    return () => {
      const script = document.querySelector('script[src*="maps.googleapis.com"]');
      if (script) {
        script.remove();
      }
    };
  }, [stores]);

  if (!import.meta.env.VITE_GOOGLE_MAPS_API_KEY) {
    return (
      <Card className="w-full h-[600px] flex items-center justify-center">
        <div className="text-center p-6">
          <AlertCircle className="h-12 w-12 text-destructive mx-auto mb-4" />
          <h3 className="text-lg font-semibold mb-2">Google Maps API Key Missing</h3>
          <p className="text-muted-foreground">
            Please provide a valid Google Maps API key to enable the map view.
          </p>
        </div>
      </Card>
    );
  }

  // Show billing error state
  if (window.google === undefined) {
    return (
      <Card className="w-full h-[600px] flex items-center justify-center">
        <div className="text-center p-6">
          <AlertCircle className="h-12 w-12 text-destructive mx-auto mb-4" />
          <h3 className="text-lg font-semibold mb-2">Maps API Billing Required</h3>
          <p className="text-muted-foreground">
            Please enable billing for the Google Maps JavaScript API in your Google Cloud Console.
          </p>
        </div>
      </Card>
    );
  }

  return (
    <Card className="w-full h-[600px] overflow-hidden">
      <div ref={mapRef} className="w-full h-full" />
    </Card>
  );
}