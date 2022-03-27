import { state } from "../../state";

function addStyle() {
  const styleEl = document.createElement("style");
  styleEl.innerHTML = `
  .content {
    padding: 16px 32px 32px 32px;
  }
  
  .content__title {
    font-size: 52px;
    font-weight: 700;
    margin: 0 0 26px 0;
  }
  
  .content__messages {
    display: flex;
    margin: 0 auto;
    max-width: 415px;
    justify-content: flex-end;
    flex-direction: column;
    height: 60vh;
  }
  .content__message {
    margin: 0 0 12px 0;
    display: flex;
    justify-content: flex-end;
  }
  .content__message p {
    background-color: #b9e97c;
    min-width: 70px;
    padding:6px;
    display: flex;
    height: 52px;
    align-items: center;
    justify-content: center;
    border-radius: 4px;
    margin: 0;
  }
  .content__message-partaker {
    margin: 0 0 12px 0;
    display: grid;
    justify-content: flex-start;
  }
  .content__label-partaker {
    font-size: 14px;
    font-weight: 400;
    margin: 0;
    color: #a5a5a5;
  }
  .content__text-partaker {
    margin: 0;
    align-items: center;
    justify-content: center;
    display: flex;
    height: 52px;
    width: 106px;
    border-radius: 4px;
    background-color: #d8d8d8;
  }
  
  .content__cont-form {
    max-width: 415px;
    margin: 0 auto;
  }`;

  return styleEl;
}

function printMessages(containerMessages: Element, dataMessages) {
  dataMessages.messages.forEach((element, index) => {
    const message = dataMessages.messages[index].message;
    console.log(message);

    const messageEl = document.createElement("div");

    messageEl.innerHTML = `
      <div class="content__message">
        <p>${message}</p>
      </div>`;

    containerMessages.appendChild(messageEl);
  });
}

function getAndSetMessages() {
  return fetch("http://localhost:3000/messages")
    .then((response) => response.json())
    .then((dataMessages) => {
      state.setState({
        ...state.getState(),
        ...dataMessages,
      });
    });
}

function listenerSubmitForm(formCustom: Element) {
  formCustom.addEventListener("submit-form", (e: any) => {
    const dataToBody = {
      name: state.getMyName(),
      message: e.detail.dataInput,
    };

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dataToBody),
    };

    fetch("http://localhost:3000/messages", options)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  });
}

function initPageChat(params) {
  const pageEl = document.createElement("main");
  pageEl.classList.add("content");

  pageEl.innerHTML = `
  <h1 class="content__title">Chat</h1>

  <div class="content__messages">
  </div>

  <div class="content__cont-form">
    <form-custom class="content__form"
    height-input="55"
    height-button="55px"
    text-button="Enviar"
    ></form-custom>
  </div>
  `;

  const messagesFetch = getAndSetMessages();
  const containerMessagesEl = pageEl.querySelector(".content__messages");

  const formCustomEl = pageEl.querySelector(".content__form");
  listenerSubmitForm(formCustomEl);

  messagesFetch.then(() => {
    console.log(state.getState());
    const dataMessages = state.getState().messages;
    const myName = state.getMyName();
    console.log("Messages del state", dataMessages);

    const lengthMessages = Object.keys(dataMessages).length;

    for (let index = 0; index < lengthMessages; index++) {
      const messageItem: any = Object.values(dataMessages)[index];
      const messageEl = document.createElement("div");

      if (messageItem.name != myName) {
        messageEl.innerHTML = `
        <div class="content__message-partaker">
          <p class="content__label-partaker">${messageItem.name}</label>
          <p class="content__text-partaker">${messageItem.message}</p>
        </div>`;
      } else {
        messageEl.innerHTML = `
        <div class="content__message">
          <p>${messageItem.message}</p>
        </div>`;
      }

      containerMessagesEl.appendChild(messageEl);
    }
  });

  pageEl.appendChild(addStyle());
  return pageEl;
}

export { initPageChat };
