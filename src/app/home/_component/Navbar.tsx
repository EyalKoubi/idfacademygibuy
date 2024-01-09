import HamburgerMenu from "../../assets/icons/HamburgerMenu";
import { HomeTexts,NavBarText } from "@/HebrewStrings/Texts";
import useAppState from "@/app/_contexts/globalContext";
import tikshuvPicture from "@/app/assets/tikshuv.png";
import { Users } from "@/app/types";
import Image from "next/image";
import { useRouter } from "next/router"; // Use "next/router" instead of "next/navigation"
import ContinueStudyingIcon from "@/app/assets/icons/ContinueStudyingIcon"
import {
  admin_menu,
  user_menu,
  creator_menu,
  editor_menu,
  MenuRow,
} from "../menus";
import { useEffect, useState } from "react";
import RowInMenu from "./RowInMenu";
import { Button } from "react-daisyui";

interface NavbarProps {
  userType: Users;
}

const Navbar: React.FC<NavbarProps> = ({ userType }) => {
  const { isMenuButtonPressed } = useAppState();
  const [menu, setMenu] = useState<MenuRow[]>([]);
  const [isAdminButton,setIsAdminButton]=useState(false);
  const [isAdminMenu,setIsAdminMenu]=useState(false)
  const onClickMenu=()=>{
    setIsAdminMenu(!isAdminMenu)
    if(isAdminMenu){
      setMenu(admin_menu);
    }
    else{
      setMenu(user_menu);
    }
  }
  useEffect(() => {
    setIsAdminButton(false)
    switch (userType) {
      case Users.Admin:
        setIsAdminButton(true)
        setMenu(user_menu);
        break;
      case Users.Creator:
        //setMenu(creator_menu);
        break;
      case Users.Editor:
       // setMenu(editor_menu);
        break;
      case Users.User:{
        setIsAdminButton(false);
        setMenu(user_menu);
        break;
      }
      default:
        setMenu([]); // Provide a default case to handle unexpected values
        break;
    }
  }, [userType]); 

 // const sidebarClass = isMenuButtonPressed ? "w-64" : "w-16";

  return (
    <nav className="flex justify-evenly items-center w-full py-5 px-20">
    <div className="flex items-center w-full">
      <a href="/" className="text-slate-900 text-4xl font-leagueGothic">
        <span>IDF</span>
        <span className="text-emerald-700">A</span>
      </a>
    </div>
    <div className="flex justify-center gap-10 items-center w-full">
  
      {menu.slice() 
    .reverse().map(({ id, href, rowInfo, icon }) => {
        return (
            <RowInMenu href={href} rowInfo={rowInfo} icon={icon} />
        );
      })}
    </div>
    <div>
    {isAdminButton&& <Button onClick={onClickMenu}>
        {isAdminMenu ? NavBarText.backToUserMenu : NavBarText.AdminMenu}
      </Button>}

      </div>
      <div className="flex items-center w-full justify-end">
          <button className="btn bg-emerald-700 hover:bg-emerald-800 text-sm text-white px-5 rounded-md font-assistant">
            {NavBarText.startLearning}
            <ContinueStudyingIcon />
          </button>
        </div>
      </nav>
  );
};

export default Navbar;
