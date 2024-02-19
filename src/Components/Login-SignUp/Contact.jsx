import React from "react";
import CatchIt from "../Assets/CatchIt.png";

function ContactPage() {
  const contacts = [
    { name: "Daniel Allen", phone: "+972503443188" },
    { name: "Sahar Faridian", phone: "+972 50-321-7014" },
    { name: "Noam Tal Yosef", phone: "+972 50-982-3103" },
  ];

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "flex-start",
        margin: "0 auto",
        width: "90%",
        padding: "20px",
      }}
    >
      <div style={{ flex: 1 }}>
        <h1>Contact List</h1>
        <ul style={{ listStyleType: "none", padding: 0 }}>
          {contacts.map((contact, index) => (
            <li
              key={index}
              style={{ padding: "10px", borderBottom: "1px solid #ccc" }}
            >
              <h2>{contact.name}</h2>
              <p>{contact.phone}</p>
            </li>
          ))}
        </ul>
      </div>
      <div style={{ flex: 1, display: "flex", justifyContent: "flex-end" }}>
        <img
          src={CatchIt}
          alt="Logo"
          style={{ maxWidth: "100%", maxHeight: "200px" }}
        />
      </div>
    </div>
  );
}

export default ContactPage;
