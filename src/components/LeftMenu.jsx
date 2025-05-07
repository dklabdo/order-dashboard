import { useEffect } from 'react';

export default function LeftMenu({ activeItem, onMenuChange, isOpen, setIsOpen }) {
  useEffect(() => {
    if (isOpen && window.innerWidth < 1024) {
      document.body.style.position = 'fixed';
      document.body.style.width = '100%';
    } else {
      document.body.style.position = '';
      document.body.style.width = '';
    }

    return () => {
      document.body.style.position = '';
      document.body.style.width = '';
    };
  }, [isOpen]);

  const menuItems = [
    { id: 'table', name: 'Table management', icon: TableIcon },
    { id: 'employee', name: 'Employee management', icon: EmployeeIcon },
    { id: 'type', name: 'Type et categorie', icon: TypeIcon },
    { id: 'suplement', name: 'Suplement', icon: SuplementIcon },
    { id: 'imprimantes', name: 'Imprimantes', icon: PrinterIcon },
    { id: 'ecrans', name: 'Ecrans', icon: ScreenIcon },
    { id: 'bornes', name: 'Bornes', icon: BornesIcon }
  ];

  return (
    <>
      <div className={`
        fixed lg:static 
        inset-y-0 left-0 
        transform ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        lg:translate-x-0 
        transition-transform duration-300 ease-in-out
        w-16 lg:w-64 bg-white flex flex-col gap-4 p-3 lg:p-6
        z-50 shadow-lg lg:shadow-none
        h-screen overflow-y-auto
      `}>
        {menuItems.map(item => (
          <div
            key={item.id}
            className={`flex items-center gap-2 p-4 rounded-lg relative cursor-pointer transition-colors duration-200
              ${activeItem === item.id
                ? 'bg-red-100 text-red-500'
                : 'text-gray-700 hover:bg-gray-100'}`}
            onClick={() => {
              onMenuChange(item.id);
              if (window.innerWidth < 1024) setIsOpen(false);
            }}
          >
            <div className="w-5 h-5 flex items-center justify-center">
              <item.icon />
            </div>
            <span className="hidden lg:inline text-sm font-medium">{item.name}</span>

            {activeItem === item.id && (
              <div className="absolute right-0 top-0 h-full w-1 bg-red-500 rounded-l"></div>
            )}
          </div>
        ))}
      </div>

      {isOpen && (
        <div 
          className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40 touch-none overflow-hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
}

// Icon components
function TableIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 16C14.2091 16 16 14.2091 16 12C16 9.79086 14.2091 8 12 8C9.79086 8 8 9.79086 8 12C8 14.2091 9.79086 16 12 16Z" stroke="currentColor" strokeWidth="1.5" fill="none"/>
      <path d="M12 8V4" stroke="currentColor" strokeWidth="1.5"/>
      <path d="M12 20V16" stroke="currentColor" strokeWidth="1.5"/>
      <path d="M8 12H4" stroke="currentColor" strokeWidth="1.5"/>
      <path d="M20 12H16" stroke="currentColor" strokeWidth="1.5"/>
    </svg>
  );
}

function EmployeeIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="8" r="4" stroke="currentColor" strokeWidth="1.5" fill="none"/>
      <path d="M5 18C5 15.7909 6.79086 14 9 14H15C17.2091 14 19 15.7909 19 18V20H5V18Z" stroke="currentColor" strokeWidth="1.5" fill="none"/>
    </svg>
  );
}

function TypeIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M4 6H20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M4 12H20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M4 18H20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <circle cx="8" cy="6" r="1" fill="currentColor"/>
      <circle cx="8" cy="12" r="1" fill="currentColor"/>
      <circle cx="8" cy="18" r="1" fill="currentColor"/>
    </svg>
  );
}

function SuplementIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M14 6L8 12L14 18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <rect x="3" y="3" width="10" height="5" rx="1" transform="rotate(45 7 8)" stroke="currentColor" strokeWidth="1.5" fill="none"/>
    </svg>
  );
}

function PrinterIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="6" y="3" width="12" height="4" stroke="currentColor" strokeWidth="1.5" fill="none"/>
      <rect x="6" y="17" width="12" height="4" stroke="currentColor" strokeWidth="1.5" fill="none"/>
      <rect x="4" y="7" width="16" height="10" rx="2" stroke="currentColor" strokeWidth="1.5" fill="none"/>
      <circle cx="17" cy="11" r="1" fill="currentColor"/>
    </svg>
  );
}

function ScreenIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="3" y="4" width="18" height="12" rx="2" stroke="currentColor" strokeWidth="1.5" fill="none"/>
      <path d="M9 20H15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M12 16V20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  );
}

function BornesIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M9 4L4 9L9 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M5 9H16C18.2091 9 20 10.7909 20 13V19" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  );
}