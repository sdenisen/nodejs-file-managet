import path from 'path';
import process from "node:process"
import fs from 'node:fs';
import fsPromises from 'fs/promises';

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


    const stream = fs.createReadStream(full_path_to_file, { encoding: 'utf8' });
    stream.on('error', (error) => {
        console.error(`Error during reading the file: ${error.message}`);
    });
    stream.pipe(process.stdout);
}


export async function cmd_add(working_directory, args){

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

    fsPromises.writeFile(full_path_to_file, "", {flag: "wx"}).then(()=>{

    }).catch((error) => {
       if (error.code === "EEXIST"){
            console.log("The file already exist");
       } else {
           console.error(`Something go wrong: ${error.message}`);
       }
    });
}

export async function cmd_rn(working_directory, args){
    if (args.length > 2) {
        console.log("too many arguments");
        return;
    }

    if (args.length < 2) {
        console.log("missed some arguments")
        return;
    }

    const args_path_to_file = args[0];
    const args_new_file_name = args[1];
    const old_directory = path.dirname(args_path_to_file);
    const old_file_name = path.basename(args_path_to_file);
    const new_file_name = path.basename(args_new_file_name);

    let old_dir = old_directory === "."?  working_directory: old_directory;
    const full_path_to_old_file = path.join(old_dir, old_file_name);
    const full_path_to_new_file = path.join(old_dir, new_file_name);
    let is_error = false
    await fsPromises.stat(full_path_to_old_file).catch(error => {
        console.log(`The file ${old_file_name} doesn't exist.`);
        is_error = true;
    });
    if (is_error) return;

    await fsPromises.stat(full_path_to_new_file).then(() => {
        console.log(`The file ${new_file_name} already exist.`);
        is_error = true;
    }).catch((error) => {
        if(error.code !== 'ENOENT'){
            Promise.reject(error)
        }
    });

    if (is_error) return;

    await fsPromises.rename(old_file_name, new_file_name).catch((error) => {
        if (error.code === 'ENOENT'){
            console.log(`${error.message}`);
        }
    });
}