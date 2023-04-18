//dateListItem
import React from 'react'
import {ReactComponent as Clock} from '../../../../assets/icons/clock.svg';
import {ReactComponent as Sunrise} from '../../../../assets/icons/sunrise.svg';
import {ReactComponent as Forward} from '../../../../assets/icons/forward.svg';
import {ReactComponent as Prohibited} from '../../../../assets/icons/prohibited.svg';
import classes from './DateListItem.module.css';
import { useDateConverter } from '../../../../hooks/useDateConverter';

const DateListItem = (props) => {

    const { task, name, date, toFormat, onSetDateValue, onSetTaskDateIsDefined } = props;
    const {asignDateToTask, destructureDate} = useDateConverter();
    return (
        <div className={classes.item}
            onClick={() => {asignDateToTask(destructureDate(date), task, onSetDateValue, onSetTaskDateIsDefined)}}
        >
            <div>
                { (name === "Today") && <Clock className={classes.clock} preserveAspectRatio="none"/> }
                { (name === "Tomorrow") && <Sunrise className={classes.sunrise} preserveAspectRatio="none"/> }
                { (name === "Next Week") && <Forward className={classes.forward} preserveAspectRatio="none"/> }
                { (name === "No due date") && <Prohibited className={classes.prohibited} preserveAspectRatio="none"/> }
                <span className={classes.text}>{name}</span>
            </div>
            {
                toFormat &&
                <span className={classes.dateInfo}>{date.toFormat('EEE, MMM d')}</span>
            }
        </div>
    )
}

export default DateListItem