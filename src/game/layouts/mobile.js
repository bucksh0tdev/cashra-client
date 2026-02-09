import config from "../../config";

const Mobile = ({ platform }) => {
    return (
        <div className="bg-black min-h-screen text-center">
            <div className="flex flex-col items-center justify-center h-screen">
                <h1 className="text-3xl font-bold text-white">Play on your mobile.</h1>
                {config.bot ? (
                    <a href={config.bot}><img src="/libs/qr.png" alt="cashra" className="mt-5 rounded-lg" /></a>
                ) : (
                    <img src="/libs/qr.png" alt="cashra" className="mt-5 rounded-lg" />
                )}
                <h1 className="mt-5 text-3xl font-bold text-white">{config.bot ? config.bot.replace("https://t.me/", "@") : "@yourbot"}</h1>
                <p className="mt-5 text-white">{(platform || "Unkown") + " 6.0"}</p>
            </div>
      </div>
    )
};

export default Mobile;
