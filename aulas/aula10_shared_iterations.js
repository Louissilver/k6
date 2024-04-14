// shared-iterations: um numero fixo de VUs completa um número fixo de iterações

// executor adequado quando desejamos que um numero espeficico de vus execute um numero especifico de iterações
// quantidade de iterações por vus não é importante
// tempo para executar as iterações é importante

import { sleep } from "k6";
import http from "k6/http";

export const options = {
  scenarios: {
    contacts: {
      executor: "shared-iterations",
      vus: 10,
      iterations: 200,
      maxDuration: "30s",
    },
  },
};

export default function () {
  http.get("http://test.k6.io/contacts.php");
  sleep(0.5);
}
