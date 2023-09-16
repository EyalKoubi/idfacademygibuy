import { SidebarText } from "@/HebrewStrings/Texts";
import useAppState from "@/app/_contexts/globalContext";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

interface RowInMenu {
  rowInfo: string;
  icon: React.ReactNode;
}

const RowInMenu = ({ rowInfo, icon }: RowInMenu) => {
  const { isMenuButtonPressed, setIsPopupMessagePressed } = useAppState();
  const router = useRouter();

  const clickHandeller = () => {
    if (!isMenuButtonPressed) return;
    switch (rowInfo) {
      case SidebarText.aboutUs:
        return setIsPopupMessagePressed(true);
      case SidebarText.logout:
        return signOut({ redirect: false }).then(() => {
          router.push("/");
        });
      default:
    }
  };

  return (
    <li className="bg-blue-100 p-2 rounded-md">
      <button className="w-full text-left" onClick={clickHandeller}>
        <div className="flex justify-between items-center space-x-2">
          {isMenuButtonPressed && (
            <>
              <i className="fas fa-home"></i> {rowInfo}
            </>
          )}
          {icon}
        </div>
      </button>
    </li>
  );
};

export default RowInMenu;
