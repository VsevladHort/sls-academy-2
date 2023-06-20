import TelegramBot from "node-telegram-bot-api";
import {readEnvVar} from "../03_telegram_console_sender/utils.js";

readEnvVar("utf8");

const bot = new TelegramBot(process.env.BOT_TOKEN, {polling: true});
const waitTimeForMonoRequests = 60_000;
let exchangeRateUsdMonoCache = {buy: 0, sale: 0};
let exchangeRateEurMonoCache = {buy: 0, sale: 0};
let canRequestFromMono = true;

bot.onText(/\/start/, async (msg) => {
    try {
        await bot.sendMessage(msg.chat.id, "Welcome, may I interest you in exchange rates of UAH?", {
            "reply_markup": {
                "keyboard": [["USD", "EUR"]]
            }
        });
    } catch (e) {
        console.error(e);
    }
});

bot.onText(/USD/, async (msg) => {
    try {
        await renewMonoBankExchangeRates()
        const exchangeRatePB = await (await fetch("https://api.privatbank.ua/p24api/pubinfo?exchange&json&coursid=11")).json();
        await bot.sendMessage(msg.chat.id, `USD
BUY price in PrivatBank: ${exchangeRatePB.find(x => x.ccy === "USD").buy}
SALE price in PrivatBank: ${exchangeRatePB.find(x => x.ccy === "USD").sale}
BUY price in MonoBank: ${exchangeRateUsdMonoCache.buy}
SALE price in MonoBank: ${exchangeRateUsdMonoCache.sale}`, {
            "reply_markup": {
                "keyboard": [["USD", "EUR"]]
            }
        });
    } catch (e) {
        console.error(e);
    }
});

bot.onText(/EUR/, async (msg) => {
    try {
        await renewMonoBankExchangeRates();
        const exchangeRatePB = await (await fetch("https://api.privatbank.ua/p24api/pubinfo?exchange&json&coursid=11")).json();
        await bot.sendMessage(msg.chat.id, `EUR
BUY price in PrivatBank: ${exchangeRatePB.find(x => x.ccy === "EUR").buy}
SALE price in PrivatBank: ${exchangeRatePB.find(x => x.ccy === "EUR").sale}
BUY price in MonoBank: ${exchangeRateEurMonoCache.buy}
SALE price in MonoBank: ${exchangeRateEurMonoCache.sale}`, {
            "reply_markup": {
                "keyboard": [["USD", "EUR"]]
            }
        });
    } catch (e) {
        console.error(e);
    }
});

async function renewMonoBankExchangeRates() {
    try {
        if (canRequestFromMono) {
            canRequestFromMono = false;
            const exchangeRateMonoBank = await (await fetch("https://api.monobank.ua/bank/currency")).json();
            const usdInfo = exchangeRateMonoBank.find(x => x.currencyCodeA === 840 && x.currencyCodeB === 980);
            exchangeRateUsdMonoCache.buy = usdInfo.rateBuy;
            exchangeRateUsdMonoCache.sale = usdInfo.rateSell;
            const eurInfo = exchangeRateMonoBank.find(x => x.currencyCodeA === 978 && x.currencyCodeB === 980);
            exchangeRateEurMonoCache.buy = eurInfo.rateBuy;
            exchangeRateEurMonoCache.sale = eurInfo.rateSell;
            setTimeout(() => {
                canRequestFromMono = true;
            }, waitTimeForMonoRequests)
        }
    } catch (e) {
        console.log(e);
    }
}