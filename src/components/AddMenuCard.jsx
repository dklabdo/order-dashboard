export default function AddMenuCard() {
  return (
    <div className="relative min-w-[216px] w-full max-w-[320px] h-[300px] rounded-xl mt-7 bg-white border-2 border-dashed border-gray-300 flex flex-col items-center justify-center cursor-pointer hover:border-red-400 transition-colors">
      <div className="text-center p-6">
        <div className="w-16 h-16 mx-auto mb-4 bg-red-100 rounded-full flex items-center justify-center">
          <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
          </svg>
        </div>
        <h3 className="text-lg font-medium text-gray-800">Add New Item</h3>
        <p className="text-sm text-gray-500 mt-2">Click to add a new menu item</p>
      </div>
    </div>
  );
}