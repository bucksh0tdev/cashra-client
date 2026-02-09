import React, { useEffect, useState } from "react";
import { useGame } from "../../utils/game";
import Card from "../../utils/card";
import { format, chipsGenerator } from "../../utils/utils";

const Home = () => {
  const { game, send } = useGame();
  const [chips, setChips] = useState([]);

  useEffect(() => {
    if (game?.user?.price) {
      const chipValues = chipsGenerator(game.user.price);

      const fixedColors = [
        ["#e53935", "#b71c1c"],
        ["#1e88e5", "#0d47a1"],
        ["#43a047", "#1b5e20"],
        ["#cad80cff", "#8f9900ff"],
      ];

      setChips(
        chipValues.map((v, i) => ({
          value: v.toString(),
          colors: fixedColors[i % fixedColors.length],
          edge: "#fff"
        }))
      );
    }
  }, [game?.user?.price]);

  return (
    <div
    style={{
      minHeight: "calc(100vh - 160px)",
    }}
      className={`${
        game?.page !== 0 && "hidden"
      } flex justify-center items-center`}
    >
      <section className="relative w-[95%] max-w-xs mx-auto mt-4">
        <div className="relative rounded-2xl border border-yellow-600 p-4">
          <div className="flex flex-col items-center mb-6">
            <h2 className="text-xs font-semibold uppercase text-yellow-300 tracking-wider drop-shadow-md mb-2">
              Krupiye ({game?.game?.dealerpoints || 0})
            </h2>
            <div className="relative w-20 h-28 mx-auto flex justify-center items-center">
              {game?.game?.dealercard
                ? game.game.dealercard.map((card, index, arr) => {
                    const totalWidth = (arr.length - 1) * 25;
                    const offset = -totalWidth / 2 + index * 25;
                    return (
                      <div
                        key={index}
                        className="absolute top-1/2 left-1/2"
                        style={{
                          transform: `translate(-50%, -50%) translateX(${offset}px)`,
                          zIndex: index,
                        }}
                      >
                        <Card card={card} />
                      </div>
                    );
                  })
                : [1, 2].map((_, i, arr) => {
                    const totalWidth = (arr.length - 1) * 25;
                    const offset = -totalWidth / 2 + i * 25;
                    return (
                      <div
                        key={i}
                        className="absolute top-1/2 left-1/2"
                        style={{
                          transform: `translate(-50%, -50%) translateX(${offset}px)`,
                          zIndex: i,
                        }}
                      >
                        <Card card="nn" fast={i == 0} />
                      </div>
                    );
                  })}
            </div>
          </div>

          <div className="h-[1px] w-full bg-yellow-500/40 mb-6" />

          <div className="flex flex-col items-center">
            <h2 className="text-xs font-semibold uppercase text-yellow-300 tracking-wider drop-shadow-md mb-2">
              Sen ({game?.game?.userpoints || 0})
            </h2>
            <div className="relative w-20 h-28 mx-auto flex justify-center items-center">
              {game?.game?.usercard
                ? game.game.usercard.map((card, index, arr) => {
                    const totalWidth = (arr.length - 1) * 25;
                    const offset = -totalWidth / 2 + index * 25;
                    return (
                      <div
                        key={index}
                        className="absolute top-1/2 left-1/2"
                        style={{
                          transform: `translate(-50%, -50%) translateX(${offset}px)`,
                          zIndex: index,
                        }}
                      >
                        <Card card={card} />
                      </div>
                    );
                  })
                : [1, 2].map((_, i, arr) => {
                    const totalWidth = (arr.length - 1) * 25;
                    const offset = -totalWidth / 2 + i * 25;
                    return (
                      <div
                        key={i}
                        className="absolute top-1/2 left-1/2"
                        style={{
                          transform: `translate(-50%, -50%) translateX(${offset}px)`,
                          zIndex: i,
                        }}
                      >
                        <Card card="nn" fast={i == 0} />
                      </div>
                    );
                  })}
            </div>
          </div>

          {game?.game?.type === 1 ? (
            <div className="flex justify-center gap-2 mt-6 flex-wrap">
              {[
                {
                  text: "Kart Çek",
                  type: "hit",
                  colors: "from-green-400 to-green-700",
                  border: "border-green-300",
                },
                {
                  text: "Bekle",
                  type: "stand",
                  colors: "from-blue-400 to-blue-800",
                  border: "border-blue-300",
                },
                {
                  text: "Double",
                  type: "double",
                  colors: "from-yellow-400 to-yellow-700",
                  border: "border-yellow-300",
                },
              ].map(({ text, type, colors, border }) => (
                <button
                  key={type}
                  onClick={() => send({ type })}
                  className={`px-4 py-2 rounded-full font-semibold text-white text-xs shadow-md hover:scale-105 active:scale-95 transition-transform bg-gradient-to-br ${colors} ${border} border-2`}
                  style={{ textShadow: "0 1px 3px rgba(0,0,0,0.8)" }}
                >
                  {text}
                </button>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-4 gap-3 mt-6 justify-items-center">
              {chips.map(({ value, colors, edge }) => (
                <div
                  key={value}
                  onClick={() =>
                    send({ type: "create", price: value, user: game?.user })
                  }
                  className="relative w-12 h-12 cursor-pointer hover:scale-110 transition-transform"
                >
                  <svg
                    viewBox="0 0 200 200"
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-full h-full drop-shadow-lg"
                  >
                    <circle
                      cx="100"
                      cy="100"
                      r="95"
                      fill={colors[0]}
                      stroke={edge}
                      strokeWidth="8"
                    />

                    {[...Array(8)].map((_, i) => (
                      <rect
                        key={i}
                        x="85"
                        y="5"
                        width="30"
                        height="35"
                        rx="3"
                        fill={colors[1]}
                        transform={`rotate(${i * 45} 100 100)`}
                      />
                    ))}

                    <circle
                      cx="100"
                      cy="100"
                      r="75"
                      fill="none"
                      stroke="white"
                      strokeWidth="6"
                    />

                    <circle cx="100" cy="100" r="60" fill="black" />

                    <text
                      x="100"
                      y="115"
                      textAnchor="middle"
                      fontSize="40"
                      fill="white"
                      fontWeight="bold"
                    >
                      {format(value, 3)}
                    </text>
                  </svg>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Home;
