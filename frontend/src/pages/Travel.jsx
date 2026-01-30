import { useEffect, useState } from "react";
import Card from "../components/Card";

function Travel() {
  const [trips, setTrips] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/travel")
      .then(res => res.json())
      .then(data => setTrips(data));
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h1>Travel Destinations ✈️</h1>
      <div style={{ display: "flex" }}>
        {trips.map((trip) => (
          <Card key={trip.id} data={trip} />
        ))}
      </div>
    </div>
  );
}

export default Travel;
