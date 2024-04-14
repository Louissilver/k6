// Exemplo 2
// Private API: Buscando todos os crocodilos - http://test-api.k6.io/my/crocodiles/
// * Critérios
//    * Performance Test:
//            * 100 VU em 10s
//    * Limites:
//            * Requisição com falha < 1%
//            * Duração da requisição p(95) < 250
// * Params
//    {
//     "Authorization": "Bearer token",
//     "Content-Type": "application/json",
//    }

import http from "k6/http";
import { check, sleep } from "k6";

const BASE_URL = "http://test-api.k6.io";

export const options = {
  vus: 100,
  duration: "10s",
  thresholds: {
    http_req_failed: ["rate<0.01"],
    http_req_duration: ["p(95)<250"],
  },
};

export function setup() {
  const res = http.post(`${BASE_URL}/auth/token/login/`, {
    username: "0.753056771593163@mailinator.com",
    password: "user123",
  });
  const token = res.json("access");
  return token;
}

export default function (token) {
  const params = {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  };

  const res = http.get(`${BASE_URL}/my/crocodiles/`, params);

  check(res, { "status is 200": (r) => r.status === 200 });

  sleep(1);
}
