import { program } from "commander";
import clone from "git-clone";
import fs from "fs";
import chalk from "chalk";
import { exec } from "child_process";

program
    .command("create <projectName>")
    .description("create a new project")
    .action((projectName) => {
        const gitUrl = "https://github.com/juanicaii/expo-app-boilerplate";
        // verify if the folder exists

        console.log(chalk.green("Creating project..."));
        if (fs.existsSync(projectName)) {
            console.log(chalk.red("The folder already exists"));
            return
        }

        console.log(chalk.green("Downloading template..."));
        console.log(chalk.green("Cloning template..."));
        clone(gitUrl, projectName, null, () => {
            exec(`cd ${projectName} && rm -rf .git && sed -i '' 's/"name": "[^"]*"/"name": "${projectName}"/' package.json`, () => {
                console.log(chalk.green("Installing dependencies..."));
                // use yarn  or npm

                exec(`cd ${projectName} && yarn`, () => {
                    exec(`cd ${projectName}`, () => {
                        console.log(chalk.green("Project created successfully!"));
                    });
                });



            });


        });
    });


program.parse(process.argv);

// Path: package.json