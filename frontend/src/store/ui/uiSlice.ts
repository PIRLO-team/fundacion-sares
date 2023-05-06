import {
  createSlice,
  // Use the PayloadAction type to declare the contents of `action.payload`
  //PayloadAction
} from '@reduxjs/toolkit';

interface uiState {
  isDrawerOpen: boolean;
}

const initialState: uiState = {
  isDrawerOpen: false,
};

export const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    onOpenCloseDrawer: (state) => {
      state.isDrawerOpen = !state.isDrawerOpen;
    },
  },
});

export const { onOpenCloseDrawer } = uiSlice.actions;
