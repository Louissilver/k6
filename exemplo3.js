// Exemplo 2
// Registration e auth: Realizar o registro de um novo usuário - http://test-api.k6.io/user/register/
// * Critérios
//    * Performance Test:
//            * Carga 10 VU em 10s
//    * Limites:
//            * Requisição com falha < 1%
//            * Tempo requisição p(95) < 500
//            * Requisição com sucesso > 95%
// * Body
// {
//   "username": "",
//   "first_name": "",
//   "last_name": "",
//   "email": "",
//   "password": "",
// }

import http from "k6/http";
import { check, sleep } from "k6";

export const options = {
  stages: [{ duration: "10s", target: 10 }],
  thresholds: {
    checks: ["rate>0.95"],
    http_req_failed: ["rate<0.01"],
    http_req_duration: ["p(95)<500"],
  },
};

export default function () {
  const BASE_URL = "http://test-api.k6.io";

  const USER = `${Math.random()}@mailinator.com`;
  const PASS = "user123";

  console.log(`usuário: ${USER} | senha: ${PASS}`);

  const res = http.post(`${BASE_URL}/user/register/`, {
    username: USER,
    first_name: "Test",
    last_name: "User",
    email: USER,
    password: PASS,
  });

  check(res, { "status is 200": (r) => r.status === 201 });

  sleep(1);
}
