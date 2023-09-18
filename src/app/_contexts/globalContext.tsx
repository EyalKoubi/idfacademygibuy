import create from "zustand";
import { Theme, lightTheme } from "../theme";

type AppState = {
  isMenuButtonPressed: boolean;
  isPopupMessagePressed: boolean;
  theme: Theme;
};

type AppActions = {
  setIsMenuButtonPressed: (value: boolean) => void;
  setIsPopupMessagePressed: (value: boolean) => void;
  setTheme: (value: Theme) => void;
};

const useAppState = create<AppState & AppActions>((set) => ({
  isMenuButtonPressed: false,
  isPopupMessagePressed: false,
  theme: lightTheme,
  setIsMenuButtonPressed: (value) => set({ isMenuButtonPressed: value }),
  setIsPopupMessagePressed: (value) => set({ isPopupMessagePressed: value }),
  setTheme: (value) => set({ theme: value }),
}));

export default useAppState;
