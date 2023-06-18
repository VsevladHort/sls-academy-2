import inquirer from 'inquirer';

let isRunning = true;

while (isRunning) {
    await inquirer
        .prompt([
            {
                type: "input",
                name: "username",
                message: "Type the name of the user: "
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