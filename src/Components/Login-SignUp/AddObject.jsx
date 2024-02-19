import React, { useState } from "react";

function AddObjectForm() {
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState({ lat: "", lng: "" });
  const [selectedOption, setSelectedOption] = useState("");

  // Example options for the combo box
  const options = [
    { id: 1, name: "Option 1" },
    { id: 2, name: "Option 2" },
    { id: 3, name: "Option 3" },
    // Add more options as needed
  ];

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   console.log("Submitted:", { description, location, selectedOption });
  //   // Here you would typically send the data to a server or handle it as needed
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const objectData = {
      description,
      lan: parseFloat(location.lng), // Assuming 'lan' should be 'lng' from your location state
      lat: parseFloat(location.lat),
      userId: "65d1f2463b8a1224b5506369", // Example, replace with actual logic to obtain userId
      areaId: "65d33df2011c3bfd2744e109", // Example, replace with actual logic to obtain areaId
    };

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
      console.log("Success:", responseData);
      // Handle success, e.g., clear form, display success message, etc.
    } catch (error) {
      console.error("Error:", error);
      // Handle error, e.g., display error message to user
    }
  };

  return (
    <div className="signup-container">
      <form className="signup-form" onSubmit={handleSubmit}>
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
          <label htmlFor="combo-box">Choose an Option:</label>
          <select
            id="combo-box"
            value={selectedOption}
            placeholder="Choose an Option"
            onChange={(e) => setSelectedOption(e.target.value)}
            className="signup-input"
          >
            {options.map((option) => (
              <option key={option.id} value={option.name}>
                {option.name}
              </option>
            ))}
          </select>
        </div>
        <button className="signup-button" type="submit">
          Add Object
        </button>
      </form>
    </div>
  );
}

export default AddObjectForm;
