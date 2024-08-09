export function countryFlag(emoji) {
  const FLAG_URL = `https://flagsapi.com/${emoji}/flat/24.png`;

  return <img src={FLAG_URL} />;
}
