require('dotenv').config();

const 
  express = require('express'),
  router = require('./router'),
  mongoose = require('mongoose'),
  bodyParser = require('body-parser'),
  cors = require('cors'),
  url =`mongodb://127.0.0.1:27017/?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+1.10.1`;

mongoose.Promise = global.Promise;
mongoose.connect(url).then(() => console.log('Connected to Database.')).catch(err => console.log(err));

const app = express();  

app.use(bodyParser.json());
app.use(express.json());

const whitelist = ["http://localhost:3000"];
const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
};

app.use(cors(corsOptions));

app.use('/api', router);

module.exports = app;
