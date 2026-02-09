const Error = () => {
    return (
        <div style={{
          zIndex: 2000000003
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
            <div style={{ display: "flex", zIndex: 2000000002 }} className="fixed top-0 left-0 right-0 bottom-0 w-full h-screen overflow-hidden flex flex-col items-center justify-center">
              <div style={{ fontSize: "80px" }} className="mb-4">⚠️</div>
              <h2 className="text-center text-white text-xl font-semibold">Bağlantınız Koptu</h2>
              <p style={{ fontSize: "12px" }} className="w-1/3 text-center text-white">Hesabınıza Giriş Yapamadınız!</p>
              <span onClick={() => window && window?.location && typeof window?.location?.reload == "function" && window.location.reload()} className="cursor-pointer mt-5 text-[khaki]">Yeniden Bağlan</span>
            </div>

        </div>
    )
};

export default Error;