import React, { createContext } from 'react'
import useFirebase from '../Hooks/useFirebase';


//create an auth context 
export const AuthContext = createContext();
const AuthProvider = ({ children }) => {
    const auth = useFirebase()
    return (
        <AuthContext.Provider value={auth}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider
