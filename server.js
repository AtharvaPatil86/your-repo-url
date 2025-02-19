const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

app.post("/login", (req, res) => {
  const { mobile } = req.body;
  if (mobile.length === 10) {
    res.json({ success: true });
  } else {
    res.status(400).json({ error: "Invalid mobile number" });
  }
});

app.get("/rooms", (req, res) => {
  res.json([
    { id: 1, name: "Deluxe Room", description: "A luxurious room with a sea view.", price: 5000 },
    { id: 2, name: "Standard Room", description: "A comfortable room for budget travelers.", price: 2500 },
  ]);
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
