function initFormComp() {
  class FormComponent extends HTMLElement {
    shadow = this.attachShadow({ mode: "open" });
    textLabel: string;
    textButton: string;
    heightInput: number;
    heightButton: number;
    constructor() {
      super();
      this.textLabel = this.getAttribute("text-label") || "";
      this.textButton = this.getAttribute("text-button") || "body";
      this.heightInput = parseInt(this.getAttribute("height-input") || "30");
      this.heightButton = parseInt(this.getAttribute("height-button") || "30");
      this.render();
    }

    dispatchEventSubmit(formEl: HTMLFormElement) {
      formEl.addEventListener("submit", (e: any) => {
        e.preventDefault();
        const event = new CustomEvent("submit-form", {
          detail: {
            dataInput: e.target.input.value,
          },
        });
        this.dispatchEvent(event);
      });
    }

    render() {
      const style = document.createElement("style");

      this.shadow.innerHTML = `
      <form class="form">
        <fieldset class="fieldset">
            <label class="label" for="input">${this.textLabel}</label>
            <input class="input" type="text" id="input" />
        </fieldset>
        <button class="button">${this.textButton}</button>
      </form>
      `;

      style.innerHTML = `
        * {
        box-sizing: border-box;
        }
          
          .fieldset {
            border-style: none;
            display: grid;
            margin: 0 0 16px 0;
            padding: 0;
          }
          
          .label {
            font-weight: 500;
            font-size: 24px;
          }
          
          .input {
            height:${this.heightInput}px;
            border: 2px solid #000000;
            border-radius: 4px;
            margin: 0;
          }
          .button {
            font-family: "Roboto";
            font-weight: 500;
            font-size: 22px;
            background: #9cbbe9;
            border-style: none;
            height:${this.heightButton}px;
            border-radius: 4px;
            width:100%;
          }`;

      this.shadow.appendChild(style);

      this.dispatchEventSubmit(this.shadow.querySelector(".form"));
    }
  }
  customElements.define("form-custom", FormComponent);
}

export { initFormComp };
