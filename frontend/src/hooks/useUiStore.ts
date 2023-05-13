// Redux Hooks
import { useAppDispatch, useAppSelector } from '@/store/app/hooks';

// Redux actions
import { onOpenCloseDrawer } from '@/store';

export const useUiStore = () => {
  const { isDrawerOpen } = useAppSelector((state) => state.ui);

  // Dispatch
  const dispatch = useAppDispatch();

  // Open/close user drawer
  const openCloseDrawer = () => {
    dispatch(onOpenCloseDrawer());
  };

  return {
    // Props
    isDrawerOpen,

    // Methods
    openCloseDrawer,
  };
};
