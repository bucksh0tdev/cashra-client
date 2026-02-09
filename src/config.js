const api = process.env.REACT_APP_API_URL || "http://localhost:6060";
const websocket = process.env.REACT_APP_WS_URL || "ws://localhost:6060/websocket";
const devwebsocket = process.env.REACT_APP_DEV_WS_URL || websocket;
const bot = process.env.REACT_APP_BOT_URL || "";
const telegramChannel = process.env.REACT_APP_TELEGRAM_CHANNEL_URL || "";
const dev = process.env.REACT_APP_DEV === "true";

module.exports = {
  api,
  websocket,
  devwebsocket,
  bot,
  telegramChannel,
  dev,
};
