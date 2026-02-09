import React, { useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import { Toaster } from "react-hot-toast";
import './utils/tailwind.css';
import Cashra from './game/cashra.js';
import { Game } from './utils/game.js';

const cashra = ReactDOM.createRoot(document.getElementById("cashra"));
cashra.render(
    <Game>
      <Cashra />
      <Toaster toastOptions={{
        duration: 5000,
        style: {
          backgroundColor: "rgb(21, 21, 21)",
          color: "white",
          fontSize: "14px",
          zIndex: 99999
        }
        }} position="top-center" />
    </Game>
);