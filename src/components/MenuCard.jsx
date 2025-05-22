import { Pencil, EyeOff, Trash2 } from 'lucide-react';

export default function MenuCard({ item }) {
  return (
    <div className="relative min-w-[150px] sm:min-w-[180px] md:min-w-[216px] w-full max-w-[280px] sm:max-w-[300px] md:max-w-[300px] min-h-[300px] h-fit   rounded-2xl mt-7 bg-[#1f0b2f] text-white shadow-lg flex flex-col items-center pt-[40px] sm:pt-[50px]">
      <div className="absolute top-[-25px] sm:top-[-33px] left-1/2 transform -translate-x-1/2 z-10 transition-transform duration-300 hover:scale-110">
        <img
          src="/burger.jpg"
          alt={item.name}
          className="w-[120px] h-[100px] sm:w-[120px] sm:h-[90px] md:w-[148px] md:h-[112.35px] object-cover rounded-xl shadow-xl "
        />
      </div>

      <div className="text-center px-3 flex-1 pt-[25px] sm:pt-[30px]">
        <h2 className="text-sm pt-4 sm:text-md md:text-lg font-semibold-barlow-16px ">{item.name}  </h2>
        <p className="text-[0.6rem] line-clamp-3 sm:text-xs text-gray-300 mt-1 leading-snug">
          {item.ingredients} 
        </p>
        <br/>
        <p className="text-white pb-3 font-bold text-sm">{item.price}</p>
      </div>

      <div className="w-full h-[50px] sm:h-[60px] rounded-b-2xl bg-[#561E3A] text-white grid grid-cols-3 divide-x divide-[#FF5152] text-[8px] sm:text-[10px] font-medium">
        <button className="flex flex-col p-1 w-full h-full rounded-bl-2xl items-center justify-center hover:bg-[#802139] transition">
          <Pencil size={12} sm:size={14} />
          Modifier
        </button>
        <button className="flex flex-col p-1 items-center w-full h-full justify-center hover:bg-[#802139] transition">
          <EyeOff size={12} sm:size={14} />
          Désactiver
        </button>
        <button className="flex flex-col p-1 w-full h-full rounded-br-2xl items-center justify-center hover:bg-[#802139] transition">
          <Trash2 size={12} sm:size={14} />
          Supprimer
        </button>
      </div>
    </div>
  );
}
