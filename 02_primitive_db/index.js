import inquirer from 'inquirer';
import * as fs from 'fs';

let isRunning = true;
const encoding = "utf8";

function writeUserToDb(user) {
    try {
        fs.writeFileSync("db.txt", JSON.stringify(user).concat("\n"), {flag: 'a+', encoding: encoding});
    } catch (err) {
        console.log(err);
        isRunning = false;
    }
}

function readUsers() {
    try {
        const contents = fs.readFileSync("db.txt").toString(encoding);
        return contents.split("\n").filter(x => x !== "").map(x => JSON.parse(x));
    } catch (err) {
        console.log(err);
        isRunning = false;
    }
}

function findUserByName(users, name) {
    const normalizedName = name.toLocaleLowerCase();
    return users.find((x) => x.username.toLocaleLowerCase() === normalizedName);
}

function handleInquirerPromptRejection() {
    return (error) => {
        if (error.isTtyError) {
            console.error(error);
            isRunning = false;
        } else {
            console.error(error);
            isRunning = false;
        }
    };
}

function validateUsername() {
    return async function (input) {
        if (input.includes("\n"))
            return "Newline character is not allowed in name!"; // because it is used as a separator in db
        return true;
    };
}

async function handleUserSearch() {
    return inquirer
        .prompt([
            {
                type: "confirm",
                name: "confirmation",
                message: "Do you wish to search for user? ",
            }
        ])
        .then(async (answers) => {
            if (answers.confirmation) {
                const users = readUsers();
                console.log(users);
                const username = await inquirer.prompt([
                    {
                        type: "input",
                        name: "username",
                        message: "Enter the name of the user, to terminate press ENTER: ",
                        validate: validateUsername()
                    }
                ]).then(async (answers) => {
                    return answers.username;
                }).catch(handleInquirerPromptRejection());
                const user = findUserByName(users, username);
                if (user) {
                    console.log(`User ${user.username} was found!`);
                    console.log(user);
                } else {
                    console.log("No user by such name was found =(");
                }
            }
        })
        .catch(handleInquirerPromptRejection());
}

async function handleUserCreation() {
    let username = "";
    await inquirer
        .prompt([
            {
                type: "input",
                name: "username",
                message: "Enter the name of the user, to terminate press ENTER: ",
                validate: validateUsername()
            }
        ])
        .then(async (answers) => {
            username = answers.username;
            if (username === "") {
                isRunning = false;
                await handleUserSearch();
            }
        })
        .catch(handleInquirerPromptRejection());
    if (isRunning)
        await inquirer
            .prompt([
                {
                    type: "list",
                    name: "gender",
                    message: "Choose the user's gender: ",
                    choices: ["male", "female", "non-binary"]
                },
                {
                    type: "input",
                    name: "age",
                    message: "Enter user's age",
                    validate: async function (input) {
                        const parsedInput = parseFloat(input);
                        if (Number.isSafeInteger(parsedInput) && parsedInput > 0)
                            return true;
                        else
                            return "Invalid age value!";
                    }
                }
            ])
            .then(async (answers) => {
                answers.username = username;
                writeUserToDb(answers);
            })
            .catch(handleInquirerPromptRejection());
}

while (isRunning) {
    await handleUserCreation();
}