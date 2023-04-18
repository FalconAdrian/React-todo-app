import React from 'react'
import classes from './InputLabel.module.css'

const InputLabel = (props) => {
    
    const {string, value, onSet} = props;

    return (
            <input 
                className={classes.input}
                id={string} 
                type={string}
                name={string}
                placeholder={string}
                value={value}
                onChange={(ev)=>{onSet(ev.target.value)}}
                required 
            />
    )
}

export default InputLabel