import {readEnvVar} from "../03_telegram_console_sender/utils.js";
import TelegramBot from "node-telegram-bot-api";

readEnvVar("utf8");

const bot = new TelegramBot(process.env.BOT_TOKEN, {polling: true});

bot.onText(/\/start/, async (msg) => {
    try {
        await bot.sendMessage(msg.chat.id, "Welcome, may i interest you in weather in Zaporizhzhia?", {
            "reply_markup": {
                "keyboard": [["Forecast in Zaporizhzhia"]]
            }
        });
    } catch (e) {
        console.error(e);
    }
});

bot.onText(/Forecast in Zaporizhzhia/, async (msg) => {
    try {
        await bot.sendMessage(msg.chat.id, "Great, at which intervals would you like to see the forecast?", {
            "reply_markup": {
                "keyboard": [["3 hour intervals"], ["6 hour intervals"]]
            }
        });
    } catch (e) {
        console.error(e);
    }
});

bot.onText(/3 hour intervals/, async (msg) => {
    try {
        await bot.sendMessage(msg.chat.id, "Wonderful, here is the weather forecast in 3-hour intervals!");
        await bot.sendMessage(msg.chat.id, "Would you like to receive a new update on weather in Zaporizhzhia?", {
            "reply_markup": {
                "keyboard": [["Forecast in Zaporizhzhia"]]
            }
        });
    } catch (e) {
        console.error(e);
    }
});

bot.onText(/6 hour intervals/, async (msg) => {
    try {
        await bot.sendMessage(msg.chat.id, "Wonderful, here is the weather forecast in 6-hour intervals!");
        await bot.sendMessage(msg.chat.id, "Would you like to receive a new update on weather in Zaporizhzhia?", {
            "reply_markup": {
                "keyboard": [["Forecast in Zaporizhzhia"]]
            }
        });
    } catch (e) {
        console.error(e);
    }
});