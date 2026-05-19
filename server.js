import express from 'express';
import mongoose from 'mongoose';

const app = express();

// Put the Mongoose connection code HERE (on the backend)
mongoose.connect("mongodb+srv://2174424_db_user:VkO22g6qhcmhynnD@dbwdatabase.madioii.mongodb.net/?appName=DBWDataBase&retryWrites=true&w=majority")
  .then(() => console.log("Connected to MongoDB successfully!"))
  .catch((err) => console.log("MongoDB connection error:", err));

app.listen(3000, () => {
  console.log("Server running on port 3000");
});

// Sample API Route for your React Frontend to test later
app.get('/api/words', (req, res) => {
  res.json({ 
    success: true, 
    data: ["Matrioska", "Palavras", "Jogo"] 
  });
});

// Start Express Server with Error Catching
const server = app.listen(PORT, () => {
  console.log(`Server successfully running on http://localhost:${PORT}`);
});

// Catch server-level errors (like if Port 3000 is already being used by another process)
server.on('error', (err) => {
  if (err.code === 'EADDRINUSE') {
    console.error(`Port ${PORT} is already in use!`);
    console.error("Tip: Run 'Stop-Process -Name \"node\" -Force' in PowerShell to clear it.");
  } else {
    console.error("Server encountered an error:", err);
  }
});