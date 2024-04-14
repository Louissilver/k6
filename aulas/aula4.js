// Métricas
// O K6 já possui métricas integradas
// 1. Contadores
// 2. Medidores
// 3. Taxas
// 4. Tendência

// checks.........................: 100.00% ✓ 2        ✗ 0
// data_received..................: 29 kB   8.6 kB/s
// data_sent......................: 750 B   220 B/s
// http_req_blocked...............: avg=179.86ms min=0s       med=177.56ms max=364.33ms p(90)=361.57ms p(95)=362.95ms
// http_req_connecting............: avg=84.64ms  min=0s       med=84.31ms  max=169.93ms p(90)=169.54ms p(95)=169.73ms
// http_req_duration..............: avg=168.9ms  min=164.23ms med=168.59ms max=174.2ms  p(90)=172.77ms p(95)=173.49ms
//   { expected_response:true }...: avg=168.9ms  min=164.23ms med=168.59ms max=174.2ms  p(90)=172.77ms p(95)=173.49ms
// http_req_failed................: 0.00%   ✓ 0        ✗ 4
// http_req_receiving.............: avg=518.2µs  min=0s       med=571.54µs max=929.7µs  p(90)=829.98µs p(95)=879.83µs
// http_req_sending...............: avg=129.75µs min=0s       med=0s       max=519µs    p(90)=363.3µs  p(95)=441.14µs
// http_req_tls_handshaking.......: avg=46.62ms  min=0s       med=0s       max=186.51ms p(90)=130.55ms p(95)=158.53ms
// http_req_waiting...............: avg=168.26ms min=163.3ms  med=168.06ms max=173.61ms p(90)=172.03ms p(95)=172.82ms
// http_reqs......................: 4       1.172368/s
// iteration_duration.............: avg=1.7s     min=1.33s    med=1.7s     max=2.07s    p(90)=1.99s    p(95)=2.03s
// iterations.....................: 2       0.586184/s
// vus............................: 1       min=1      max=1
// vus_max........................: 1       min=1      max=1

import http from "k6/http";
import { check } from "k6";
import { sleep } from "k6";
import { Counter } from "k6/metrics";
import { Gauge } from "k6/metrics";
import { Rate } from "k6/metrics";
import { Trend } from "k6/metrics";

export const options = {
  vus: 1,
  duration: "3s",
};

export const requests = new Counter("quantidade_de_chamadas");

export const blockedTime = new Gauge("tempo_bloqueado");

export const tax = new Rate("taxa_req_200");

export const trend = new Trend("taxa_espera");

export default function () {
  let req = http.get("http://test.k6.io/");
  check(req, {
    "status is 200": (r) => r.status === 200,
  });
  // Contador
  requests.add(1);
  // Medidor
  blockedTime.add(req.timings.blocked);
  // Taxa
  tax.add(req.status === 200);
  // Tendência
  trend.add(req.timings.waiting);
  sleep(1);
}
