import { useState } from "react";

const Loader = ({ loadedExtra, setLoadedExtra }) => {
    return (
        <div style={{
        }} className={"fixed top-0 left-0 right-0 bottom-0 w-full h-screen overflow-hidden flex flex-col items-center justify-center"}>
            <div style={{ zIndex: 2000000000 }} className="absolute inset-0 bg-gradient-to-r from-[#0b3d23] via-[#145a32] to-[#0b3d23]" />
            <div style={{ zIndex: 2000000000 }} className="absolute inset-0 bg-black/40 pointer-events-none" />
            <div style={{ 
                zIndex: 2000000001,
                background: "radial-gradient(circle at center, rgba(34,197,94,0.35) 0%, transparent 70%)",
            }} className="absolute inset-0 pointer-events-none" />
            
            <style jsx global>{`
                body {
                    overflow: hidden;
                }
            `}</style>
            <div style={{ display: loadedExtra ? "flex" : "none", zIndex: 2000000002 }} className="fixed top-0 left-0 right-0 bottom-0 w-full h-screen overflow-hidden flex flex-col items-center justify-center">
                <img src="/libs/logo.png" alt="cashra" className="w-1/3" onLoad={(e) => {
                    setLoadedExtra(true);
                }} />
                <h2 className="text-center text-white text-xl font-semibold">Yükleniyor...</h2>
                <p style={{ fontSize: "12px" }} className="w-1/3 text-center text-white">Sunucuya Bağlanılıyor..</p>
            </div>
        </div>
    )
};

export default Loader;