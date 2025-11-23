"use client";

import React, { createContext, useEffect, useState } from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
// import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.webpack.css";
// import "leaflet-defaulticon-compatibility";
import CardWrapper from "../../components/card-wrapper";

const MapContext = createContext({});

const Maps: React.FC = () => {
  return (
    <MapContext.Provider value={{}}>
      <div className="w-full sm:px-6 lg:px-8">
        <CardWrapper title="Site Maps">
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
        </CardWrapper>
      </div>
    </MapContext.Provider>
  );
};

export default Maps;
