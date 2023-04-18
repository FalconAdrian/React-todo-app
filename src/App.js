import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { useSelector } from 'react-redux';
import CreateList from './components/SideBar/CreateList';
import AuthenticationPage from './pages/Authentication';
import CustomListPage from './pages/CustomList';
import HomePage from './pages/Home';
import InboxPage from './pages/Inbox';
import ListRootLayout from './pages/ListRoot';
import RootLayout from './pages/Root';
import UpcomingPage from './pages/Upcoming';
import classes from './App.module.css';
import './global.css';

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout/>,
    children:[
      {index: true, element:<HomePage/>},
      { path: 'auth',
        element: <AuthenticationPage/>},
      { path: 'lists',
        element: <ListRootLayout/>,
        children: 
        [
          { path: 'inbox',
            element: <InboxPage/>},
          { path: 'upcoming',
            element: <UpcomingPage/>},
          { //dynamic path segment
            path:':listId',
            element: <CustomListPage/>},
        ]
      },
    ]
  }
])

function App() {

  const showModal = useSelector((state) => state.ui.modalIsVisible);

  return (
    <div className={classes['main-div']}>
      <RouterProvider router={router}/>
      {showModal && <CreateList/>}
    </div>
  );
}

export default App;