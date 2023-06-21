const endpoints = `https://jsonbase.com/sls-team/json-793
https://jsonbase.com/sls-team/json-955
https://jsonbase.com/sls-team/json-231
https://jsonbase.com/sls-team/json-931
https://jsonbase.com/sls-team/json-93
https://jsonbase.com/sls-team/json-342
https://jsonbase.com/sls-team/json-770
https://jsonbase.com/sls-team/json-491
https://jsonbase.com/sls-team/json-281
https://jsonbase.com/sls-team/json-718
https://jsonbase.com/sls-team/json-310
https://jsonbase.com/sls-team/json-806
https://jsonbase.com/sls-team/json-469
https://jsonbase.com/sls-team/json-258
https://jsonbase.com/sls-team/json-516
https://jsonbase.com/sls-team/json-79
https://jsonbase.com/sls-team/json-706
https://jsonbase.com/sls-team/json-521
https://jsonbase.com/sls-team/json-350
https://jsonbase.com/sls-team/json-64`.split("\n").map(x => x.trim());

let trueNodes = 0;
let falseNodes = 0;

for (const link of endpoints) {
    for (let i = 0; i < 3; i++) {
        try {
            const record = await (await fetch(link)).json();
            const hasIsDone = checkForIsDone(record);
            if (hasIsDone === null) {
                console.log(`JSON at endpoint ${link} did not contain isDone key`);
            }
            if (hasIsDone) {
                console.log(`[Success] ${link}: isDone - True`)
                trueNodes++;
            } else if (hasIsDone !== null) {
                console.log(`[Success] ${link}: isDone - False`)
                falseNodes++;
            }
            break;
        } catch (e) {
            console.log(`[Fail] ${link}: The endpoint is unavailable`)
            console.error(e);
        }
    }
}

console.log(`\nFound True values: ${trueNodes},`);
console.log(`Found False values: ${falseNodes}`);

function checkForIsDone(record) {
    if (typeof record !== "object")
        return null;
    let hasIsDone = Object.keys(record).includes("isDone");
    if (hasIsDone)
        return record["isDone"];
    else {
        for (const key of Object.keys(record)) {
            const keyHasIsDone = checkForIsDone(record[key]);
            if (keyHasIsDone !== null)
                return keyHasIsDone;
        }
    }
    return null;
}