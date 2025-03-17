const express = require("express");
const router = express.Router();

const ideas = [
  {
    id: 1,
    text: "Positive newsletter, a newsletter that only shares positive uplifting news",
    tag: "technology",
    username: "TonyStark",
    date: "17-03-2025",
  },
  {
    id: 2,
    text: "Microwave for your clothes",
    tag: "Inventions",
    username: "Loki",
    date: "11-03-2025",
  },
  {
    id: 3,
    text: "Invisibility cloak has been found in an abandoned lab",
    tag: "News",
    username: "Black Widow",
    date: "09-03-2025",
  },
  {
    id: 4,
    text: "Learning has now become easier with the internet",
    tag: "technology",
    username: "TonyStark",
    date: "06-03-2025",
  },
];

router.get("/", (request, response) => {
  response.json({ success: true, data: ideas });
});

// Get single idea
router.get("/:id", (request, response) => {
  const idea = ideas.find((idea) => {
    return idea.id === Number(request.params.id);
  });

  if (!idea) {
    return response
      .status(404)
      .json({ success: false, error: "Resource not found" });
  }

  response.json({ success: true, data: idea });
});

// Add an idea
router.post("/", (request, response) => {
  const idea = {
    id: ideas.length + 1,
    text: request.body.text,
    tag: request.body.tag,
    username: request.body.username,
    date: new Date().toISOString().slice(0, 10),
  };

  ideas.push(idea);

  response.json({ success: true, data: idea });
});

//Update an idea
router.put("/:id", (request, response) => {
  const idea = ideas.find((idea) => {
    return idea.id === Number(request.params.id);
  });

  if (!idea) {
    return response
      .status(404)
      .json({ success: false, error: "Resource not found" });
  }

  idea.text = request.body.text || idea.text;
  idea.tag = request.body.tag || idea.tag;

  response.json({ success: true, data: idea });
});

// Delete an idea
router.delete("/:id", (request, response) => {
  const idea = ideas.find((idea) => {
    return idea.id === Number(request.params.id);
  });

  if (!idea) {
    return response
      .status(404)
      .json({ success: false, error: "Resource not found" });
  }

  const index = ideas.indexOf(idea);
  ideas.splice(index, 1);

  response.json({ success: true, data: {} });
});

module.exports = router;
