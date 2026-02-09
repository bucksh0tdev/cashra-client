import React from 'react';
import { useGame } from '../../utils/game';
import { format } from '../../utils/utils';
import config from '../../config';
import toast from 'react-hot-toast';

const Friends = () => {
    var { game } = useGame();

    const handleInvite = () => {
        navigator.clipboard.writeText(`${config.bot}?startapp=${game?.user?.id}`);
        toast.success("Davet kodunuz kopyalandı!");
    };

    return (
        <div style={{ marginBottom: "5.5rem" }} className={`${game?.page !== 5 && "hidden"} flex flex-col items-center text-[khaki] mt-8 mb-2 mx-8`}>
            <div className="max-w-[20rem] space-y-4">
                <div className="bg-gradient-to-b from-green-900 to-green-950 rounded-lg shadow-lg p-4">
                    <h2 className="text-lg font-semibold mb-4 text-center">Arkadaşlarını Davet Et</h2>
                    <div className="flex justify-center mb-4">
                        <button 
                            onClick={() => handleInvite()} 
                            className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-full transition duration-300">
                            Bağlantıyı Kopyala
                        </button>
                    </div>
                    <div className="text-center mb-4">
                        <p className="text-gray-400 text-sm">Davet Ettiğin Kişi Sayısı: {game?.user?.invited}</p>
                    </div>
                </div>
                <div className="bg-gradient-to-b from-green-900 to-green-950 rounded-lg shadow-lg p-4">
                    <h2 className="text-lg font-semibold mb-4 text-center">Arkadaş Davet Etmenin Avantajları</h2>
                    <ul className="list-disc list-inside text-gray-400 text-sm space-y-2">
                        <li>Para çekme işleminde referans büyük rol oynar.</li>
                        <li>Her davet ettiğin arkadaş için 25k kazan.</li>
                        <li>Arkadaşların 10k kazansın.</li>
                        <li>Topluluğumuzu büyüterek para havuzunu yükselt.</li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Friends;
