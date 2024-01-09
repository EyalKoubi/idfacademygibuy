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
    <div>
      <button className="text-xl text-slate-900 hover:text-slate-600 font-assistant" onClick={clickHandeller}>
        <div className="flex justify-between items-center space-x-2">
          
            <div className="min-w-32">
              <i className="fas fa-home"></i> {rowInfo}
            </div>
           {icon}
        </div>
      </button>
    </div>
  );
};

export default RowInMenu;
