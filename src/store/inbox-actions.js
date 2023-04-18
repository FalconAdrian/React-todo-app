import { inboxActions } from "./inbox-slice";
import { db, auth } from '../firebase'; 
import { getDocs, collection, where, query, doc, updateDoc} from '@firebase/firestore';

export const fetchFirestoreInboxData = (uid) =>
{
    return async (dispatch) => {
        const fetchData = async () => 
        {
            const userCollectionRef = query(collection(db, "users"), where("userId", "==", uid));
            try
            {
                const data = await getDocs(userCollectionRef);
                const filteredData = data.docs.map((doc) => ({
                    ...doc.data(), // doc.data()this method returns the information inside the firestore db
                    id: doc.id,
                })) 
                return filteredData;
            }
            catch(err)
            {
                console.log("error fetch") 
                console.log(err)
            }
        }

        const arrayfication = (object) => {
            const array = [];
            if(object === undefined) return array;
            for(const key in object)
            {
                const taskObject = 
                {
                    itemId: object[key].itemId,
                    listId: object[key].listId,
                    name: object[key].name,
                    date: object[key].date 
                }
                array.push(taskObject);
            }
            return array
        } 
        
        const data = await fetchData();
        const inboxData = data[0].store.inbox;
        dispatch(inboxActions.replaceInboxLists({
            pending: arrayfication(inboxData.pending) ,
            completed: arrayfication(inboxData.completed),
            amountCompleted: inboxData.amountCompleted
        }));
    }
}
export const sendFirestoreInboxData = (inboxData, collectionId ) =>
{
    return async (dispatch) => {
        const sendData = async () =>
        {
            const userDocRef = doc(db, "users", collectionId);
           /* console.log("inside sendData inbox")
            console.log(collectionId)
            console.log(userDocRef) */
            try
            {
                await updateDoc( userDocRef, {
                    "store.inbox.amountCompleted": inboxData.amountCompleted, 
                    "store.inbox.completed": inboxData.completed,
                    "store.inbox.pending": inboxData.pending, 
                });                
            }
            catch(err)
            {
                console.log("error sending")
                console.log(err);
            }
        }

        sendData();

    }
}
