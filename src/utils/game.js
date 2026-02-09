import axios from "axios";
import React, { useState, createContext, useContext, useEffect, useRef } from "react";
import { NextCryptr } from "next-cryptr";
import {Buffer} from 'buffer';
import config from "../config.js";
import useWebSocket, { ReadyState } from 'react-use-websocket';
import toast from "react-hot-toast";

const gameContext = createContext();

const Game = ({ children }) => {
    const [game, setGame] = useState({
        status: "connecting",
        page: 0,
        user: null,
        interval: null,
        sorting: "loading",
        store: "loading",
        game: false
    });
    const gameRef = useRef(game);
    const { sendMessage, lastMessage, readyState } = useWebSocket((config.dev) ? config.devwebsocket : config.websocket, {
        shouldReconnect: () => true,
        reconnectAttempts: 9999,
        reconnectInterval: 2000
    });

    useEffect(() => {
        gameRef.current = game;
    }, [game]);

    useEffect(() => {
        if(readyState == ReadyState.OPEN && game?.status == "connecting") {
            send({
                type: "login",
                secure: window?.Telegram?.WebApp?.initData,
                data: window?.Telegram?.WebApp?.initDataUnsafe
            });
        } else if(readyState == ReadyState.CLOSED) {
            clearInterval(game?.interval);
            if(game?.status !== "mobile" && game?.status !== "error")
                setGame(old => ({
                    status: "connecting",
                    page: 0,
                    user: null,
                    interval: null,
                    sorting: "loading",
                    store: "loading",
                    game: false
                }));
        }
    }, [readyState]);

    const interval = () => {
        send({
            type: "ping",
            user: gameRef?.current?.user
        });
    }

    useEffect(() => {
        if (game.status === "connected") {
            const getInterval = setInterval(() => {
                interval();
            }, 10000);
            return () => {
                clearInterval(getInterval);
            }
        }
    }, [game.status]);

    const messageRunner = async(data) => {
        try {
            let parsed = JSON.parse(data);
            if(parsed?.code == 301 || parsed?.code == 304) {
                setGame(old => ({ ...old, status: "error" }));
            } else if(parsed?.code == 302 || parsed?.code == 303) {
                setGame(old => ({ ...old, status: "mobile" }));
            } else if(parsed?.code == 998) {
                setGame(old => ({ ...old, game: parsed?.game, user: {...old?.user, price: (parsed?.user?.price) ? parsed?.user?.price : old?.user?.price } }));
            } else if(parsed?.code == 305) {
                setGame(old => ({ ...old, user: { ...parsed?.user, price: parsed?.user?.price } }));
            } else if(parsed?.code == 306) {
                setGame(old => ({ ...old, sorting: parsed?.sorting }));
            } else if(parsed?.code == 307) {
                setGame(old => ({ ...old, store: parsed?.store }));
            } else if(parsed?.code == 999) {
                toast[parsed?.type](parsed?.message)
            } else if(parsed?.code == 200 && parsed?.user) {
                setGame(old => ({ ...old, status: "connected", user: parsed?.user, game: parsed?.game }));
            }
        } catch(err) {
            return false;
        }
    }

    useEffect(() => {
        if(!lastMessage?.data) return;
        messageRunner(lastMessage?.data)
    }, [lastMessage])

    const send = async(dataG) => {
        if(gameRef?.current?.status != "connected" && gameRef?.current?.status != "connecting") return;
        var data = {
            date: new Date().getTime(),
            ...dataG
        };
        await sendMessage(String(JSON.stringify(data)));
    }

    const authContextValue = {
        game,
        setGame,
        send
    };
    
    return (
        <gameContext.Provider value={authContextValue}>
            {children}
        </gameContext.Provider>
    );

}

const useGame = () => {
    const context = useContext(gameContext);
    if (!context) {
      throw new Error("Problem 101");
    }
    return context;
  };
  
export { Game, useGame };