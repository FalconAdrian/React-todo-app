import { DateTime } from 'luxon';

export default function useDateFunctions () 
{
    const convertToDateTimeObject = (date) => 
    {
        const dateTimeObject = DateTime.fromObject(
        {
            year: date.year, 
            month: date.month,
            day: date.day, 
            hour: date.hour, 
            minute: date.minute, 
        })
        return dateTimeObject;
    }

    const compareDates = (date) => 
    {
        if(date === "undefined") return false;
        const paramDate = convertToDateTimeObject(date);
        const currentDate = DateTime.now();
        const diffDay = paramDate.diff(currentDate, 'days')
        const diffObj = diffDay.toObject();
        return  diffObj.days <  2 
    }

    return {compareDates};
}