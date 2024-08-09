import { useMapEvents } from "react-leaflet";
import { useNavigate } from "react-router-dom";

export function DetectMapClick() {
  const navigate = useNavigate();

  useMapEvents({
    click: (e) => {
      navigate(`form?lat=${e.latlng.lat}&lng=${e.latlng.lng}`);
    },
  });

  return null; // Ensure the component returns null since no JSX is rendered
}
