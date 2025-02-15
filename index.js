require('dotenv').config(); // Load env variables
const express = require('express');
const axios = require('axios');
const app = express();

app.use(express.json());

const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const TELEGRAM_API = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}`;

app.post('/webhook', async (req, res) => {
  const update = req.body;
  console.log('Update received:', update);

  // Check if the update has a message with text
  if (update.message && update.message.text) {
    const chatId = update.message.chat.id;
    const messageText = update.message.text.trim();

    // Process the "/start" command by sending a welcome message with a Web App button
    if (messageText === '/start') {
      const welcomeMessage = 'Welcome! Click the button below to open the Web App.';
      const keyboard = {
        inline_keyboard: [
          [
            {
              text: 'Open Web App',
              web_app: { url: process.env.WEB_APP_URL }
            }
          ]
        ]
      };

      try {
        await axios.post(`${TELEGRAM_API}/sendMessage`, {
          chat_id: chatId,
          text: welcomeMessage,
          reply_markup: keyboard
        });
      } catch (error) {
        console.error('Error sending welcome message:', error.message);
      }
    } else {
      // For any other message, simply echo it back (or implement your custom logic)
      try {
        await axios.post(`${TELEGRAM_API}/sendMessage`, {
          chat_id: chatId,
          text: `You said: ${messageText}`
        });
      } catch (error) {
        console.error('Error sending echo message:', error.message);
      }
    }
  }

  res.sendStatus(200);
});

app.get('/', (req, res) => {
  res.send('Hello from your Telegram Bot backend!');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
