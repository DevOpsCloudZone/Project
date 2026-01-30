<button onClick={() => {
  fetch("http://localhost:5000/api/wishlist", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(trip)
  });
}}>
  ❤️ Add to Wishlist
</button>
