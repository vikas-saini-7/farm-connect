export async function getCoordinatesFromLocation(location) {
    const encodedLocation = encodeURIComponent(location);
    const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodedLocation}`;
  
    try {
      const res = await fetch(url, {
        headers: {
          'User-Agent': 'YourAppName/1.0 (yashwavhal525@gmail.com)' // REPLACE THIS
        },
      });
  
      if (!res.ok) throw new Error(`Geocoding service failed: ${res.status}`);
      
      const data = await res.json();
      if (!data?.length) throw new Error('Location not found');
  
      return {
        latitude: parseFloat(data[0].lat),
        longitude: parseFloat(data[0].lon)
      };
  
    } catch (error) {
      console.error('Geocoding error:', error);
      throw error; // Re-throw for handling in the endpoint
    }
  }