const express = require("express");
const postsRouter = express.Router();
const { getAllPosts } = require("../db");
const { requireUser } = require("./utils");

postsRouter.use((req, res, next) => {
  console.log("A request is being made to /posts");

  next(); // THIS IS DIFFERENT
});

postsRouter.get("/", async (req, res) => {
  const posts = await getAllPosts();

  res.send({
    posts,
  });
});

postsRouter.post("/", requireUser, async (req, res, next) => {
  const { title, content, tags = "" } = req.body;

  const tagArr = tags.trim().split(/\s+/);
  const postData = {};

  // only send the tags if there are some to send
  if (tagArr.length) {
    postData.tags = tagArr;
  }

  try {
    const postData = { authorId, title, content };
    const post = await createPost(postData);

    res.send({ post });
    // otherwise, next an appropriate error object

    //BOOKMARK - PART 3 WRITING POST
    next(error);
  } catch ({ name, message }) {
    next({ name, message });
  }
});

module.exports = postsRouter;
