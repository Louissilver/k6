// Variáveis de ambiente

// Fornecer uma variável de ambiente para o script
// Realizar configurações do escopo de options

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

// Para definir uma variável de ambiente, podemos utilizar o CLI da K6
// Chamamos o comando k6 run --env URL=http://test-api.k6.io/public/crocodiles/ aulas/aula9.js
// ou
// Chamamos o comando k6 run -e URL=http://test-api.k6.io/public/crocodiles/ aulas/aula9.js
// Outros parâmetros como vus e duration também podem ser passados:
// k6 run --env URL=http://test-api.k6.io/public/crocodiles/ aulas/aula9.js --duration 10s --vus 10
// Para stages, podemos usar o comando k6 run --env URL=http://test-api.k6.io/public/crocodiles/ --stage 5s:5,10s:10,5s:0 aulas/aula9.js
// Onde o primeiro item é a duração e o segundo item é a quantidade de vus --stage duration:vus
// Documentação auxiliar: https://k6.io/docs/using-k6/k6-options/reference/
