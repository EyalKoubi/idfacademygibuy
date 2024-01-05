import HamburgerMenu from "./icons/HamburgerMenu";
import { HomeTexts,NavBarText } from "@/HebrewStrings/Texts";
import useAppState from "@/app/_contexts/globalContext";
import tikshuvPicture from "@/app/assets/tikshuv.png";
import { Users } from "@/app/types";
import Image from "next/image";
import { useRouter } from "next/router"; // Use "next/router" instead of "next/navigation"
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
    if(isAdminMenu){
      setMenu(user_menu);
    }
    else{
      setMenu(admin_menu);
    }
    setIsAdminMenu(!isAdminMenu)
  }
  useEffect(() => {
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
  }, [,userType]); 

 // const sidebarClass = isMenuButtonPressed ? "w-64" : "w-16";

  return (
   <header className={`bg-green-200 p-4 w-screen items-center`}>
  <div className={`p-4 flex flex-row justify-between`}>
    <ul className="flex flex-row-reverse space-x-2" style={{ listStyle: 'none', padding: 0 }}>
      {menu.map(({ id, href, rowInfo, icon }) => {
        return (
          <li key={id} style={{ display: 'inline-block' }}>
            <RowInMenu href={href} rowInfo={rowInfo} icon={icon} />
          </li>
        );
      })}
    </ul>
    <div className="flex items-center"> {/* Add a new flex container */}
      <Button onClick={onClickMenu}>
        {isAdminMenu ? NavBarText.AdminMenu : NavBarText.backToUserMenu}
      </Button>
      <Image src={tikshuvPicture} alt="Tikshuv" width={35} height={35} />
    </div>
  </div>
  <h1 className="text-white text-2xl font-semibold">IDF ACADEMY</h1>
</header>
  );
};

export default Navbar;
