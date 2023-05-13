// Redux toolkit
import {
  createSlice,
  // Use the PayloadAction type to declare the contents of `action.payload`
  //PayloadAction
} from '@reduxjs/toolkit';

// Types
import { TProveedor } from '@/utils/types';

interface proveedoresState {
  loading: boolean;
  proveedores: TProveedor[];
  activeProveedor: TProveedor | null;
  errorMessage?: string | undefined;
}

const initialState: proveedoresState = {
  loading: false,
  proveedores: [],
  activeProveedor: null,
  errorMessage: undefined,
};

export const proveedoresSlice = createSlice({
  name: 'proveedores',
  initialState,
  reducers: {
    onSetLoadingProveedores: (state, { payload }) => {
      state.loading = payload;
    },

    onLoadProveedores: (state, { payload }) => {
      state.loading = false;
      state.proveedores = payload;
      state.activeProveedor = null;
    },

    onSetActiveProveedor: (state, { payload }) => {
      state.loading = false;
      state.activeProveedor = payload || null;
    },

    onUnsetActiveProveedor: (state) => {
      state.loading = false;
      state.activeProveedor = null;
    },

    onAddNewProveedor: (state, { payload }) => {
      state.loading = false;
      state.proveedores.push(payload);
      state.activeProveedor = null;
    },

    onUpdateProveedor: (state, { payload }) => {
      state.loading = false;

      state.proveedores = state.proveedores.map((Proveedor) => {
        if (Proveedor?.provider_id === payload.id) {
          return payload;
        }
        return Proveedor;
      });

      // state.activeProveedor = null;
    },

    onDeleteProveedor: (state) => {
      state.loading = false;
      state.activeProveedor = null;
    },

    onLogoutProveedores: (state) => {
      state.proveedores = [];
      state.activeProveedor = null;
    },
  },
});

export const {
  onSetLoadingProveedores,
  onLoadProveedores,
  onSetActiveProveedor,
  onUnsetActiveProveedor,
  onAddNewProveedor,
  onUpdateProveedor,
  onDeleteProveedor,
  onLogoutProveedores,
} = proveedoresSlice.actions;
