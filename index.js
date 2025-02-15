const express = require('express');
const app = express();


app.use(express.json());

// Telegram webhook endpoint
app.post('/webhook', (req, res) => {
  console.log('Received update:', req.body);
  
  res.sendStatus(200);
});


app.get('/', (req, res) => {
  res.send('Hello from your Telegram bot backend!');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
