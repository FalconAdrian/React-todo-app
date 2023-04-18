import React, { useEffect, useRef } from 'react'
import { useDispatch } from 'react-redux';
import { Outlet, useNavigate } from 'react-router-dom'
import { onAuthStateChanged, signOut,  } from "firebase/auth";
import { auth } from '../firebase';
import { authActions } from '../store/auth-slice';
import { inboxActions } from '../store/inbox-slice';
import { dynamicListsActions } from '../store/dynamicLists-slice';

const RootLayout = () => {

  const navigate = useRef(useNavigate());
  const dispatch = useDispatch();

  useEffect(()=>{
    onAuthStateChanged(auth, (user) => {});
    console.log("inside onAuthStateChanged")
    const timer = setTimeout(async ()=>{
      console.log("login out")
      try 
      {
        await signOut(auth)
        .then(()=>{
          dispatch(authActions.resetState())
          dispatch(inboxActions.resetState())
          dispatch(dynamicListsActions.resetState())
          localStorage.removeItem('user');
        })
        .then(navigate.current('/'))
      } 
      catch (err) 
      {
        console.log("error login out")
        console.error(err);
      }
      //50 minutos 3000 segundos
    }, 3000000);
    return () => {
      clearTimeout(timer)}
  }, [navigate, dispatch])

  return (
    <>
        <Outlet/>
    </>

  )
}

export default RootLayout