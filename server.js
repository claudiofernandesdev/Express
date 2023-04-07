require('dotenv').config();

const express = require('express');
const app = express();

const mongoose = require('mongoose');
mongoose
	.connect(process.env.CONNECTIONSTRING, { useNewUrlParser: true })
	.then(() => {
		app.emit('connect');
	})
	.catch((err) => console.log(err));

const session = require('express-session');
const MongoStore = require('connect-mongo');
const flashMessages = require('connect-flash');

const routes = require('./routes');
const path = require('path');
const { middlewareGlobal } = require('./src/middlewares/middleware');

const port = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.resolve(__dirname, 'public')));

const sessionOptions = session({
	secret: 'keyboard Frederico',
	store: MongoStore.create({ mongoUrl: process.env.CONNECTIONSTRING }),
	resave: false,
	saveUninitialized: false,
	cookie: {
		maxAge: 60 * 60 * 24 * 7 * 1000, // tempo que vai durar o cookie (7 dias) em milissegundos.
		httpOnly: true,
	},
});
app.use(sessionOptions);
app.use(flashMessages());

app.set('views', path.resolve(__dirname, 'src', 'views'));
app.set('view engine', 'ejs');

app.use(middlewareGlobal);
app.use(routes);

app.on('connect', () => {
	app.listen(port, () => {
		console.log(`Servidor rodando na porta: ${port}`);
	});
});
