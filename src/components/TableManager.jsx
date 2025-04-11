import { useState } from 'react';
import { X } from 'lucide-react';

export default function TableManagement() {
  const [tables, setTables] = useState([
    { id: 1, status: 'disponible', type: 'large' },
    { id: 2, status: 'occupe', type: 'medium' },
    { id: 3, status: 'disponible', type: 'large' },
    { id: 4, status: 'disponible', type: 'medium' },
    { id: 5, status: 'disponible', type: 'medium' },
    { id: 6, status: 'disponible', type: 'small' },
    { id: 7, status: 'disponible', type: 'large' },
    { id: 8, status: 'disponible', type: 'large' },
  ]);
  
  const [showAddTableModal, setShowAddTableModal] = useState(false);
  const [newTableType, setNewTableType] = useState('Petite 1-2 personne');
  const [newTableNumber, setNewTableNumber] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Function to determine table type based on selection
  const getTableTypeFromSelection = (selection) => {
    if (selection.includes('Petite')) return 'small';
    if (selection.includes('Moyenne')) return 'medium';
    return 'large';
  };
  
  // Generate a random table number
  const generateTableNumber = () => {
    const randomNum = Math.floor(Math.random() * 100) + 1;
    setNewTableNumber(randomNum.toString());
  };
  
  // Handle adding a new table
  const handleAddTable = () => {
    if (!newTableNumber) {
      alert("Veuillez entrer un numéro de table");
      return;
    }
    
    // Create a new table object
    const newTable = {
      id: parseInt(newTableNumber),
      status: 'disponible',
      type: getTableTypeFromSelection(newTableType),
    };
    
    // Check if a table with the same ID already exists
    const tableExists = tables.some(table => table.id === newTable.id);
    
    if (tableExists) {
      alert("Ce numéro de table existe déjà");
      return;
    }
    
    // Add the new table to the tables array
    setTables([...tables, newTable]);
    
    // Reset form and close modal
    setNewTableNumber('');
    setShowAddTableModal(false);
  };

  // Function to remove a table
  const removeTable = (id) => {
    setTables(tables.filter(table => table.id !== id));
  };

  // Filter tables based on search query
  const filteredTables = tables.filter(table => 
    searchQuery ? table.id.toString().includes(searchQuery) : true
  );

  return (
    <div className="bg-gray-100 p-6">
      {/* Search bar and Add Table button */}
      <div className="flex justify-between mb-8">
        <div className="relative w-64">
          <input
            type="text"
            className="w-full border rounded-[8px] py-2 px-3 text-sm"
            placeholder="entrer le numéro de la table"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        
        <button 
          className="bg-red-500 text-white rounded-full px-4 py-2 flex items-center"
          onClick={() => setShowAddTableModal(true)}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="mr-2">
            <line x1="12" y1="5" x2="12" y2="19" />
            <line x1="5" y1="12" x2="19" y2="12" />
          </svg>
          Ajouter une table
        </button>
      </div>
      
      {/* Tables Grid */}
      <div className="grid grid-cols-3 gap-6">
        {filteredTables.map((table) => (
          <div key={table.id} className="relative">
            <div className={`bg-[#200E32] text-white p-4 rounded-lg shadow flex flex-col items-center justify-center ${
              table.type === 'large' ? 'h-32' : table.type === 'medium' ? 'h-24' : 'h-20'
            }`}>
              <div className="absolute top-2 right-2">
                <div 
                  className="bg-red-500 rounded-full p-1 cursor-pointer"
                  onClick={() => removeTable(table.id)}
                >
                  <X size={12} color="white" />
                </div>
              </div>
              <div className="mb-2">
                {table.status === 'disponible' ? 'Disponible' : 'Occupé'}
              </div>
              <button className="bg-red-500 text-white text-sm rounded-[8px] px-3 py-1">
                Table {table.id}
              </button>
            </div>
            
            {/* Table Seats */}
            <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 flex space-x-1">
              <div className="w-3 h-3 bg-gray-800 rounded-full"></div>
              <div className="w-3 h-3 bg-gray-800 rounded-full"></div>
            </div>
            
            <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-1">
              <div className="w-3 h-3 bg-gray-800 rounded-full"></div>
              <div className="w-3 h-3 bg-gray-800 rounded-full"></div>
            </div>
            
            <div className="absolute -left-2 top-1/2 transform -translate-y-1/2 flex flex-col space-y-1">
              <div className="w-3 h-3 bg-gray-800 rounded-full"></div>
              <div className="w-3 h-3 bg-gray-800 rounded-full"></div>
            </div>
            
            <div className="absolute -right-2 top-1/2 transform -translate-y-1/2 flex flex-col space-y-1">
              <div className="w-3 h-3 bg-gray-800 rounded-full"></div>
              <div className="w-3 h-3 bg-gray-800 rounded-full"></div>
            </div>
          </div>
        ))}
      </div>
      
      {/* Add Table Modal */}
      {showAddTableModal && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 w-96">
            <h2 className="text-xl font-bold text-red-400 mb-6 text-center">Ajouter une table</h2>
            
            <div className="mb-4">
              <label className="block text-sm mb-1">Type de table</label>
              <div className="relative">
                <select 
                  className="w-full p-2 border rounded appearance-none pr-8"
                  value={newTableType}
                  onChange={(e) => setNewTableType(e.target.value)}
                >
                  <option>Petite 1-2 personne</option>
                  <option>Moyenne 3-4 personnes</option>
                  <option>Grande 5+ personnes</option>
                </select>
                <div className="absolute right-3 top-3 pointer-events-none">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M6 9l6 6 6-6" />
                  </svg>
                </div>
              </div>
            </div>
            
            <div className="mb-6">
              <label className="block text-sm mb-1">Numéro de table</label>
              <div className="flex">
                <input
                  type="text"
                  className="flex-grow p-2 border rounded-full"
                  placeholder="32"
                  value={newTableNumber}
                  onChange={(e) => setNewTableNumber(e.target.value)}
                />
                <button 
                  className="bg-red-500 text-white px-3 py-2 rounded-full pl-4"
                  onClick={generateTableNumber}
                >
                  Générer
                </button>
              </div>
            </div>
            
            <button 
              className="w-full bg-red-500 text-white py-3 rounded-full"
              onClick={handleAddTable}
            >
              Confirm
            </button>
          </div>
        </div>
      )}
    </div>
  );
}