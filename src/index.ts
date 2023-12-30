import { Bot, session, type Context as BaseContext } from "grammy";
import dotenv from "dotenv";
import {
  createBackMainMenuButtons,
  MenuMiddleware,
  MenuTemplate,
} from "grammy-inline-menu";

import { MyContext, adminConversation } from "./logic";

import { conversations, createConversation } from "@grammyjs/conversations";
import { entryKeyboard } from "./ui";

// Check out https://grammy.dev/guide/context.html and Context flavours
dotenv.config();

if (process.env.BOT_TOKEN) {
  const bot = new Bot<MyContext>(process.env.BOT_TOKEN);

  // Install the session plugin.
  bot.use(
    session({
      initial() {
        // return empty object for now
        return {};
      },
    })
  );

  // Install the conversations plugin.
  bot.use(conversations());
  bot.use(createConversation(adminConversation));

  bot.on("callback_query:data", async (ctx, next) => {
    console.log(
      "another callbackQuery happened",
      ctx.callbackQuery.data.length,
      ctx.callbackQuery.data
    );
    return next();
  });

  bot.command("start", async (ctx) =>
    ctx.reply("Welcome to the insight telegram bot", {
      reply_markup: entryKeyboard,
    })
  );

  bot.hears("Admin 🔐", async (ctx) => {
    await ctx.conversation.enter("adminConversation");
  });

  bot.catch((error) => {
    console.log("bot error", error);
  });

  async function startup() {
    await bot.start({
      onStart(botInfo) {
        console.log(new Date(), "Bot starts as", botInfo.username);
      },
    });
  }

  // eslint-disable-next-line @typescript-eslint/no-floating-promises
  startup();
} else {
  console.log("BOT_TOKEN not supplied");
}
