export async function getCoordinatesFromLocation(location) {
  const encodedLocation = encodeURIComponent(location);
  const url = `https://api.geoapify.com/v1/geocode/search?text=${encodedLocation}&filter=countrycode:in&lang=en&limit=1&apiKey=${process.env.NEXT_PUBLIC_API_KEY_LOCATION}`;

  try {
    const res = await fetch(url);

    if (!res.ok) throw new Error(`Geocoding service failed: ${res.status}`);

    const data = await res.json();

    if (!data.features || data.features.length === 0) 
      throw new Error('Location not found');

    const { lat, lon } = data.features[0].properties;

    return {
      latitude: parseFloat(lat),
      longitude: parseFloat(lon)
    };

  } catch (error) {
    console.error('Geocoding error:', error);
    throw error;
  }
}

export async function fetchLocationSuggestions(query) {
  if (!query) return [];

  const url = `https://api.geoapify.com/v1/geocode/autocomplete?text=${encodeURIComponent(query)}&filter=countrycode:in&limit=5&apiKey=${process.env.NEXT_PUBLIC_API_KEY_LOCATION}`;

  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error('Failed to fetch');

    const data = await res.json();

    return data.features.map((feature) => feature.properties.formatted);
  } catch (error) {
    console.error('Autocomplete fetch error:', error);
    return [];
  }
};
