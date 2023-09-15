import useAppState from "@/app/_contexts/globalContext";
import { Component } from "react";

interface RowInMenu {
  rowInfo: string;
  icon: React.ReactNode;
  onClick?: () => void;
}

const RowInMenu = ({ rowInfo, icon, onClick }: RowInMenu) => {
  const { isMenuButtonPressed } = useAppState();

  return (
    <li className="bg-blue-100 p-2 rounded-md">
      <button className="w-full text-left" onClick={onClick}>
        <div className="flex justify-between items-center space-x-2">
          {isMenuButtonPressed && (
            <>
              <i className="fas fa-home"></i> {rowInfo}
            </>
          )}
          {icon}
        </div>
      </button>
    </li>
  );
};

export default RowInMenu;
