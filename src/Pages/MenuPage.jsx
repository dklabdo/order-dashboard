import React, { useState } from "react";
import AddMenuCard from "../components/AddMenuCard";
import MenuItemForm from "../components/MenuItemForm";
import MenuCard from "../components/MenuCard";

function MenuPage() {
  const categories = [
    "All",
    "Pizza",
    "Box",
    "Gratin",
    "Soupes",
    "Burgers",
    "Salades",
    "Sandwich",
  ];

  const [activeCategory, setActiveCategory] = useState("All");
  const [showForm, setShowForm] = useState(false);
  const [editingItem, setEditingItem] = useState(null);

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

  const [menuItems, setMenuItems] = useState([
    {
      id: 1,
      name: "Double cheese",
      ingredients: "Viande, Ketchup, Salade",
      price: "900DA",
      image:
        "https://images.unsplash.com/photo-1618930858009-2d44cdcf7027?auto=format&fit=crop&w=400&q=80",
      category: "Burgers",
    },
    {
      id: 2,
      name: "Pizza napolitano",
      ingredients: "Sauce rouge, Mozza, Olive",
      price: "800DA",
      image:
        "https://images.unsplash.com/photo-1618930871848-142d9c84c618?auto=format&fit=crop&w=400&q=80",
      category: "Pizza",
    },
    {
      id: 3,
      name: "Double cheese",
      ingredients: "Viande, Ketchup, Salade",
      price: "900DA",
      image:
        "https://images.unsplash.com/photo-1618930858009-2d44cdcf7027?auto=format&fit=crop&w=400&q=80",
      category: "Burgers",
    },
    {
      id: 4,
      name: "Pizza napolitano",
      ingredients: "Sauce rouge, Mozza, Olive",
      price: "800DA",
      image:
        "https://images.unsplash.com/photo-1618930871848-142d9c84c618?auto=format&fit=crop&w=400&q=80",
      category: "Pizza",
    },
    {
      id: 5,
      name: "Pizza napolitano",
      ingredients: "Sauce rouge, Mozza, Olive",
      price: "800DA",
      image:
        "https://images.unsplash.com/photo-1618930871848-142d9c84c618?auto=format&fit=crop&w=400&q=80",
      category: "Pizza",
    },
    {
      id: 6,
      name: "Double cheese",
      ingredients: "Viande, Ketchup, Salade",
      price: "900DA",
      image:
        "https://images.unsplash.com/photo-1618930858009-2d44cdcf7027?auto=format&fit=crop&w=400&q=80",
      category: "Burgers",
    },
  ]);

  return (
    <div className="flex flex-col h-svh relative isolate">
      {/* Category Slider remains unchanged */}
      <div className="bg-white p-4 sticky top-0 z-[100] shadow-md isolate">
        <div className="flex space-x-3 overflow-x-auto pb-2 scrollbar-hide -mx-4 px-4">
          {categories.map((category) => (
            <button
              key={category}
              className={`px-4 py-2 rounded-full whitespace-nowrap flex-shrink-0 ${
                activeCategory === category
                  ? "bg-red-500 text-white"
                  : "bg-gray-200 text-gray-800 hover:bg-red-200"
              }`}
              onClick={() => setActiveCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      <div className="flex-1 bg-white overflow-y-auto px-2 sm:px-4 pt-4 pb-8 relative z-0">
        {showForm ? (
          <MenuItemForm onSave={handleSaveItem} item={editingItem} />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 pr-5 md:grid-cols-2 pr-5 lg:grid-cols-3 2xl:grid-cols-4 gap-4 md:gap-8 w-full max-w-[2000px] mx-auto">
            <div onClick={handleAddNewItem} className="flex justify-center w-full p-4">
              <AddMenuCard />
            </div>

            {menuItems
              .filter(
                (item) =>
                  activeCategory === "All" || item.category === activeCategory
              )
              .map((item) => (
                <div 
                  key={item.id} 
                  onClick={() => handleEditItem(item)} 
                  className="flex justify-center w-full p-4 pl-[20px]"
                >
                  <MenuCard item={item}  />
                </div>
              ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default MenuPage;
