"use client";

import { useEffect } from "react";
import L from "leaflet";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

interface MapWrapperProps {
  buyers: Array<{
    id: number;
    name: string;
    location: {
      lat: number;
      lng: number;
    };
    category: string;
  }>;
  onBuyerClick: (buyer: any) => void;
}

const MapWrapper = ({ buyers, onBuyerClick }: MapWrapperProps) => {
  useEffect(() => {
    delete L.Icon.Default.prototype._getIconUrl;
    L.Icon.Default.mergeOptions({
      iconRetinaUrl: "/images/marker-icon-2x.png",
      iconUrl: "/images/marker-icon.png",
      shadowUrl: "/images/marker-shadow.png",
    });
  }, []);

  return (
    <div style={{ height: "100%", width: "100%" }}>
      {/* <MapContainer
        center={[40.7128, -74.006]}
        zoom={12}
        style={{ height: "100%", width: "100%" }}
        scrollWheelZoom={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {buyers.map((buyer) => (
          <Marker
            key={buyer.id}
            position={[buyer.location.lat, buyer.location.lng]}
            eventHandlers={{
              click: () => onBuyerClick(buyer),
            }}
          >
            <Popup>
              <div className="text-sm">
                <p className="font-semibold">{buyer.name}</p>
                <p className="text-gray-600 capitalize">{buyer.category}</p>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer> */}
    </div>
  );
};

export default MapWrapper;