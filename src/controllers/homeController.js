exports.home = (req, res) => {
	res.render('index');
};

exports.sendForm = (req, res) => {
	res.send(req.body);
};
