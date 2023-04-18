import React, {} from 'react'
import { Outlet } from 'react-router-dom'
import SideBar from '../components/SideBar/SideBar'
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { sendFirestoreInboxData } from '../store/inbox-actions';
import { sendFirestoreDynamicListsData } from '../store/dynamicLists-actions';
import { auth } from '../firebase';
import { useState } from 'react';
import { MoonLoader } from 'react-spinners';
import classes from './ListRoot.module.css';
import useOnDispatchData from '../hooks/useOnDispatchData';

let isInitial = true;

const ListRootLayout = () => {
  const dispatch = useDispatch();
  const inbox = useSelector((state) => state.inbox);
  const authSlice = useSelector((state) => state.auth);
  const dynamicLists = useSelector((state) => state.dynamicLists);
  const {dispatchCurrentUser, dispatchLastNotified} = useOnDispatchData();

  //check if we have no currentUser yet or we are loading/reloading the page
  //in any of those cases isLoading is true. We use it to display a loading component
  let [isLoading, setIsLoading] = useState(auth.currentUser === null || isInitial);
  
  //checks if there is a currentUser, if there is it dispatches the actions to fill the lists and exits w/return
  //if there is no currentUser (only happens when page is reloaded) we wait 1500 ms and enter the setTimeout,
  //by then the auth.lastNotifiedUid should be loaded.
  useEffect(() => 
  {
    if(auth.currentUser)
    {
      dispatchCurrentUser()
      return;
    }
    const timer = setTimeout(()=>
    {
        dispatchLastNotified()
    }, 3000);
      return () =>{
        setIsLoading(false);
        clearTimeout(timer)
      } 
  }, [ dispatch, dispatchCurrentUser, dispatchLastNotified])
  
  //checks if there was any change and if there was dispatches the sendData actions, then
  //checks and changes isInitial, which can only be true the first time the page loads,
  //it immediatly set its value to false if it is not already.
  useEffect(() => {
    if(inbox.changed)
    { 
      dispatch(sendFirestoreInboxData(inbox, authSlice.collectionId)) 
    }
    if(dynamicLists.changed)
    { 
      dispatch(sendFirestoreDynamicListsData(dynamicLists, authSlice.collectionId)) 
    }
    if(!isInitial){ return }
    const timer = setTimeout(()=>
    {
      isInitial = false;
    }, 3000);
    return () =>{
      setIsLoading(false)      
      clearTimeout(timer)
    } 
  },[inbox,dynamicLists, authSlice.collectionId, dispatch])
  
  return (
    <>
      <SideBar
        isLoading={isLoading}
      /> 
      { isLoading &&
        <MoonLoader
            className={classes.loader}
            size={20}
            color="black"
        />
      } 
      {!isLoading &&
        <Outlet/>
      }
    </>

  )
}

export default ListRootLayout
