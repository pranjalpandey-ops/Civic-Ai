import React, {
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';

import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from 'firebase/auth';

import {
  doc,
  getDoc,
  setDoc,
  serverTimestamp,
} from 'firebase/firestore';

import { auth, db } from '../firebase/config';


const AuthContext = createContext(null);


export function AuthProvider({ children }) {

  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);


  // ============================================================
  // FIREBASE AUTH STATE
  // ============================================================

  useEffect(() => {

    const unsubscribe = onAuthStateChanged(
      auth,
      async (firebaseUser) => {

        try {

          if (!firebaseUser) {

            setUser(null);
            setToken(null);
            setLoading(false);

            return;
          }


          const userRef = doc(
            db,
            'users',
            firebaseUser.uid
          );

          const userSnap = await getDoc(
            userRef
          );


          let userData;


          if (userSnap.exists()) {

            const firestoreData =
              userSnap.data();

            userData = {

              id: firebaseUser.uid,

              uid: firebaseUser.uid,

              ...firestoreData,

              email:
                firestoreData.email ||
                firebaseUser.email ||
                '',

              name:
                firestoreData.name ||
                firebaseUser.displayName ||
                'User',

              role:
                String(
                  firestoreData.role ||
                  'CITIZEN'
                ).toUpperCase(),

            };

          } else {

            /*
             * Firebase account exists but there is
             * no Firestore profile.
             *
             * Treat it as Citizen.
             */

            userData = {

              id: firebaseUser.uid,

              uid: firebaseUser.uid,

              name:
                firebaseUser.displayName ||
                'Citizen',

              email:
                firebaseUser.email ||
                '',

              phone: '',

              address: '',

              wardId: '',

              avatar: '',

              role: 'CITIZEN',

            };

          }


          const firebaseToken =
            await firebaseUser.getIdToken();


          setUser(userData);
          setToken(firebaseToken);


        } catch (error) {

          console.error(
            'Failed to load Firebase user:',
            error
          );

          setUser(null);
          setToken(null);

        } finally {

          setLoading(false);

        }

      }
    );


    return () => unsubscribe();

  }, []);


  // ============================================================
  // LOGIN
  // ============================================================

  const login = async (
    email,
    password
  ) => {

    setLoading(true);


    try {

      const credential =
        await signInWithEmailAndPassword(
          auth,
          email.trim(),
          password
        );


      const firebaseUser =
        credential.user;


      const userRef = doc(
        db,
        'users',
        firebaseUser.uid
      );


      const userSnap =
        await getDoc(userRef);


      let userData;


      /*
       * If Firestore profile exists,
       * use its role.
       */

      if (userSnap.exists()) {

        const firestoreData =
          userSnap.data();


        userData = {

          id: firebaseUser.uid,

          uid: firebaseUser.uid,

          ...firestoreData,

          email:
            firestoreData.email ||
            firebaseUser.email ||
            '',

          name:
            firestoreData.name ||
            firebaseUser.displayName ||
            'User',

          role:
            String(
              firestoreData.role ||
              'CITIZEN'
            ).toUpperCase(),

        };

      } else {

        /*
         * Don't block Firebase login just because
         * the Firestore profile is missing.
         *
         * Create it as Citizen.
         */

        const citizenProfile = {

          name:
            firebaseUser.displayName ||
            'Citizen',

          email:
            firebaseUser.email ||
            email,

          role: 'CITIZEN',

          phone: '',

          address: '',

          wardId: '',

          avatar: '',

          createdAt:
            serverTimestamp(),

        };


        await setDoc(
          userRef,
          citizenProfile
        );


        userData = {

          id: firebaseUser.uid,

          uid: firebaseUser.uid,

          ...citizenProfile,

          email:
            firebaseUser.email ||
            email,

          role: 'CITIZEN',

        };

      }


      const firebaseToken =
        await firebaseUser.getIdToken();


      setUser(userData);

      setToken(firebaseToken);


      return userData;


    } catch (error) {

      console.error(
        'Firebase login error:',
        error
      );


      let message =
        'Login failed.';


      switch (error.code) {

        case 'auth/invalid-credential':

          message =
            'Invalid email or password.';

          break;


        case 'auth/user-not-found':

          message =
            'No account found with this email.';

          break;


        case 'auth/wrong-password':

          message =
            'Incorrect password.';

          break;


        case 'auth/invalid-email':

          message =
            'Please enter a valid email address.';

          break;


        case 'auth/too-many-requests':

          message =
            'Too many login attempts. Please try again later.';

          break;


        case 'auth/network-request-failed':

          message =
            'Network error. Check your internet connection.';

          break;


        default:

          message =
            error.message ||
            message;

      }


      throw new Error(message);


    } finally {

      setLoading(false);

    }

  };


  // ============================================================
  // REGISTER
  // ============================================================

  const register = async (userData) => {

    setLoading(true);


    try {

      const {
        name,
        email,
        password,
        phone = '',
        address = '',
        wardId = '',
        avatar = '',
      } = userData;


      /*
       * PUBLIC SIGNUP CAN ONLY CREATE CITIZEN.
       */

      const role = 'CITIZEN';


      const credential =
        await createUserWithEmailAndPassword(
          auth,
          email.trim(),
          password
        );


      const firebaseUser =
        credential.user;


      if (name?.trim()) {

        await updateProfile(
          firebaseUser,
          {
            displayName:
              name.trim(),
          }
        );

      }


      const profile = {

        uid: firebaseUser.uid,

        name:
          name?.trim() ||
          'Citizen',

        email:
          firebaseUser.email ||
          email,

        phone,

        address,

        wardId,

        avatar,

        role,

        createdAt:
          serverTimestamp(),

      };


      await setDoc(
        doc(
          db,
          'users',
          firebaseUser.uid
        ),
        profile
      );


      const newUser = {

        id: firebaseUser.uid,

        uid: firebaseUser.uid,

        ...profile,

        email:
          firebaseUser.email ||
          email,

      };


      const firebaseToken =
        await firebaseUser.getIdToken();


      setUser(newUser);

      setToken(firebaseToken);


      return newUser;


    } catch (error) {

      console.error(
        'Firebase registration error:',
        error
      );


      let message =
        'Registration failed.';


      switch (error.code) {

        case 'auth/email-already-in-use':

          message =
            'An account already exists with this email.';

          break;


        case 'auth/weak-password':

          message =
            'Password should be at least 6 characters.';

          break;


        case 'auth/invalid-email':

          message =
            'Please enter a valid email address.';

          break;


        case 'auth/network-request-failed':

          message =
            'Network error. Check your internet connection.';

          break;


        default:

          message =
            error.message ||
            message;

      }


      throw new Error(message);


    } finally {

      setLoading(false);

    }

  };


  // ============================================================
  // LOGOUT
  // ============================================================

  const logout = async () => {

    try {

      await signOut(auth);

      setUser(null);

      setToken(null);

    } catch (error) {

      console.error(
        'Logout error:',
        error
      );

      throw error;

    }
  };


  // ============================================================
  // CONTEXT
  // ============================================================

  return (

    <AuthContext.Provider
      value={{

        user,

        token,

        loading,

        login,

        register,

        logout,

        isCitizen:
          user?.role === 'CITIZEN',

        isAuthority:
          user?.role === 'AUTHORITY',

        isAdmin:
          user?.role === 'ADMIN',

      }}
    >

      {children}

    </AuthContext.Provider>

  );

}


export function useAuth() {

  return useContext(
    AuthContext
  );

}


export default AuthContext;