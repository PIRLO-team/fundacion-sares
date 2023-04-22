import {
  createSlice,
  // Use the PayloadAction type to declare the contents of `action.payload`
  //PayloadAction
} from '@reduxjs/toolkit';

interface uiState {
  isUserDrawerOpen: boolean;
}

const initialState: uiState = {
  isUserDrawerOpen: false,
};

export const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    onOpenCloseUserDrawer: (state) => {
      state.isUserDrawerOpen = !state.isUserDrawerOpen;
    },
  },
});

export const { onOpenCloseUserDrawer } = uiSlice.actions;
