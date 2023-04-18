import React, { useEffect, useState } from 'react'
import TaskItemDateList from './TaskItemDateList/TaskItemDateList';
import { ReactComponent as Calendar } from '../../../assets/icons/calendar.svg';
import classes from './TaskCalendar.module.css';
import { useDateConverter } from '../../../hooks/useDateConverter';

const TaskCalendar = (props) => {
  
  const 
  {
    task, 
    dateListComponentOpen, 
    onSetDateListComponentOpen,
    onToggleDateListComponentOpen,
    taskDateIsDefined, 
    onSetTaskDateIsDefined,
    onMouseOverBool,
    onFocusBool,
  } = props

  const [dueDateMissed, setDueDateMissed] = useState(false);
  const [timeAdverb, setTimeAdverb] = useState('undefined');
  const [dateValue, setDateValue] = useState(task.date)
  const {convertDateToTimeAdverbs} = useDateConverter();

  const onSetDueDateMissed = (value) => { setDueDateMissed(value) }
  const onSetTimeAdverb = (value) =>{ setTimeAdverb(value) } 
  const onSetDateValue = (value) =>{ setDateValue(value) } 


  useEffect(() => {
    convertDateToTimeAdverbs(dateValue, onSetDueDateMissed, onSetTimeAdverb)
  }, [dateValue, convertDateToTimeAdverbs])

  return (
    <button
      className={ onMouseOverBool||onFocusBool ? classes.buttonHover : classes.button}
      onClick={onToggleDateListComponentOpen}
      onBlur={()=>{
        onSetDateListComponentOpen(false)
      }}
    >
      <div 
        className={classes.calendarWrapper}
      >
        <div className={classes.calendarData}>
          {!taskDateIsDefined && <Calendar className={classes.calendar}/>}
          {taskDateIsDefined && 
            <span className={ dueDateMissed ? classes.missedDate : classes.date}> 
              {timeAdverb} 
            </span>
          }
        </div>
        <div className={classes.dateList} >
          {dateListComponentOpen && 
          <TaskItemDateList
            task={task}
            onSetDateValue={onSetDateValue}
            onSetTaskDateIsDefined={onSetTaskDateIsDefined}
          />} 
        </div>
      </div>
    </button>
  )
}
  
export default TaskCalendar