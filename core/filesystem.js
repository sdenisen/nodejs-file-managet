import path from 'path';
import process from "node:process"
import fs from 'node:fs';

export async function cmd_cat(working_directory, args){

    if (args.length > 1) {
        console.log("too many arguments");
        return;
    }

    if (args.length === 0) {
        console.log("no any arguments passed")
        return;
    }

    const directory = path.dirname(args[0]);
    const file_name = path.basename(args[0]);

    let dir = directory === "."?  working_directory: directory;
    const full_path_to_file = path.join(dir, file_name);
    console.log(full_path_to_file)

    const stream = fs.createReadStream(full_path_to_file, { encoding: 'utf8' });
    stream.on('error', (error) => {
        console.error(`Error during reading the file: ${error.message}`);
    });
    stream.pipe(process.stdout);

}