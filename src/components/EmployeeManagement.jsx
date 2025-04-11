import { useState } from 'react';

export default function EmployeeManagement() {
  const [employees, setEmployees] = useState([
    { id: 1, name: 'Leshab Yasser', role: 'Cuisine', date: '21/02/2024' },
    { id: 2, name: 'Sayah Abdel-Ilah', role: 'Serveur', date: '21/02/2024' },
    // More employees here
  ]);
  
  const [searchQuery, setSearchQuery] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);
  const [newEmployee, setNewEmployee] = useState({ name: '', role: '' });

  // Filter employees based on search query
  const filteredEmployees = employees.filter(emp => 
    emp.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewEmployee({ ...newEmployee, [name]: value });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    const currentDate = new Date().toLocaleDateString('fr-FR');
    const newId = employees.length > 0 ? Math.max(...employees.map(emp => emp.id)) + 1 : 1;

    setEmployees([
      ...employees,
      { id: newId, name: newEmployee.name, role: newEmployee.role, date: currentDate }
    ]);

    setNewEmployee({ name: '', role: '' });
    setShowAddForm(false);
  };

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-6">
        <div className="relative w-1/3">
          <input
            type="text"
            className="w-full border border-gray-300 rounded-full py-2 px-4 pl-10 focus:outline-none focus:ring-2 focus:ring-red-500"
            placeholder="Entrer le nom d'employée..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <div className="absolute left-3 top-2.5">
            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
            </svg>
          </div>
        </div>

        <button
          className="bg-red-500 hover:bg-red-600 text-white rounded-full px-4 py-2 flex items-center"
          onClick={() => setShowAddForm(true)}
        >
          <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
          </svg>
          Ajouter un employée
        </button>
      </div>

      <div className="bg-white rounded-lg ">
        <table className="min-w-full"> 
          <tbody className="bg-white">
            {filteredEmployees.length > 0 ? (
              filteredEmployees.map((employee) => (
                <tr key={employee.id}>
                  <td className="px-6 py-4 text-sm font-medium text-black">{employee.name}</td>
                  <td className="px-6 py-4 text-sm text-black">{employee.role}</td>
                  <td className="px-6 py-4 text-sm text-black">{employee.date}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3" className="px-6 py-4 text-center text-gray-500">Aucun employé trouvé</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {showAddForm && (
        <form onSubmit={handleSubmit} className="mt-6 bg-white p-4 rounded-lg shadow-lg">
          <h3 className="text-lg font-semibold mb-4">Ajouter un Employée</h3>
          <div className="space-y-4">
            <input
              type="text"
              name="name"
              value={newEmployee.name}
              onChange={handleInputChange}
              className="w-full border border-gray-300 p-2 rounded-md"
              placeholder="Nom"
              required
            />
            <input
              type="text"
              name="role"
              value={newEmployee.role}
              onChange={handleInputChange}
              className="w-full border border-gray-300 p-2 rounded-md"
              placeholder="Poste"
              required
            />
          </div>
          <div className="mt-4 flex justify-end gap-4">
            <button
              type="button"
              className="bg-gray-300 text-gray-800 rounded-md py-2 px-6"
              onClick={() => setShowAddForm(false)}
            >
              Annuler
            </button>
            <button
              type="submit"
              className="bg-red-500 text-white rounded-md py-2 px-6"
              disabled={!newEmployee.name || !newEmployee.role}
            >
              Ajouter
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
