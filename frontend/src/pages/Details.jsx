import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

function Details() {
  const { id } = useParams();
  const [trip, setTrip] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:5000/api/travel/${id}`)
      .then(res => res.json())
      .then(data => setTrip(data));
  }, [id]);

  if (!trip) return <h2>Loading...</h2>;

  return (
    <div style={{ padding: "20px" }}>
      <h1>{trip.name}</h1>
      <img src={trip.image} alt={trip.name} />
      <p>{trip.description}</p>
      <button>❤️ Add to Wishlist</button>
    </div>
  );
}

export default Details;
