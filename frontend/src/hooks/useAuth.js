import  {useState, useEffect, useContext,createContext} from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';

//TODO hide this
firebase.initializeApp({
  apiKey: "AIzaSyBOG8c1uSoiQ50qiKSJ3Amjk7koSn20Q6U",
  authDomain: "nft-tracker-ddee5.firebaseapp.com",
  projectId: "nft-tracker-ddee5",
  storageBucket: "nft-tracker-ddee5.appspot.com",
  messagingSenderId: "1004307404435",
  appId: "1:1004307404435:web:5e36955d6c7572bedddf66",
  measurementId: "G-RWE7TC5LZX"
});

const AuthContext = createContext();

// Hook for child components to get the auth object ...
// ... and re-render when it changes.
export const useAuth = () => {
  return useContext(AuthContext);
};

// Provider hook that creates auth object and handles state
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticating, setIsAuthenticating] = useState(true);

  // Wrap any Firebase methods we want to use making sure ...
  // ... to save the user to state.
  const sendSignInLinkToEmail = email => {
    return firebase
      .auth()
      .sendSignInLinkToEmail(email, {
        url: 'http://localhost:3000/confirm',
        handleCodeInApp: true,
      })
      .then(() => {
        console.log("slo je")
        return true;
      });
  };

  const signInWithEmailLink = (email, code) => {
    return firebase
      .auth()
      .signInWithEmailLink(email, code)
      .then(result => {
        setUser(result.user);
        return true;
      });
  };

  const logout = () => {
    return firebase
      .auth()
      .signOut()
      .then(() => {
        setUser(null);
      });
  };

  // Subscribe to user on mount
  // Because this sets state in the callback it will cause any ...
  // ... component that utilizes this hook to re-render with the ...
  // ... latest auth object.
  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged(user => {
      setUser(user);
      setIsAuthenticating(false);
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  const values = {
    user,
    isAuthenticating,
    sendSignInLinkToEmail,
    signInWithEmailLink,
    logout,
  };

  return (
    <AuthContext.Provider value={values}>
      {!isAuthenticating && children}
    </AuthContext.Provider>
  );
};