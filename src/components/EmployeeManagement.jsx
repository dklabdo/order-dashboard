import { useLayoutEffect, useRef, useState } from "react";

export default function EmployeeManagement() {
  const [employees, setEmployees] = useState([
    { id: 1, name: "Leshab Yasser", role: "Cuisine", date: "21/02/2024" },
    { id: 2, name: "Sayah Abdel-Ilah", role: "Serveur", date: "21/02/2024" },
    { id: 3, name: "Sayah Abdel-Ilah", role: "Serveur", date: "21/02/2024" },
    { id: 4, name: "Sayah Abdel-Ilah", role: "Serveur", date: "21/02/2024" },
    { id: 5, name: "Sayah Abdel-Ilah", role: "Serveur", date: "21/02/2024" },
    { id: 6, name: "Sayah Abdel-Ilah", role: "Serveur", date: "21/02/2024" },
    { id: 7, name: "Sayah Abdel-Ilah", role: "Serveur", date: "21/02/2024" },
    { id: 8, name: "Sayah Abdel-Ilah", role: "Serveur", date: "21/02/2024" },
    { id: 9, name: "Sayah Abdel-Ilah", role: "Serveur", date: "21/02/2024" },
    // More employees here
  ]);

  const [searchQuery, setSearchQuery] = useState("");
  const [showAddForm, setShowAddForm] = useState(false);
  const [newEmployee, setNewEmployee] = useState({ name: "", role: "" });

  // Filter employees based on search query
  const filteredEmployees = employees.filter((emp) =>
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
    const currentDate = new Date().toLocaleDateString("fr-FR");
    const newId =
      employees.length > 0
        ? Math.max(...employees.map((emp) => emp.id)) + 1
        : 1;

    setEmployees([
      ...employees,
      {
        id: newId,
        name: newEmployee.name,
        role: newEmployee.role,
        date: currentDate,
      },
    ]);

    setNewEmployee({ name: "", role: "" });
    setShowAddForm(false);
  };

  const container = useRef(null);
  function handleAddEmployee(){
    setShowAddForm(true);
    
  }

  useLayoutEffect(() => {
    if(container.current && showAddForm){
      container.current.scrollIntoView({
        behavior: "smooth",
        block: "end",
        inline: "nearest",
      });
    }else {
      container.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
        inline: "nearest",
      });
    }
  } , [showAddForm])

  return (
    <div ref={container} className="w-full relative  ">
      
      {" "}
      {/* Added padding for different screen sizes */}
      <div className="flex flex-col sm:flex-row justify-between items-start gap-4 mb-6">
        {" "}
        {/* Modified this line */}
        <div class="input-container w-[300px] max-w-[300px] ">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="lucide lucide-search-icon lucide-search"
          >
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.3-4.3" />
          </svg>
          <input
            className="w-full text-md text-primary border-[1.2px] border-gray-300 outline-none  "
            type="text"
            placeholder="Entrer le nom d'employée..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <button
          className="bg-primary  text-sm hover:bg-secondary transition-all text-white rounded-full px-4 py-[10px] flex items-center whitespace-nowrap"
          onClick={() => handleAddEmployee()}
        >
          <svg
            className="w-5 h-5 mr-1 flex-shrink-0"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 6v6m0 0v6m0-6h6m-6 0H6"
            ></path>
          </svg>
          Ajouter un employée
        </button>
      </div>
      <div className="bg-white  rounded-lg overflow-x-auto">
        <table className="min-w-full">
          <thead>
            <tr className="border-b">
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                Nom
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                Poste
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                Date d'embauche
              </th>
            </tr>
          </thead>
          <tbody className="bg-white">
            {filteredEmployees.length > 0 ? (
              filteredEmployees.reverse().map((employee) => (
                <tr key={employee.id} className="border-b">
                  <td className="px-6 py-4 whitespace-nowrap text-sm  text-black">
                    {employee.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-black">
                    {employee.role}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-black">
                    {employee.date}
                  </td>
                  <td className=" py-4 whitespace-nowrap text-sm text-black">
                    <button
                      className="text-red-500 hover:text-red-700"
                      onClick={() =>
                        setEmployees(
                          employees.filter((emp) => emp.id !== employee.id)
                        )
                      }
                    >
                      Supprimer
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3" className="px-6 py-4 text-center text-gray-500">
                  Aucun employé trouvé
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      {showAddForm && (
        <form
          id="add-employee-form"
          onSubmit={handleSubmit}
          className="mt-6 bg-white p-4 rounded-lg "
        >
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
          <div className="mt-4 flex flex-col sm:flex-row justify-end gap-4">
            <button
              type="button"
              className="bg-gray-300 text-gray-800 rounded-md py-2 px-6 w-full sm:w-auto"
              onClick={() => setShowAddForm(false)}
            >
              Annuler
            </button>
            <button
              type="submit"
              className="bg-red-500 text-white rounded-md py-2 px-6 w-full sm:w-auto"
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
