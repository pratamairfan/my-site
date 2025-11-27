"use client";

import React from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const Map = () => {
  return (
    <MapContainer
      center={[2.1029195, 99.8245509]}
      zoom={6}
      scrollWheelZoom={true}
      className="w-full h-screen z-40"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {/*{data.map((site: any) => {
        const latitude = parseFloat(site.latitude);
        const longitude = parseFloat(site.longitude);

        // Pastikan latitude dan longitude adalah angka yang valid
        if (isNaN(latitude) || isNaN(longitude)) {
          console.error(
            `Invalid coordinates for site ${site.id}: (${site.latitude}, ${site.longitude})`
          );
          return null;
        }

        return (
          <Marker key={site.id} position={[latitude, longitude]}>
            <Popup>
              <ul>
                <li>{site.siteName}</li>
                <li>{site.witelName}</li>
                <li>{site.datelName}</li>
              </ul>
            </Popup>
          </Marker>
        );
      })}*/}
    </MapContainer>
  );
};

export default Map;
