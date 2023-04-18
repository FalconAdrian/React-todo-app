import { createSlice } from "@reduxjs/toolkit";

const initialInboxState = 
{
    listId: "inbox",
    name:"Inbox",
    pending:[],
    completed:[],
    amountCompleted:0,
    changed: false,
}

const inboxSlice = createSlice({
    name:'inbox',
    initialState: initialInboxState,
    reducers: {
        addTask(state,action)
        {
            state.changed = true;
            state.pending.push({
                listId: action.payload.listId,
                itemId: action.payload.itemId,
                name: action.payload.name,
                date: action.payload.date,
            })
        },
        addTaskToIndex(state,action)
        {
            state.changed = true;
            const taskIndex = state.pending.findIndex(task => task.itemId === action.payload.prev_itemId)
            state.pending.splice(taskIndex+1, 0, {
                listId: action.payload.listId,
                itemId: action.payload.itemId,
                name: action.payload.name,
                date: action.payload.date,
            })
        },
        changeTaskName(state,action)
        {
            state.changed = true;
            const taskIndex = state.pending.findIndex(task => task.itemId === action.payload.itemId)
            state.pending[taskIndex].name = action.payload.name
        },
        changeTaskDate(state,action)
        {
            state.changed = true;
            const taskIndex = state.pending.findIndex(task => task.itemId === action.payload.itemId)
            state.pending[taskIndex].date = action.payload.date
        },
        changeCompletedTaskName(state,action)
        {
            state.changed = true;
            const taskIndex = state.completed.findIndex(task => task.itemId === action.payload.itemId)
            state.completed[taskIndex].name = action.payload.name
        },
        completeTask(state,action)
        {
            state.changed = true;
            const taskIndex = state.pending.findIndex(task => task.itemId === action.payload.itemId)
            state.completed.push(state.pending[taskIndex])
            state.pending.splice(taskIndex, 1)
            state.amountCompleted++
        },
        reAddTaskFromCompleted(state,action)
        {
            state.changed = true;
            const taskIndex = state.completed.findIndex(task => task.itemId === action.payload.itemId)
            state.pending.push(state.completed[taskIndex])
            state.completed.splice(taskIndex, 1)
            state.amountCompleted--
        },
        deleteTask(state,action)
        {
            state.changed = true;
            const taskIndex = state.pending.findIndex(task => task.itemId === action.payload.itemId)
            state.pending.splice(taskIndex, 1)
        },
        deleteCompletedTask(state,action)
        {
            state.changed = true;
            const taskIndex = state.completed.findIndex(task => task.itemId === action.payload.itemId)
            state.completed.splice(taskIndex, 1)
            state.amountCompleted--
        },
        replaceInboxLists(state,action)
        {
            state.pending = action.payload.pending;
            state.completed = action.payload.completed;
            state.amountCompleted = action.payload.amountCompleted;
        },
        resetState(state, action)
        {
            state.pending = []
            state.completed = []
            state.amountCompleted = 0
            state.changed = false;
        }
    }
})

export default inboxSlice.reducer;
export const inboxActions = inboxSlice.actions;