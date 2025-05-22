import { useState, useEffect } from "react";
import { X } from "lucide-react";

export default function TableManagement({ isSidebarOpen = true }) {
  const [showAddTableModal, setShowAddTableModal] = useState(false);
  const [newTableType, setNewTableType] = useState("Petite 1-2 personne");
  const [newTableNumber, setNewTableNumber] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [tables, setTables] = useState([]);
  const [windowWidth, setWindowWidth] = useState(
    typeof window !== "undefined" ? window.innerWidth : 0
  );

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);

    if (typeof window !== "undefined") {
      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }
  }, []);

  const getTableTypeFromSelection = (selection) => {
    if (selection.includes("Petite")) return "small";
    if (selection.includes("Moyenne")) return "medium";
    return "large";
  };

  const getSeatsFromSelection = (selection) => {
    if (selection.includes("Petite")) return 2;
    if (selection.includes("Moyenne")) return 6;
    return 12;
  };

  const generateTableNumber = () => {
    const randomNum = Math.floor(Math.random() * 100) + 1;
    setNewTableNumber(randomNum.toString());
  };

  const handleAddTable = () => {
    if (!newTableNumber) {
      alert("Veuillez entrer un numéro de table");
      return;
    }

    const newTable = {
      id: parseInt(newTableNumber),
      status: "disponible",
      type: getTableTypeFromSelection(newTableType),
      seats: getSeatsFromSelection(newTableType),
    };

    const tableExists = tables.some((table) => table.id === newTable.id);

    if (tableExists) {
      alert("Ce numéro de table existe déjà");
      return;
    }

    setTables([...tables, newTable]);
    setNewTableNumber("");
    setShowAddTableModal(false);
  };

  const toggleTableStatus = (id) => {
    setTables(
      tables.map((table) =>
        table.id === id
          ? {
              ...table,
              status: table.status === "disponible" ? "occupe" : "disponible",
            }
          : table
      )
    );
  };

  const removeTable = (id, e) => {
    e.stopPropagation();
    setTables(tables.filter((table) => table.id !== id));
  };

  const filteredTables = tables.filter((table) =>
    searchQuery ? table.id.toString().includes(searchQuery) : true
  );

  const getColumnsCount = () => {
    if (windowWidth < 640) return 1;
    if (windowWidth < 768) return 2;
    if (windowWidth < 1024) return isSidebarOpen ? 2 : 3;
    if (windowWidth < 1280) return isSidebarOpen ? 3 : 4;
    return isSidebarOpen ? 3 : 5;
  };

  const columnsCount = getColumnsCount();

  const tableRows = [];
  for (let i = 0; i < filteredTables.length; i += columnsCount) {
    tableRows.push(filteredTables.slice(i, i + columnsCount));
  }

  const TableComponent = ({ table }) => {
    const isAvailable = table.status === "disponible";

    const SmallTableSVG = ({ table }) => (
      <div className="relative  w-full h-48 flex items-center justify-center">
        <svg
          width="170"
          height="170"
          viewBox="0 0 59 47"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect
            x="7.17969"
            y="0.943726"
            width="44.5594"
            height="45.4688"
            rx="6.82031"
            fill="#200E32"
            style={{ cursor: "pointer" }}
            onClick={() => toggleTableStatus(table.id)}
          />
          
          <path
            d="M0.359375 18.2218C0.359375 16.9662 1.37723 15.9484 2.63281 15.9484H4.90625V31.8624H2.63281C1.37723 31.8624 0.359375 30.8446 0.359375 29.589V18.2218Z"
            fill="#200E32"
          />
          <path
            d="M58.5625 18.2218C58.5625 16.9662 57.5446 15.9484 56.2891 15.9484H54.0156V31.8624H56.2891C57.5446 31.8624 58.5625 30.8446 58.5625 29.589V18.2218Z"
            fill="#200E32"
          />
          
          
          
        </svg>
         <div className=" top-[50%] cursor-pointer text-white left-[50%] -translate-x-[50%] -translate-y-[50%]  absolute  flex flex-col items-center gap-3 " >
            <p onClick={() => toggleTableStatus(table.id)} > {isAvailable ? "Disponible" : "Occupé"} </p>
            <p className=" bg-secondary rounded-xl py-1 px-3 " > {table.id} </p>
        </div>
      </div>
    );

    const MediumTableSVG = ({ table }) => (
      <div className="relative  w-full h-48 flex items-center justify-center">
        <svg
          width="250"
          height="150"
          viewBox="0 0 102 61"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect
            x="7"
            y="7.94"
            width="87.75"
            height="45.47"
            rx="6.82"
            fill="#200E32"
            style={{ cursor: "pointer" }}
            onClick={() => toggleTableStatus(table.id)}
          />
          
          <path
            d="M0.414062 25.2218C0.414062 23.9662 1.43192 22.9484 2.6875 22.9484H4.96094V38.8624H2.6875C1.43192 38.8624 0.414062 37.8446 0.414062 36.589V25.2218Z"
            fill="#200E32"
          />
          <path
            d="M101.812 25.2218C101.812 23.9662 100.795 22.9484 99.5391 22.9484H97.2656V38.8624H99.5391C100.795 38.8624 101.812 37.8446 101.812 36.589V25.2218Z"
            fill="#200E32"
          />
          <path
            d="M39.9688 0.668701C41.2243 0.668701 42.2422 1.68655 42.2422 2.94214V5.21558L26.3281 5.21558V2.94214C26.3281 1.68655 27.346 0.668701 28.6016 0.668701L39.9688 0.668701Z"
            fill="#200E32"
          />
          <path
            d="M71.7969 0.668701C73.0525 0.668701 74.0703 1.68655 74.0703 2.94214V5.21558L58.1562 5.21558V2.94214C58.1562 1.68655 59.1741 0.668701 60.4297 0.668701L71.7969 0.668701Z"
            fill="#200E32"
          />
          <path
            d="M60.4297 60.6875C59.1741 60.6875 58.1562 59.6696 58.1562 58.4141V56.1406H74.0703V58.4141C74.0703 59.6696 73.0525 60.6875 71.7969 60.6875H60.4297Z"
            fill="#200E32"
          />
          <path
            d="M28.6016 60.6875C27.346 60.6875 26.3281 59.6696 26.3281 58.4141V56.1406H42.2422V58.4141C42.2422 59.6696 41.2243 60.6875 39.9688 60.6875H28.6016Z"
            fill="#200E32"
          />
          
          
         
        </svg>
        <div className=" top-[50%] cursor-pointer text-white left-[50%] -translate-x-[50%] -translate-y-[50%]  absolute  flex flex-col items-center gap-3 " >
            <p onClick={() => toggleTableStatus(table.id)} > {isAvailable ? "Disponible" : "Occupé"} </p>
            <p className=" bg-secondary rounded-xl py-1 px-3 " > {table.id} </p>
        </div>
      </div>
    );

    const LargeTableSVG = ({ table }) => (
      <div className="relative w-full  h-48 flex items-center justify-center">
        <svg
          width="360"
          height="360"
          viewBox="0 0 140 80"
          preserveAspectRatio="xMidYMid meet"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M48.6406 73.3812C47.385 73.3812 46.3672 72.3634 46.3672 71.1078V68.8344H62.2812V71.1078C62.2812 72.3634 61.2634 73.3812 60.0078 73.3812H48.6406Z"
            fill="#200E32"
          />
          <path
            d="M16.8125 73.3812C15.5569 73.3812 14.5391 72.3634 14.5391 71.1078V68.8344H30.4531V71.1078C30.4531 72.3634 29.4353 73.3812 28.1797 73.3812H16.8125Z"
            fill="#200E32"
          />
          <path
            d="M105.477 73.3812C104.221 73.3812 103.203 72.3634 103.203 71.1078V68.8344H119.117V71.1078C119.117 72.3634 118.099 73.3812 116.844 73.3812H105.477Z"
            fill="#200E32"
          />
          <path
            d="M73.6484 73.3812C72.3929 73.3812 71.375 72.3634 71.375 71.1078V68.8344H87.2891V71.1078C87.2891 72.3634 86.2712 73.3812 85.0156 73.3812H73.6484Z"
            fill="#200E32"
          />
          <path
            d="M85.9297 0.631226C87.1853 0.631226 88.2031 1.64908 88.2031 2.90466V5.1781L72.2891 5.1781V2.90466C72.2891 1.64908 73.3069 0.631226 74.5625 0.631226L85.9297 0.631226Z"
            fill="#200E32"
          />
          <path
            d="M117.758 0.631226C119.013 0.631226 120.031 1.64908 120.031 2.90466V5.1781L104.117 5.1781V2.90466C104.117 1.64908 105.135 0.631226 106.391 0.631226L117.758 0.631226Z"
            fill="#200E32"
          />
          <path
            d="M29.0938 0.631226C30.3493 0.631226 31.3672 1.64908 31.3672 2.90466V5.1781L15.4531 5.1781V2.90466C15.4531 1.64908 16.471 0.631226 17.7266 0.631226L29.0938 0.631226Z"
            fill="#200E32"
          />
          <path
            d="M60.9219 0.631226C62.1775 0.631226 63.1953 1.64908 63.1953 2.90466V5.1781L47.2812 5.1781V2.90466C47.2812 1.64908 48.2991 0.631226 49.5547 0.631226L60.9219 0.631226Z"
            fill="#200E32"
          />
          <path
            d="M135.031 21.0922C135.031 19.8366 134.013 18.8187 132.758 18.8187H130.484V34.7328H132.758C134.013 34.7328 135.031 33.7149 135.031 32.4594V21.0922Z"
            fill="#200E32"
          />
          <path
            d="M135.031 42.0078C135.031 40.7522 134.013 39.7344 132.758 39.7344H130.484V55.6484H132.758C134.013 55.6484 135.031 54.6306 135.031 53.375V42.0078Z"
            fill="#200E32"
          />
          <path
            d="M0.445313 53.375C0.445313 54.6306 1.46317 55.6484 2.71875 55.6484H4.99219L4.99219 39.7344H2.71875C1.46317 39.7344 0.445313 40.7522 0.445313 42.0078L0.445313 53.375Z"
            fill="#200E32"
          />
          <path
            d="M0.445313 32.4594C0.445313 33.7149 1.46317 34.7328 2.71875 34.7328H4.99219L4.99219 18.8187H2.71875C1.46317 18.8187 0.445313 19.8366 0.445313 21.0922L0.445313 32.4594Z"
            fill="#200E32"
          />
          <rect
            x="7.71875"
            y="7.90625"
            width="120.492"
            height="58.2"
            rx="6.82031"
            fill="#200E32"
            style={{ cursor: "pointer" }}
            onClick={() => toggleTableStatus(table.id)}
          />
         
          <text
            x="68"
            y="35"
            textAnchor="middle"
            fill="white"
            fontSize="6"
            fontFamily="sans-serif"
            fontWeight="bold"
            style={{ cursor: "pointer" }}
            
          >
            
          </text>
          
         
        </svg>
        <div className=" top-[50%] cursor-pointer text-white left-[50%] -translate-x-[50%] -translate-y-[50%]  absolute  flex flex-col items-center gap-3 " >
            <p onClick={() => toggleTableStatus(table.id)} > {isAvailable ? "Disponible" : "Occupé"} </p>
            <p className=" bg-secondary rounded-xl py-1 px-3 " > {table.id} </p>
        </div>
      </div>
    );

    if (table.type === "small") {
      return <SmallTableSVG table={table} />;
    } else if (table.type === "medium") {
      return <MediumTableSVG table={table} />;
    } else {
      return <LargeTableSVG table={table} />;
    }
  };

  useEffect(() => {
    if (tables.length === 0) {
      setTables([
        { id: 1, status: "disponible", type: "small", seats: 2 },
        { id: 2, status: "occupe", type: "small", seats: 2 },
        { id: 3, status: "disponible", type: "medium", seats: 6 },
        { id: 4, status: "disponible", type: "small", seats: 2 },
        { id: 5, status: "disponible", type: "medium", seats: 6 },
        { id: 6, status: "disponible", type: "large", seats: 12 },
        { id: 7, status: "disponible", type: "large", seats: 12 },
      ]);
    }
  }, []);

  return (
    <div className=" min-h-dvh">
      <div className="w-full">
        <div className="flex flex-col sm:flex-row justify-between items-start gap-4 ">
          
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
                placeholder="Entrer le numéro de la table..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
           
         

          <button
            className="bg-primary text-sm hover:bg-secondary transition-all text-white rounded-full px-4 py-[10px] flex items-center whitespace-nowrap"
            onClick={() => setShowAddTableModal(true)}
          >
            <svg
              className="w-5 h-5 mr-1 flex-shrink-0"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 6v6m0 0v6m0-6h6m-6 0H6"
              />
            </svg>
            Ajouter une table
          </button>
        </div>

        <div className="py-2 gap-6 ">
          {tableRows.map((row, rowIndex) => (
            <div
              key={rowIndex}
              className={`   ${
                columnsCount === 2
                  ? "grid sm:grid-cols-2"
                  : columnsCount === 3
                  ? "grid sm:grid-cols-2 md:grid-cols-3"
                  : columnsCount === 4
                  ? "grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
                  : "flex flex-col gap-96"
              }`}
            >
              {row.map((table) => (
                <div
                  key={table.id}
                  className="w-full items-center p-3  flex justify-center"
                >
                  <TableComponent table={table} />
                </div>
              ))}
            </div>
          ))}

          {filteredTables.length === 0 && (
            <div className="text-center py-8">
              <p className="text-gray-600">Aucune table trouvée</p>
            </div>
          )}
        </div>
      </div>

      {showAddTableModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-4 sm:p-6 w-full max-w-md shadow-lg relative">
            <button
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
              onClick={() => setShowAddTableModal(false)}
              aria-label="Fermer"
            >
              <X size={20} />
            </button>

            <h2 className="text-xl text-red-500 font-semibold mb-6 text-center">
              Ajouter une table
            </h2>

            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">
                Type de table
              </label>
              <div className="relative">
                <select
                  className="w-full p-2 border rounded-lg appearance-none pr-8 focus:outline-none focus:ring-2 focus:ring-red-400"
                  value={newTableType}
                  onChange={(e) => setNewTableType(e.target.value)}
                >
                  <option>Petite 1-2 personne</option>
                  <option>Moyenne 3-6 personnes</option>
                  <option>Grande 7-12 personnes</option>
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                  <svg
                    className="w-4 h-4 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </div>
              </div>
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium mb-1">
                Numéro de table
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  className="flex-grow p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400"
                  placeholder="32"
                  value={newTableNumber}
                  onChange={(e) =>
                    setNewTableNumber(e.target.value.replace(/[^0-9]/g, ""))
                  }
                />
                <button
                  className="bg-red-500 text-white px-3 py-2 rounded-lg hover:bg-red-600"
                  onClick={generateTableNumber}
                >
                  Générer
                </button>
              </div>
            </div>

            <div className="flex justify-center">
              <button
                className="bg-red-500 text-white py-2 px-8 rounded-lg hover:bg-red-600 w-full"
                onClick={handleAddTable}
              >
                Confirmer
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
