// Redux toolkit
import {
  createSlice,
  // Use the PayloadAction type to declare the contents of `action.payload`
  //PayloadAction
} from '@reduxjs/toolkit';

// Types
import { TInsumo } from '@/utils/types';

interface insumosState {
  loading: boolean;
  insumos: TInsumo[];
  activeInsumo: TInsumo | null;
  errorMessage?: string | undefined;
}

const initialState: insumosState = {
  loading: false,
  insumos: [],
  activeInsumo: null,
  errorMessage: undefined,
};

export const insumosSlice = createSlice({
  name: 'insumos',
  initialState,
  reducers: {
    onSetLoadingInsumos: (state, { payload }) => {
      state.loading = payload;
    },

    onLoadInsumos: (state, { payload }) => {
      state.loading = false;
      state.insumos = payload;
      state.activeInsumo = null;
    },

    onSetActiveInsumo: (state, { payload }) => {
      state.loading = false;
      state.activeInsumo = payload || null;
    },

    onUnsetActiveInsumo: (state) => {
      state.loading = false;
      state.activeInsumo = null;
    },

    onAddNewInsumo: (state, { payload }) => {
      state.loading = false;
      state.insumos.push(payload);
      state.activeInsumo = null;
    },

    onUpdateInsumo: (state, { payload }) => {
      state.loading = false;

      state.insumos = state.insumos.map((insumo) => {
        if (insumo?.supply_id === payload.id) {
          return payload;
        }
        return insumo;
      });

      // state.activeInsumo = null;
    },

    onDeleteInsumo: (state) => {
      state.loading = false;
      state.activeInsumo = null;
    },

    onLogoutInsumos: (state) => {
      state.insumos = [];
      state.activeInsumo = null;
    },
  },
});

export const {
  onSetLoadingInsumos,
  onLoadInsumos,
  onSetActiveInsumo,
  onUnsetActiveInsumo,
  onAddNewInsumo,
  onUpdateInsumo,
  onDeleteInsumo,
  onLogoutInsumos,
} = insumosSlice.actions;
