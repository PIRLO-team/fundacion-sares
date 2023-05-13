// Redux toolkit
import {
  createSlice,
  // Use the PayloadAction type to declare the contents of `action.payload`
  //PayloadAction
} from '@reduxjs/toolkit';

// Types
import { TVoluntario } from '@/utils/types';

interface voluntariosState {
  loading: boolean;
  voluntarios: TVoluntario[];
  activeVoluntario: TVoluntario | null;
  errorMessage?: string | undefined;
}

const initialState: voluntariosState = {
  loading: false,
  voluntarios: [],
  activeVoluntario: null,
  errorMessage: undefined,
};

export const voluntariosSlice = createSlice({
  name: 'voluntarios',
  initialState,
  reducers: {
    onSetLoadingVoluntarios: (state, { payload }) => {
      state.loading = payload;
    },

    onLoadVoluntarios: (state, { payload }) => {
      state.loading = false;
      state.voluntarios = payload;
      state.activeVoluntario = null;
    },

    onSetActiveVoluntario: (state, { payload }) => {
      state.loading = false;
      state.activeVoluntario = payload || null;
    },

    onUnsetActiveVoluntario: (state) => {
      state.loading = false;
      state.activeVoluntario = null;
    },

    onAddNewVoluntario: (state, { payload }) => {
      state.loading = false;
      state.voluntarios.push(payload);
      state.activeVoluntario = null;
    },

    onUpdateVoluntario: (state, { payload }) => {
      state.loading = false;

      state.voluntarios = state.voluntarios.map((Voluntario) => {
        if (Voluntario?.direct_volunteer_id === payload.id) {
          return payload;
        }
        return Voluntario;
      });

      // state.activeVoluntario = null;
    },

    onDeleteVoluntario: (state) => {
      state.loading = false;
      state.activeVoluntario = null;
    },

    onLogoutVoluntarios: (state) => {
      state.voluntarios = [];
      state.activeVoluntario = null;
    },
  },
});

export const {
  onSetLoadingVoluntarios,
  onLoadVoluntarios,
  onSetActiveVoluntario,
  onUnsetActiveVoluntario,
  onAddNewVoluntario,
  onUpdateVoluntario,
  onDeleteVoluntario,
  onLogoutVoluntarios,
} = voluntariosSlice.actions;
