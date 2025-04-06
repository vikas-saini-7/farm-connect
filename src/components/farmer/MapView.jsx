import React, { useEffect } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Fix for default marker icons
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

// Fix Leaflet's default icon path issues
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconUrl: markerIcon,
  iconRetinaUrl: markerIcon2x,
  shadowUrl: markerShadow,
});



const MapView = ({
  locations,
  userLocation,
  defaultZoom = 13,
}) => {
  useEffect(() => {
    // Initialize the map centered on user location or first location in the array
    const center = userLocation
      ? [userLocation.latitude, userLocation.longitude]
      : locations.length > 0
      ? [locations[0].latitude, locations[0].longitude]
      : [28.6139, 77.209]; // Default to Delhi if no locations

    const map = L.map("map").setView(center , defaultZoom);

    // Set up OpenStreetMap tile layer
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map);

    // Define the location icon (red color)
    const locationIcon = L.icon({
      iconUrl:
        "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png",
      //   shadowUrl: markerShadow,
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      shadowSize: [41, 41],
    });

    // Define user location icon (blue color)
    const userIcon = L.icon({
      iconUrl:
        "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png",
      //   shadowUrl: markerShadow,
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      shadowSize: [41, 41],
    });

    // Add markers for all locations
    locations.forEach((location) => {
      const marker = L.marker([location.latitude, location.longitude], {
        icon: locationIcon,
      }).addTo(map);

      if (location.name) {
        marker.bindPopup(location.name);
      }
    });

    // Add user location marker if provided
    if (userLocation) {
      const userMarker = L.marker(
        [userLocation.latitude, userLocation.longitude],
        { icon: userIcon }
      ).addTo(map);
      userMarker.bindPopup("Your Location");
    }

    // Fit bounds to show all markers
    const allPoints = [...locations, ...(userLocation ? [userLocation] : [])];
    if (allPoints.length > 1) {
      const bounds = L.latLngBounds(
        allPoints.map((loc) => [loc.latitude, loc.longitude])
      );
      map.fitBounds(bounds, { padding: [50, 50] });
    }

    return () => {
      map.remove();
    };
  }, [locations, userLocation, defaultZoom]);

  return (
    <div
      id="map"
      style={{
        height: "400px",
        width: "100%",
        position: "relative",
        zIndex: 0,
      }}
    ></div>
  );
};

export default MapView;
