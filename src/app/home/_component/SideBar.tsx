import React, { useEffect, useState } from "react";
import useAppState from "@/app/_contexts/globalContext";
import RowInMenu from "./RowInMenu";
import {
  admin_menu,
  user_menu,
  creator_menu,
  editor_menu,
  MenuRow,
} from "../menus";

import {Users} from "@/app/types"

interface SidebarProps {
  userType: Users;
}

const Sidebar:React.FC<SidebarProps> = ({ userType }) => {
  const { isMenuButtonPressed } = useAppState();
  const [menu, setMenu] = useState<MenuRow[]>([]);

  const sidebarClass = isMenuButtonPressed ? "w-64" : "w-16";

  useEffect(() => {
   
    switch (userType) {
      case Users.Admin:
        setMenu(admin_menu);
        break;
      case Users.Creator:
        setMenu(creator_menu);
        break;
      case Users.Editor:
        setMenu(editor_menu);
        break;
      case Users.User:
        setMenu(user_menu);
        break;
      default:
    }
  }, []);

  return (
    <div className={`bg-gray-200 p-4 flex flex-col h-screen ${sidebarClass}`}>
      <ul className="space-y-2">
        {menu.map(({ id, href, rowInfo, icon }) => {
          return (
            <RowInMenu key={id} href={href} rowInfo={rowInfo} icon={icon} />
          );
        })}
      </ul>
      {isMenuButtonPressed && (
        <div className="flex flex-row space-x-4 mb-4">
          <div className="bg-red-300 px-4 py-2 rounded-md text-white">
            <button>back</button>
          </div>
          <div className="bg-green-300 px-4 py-2 rounded-md text-white">
            <button>dark</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
