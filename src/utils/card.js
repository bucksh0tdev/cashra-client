import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Cards from "./cards/index.js";

const Card = ({ card, fast = false }) => {
  const [flipped, setFlipped] = useState(false);
  const GetCard = Cards[card];
  const Closedcard = Cards["nn"];

  useEffect(() => {
    setFlipped(false);
    const timer = setTimeout(() => setFlipped(true), 150);
    return () => clearTimeout(timer);
  }, [card]);

  return (
    <div className="w-20 h-28 flex items-center justify-center [perspective:1000px]">
      <motion.div
        className="relative w-full h-full"
        initial={false}
        animate={{ rotateY: (card !== "nn" && flipped) ? 180 : 0 }}
        transition={{ duration: (card !== "nn") ? 0.6 : (fast ? 0.01 : 0.35), ease: "easeInOut" }}
        style={{ transformStyle: "preserve-3d" }}
      >
        <div
          className="absolute inset-0"
          style={{ backfaceVisibility: "hidden" }}
        >
          <Closedcard className="w-full h-full object-contain rounded-lg" style={{ width: '100%', height: '100%', transform: 'scale(0.95)' }} />
        </div>

        <div
          className="absolute inset-0"
          style={{
            backfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
          }}
        >
          {(card !== "nn" && GetCard) ? (
            <GetCard className="w-full h-full object-contain rounded-lg" style={{ width: '100%', height: '100%', transform: 'scale(0.95)' }} viewBox="0 0 225 314" />
          ) : (
            <Closedcard className="w-full h-full object-contain rounded-lg" style={{ width: '100%', height: '100%', transform: 'scale(0.95)' }} />
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default Card;
