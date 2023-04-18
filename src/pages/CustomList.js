import React from 'react'
import { useLocation } from 'react-router-dom'
import ListDisplay from '../components/ListDisplay/ListDisplay';
import classes from './CustomList.module.css';
import { useSelector } from 'react-redux';

const CustomListPage = () => {
  //for retrieving the dynamic path text
  //const params = useParams();
  
  //for getting the data passed through the link
  const location = useLocation();
  const listId = location.state; 
  //we need it to call useSelector in a component that would rerender naturally, 
  //not like DynamicLists that is more of a LinkComponent, or similar...
  const lists = useSelector(state=> state.dynamicLists.lists)
  const listIndex = lists.findIndex(list => list.listId === listId)
  const list = lists[listIndex]
  let listUndefined = list === undefined;

    return (
      <div className={classes.detail}>
        { listUndefined && <p>Cargando...</p>}
        { !listUndefined &&
          <ListDisplay 
          dynamic={true}
          list={list}
          />
        }
      </div>
  )
}

export default CustomListPage