import {readEnvVar} from "../03_telegram_console_sender/utils.js";

readEnvVar("utf8");

console.log(process.env.BOT_TOKEN);