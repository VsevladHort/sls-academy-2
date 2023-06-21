import fs from "fs";

const encoding = "utf8";

// Contents of the json to process have to be placed in a ./json_dir/list.json file
// Resulting json will be written to the file ./json_dir/processed-list.json, previous contents of the file will be overwritten
const contents = JSON.parse(fs.readFileSync("./json_dir/list.json").toString(encoding));
const userRecords = [];

for (const vacationRecord of contents) {
    const matchingUserRecord = userRecords.find(x => x.userId === vacationRecord.user._id);
    if (matchingUserRecord) {
        matchingUserRecord.vacations.push({
            startDate: vacationRecord.startDate,
            endDate: vacationRecord.endDate
        });
    } else {
        userRecords.push({
            userId: vacationRecord.user._id,
            userName: vacationRecord.user.name,
            vacations: [
                {
                    startDate: vacationRecord.startDate,
                    endDate: vacationRecord.endDate
                }
            ]
        });
    }
}

console.log(JSON.stringify(userRecords))

fs.writeFileSync("./json_dir/processed-list.json", JSON.stringify(userRecords));