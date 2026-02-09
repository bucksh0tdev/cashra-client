import React, { useEffect, useState } from 'react';
import Cookies from "js-cookie";
import config from "../../config";

const Telegram = () => {
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        const alreadynotify = Cookies.get("alreadynotify");
        if(!alreadynotify) setIsOpen(true);
    }, [])

    const NotifyCloser = (success = false) => {
        setIsOpen(false);
        Cookies.set("alreadynotify", true);
        if(success && config.telegramChannel) window.open(config.telegramChannel);
    };

    return (
        <>
            {isOpen && (
                <div style={{ zIndex: 2000 }} className="fixed flex justify-between items-center text-center bottom-0 left-0 w-full bg-gradient-to-b from-green-900 to-green-950 p-4 text-white text-center rounded-t-[2rem] shadow-lg">
                    <div className="flex justify-between items-center">
                        <span className="text-lg font-semibold">Topluluğumuza Katıl</span>
                        </div>
                    <div className="flex gap-2">
                        <button
                            onClick={() => NotifyCloser()}
                            className="bg-gray-600 hover:bg-gray-700 text-white py-2 px-4 rounded-full transition duration-300 text-lg"
                        >
                            Yoksay
                        </button>
                        <button
                            onClick={() => NotifyCloser(true)}
                            className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-full transition duration-300 text-lg"
                        >
                            Katıl
                        </button>
                    </div>
                </div>
            )}
        </>
    );
};

export default Telegram;
