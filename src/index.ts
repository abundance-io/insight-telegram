// const { Telegraf } = require("telegraf");
import { Telegraf } from "telegraf";
import { message } from "telegraf/filters";
import { MenuMiddleware, MenuTemplate } from "grammy-inline-menu";

const menuTemplate = new MenuTemplate<any>(
  (ctx) => `Hey ${ctx.from.first_name}!`
);

menuTemplate.interact("I am excited!", "a", {
  do: async (ctx) => {
    await ctx.reply("As am I!");
    return false;
  },
});

const bot = new Telegraf("6754611306:AAESEeEdj7QRpDGk5PaoDPjAAix_6LiNH7U");
const menuMiddleware = new MenuMiddleware("/", menuTemplate);
bot.start((ctx) => menuMiddleware.replyToContext(ctx));
bot.use(menuMiddleware);
bot.launch();

// Enable graceful stop
process.once("SIGINT", () => bot.stop("SIGINT"));
process.once("SIGTERM", () => bot.stop("SIGTERM"));
