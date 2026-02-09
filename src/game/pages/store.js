import React, { useEffect } from "react";
import { useGame } from "../../utils/game";
import { FaBitcoin, FaShoppingCart } from "react-icons/fa";
import toast from "react-hot-toast";
import { format } from "../../utils/utils";

const Store = () => {
  const { game, setGame, send } = useGame();

  useEffect(() => {
    if (game?.page === 12) {
      setGame((old) => ({ ...old, store: "loading" }));
      send({ type: "store" });
    }
  }, [game?.page]);

  const handleBuy = (product) => {
    if (!product) return;
    send({ type: "buy", product });
  };

  return (
    <div
      style={{ marginBottom: "5.5rem" }}
      className={`${
        game?.page !== 12 && "hidden"
      } flex flex-col items-center text-[khaki] mt-8 mb-4 mx-4`}
    >
      <div className="w-full max-w-md space-y-4">
        {game?.store === "loading" ? (
          <div className="flex flex-col justify-center items-center h-full w-full mt-32">
            <div className="loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-12 w-12 mb-4"></div>
            <h2 className="text-center text-white text-xl font-semibold">
              Yükleniyor...
            </h2>
          </div>
        ) : !Array.isArray(game?.store) || game?.store.length === 0 ? (
          <div className="flex flex-col justify-center items-center h-full w-full mt-32">
            <h2 className="text-center text-white text-xl font-semibold">
              Mağazada hiç ürün yok!
            </h2>
          </div>
        ) : (
          game?.store.map((product) => (
            <div
              key={product.id}
              className="bg-gradient-to-b from-green-900 to-green-950 rounded-lg shadow-lg p-6"
            >
              <h2 className="text-xl font-semibold mb-2 flex items-center">
                <FaShoppingCart className="mr-2 text-yellow-400" size={22} />
                {product.title}
              </h2>
              <p className="text-sm text-gray-300 mb-4">{product.desc}</p>
              <div className="flex justify-between items-center">
                <span className="flex items-center gap-1 text-lg font-bold text-yellow-400">
                  <span>{format(product.price, 3)}</span>
                  <FaBitcoin size={14} className="text-yellow-400" />
                </span>
                <button
                  onClick={() => handleBuy(product?.id)}
                  className="bg-gradient-to-b from-green-900 to-green-950 bg-opacity-95 text-white py-2 px-4 rounded-full transition duration-300"
                >
                  Satın Al
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Store;
