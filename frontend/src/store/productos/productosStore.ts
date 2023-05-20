// Redux toolkit
import {
  createSlice,
  // Use the PayloadAction type to declare the contents of `action.payload`
  //PayloadAction
} from '@reduxjs/toolkit';

// Types
import { TInsumo, TProducto } from '@/utils/types';

interface productosState {
  loading: boolean;
  productos: TProducto[];
  expiredProductos: TInsumo[];
  activeProducto: TProducto | null;
  errorMessage?: string | undefined;
}

const initialState: productosState = {
  loading: false,
  productos: [],
  expiredProductos: [],
  activeProducto: null,
  errorMessage: undefined,
};

export const productosSlice = createSlice({
  name: 'productos',
  initialState,
  reducers: {
    onSetLoadingProductos: (state, { payload }) => {
      state.loading = payload;
    },

    onLoadProductos: (state, { payload }) => {
      state.loading = false;
      state.productos = payload;
    },

    onLoadExpireProductos: (state, { payload }) => {
      state.loading = false;
      state.expiredProductos = payload;
      state.activeProducto = null;
    },

    onSetActiveProducto: (state, { payload }) => {
      state.loading = false;
      state.activeProducto = payload || null;
    },

    onAddNewProducto: (state, { payload }) => {
      state.loading = false;
      state.productos.push(payload);
      state.activeProducto = null;
    },

    onUpdateProducto: (state, { payload }) => {
      state.loading = false;

      state.productos = state.productos.map((roducto) => {
        if (roducto?.supply_id === payload.id) {
          return payload;
        }
        return roducto;
      });

      // state.activeProducto = null;
    },

    onDeleteProducto: (state) => {
      state.loading = false;
      state.activeProducto = null;
    },

    onLogoutProductos: (state) => {
      state.productos = [];
      state.activeProducto = null;
    },
  },
});

export const {
  onSetLoadingProductos,
  onLoadProductos,
  onLoadExpireProductos,
  onSetActiveProducto,
  onAddNewProducto,
  onUpdateProducto,
  onDeleteProducto,
  onLogoutProductos,
} = productosSlice.actions;
