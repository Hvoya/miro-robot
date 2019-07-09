const DB = require('../db');
const { varifyUser } = require('../authMiddleware');

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
      console.log(imageId)
      const image = await DB.Image.findByPk(imageId);
      image.project_id = project.id;
      image.save();
    });
    data.files.forEach(async fileId => {
      const file = await DB.File.findByPk(fileId);
      file.project_id = project.id;
      file.save();
    });

    return res.send({ data: project })
  } catch (error) {
    console.error(error)
    return res.status(500).send({ error })
  }
}

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
      })
    }

    const projects = await DB.Project.findAndCountAll({
      where,
      order,
      limit: pageSize,
      offset: pageSize * page,
      order,
      include: [{
        model: DB.User,
        attributes: ['id', 'username']
      },
      {
        model: DB.Image,
        attributes: ['name'],
        // as: 'MainImage'
      }
      ]
    });

    return res.send({
      data: projects.rows, pagination: {
        total: projects.count,
        pageSize
      },
    })

  } catch (error) {
    console.error(error)
    return res.status(500).send({ error })
  }
}

const getProject = async (req, res) => {
  try {
    const project = await DB.Project.findByPk(req.params.id, {
      include: [
        {
          model: DB.Image,
          attributes: ['name']
        }, {
          model: DB.File,
          attributes: ['id', 'original_name']
        },
        {
          model: DB.User,
          attributes: ['id', 'username', 'first_name', 'last_name'],
          include: {
            model: DB.Image,
            attributes: ['name']
          }
        },
      ]
    });
    project.views = project.views + 1;
    project.save();
    if (!project) return res.status(404).send('not found');

    return res.send({ data: project })

  } catch (error) {
    console.error(error)
    return res.status(500).send({ error })
  }
}

const connect = app => {
  app.post('/projects', varifyUser, createProject);
  app.get('/projects', getProjectList);
  app.get('/projects/:id', getProject);
}

module.exports = {
  connect
}