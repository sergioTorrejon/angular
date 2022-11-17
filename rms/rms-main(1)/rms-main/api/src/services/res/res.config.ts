import { JsonToStringfi } from 'src/utils/helpers';

import { logger } from '../logger/logger.service';
import { ResDto } from './dtos/res.dto';

//RESPONSE SUCCESS
export const responseSuccess = ( message:string, data:any=[] ):ResDto =>{
    const res = new ResDto();
        res.success=true,
        res.message=message,
        res.data=data
    logger.setContext(`RES SUCCESS`)
    logger.log(JsonToStringfi(res))
    return res;
}

//RESPONSE ERROR
export const responseError = ( message:string, error:string, data:any=[] ):ResDto =>{
    const res = new ResDto();
        res.success=false,
        res.error=error,
        res.message=message,
        res.data=data
    logger.setContext(`RES`)
    logger.error(JsonToStringfi(res))
    return res;
}