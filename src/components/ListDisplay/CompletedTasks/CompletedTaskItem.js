import React, { useEffect, useRef, useState } from 'react'
import classes from './CompletedTaskItem.module.css';
import { ReactComponent as Tick } from '../../../assets/icons/tick.svg';
import {ReactComponent as Garbage} from '../../../assets/icons/garbage.svg';
import useEventfulCompletedTasksOperations from '../../../hooks/useEventfulCompletedTasksOperations';
import useUneventfulCompletedTasksOperations from '../../../hooks/useUnEventfulCompletedTasksOperations';


const CompletedTaskItem = (props) => {
  //props
  const {
    completedTask, 
    index, 
    lastIndex,
  } = props;
  //constants from props
  const dynamic = completedTask.listId !== 'inbox' && completedTask.listId !== 'upcoming';
  const objectToDispatch = { itemId:completedTask.itemId, listId:completedTask.listId }
  //hooks
  const inputRef = useRef();
  const[enteredInput, setEnteredInput] = useState(completedTask.name);
  const {changeTaskNameHandler, inputChangeHandler,} = useEventfulCompletedTasksOperations();
  const {deleteCompletedTaskHandler, reAddCompletedTaskHandler} = useUneventfulCompletedTasksOperations()

  //este focus es para que cuando se crea un nuevo TaskItem el foco este 
  //puesto automaticamente en el input para que ya se pueda empezar a llenarlo.
  useEffect(() => {
    inputRef.current.focus()
  }, [])
  
  //este focus es para cuando se elimina un TaskItem, el focus va al elemento 
  //anterior que el que fue eliminado basado en el lastItem
  useEffect(() => {
    if(index === lastIndex - 1 || index === 0)
    {
      inputRef.current.focus();
    }
  }, [lastIndex, index])

  const onSetEnteredInput = (value) => { setEnteredInput(value)}

  const onChangeTaskNameHandler = (myEvent ) => { changeTaskNameHandler(myEvent, props, enteredInput)}

  const onInputChangeHandler = (myEvent) =>{ inputChangeHandler(myEvent, onSetEnteredInput)}

 
  return (
    <div className={classes.wrapper}>
      <Tick 
        className={classes.tick}
        onClick={()=>{ reAddCompletedTaskHandler (dynamic, objectToDispatch)}}
      />
      <input 
          className={classes.input}
          value={enteredInput}
          onChange={onInputChangeHandler}
          onKeyDown={onChangeTaskNameHandler}
          onBlur={() => {
            onChangeTaskNameHandler('onBlur')
          }}
          ref={inputRef}
        />
      <Garbage 
        className={classes.garbage}
        onClick={()=>{ deleteCompletedTaskHandler (dynamic, objectToDispatch)}}
      />
    </div>
  )
}

export default CompletedTaskItem