const express = require("express");
const router = express.Router();
const { Comments } = require("../models");
const { validateToken }=require ("../middlewares/AuthMiddleware");

router.get("/:postId", async (req, res) => {
  const postId = req.params.postId;
  const comments = await Comments.findAll({ where: { PostId: postId } });
  res.json(comments);
});

router.post("/", validateToken, async (req, res) => {
  const comment = req.body;
  const username = req.user.username;
  comment.username = username;
  await Comments.create(comment);
  return res.json(comment);
});

router.delete("/:commmentId", validateToken, async (req, res) => {
  const commmentId = req.params.commmentId;
  await Comments.destroy({ where: {
     id: commmentId } });
  return res.json("Comment deleted successfully");
});

module.exports = router;