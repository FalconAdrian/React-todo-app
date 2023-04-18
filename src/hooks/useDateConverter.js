import { useDispatch } from "react-redux";
import { dynamicListsActions } from '../store/dynamicLists-slice';
import { inboxActions } from '../store/inbox-slice';

export function useDateConverter()
{

    const { DateTime } = require("luxon");
    const dispatch = useDispatch();

    const restructureDate = (date) => 
    {
        return DateTime.fromObject(
        {
            year: date.year,
            month: date.month,
            day: date.day,
            hours: date.hours,
            minutes: date.minutes,
        })
    }

    const asignDateToTask = (date, task,  onSetDateValue, onSetTaskDateIsDefined) =>
    {
        const dynamic = task.listId !== "inbox" && task.listId !== "upcoming";
        const objectToDispatch = 
        {
            itemId: task.itemId,
            listId: task.listId,
            date: date,
        }
        dynamic 
            ? dispatch(dynamicListsActions.changeTaskDate(objectToDispatch))
            : dispatch(inboxActions.changeTaskDate(objectToDispatch))
        
        onSetDateValue(date);
        onSetTaskDateIsDefined(date);
    }

    const destructureDate = (date) =>
    {
        let dateObject;        
        (date === "undefined")
            ? dateObject = "undefined"
            : dateObject = 
            {
                year: date.year,
                month: date.month,
                day: date.day,
                hour: date.hour,
                minute: date.minute,
            }
        return dateObject;
    }

    const convertDateToTimeAdverbs = (dateValue, setDueDateMissed, setTimeAdverb) =>
    {
        if(dateValue === "undefined") 
        {
            setTimeAdverb("undefined")
            return;
        }
        const dateValueRestructured = restructureDate(dateValue);
        const currentDate = DateTime.now();
        if(currentDate > dateValueRestructured){ setDueDateMissed(true)}
        const diff = dateValueRestructured.diff(currentDate, 'hours')
        const diffInHours = diff.values.hours
        let relativeDate
        if(diffInHours > 0 && diffInHours < 24)
        {
            relativeDate = "Tomorrow"
            setDueDateMissed(false);
        }
        if(diffInHours < 0  && diffInHours > -24)
        {
            relativeDate = "Today"
            setDueDateMissed(false);
        }
        if(diffInHours > -48 && diffInHours < -24)
        {
            relativeDate = "Yesterday"
            setDueDateMissed(true);
        }
        if(diffInHours < 168 && diffInHours > 24)
        {
            relativeDate = "Next "+ dateValueRestructured.toFormat('EEEE')
            setDueDateMissed(false);
        }
        if(diffInHours < -48 && diffInHours > -168)
        {
            relativeDate = "Last "+ dateValueRestructured.toFormat('EEEE')
            setDueDateMissed(true);
        }
        if(diffInHours < -168)
        {
            relativeDate = dateValueRestructured.toFormat('EEE, MMM d')
            setDueDateMissed(true);
        }
        setTimeAdverb(relativeDate);
    }

    return { convertDateToTimeAdverbs, asignDateToTask, destructureDate }
}