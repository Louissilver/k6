// constant-vus:
// um numero fixo de vus executar quantas requisições forem possíveis

// numero especifico de vus em um determinado periodo de tempo

import { sleep } from "k6";
import http from "k6/http";

export const options = {
  scenarios: {
    contacts: {
      executor: "constant-vus",
      vus: 10,
      duration: "30s",
    },
  },
};

export default function () {
  http.get("http://test.k6.io/contacts.php");
  sleep(0.5);
}
