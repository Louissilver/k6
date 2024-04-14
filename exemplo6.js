// Exemplo 2
// Public API: Buscar todos os crocodilos e buscar crododilos por id - http://test-api.k6.io/public/crocodiles/
// * Critérios
//    * É esperdo um RPS de 200 REQ/S para a API de lsitagem de crocodilos durante 30 segundos
//    * Para a busca por id, o sistema deve atender 50 usuários onde cada usuário realiza até 20 solicitações em até 1 minuto
//            * Usuários par devem realizar buscas ao crocodilo de ID 2
//            * Usuários ímpar devem realizar buscas ao crocodilo de ID 1
//    * Ambos os testes devem ser executados simultaneamente

import http from "k6/http";

export const options = {
  scenarios: {
    listar: {
      executor: "constant-arrival-rate",
      exec: "listar",
      duration: "30s",
      rate: 200,
      timeUnit: "1s",
      preAllocatedVUs: 150,
      gracefulStop: "10s",
      tags: {
        test_type: "listagem_de_crocodilos",
      },
    },
    buscar: {
      executor: "per-vu-iterations",
      exec: "buscar",
      vus: 50,
      iterations: 20,
      maxDuration: "1m",
      gracefulStop: "10s",
      tags: {
        test_type: "busca_de_crocodilos",
      },
    },
  },
};

export function listar() {
  http.get(__ENV.URL + "/public/crocodiles/");
}

export function buscar() {
  if (__VU % 2 === 0) {
    http.get(__ENV.URL + "/public/crocodiles/2/");
  } else {
    http.get(__ENV.URL + "/public/crocodiles/1/");
  }
}
