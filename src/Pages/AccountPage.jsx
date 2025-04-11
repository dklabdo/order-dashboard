import React, { useState } from "react";
import LeftMenu from "../components/LeftMenu";
import TableManagement from "../components/TableManager";
import EmployeeManagement from "../components/EmployeeManagement";

function AccountPage() {
      const [activeLeftMenu, setActiveLeftMenu] = useState('table');
      function handleLeftMenuChange(menu) {
        setActiveLeftMenu(menu);
      }
    
  return (
    <div className="flex flex-1 overflow-hidden">
      <LeftMenu
        activeItem={activeLeftMenu}
        onMenuChange={handleLeftMenuChange}
      />
      <div className="flex-1 p-6 bg-gray-50 overflow-auto">
        {activeLeftMenu === "employee" ? (
          <EmployeeManagement />
        ) : activeLeftMenu === "table" ? (
          <TableManagement /> // ✅ Render TableManager component here
        ) : (
          <div className="bg-white rounded-lg shadow p-4">
            <p>Content for {activeLeftMenu} will go here</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default AccountPage;
