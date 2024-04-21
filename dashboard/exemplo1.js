// Gerando dashboard de saída com K6
// Funcionalidade nativa do K6
// K6_WEB_DASHBOARD=true k6 run aulas/aula2.js
// Windows: k6 run --out 'web-dashboard' dashboard/exemplo1.js

import http from "k6/http";
import { sleep } from "k6";

export const options = {
  vus: 5,
  duration: "60s",
};

export default function () {
  const BASE_URL = "http://test-api.k6.io/public/crocodiles/";
  let res = http.get(BASE_URL);
  sleep(1);
}
