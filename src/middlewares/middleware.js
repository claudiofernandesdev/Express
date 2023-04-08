exports.middlewareGlobal = (req, res, next) => {
	next();
};

exports.checkErrorCsrf = (err, req, res, next) => {
	if (err && err.code === 'EBADCSRFTOKEN') {
		res.render('403');
	}
    // next();
};

exports.csrfMiddleware = (req, res, next) => {
    res.locals.csrfToken = req.csrfToken();
    next();
};
