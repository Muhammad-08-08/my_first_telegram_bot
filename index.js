import { Telegraf } from "telegraf";
import dotenv from "dotenv";

dotenv.config();
const token = process.env.TELEGRAM_BOT_TOKEN;
const bot = new Telegraf(token);

// Har bir foydalanuvchi uchun so‘nggi xabar vaqtini saqlaymiz
const userTimestamps = new Map();

const onlyAdmin = (ctx, next) => {
  const adminId = 6237862488;
  if (ctx.from.id === adminId) return next();
  else ctx.reply("You are not authorized to use this bot.");
};

const rateLimit = (ctx, next) => {
  const now = Date.now();
  const lastTime = userTimestamps.get(ctx.from.id) || 0;

  // 2 sekunddan oldin yana yozsa — blok qilamiz
  if (now - lastTime < 2000) {
    ctx.reply("You are sending messages too quickly. Please slow down.");
    return;
  }

  userTimestamps.set(ctx.from.id, now);
  return next();
};

bot.command("help", (ctx) => {
  ctx.reply("Yordam kerakmi? Sizga qanday yordam berishim mumkin?");
});

bot.start(onlyAdmin, rateLimit, (ctx) => {
  ctx.reply(
    "Assalomu alaykum! Botga xush kelibsiz. Men sizning habarlaringizni qaytarib yozaman."
  );
});

bot.on("text", rateLimit, (ctx) => {
  ctx.reply(ctx.message.text);
});

bot.launch();
