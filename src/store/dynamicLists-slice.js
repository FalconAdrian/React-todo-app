import { createSlice } from "@reduxjs/toolkit";

//we need to use the current function to see the actual state (in the cmd), 
//and not the mutable proxy that doesnt have any data

const initialDynamicListsState = 
{
    lists:[],
    changed: false,
}

const dynamicListsSlice = createSlice({
    name:'dynamicLists',
    initialState: initialDynamicListsState,
    reducers:{
        addList(state, action)
        {
            state.changed = true;
            state.lists.push({
                listId: action.payload.id,
                name: action.payload.name,
                pending: action.payload.pending,
                completed: action.payload.completed,
                amountCompleted: 0
            });
        },
        addTaskToList(state, action)
        {
            state.changed = true;
            const listIndex = state.lists.findIndex( list => list.listId === action.payload.listId);
            state.lists[listIndex].pending.push(action.payload);
        },
        addTaskToIndex(state,action)
        {
            state.changed = true;
            const listIndex = state.lists.findIndex( list => list.listId === action.payload.listId);
            const taskIndex = state.lists[listIndex].pending.findIndex(task => task.itemId === action.payload.prev_itemId)
            state.lists[listIndex].pending.splice(taskIndex+1, 0, {
                listId: action.payload.listId,
                itemId: action.payload.itemId,
                name: action.payload.name,
                date: action.payload.date,
            })
        },
        deleteTaskFromList(state,action)
        {              
            state.changed = true;
            const listIndex =  state.lists.findIndex(list => list.listId === action.payload.listId);
            const taskIndex = state.lists[listIndex].pending.findIndex(task => task.itemId === action.payload.itemId);
            state.lists[listIndex].pending.splice(taskIndex, 1);
        },
        completeTask(state, action)
        {
            state.changed = true;
            const listIndex =  state.lists.findIndex(list => list.listId === action.payload.listId);
            const taskIndex = state.lists[listIndex].pending.findIndex(task => task.itemId === action.payload.itemId);
            state.lists[listIndex].completed.push(state.lists[listIndex].pending[taskIndex]); 
            state.lists[listIndex].pending.splice(taskIndex, 1);
            state.lists[listIndex].amountCompleted++
        },
        reAddTaskFromCompleted(state,action)
        {
            state.changed = true;
            const listIndex =  state.lists.findIndex(list => list.listId === action.payload.listId);
            const taskIndex = state.lists[listIndex].completed.findIndex(task => task.itemId === action.payload.itemId)
            state.lists[listIndex].pending.push(state.lists[listIndex].completed[taskIndex])
            state.lists[listIndex].completed.splice(taskIndex, 1)
            state.lists[listIndex].amountCompleted--
        },
        deleteCompletedTask(state, action)
        {
            state.changed = true;
            const listIndex =  state.lists.findIndex(list => list.listId === action.payload.listId);
            const completedTaskIndex =  state.lists[listIndex].completed.findIndex(task => task.itemId === action.payload.itemId);
            state.lists[listIndex].completed.splice(completedTaskIndex, 1);
            state.lists[listIndex].amountCompleted--
        },
        changeTaskName(state, action)
        {
            state.changed = true;
            const listIndex =  state.lists.findIndex(list => list.listId === action.payload.listId);
            const taskIndex = state.lists[listIndex].pending.findIndex(task => task.itemId === action.payload.itemId);
            state.lists[listIndex].pending[taskIndex].name = action.payload.name
        },
        changeTaskDate(state, action)
        {
            state.changed = true;
            const listIndex =  state.lists.findIndex(list => list.listId === action.payload.listId);
            const taskIndex = state.lists[listIndex].pending.findIndex(task => task.itemId === action.payload.itemId);
            state.lists[listIndex].pending[taskIndex].date = action.payload.date
        },
        changeCompletedTaskName(state, action)
        {
            state.changed = true;
            const listIndex =  state.lists.findIndex(list => list.listId === action.payload.listId);
            const taskIndex = state.lists[listIndex].completed.findIndex(task => task.itemId === action.payload.itemId);
            state.lists[listIndex].completed[taskIndex].name = action.payload.name
        },
        replaceDynamicLists(state, action)
        {   
            state.lists = action.payload.lists 
        },
        deleteDynamicList(state,action)
        {
            state.changed = true;
            const listIndex = state.lists.findIndex( list => list.listId === action.payload.listId);
            state.lists.splice(listIndex);
        },
        resetState(state,action)
        {
            state.lists = []
            state.changed = false;
        }
    }

})

export default dynamicListsSlice.reducer;
export const dynamicListsActions = dynamicListsSlice.actions;
