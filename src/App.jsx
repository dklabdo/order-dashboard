import { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import MenuCard from './components/MenuCard';
import AddMenuCard from './components/AddMenuCard';
import MenuItemForm from './components/MenuItemForm';
import LeftMenu from './components/LeftMenu';
import EmployeeManagement from './components/EmployeeManagement';
import Header from './components/Header';
import TableManager from './components/TableManager'; // ✅ New import
import { Route, Routes } from 'react-router-dom';
import AccountPage from './Pages/AccountPage';
import MenuPage from './Pages/MenuPage';

export default function App() {
  const [activeNav, setActiveNav] = useState('Menu');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  
  const [user] = useState({
    name: 'Valentino',
    id: '4364514343',
  });

  

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleAddNewItem = () => {
    setEditingItem(null);
    setShowForm(true);
  };

  const handleEditItem = (item) => {
    setEditingItem(item);
    setShowForm(true);
  };

  const handleSaveItem = (formData) => {
    if (!formData) {
      setShowForm(false);
      return;
    }

    if (editingItem) {
      setMenuItems((prev) =>
        prev.map((item) => (item.id === editingItem.id ? { ...formData, id: editingItem.id } : item))
      );
    } else {
      const newId = Math.max(...menuItems.map((item) => item.id), 0) + 1;
      setMenuItems((prev) => [...prev, { ...formData, id: newId }]);
    }

    setShowForm(false);
  };

  

  
  // this useEffect is for reseting the form when switching between the views
  // it will reset the form when the activeNav changes
  useEffect(() => {
    console.log('Switching views, resetting form...');
    setShowForm(false);
    setEditingItem(null);
  }, [activeNav]);

  
  return (
    <div className="flex h-screen ">
      <Sidebar
        activeNav={activeNav}
        sidebarOpen={sidebarOpen}
        toggleSidebar={toggleSidebar}
      />

      <div className={`flex-1 flex flex-col overflow-hidden transition-all duration-300`}>
        <Header user={user} activeNav={activeNav} />
        {
          <Routes>
            <Route  path="/" element={<AccountPage />} />
            <Route  path="/menu" element={<MenuPage />} />
          </Routes>
        }
      </div>
    </div>
  );
}
