import { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import EmployeeManagement from './components/EmployeeManagement';
import Header from './components/Header';
import TableManager from './components/TableManager';
import { Route, Routes } from 'react-router-dom';
import AccountPage from './Pages/AccountPage';
import MenuPage from './Pages/MenuPage';

export default function App() {
  const [activeNav, setActiveNav] = useState('Menu');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [menuItems, setMenuItems] = useState([]); 

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


  useEffect(() => {
    console.log('Switching views, resetting form...');
    setShowForm(false);
    setEditingItem(null);
  }, [activeNav]);

  return (
    <div className="flex h-screen">
      <Sidebar
        activeNav={activeNav}
        sidebarOpen={sidebarOpen}
        toggleSidebar={toggleSidebar}
      />

      <div className="flex-1 flex flex-col overflow-hidden">
        <Header user={user} activeNav={activeNav} />
        <div className="flex-1 overflow-y-auto">
          <Routes>
            <Route path="/" element={<AccountPage />} />
            <Route path="/menu" element={<MenuPage />} />
            <Route
              path="/employee-management"
              element={<EmployeeManagement />}
            />
            <Route
              path="/table-manager"
              element={<TableManager />}
            />
          </Routes>
        </div>
      </div>
    </div>
  ); 
}

