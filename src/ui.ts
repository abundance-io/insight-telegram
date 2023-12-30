import { Keyboard } from "grammy";

export const entryKeyboard = new Keyboard()
  .text("Learn 📖")
  .row()
  .text("Create ✏️")
  .row()
  .text("Admin 🔐")
  .row()
  .resized();

export const adminMainKeyboard = new Keyboard()
  .text("Manage Creators 👥")
  .text("Manage Content ✏️")
  .text("Statistics 📈")
  .row()
  .resized();

export const manageCreatorKeyboard = new Keyboard()
  .text("View All Creators")
  .text("Add Creator")
  .row()
  .text("Remove Creator")
  .text("Edit Creator")
  .row()
  .text("Create Admin")
  .row()
  .resized();

export const createCreatorKeyboard = new Keyboard()
  .text("Username")
  .text("Phone Number")
  .row()
  .resized();

export const manageContentKeyboard = new Keyboard()
  .text("View Content")
  .text("Edit Content")
  .row()
  .text("Add Course")
  .text("Edit Course")
  .row()
  .resized();
