// Tags

// Tags são maneiras de rotular elementos com K6 e também podem ser usadas com grupos
// Requests
// Checks
// Thresholds
// Métricas customizadas
// Todas as métricas de um teste

import { check, group } from "k6";
import http from "k6/http";

export const options = {
  vus: 4,
  duration: "5s",
  tags: {
    name: "crocodiles",
  },
  thresholds: {
    http_req_failed: ["rate<0.01"],
    "http_req_duration{tipo:busca-todos}": [
      { threshold: "p(95)<200", abortOnFail: true, delayAbortEval: "10s" },
      "p(90)<400",
    ],
    checks: ["rate>0.99"],
  },
};

export default function () {
  group("Get Crocodiles", function () {
    const response1 = http.get("http://test-api.k6.io/public/crocodiles/", {
      tags: {
        tipo: "busca-todos",
      },
    });
    check(response1, { "status is 200": (r) => r.status === 200 });
  });

  group("Get One Crocodile", function () {
    const response2 = http.get("http://test-api.k6.io/public/crocodiles/1/");
    check(response2, { "status is 200": (r) => r.status === 200 });
  });
}
