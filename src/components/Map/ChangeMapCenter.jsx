/* eslint-disable react/prop-types */

import { useEffect } from "react";
import { useMap } from "react-leaflet";

export function ChangeMapCenter({ position }) {
  const map = useMap();
  useEffect(() => {
    map.setView(position);
  }, [map, position]); // Ensure map view updates when position changes

  return null;
}
