// Como gerar relatórios de saída com K6
// Repositório: https://github.com/benc-uk/k6-reporter

import http from "k6/http";
import { check } from "k6";
import { htmlReport } from "https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js";

export const options = {
  vus: 1,
  duration: "30s",
  thresholds: {
    checks: ["rate>0.99"],
  },
};

export default function () {
  const BASE_URL = "http://test-api.k6.io/public/crocodiles/";
  let res = http.get(BASE_URL);
  check(res, { "status is 200": (r) => r.status === 200 });
}

export function handleSummary(data) {
  return {
    "relatorio_k6.html": htmlReport(data),
  };
}
