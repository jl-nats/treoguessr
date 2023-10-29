import { NextResponse } from 'next/server'

const apiKey = `AIzaSyBU8OhxRDRtnaRFo6Dv-hKhFMi1Dezg8HI`;

let point = {lat:51.4808, lng:0.2426};
var scale = 8;
let coord = project(point,scale);

const mapUrl = `https://airquality.googleapis.com/v1/mapTypes/UAQI_RED_GREEN/heatmapTiles/${scale}/${coord.lat}/${coord.lng}?key=${apiKey}`;

export async function GET() {
    const res = await fetch(mapUrl);
    return res;
}


// The mapping between latitude, longitude and pixels is defined by the web
// mercator projection.
function project(point,scale) {

    scale = 1 << scale;
    let siny = Math.sin((point.lat * Math.PI) / 180);

    // Truncating to 0.9999 effectively limits latitude to 89.189. This is
    // about a third of a tile past the edge of the world tile.
    siny = Math.min(Math.max(siny, -0.9999), 0.9999);
    //let coord = {lat:(scale * (0.5 + point.lng / 360)), lng: (scale * (0.5 - Math.log((1 + siny) / (1 - siny)) / (4 * Math.PI)))};
    let coord = {lat:Math.floor(scale * (0.5 + point.lng / 360)), lng: Math.floor(scale * (0.5 - Math.log((1 + siny) / (1 - siny)) / (4 * Math.PI)))};
    return coord;
  }
