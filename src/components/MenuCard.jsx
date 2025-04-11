import { Pencil, EyeOff, Trash2 } from 'lucide-react';

export default function MenuCard({ item }) {
  return (
    <div className="relative min-w-[216px] w-full max-w-[320px] h-[300px] rounded-2xl mt-7 bg-[#1f0b2f] text-white shadow-lg flex flex-col items-center pt-[55px]">
      {/* Floating Image with Pop Effect */}
      <div className="absolute top-[-33px] left-1/2 transform -translate-x-1/2 z-10 transition-transform duration-300 hover:scale-110">
        <img
          src="/burger.jpg"// Dynamic image from props
          alt={item.name}
          className="w-[148px] h-[112.35px] object-cover rounded-xl shadow-xl "
        />
      </div>

      {/* Content */}
      <div className="text-center px-3 flex-1 pt-[40px]">
        <h2 className="text-lg font-semibold-barlow-16px mt-2">{item.name}</h2>
        <p className="text-xs text-gray-300 mt-1 leading-snug">
          {item.ingredients}
        </p>
        <br/>
        <p className="text-white mt-2 font-bold text-sm">{item.price}</p>
      </div>

      {/* Actions */}
      <div className="w-full  h-[60px] rounded-b-2xl bg-[#561E3A] text-white grid grid-cols-3 divide-x divide-[#FF5152] text-[10px] font-medium">
        <button className="flex flex-col p-1 w-full h-full rounded-bl-2xl  items-center justify-center hover:bg-[#802139] transition">
          <Pencil size={14} />
          Modifier
        </button>
        <button className="flex flex-col p-1 items-center w-full h-full justify-center hover:bg-[#802139] transition">
          <EyeOff size={14} />
          Désactiver
        </button>
        <button className="flex flex-col p-1 w-full h-full rounded-br-2xl items-center justify-center hover:bg-[#802139] transition">
          <Trash2 size={14} />
          Supprimer
        </button>
      </div>
    </div>
  );
}
