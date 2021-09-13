import React, { useState, useEffect, useContext, createContext } from 'react';

import {
  getAuth,
  signInWithPopup,
  signOut,
  GithubAuthProvider,
  onAuthStateChanged
} from 'firebase/auth';
import { createUser } from 'library/db';

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

  const handleUser = (rawUser) => {
    if (rawUser) {
      const user = formatUser(rawUser);

      createUser(user.uid, user);
      setUser(user);
      return user;
    } else {
      setUser(false);
      return false;
    }
  };

  const appSigninWithGitHub = async () => {
    const response = await signInWithPopup(auth, provider);
    handleUser(response.user);
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

const formatUser = (user) => {
  return {
    uid: user.uid,
    email: user.email,
    name: user.displayName,
    provider: user.providerData[0].providerId,
    photoUrl: user.photoURL
  };
};
