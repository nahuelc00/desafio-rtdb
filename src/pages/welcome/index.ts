import { state } from "../../state";

function addStyle() {
  const styleEl = document.createElement("style");
  styleEl.innerHTML = `
    .content {
      padding: 16px 32px 0 32px;
    }
    
    .content__title {
      font-size: 52px;
      font-weight: 700;
      margin: 0 0 26px 0;
    }

    .content__cont-form {
      max-width: 415px;
      margin: 0 auto;
    }`;

  return styleEl;
}

function initPageWelcome(params) {
  const pageEl = document.createElement("main");
  pageEl.classList.add("content");

  pageEl.innerHTML = `
  <h1 class="content__title">Bienvenidx</h1>
  <div class="content__cont-form">
    <form-custom class="content__form"
    text-label="Tu nombre"
    height-input="55"
    height-button="55"
    text-button="Comenzar"
  ></form-custom>
  </div>`;

  pageEl.appendChild(addStyle());

  const formCustomEl = pageEl.querySelector(".content__form");
  formCustomEl.addEventListener("submit-form", (e: any) => {
    state.setState({
      ...state.getState(),
      myName: e.detail.dataInput,
    });
    params.goTo("/chat");
  });

  return pageEl;
}

export { initPageWelcome };
