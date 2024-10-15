import path from 'path';
import { readdir } from "fs/promises";
import fs from "fs";

export function cmd_cd(current_directory, args){
    // implement CD command.
    // parameter arguments= name_of_folder or ..(double dots)
    // without space.

    if (args.length > 1){
        console.log("too many arguments")
        return
    }
    if (args[0] === '..'){
        current_directory = path.dirname(current_directory);
        return current_directory;
    } else {

        if (!fs.existsSync(directory_to_list)){
            console.log("wrong path. please check.");
            return;
        }

        console.log("Is not implemented");
        return '';
    }
}

export async function cmd_ls(working_directory, args){
    if (args.length > 1){
        console.log("too many arguments");
    }

    let directory_to_list = args.length === 0? working_directory: args[0];

    if (!fs.existsSync(directory_to_list)){
       console.log("wrong path. please check.");
       return;
    }

    const files = await readdir(directory_to_list, {withFileTypes: true});
    files.forEach(file => {
        if (file.isDirectory()){
            console.log(`${file.name}/`);
        }
        else{ console.log(file.name) }
    });

}
