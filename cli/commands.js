import path from 'path';

function cmd_cd(current_directory, args){
    // implement CD command.
    // parameter arguments= name_of_folder or ..(double dots)
    // without space.

    if (args.length > 1){
        console.log("too many arguments")
    }
    if (args[0] === '..'){
        current_directory = path.dirname(current_directory);
        return current_directory;
    } else {
        console.log("Is not implemented");
        return '';
    }
}

export default cmd_cd;