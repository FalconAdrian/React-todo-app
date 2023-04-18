import React from 'react'
import ListDisplay from '../components/ListDisplay/ListDisplay'
import classes from './Inbox.module.css';
import { useSelector } from 'react-redux';

const InboxPage = () => {

  const inboxList = useSelector(state=> state.inbox)

  return (
    <div className={classes.inbox}>
        <ListDisplay 
          list={inboxList}
          dynamic={false}
        />
    </div>
  )
}

export default InboxPage