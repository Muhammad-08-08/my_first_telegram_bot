import { Telegraf } from "telegraf";
import dotenv from "dotenv";

dotenv.config();

const token = process.env.TELEGRAM_BOT_TOKEN;

const bot = new Telegraf(token);

bot.start(async (ctx) => {
  ctx.sendMessage(
    "Assalomu alaykum! Botga xush kelibsiz. men sizning habarlaringizni qaytarib yozaman"
  );
});

bot.on("text", async (ctx) => {
  const userText = ctx.message.text;
  ctx.sendMessage(`${userText}`);
});

bot.launch();
