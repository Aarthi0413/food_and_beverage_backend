const express = require("express");
const cors = require("cors");
const cookieParser = require('cookie-parser');
require("dotenv").config();
const connectDB = require("./config/db");
const router = require("./routes/index");

connectDB();

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors(
  {
    origin: "https://703917ee-e833-4e24-b6fd-3bd98be9e116.domoapps.prod5.domo.com",
    credentials: true,
    allowedHeaders:['Content-Type', 'Authorization']
  }
));

app.use((req, res, next) => {
  res.set('Access-Control-Allow-Credentials', 'true');
  next();
});

app.get("/", (req, res) => {
  res.json({ message: "Welcome to Food and Beverage Backend API" });
})

app.use("/api", router);


const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
