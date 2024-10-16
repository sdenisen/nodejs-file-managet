import fsPromises from "fs/promises";
import { createHash } from 'crypto';

export async function cmd_hash(working_directory, args){
    // Calculate hash for file and print it into console
    // hash path_to_file

     if (args.length > 1) {
        console.log("Too many arguments");
        return;
    }

    if (args.length === 0) {
        console.log("Missed some required arguments")
        return;
    }

    // parse arguments.
    const file_path = args[0];

    // hash action.
    await fsPromises.stat(file_path).then(() => {
            fsPromises.readFile(file_path).then(file_buffer => {
                const hash = createHash('sha256').update(file_buffer).digest('hex');
                console.log(hash);
            });
    }).catch(error => {
        console.log("error during reading the file");
    });
}