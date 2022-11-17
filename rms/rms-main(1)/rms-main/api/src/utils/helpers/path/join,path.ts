import { CONFIG_ENV } from "src/config/config";

const path = require('path');

export const joinPathFolder = ( pathRoot : string, folder:string ) => {
    return  path.join(pathRoot, folder, path.sep)
}

export const pathStorageLogs = ( file : string ='' ) => {
    const archivo= path.join(CONFIG_ENV.PATH_ROOT,'logs',file, path.sep)
    return archivo
}