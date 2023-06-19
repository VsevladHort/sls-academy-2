import * as fs from "fs";
import TelegramBot from "node-telegram-bot-api";
import {program} from "commander";

function readEnvVar(encoding) {
    const contents = fs.readFileSync(".env").toString(encoding);
    contents.split("\n").forEach(x => {
        const splitX = x.split("=");
        process.env[splitX[0]] = splitX[1].trim();
    });
}

readEnvVar("utf8");

const bot = new TelegramBot(process.env.BOT_TOKEN);

program
    .name("telegram-console-sender")
    .description("Tool for sending messages to telegram bot from console")
    .version("1.0.0");

program.command("send-message")
    .description("sends text message to the bot")
    .argument("<string>", "message to send")
    .action(async (str) => {
        await bot.sendMessage(process.env.CHAT_ID, str);
    });

program.command("send-photo")
    .description("sends photo to the bot")
    .argument("<string>", "path to the photo to send")
    .action(async (str) => {
        try {
            await bot.sendPhoto(process.env.CHAT_ID, str, {contentType: "application/octet-stream"});
        } catch (err) {
            console.error(err);
        }
    });

program.parse();