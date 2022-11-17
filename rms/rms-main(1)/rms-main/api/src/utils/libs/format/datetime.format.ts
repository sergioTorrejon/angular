import moment = require('moment');
    //TODO: REVISAR SI SE PUEDE MEJORAR
export const MomentDate= () => { 
    return  moment(new Date());
}

export const TimeStamp = () => { 
    return moment().format('YYYY-MM-DD HH:mm:ss.SSS') 
};

export const fullTimeStamp = () => { 
    return moment().format('YYYY-MM-DD HH:mm:ss.SSS')
}

export const timeStamp = () => { 
    return  moment().format('YYYY-MM-DD HH:mm:ss')
}

export const dateMoment = () => { 
    return  moment().format('YYYY-MM-DD')
}

export const yearMoment = () => { 
    return  moment().format('YYYY')
}

export const monthMoment = () => { 
    return  moment().format('MM')
}

export const dayMoment = () => { 
    return  moment().format('DD')
}

export const timeMoment = () => { 
    return  moment().format('HH:mm:ss')
}

export const hourMoment = () => { 
    return  moment().format('HH')
}

export const minuteMoment = () => { 
    return  moment().format('mm')
}

export const secondMoment = () => { 
    return  moment().format('ss')
}

export const firstDayYearMoment = () => { 
    return  moment().format('YYYY-01-01')
}

export const lastDayYearMoment = () => { 
    return  moment().format('YYYY-12-31')
}

export const firstDayMontMoment = () => { 
    return  moment().format('YYYY-MM-01')
}

export const lastDayMontMoment = () => { 
    return  moment(firstDayMontMoment()).subtract(1,'days').format('YYYY-MM-DD')
}



