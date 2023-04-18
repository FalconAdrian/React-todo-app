import React, {} from 'react';
import Tasks from './PendingTasks/Tasks';
import Title from './Title';
import classes from './ListDisplay.module.css';
import AddTask from './AddTask';
import Completed from './CompletedTasks/Completed';

const ListDisplay = (props) => {

  const list = props.list
  const dynamic = props.dynamic

  return (
    <div className={classes.wrapper}>
        <div className={classes.content}>
            <Title 
              listId={list ? list.listId : undefined}
              title={list ? list.name : undefined}
              dynamic={dynamic}
            />
            <Tasks
              list={list}
            />
            <AddTask 
              listId={list.listId}
            />
            <Completed
              list={list}
            />        
        </div>
    </div>
    
  )
}

export default ListDisplay