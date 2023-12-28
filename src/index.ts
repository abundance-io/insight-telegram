import { Bot, type Context as BaseContext } from "grammy";
import dotenv from "dotenv";
import {
  createBackMainMenuButtons,
  MenuMiddleware,
  MenuTemplate,
} from "grammy-inline-menu";

// Check out https://grammy.dev/guide/context.html and Context flavours
dotenv.config();
type MyContext = BaseContext;

if (process.env.BOT_TOKEN) {
  const bot = new Bot<MyContext>(process.env.BOT_TOKEN);

  bot.on("callback_query:data", async (ctx, next) => {
    console.log(
      "another callbackQuery happened",
      ctx.callbackQuery.data.length,
      ctx.callbackQuery.data
    );
    return next();
  });

  // bot.command("start", async (ctx) => ));
  // bot.command("keyboard" async (ctx) =>ctx.replywith);
  // bot.command("poll", async (ctx) =>
  //   ctx.replyWithPoll(
  //     "what is your name",
  //     ["abundance", "jachi", "treasure", "gozirim"],

  //     { type: "quiz", correct_option_id: 0, is_anonymous: false }
  //   )
  // );

  // bot.use(menuMiddleware.middleware());

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
