// Exemplo 2
// Registration e auth: Login - http://test-api.k6.io/auth/token/login/
// * Critérios
//    * Stress Test:
//            * Ramp up 5 VU em 5s
//            * Carga 5 VU em 5s
//            * Ramp up 50 VU em 2s
//            * Carga 50 VU em 2s
//            * Ramp down 0 VU em 5s
//    * Limites:
//            * Requisição com falha < 1%
// * Body
// {
//   "username": "",
//   "password": "",
// }

import http from "k6/http";
import { check, sleep } from "k6";
import { SharedArray } from "k6/data";
import papaparse from "https://jslib.k6.io/papaparse/5.1.1/index.js";

export const options = {
  stages: [
    { duration: "5s", target: 5 },
    { duration: "5s", target: 5 },
    { duration: "2s", target: 50 },
    { duration: "2s", target: 50 },
    { duration: "5s", target: 0 },
  ],
  thresholds: {
    http_req_failed: ["rate<0.01"],
  },
};

const csvData = new SharedArray("Leitura do JSON", function () {
  return papaparse.parse(open("usuarios.csv"), { header: true }).data;
});

export default function () {
  const BASE_URL = "http://test-api.k6.io";

  const username = csvData[Math.floor(Math.random() * csvData.length)].user;
  const password = "user123";

  console.log(`usuário: ${username} | senha: ${password}`);

  const res = http.post(`${BASE_URL}/auth/token/login/`, {
    username: username,
    password: password,
  });

  check(res, {
    "success on authentication": (r) => r.status === 200,
    "token on authentication": (r) => r.json("access") !== "",
  });

  sleep(1);
}
