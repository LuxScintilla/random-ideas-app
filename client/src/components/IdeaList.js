import ideasApi from "../services/ideasApi";

class IdeaList {
  #ideaListElement;
  #ideas;
  constructor() {
    this.#ideaListElement = document.querySelector("#idea-list");
    this.#ideas = [];
    this.getIdeas();
  }

  addEventListeners() {
    this.#ideaListElement.addEventListener("click", (e) => {
      if (e.target.classList.contains("fa-times")) {
        e.stopImmediatePropagation();
        const ideaId = e.target.parentElement.parentElement.dataset.id;
        this.deleteIdea(ideaId);
      }
    });
  }

  async getIdeas() {
    try {
      const response = await ideasApi.getIdeas();
      this.#ideas = response.data.data;
      this.render();
      console.log(this.#ideas);
    } catch (error) {
      console.log(error);
    }
  }

  async deleteIdea(ideaId) {
    try {
      // Delete from server
      const response = await ideasApi.deleteIdea(ideaId);
      this.#ideas.filter((idea) => {
        return idea._id !== ideaId;
        this.getIdeas();
      });
    } catch (error) {
      alert("You cannot delete this resource");
    }
  }

  addIdeaToList(idea) {
    this.#ideas.push(idea);
    this.render();
  }

  render() {
    this.#ideaListElement.innerHTML = this.#ideas
      .map((idea) => {
        const deleteBtn =
          idea.username === localStorage.getItem("username")
            ? `<button class="delete"><i class="fas fa-times"></i></button>`
            : "";
        return `
      <div class="card" data-id="${idea._id}">
        ${deleteBtn}
        <h3>${idea.text}</h3>
        <p class="tag tag-${idea.tag.toLowerCase()}">${idea.tag.toUpperCase()}</p>
        <p>
          Posted on <span class="date">${idea.date}</span> by
          <span class="author">${idea.username}</span>
        </p>
      </div>
      `;
      })
      .join("");
    this.addEventListeners();
  }
}

export default IdeaList;
