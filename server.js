require('dotenv').config();

const express = require('express');
const app = express();

const mongoose = require('mongoose');

mongoose
	.connect(process.env.CONNECTIONSTRING, { useNewUrlParser: true })
	.then(() => {
		console.log('Connected to DB');
		app.emit('connect');
	})
	.catch((err) => console.log(err));

const path = require('path');
const routes = require('./routes');
const { middlewareGlobal } = require('./src/middlewares/middleware');

const port = 3000;
 
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.resolve(__dirname, 'public')));

app.set('views', path.resolve(__dirname, 'src', 'views'));
app.set('view engine', 'ejs');

app.use(middlewareGlobal);
app.use(routes);

app.on('connect', () => {
	app.listen(port, () => {
		console.log(`Servidor rodando na porta: ${port}`);
	});
});
