const herokuApp = process.env.HEROKU_APP_NAME;
export const BASE_URL = herokuApp != null ? "https://" + herokuApp + ".herokuapp.com"
  : "http://localhost:3001"