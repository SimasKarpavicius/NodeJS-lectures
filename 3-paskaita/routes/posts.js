const express = require("express");
const router = express.Router();

let posts = [
  {
    userId: 1,
    id: 5,
    title: "nesciunt quas odio",
    body: "repudiandae veniam quaerat sunt sed\nalias aut fugiat sit autem sed est\nvoluptatem omnis possimus esse voluptatibus quis\nest aut tenetur dolor neque"
  },
  {
    userId: 1,
    id: 6,
    title: "dolorem eum magni eos aperiam quia",
    body: "ut aspernatur corporis harum nihil quis provident sequi\nmollitia nobis aliquid molestiae\nperspiciatis et ea nemo ab reprehenderit accusantium quas\nvoluptate dolores velit et doloremque molestiae"
  },
  {
    userId: 1,
    id: 7,
    title: "magnam facilis autem",
    body: "dolore placeat quibusdam ea quo vitae\nmagni quis enim qui quis quo nemo aut saepe\nquidem repellat excepturi ut quia\nsunt ut sequi eos ea sed quas"
  },
];

router.get("/posts", (req, res) => {
  const { title } = req.query;
  let resultPosts = posts;

  if (title) {
    resultPosts = posts.filter((post) =>
      post.title.toLowerCase().includes(title.toLowerCase())
    );
  }

  res.json(resultPosts);
});

router.get("/posts/:id", (req, res) => {
  const { id } = req.params;
  const foundPost = posts.find((post) => post.id === +id);

  if (foundPost) {
    res.json(foundPost);
  } else {
    res.status(404).json([]);
  }
});

router.post("/posts", (req, res) => {
  const { title, body } = req.body;
  const newPost = { id: Date.now(), title, body };
  posts.push(newPost);

  res.json(newPost);
});

router.put("/posts/:id", (req, res) => {
  const { id } = req.params;
  const { title, body } = req.body;

  const foundIndex = posts.findIndex((post) => post.id === +id);

  if (foundIndex !== -1) {
    posts[foundIndex] = { ...posts[foundIndex], title, body };
    res.json(posts[foundIndex]);
  } else {
    res.status(404).json({ error: "Failed to update post" });
  }
});

router.delete("/posts/:id", (req, res) => {
  const id = +req.params.id;

  const foundIndex = posts.findIndex((post) => post.id === id);
  if (foundIndex !== -1) {
    const deletingPost = posts[foundIndex];
    posts.splice(foundIndex, 1);
    res.json(deletingPost);
  } else {
    res.status(404).json({ error: "Failed to delete post" });
  }
});

module.exports = router;