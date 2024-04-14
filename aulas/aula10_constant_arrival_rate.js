// constant-arrival-rate:
// numero fixo de iterações iniciadas pelo K6
// novas iterações iniciadas enquanto houver VUs disponíveis
// novas iterações seguindo sempre a taxa configurada

// executor com foco em métricas como o RPS (requests per second)

import http from "k6/http";

export const options = {
  scenarios: {
    contacts: {
      executor: "constant-arrival-rate",
      duration: "30s",
      rate: 30,
      timeUnit: "1s",
      preAllocatedVUs: 50,
    },
  },
};

export default function () {
  http.get("http://test.k6.io/contacts.php");
}
