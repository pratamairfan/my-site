"use client";

import React, { createContext } from "react";
import dynamic from "next/dynamic";
import CardWrapper from "../../components/card-wrapper";

const MapContext = createContext({});

const Maps: React.FC = () => {
  const Map = React.useMemo(
    () =>
      dynamic(() => import("../../components/Map"), {
        loading: () => <p>A map is loading</p>,
        ssr: false,
      }),
    []
  );

  return (
    <MapContext.Provider value={{}}>
      <div className="w-full">
        <CardWrapper title="Site Maps" className="py-6 !bg-accent">
          <Map />
        </CardWrapper>
      </div>
    </MapContext.Provider>
  );
};

export default Maps;
