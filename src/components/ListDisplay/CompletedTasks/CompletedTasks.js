import React, { useState } from 'react'
import CompletedTaskItem from './CompletedTaskItem';
import classes from './CompletedTasks.module.css';

const CompletedTasks = props => {

  const list = props.list;

  const[lastIndex, setLastIndex] = useState(list.length);

  const setLastIndex_Handler = (value) =>
  {
    setLastIndex(value)
  }

  let listOfCompletedTasks;
  listOfCompletedTasks = list.completed.map((completedTask, index) => {
    return(
      <li key={completedTask.itemId}>
        <CompletedTaskItem
          completedTask={completedTask}
          index={index}
          lastIndex={lastIndex}
          setLastIndex_Handler={setLastIndex_Handler}
        />
      </li>
    )
  })

  return (
    <div className={classes.tasks}>
        <ul>
            {listOfCompletedTasks}
        </ul>
    </div>
  )
}


export default CompletedTasks