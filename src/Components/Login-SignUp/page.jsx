import React, { useEffect, useState } from "react";
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


function MyComponent() {
  const pinIcon = {
    url: "https://cdn-icons-png.flaticon.com/512/929/929426.png",
    //scaledSize: new window.google.maps.Size(20, 20)
  };

  const [areas, setAreas] = useState([]);
  const [selectedAreaId, setSelectedAreaId] = useState("");
  const [objects, setObjects] = useState([]);
  const [center, setCenter] = useState({ lat: 32.0853, lng: 34.7818 });
  const [radius, setRadius] = useState(100);
  const Locations = objects.filter(obj => obj.areaId === selectedAreaId);

  useEffect(() => {
    const fetchAreas = async () => {
      const userId = sessionStorage.getItem("userId");
      if (userId) {
        try {
          const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/areas/fetchByUserId`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ userId: userId })
          });

          if (!response.ok) {
            throw new Error('Network response was not ok');
          }

          const data = await response.json(); // Parse the JSON from the response
          console.log("data", data);
          setAreas(data); // Assuming the data is the array of areas
        } catch (error) {
          console.error("Failed to fetch areas:", error);
        }
      }
    };


    fetchAreas();
  }, []);

  useEffect(() => {
    const fetchObjects = async () => {
      const userId = sessionStorage.getItem("userId");
      if (userId) {
        try {
          const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/objects/fetchByUserId`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ userId: userId })
          });

          if (!response.ok) {
            throw new Error('Network response was not ok');
          }

          const data = await response.json();
          setObjects(data); // Store the fetched objects
        } catch (error) {
          console.error("Failed to fetch objects:", error);
        }
      }
    };

    fetchObjects();
  }, []);

  const handleAreaChange = (event) => {
    const newSelectedAreaId = event.target.value;
    setSelectedAreaId(newSelectedAreaId);

    const selectedArea = areas.find(area => area._id === newSelectedAreaId);
    if (selectedArea) {
      setCenter({ lat: selectedArea.centerLat, lng: selectedArea.centerLng });
      setRadius(selectedArea.radius);
    }

    const filteredObjects = objects.filter(obj => obj.areaId === newSelectedAreaId);
    console.log(filteredObjects);
  };

  const handleStart = () => {
    axios.post(`${process.env.REACT_APP_SERVER_URL}/locations/start`)
      .then(response => {
        console.log("Start tracking", response.data);
      })
      .catch(error => {
        console.error("Error starting location tracking", error);
      });
  };

  const handleStop = () => {
    axios.post(`${process.env.REACT_APP_SERVER_URL}/locations/stop`)
      .then(response => {
        console.log("Stop tracking", response.data);
      })
      .catch(error => {
        console.error("Error stopping location tracking", error);
      });
  };

  const handlePushOut = () => {
    if (!selectedAreaId) {
      alert("Please select an area first.");
      return;
    }

    const tagId = objects.find(obj => obj.areaId === selectedAreaId).tagId

    axios.post(`${process.env.REACT_APP_SERVER_URL}/locations/push`, {
      tagId: tagId,
    })
      .then(response => {
        console.log("Push out successful", response.data);
      })
      .catch(error => {
        console.error("Error on push out", error);
      });
  };

  const circleOptions = {
    strokeColor: "#008000",
    strokeOpacity: 0.8,
    strokeWeight: 2,
    fillColor: "#008000",
    fillOpacity: 0.35,
    center: center,
    radius: radius,
    clickable: true,
  };

  return (
    <div>
      <select value={selectedAreaId} onChange={handleAreaChange}>
        <option value="">Select an Area</option>
        {areas.map((area) => (
          <option key={area._id} value={area._id}>
            {area.name}
          </option>
        ))}
      </select>
      <button onClick={handleStart}>Start</button>
      <button onClick={handleStop}>Stop</button>
      <button onClick={handlePushOut}>Push Out</button>
      <LoadScript
        googleMapsApiKey="AIzaSyBmdzYhkMqzzxJ9PQFaLGXi9MugHsnhpTI" // My API key
      >
        <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={10}>
          {Locations.map((location) => (
            <MarkerF
              key={location.id}
              position={{ lat: location.lat, lng: location.lan }}
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
    </div>
  );
}

export default MyComponent;


