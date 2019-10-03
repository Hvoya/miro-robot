const Op = require("sequelize").Op;

const DB = require("../db");
const { varifyUser } = require("../authMiddleware");
const { deleteImage } = require('../dal/images')

const createProject = async (req, res) => {
  try {
    const { user } = res.locals;
    const data = req.body;

    const project = await DB.Project.create({
      name: data.name,
      description: data.description,
      user_id: user.id,
      main_image_id: data.main_image_id
    });
    data.images.forEach(async imageId => {
      console.log(imageId);
      const image = await DB.Image.findByPk(imageId);
      image.project_id = project.id;
      image.save();
    });
    data.files.forEach(async fileId => {
      const file = await DB.File.findByPk(fileId);
      file.project_id = project.id;
      file.save();
    });

    return res.send({ data: project });
  } catch (error) {
    console.error(error);
    return res.status(500).send({ error });
  }
};

const getProjectList = async (req, res) => {
  try {
    let jq = JSON.parse(req.query.jq);

    let pagination = jq.pagination,
      filters = jq.filters,
      sorter = jq.sorter;

    let pageSize = pagination.size || 10,
      page = pagination.page || 0;

    let where = [],
      order = [];

    if (sorter.field) {
      const sort = sorter.order == "descend" ? "DESC" : "ASC";
      order = [[sorter.field, sort]];
    }

    if (filters.user_id) {
      where.push({
        user_id: filters.user_id
      });
    }

    if (filters.search) {
      where.push({
        name: {
          [Op.iLike]: "%" + filters.search + "%"
        }
      });
    }

    const projects = await DB.Project.findAndCountAll({
      where,
      order,
      limit: pageSize,
      offset: pageSize * page,
      order,
      include: [
        {
          model: DB.User,
          attributes: ["id", "username"]
        },
        {
          model: DB.Image,
          attributes: ["name"]
          // as: 'MainImage'
        }
      ]
    });

    return res.send({
      data: projects.rows,
      pagination: {
        total: projects.count,
        pageSize,
        current: page
      }
    });
  } catch (error) {
    console.error(error);
    return res.status(500).send({ error });
  }
};

const getProject = async (req, res) => {
  try {
    const project = await DB.Project.findByPk(req.params.id, {
      include: [
        {
          model: DB.Image,
          attributes: ["name", "id"]
        },
        {
          model: DB.File,
          attributes: ["id", "original_name"]
        },
        {
          model: DB.User,
          attributes: ["id", "username", "first_name", "last_name"],
          include: {
            model: DB.Image,
            attributes: ["id", "name",]
          }
        },
        {
          model: DB.Comment,
          include: {
            model: DB.User,
            include: DB.Image
          }
        }
      ]
    });
    project.views = project.views + 1;
    project.save();
    if (!project) return res.status(404).send("not found");

    const user_id = req.query.user_id;
    if (!user_id) return res.send({ data: project });

    const like = await DB.Like.findOne({
      where: {
        user_id: user_id,
        project_id: req.params.id
      }
    });

    if (like) {
      project.dataValues.liked = true;
    } else {
      project.dataValues.liked = false;
    }

    return res.send({ data: project });
  } catch (error) {
    console.error(error);
    return res.status(500).send({ error });
  }
};

const deleteProject = async (req, res) => {
  try {
    const { user } = res.locals;
    if (user.role !== 0) return res.status(403).send({ error: "Forbidden" });

    const images = await DB.Image.findAll({where: {project_id: req.params.id}});

    for(let image of images){
    	await deleteImage(image.id);
		}

    const project = await DB.Project.findByPk(req.params.id);
    await project.destroy();

    return res.send({ status: 0 });
  } catch (error) {
    console.error(error);
    return res.status(500).send({ error });
  }
};
const updateProject = async (req, res) => {
  try {
    const updatedValues = req.body;
    const { project_id } = req.params;
    const { user: { id : user_id, role } } = res.locals;
    const project = await DB.Project.findByPk(project_id, { include: DB.User });
    if (project.user.id !== user_id && role !== 0) return res.status(403).send({ error: 'Forbidden'});
    const updatedProject = await project.update(updatedValues);

    await updatedValues.images.forEach(async imageId => {
      const image = await DB.Image.findByPk(imageId);
      image.project_id = project.id;
      image.save();
    });
    await updatedValues.files.forEach(async fileId => {
      const file = await DB.File.findByPk(fileId);
      file.project_id = project.id;
      file.save();
    });

    return res.send({data: updatedProject});

  } catch (error) {
    console.error(error);
    return res.status(500).send({ error: error.message });
  }
};

const connect = app => {
  app.put("/projects/:project_id", varifyUser, updateProject);
  app.delete("/projects/:id", varifyUser, deleteProject);
  app.post("/projects", varifyUser, createProject);
  app.get("/projects", getProjectList);
  app.get("/projects/:id", getProject);
};

module.exports = {
  connect
};
