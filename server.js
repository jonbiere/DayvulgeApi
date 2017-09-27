require('dotenv').config();

const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const session = require('express-session');
const socketio = require('socket.io');
const passport = require('passport');
const path = require('path');
const cors = require('cors');
const db = require('./data/index.js');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const sessionStore = new SequelizeStore({db});
const graphSeed = require('./neo4jSeed.js');

// function to wrap middleware:
const createApp = () => {

  let originsWhiteList = [
    'http://localhost:3000',
    //'https://dev.dayvulge.com'
  ];
  let corsOptions = {
    origin: (origin, callback) => {
      callback(null, originsWhiteList.indexOf(origin) !== -1)
    },
    credentials: true
  };

  //Allow all orgins for now.
  app.use(cors(corsOptions));
  
  // for server logs to help debugging
  app.use(morgan('dev'));

  // requests contain a body. If you want to use it in req.body, you will need some body parsing middleware
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({extended: true}))

  

  // session middleware with passport
  // https://www.npmjs.com/package/express-session for configuration details
  app.use(session({
    secret: process.env.SESSION_SECRET || 'KeepItSecret KeepItSafe',
    store: sessionStore,
    resave: false,
    saveUninitialized: false,
    cookie:{
      maxAge: 1000*60*30
    }
  }));

  app.use(passport.initialize())
  app.use(passport.session())

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

const toSyncOrNot = process.env.NODE_ENV !== 'production' ? {force: true} : '';

const syncDb = () => db.sync(toSyncOrNot)


// require.main evaluates true when run from command line ('node server/index.js')
// require.main evaluates false when it is required by another module
if (require.main === module) {
  sessionStore.sync()
    .then(syncDb)
    .then(createApp)
    .then(graphSeed)
    .then(startListening)
} else {
  createApp()
}
