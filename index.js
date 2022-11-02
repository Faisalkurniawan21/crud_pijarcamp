const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

const session = require('express-session');

app.set('trust proxy', 1);
app.use(session({
  secret: 's3Cur3',
  name: 'sessionId',
  resave: true,
  saveUninitialized: true,
}));

require('dotenv').config();

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server is running on port http://localhost:${PORT}`));

const path = require('path');

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

require('./routes/product.route')(app);
