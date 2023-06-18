const readline = require("readline");
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

let isWorking = true;
let hasData = false;
let words = null;
let numbers = null;
console.log("Hello, please enter your words and numbers (or exit): ");

function finishWorkflow() {
    rl.close();
    isWorking = false;
}

function promptCommand() {
    console.log(`1. Sort words alphabetically
2. Show numbers from lesser to greater
3. Show numbers from bigger to smaller
4. Display words in ascending order by number of letters in the word
5. Show only unique words
6. Display only unique values from the set of words and numbers entered by the user
- exit`);
}

function sortWordsAlphabetically() {
    console.log(words.sort((a, b) => {
        return a.toLowerCase().localeCompare(b.toLowerCase());
    }));
}

function showNums(order) {
    if (order === "lesser") {
        console.log(numbers.sort((a, b) => {
            return a - b;
        }));
    } else if (order === "greater") {
        console.log(numbers.sort((a, b) => {
            return b - a;
        }));
    }
}

function showWordsByNumOfLetters() {
    console.log(words.sort((a, b) => {
        return a.length - b.length;
    }));
}

function showUniqueWords() {
    console.log(words.filter((el, i, arr) => {
        return i === arr.indexOf(el);
    }));
}

function showUniqueTokens() {
    console.log(words.filter((el, i, arr) => {
        return i === arr.indexOf(el);
    }));
    console.log(numbers.filter((el, i, arr) => {
        return i === arr.indexOf(el);
    }));
}

function handleInputCommand(line) {
    let wasIllegalCommandEntered = false;
    switch (line) {
        case "1":
            sortWordsAlphabetically();
            break;
        case "2":
            showNums("lesser");
            break;
        case "3":
            showNums("greater")
            break;
        case "4":
            showWordsByNumOfLetters();
            break;
        case "5":
            showUniqueWords();
            break;
        case "6":
            showUniqueTokens();
            break;
        case "exit":
            finishWorkflow();
            break;
        default:
            promptCommand();
            console.log("You have entered an illegal command, please repeat. For termination enter 'exit'");
            wasIllegalCommandEntered = true;
            break;
    }
    if (!wasIllegalCommandEntered) {
        hasData = false;
        console.log("Hello, please enter your words and numbers (or exit): ");
    }
}

function handleDataAcquisition(line) {
    const splitInput = line.split(" ");
    words = splitInput.filter((x) => {
        return isNaN(parseFloat(x))
    });
    numbers = splitInput.filter((x) => {
        return !isNaN(parseFloat(x))
    }).map((x) => parseFloat(x));
    hasData = true;
    promptCommand();
}

rl.on("line", (line) => {
    if (isWorking)
        switch (line) {
            case "exit" :
                finishWorkflow();
                break;
            default :
                if (!hasData) {
                    handleDataAcquisition(line);
                } else {
                    handleInputCommand(line);
                }
        }
}).on("close", () => {
    console.log("Exiting...");
    process.exit(0);
})