import { initPageWelcome } from "./pages/welcome/index";
import { initPageChat } from "./pages/chat/index";

const routes = [
  { path: /\/welcome/, handler: initPageWelcome },
  { path: /\/chat/, handler: initPageChat },
];

function initRouter(containerEl: Element) {
  function goTo(path: string) {
    history.pushState({}, "", path);
    handleRoute(path);
  }

  function handleRoute(path: string) {
    routes.forEach((r: any) => {
      if (r.path.test(path)) {
        const page = r.handler({ goTo: goTo });

        containerEl.querySelector(".content")?.remove();

        containerEl.appendChild(page);
      }
    });
  }

  if (window.location.pathname == "/") {
    goTo("/welcome");
  } else {
    goTo(window.location.pathname);
  }

  window.addEventListener("popstate", () => {
    goTo(window.location.pathname);
  });
}

export { initRouter };
