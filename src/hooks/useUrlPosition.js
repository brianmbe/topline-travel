import { useSearchParams } from "react-router-dom";

export default function useUrlPosition() {
  const [searchParam] = useSearchParams();

  const lat = parseFloat(searchParam.get("lat"));
  const lng = parseFloat(searchParam.get("lng"));

  // Basic validation to ensure lat and lng are numbers
  const isValidLatLng = !isNaN(lat) && !isNaN(lng);

  return isValidLatLng ? [lat, lng] : [null, null];
}
