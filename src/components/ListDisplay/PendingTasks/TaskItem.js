import React, { useState } from 'react'
import { usePendingTaskOperations } from '../../../hooks/usePendingTaskOperations';
import { usePendingTaskEventHandler } from '../../../hooks/usePendingTaskEventHandler';
import TaskCalendar from './TaskCalendar';
import TaskItemInput from './TaskItemInput';
import { ReactComponent as Lines} from '../../../assets/icons/lines.svg';
import { ReactComponent as Box} from '../../../assets/icons/square.svg';
import { ReactComponent as Garbage} from '../../../assets/icons/garbage.svg';
import classes from './TaskItem.module.css';

//This component should be divided further or trimmed down
//I have not had the time to do it yet.

const TaskItem = (props) => {
  const {task , onSetLastIndex} = props
  
  const[garbageIconVisible, setGarbageIconVisible] = useState(false);
  const[calendarComponentVisible, setCalendarComponentVisible] = useState(false);
  const[dateListComponentOpen, setDateListComponentOpen] = useState(false);
  const[taskDateIsDefined, setTaskDateIsDefined ] = useState(task.date !== "undefined");  
  const[editTextActive, setEditTextActive] = useState(false);
  const[onMouseOverBool, setOnMouseOverBool] = useState(false);
  const[onFocusBool, setOnFocusBool] = useState(false);
  
  const {deleteTaskHandler, completeTaskHandler} = usePendingTaskOperations();
  const {onTaskEventHandler} = usePendingTaskEventHandler();
  
  const onSetGarbageIconVisible = (value) => { setGarbageIconVisible(value) }
  const onSetCalendarComponentVisible = (value) => { setCalendarComponentVisible(value) }
  const onSetDateListComponentOpen = (value) => { setDateListComponentOpen(value) }
  const onSetTaskDateIsDefined = (date) => { (date !== "undefined") ? setTaskDateIsDefined(true): setTaskDateIsDefined(false);
                                              setDateListComponentOpen({dateListComponentOpen: false});}
  const onToggleDateListComponentOpen = () => { setDateListComponentOpen(prevState => !prevState) }
  const onSetEditTextActive = (value) => {setEditTextActive(value)}
  const onSetOnMouseOverBool = (value) => {setOnMouseOverBool(value)}
  const onSetOnFocusBool = (value) => {setOnFocusBool(value)}

  const eventCatcher = (myEvent) =>
  {
	onTaskEventHandler( myEvent, editTextActive, dateListComponentOpen,
		taskDateIsDefined, onSetGarbageIconVisible, onSetEditTextActive, 
                onSetCalendarComponentVisible, onSetOnMouseOverBool, onSetOnFocusBool)
  }

  return (
    <div className={classes.wrapper}
         editactive={editTextActive.toString()}
         onMouseOver={eventCatcher }
         onMouseLeave={eventCatcher }
         onFocus={ eventCatcher }
         onBlur={eventCatcher }
    >
        <div className={classes.linesWrapper}>
            <Lines className={classes.lines} preserveAspectRatio={"none"}/>
        </div>
        <div className={classes.boxWrapper}>
            <Box className={classes.box}
                onClick={()=>{completeTaskHandler(task,)}}
            />
        </div >
        <div className={classes.space}></div>
            <TaskItemInput
	    	className={classes.input}
                task={task}
                index={props.index}
                lastIndex={props.lastIndex}
                onSetEditTextActive={onSetEditTextActive}
                onSetGarbageIconVisible={onSetGarbageIconVisible}
                onSetCalendarComponentVisible={onSetCalendarComponentVisible}
                onSetLastIndex={onSetLastIndex}
                onMouseOverBool={onMouseOverBool}
                onFocusBool={onFocusBool}
            />
        { (calendarComponentVisible || taskDateIsDefined) && 
            <TaskCalendar
                task={task}
                dateListComponentOpen={dateListComponentOpen}
                onSetDateListComponentOpen={onSetDateListComponentOpen}
                onToggleDateListComponentOpen={onToggleDateListComponentOpen} 
                taskDateIsDefined={taskDateIsDefined}
                onSetTaskDateIsDefined={onSetTaskDateIsDefined} 
                onMouseOverBool={onMouseOverBool}
                onFocusBool={onFocusBool}
            />
        }
        { (garbageIconVisible || dateListComponentOpen) && 
            <div className={classes.garbageWrapper}>
            	<Garbage className={classes.garbage}
                	onClick={()=>{deleteTaskHandler(task, onSetLastIndex, props.index)}}
        	/>
            </div> 
        }
    </div>
  )
}

export default TaskItem