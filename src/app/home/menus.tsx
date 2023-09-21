import { SidebarText } from "@/HebrewStrings/Texts";
import {
  AboutUsIcon,
  ContinueStudyingIcon,
  CourseCatalogIcon,
  CourseCreationIcon,
  CourseManagerIcon,
  ExitIcon,
  HomePageIcon,
  PersonalAreaIcon,
} from "./_component/icons";

export interface MenuRow {
  id: number;
  href: string;
  rowInfo: string;
  icon: React.ReactNode;
}

enum Menu {
  HomePage = 1,
  UserArea = 2,
  CourseCatalog = 3,
  CourseManager = 4,
  CourseCreation = 5,
  ContinueStading = 6,
  AboutUs = 7,
  Logout = 8,
}

const admin_permissions = [
  Menu.HomePage,
  Menu.UserArea,
  Menu.CourseCatalog,
  Menu.CourseManager,
  Menu.CourseCreation,
  Menu.ContinueStading,
  Menu.AboutUs,
  Menu.Logout,
];

const user_permissions = [
  Menu.HomePage,
  Menu.UserArea,
  Menu.ContinueStading,
  Menu.AboutUs,
  Menu.Logout,
];

const creator_permissions = [
  Menu.HomePage,
  Menu.UserArea,
  Menu.CourseCreation,
  Menu.ContinueStading,
  Menu.AboutUs,
  Menu.Logout,
];

const editor_permissions = [
  Menu.HomePage,
  Menu.UserArea,
  Menu.CourseCatalog,
  Menu.CourseManager,
  Menu.ContinueStading,
  Menu.AboutUs,
  Menu.Logout,
];

export const admin_menu: MenuRow[] = [
  {
    id: 1,
    href: "/home",
    rowInfo: SidebarText.homePage,
    icon: <HomePageIcon />,
  },
  {
    id: 2,
    href: "/home/userArea",
    rowInfo: SidebarText.userArea,
    icon: <PersonalAreaIcon />,
  },
  {
    id: 3,
    href: "/home/courseCatalog",
    rowInfo: SidebarText.courseCatalog,
    icon: <CourseCatalogIcon />,
  },
  {
    id: 4,
    href: "/home/courseManager",
    rowInfo: SidebarText.courseManager,
    icon: <CourseManagerIcon />,
  },
  {
    id: 5,
    href: "/home/courseCreation",
    rowInfo: SidebarText.courseCreation,
    icon: <CourseCreationIcon />,
  },
  {
    id: 6,
    href: "/home/continueStading",
    rowInfo: SidebarText.continueStading,
    icon: <ContinueStudyingIcon />,
  },
  {
    id: 7,
    href: "/home/aboutUs",
    rowInfo: SidebarText.aboutUs,
    icon: <AboutUsIcon />,
  },
  {
    id: 8,
    href: "/",
    rowInfo: SidebarText.logout,
    icon: <ExitIcon />,
  },
];

export const creator_menu = admin_menu.filter(({ id, rowInfo, icon }) =>
  creator_permissions.includes(id)
);

export const editor_menu = admin_menu.filter(({ id, rowInfo, icon }) =>
  editor_permissions.includes(id)
);

export const user_menu = admin_menu.filter(({ id, rowInfo, icon }) =>
  user_permissions.includes(id)
);
