import { useNavigate, useSearchParams } from "react-router-dom";
import styles from "./Map.module.css";

export default function Map() {
  const [searchParam, setSearchParam] = useSearchParams();

  const navigate = useNavigate();

  const lat = searchParam.get("lat");
  const lng = searchParam.get("lng");

  return (
    <div
      className={styles.mapContainer}
      onClick={() => {
        navigate("form");
      }}
    >
      <h1>Map</h1>
      <h3>
        Position: Lat={lat} & Lng={lng}
      </h3>

      <button onClick={() => setSearchParam({ lat: 23, lng: 50 })}>
        Change Position
      </button>
    </div>
  );
}
