import create from "zustand";

type AppState = {
  isMenuButtonPressed: boolean;
  isPopupMessagePressed: boolean;
};

type AppActions = {
  setIsMenuButtonPressed: (value: boolean) => void;
  setIsPopupMessagePressed: (value: boolean) => void;
};

const useAppState = create<AppState & AppActions>((set) => ({
  isMenuButtonPressed: false,
  isPopupMessagePressed: false,
  setIsMenuButtonPressed: (value) => set({ isMenuButtonPressed: value }),
  setIsPopupMessagePressed: (value) => set({ isPopupMessagePressed: value }),
}));

export default useAppState;
