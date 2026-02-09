import React from 'react';
import { FaBitcoin } from 'react-icons/fa';
import { useGame } from '../../utils/game';
import { format } from '../../utils/utils';
import config from '../../config';

export default function Header() {
  const { game, setGame } = useGame();

  return (
    <header className="relative flex items-center justify-between px-3 py-2 rounded-b-xl shadow-md bg-gradient-to-r from-[#0b3d23] via-[#145a32] to-[#0b3d23] h-14">
      <div
        onClick={() => setGame(old => ({ ...old, page: 3 }))}
        className="flex items-center gap-2 min-w-[120px] max-w-[150px] cursor-pointer"
      >
        <img
          src={game?.user?.avatar === 'none' ? '/libs/user.png' : game?.user?.avatar}
          alt="avatar"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = '/libs/user.png';
          }}
          className="w-8 h-8 rounded-full ring-1 ring-yellow-400 shadow-sm flex-shrink-0"
        />
        <div className="overflow-hidden leading-tight">
          <div className="text-[11px] text-gray-200 truncate">{game?.user?.username}</div>
          <div className="text-yellow-400 font-bold text-xs">#{format(game?.user?.sort, 2)}</div>
        </div>
      </div>

      <div onClick={() => config.telegramChannel && window.open(config.telegramChannel)} className="absolute left-1/2 -translate-x-1/2 flex items-center justify-center">
        <div className="flex items-center gap-1 bg-black/40 px-3 py-1.5 rounded-full shadow-md border border-white/5">
          <div className="w-7 h-7 rounded-full bg-gradient-to-b from-yellow-400 to-yellow-700 shadow-inner flex items-center justify-center text-black font-extrabold text-sm">
            <img src="/libs/logo2.png" alt="cashra" />
          </div>
          <div className="flex flex-col items-start leading-none">
            <div
              className="text-sm font-extrabold text-transparent bg-clip-text"
              style={{
                background: 'linear-gradient(180deg,#f6e27a,#c48d16)',
                WebkitBackgroundClip: 'text',
              }}
            >
              CASHRA
            </div>
            <div className="text-[9px] text-white/60">Blackjack</div>
          </div>
        </div>
      </div>

      <div className="min-w-[110px] flex justify-end">
        <button
          onClick={() => setGame(old => ({ ...old, page: 2 }))}
          className="flex items-center gap-1.5 bg-gradient-to-r from-yellow-500 to-yellow-600 px-3 py-1.5 rounded-full shadow-lg active:scale-95 transition"
        >
          <span className="text-xs text-white font-bold">{format(game?.user?.price)}</span>
          <FaBitcoin size={14} className="text-white" />
        </button>
      </div>
    </header>
  );
}
