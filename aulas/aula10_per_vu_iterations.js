// per-vu-iterations:
// cada VU executa um número exato de iterações
// número total de iterações: VU x iterações

// numero específico de VUs completa um número fixo de iterações
// particionar dados de testes entre as vus

import { sleep } from "k6";
import http from "k6/http";

export const options = {
  scenarios: {
    contacts: {
      executor: "per-vu-iterations",
      vus: 10,
      iterations: 20,
      maxDuration: "30s",
    },
  },
};

export default function () {
  http.get("http://test.k6.io/contacts.php");
  sleep(0.5);
}
