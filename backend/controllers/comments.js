const DB = require("../db");
const { varifyUser } = require("../authMiddleware");

const createComment = async (req, res) => {
  try {
    const { user } = res.locals;
    const data = req.body;
    const comment = await DB.Comment.create({
      user_id: user.id,
      message: data.comment,
      project_id: data.project_id
    });
    const project = await DB.Project.findByPk(data.project_id);
    project.comment_count = project.comment_count + 1;
    await project.save();
    return res.send({ data: comment });
  } catch (error) {
    console.log(error);
    return res.send({ error });
  }
};

const deleteComment = async (req, res) => {
  try {
    const { user } = res.locals;
    const comment_id = req.params.id;

    const comment = await DB.Comment.findByPk(comment_id);
    if (!comment) return res.status(404).send({ error: "not found" });

    if (user.role !== 0 && user.id !== comment.user_id)
      return res.status(403).send({ error: "forbidden" });

    const project = await DB.Project.findByPk(comment.project_id);
    project.comment_count = project.comment_count - 1;
    await project.save();

    await comment.destroy();


    return res.send({ status: 0 });
  } catch (error) {
    console.error(error);
    return res.status(500).send({ error });
  }
};

const connect = app => {
  app.delete("/comments/:id", varifyUser, deleteComment);
  app.post("/comments", varifyUser, createComment);
};

module.exports = {
  connect
};
