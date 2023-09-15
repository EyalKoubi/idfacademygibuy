import React from "react";
import useAppState from "@/app/_contexts/globalContext";
import RowInMenu from "./RowInMenu";
import { first_menu } from "../menus";

const Sidebar = () => {
  const { isMenuButtonPressed } = useAppState();

  const sidebarClass = isMenuButtonPressed ? "w-64" : "w-16";

  return (
    <div className={`bg-gray-200 p-4 flex flex-col h-screen ${sidebarClass}`}>
      <ul className="space-y-2">
        {first_menu.map(({ id, rowInfo, icon }) => {
          return <RowInMenu key={id} rowInfo={rowInfo} icon={icon} />;
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
