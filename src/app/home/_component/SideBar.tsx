import React from "react";
import { SidebarText } from "../../../HebrewStrings/Texts";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import useAppState from "@/app/_contexts/globalContext";
import HomePageIcon from "./icons/HomePageIcon";
import {
  AboutUsIcon,
  ContinueStudyingIcon,
  CourseCatalogIcon,
  CourseCreationIcon,
  CourseManagerIcon,
  ExitIcon,
} from "./icons";
import PersonalAreaIcon from "./icons/PersonalAreaIcon";
import RowInMenu from "./RowInMenu";
import { first_menu } from "../menus";

const Sidebar = () => {
  const { setIsPopupMessagePressed, isMenuButtonPressed } = useAppState();
  const router = useRouter();

  const sidebarClass = isMenuButtonPressed ? "w-64" : "w-16";

  return (
    <div className={`bg-gray-200 p-4 flex flex-col h-screen ${sidebarClass}`}>
      <ul className="space-y-2">
        {first_menu.map(({ rowInfo, icon }) => {
          switch (rowInfo) {
            case SidebarText.aboutUs:
              return (
                <RowInMenu
                  rowInfo={rowInfo}
                  icon={icon}
                  onClick={() => setIsPopupMessagePressed(true)}
                />
              );
            case SidebarText.logout:
              return (
                <RowInMenu
                  rowInfo={rowInfo}
                  icon={icon}
                  onClick={() => {
                    signOut({ redirect: false }).then(() => {
                      router.push("/");
                    });
                  }}
                />
              );
            default:
              return <RowInMenu rowInfo={rowInfo} icon={icon} />;
          }
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
