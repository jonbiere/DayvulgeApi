require('dotenv').config();

const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const socketio = require('socket.io');
const path = require('path');
const cors = require('cors');
const sqlDb = require('./data/sqlDb');
const seedGraph = require('./data/graphSeed.js');

const createApp = () => {

  let originsWhiteList = [
    'http://localhost:3000',
    'https://dev-dayvulge-react.herokuapp.com'
    //'https://dev.dayvulge.com'
  ];
  let corsOptions = {
    origin: (origin, callback) => {
      callback(null, originsWhiteList.indexOf(origin) !== -1)
    },
    credentials: true
  };
  app.use(cors(corsOptions));
  //app.options('*', cors()) 
  
  // for server logs to help debugging
  app.use(morgan('dev'));

  // requests contain a body. If you want to use it in req.body, you will need some body parsing middleware
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({extended: true}))

  // establish routes
  app.use('/', require('./api'))

  //error handling route
  app.use((err, req, res, next) => {
    res.status(500).json({error: err});  
  });
}

// function wrapper around server listen:

const startListening = () => {
  const PORT = process.env.PORT || 3001;
  const server = app.listen(PORT, function(){
    console.log(`Listening on port ${PORT}`)
  })

  // set up our socket control center
  const io = socketio(server)
  require('./socket')(io)
}

sqlDb.sync({force: true})
.then(createApp);
seedGraph().then(startListening);

