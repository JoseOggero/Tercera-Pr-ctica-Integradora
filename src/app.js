const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');
const session = require('express-session');
const app = express();

mongoose.connect('mongodb://localhost/JoseOggero', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
mongoose.connection.on('error', (error) => {
  console.error('Error de conexión a MongoDB:', error);
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(session({ secret: 'tu_secreto', resave: false, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const productsRouter = require('./routes/products');
const passwordResetRouter = require('./routes/passwordReset');

app.use('/', indexRouter);
app.use('/api/users', usersRouter);
app.use('/api/products', productsRouter);
app.use('/api/password-reset', passwordResetRouter);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Servidor en funcionamiento en el puerto ${port}`);
});
