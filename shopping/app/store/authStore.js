import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';
import { app } from '@/app/lib/firebaseClient'; // Adjust this import based on your Firebase setup

const EXPIRY_TIME = 60 * 60 * 1000; // 1 hour in milliseconds

const useAuthStore = create(
  persist(
    (set, get) => ({
      user: null,
      userData: {},
      expiry: null, // Store expiry timestamp
      userToken: '',

      // Set user data from Firebase auth
      setUserData: (user) => {
        if (user) {
          const expiry = Date.now() + EXPIRY_TIME; // Set expiry
          set({
            userData: {
              name: user.displayName || '',
              email: user.email,
              photoURL: user.photoURL || '',
              uid: user.uid,
            },
            user: true,
            expiry,
            userToken: user.accessToken,
          });
        }
      },

      // Clear user data (logout)
      clearUser: async () => {
        try {
          await signOut(getAuth(app));
          set({
            user: false, userData: {}, expiry: null, userToken: '',
          });
          // console.log('successfully logged out');
          return 'successfully logged out';
        } catch (error) {
          console.error('Error signing out:', error);
          return error;
        }
      },

      // Check if session expired
      checkExpiry: () => {
        const { expiry, clearUser } = get();
        if (expiry && Date.now() > expiry) {
          console.warn('Session expired, logging out...');
          clearUser(); // Auto logout
        }
      },
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => localStorage),
      onRehydrateStorage: () => (state) => {
        if (state) {
          state.checkExpiry(); // Validate expiry on reload
        }
      },
    },
  ),
);

// **🔥 Firebase Auth Listener (Call this in _app.js or layout.tsx)**
export function initAuthListener() {
  const auth = getAuth(app);
  onAuthStateChanged(auth, (user) => {
    if (user) {
      console.log(user)
      useAuthStore.getState().setUserData(user);
    } else {
      useAuthStore.getState().clearUser();
    }
  });
}

export default useAuthStore;
