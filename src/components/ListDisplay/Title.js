import React, { Fragment, useRef, useState } from 'react'
import { ReactComponent as AddUser } from '../../assets/icons/add-user.svg';
import { ReactComponent as VerticalDots} from '../../assets/icons/vertical-dots.svg';
import { auth } from '../../firebase';
import classes from './Title.module.css';
import TitleListDisplay from './TitleListDisplay';
import { ClickAlerter } from '../ClickAlerter';

const Title = (props) => {
  
  const {listId, title, dynamic} = props;
  
  const userName = auth?.currentUser?.displayName;
  const userPhoto = auth?.currentUser?.photoURL;

  const [showList, setShowList] = useState(false);
  const toggleButtonRef = useRef();

  const showListToggler = () => { setShowList((prev) => !prev)}
  const showListCloser = () => { setShowList(false);}

  return (
    <div>
      <h1 className={classes.wrapper}> 
        <div className={classes.text}>{title}</div>
        { dynamic &&
          <Fragment>
            <div className={classes.icons}>
            { userPhoto 
              ? <img src={userPhoto} className={classes.photo} alt=''/>
              : <div className={classes.circle}>
                  { userName ? userName[0] : " " }
                </div>       
            }
              <AddUser 
                className={classes.addUser}
                preserveAspectRatio="none" 
              />
            </div>
            <button 
              className={classes.button}
              onClick={showListToggler}
              ref={toggleButtonRef}
            >
              <VerticalDots
                className={classes['vertical-dots']}
                preserveAspectRatio="none" 
              />
            </button>
            {showList && 
              <ClickAlerter
                funct={showListCloser}
                except={toggleButtonRef}
                boolean={showList}
              >
                <TitleListDisplay listId={listId}/> 
              </ClickAlerter>
            }
        </Fragment>
      }
      </h1>
    </div>
  )
}

export default Title