import React from "react";
import { NavItem } from "./Sidebar";

function MobileSideBar() {
  return (
    <div className="w-full md:hidden h-dvh flex  ">
      <div className="w-[85%] bg-primary flex flex-col justify-between pr-6 pl-3 py-3 h-dvh">
        <div className="bg-[#200E32] p-4 rounded-lg flex items-center justify-center">
          <img
            src="/public/logo-removebg-preview.png"
            className="w-20 h-auto"
            alt="Logo"
          />
        </div>
        <div className="flex scale-95 flex-col gap-3 p-3">
          <NavItem
            icon="user"
            text="Compte"
            active={activeNav === "Compte"}
            path="/"
          />
          <NavItem
            icon="menu"
            text="Menu"
            active={activeNav === "Menu"}
            path="/menu"
          />
          <NavItem
            icon="clipboard"
            text="Commandes"
            active={activeNav === "Commandes"}
            path="/commandes"
          />
          <NavItem
            icon="package"
            text="Stock"
            path="/stock"
            active={activeNav === "Stock"}
          />
          <NavItem
            icon="bar-chart"
            text="Statestique"
            path="/statestique"
            active={activeNav === "Statestique"}
          />
          <NavItem
            icon="credit-card"
            text="Finance"
            path="/finance"
            active={activeNav === "Finance"}
          />
          <NavItem
            icon="clock"
            text="Historique"
            path="/historique"
            active={activeNav === "Historique"}
          />
        </div>
      </div>
      <div className="w-[15%] z-50 bg-black/50 h-dvh"></div>
    </div>
  );
}

export default MobileSideBar;
