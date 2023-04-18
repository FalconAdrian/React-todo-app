import {dynamicListsActions} from './dynamicLists-slice';
import { db } from '../firebase'; 
import { getDocs, collection, where, query, doc, updateDoc} from '@firebase/firestore';

export const fetchFirestoreDynamicListsData = (uid) =>
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

        const matrixification = (object) => {
            const matrix = [];
            if(object === undefined) return matrix;
            for(const key in object)
            {
                const listObject = 
                {
                    listId: object[key].listId,
                    name: object[key].name,
                    amountCompleted: object[key].amountCompleted,
                    pending: arrayfication(object[key].pending),
                    completed: arrayfication(object[key].completed)
                }
                matrix.push(listObject);
            }
            return matrix;
        }
        
        const data = await fetchData();
        const dynamicData = data[0].store.dynamicLists;

        

        dispatch(dynamicListsActions.replaceDynamicLists({
            lists: matrixification(dynamicData.lists) ,
        }));
    }
}

export const sendFirestoreDynamicListsData = (dynamicData, collectionId) =>{
    return async (dispatch) => {
        const sendData = async () =>
        {
            const userDocRef = doc(db, "users", collectionId);
            try
            {
                await updateDoc( userDocRef, {
                    "store.dynamicLists.lists": dynamicData.lists, 
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