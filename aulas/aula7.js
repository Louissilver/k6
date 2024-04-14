// Groups

// Os grupos são formas de organizar as transações

import { check, group } from "k6";
import http from "k6/http";

export const options = {
  vus: 4,
  duration: "5s",
};

export default function () {
  group("Get Crocodiles", function () {
    const response1 = http.get("http://test-api.k6.io/public/crocodiles/");
    check(response1, { "status is 200": (r) => r.status === 200 });
  });

  group("Get One Crocodile", function () {
    const response2 = http.get("http://test-api.k6.io/public/crocodiles/1/");
    check(response2, { "status is 200": (r) => r.status === 200 });
  });
}

// Comando para executar o teste gerando CSV: k6 run -o csv=resultado.csv aulas/aula7.js
