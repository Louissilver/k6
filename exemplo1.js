// Exemplo 1
// Public API: Buscar todos os crocodilos - http://test-api.k6.io/public/crocodiles/
// * Critérios
//    * Smoke Test:
//        * 1 usuário por 30 segundos
//    * Limites:
//        * Requisição com sucesso > 99%

import http from "k6/http";
import { check } from "k6";

export const options = {
  vus: 1,
  duration: "30s",
  thresholds: {
    checks: ["rate>0.99"],
  },
};

export default function () {
  const BASE_URL = "http://test-api.k6.io/public/crocodiles/";
  let res = http.get(BASE_URL);
  check(res, { "status is 200": (r) => r.status === 200 });
}
