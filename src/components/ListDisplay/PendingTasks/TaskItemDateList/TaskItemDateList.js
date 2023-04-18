//taskItemDateList
import React from 'react'
import classes from './TaskItemDateList.module.css';
import { DateTime } from 'luxon';
import DateListItem from './DateListItem';

const TaskItemDateList = (props) => {
    const {task, onSetDateValue, onSetTaskDateIsDefined} = props
    const today = DateTime.now()
    const tomorrow = DateTime.now().plus({days:1})
    const proto_nextWeek = new Date();
    let value = 7 - proto_nextWeek.getDay() + 1;
    //border case: sunday getDay() = 0, this voids the operation above
    const nextWeek = DateTime.now().plus({days:(value > 7 ? value = 1: value = value)});

    return (
        <div className={classes.mainWrapper}>
            <div className={classes.list}>
                <DateListItem
                    task={task}
                    name={"Today"}
                    date={today}
                    toFormat={true}
                    onSetDateValue={onSetDateValue}
				    onSetTaskDateIsDefined={onSetTaskDateIsDefined}
                />
                <DateListItem
                    task={task}
                    name={"Tomorrow"}
                    date={tomorrow}
                    toFormat={true}
                    onSetDateValue={onSetDateValue}
				    onSetTaskDateIsDefined={onSetTaskDateIsDefined}
                />
                <DateListItem
                    task={task}
                    name={"Next Week"}
                    date={nextWeek}
                    toFormat={true}
                    onSetDateValue={onSetDateValue}
				    onSetTaskDateIsDefined={onSetTaskDateIsDefined}
                />
                <DateListItem
                    task={task}
                    name={"No due date"}
                    date={"undefined"}
                    toFormat={false}
                    onSetDateValue={onSetDateValue}
				    onSetTaskDateIsDefined={onSetTaskDateIsDefined}
                />
            </div>
        </div>
    )
}

export default TaskItemDateList