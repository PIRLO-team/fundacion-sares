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
    role: {
      role_description: string | undefined;
      role_id: string | undefined;
      role_name: string | undefined;
    };
    profession: string | undefined;
    phone: string | undefined;
    other_contact: string | undefined;
    img_profile: string | undefined;
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
    role: {
      role_description: undefined,
      role_id: undefined,
      role_name: undefined,
    },
    profession: undefined,
    phone: undefined,
    other_contact: undefined,
    img_profile: undefined,
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
    },

    onLogin: (state, { payload }) => {
      state.status = 'authenticated';
      state.currentUser.uid = payload.uid;
      state.currentUser.name = payload.name;
      state.currentUser.email = payload.email;
      state.currentUser.username = payload.username;
      state.currentUser.role = payload.role;
      state.currentUser.profession = payload.profession;
      state.currentUser.phone = payload.phone;
      state.currentUser.other_contact = payload.other_contact;
      state.currentUser.img_profile = payload.img_profile;
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
        role: {
          role_description: undefined,
          role_id: undefined,
          role_name: undefined,
        },
        phone: undefined,
        other_contact: undefined,
        profession: undefined,
        img_profile: undefined,
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
