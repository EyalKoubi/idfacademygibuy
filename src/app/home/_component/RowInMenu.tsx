import { SidebarText } from "@/HebrewStrings/Texts";
import useAppState from "@/app/_contexts/globalContext";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

interface RowInMenu {
  href: string;
  rowInfo: string;
  icon: React.ReactNode;
}

const RowInMenu:React.FC<RowInMenu> = ({ rowInfo, href, icon }) => {
  const { isMenuButtonPressed } = useAppState();
  const router = useRouter();

  const clickHandeller = () => {
    //if (!isMenuButtonPressed) return; //for do if its icons menu its will be clickable
    switch (rowInfo) {
      case SidebarText.logout:
        signOut({ redirect: false }).then(() => {
          router.push(href);
        });
        break;
      default:
        router.push(href);
    }
  };

  return (
    <li className="hover:bg-green-400 p-2 rounded-md">
      <button className="w-full text-left" onClick={clickHandeller}>
        <div className="flex justify-between items-center space-x-2">
            <>
              <i className="fas fa-home"></i> {rowInfo}
            </>
          {icon}
        </div>
      </button>
    </li>
  );
};

export default RowInMenu;
