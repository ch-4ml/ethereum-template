// ExpressJS Setup
const express = require('express');
const app = express();
var bodyParser = require('body-parser');
const path = require('path');
var session       = require('express-session');
var cors          = require('cors');
// Constants
const PORT = 8800;
const HOST = '0.0.0.0';

// initialize session
app.use(session({
    secret: 'ProductDapp',
    resave: true,
    saveUninitialized: true
   }));
   app.use(cors())


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// use static file
app.use(express.static(path.join(__dirname, 'public')));
// configure app to use body-parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Router
var indexRouter = require('./router/mainPage');
var loginRouter = require('./router/login');

var logoutRouter = require('./router/logout');
var itemsRouter = require('./router/items');
var newRouter = require('./router/new');
var buyRouter = require('./router/buy');
// var mypageRouter = require('./router/mypage');

app.use('/', indexRouter);
app.use('/mainPage', indexRouter);
app.use('/login', loginRouter);
app.use('/loginProcess', loginRouter);
app.use('/logout', logoutRouter);
app.use('/items', itemsRouter);
app.use('/new', newRouter);
app.use('/show', itemsRouter);
app.use('/buy', buyRouter);
// app.use('/rate', rateRouter);
// app.use('/mypage', mypageRouter);

// server start
app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);

/* // DB
var mongoose = require('mongoose');

// index 
var autoIncrement = require('mongoose-auto-increment');
mongoose.set('useCreateIndex', true);
mongoose.connect('mongodb://localhost:27017/web_template', { useNewUrlParser: true,  useUnifiedTopology: true  })
var db = mongoose.connection
autoIncrement.initialize(db);

db.on('error', function(){
    console.log('MongoDB connection failed!')
})
db.once('open', function(){
    console.log('MongoDB connection success!')
})


// Passport
var passport = require('passport')
var session = require('express-session')
// flash는 session이 필요하므로 반드시 session 아래에 정의해야 함
var flash = require('connect-flash');
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true
}))
app.use(passport.initialize())
app.use(passport.session())
app.use(flash()) */


