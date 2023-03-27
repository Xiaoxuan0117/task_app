const API = process.env.API;
const isProd = API === "prod";
const allowOrigin = isProd
  ? "https://taskapp-dux5.onrender.com"
  : "http://127.0.0.1:3000";
const redirectUrl = isProd
  ? "https://taskapp-dux5.onrender.com"
  : "http://127.0.0.1:3000";

module.exports = {
  allowOrigin,
  redirectUrl,
};
