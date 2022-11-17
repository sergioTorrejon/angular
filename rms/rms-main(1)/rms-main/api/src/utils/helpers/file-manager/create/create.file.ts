//import * as md5 from 'md5';
import * as fs from 'fs';

export function PathCreate(path: fs.PathLike) {
    try { 
        return fs.mkdirSync(path, { recursive: true }); 
    } 
    catch (err) { 
        return false; 
    } 
}

export function FileCreate(pathfile: string) {
    try { 
        return fs.writeFileSync(pathfile,''); 
    } 
    catch (err) { 
        return false; 
    } 
}

