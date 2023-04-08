exports.home = (req, res) => {
	res.render('index', {
		titulo: 'Título Teste',
		categoria: ['Teste', 'Testando Ejs', 'Injetando conteúdo', 'Views'],
	});
};

exports.sendForm = (req, res) => {
	res.send(req.body);
};
