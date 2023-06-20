import fs from "fs";
import readline from "readline";

const startTime = Date.now();
const statsMap = new Map();
const filePromises = new Array(20);

function createFileProcessingPromise(i) {
    return new Promise(resolve => {
        const reader = readline.createInterface({
            input: fs.createReadStream(`./2kk_words_400x400/out${i}.txt`)
        });

        reader.on("line", (line) => {
            if (statsMap.has(line)) {
                if (!statsMap.get(line).includes(i))
                    statsMap.get(line).push(i);
            } else
                statsMap.set(line, [i]);
        });

        reader.on("close", () => {
            resolve();
        });
    })
}

for (let i = 0; i < 20; i++) {
    filePromises.push(createFileProcessingPromise(i));
}

await Promise.all(filePromises);

export function uniqueValues() {
    return statsMap.size;
}

export function existInAtleastTen() {
    return Array.from(statsMap).reduce((x, [_, value]) => (value.length >= 10 ? x + 1 : x), 0);
}

export function existInAllFiles() {
    return Array.from(statsMap).reduce((x, [_, value]) => (value.length >= 20 ? x + 1 : x), 0);
}

console.log(`Unique values: ${uniqueValues()}`);
console.log(`In at least 10: ${existInAtleastTen()}`);
console.log(`In all: ${existInAllFiles()}`);

const endTime = Date.now();

console.log(`Elapsed time: ${endTime - startTime}ms`);