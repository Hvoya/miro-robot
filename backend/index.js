const path = require('path');
const bodyParser = require('body-parser');
const express = require('express');
const morgan = require('morgan');
const dotenv = require('dotenv');

const PORT = parseInt(process.env.PORT, 10) || 3001;

const app = express();

dotenv.config({ path: path.resolve(__dirname, '../.env') });

if (process.env.NODE_ENV !== 'production') {
  app.use('/images', express.static(process.env.STORE_PATH + '/images'))
}

require('./db/migrate').do(); // Migrate DB

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Controllers
require('./controllers/users').connect(app);
require('./controllers/auth').connect(app);
require('./controllers/images').connect(app);
require('./controllers/files').connect(app);

app.listen(PORT, () => console.log('Miro API Server starts on port ' + PORT))