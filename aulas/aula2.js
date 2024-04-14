// Requisição HTTP com K6
import http from "k6/http";
import { sleep } from "k6";

// É possível utilizar os métodos HTTP da biblioteca K6, como http.get(), http.put(), http.delete() e http.post().

export default function () {
  http.get("http://test.k6.io/");
  sleep(1);
}

// Comando para executar o teste: k6 run aula2.js
