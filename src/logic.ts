//todo! come up with better name
import { type Context as BaseContext } from "grammy";
import { Conversation, ConversationFlavor } from "@grammyjs/conversations";
import {
  adminMainKeyboard,
  createCreatorKeyboard,
  manageCreatorKeyboard,
  manageContentKeyboard,
} from "./ui";
import { conversations } from "@grammyjs/conversations";
import { authAdmin, getAllCreators } from "./requests";

export type MyContext = BaseContext & ConversationFlavor;
export type MyConversation = Conversation<MyContext>;

export async function adminConversation(
  conversation: MyConversation,
  ctx: MyContext
) {
  const name = ctx.message?.from.first_name.toString();
  const telegram_id = ctx.message?.from.id.toString()!;

  //authenticate user
  while (true) {
    await ctx.reply("enter admin passkey");
    const passkey = await conversation.form.text();
    const isAuth = await authAdmin(telegram_id, passkey);
    if (isAuth) {
      await ctx.reply(`Welcome ${name}`, {
        reply_markup: adminMainKeyboard,
      });
      break;
    } else {
      await ctx.reply("passkey is incorrect");
    }
  }
  while (true) {
    let activityResponse = await conversation.form.text();
    if (activityResponse == "Manage Creators 👥") {
      await ctx.reply("select action", {
        reply_markup: manageCreatorKeyboard,
      });

      while (true) {
        let activityResponse = await conversation.form.text();
        if (activityResponse == "View All Creators") {
          const creators = await getAllCreators();
          if (creators) {
            let creator_list = `${creators.users.length} Creator${
              creators.users.length > 1 ? "s" : ""
            }\n`;
            for (let creator of creators.users) {
              creator_list = creator_list.concat(creator.telegram_id + "\n");
            }
            await ctx.reply(creator_list);
          }
        } else if (activityResponse == "Add New Creator") {
          ctx.reply("Select username or phone number", {
            reply_markup: createCreatorKeyboard,
          });
          while (true) {
            activityResponse = await conversation.form.text();
            //add to pending creator  array
          }
        }
      }
    } else if (activityResponse == "Manage Content ✏️") {
      await ctx.reply;
      break;
    } else if (activityResponse == "Statistics 📈") {
      await ctx.reply("some stats here");
      break;
    } else {
      await ctx.reply("invalid response");
    }
  }
}
