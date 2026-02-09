import React, { useState } from 'react';
import { useGame } from '../../utils/game';
import { FaBitcoin } from 'react-icons/fa';
import toast from 'react-hot-toast';
import { format } from '../../utils/utils';

const Payout = () => {
    const { game, setGame, send } = useGame();
    const [iban, setIban] = useState("");

    const handlePayout = () => {
        if(!iban) return toast.error("IBAN Girilmedi!")

        if(game?.user?.price < 10000) return toast.error("En az 10k Coin olmalı!")
        if(game?.user?.invited < 10) return toast.error("Minimum 10 davet edilmelidir!")
        toast.error("Yeterli Coin Bulunmuyor!")
    };

    return (
        <div style={{ marginBottom: "5.5rem" }} className={`${game?.page !== 2 && "hidden"} flex flex-col items-center text-[khaki] mt-8 mb-4 mx-4`}>
            <div className="w-full max-w-md space-y-4">
                <div className="bg-gradient-to-b from-green-900 to-green-950 rounded-lg shadow-lg p-6">
                    <h2 className="text-2xl font-semibold mb-4 flex items-center">
                        <FaBitcoin className="mr-2 text-yellow-400" size={24} />
                        Çekim İşlemi
                    </h2>
                    <div className="space-y-4">
                        <div>
                            <label htmlFor="iban" className="block text-sm font-medium mb-1">IBAN:</label>
                            <input
                                required
                                type="text"
                                id="iban"
                                value={iban}
                                onChange={(e) => setIban(e.target.value)}
                                className="w-full px-4 py-2 bg-opacity-80 bg-gradient-to-b from-green-900 to-green-950 rounded-md outline-none ring-2 ring-yellow-500 text-white"
                                placeholder="IBAN' ınızı girin"
                            />
                        </div>
                        <div>
                            <label htmlFor="amount" className="block text-sm font-medium mb-1">Çekilecek Miktar:</label>
                            <input
                                disabled={true}
                                type="text"
                                id="amount"
                                defaultValue={format(game?.user?.price, 2) || 0}
                                className="disabled:opacity-50 w-full px-4 py-2 bg-gradient-to-b from-green-900 to-green-950 rounded-md outline-none ring-2 ring-yellow-500 text-white"
                                placeholder="Tutarı girin"
                            />
                        </div>
                        <button
                            onClick={handlePayout}
                            className="w-full bg-gradient-to-b from-green-900 to-green-950 bg-opacity-95 text-white py-2 px-4 rounded-full transition duration-300"
                        >
                            Çekim Yap
                        </button>
                    </div>
                </div>

                <div className="bg-gradient-to-b from-green-900 to-green-950 rounded-lg shadow-lg p-4">
                    <h2 className="text-lg font-semibold mb-4 text-center">Para Çekimi Hakkında Detaylı Bilgiler</h2>
                    <ul className="list-disc list-inside text-gray-400 text-sm space-y-2">
                        <li>Çarpan sisteminde referans önemli rol oynar.</li>
                        <li>Minimum 10 referans' a sahip olunmalıdır.</li>
                        <li>Ödemeler hesabın statüsüne, referans' ına bağlıdır.</li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Payout;