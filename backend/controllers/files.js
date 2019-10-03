const DB = require('../db');
const formidable = require('formidable');
const RandExp = require('randexp');
const fs = require('fs');

const uploadFile = async (req, res) => {
  try {
    const form = new formidable.IncomingForm();

    const storeFileName = new RandExp(/[A-Z,1-9]{20}/i).gen();

    form.parse(req, async (err, fields, files) => {
      const { file } = files;
      const type = file.name.substr(file.name.lastIndexOf('.'));
      const image = await DB.File.create({
        name: storeFileName + type,
        original_name: file.name,
        type,
      })
      return res.send({ data: image })
    });

    form.on('fileBegin', (name, file) => {
      file.path = process.env.STORE_PATH + '/files/' + storeFileName + file.name.substr(file.name.lastIndexOf('.'));
    })
  } catch (error) {
    console.error(error);
    return res.status(500).send({ error })
  }
}

const downloadFile = async (req, res) => {
  try {
    const fileObject = await DB.File.findByPk(req.params.id);
    const file = process.env.STORE_PATH + '/files/' + fileObject.name;

    return res.download(file, fileObject.original_name);

  } catch (error) {
    console.error(error);
    return res.status(500).send({ error })
  }
};

const deleteFile = async (req, res) => {
  try {
    const { file_id } = req.params;
    const file = await DB.File.findByPk(file_id);
    fs.unlink(process.env.STORE_PATH + '/files/' + file.name, ()=>{});
    await file.destroy();
    res.send({status: 0})

  } catch (error) {
    console.error(error)
    return res.status(500).send({ error: error.message });
  }
};

const connect = app => {
  app.delete('/files/:file_id', deleteFile);
  app.post('/files', uploadFile);
  app.get('/files/:id', downloadFile)
}

module.exports = {
  connect
}
