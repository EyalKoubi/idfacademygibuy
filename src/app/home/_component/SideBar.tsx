import React from "react";
import { SidebarText } from "../../../HebrewStrings/Texts";
import { sidebarStyles } from "../../../utils/styles";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import useAppState from "@/app/_contexts/globalContext";
import HomePageIcon from "./HomePageIcon";
import PersonalAreaIcon from "./PersonalAreaIcon";
import CourseCatalogIcon from "./icons/CourseCatalogIcon";
import CourseManagerIcon from "./icons/CourseManagerIcon";
import CourseCreationIcon from "./icons/CourseCreationIcon";
import ContinueStudyingIcon from "./icons/ContinueStudyingIcon";
import AboutUsIcon from "./icons/AboutUsIcon";
import ExitIcon from "./icons/ExitIcon";

const Sidebar = () => {
  const { setIsPopupMessagePressed, isMenuButtonPressed } = useAppState();
  const { data: sessionData } = useSession();
  const router = useRouter();

  return (
    <div className={sidebarStyles.sidebar}>
      <div className="flex flex-row">
        <div>
          <button>back</button>
        </div>
        <div>
          <button>dark</button>
        </div>
      </div>
      <ul>
        <li className={sidebarStyles.menuItem}>
          <button className={sidebarStyles.menuItemText}>
            <div className="flex">
              {isMenuButtonPressed && (
                <>
                  <i className="fas fa-home"></i> {SidebarText.homePage}
                </>
              )}
              <HomePageIcon />
            </div>
          </button>
        </li>
        <li className={sidebarStyles.menuItem}>
          <button className={sidebarStyles.menuItemText}>
            <div className="flex">
              {isMenuButtonPressed && (
                <>
                  <i className="fas fa-user"></i> {SidebarText.userArea}
                </>
              )}
              <PersonalAreaIcon />
            </div>
          </button>
        </li>
        <li className={sidebarStyles.menuItem}>
          <button className={sidebarStyles.menuItemText}>
            <div className="flex">
              {isMenuButtonPressed && (
                <>
                  <i className="fas fa-book"></i> {SidebarText.courseCatalog}
                </>
              )}
              <CourseCatalogIcon />
            </div>
          </button>
        </li>
        <li className={sidebarStyles.menuItem}>
          <button className={sidebarStyles.menuItemText}>
            <div className="flex">
              {isMenuButtonPressed && (
                <>
                  <i className="fas fa-cogs"></i> {SidebarText.courseManager}
                </>
              )}
              <CourseManagerIcon />
            </div>
          </button>
        </li>
        <li className={sidebarStyles.menuItem}>
          <div className="flex">
            <button className={sidebarStyles.menuItemText}>
              {isMenuButtonPressed && (
                <>
                  <i className="fas fa-plus"></i> {SidebarText.courseCreation}
                </>
              )}
              <CourseCreationIcon />
            </button>
          </div>
        </li>
        <li className={sidebarStyles.menuItem}>
          <button className={sidebarStyles.menuItemText}>
            <div className="flex">
              {isMenuButtonPressed && (
                <>
                  <i className="fas fa-graduation-cap"></i>{" "}
                  {SidebarText.continueStading}
                </>
              )}
              <ContinueStudyingIcon />
            </div>
          </button>
        </li>
        <li className={sidebarStyles.menuItem}>
          <button onClick={() => setIsPopupMessagePressed(true)}>
            <div className="fles">
              {isMenuButtonPressed && (
                <>
                  <i className="fas fa-info-circle"></i> {SidebarText.aboutUs}
                </>
              )}
              <AboutUsIcon />
            </div>
          </button>
        </li>
        <li className={sidebarStyles.menuItem}>
          <button
            className="text-gray-300"
            onClick={() => {
              signOut({ redirect: false }).then(() => {
                router.push("/");
              });
            }}
          >
            <div className="flex">
              {isMenuButtonPressed && (
                <>
                  <i className="fas fa-info-circle"></i> {SidebarText.logout}
                </>
              )}
              <ExitIcon />
            </div>
          </button>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
