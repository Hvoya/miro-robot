const path = require('path');
const bodyParser = require('body-parser');
const express = require('express');
const morgan = require('morgan');
const dotenv = require('dotenv');

const PORT = parseInt(process.env.PORT, 10) || 3001;

const app = express();

dotenv.config({ path: path.resolve(__dirname, '../.env') });

if (process.env.NODE_ENV !== 'production') {
  app.use(express.static('assets'));
  app.use('/images', express.static(process.env.STORE_PATH + '/images'))
}

// if (process.env.NODE_ENV !== 'production') {
//   app.use('/files', express.static(process.env.STORE_PATH + '/files'))
// }

require('./db/migrate').do(); // Migrate DB

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.set('views', './pages');
app.set('view engine', 'pug');
// Controllers
require('./controllers/users').connect(app);
require('./controllers/auth').connect(app);
require('./controllers/images').connect(app);
require('./controllers/files').connect(app);
require('./controllers/projects').connect(app);
require('./controllers/comments').connect(app);
require('./controllers/likes').connect(app);

app.listen(PORT, () => console.log('Miro API Server starts on port ' + PORT))