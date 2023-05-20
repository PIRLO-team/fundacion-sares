// Redux toolkit
import {
  createSlice,
  // Use the PayloadAction type to declare the contents of `action.payload`
  //PayloadAction
} from '@reduxjs/toolkit';

// Types
import { TNoConsumible, TCategories } from '@/utils/types';

interface noConsumiblesState {
  loading: boolean;
  noConsumibles: TNoConsumible[];
  activeNoConsumible: TNoConsumible | null;
  categories: TCategories[];
  errorMessage?: string | undefined;
}

const initialState: noConsumiblesState = {
  loading: false,
  noConsumibles: [],
  categories: [],
  activeNoConsumible: null,
  errorMessage: undefined,
};

export const noConsumibleSlice = createSlice({
  name: 'noConsumibles',
  initialState,
  reducers: {
    onSetLoadingNoConsumibles: (state, { payload }) => {
      state.loading = payload;
    },

    onLoadNoConsumibles: (state, { payload }) => {
      state.loading = false;
      state.noConsumibles = payload;
      state.activeNoConsumible = null;
    },

    onLoadCategories: (state, { payload }) => {
      state.loading = false;
      state.categories = payload;
    },

    onSetActiveNoConsumible: (state, { payload }) => {
      state.loading = false;
      state.activeNoConsumible = payload || null;
    },

    onUnsetActiveNoConsumible: (state) => {
      state.loading = false;
      state.activeNoConsumible = null;
    },

    onAddNewNoConsumible: (state, { payload }) => {
      state.loading = false;
      state.noConsumibles.push(payload);
      state.activeNoConsumible = null;
    },

    onUpdateNoConsumible: (state, { payload }) => {
      state.loading = false;

      state.noConsumibles = state.noConsumibles.map((noConsumible) => {
        if (noConsumible?.non_consumable_id === payload.id) {
          return payload;
        }
        return noConsumible;
      });

      // state.activeNoConsumible = null;
    },

    onDeleteNoConsumible: (state) => {
      state.loading = false;
      state.activeNoConsumible = null;
    },

    onLogoutNoConsumible: (state) => {
      state.noConsumibles = [];
      state.activeNoConsumible = null;
    },
  },
});

export const {
  onSetLoadingNoConsumibles,
  onLoadNoConsumibles,
  onLoadCategories,
  onSetActiveNoConsumible,
  onUnsetActiveNoConsumible,
  onAddNewNoConsumible,
  onUpdateNoConsumible,
  onDeleteNoConsumible,
  onLogoutNoConsumible,
} = noConsumibleSlice.actions;
