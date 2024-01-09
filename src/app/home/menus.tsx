import { SidebarText } from "@/HebrewStrings/Texts";
import {
  AboutUsIcon,
  ContinueStudyingIcon,
  CourseCatalogIcon,
  CourseCreationIcon,
  CourseManagerIcon,
  CourseUserRequestsIcon,
  ExitIcon,
  HomePageIcon,
  PersonalAreaIcon,
} from "../assets/icons";


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
  PremisionManager=5,
  CourseCreation = 6,
  MyCourses = 7,
  AboutUs = 8,
  Logout = 9,
}

const admin_permissions = [
  Menu.HomePage,
  Menu.UserArea,
  Menu.CourseManager,
  Menu.PremisionManager,
  Menu.CourseCreation,
  Menu.Logout,
];

const user_permissions = [
  Menu.HomePage,
  Menu.UserArea,
  Menu.CourseCatalog,
  Menu.MyCourses,
  Menu.AboutUs,
  Menu.Logout,
];

const creator_permissions = [
  Menu.HomePage,
  Menu.UserArea,
  Menu.CourseCreation,
  Menu.MyCourses,
  Menu.AboutUs,
  Menu.Logout,
];

const editor_permissions = [
  Menu.HomePage,
  Menu.UserArea,
  Menu.CourseCatalog,
  Menu.CourseManager,
  Menu.MyCourses,
  Menu.AboutUs,
  Menu.Logout,
];

export const menu: MenuRow[] = [
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
    href: "/home/premisionManager",
    rowInfo: SidebarText.premsionManager,
    icon: <CourseUserRequestsIcon />,
  },
  {
    id: 6,
    href: "/home/courseCreation",
    rowInfo: SidebarText.courseCreation,
    icon: <CourseCreationIcon />,
  },
  {
    id: 7,
    href: "/home/myCourses",
    rowInfo: SidebarText.myCourses,
    icon: <ContinueStudyingIcon />, 
  },
  {
    id: 8,
    href: "/home/aboutUs",
    rowInfo: SidebarText.aboutUs,
    icon: <AboutUsIcon />,
  },
  {
    id: 9,
    href: "/",
    rowInfo: SidebarText.logout,
    icon: <ExitIcon />,
  },
];
export const admin_menu = menu.filter(({ id, rowInfo, icon }) =>
  admin_permissions.includes(id)
);
export const creator_menu = menu.filter(({ id, rowInfo, icon }) =>
  creator_permissions.includes(id)
);

export const editor_menu =menu.filter(({ id, rowInfo, icon }) =>
  editor_permissions.includes(id)
);

export const user_menu = menu.filter(({ id, rowInfo, icon }) =>
  user_permissions.includes(id)
);
