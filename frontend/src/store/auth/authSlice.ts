// Redux toolkit
import {
  createSlice,
  // Use the PayloadAction type to declare the contents of `action.payload`
  //PayloadAction
} from '@reduxjs/toolkit';

interface authState {
  status: string;
  user: {
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
  user: {
    uid: '1234567890',
    name: 'Kevin Collazos',
    email: 'kevcollazos@gmail.com',
    username: 'KevCollazos',
    role: 'A',
    photoURL: '',
    coverPhotoURL: '',
  },
  errorMessage: undefined,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    checkingCredentials: (state) => {
      state.status = 'checking';
      state.user = {
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
      state.user = payload.user;
      state.errorMessage = undefined;
    },

    onLogout: (
      state
      // { payload }
    ) => {
      state.status = 'not-authenticated';
      state.user = {
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
