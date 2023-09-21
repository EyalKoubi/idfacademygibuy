import create from "zustand";
import { Theme, lightTheme } from "../theme";

type AppState = {
  isMenuButtonPressed: boolean;
  theme: Theme;
};

type AppActions = {
  setIsMenuButtonPressed: (value: boolean) => void;
  setTheme: (value: Theme) => void;
};

const useAppState = create<AppState & AppActions>((set) => ({
  isMenuButtonPressed: false,
  theme: lightTheme,
  setIsMenuButtonPressed: (value) => set({ isMenuButtonPressed: value }),
  setTheme: (value) => set({ theme: value }),
}));

export default useAppState;
