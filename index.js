const TelegramBot = require("node-telegram-bot-api");
require("dotenv").config();
const token = process.env.TELEGRAM_KEY;

const bot = new TelegramBot(token, { polling: true });
console.log("Bot Funcionando!");
bot.onText(/\/echo (.+)/, (msg, match) => {
  const chatId = msg.chat.id;
  const resp = match[1];

  bot.sendMessage(chatId, resp);
});

bot.on("message", (msg) => {
  const chatId = msg.chat.id;
  const message = msg.text;
  if (message.startsWith("/")) {
    return;
  }
  bot.sendMessage(
    chatId,
    "Mensaje: '" + message + "' recibido correctamente :)"
  );
});
bot.onText(/\/comando$/, (msg) => {
  const chatId = msg.chat.id;

  bot.sendMessage(chatId, "Comando ejecutado correctamente!");
});

bot.onText(/\/comando2$/, (msg) => {
  const chatId = msg.chat.id;

  const opciones = {
    reply_markup: JSON.stringify({
      inline_keyboard: [
        [{ text: "Opción 1", callback_data: "1" }],
        [{ text: "Opción 2", callback_data: "2" }],
      ],
    }),
  };
  bot.sendMessage(
    chatId,
    "Comando 2 ejecutado correctamente, selecciona una opción",
    opciones
  );
});

bot.on("callback_query", (callbackQuery) => {
  const messageId = callbackQuery.message.message_id;
  const chatId = callbackQuery.message.chat.id;
  if (callbackQuery.data === "1") {
    bot.sendMessage(chatId, "Opción 1 seleccionada correctamente");
  } else {
    const opciones = {
      reply_markup: JSON.stringify({
        inline_keyboard: [
          [{ text: "Opción 1", callback_data: "1" }],
          [{ text: "🟢Opción 2🟢", callback_data: "2" }],
        ],
      }),
    };
    bot.editMessageText(
      "Comando 2 ejecutado correctamente, selecciona una opción",
      {
        chat_id: chatId,
        message_id: messageId,
        reply_markup: opciones.reply_markup,
      }
    );
  }
});
