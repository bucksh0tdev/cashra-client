import React, { useEffect } from 'react';
import { useGame } from '../../utils/game';
import { format } from '../../utils/utils';
import { FaBitcoin } from 'react-icons/fa';

const Sorting = () => {
    const { game, setGame, send } = useGame();

    useEffect(() => {
        if (game?.page === 3) {
            setGame((old) => ({ ...old, sorting: "loading" }));
            send({ type: "sorting" });
        }
    }, [game?.page]);

    return (
        <div style={{ marginBottom: "5.5rem" }} className={`${game?.page !== 3 && "hidden"} flex flex-col items-center text-[khaki] mt-8 mb-2 mx-8`}>
            <div className="w-full w-[20rem] space-y-4">
                {game?.sorting === "loading" ? (
                    <div className="flex flex-col justify-center items-center h-full w-full mt-32">
                        <div className="loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-12 w-12 mb-4"></div>
                        <h2 className="text-center text-white text-xl font-semibold">Yükleniyor...</h2>
                    </div>
                ) : (!Array.isArray(game?.sorting) || game?.sorting.length === 0) ? (
                    <div className="flex flex-col justify-center items-center h-full w-full mt-32">
                        <h2 className="text-center text-white text-xl font-semibold">Sıralamada Hiç Üye Yok!</h2>
                    </div>
                ) : (Array.isArray(game?.sorting) || game?.sorting.length > 0) && (
                    game?.sorting.map((user) => (
                        <div key={user.id} className={`grid grid-cols-2 items-center ${(user?.id === game?.user?.id) ? "bg-gray-700" : "bg-gradient-to-b from-green-900 to-green-950"} rounded-lg shadow-lg text-center py-2 px-6 mb-2`}>
                            <div className="flex items-center">
                                <img onError={(e) => {
                                    e.target.onerror = null;
                                    e.target.src = "/libs/user.png";
                                }} className="w-12 h-12 rounded-full mr-4" src={user?.avatar == "none" ? "/libs/user.png" : user?.avatar} alt="Avatar" />
                                <div className="text-lg font-semibold">{user?.username}</div>
                            </div>
                            <div className="flex items-center justify-end text-lg font-semibold">
                                <span className="mr-1">{format(user?.price)}</span>
                                <FaBitcoin className="text-yellow-400" />
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default Sorting;