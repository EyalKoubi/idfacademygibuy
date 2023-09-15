import React from "react";
import { SidebarText } from "../../../HebrewStrings/Texts";
import { sidebarStyles } from "../../../utils/styles";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import useAppState from "@/app/_contexts/globalContext";

const Sidebar = () => {
  const { setIsPopupMessagePressed } = useAppState();
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
          <a href="/" className={sidebarStyles.menuItemText}>
            <i className="fas fa-home"></i> {SidebarText.homePage}
          </a>
        </li>
        <li className={sidebarStyles.menuItem}>
          <a href="/user" className={sidebarStyles.menuItemText}>
            <i className="fas fa-user"></i> {SidebarText.userArea}
          </a>
        </li>
        <li className={sidebarStyles.menuItem}>
          <a href="/course-catalog" className={sidebarStyles.menuItemText}>
            <i className="fas fa-book"></i> {SidebarText.courseCatalog}
          </a>
        </li>
        <li className={sidebarStyles.menuItem}>
          <a href="/course-manager" className={sidebarStyles.menuItemText}>
            <i className="fas fa-cogs"></i> {SidebarText.courseManager}
          </a>
        </li>
        <li className={sidebarStyles.menuItem}>
          <a href="/course-creation" className={sidebarStyles.menuItemText}>
            <i className="fas fa-plus"></i> {SidebarText.courseCreation}
          </a>
        </li>
        <li className={sidebarStyles.menuItem}>
          <a href="/continue-studying" className={sidebarStyles.menuItemText}>
            <i className="fas fa-graduation-cap"></i>{" "}
            {SidebarText.continueStading}
          </a>
        </li>
        <li className={sidebarStyles.menuItem}>
          <button onClick={() => setIsPopupMessagePressed(true)}>
            <i className="fas fa-info-circle"></i> {SidebarText.aboutUs}
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
            <i className="fas fa-info-circle"></i> {SidebarText.logout}
          </button>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
