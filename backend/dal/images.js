const DB = require('../db');
var fs = require('fs');

const deleteImage = async (id) => {
  try{

    const image = await DB.Image.findByPk(id);
    const name = image.name;
    await image.destroy();

    const imagePath = process.env.STORE_PATH + '/images/' + name;
    await fs.unlink(imagePath, ()=>{})

  } catch(error){
    console.error(error);
    // return res.status(500).send({error});
  }
};

module.exports = {
  deleteImage
};
