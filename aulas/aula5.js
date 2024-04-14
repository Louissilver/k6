// Tresholds

// Por padrão, mesmo se um dos limites não for atingido, o K6 irá continuar o teste
// Para parar esse comportamento, é necessário utilizar o método threshold passando um parametro abortOnFail como true
// Também é possível passar um parâmetro de delay (delayAbortEval), que será aplicado em caso de falha, ou seja, se o threshold não for atingido em um tempo de n segundos, o K6 irá parar o teste e retornar o valor de threshold

import http from "k6/http";
import { sleep } from "k6";
import { check } from "k6";

export const options = {
  vus: 1,
  duration: "3s",
  thresholds: {
    http_req_failed: ["rate<0.01"],
    http_req_duration: [
      { threshold: "p(95)<200", abortOnFail: true, delayAbortEval: "10s" },
      "p(90)<400",
    ],
    checks: ["rate>0.99"],
  },
};

export default function () {
  let res = http.get("http://test.k6.io/");
  check(res, {
    "status is 200": (r) => r.status === 200,
  });
  sleep(1);
}
