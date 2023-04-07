// Redux toolkit
import {
  createSlice,
  // Use the PayloadAction type to declare the contents of `action.payload`
  //PayloadAction
} from '@reduxjs/toolkit';

interface authState {
  status: string;
  currentUser: {
    uid: string | undefined;
    name: string | undefined;
    email: string | undefined;
    username: string | undefined;
    role: string | undefined;
    photoURL: string | undefined;
    coverPhotoURL: string | undefined;
  };
  errorMessage?: string | undefined;
}

const initialState: authState = {
  status: 'not-authenticated', // checking, authenticated, not-authenticated
  currentUser: {
    uid: undefined,
    name: undefined,
    email: undefined,
    username: undefined,
    role: undefined,
    photoURL: undefined,
    coverPhotoURL: undefined,
  },
  errorMessage: undefined,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    checkingCredentials: (state) => {
      state.status = 'checking';
      state.currentUser = {
        uid: undefined,
        name: undefined,
        email: undefined,
        username: undefined,
        role: undefined,
        photoURL: undefined,
        coverPhotoURL: undefined,
      };
      state.errorMessage = undefined;
    },

    onLogin: (state, { payload }) => {
      state.status = 'authenticated';
      state.currentUser.uid = payload.uid;
      state.currentUser.name = payload.name;
      state.currentUser.email = payload.email;
      state.currentUser.username = payload.username;
      state.currentUser.role = payload.role;
      state.currentUser.photoURL = payload.photoURL;
      state.currentUser.coverPhotoURL = payload.coverPhotoURL;
      state.errorMessage = undefined;
    },

    onLogout: (
      state
      // { payload }
    ) => {
      state.status = 'not-authenticated';
      state.currentUser = {
        uid: undefined,
        name: undefined,
        email: undefined,
        username: undefined,
        role: undefined,
        photoURL: undefined,
        coverPhotoURL: undefined,
      };
      // state.errorMessage = payload.errorMessage;
    },

    clearErrorMessage: (state) => {
      state.errorMessage = undefined;
    },
  },
});

export const { onLogin, onLogout, checkingCredentials, clearErrorMessage } =
  authSlice.actions;
