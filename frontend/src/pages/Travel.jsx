
import Card from "../components/Card";

function Travel() {
  const trips = [
    { name: "Manali", description: "Snow mountains and adventure", image: "https://via.placeholder.com/250" },
    { name: "Goa", description: "Beaches and nightlife", image: "https://via.placeholder.com/250" }
  ];

  return (
    <div style={{ padding: "20px" }}>
      <h1>Travel Destinations ✈️</h1>
      <div style={{ display: "flex" }}>
        {trips.map((trip, index) => (
          <Card key={index} data={trip} />
        ))}
      </div>
    </div>
  );
}

export default Travel;
