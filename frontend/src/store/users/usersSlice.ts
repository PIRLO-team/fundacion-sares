// Redux toolkit
import {
  createSlice,
  // Use the PayloadAction type to declare the contents of `action.payload`
  //PayloadAction
} from '@reduxjs/toolkit';

// Types
import { TUser } from '@/utils/types';

interface usersState {
  loading: boolean;
  users: TUser[];
  activeUser: TUser | null;
  errorMessage?: string | undefined;
}

const initialState: usersState = {
  loading: false,
  users: [],
  activeUser: null,
  errorMessage: undefined,
};

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    onSetLoadingUsers: (state, { payload }) => {
      state.loading = payload;
    },

    onLoadUsers: (state, { payload }) => {
      state.loading = false;
      state.users = payload;
      state.activeUser = null;
    },

    onSetActiveUser: (state, { payload }) => {
      state.loading = false;
      state.activeUser = payload || null;
    },

    onUnsetActiveUser: (state) => {
      state.loading = false;
      state.activeUser = null;
    },

    onAddNewUser: (state, { payload }) => {
      state.loading = false;
      state.users.push(payload);
      state.activeUser = null;
    },

    onUpdateUser: (state, { payload }) => {
      state.loading = false;

      state.users = state.users.map((user) => {
        if (user?.user_id === payload.id) {
          return payload;
        }
        return user;
      });

      state.activeUser = null;
    },

    onDeleteUser: (state) => {
      state.loading = false;
      state.activeUser = null;
    },

    onLogoutUsers: (state) => {
      state.users = [];
      state.activeUser = null;
    },
  },
});

export const {
  onSetLoadingUsers,
  onLoadUsers,
  onSetActiveUser,
  onUnsetActiveUser,
  onAddNewUser,
  onUpdateUser,
  onDeleteUser,
  onLogoutUsers,
} = usersSlice.actions;
