import React from 'react'
import { useRef } from 'react';
import useClickDetecter from '../hooks/useClickDetecter';
import classes from './ClickAlerter.module.css';

export const ClickAlerter = (props) => {
    const wrapperRef = useRef(null);
    useClickDetecter(wrapperRef, props.funct, props.except, props.boolean);
  
    return <div ref={wrapperRef} className={classes.div}>{props.children}</div>;
  }