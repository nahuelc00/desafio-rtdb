import { initFormComp } from "./components/form";
import { initRouter } from "./router";

function initComponents() {
  initFormComp();
}

(function main() {
  const rootEl = document.querySelector("#root");

  initComponents();
  initRouter(rootEl);
})();
