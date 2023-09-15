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

interface RowInMenu {
  rowInfo: string;
  icon: React.ReactNode;
}

export const first_menu: RowInMenu[] = [
  {
    rowInfo: SidebarText.homePage,
    icon: <HomePageIcon />,
  },
  {
    rowInfo: SidebarText.userArea,
    icon: <PersonalAreaIcon />,
  },
  {
    rowInfo: SidebarText.courseCatalog,
    icon: <CourseCatalogIcon />,
  },
  {
    rowInfo: SidebarText.courseManager,
    icon: <CourseManagerIcon />,
  },
  {
    rowInfo: SidebarText.courseCreation,
    icon: <CourseCreationIcon />,
  },
  {
    rowInfo: SidebarText.continueStading,
    icon: <ContinueStudyingIcon />,
  },
  {
    rowInfo: SidebarText.aboutUs,
    icon: <AboutUsIcon />,
  },
  {
    rowInfo: SidebarText.logout,
    icon: <ExitIcon />,
  },
];
