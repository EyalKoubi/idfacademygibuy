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
  id: number;
  rowInfo: string;
  icon: React.ReactNode;
}

export const first_menu: RowInMenu[] = [
  {
    id: 1,
    rowInfo: SidebarText.homePage,
    icon: <HomePageIcon />,
  },
  {
    id: 2,
    rowInfo: SidebarText.userArea,
    icon: <PersonalAreaIcon />,
  },
  {
    id: 3,
    rowInfo: SidebarText.courseCatalog,
    icon: <CourseCatalogIcon />,
  },
  {
    id: 4,
    rowInfo: SidebarText.courseManager,
    icon: <CourseManagerIcon />,
  },
  {
    id: 5,
    rowInfo: SidebarText.courseCreation,
    icon: <CourseCreationIcon />,
  },
  {
    id: 6,
    rowInfo: SidebarText.continueStading,
    icon: <ContinueStudyingIcon />,
  },
  {
    id: 7,
    rowInfo: SidebarText.aboutUs,
    icon: <AboutUsIcon />,
  },
  {
    id: 8,
    rowInfo: SidebarText.logout,
    icon: <ExitIcon />,
  },
];
