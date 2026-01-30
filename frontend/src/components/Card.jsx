function Card({ data }) {
  return (
    <div style={{
      border: "1px solid #ddd",
      borderRadius: "8px",
      padding: "15px",
      margin: "10px",
      width: "250px"
    }}>
      <img src={data.image} alt={data.name} style={{ width: "100%" }} />
      <h3>{data.name}</h3>
      <p>{data.description}</p>
      <button>View Details</button>
    </div>
  );
}

export default Card;
