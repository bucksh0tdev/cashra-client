import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from "js-cookie"
import { useGame } from '../../utils/game';
import config from '../../config';
import toast from 'react-hot-toast';

const AdEarn = () => {
    var { game } = useGame();
    const [adsVisible, setAdsVisible] = useState(false);
    const [loader, setLoader] = useState(false);
    const [timing, setTiming] = useState(20);
    const [adult, setAdult] = useState(false);
    const [banner, setBanner] = useState(false);

    useEffect(() => {
        const adultshow = Cookies.get("adultshow");
        if(adultshow == "true") setAdult(true);
    }, [])

    useEffect(() => {
        if(!adsVisible || loader || timing != 20) return;
        const interval = setInterval(() => {
            setTiming(prev => {
                if (prev <= 1) {
                    setLoader(true);
                    clearInterval(interval);
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(interval);
    }, [adsVisible, loader]);

    const finishAd = () => {
        window.open(`${config.api}/ad/smartlink?user=${game?.user?.id}&date=${new Date().getTime()}&adult=${adult ? "true" : "false"}`);
        window.location.reload();
    };

    const showAd = async() => {
        const scripts = document.querySelectorAll("script[src]");
        if(Array.from(scripts).find(s => s.src.includes("revenuecpmgate.com"))) return window.location.reload();

        let getScript = await axios.post(`${config.api}/ad/getscript?adult=${adult ? "true" : "false"}&user=${game?.user?.id}`).catch(err => false);
        if(getScript && getScript?.data && getScript?.data?.code == 201 && getScript?.data?.message) return toast.error(getScript?.data?.message);
        if(!getScript || !getScript?.data || getScript?.data?.code != 200) return window.location.reload();

        setLoader(false);
        setAdsVisible(true);
        setTiming(20);
        Cookies.set("adultshow", adult ? "true" : "false");
        setBanner(getScript?.data?.banner?.id);

        const script1 = document.createElement("script");
        script1.type = "text/javascript";
        script1.src = getScript?.data?.banner?.src;
        document.body.appendChild(script1);

        const script2 = document.createElement("script");
        script2.type = "text/javascript";
        script2.src = getScript?.data?.popunder;
        document.head.appendChild(script2);
    };

    return (
        <div style={{ marginBottom: "5.5rem" }} className={`${game?.page !== 9 && "hidden"} flex flex-col items-center text-[khaki] mt-8 mb-2 mx-8`}>

            {adsVisible && (
                <div className="fixed inset-0 z-50 w-full h-full bg-gradient-to-b from-green-900 to-green-950 flex items-center justify-center">
                    {banner && (
                        <div id={banner} className="absolute top-0 left-0 w-full h-full items-center justify-center"></div>
                    )}
                    
                    {loader ? (
                        <div className="relative bg-gradient-to-b from-green-900 to-green-950 p-6 rounded-lg bg-opacity-95 z-50 flex flex-col items-center justify-center space-y-4">

                            <div className="h-16 w-16 flex items-center justify-center mb-2">
                                <svg className="h-16 w-16 text-green-500" fill="none" stroke="currentColor" strokeWidth="4" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                </svg>
                            </div>

                            <h2 className="text-white text-2xl font-bold text-center">Link Hazır!</h2>
                            <p className="text-gray-300 text-center max-w-xs text-sm">
                                Yönlendirildikten sonra otomatik parayı alırsınız!
                            </p>
                            <button
                                onClick={() => finishAd()}
                                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg shadow-md transition-colors"
                            >
                                Yönlendir
                            </button>
                        </div>
                    ) : (
                        <div className="relative bg-gradient-to-b from-green-900 to-green-950 p-4 rounded-lg bg-opacity-95 z-50 flex flex-col items-center justify-center">
                            <div className="loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-16 w-16 mb-4 animate-spin"></div>
                            <h2 className="text-white text-2xl font-bold mb-2 text-center">Yönlendiriliyorsunuz..</h2>
                            <p className="text-gray-300 text-center max-w-xs text-sm">
                                {timing} saniye sonra otomatik yönlendirileceksiniz.
                            </p>
                        </div>
                    )}

                </div>
            )}

            <div className="max-w-[20rem] space-y-4">
                <div className="bg-gradient-to-b from-green-900 to-green-950 rounded-lg shadow-lg p-4">
                    <h2 className="text-lg font-semibold mb-4 text-center">Reklam İzleyerek Para Kazan</h2>
                    <div className="flex justify-center mb-4">
                        <button 
                            onClick={() => showAd()} 
                            className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-full transition duration-300">
                            Reklam İzle
                        </button>
                    </div>

                    <div className="flex items-center justify-center space-x-2">
                        <label className="relative inline-flex items-center cursor-pointer">
                            <input type="checkbox" checked={adult} onChange={(e) => setAdult(e.target.checked)} className="sr-only peer" />
                            <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none rounded-full peer 
                                            peer-checked:bg-blue-600 
                                            after:content-[''] after:absolute after:top-[2px] after:left-[2px] 
                                            after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all 
                                            peer-checked:after:translate-x-full">
                            </div>
                        </label>
                        <span className="text-gray-300 text-sm">Yetişkin içeriğe izin ver</span>
                    </div>
                </div>
                <div className="bg-gradient-to-b from-green-900 to-green-950 rounded-lg shadow-lg p-4">
                    <h2 className="text-lg font-semibold mb-4 text-center">Reklam İzle Kuralları</h2>
                    <ul className="list-disc list-inside text-gray-400 text-sm space-y-2">
                        <li>Normal reklamlar 2.5k kazandırır.</li>
                        <li>Yetişkin reklamlar 10k kazandırır.</li>
                        <li>Sonlanmadan çıkmanız hiçbirşey kazandırmaz.</li>
                        <li>Çıkan reklamlara tıklamanız ekstra kazanç verir.</li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default AdEarn;