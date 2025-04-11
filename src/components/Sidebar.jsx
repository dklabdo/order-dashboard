import { useState } from "react";
import { href, Link, useLocation, useParams } from "react-router-dom";

export default function Sidebar({ activeNav,  sidebarOpen, toggleSidebar }) {
  return (
    <>
      {/* Sidebar - Collapsible */}
      <div
        className={`${sidebarOpen ? 'w-72' : 'w-0'} text-white flex flex-col rounded-tr-3xl rounded-br-3xl transition-all duration-300 relative overflow-hidden`}
        style={{ backgroundColor: '#200E32' }}
      >
        <div className="bg-[#200E32] p-6 rounded-lg flex items-center justify-center">
          <img src="/public/logo-removebg-preview.png" className="w-32 h-auto" alt="Logo" />
        </div>

        <div className="flex flex-col space-y-6 p-6">
          <NavItem 
            icon="user" 
            text="Compte" 
            active={activeNav === 'Compte'} 
            path="/"
          />
          <NavItem 
            icon="clipboard" 
            text="Commandes" 
            active={activeNav === 'Commandes'} 
            path="/commandes"
          />
          <NavItem 
            icon="menu" 
            text="Menu" 
            active={activeNav === 'Menu'}
            path="/menu" 
          />
          <NavItem 
            icon="package" 
            text="Stock"
            path="/stock" 
            active={activeNav === 'Stock'} 
          />
          <NavItem 
            icon="bar-chart" 
            text="Statestique" 
            path="/statestique"
            active={activeNav === 'Statestique'} 
          />
          <NavItem 
            icon="credit-card" 
            text="Finance" 
            path="/finance"
            active={activeNav === 'Finance'} 
          />
          <NavItem 
            icon="clock" 
            text="Historique" 
            path="/historique"
            active={activeNav === 'Historique'} 
          />
        </div>
      </div>
      
      {/* Toggle sidebar button */}
      <div
        className={`absolute top-1/2 -translate-y-1/2 transition-all duration-300 z-10 ${
          sidebarOpen ? 'left-72 -translate-x-1/2' : '-left-3'
        }`}
      >        
        <button 
          onClick={toggleSidebar}
          className="bg-white hover:bg-red-400 text-red-500 rounded-full p-2"
        >
          
            <svg className={`w-6 transition-all h-6 ${sidebarOpen ? "rotate-0" : "rotate-180"} `} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 19l-7-7 7-7m8 14l-7-7 7-7"></path>
            </svg>
          
        </button>
      </div>
    </>
  );
}

// Navigation Item Component with onClick handler
function NavItem({ icon, text, active, path }) {
  console.log(location.pathname);
  console.log(path);

  const loc = useLocation(); // Get the current location from the router
  console.log(loc.pathname);
  
  return (
    <Link 
      to={path}
      className={`flex w-[80%] items-center space-x-3 px-3 py-3 transition-all rounded-full cursor-pointer ${loc.pathname === path ? 'bg-red-500 translate-x-3 ' : 'hover:bg-red-500 hover:translate-x-3'}`}
    >
      <div className="w-5 h-5 flex items-center justify-center">
        {icon === 'user' && <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>}
        {icon === 'clipboard' && <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"></path></svg>}
        {icon === 'menu' && <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>}
        {icon === 'package' && <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"></path></svg>}
        {icon === 'bar-chart' && <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path></svg>}
        {icon === 'credit-card' && <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"></path></svg>}
        {icon === 'clock' && <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>}
      </div>
      <span className="text-sm">{text}</span>
    </Link>
  );
}