import { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import MenuCard from './components/MenuCard';
import AddMenuCard from './components/AddMenuCard';
import MenuItemForm from './components/MenuItemForm';
import LeftMenu from './components/LeftMenu';
import EmployeeManagement from './components/EmployeeManagement';
import Header from './components/Header';
import TableManager from './components/TableManager'; // ✅ New import

export default function App() {
  const [activeCategory, setActiveCategory] = useState('Pizza');
  const [activeNav, setActiveNav] = useState('Menu');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [activeLeftMenu, setActiveLeftMenu] = useState('table');
  const [user] = useState({
    name: 'Valentino',
    id: '4364514343',
  });

  const categories = [
    'All', 'Pizza', 'Box', 'Gratin', 'Soupes', 'Burgers', 'Salades', 'Sandwich',
  ];

  const [menuItems, setMenuItems] = useState([
    {
      id: 1,
      name: 'Double cheese',
      ingredients: 'Viande, Ketchup, Salade',
      price: '900DA',
      image: 'https://images.unsplash.com/photo-1618930858009-2d44cdcf7027?auto=format&fit=crop&w=400&q=80',
      category: 'Burgers',
    },
    {
      id: 2,
      name: 'Pizza napolitano',
      ingredients: 'Sauce rouge, Mozza, Olive',
      price: '800DA',
      image: 'https://images.unsplash.com/photo-1618930871848-142d9c84c618?auto=format&fit=crop&w=400&q=80',
      category: 'Pizza',
    },
    {
      id: 3,
      name: 'Double cheese',
      ingredients: 'Viande, Ketchup, Salade',
      price: '900DA',
      image: 'https://images.unsplash.com/photo-1618930858009-2d44cdcf7027?auto=format&fit=crop&w=400&q=80',
      category: 'Burgers',
    },
    {
      id: 4,
      name: 'Pizza napolitano',
      ingredients: 'Sauce rouge, Mozza, Olive',
      price: '800DA',
      image: 'https://images.unsplash.com/photo-1618930871848-142d9c84c618?auto=format&fit=crop&w=400&q=80',
      category: 'Pizza',
    },
    {
      id: 5,
      name: 'Pizza napolitano',
      ingredients: 'Sauce rouge, Mozza, Olive',
      price: '800DA',
      image: 'https://images.unsplash.com/photo-1618930871848-142d9c84c618?auto=format&fit=crop&w=400&q=80',
      category: 'Pizza',
    },
    {
      id: 6,
      name: 'Double cheese',
      ingredients: 'Viande, Ketchup, Salade',
      price: '900DA',
      image: 'https://images.unsplash.com/photo-1618930858009-2d44cdcf7027?auto=format&fit=crop&w=400&q=80',
      category: 'Burgers',
    },
  ]);

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

  const handleNavChange = (navItem) => {
    setActiveNav(navItem);
    setShowForm(false);
    setEditingItem(null);
  };

  const handleLeftMenuChange = (menuItem) => {
    setActiveLeftMenu(menuItem);
  };

  useEffect(() => {
    console.log('Switching views, resetting form...');
    setShowForm(false);
    setEditingItem(null);
  }, [activeNav]);

  const renderContent = () => {
    if (activeNav === 'Compte') {
      return (
        <div className="flex flex-1 overflow-hidden">
          <LeftMenu activeItem={activeLeftMenu} onMenuChange={handleLeftMenuChange} />
          <div className="flex-1 p-6 bg-gray-50 overflow-auto">
            {activeLeftMenu === 'employee' ? (
              <EmployeeManagement />
            ) : activeLeftMenu === 'table' ? (
              <TableManager /> // ✅ Render TableManager component here
            ) : (
              <div className="bg-white rounded-lg shadow p-4">
                <p>Content for {activeLeftMenu} will go here</p>
              </div>
            )}
          </div>
        </div>
      );
    } else if (activeNav === 'Menu') {
      return (
        <>
          <div className="bg-white p-4">
            <div className="flex space-x-2 overflow-x-auto">
              {categories.map((category) => (
                <button
                  key={category}
                  className={`px-4 py-2 rounded-full ${
                    activeCategory === category
                      ? 'bg-red-500 text-white'
                      : 'bg-gray-200 text-gray-800 hover:bg-red-200'
                  }`}
                  onClick={() => setActiveCategory(category)}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          <div className="flex-1 overflow-y-auto px-4 pt-4 pb-8">
            {showForm ? (
              <MenuItemForm onSave={handleSaveItem} item={editingItem} />
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                <div onClick={handleAddNewItem}>
                  <AddMenuCard />
                </div>

                {menuItems
                  .filter((item) => activeCategory === 'All' || item.category === activeCategory)
                  .map((item) => (
                    <div key={item.id} onClick={() => handleEditItem(item)}>
                      <MenuCard item={item} />
                    </div>
                  ))}
              </div>
            )}
          </div>
        </>
      );
    } else {
      return (
        <div className="flex-1 p-6 flex items-center justify-center">
          <div className="bg-white p-8 rounded-lg shadow-md text-center">
            <h2 className="text-2xl font-bold mb-4">{activeNav}</h2>
            <p>This section is under development.</p>
          </div>
        </div>
      );
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar
        activeNav={activeNav}
        setActiveNav={handleNavChange}
        sidebarOpen={sidebarOpen}
        toggleSidebar={toggleSidebar}
      />

      <div className={`flex-1 flex flex-col overflow-hidden transition-all duration-300`}>
        <Header user={user} activeNav={activeNav} />
        {renderContent()}
      </div>
    </div>
  );
}
