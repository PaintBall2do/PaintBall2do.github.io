const express = require("express");
const fs = require("fs");
const app = express();

app.use(express.json());
app.use(express.static(__dirname)); // Serve static files

const messagesFile = __dirname + "/messages.json";

// Endpoint to fetch messages
app.get("/messages.json", (req, res) => {
  fs.readFile(messagesFile, "utf-8", (err, data) => {
    if (err) {
      res.status(500).send("Error reading messages");
    } else {
      res.json(JSON.parse(data));
    }
  });
});

// Endpoint to save a new message
app.post("/save", (req, res) => {
  const { message } = req.body;
  fs.readFile(messagesFile, "utf-8", (err, data) => {
    const messages = err ? [] : JSON.parse(data);
    messages.push(message);
    fs.writeFile(messagesFile, JSON.stringify(messages, null, 2), (err) => {
      if (err) {
        res.status(500).send("Error saving message");
      } else {
        res.sendStatus(200);
      }
    });
  });
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
