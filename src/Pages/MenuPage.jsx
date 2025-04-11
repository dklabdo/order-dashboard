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
    <>
      <div className="bg-white p-4">
        <div className="flex space-x-2 overflow-x-auto">
          {categories.map((category) => (
            <button
              key={category}
              className={`px-4 py-2 rounded-full ${
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

      <div className="flex-1 bg-white overflow-y-auto px-4 pt-4 pb-8">
        {showForm ? (
          <MenuItemForm onSave={handleSaveItem} item={editingItem} />
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 px-5 gap-5">
            <div onClick={handleAddNewItem}>
              <AddMenuCard />
            </div>

            {menuItems
              .filter(
                (item) =>
                  activeCategory === "All" || item.category === activeCategory
              )
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
}

export default MenuPage;
