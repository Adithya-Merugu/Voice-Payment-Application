const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors"); // Import CORS package

dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use(cors()); // Use CORS middleware

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("Connected to MongoDB"))
.catch((err) => console.error("Could not connect to MongoDB:", err));

// Import routes
const creditRoute = require("./routes/credit");
const transactionRoutes = require("./routes/transactionRoutes"); // Import transaction routes

// Use routes
app.use("/api/credit", creditRoute);
app.use("/api/transactions", transactionRoutes); // Use transaction routes
// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
