import IdeasApi from "../services/ideasApi";
import IdeaList from "./IdeaList";

class IdeaForm {
  #formModal;
  #form;
  #ideaList;

  constructor() {
    this.#formModal = document.querySelector("#form-modal");
    this.#ideaList = new IdeaList();
  }

  addEventListeners() {
    this.#form.addEventListener("submit", this.handleSubmit.bind(this));
  }

  async handleSubmit(event) {
    event.preventDefault();

    if (
      !this.#form.elements.text.value ||
      !this.#form.elements.tag.value ||
      !this.#form.elements.username.value
    ) {
      alert("Please enter all fields");
      return;
    }

    // Save user to Local Storage
    localStorage.setItem("username", this.#form.elements.username.value);

    const idea = {
      text: this.#form.elements.text.value,
      tag: this.#form.elements.tag.value,
      username: this.#form.elements.username.value,
    };
    // Add idea to server
    const newIdea = await IdeasApi.createIdea(idea);

    // Add idea to list
    this.#ideaList.addIdeaToList(newIdea.data.data);

    // Clear Fields
    this.#form.elements.text.value = "";
    this.#form.elements.tag.value = "";
    this.#form.elements.username.value = "";

    this.render();

    document.dispatchEvent(new Event("closemodal"));
  }

  render() {
    this.#formModal.innerHTML = `
    <form id="idea-form">
      <div class="form-control">
        <label for="idea-text">Enter a Username</label>
        <input type="text" name="username" id="username" value="${
          localStorage.getItem("username")
            ? localStorage.getItem("username")
            : ""
        }"/>
      </div>
      <div class="form-control">
        <label for="idea-text">What's Your Idea?</label>
        <textarea name="text" id="idea-text"></textarea>
      </div>
      <div class="form-control">
        <label for="tag">Tag</label>
        <input type="text" name="tag" id="tag" />
      </div>
      <button class="btn" type="submit" id="submit">Submit</button>
    </form>
    `;
    this.#form = document.querySelector("#idea-form");
    this.addEventListeners();
  }
}

export default IdeaForm;
