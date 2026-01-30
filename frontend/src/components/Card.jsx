import { useNavigate } from "react-router-dom";

function Card({ data }) {
  const navigate = useNavigate();

  return (
    <div style={{ border: "1px solid #ddd", padding: "15px", margin: "10px" }}>
      <img src={data.image} alt={data.name} style={{ width: "100%" }} />
      <h3>{data.name}</h3>
      <p>{data.description}</p>
      <button onClick={() => navigate(`/details/${data.id}`)}>
        View Details
      </button>
    </div>
  );
}

export default Card;
