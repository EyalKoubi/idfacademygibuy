import create from "zustand";
import { Theme, lightTheme } from "../theme";
import { Users } from "@/app/types";
import {
  admin_menu,
  user_menu,
  creator_menu,
  editor_menu,
  MenuRow,
} from "@/app/home/menus";

type AppState = {
  isMenuButtonPressed: boolean;
  theme: Theme;
  isSmallScreen: boolean;
  isAdminMenu: boolean;
  menu: MenuRow[];
  initialUserType: number; // Track the initial user type
};

type AppActions = {
  setInitialUserType:(value:number) => void,
  setIsMenuButtonPressed: (value: boolean) => void;
  setTheme: (value: Theme) => void;
  setIsSmallScreen: (value: boolean) => void;
  setIsAdminMenu: (value: boolean) => void;
  setMenu: (userType: number) => void;
  onClickChangePremmisionMenu: (value:boolean) => void;
};

const useAppState = create<AppState & AppActions>((set) => ({
  isMenuButtonPressed: false,
  theme: lightTheme,
  isSmallScreen: window.innerWidth < 786,
  isAdminMenu: false,
  menu: [],
  initialUserType: Users.Admin, // Assume the initial user type is admin
  setInitialUserType:(value) => set({ initialUserType: value }),
  setIsMenuButtonPressed: (value) => set({ isMenuButtonPressed: value }),
  setTheme: (value) => set({ theme: value }),
  setIsSmallScreen: (value) => set({ isSmallScreen: value }),
  setIsAdminMenu: (value) => set({ isAdminMenu: value }),

  setMenu: (userType) => {
    switch (userType) {
      case Users.Admin:
        set({ menu: user_menu, isAdminMenu: true });
        break;
      case Users.Creator:
        // set({ menu: creator_menu });
        break;
      case Users.Editor:
        // set({ menu: editor_menu });
        break;
      case Users.User:
        set({ menu: user_menu, isAdminMenu: false });
        break;
      default:
        set({ menu: [], isAdminMenu: false });
        break;
    }
  },

  onClickChangePremmisionMenu: (value) => {
      const boolIsAdminMenu = !value;
      const userType = boolIsAdminMenu ? Users.Admin : Users.User;
  
      const menu = userType === Users.Admin ? admin_menu : user_menu;
      set({menu,isAdminMenu:boolIsAdminMenu})
  },
}));

export default useAppState;
