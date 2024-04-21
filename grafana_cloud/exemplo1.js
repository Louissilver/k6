// Utilizando o Grafana Cloud para K6
// k6 cloud grafana_cloud/exemplo1.js

//         /\      |‾‾| /‾‾/   /‾‾/
//    /\  /  \     |  |/  /   /  /
//   /  \/    \    |     (   /   ‾‾\
//  /          \   |  |\  \ |  (‾)  |
// / __________ \  |__| \__\ \_____/ .io

// execution: cloud
//    script: grafana_cloud/exemplo1.js
//    output: https://louissilver.grafana.net/a/k6-app/runs/2684108

// scenarios: (100.00%) 1 scenario, 10 max VUs, 1m0s max duration (incl. graceful stop):
//          * default: Up to 10 looping VUs for 30s over 3 stages (gracefulRampDown: 30s, gracefulStop: 30s)

// test status: Finished

import http from "k6/http";
import { sleep, check } from "k6";

export const options = {
  stages: [
    { duration: "10s", target: 10 },
    { duration: "10s", target: 10 },
    { duration: "10s", target: 0 },
  ],
  thresholds: {
    checks: ["rate>0.95"],
    http_req_duration: ["p(95)<200"],
  },
  ext: {
    loadimpact: {
      projectId: "3692905",
      name: "POC CURSO K6",
    },
  },
};

export default function () {
  const BASE_URL = "http://test-api.k6.io/public/crocodiles/";
  let res = http.get(BASE_URL);
  check(res, { "status is 200": (r) => r.status === 200 });
  sleep(1);
}
