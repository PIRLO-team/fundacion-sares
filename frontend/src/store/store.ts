import { configureStore } from '@reduxjs/toolkit';

// Slices imports
import { authSlice } from './auth/authSlice';
import { usersSlice } from './users/usersSlice';
import { uiSlice } from './ui/uiSlice';
// ...

export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    users: usersSlice.reducer,
    ui: uiSlice.reducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
