import React,{useEffect,useState} from "react";
import axios from "axios";
import {
  GoogleMap,
  LoadScript,
  Marker,
  MarkerF,
  GoogleMapsMarkerClusterer,
  Circle,
  CircleF,
} from "@react-google-maps/api";

const containerStyle = {
  width: "80vw",
  height: "80vh",
  margin: "10 auto",
};

const center = {
  lat: 32.0853,
  lng: 34.7818,
};

const circleOptions = {
  strokeColor: "#008000", // A green color value for the circle's outline
  strokeOpacity: 0.8, // The opacity of the circle's outline
  strokeWeight: 2, // The weight of the circle's outline in pixels
  fillColor: "#008000", // A green color value for the circle's fill
  fillOpacity: 0.35, // The opacity of the circle's fill
  center: center, // The center of the circle, which is the same as the map's center
  radius: 100, // The radius of the circle in meters
  clickable: true, // Whether the circle can be clicked or not
};

const Locations = [
  { id: 1, title: "Location 1", lat: 32.0853, lng: 34.7818 },
  { id: 2, title: "Location 2", lat: 32.086, lng: 34.7822 },
  { id: 3, title: "Location 3", lat: 32.0854, lng: 34.7819 },
  { id: 4, title: "Location 4", lat: 32.0855, lng: 34.781 },
  { id: 5, title: "Location 5", lat: 32.0856, lng: 34.7823 },
  { id: 6, title: "Location 6", lat: 32.0857, lng: 34.7824 },
];

function MyComponent() {
  const pinIcon = {
    url: "https://cdn-icons-png.flaticon.com/512/929/929426.png",
    //scaledSize: new window.google.maps.Size(20, 20)
  };

  return (
    <LoadScript
      googleMapsApiKey="AIzaSyBmdzYhkMqzzxJ9PQFaLGXi9MugHsnhpTI" // My API key
    >
      <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={10}>
        {Locations.map((location) => (
          <MarkerF
            key={location.id}
            position={{ lat: location.lat, lng: location.lng }}
            //title={location.title}
            //icon={pinIcon} //custom icon no need for now
            //onLoad={() => console.log("marker loaded", location)}
          />
        ))}
        ;
        <CircleF
          // Defines the center and radius of the circle along with style options
          center={circleOptions.center}
          radius={circleOptions.radius}
          options={circleOptions}
        />
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
