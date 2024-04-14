// O ciclo de vida do K6 e:
// 1. inicialização
// 2. configuração
// 3. execução
// 4. desmontagem
// Sempre que um teste for executado, o K6 irá executar as etapas 1, 2 e 3.
// E quando o teste for finalizado, o K6 irá executar a etapa 4.

//1. inicialização
import sleep from "k6";

//2. configuração
export const options = {
  vus: 1,
  duration: "10s",
};

//3. execução
export default function () {
  console.log("Testando K6");
  sleep(1);
}

//4. desmontagem
export function teardown(data) {
  console.log(data);
  sleep(1);
}
