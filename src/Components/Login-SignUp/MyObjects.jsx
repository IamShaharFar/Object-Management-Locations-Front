import React from "react";
import "./MyObject.css";

const mockObjects = [
  {
    _id: "1",
    description: "Description 1",
    areaName: "Area 1",
    locationName: "Location 1",
  },
  {
    _id: "2",
    description: "Description 2",
    areaName: "Area 2",
    locationName: "Location 2",
  },
  {
    _id: "3",
    description: "Description 3",
    areaName: "Area 3",
    locationName: "Location 3",
  },
  {
    _id: "4",
    description: "Description 4",
    areaName: "Area 4",
    locationName: "Location 4",
  },
  {
    _id: "5",
    description: "Description 5",
    areaName: "Area 5",
    locationName: "Location 5",
  },
  {
    _id: "6",
    description: "Description 6",
    areaName: "Area 6",
    locationName: "Location 6",
  },
  {
    _id: "7",
    description: "Description 7",
    areaName: "Area 7",
    locationName: "Location 7",
  },
  {
    _id: "8",
    description: "Description 8",
    areaName: "Area 8",
    locationName: "Location 8",
  },
  {
    _id: "9",
    description: "Description 9",
    areaName: "Area 9",
    locationName: "Location 9",
  },
  {
    _id: "10",
    description: "Description 10",
    areaName: "Area 10",
    locationName: "Location 10",
  },
];

function MyObject() {
  return (
    <table className="objectTable">
      <thead>
        <tr>
          <th>ID</th>
          <th>Description</th>
          <th>Area Name</th>
          <th>Location Name</th>
        </tr>
      </thead>
      <tbody>
        {mockObjects.map((obj) => (
          <tr key={obj._id}>
            <td>{obj._id}</td>
            <td>{obj.description}</td>
            <td>{obj.areaName}</td>
            <td>{obj.locationName}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default MyObject;
