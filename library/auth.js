import React, { useState, useEffect, useContext, createContext } from 'react';
import firebase from './firebase';
import {
  getAuth,
  signInWithPopup,
  signOut,
  GithubAuthProvider,
  onAuthStateChanged
} from 'firebase/auth';

const auth = getAuth();
const provider = new GithubAuthProvider();

const authContext = createContext();

export function ProvideAuth({ children }) {
  const auth = useProvideAuth();
  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}

export const useAuth = () => {
  return useContext(authContext);
};

function useProvideAuth() {
  const [user, setUser] = useState(null);

  console.log(user);
  const appSigninWithGitHub = async () => {
    const response = await signInWithPopup(auth, provider);
    return response.user;
  };

  const appSignOut = async () => {
    await signOut(auth);
    setUser(false);
    return false;
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user ? user : false);
    });

    return () => unsubscribe();
  }, []);

  return {
    user,
    appSigninWithGitHub,
    appSignOut
  };
}
