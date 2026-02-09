import { isMobile } from "react-device-detect";
import Home from "./pages/home.js";
import { useGame } from "../utils/game.js";
import config from "../config.js";
import Loader from "./layouts/loader.js";
import Mobile from "./layouts/mobile.js";
import Error from "./layouts/error.js";
import { useEffect, useState } from "react";
import OnImagesLoaded from 'react-on-images-loaded';
import Footer from "./layouts/footer.js";
import Header from "./layouts/header.js";
import Friends from "./pages/friends.js";
import Telegram from "./pages/telegram.js";
import Payout from "./pages/payout.js";
import toast, { useToasterStore } from "react-hot-toast";
import AdEarn from "./pages/ad.js";
import Sorting from "./pages/sorting.js";
import utils from "../utils/utils.js";
import Store from "./pages/store.js";

const Cashra = () => {
  const [loaded, setLoaded] = useState(false);
  const [loadedExtra, setLoadedExtra] = useState(false);
  const { game, setGame } = useGame();
  const [isLandscape, setIsLandscape] = useState(false);
  const { toasts } = useToasterStore();

  useEffect(() => {
    const handleOrientationChange = () => {
      if (window.matchMedia("(orientation: landscape)").matches) {
        setIsLandscape(true);
      } else {
        setIsLandscape(false);
      }
    };

    window.addEventListener('resize', handleOrientationChange);

    handleOrientationChange();

    return () => window.removeEventListener('resize', handleOrientationChange);
  }, []);

  useEffect(() => {
    toasts
      .filter((tt) => tt.visible)
      .filter((_, i) => i >= 3)
      .forEach((tt) => toast.dismiss(tt.id));
  }, [toasts]);

  return (
    isLandscape ?
      <div className="bg-black min-h-screen text-center">
        <div className="flex flex-col items-center justify-center h-screen">
            <h1 className="text-3xl font-bold text-white">Telefonu Dik Konumda Kullanınız!</h1>
        </div>
      </div>
    :
    game?.status == "mobile" ?
      <>
        {!loaded && <Loader loadedExtra={loadedExtra} setLoadedExtra={setLoadedExtra} />}
        <OnImagesLoaded
          onLoaded={async() => {
            if(!loadedExtra) await utils.waitForState(() => loadedExtra, true);
            setLoaded(true);
          }}
          onTimeout={async() => {
            if(!loadedExtra) await utils.waitForState(() => loadedExtra, true);
            setLoaded(true);
          }}
          timeout={7000}
        >
          <div className={`${!loaded && "hidden"}`}>
            <Mobile platform={window?.Telegram?.WebApp?.platform} />
          </div>
        </OnImagesLoaded>
      </>
    :
    game?.status == "connecting" ? 
      <Loader loadedExtra={loadedExtra} setLoadedExtra={setLoadedExtra} />
    :
    game?.status == "connected" ?
      <>
        {(!loaded) && <Loader loadedExtra={loadedExtra} setLoadedExtra={setLoadedExtra} />}
        <OnImagesLoaded
          onLoaded={async() => {
            if(!loadedExtra) await utils.waitForState(() => loadedExtra, true);
            setLoaded(true);
          }}
          onTimeout={async() => {
            if(!loadedExtra) await utils.waitForState(() => loadedExtra, true);
            setLoaded(true);
          }}
          timeout={7000}
        >

        <div className="fixed inset-0 -z-10">
          <div className="absolute inset-0 bg-gradient-to-r from-[#0b3d23] via-[#145a32] to-[#0b3d23]" />
          <div className="absolute inset-0 bg-black/40" />
          <div
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(circle at center, rgba(34,197,94,0.35) 0%, transparent 70%)",
            }}
          />
        </div>


          <div style={{ zIndex: 2 }} className={`${!loaded && "hidden"} relative min-h-screen text-white flex flex-col items-center`}>
            <main style={{ minHeight: "calc(100vh - 80px)", width: "100%" }}>
              <Header />
              <Home />
              <Payout />
              <Friends />
              <Sorting />
              <Telegram />
              <AdEarn />
              <Store />
            </main>
            <Footer />
          </div>
        </OnImagesLoaded>
      </>
    :
    <Error />
  );
};

export default Cashra;