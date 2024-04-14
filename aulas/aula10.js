// Scenarios: https://k6.io/docs/using-k6/scenarios/

// Organização do teste
// Simulações mais realistas
// Cargas de trabalho paralelas ou sequenciais
// Análise granular dos resultados

// Options disponíveis
// executor
// startTime
// gracefulstop
// exec
// env
// tags

// executores

// por iterações
// shared-iterations
// per-vu-iterations

// por numero de vus
// constant-vus
// ramping-vus

// por taxa de iteração
// constant-arrival-rate
// ramping-arrival-rate

import { sleep } from "k6";
import http from "k6/http";

export const options = {
  vus: 2,
  duration: "5s",
};

export default function () {
  const BASE_URL = __ENV.URL;

  const res = http.get(BASE_URL);

  sleep(1);
}
