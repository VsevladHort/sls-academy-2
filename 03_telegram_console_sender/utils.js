import fs from "fs";

export function readEnvVar(encoding) {
    const contents = fs.readFileSync(".env").toString(encoding);
    contents.split("\n").forEach(x => {
        const splitX = x.split("=");
        process.env[splitX[0]] = splitX[1].trim();
    });
}