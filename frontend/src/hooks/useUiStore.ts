// Redux Hooks
import { useAppDispatch, useAppSelector } from '@/store/app/hooks';

// Redux actions
import { onOpenCloseUserDrawer } from '@/store';

export const useUiStore = () => {
  const { isUserDrawerOpen } = useAppSelector((state) => state.ui);

  // Dispatch
  const dispatch = useAppDispatch();

  // Open/close user drawer
  const openCloseUserDrawer = () => {
    dispatch(onOpenCloseUserDrawer());
  };

  return {
    // Props
    isUserDrawerOpen,

    // Methods
    openCloseUserDrawer,
  };
};
