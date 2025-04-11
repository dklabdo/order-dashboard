export default function Header({ user, activeNav }) {
  // The notification button should show only when "Compte" is active
  const showNotification = activeNav === 'Compte';
  
  return (
    <header className="bg-white px-4 py-2 flex justify-between items-center shadow-sm">
      <div className="flex items-center space-x-2">
        <div className="bg-gray-800 rounded-full w-8 h-8 flex items-center justify-center">
          <span className="text-white text-xs">{user.name.charAt(0)}</span>
        </div>
        <div>
          <h2 className="font-medium text-sm">{user.name}</h2>
          <p className="text-xs text-gray-500">{user.id}</p>
        </div>
      </div>
      
      <div className="flex space-x-2">
        {showNotification && (
          <button className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-full flex items-center text-sm">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"></path>
            </svg>
            <span className="ml-1">Notification</span>
          </button>
        )}
        
        <button className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-full flex items-center text-sm">
          <span className="mr-2">Deconnecter</span>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path>
          </svg>
        </button>
      </div>
    </header>
  );
}