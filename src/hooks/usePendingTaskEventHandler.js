export function usePendingTaskEventHandler () 
{
    const onTaskEventHandler = (myEvent, editTextActive, dateListComponentOpen, taskDateIsDefined, onSetGarbageIconVisible, onSetEditTextActive, onSetCalendarComponentVisible, onSetOnMouseOverBool, onSetOnFocusBool) => 
    {
        myEvent = myEvent._reactName

        if(myEvent === 'onMouseOver')
        {
            onSetGarbageIconVisible(true);
            onSetCalendarComponentVisible(true); 
            onSetOnMouseOverBool(true)
        }
        if(myEvent === 'onMouseLeave')
        {
            onMouseOutHandler(
                editTextActive, 
                dateListComponentOpen,
                taskDateIsDefined,
                onSetGarbageIconVisible, 
                onSetCalendarComponentVisible); 
            onSetOnMouseOverBool(false)
        }
        if(myEvent === 'onFocus')
        {
            onSetEditTextActive(true)
            onSetOnFocusBool(true)
        }
        if(myEvent === 'onBlur')
        {
            onSetEditTextActive(false)
            onSetOnFocusBool(false)
            onSetOnMouseOverBool(false)
        }
    }

    const onMouseOutHandler = (editTextActive, dateListComponentOpen, taskDateIsDefined, onSetGarbageIconVisible, onSetCalendarComponentVisible) =>
    {
        if(editTextActive)
        {
            onSetGarbageIconVisible(true); 
            onSetCalendarComponentVisible(true)
        } 
        else
        {
        if(dateListComponentOpen || taskDateIsDefined)
        {
            onSetGarbageIconVisible(false);
            onSetCalendarComponentVisible(true)
        }
        else
        {
            onSetGarbageIconVisible(false); 
            onSetCalendarComponentVisible(false) 
        }
        }
    }

    return{onTaskEventHandler}
}