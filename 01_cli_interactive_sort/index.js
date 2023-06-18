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

function promprtCommand() {
    console.log(`1. Sort words alphabetically
2. Show numbers from lesser to greater
3. Show numbers from bigger to smaller
4. Display words in ascending order by number of letters in the word
5. Show only unique words
6. Display only unique values from the set of words and numbers entered by the user
- exit`);
}

function handleInputCommand(line) {
    let wasIllegalCommandEntered = false;
    switch (line) {
        case "1":
            break;
        case "2":
            break;
        case "3":
            break;
        case "4":
            break;
        case "5":
            break;
        case "6":
            break;
        case "exit":
            finishWorkflow();
            break;
        default:
            promprtCommand();
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
        isNaN(parseFloat(x))
    });
    numbers = splitInput.filter((x) => {
        !isNaN(parseFloat(x))
    });
    hasData = true;
    promprtCommand();
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