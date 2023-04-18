import React, { useEffect, useRef, useState } from 'react'
import { usePendingTaskChangeName } from '../../../hooks/usePendingTaskChangeName';
import classes from './TaskItemInput.module.css';

const TaskItemInput = (props)  => {
    const {
        task, 
        index,
        lastIndex,
        onSetEditTextActive,
        onSetGarbageIconVisible, 
        onSetCalendarComponentVisible, 
        onSetLastIndex,
        onMouseOverBool,
        onFocusBool
    } = props; 

    const [enteredInput, setEnteredInput] = useState(task.name);
    const inputRef = useRef();
    const {changeTaskNameHandler} = usePendingTaskChangeName();

    useEffect(() => 
    {
        inputRef.current.focus()
    }, [])
    
    useEffect(() => 
    {
        if(index === lastIndex - 1 || index === 0)
        {
            inputRef.current.focus();
        }
    }, [lastIndex, index ])

    const inputChangeHandler = (myEvent) => { setEnteredInput(myEvent.target.value); }

    const eventCatcher = (myEvent) =>
    {
        changeTaskNameHandler(task, index, enteredInput, onSetEditTextActive, onSetGarbageIconVisible,
             onSetCalendarComponentVisible, onSetLastIndex, myEvent)
    }

    return (
        <input 
            className={ onMouseOverBool||onFocusBool ? classes.inputHover : classes.input}
            onFocus={() => {onSetEditTextActive(true)}}
            value={enteredInput}
            onChange={inputChangeHandler}
            onKeyDown={eventCatcher}
            onBlur={() => {
                eventCatcher('onBlur')
                onSetEditTextActive(false)
            }}
            ref={inputRef}
        />
    )
}

export default TaskItemInput