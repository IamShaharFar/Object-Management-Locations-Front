import React, { useState, useEffect } from "react";
import { GoogleMap, LoadScriptNext, MarkerF } from "@react-google-maps/api";
import "./AddObject.css";

const parentContainerStyle = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
};

const containerStyle = {
  width: '300px',
  height: '300px'
};

const center = {
  lat: 32.0853,
  lng: 34.7818
};

function AddObjectForm() {
  const [areas, setAreas] = useState([]);
  const [selectedAreaId, setSelectedAreaId] = useState("");
  const [description, setDescription] = useState("");
  const [selectedOption, setSelectedOption] = useState("");
  const [location, setLocation] = useState({ lat: 32.0853, lng: 34.7818 }); // Default location is Tel Aviv

  const options = [
    { id: 1, name: "Option 1" },
    { id: 2, name: "Option 2" },
    { id: 3, name: "Option 3" },
  ];

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

          const data = await response.json();
          console.log("data", data);
          setAreas(data);

          if (data && data.length > 0) {
            const firstArea = data[0];
            setSelectedAreaId(firstArea._id);
          }
        } catch (error) {
          console.error("Failed to fetch areas:", error);
        }
      }
    };

    fetchAreas();
  }, []);

  const handleMapClick = (event) => {
    const lat = event.latLng.lat();
    const lng = event.latLng.lng();
    setLocation({ lat, lng });
    console.log('Selected location:', lat, lng);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!description.trim()) {
      alert("Please enter a description for the object.");
      return; // Exit the function early if no description
  }

    const objectData = {
      description,
      lat: location.lat,
      lan: location.lng,
      areaId: selectedAreaId,
      userId: sessionStorage.getItem("userId")

    };

    console.log("Submitting:", objectData);
    try {
      const response = await fetch("http://localhost:3000/objects/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(objectData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const responseData = await response.json();
      alert("Object successfully added!");
      setDescription("");
      setLocation({ lat: 32.0853, lng: 34.7818 });
    } catch (error) {
      console.error("Error:", error);
      alert("Oops! There was an error adding the object. Please try again later.");
    }
  };

  return (
    <div className="signup-container">
      <form className="signup-form" onSubmit={handleSubmit}>
        <h2 className="add-new-obj-title">Add A New Object</h2>
        <div>
          <label htmlFor="description"></label>
          <input
            type="text"
            id="description"
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="signup-input"
          />
        </div>
        <div>
          <label htmlFor="lat"></label>
          <input
            type="text"
            id="lat"
            placeholder="Latitude"
            value={location.lat}
            onChange={(e) => setLocation({ ...location, lat: e.target.value })}
            className="signup-input"
          />
        </div>
        <div>
          <label htmlFor="lng"></label>
          <input
            type="text"
            id="lng"
            placeholder="Longitude"
            value={location.lng}
            onChange={(e) => setLocation({ ...location, lng: e.target.value })}
            className="signup-input"
          />
        </div>
        <div>
          <label htmlFor="combo-box">Choose an Area:</label>
          <select
            id="combo-box"
            value={selectedOption}
            placeholder="Choose an Option"
            onChange={(e) => setSelectedOption(e.target.value)}
            className="signup-input"
          >
            {areas.map((area) => (
              <option key={area._id} value={area._name}>
                {area.name}
              </option>
            ))}
          </select>
        </div>
        <div className="map-instructions">
          Please click on the map to select the location for your object.
        </div>
        <div className="map-container" style={parentContainerStyle}>
          <LoadScriptNext googleMapsApiKey="AIzaSyBmdzYhkMqzzxJ9PQFaLGXi9MugHsnhpTI">
            <GoogleMap
              mapContainerStyle={containerStyle}
              center={center}
              zoom={10}
              onClick={handleMapClick}
            >
              {location && <MarkerF position={location} />}
            </GoogleMap>
          </LoadScriptNext>
        </div>
        <button className="signup-button" type="submit">
          Add Object
        </button>

      </form>
    </div>
  );
}

export default AddObjectForm;
