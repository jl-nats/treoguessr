var apiKey = 'AIzaSyBU8OhxRDRtnaRFo6Dv-hKhFMi1Dezg8HI';
var mapSize = "500x400"; //WidthxHeight
var mapCenter = 'New+York,NY';
var zoomLevel = 12;

// Build the URL for the static map
var mapUrl = "https://maps.googleapis.com/maps/api/staticmap?center="+mapCenter+"&zoom="+zoomLevel+"&size="+zoomLevel+"&key="+apiKey;
//"https://maps.googleapis.com/maps/api/staticmap?center=${mapCenter}&zoom=${zoomLevel}&size=${mapSize}&key=${apiKey}"

export async function GET() {
    const res = await fetch(mapUrl);
    return res;
  }