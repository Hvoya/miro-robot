const DB = require('../db');
const { varifyUser } = require('../authMiddleware');

const createLike = async (req, res) => {
  try{
    const { user } = res.locals;
    const data = req.body;
    
    const like = await DB.Like.create({
        user_id: user.id,
        project_id: data.project_id
    });

    const project = await DB.Project.findByPk(data.project_id);
    project.like_count = project.like_count + 1;

    await project.save();

    return res.send({data: like})
  }
  catch(error){
    console.log(error);
    return res.send({error})
  }
}

const connect = app => {
  app.post('/likes', varifyUser, createLike);
}

module.exports = {
  connect
}