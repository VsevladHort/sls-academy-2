import inquirer from 'inquirer';

let isRunning = true;

while (isRunning) {
    await inquirer
        .prompt([
            {
                type: "input",
                name: "username",
                message: "Enter the name of the user, to terminate press ENTER: "
            },
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
        .then((answers) => {
            console.log(answers);
            if (answers.username === "")
                isRunning = false;
        })
        .catch((error) => {
            if (error.isTtyError) {
                // Prompt couldn't be rendered in the current environment
            } else {
                // Something else went wrong
            }
        });
}