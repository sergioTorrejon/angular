//import * as md5 from 'md5';
import * as fs from 'fs';

import { FileCreate, PathCreate } from '../create/create.file';


export function PathExist(path: fs.PathLike) {
    try { 
        return fs.existsSync(path); 
    } 
    catch (err) { 
        return false; 
    } 
}

export function PathFile(path: string ,filename: string) {
    const pathfile = path + '/'+filename;
    try { 
        if (!PathExist(path)) {
            PathCreate(path);
        }
        if (!PathExist(pathfile)) {
            FileCreate(pathfile)
            return true
        }
        return true
    } 
    catch (err) { 
        return false; 
    } 
}



function fileExists(filePath) { 
    try { 
        return fs.statSync(filePath).isFile(); 
    } 
    catch (err) { 
        return false; 
    } 
}

