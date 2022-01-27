import React, {useState, useEffect, useContext,createContext} from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';

//TODO hide this
firebase.initializeApp({
    apiKey: process.env.API_KEY,
    authDomain: process.env.AUTH_DOMAIN,
    projectId: process.env.PROJECT_ID,
    storageBucket: process.env.STORAGE_BUCKET,
    messagingSenderId: process.env.MESSAGING_SENDER_ID,
    appId: process.env.APP_ID,
    measurementId: process.env.MEASUREMENT_ID
});


//“useContext” hook is used to create common data that can be 
//accessed throughout the component hierarchy without passing the props down manually to each level
// it rerenders when it changes
const AuthContext = createContext()

export const useAuth = () =>{
    return useContext(AuthContext);
}

//Provider hook that creates auth object and handles state

export const AuthProvider = ({children}) => {
    const [user,SetUser] = useState(null);
    const [isAuthenticating, setIsAuthenticating] = useState(null);

    const  sendSignInLinkToEmail = email => {
        return firebase.auth().sendSignInLinkToEmail(email,{
            url:'http://localhost:3000/confirm',
            handleCodeInApp:true,
        }).then(()=>{
            return true;
        });
    };

    const signInWithEmailLink = (email,code) => {
        return firebase.auth
        .signInWithEmailLink(email,code)
        .then(result =>{
            SetUser(result.user);
            return true;
        })
    }

    const logout = () =>{
        return firebase
        .auth()
        .signOut()
        .then(() =>{
            SetUser(null);
        })
    }

    //On mount it wil subscribe to user
    useEffect(() =>{
        const unsubscribe = firebase.auth().onAuthStateChanged(user => {
            SetUser(user)
            setIsAuthenticating(false)
        })
//Cleanup subscription on mount
        return () => unsubscribe()
    },[])

    const values = {
        user,
        isAuthenticating,
        sendSignInLinkToEmail,
        signInWithEmailLink,
        logout
    }

    return (
        <AuthContext.Provider value={values}>
            {!isAuthenticating && children}
        </AuthContext.Provider>
    )
}