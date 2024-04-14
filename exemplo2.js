// Exemplo 2
// Public API: Buscar crododilo por id - http://test-api.k6.io/public/crocodiles/1/
// * Critérios
//    * Performance Test:
//            * Ramp up 10 VU em 10s
//            * Carga 10 VU em 10s
//            * Ramp down 0 VU em 10s
//    * Limites:
//            * Requisição com sucesso > 95%
//            * Tempo requisição p(90) < 200

import http from "k6/http";
import { check, sleep } from "k6";
import { SharedArray } from "k6/data";

export const options = {
  stages: [
    { duration: "10s", target: 10 },
    { duration: "10s", target: 10 },
    { duration: "10s", target: 0 },
  ],
  thresholds: {
    checks: ["rate>0.95"],
    http_req_duration: ["p(90)<200"],
  },
};

const data = new SharedArray("Leitura do JSON", function () {
  return JSON.parse(open("dados.json")).crocodilos;
});

export default function () {
  const crocodilo = data[Math.floor(Math.random() * data.length)].id;

  const BASE_URL = `http://test-api.k6.io/public/crocodiles/${crocodilo}/`;
  let res = http.get(BASE_URL);
  console.log(`Duration: ${res.timings.duration}s`);

  check(res, { "status is 200": (r) => r.status === 200 });

  sleep(1);
}
