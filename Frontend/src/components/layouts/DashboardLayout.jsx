import React, { useContext, useState } from "react";
import { UserContext } from "../../context/userContext";
import NavBar from "./NavBar";
import SideMenu from "./SideMenu";

const DashboardLayout = ({ activeMenu, children }) => {
  const { user } = useContext(UserContext);
  const [openSideMenu, setOpenSideMenu] = useState(false);

  return (
    <div>
      <NavBar
        activeMenu={activeMenu}
        openSideMenu={openSideMenu}
        setOpenSideMenu={setOpenSideMenu}
      />
      {user && (
        <div className="flex">
          {/* Desktop SideMenu */}
          <div className="hidden lg:block w-64">
            <SideMenu activeMenu={activeMenu} />
          </div>

          {/* Mobile SideMenu */}
          {openSideMenu && (
            <div className="lg:hidden fixed top-[61px] left-0 w-64 h-[calc(100vh-61px)] bg-white z-40">
              <SideMenu activeMenu={activeMenu} />
            </div>
          )}

          {/* Main Content */}
          <div className="flex-1 px-5">{children}</div>
        </div>
      )}
    </div>
  );
};

export default DashboardLayout;
