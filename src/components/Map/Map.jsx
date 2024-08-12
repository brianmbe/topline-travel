/* eslint-disable react/prop-types */
import { useSearchParams } from "react-router-dom";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import { useEffect, useState } from "react";

import { useCities } from "../../context/CitiesContext";
import { countryFlag } from "../City/CountryFlag";
import { ChangeMapCenter } from "./ChangeMapCenter";
import { DetectMapClick } from "./DetectMapClick";
import { useGeolocation } from "../../hooks/useGeoLocation";
import useUrlPosition from "../../hooks/useUrlPosition";

import styles from "./Map.module.css";
import Button from "../Button/Button";

export default function Map() {
  const [mapPosition, setMapPosition] = useState([0.347596, 32.58252]);
  const { cities } = useCities();
  const {
    isLoading: isLoadingPosition,
    position: geoLocationPosition,
    getPosition,
  } = useGeolocation();

  const { lat, lng } = useUrlPosition();

  useEffect(() => {
    if (lat && lng) setMapPosition([lat, lng]); // Pass an array
  }, [lat, lng]);

  useEffect(() => {
    if (geoLocationPosition)
      setMapPosition([geoLocationPosition.lat, geoLocationPosition.lng]);
  }, [geoLocationPosition]);

  return (
    <div className={styles.mapContainer}>
      {!geoLocationPosition && (
        <Button type={"position"} onClick={getPosition}>
          {isLoadingPosition ? "Loading...." : "Use my position"}
        </Button>
      )}
      <MapContainer
        center={mapPosition} // Use the array directly
        zoom={6}
        scrollWheelZoom={true}
        className={styles.map}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
        />
        {cities.map((city) => (
          <Marker
            position={[city.position.lat, city.position.lng]}
            key={city.id}
          >
            <Popup>
              <span>{countryFlag(city.emoji)}</span>
              <span>{city.cityName}</span>
              {city.notes}
            </Popup>
          </Marker>
        ))}

        <ChangeMapCenter position={mapPosition} />
        <DetectMapClick />
      </MapContainer>
    </div>
  );
}
