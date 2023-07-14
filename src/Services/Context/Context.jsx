import { createContext, useMemo, useState } from "react";
import { getAllContactData, getAllFavContact, getAllTrashData, getContactById, getCurrentUser } from "../Apis/FireStoreApi";

export const StateContext = createContext()

const StateContextProvider = ({children}) => {
  const [allContacts, setAllContacts] = useState([]);
  const [allTrash, setAllTrash] = useState([]);
  const [allFav, setAllFav] = useState([]);


    const [menuActive, setMenuActive] = useState(false)
    const [logoutActive, setLogoutActive] = useState(false)
    const [searchContact, setSearchContact] = useState('')

    const userEmail= localStorage.getItem('userEmail')

    const [currentUser, setCurrentUser] = useState({})

    useMemo(() => {
    getAllContactData(setAllContacts, userEmail);
    getAllTrashData(setAllTrash, userEmail);
    getAllFavContact(setAllFav, userEmail)


        getCurrentUser(setCurrentUser, userEmail)
    }, [])

    const data = {menuActive, setMenuActive,searchContact, setSearchContact,logoutActive, setLogoutActive,allContacts,allTrash,allFav, setAllFav,currentUser,userEmail}

    return (
        <StateContext.Provider value={data}>

            {children}

        </StateContext.Provider>
    )

}

export default StateContextProvider