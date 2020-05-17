var createError = require('http-errors')
var express = require('express')
var path = require('path')
var cookieParser = require('cookie-parser')
var logger = require('morgan')
var mongoose = require('mongoose')
var bodyParser = require('body-parser')
var user = process.env.DB_USER
var pass = process.env.DB_PASS

var productsRouter = require('./routes/products')
var usersRouter = require('./routes/users')

var app = express()

mongoose.Promise = global.Promise

mongoose
  .connect(
    'mongodb://' + user + ':' + pass + '@ds155699.mlab.com:55699/products',
    {
      useNewUrlParser: true,
      useUnifiedTopology: true
    }
  )
  .then(() => console.log('connection succesful'))
  .catch(err => console.error(err))

// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: 'true' }))
app.use(bodyParser.json({ type: 'application/vnd.api+json' }))

app.use(express.static(path.join(__dirname, 'public')))

app.use('/users', usersRouter)
app.use('/products', productsRouter)

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404))
})

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.render('error')
})

module.exports = app
