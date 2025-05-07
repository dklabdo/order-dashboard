import React, { useState } from "react";
import LeftMenu from "../components/LeftMenu";
import TableManagement from "../components/TableManager";
import EmployeeManagement from "../components/EmployeeManagement";

function AccountPage() {
  const [activeLeftMenu, setActiveLeftMenu] = useState('table');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  function handleLeftMenuChange(menu) {
    setActiveLeftMenu(menu);
    setIsSidebarOpen(false);
  }

  return (
    <div className="flex flex-col md:flex-row h-full overflow-hidden">
      <div className={`md:block md:flex-shrink-0 ${isSidebarOpen ? 'fixed inset-0 z-40 bg-gray-900 bg-opacity-50' : 'hidden'}`}>
        <div className="h-full md:sticky md:top-0">
          <LeftMenu
            activeItem={activeLeftMenu}
            onMenuChange={handleLeftMenuChange}
            isOpen={isSidebarOpen}
            setIsOpen={setIsSidebarOpen}
            className="w-64 h-full bg-white md:border-r border-gray-200"
          />
        </div>
      </div>

      <button 
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        className="fixed bottom-4 left-4 z-50 bg-blue-600 text-white p-3 rounded-full shadow-lg md:hidden"
      >
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          className="h-6 w-6" 
          fill="none" 
          viewBox="0 0 24 24" 
          stroke="currentColor"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={2} 
            d="M4 6h16M4 12h16M4 18h16" 
          />
        </svg>
      </button>

      <div className="flex-1 overflow-auto">
        <div className="p-4 md:p-6 bg-gray-50">
          {activeLeftMenu === "employee" ? (
            <EmployeeManagement />
          ) : activeLeftMenu === "table" ? (
            <TableManagement />
          ) : (
            <div className="bg-white rounded-lg shadow p-4">
              <p>Content for {activeLeftMenu} will go here</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default AccountPage;