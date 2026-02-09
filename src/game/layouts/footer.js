import { FaHome, FaStore, FaUserFriends } from "react-icons/fa";
import { FaRankingStar, FaRectangleAd } from "react-icons/fa6";
import { useGame } from "../../utils/game";

const Footer = () => {
  const { game, setGame } = useGame();

  const items = [
    { page: 0, label: "Ana Sayfa", icon: <FaHome size={24} /> },
    { page: 5, label: "Arkadaşlar", icon: <FaUserFriends size={24} /> },
    { page: 12, label: "Mağaza", icon: <FaStore size={24} /> },
    { page: 9, label: "Reklam İzle", icon: <FaRectangleAd size={24} /> },
  ];

  return (
    <footer className="fixed bottom-0 w-full max-h-[80px] pt-4">
      <div className="relative flex justify-around items-center 
        bg-gradient-to-t from-green-950 via-green-800 to-green-900 
        border-t border-yellow-500/40 
        backdrop-blur-md 
        rounded-t-[2.5rem] 
        p-3 
        shadow-[0_-2px_10px_rgba(0,0,0,0.7)] overflow-hidden">

        {items.map(({ page, label, icon }) => {
          const active = game?.page === page;
          return (
            <button
              key={page}
              onClick={() => setGame((old) => ({ ...old, page }))}
              className={`flex flex-col items-center transition-transform duration-200 
                ${
                  active
                    ? "text-yellow-400 drop-shadow-[0_0_8px_rgba(255,215,0,0.9)]"
                    : "text-gray-400 hover:text-gray-200"
                } hover:scale-110`}
            >
              {icon}
              <span className="text-xs mt-1 font-semibold">{label}</span>
            </button>
          );
        })}
      </div>
    </footer>
  );
};

export default Footer;
