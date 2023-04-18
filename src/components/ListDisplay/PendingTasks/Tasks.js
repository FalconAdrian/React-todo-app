//tasks
import { useState } from 'react';
import TaskItem from './TaskItem';
import classes from './Tasks.module.css';

const Tasks = (props) => {

  const list = props.list;
  const[lastIndex, setLastIndex] = useState(list.length);
  const onSetLastIndex = (value) => { setLastIndex(value) }

  const tasks = list.pending.map((task, index) => {
    
    return(
      <li 
        className={classes.li}
        key={task.itemId}>
          
            <TaskItem
                task={task}
                index={index}
                lastIndex={lastIndex}
                onSetLastIndex={onSetLastIndex}
            />    
      </li>
    )
  }) 
  
  return (
    <ul className={classes.list}>
      {tasks}
    </ul>
  )
}

export default Tasks