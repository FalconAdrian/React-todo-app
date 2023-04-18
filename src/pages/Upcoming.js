import React, {} from 'react'
import ListDisplay from '../components/ListDisplay/ListDisplay'
import classes from './Upcoming.module.css';
import { useSelector } from 'react-redux';
import useDateFunctions from '../hooks/useDateFunctions';

const UpcomingPage = () => {

  const {compareDates} = useDateFunctions();
  
  const upcomingPending_fromInbox = useSelector(state=> state.inbox.pending);
  const upcomingCompleted_fromInbox = useSelector(state=> state.inbox.completed);
  const dynamicLists = useSelector(state=> state.dynamicLists.lists);

  const proto_dynamicLists_Pending = dynamicLists.map(list => list.pending);
  const proto_dynamicLists_Completed = dynamicLists.map(list => list.completed);
  const dynamicLists_Pending = proto_dynamicLists_Pending.flat(1);
  const dynamicLists_Completed = proto_dynamicLists_Completed.flat(1);
  
  const pending = upcomingPending_fromInbox.concat(dynamicLists_Pending);
  const completed = upcomingCompleted_fromInbox.concat(dynamicLists_Completed);

  const upcomingPending = pending.filter(task => compareDates(task.date) )
  upcomingPending.sort(function (a,b){
    if(a.date > b.date) return 1;
    if(a.date < b.date) return -1;
    return 0;
  });
  
  const upcomingCompleted = completed.filter(task => compareDates(task.date) )
  upcomingCompleted.sort(function (a,b){
    if(a.date > b.date) return 1;
    if(a.date < b.date) return -1;
    return 0;
  });
  
  const list = 
  {
    listId: 'upcoming',
    name: 'Upcoming',
    pending: upcomingPending,
    completed: upcomingCompleted,
    amountCompleted: upcomingCompleted.length,
  }

  return (
    <div className={classes.upcoming}>
        {<ListDisplay 
          list={list}
          dynamic={false}
        />}
    </div>
  )
}

export default UpcomingPage