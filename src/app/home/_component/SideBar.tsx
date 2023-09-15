import React from "react";
import { SidebarText } from "../../../HebrewStrings/Texts";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import useAppState from "@/app/_contexts/globalContext";
import HomePageIcon from "./HomePageIcon";
import {
  AboutUsIcon,
  ContinueStudyingIcon,
  CourseCatalogIcon,
  CourseCreationIcon,
  CourseManagerIcon,
  ExitIcon,
} from "./icons";
import PersonalAreaIcon from "./PersonalAreaIcon";
import RowInMenu from "./RowInMenu";

const Sidebar = () => {
  const { setIsPopupMessagePressed, isMenuButtonPressed } = useAppState();
  const router = useRouter();

  const sidebarClass = isMenuButtonPressed ? "w-64" : "w-16";

  return (
    <div className={`bg-gray-200 p-4 flex flex-col h-screen ${sidebarClass}`}>
      <ul className="space-y-2">
        <RowInMenu rowInfo={SidebarText.homePage} icon={<HomePageIcon />} />
        <RowInMenu rowInfo={SidebarText.userArea} icon={<PersonalAreaIcon />} />
        <RowInMenu
          rowInfo={SidebarText.courseCatalog}
          icon={<CourseCatalogIcon />}
        />
        <RowInMenu
          rowInfo={SidebarText.courseManager}
          icon={<CourseManagerIcon />}
        />
        <RowInMenu
          rowInfo={SidebarText.courseCreation}
          icon={<CourseCreationIcon />}
        />
        <RowInMenu
          rowInfo={SidebarText.continueStading}
          icon={<ContinueStudyingIcon />}
        />
        <RowInMenu
          rowInfo={SidebarText.aboutUs}
          icon={<AboutUsIcon />}
          onClick={() => setIsPopupMessagePressed(true)}
        />
        <RowInMenu
          rowInfo={SidebarText.logout}
          icon={<ExitIcon />}
          onClick={() => {
            signOut({ redirect: false }).then(() => {
              router.push("/");
            });
          }}
        />
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
