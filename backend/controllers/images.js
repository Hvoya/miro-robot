const DB = require('../db');
const formidable = require('formidable');
const RandExp = require('randexp');

const uploadImage = async (req, res) => {
  try {
    const form = new formidable.IncomingForm();

    const storeFileName = new RandExp(/[A-Z,1-9]{20}/i).gen();

    form.parse(req, async (err, fields, files) => {
      const { file } = files;
      const type = file.name.substr(file.name.lastIndexOf('.'));
      const image = await DB.Image.create({
        name: storeFileName + type,
        original_name: file.name,
        type,
        avatar: false
      })
      return res.send({ data: image })
    });

    form.on('fileBegin', (name, file) => {
      file.path = process.env.STORE_PATH + '/images/' + storeFileName + file.name.substr(file.name.lastIndexOf('.'));
    })
  } catch (error) {
    console.error(error);
    return res.status(500).send({ error })
  }
}

const connect = app => {
  app.post('/images', uploadImage);
}

module.exports = {
  connect
}