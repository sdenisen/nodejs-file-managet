import path from "path";
import readline from "node:readline";
import {fileURLToPath} from "url";

const main_loop = () => {
    let username = "";
    const cli_args = process.argv.slice(2); // common line argumets

    for (let i = 0; i < cli_args.length; i++) {
        const argument = cli_args[i];
        const isFlag = argument.startsWith("--");
        if (isFlag) {
            const key_value_pair = argument.split("=")
            const key = key_value_pair[0];
            const value = key_value_pair[1];
            if ("--username" === key) {
                username = value
                console.log(`Welcome to the File Manager, ${username}!`);
            }
            i++;
        }
    }

    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });
    const command = () => {
        return new Promise((resolve) => {
            const __filename = fileURLToPath(import.meta.url);
            const path_to_working_directory = path.dirname(__filename);
            rl.question(`You are currently in ${path_to_working_directory} \n`, resolve);
        });
    }
    (async function () {
        for (; true;) {
            const new_cmd = await command();
            console.log(new_cmd);
            let cmd = new_cmd.trim().toLowerCase();
            if (cmd === ".exit") {
                break;
            }
        }

        console.log(`Thank you for using File Manager, ${username}, goodbye!`)
        rl.close();
        process.exit(0);
    })();

}

main_loop();