import React from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import LocationOnIcon from "@mui/icons-material/LocationOn";

const containerStyle = {
  width: "80%",
  height: "500px",
  margin: "10 auto",
};


const center = {
  lat: 32.0853, // Latitude for Tel Aviv
  lng: 34.7818, // Longitude for Tel Aviv
};

const Locations = [
  { id: 1, title: "Location 1", lat: 32.0853, lng: 34.7818 },
  { id: 2, title: "Location 2", lat: 32.086, lng: 34.7822 },
  { id: 3, title: "Location 3", lat: -34.367, lng: 150.644 },
  { id: 4, title: "Location 4", lat: -34.369, lng: 150.65 },
  { id: 5, title: "Location 5", lat: -34.387, lng: 150.644 },
  { id: 6, title: "Location 6", lat: -34.389, lng: 150.65 },
];

function MyComponent() {
  const pinIcon =
    "https://cdn-icons-png.flaticon.com/512/929/929426.png";

  return (
    <LoadScript
      googleMapsApiKey="AIzaSyBmdzYhkMqzzxJ9PQFaLGXi9MugHsnhpTI" // Replace with your API key
    >
      <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={10}>
        {Locations.map((location) => (
          <Marker
            key={location.id}
            position={{ lat: location.lat, lng: location.lng }}
            title={location.title}
            icon={pinIcon}
            onLoad={() => console.log("marker loaded", location)}
          />
        ))};  
      </GoogleMap>
    </LoadScript>
    
  );
}

export default MyComponent;

////////////////////////////centering of all the pins/////////////////
// function getCenterFromLocations(locations) {
//   let lat = 0;
//   let lng = 0;

//   locations.forEach((location) => {
//     lat += location.lat;
//     lng += location.lng;
//   });

//   lat /= locations.length;
//   lng /= locations.length;

//   return { lat, lng };
// }

// // ...

// const center = getCenterFromLocations(Locations);
