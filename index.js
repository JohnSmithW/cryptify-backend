require('dotenv').config();
const { Telegraf, Markup } = require('telegraf');

const bot = new Telegraf(process.env.TELEGRAM_BOT_TOKEN);

// Handle /start command
bot.start((ctx) => {
  const welcomeMessage = 'Welcome! Click the button below to open the Web App.';
  // Create an inline keyboard with a web_app button
  const keyboard = Markup.inlineKeyboard([
    Markup.button.webApp('Open Web App', process.env.WEB_APP_URL)
  ]);

  ctx.reply(welcomeMessage, keyboard);
});

// Echo other messages as an example
bot.on('text', (ctx) => {
  ctx.reply(`You said: ${ctx.message.text}`);
});

bot.on('sticker', (ctx) => {
  ctx.reply('👍');
})

// Start the bot (uses polling by default, or you can set up a webhook)
bot.launch();

console.log('Bot is up and running...');
