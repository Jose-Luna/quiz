var models = require('../models/models.js');

exports.load = function (req, res, next, quizId) {
    models.Quiz.findById(quizId).then(
        function (quiz) {
            if (quiz) {
                req.quiz = quiz;
                next();
            } else {
                next(new Error('No existe quizId=' + quizId));
            }
        }
    ).catch(function (error) {
        next(error);
    });
}

exports.index = function (req, res) {

    //res.send('Contenido de search: ' + req.query.search);
    if (req.query.search == undefined) {

        models.Quiz.findAll().then(function (quizes) {
            res.render('quizes/index.ejs', {
                quizes: quizes, errors: []
            });
        }).catch(function (error) {
            next(error);
        })

    } else {
        cadena = "%" + req.query.search.trim().replace(/\s/g, "%") + "%"
        models.Quiz.findAll({
            where: {
                pregunta: {
                    like: cadena
                }
            },
            order: "pregunta"
        }).then(function (quizes) {
            res.render('quizes/index.ejs', {
                quizes: quizes
            });
        })
    }
};


/*exports.question = function (req, res) {
    models.Quiz.findAll().then(function (quiz) {
        res.render('quizes/question', {
            pregunta: quiz[0].pregunta
        });
    })
};*/

//GET /quizes/:id
exports.show = function (req, res) {
    /*    models.Quiz.findById(req.params.quizId).then(function (quiz) {
            res.render('quizes/show', {
                quiz: quiz
            });
        })*/
    res.render('quizes/show', {
        quiz: req.quiz
        , errors: []
    });
};

/*exports.answer = function (req, res) {
    models.Quiz.findAll().then(function (quiz) {
        if (req.query.respuesta === quiz[0].respuesta) {
            res.render('quizes/answer', {
                respuesta: 'Correcto'
            });
        } else {
            res.render('quizes/answer', {
                respuesta: 'Incorrecto'
            });
        }
    })
};*/

//GET /quizes/:id/answer
exports.answer = function (req, res) {
    /*    models.Quiz.findById(req.params.quizId).then(function (quiz) {
            if (req.query.respuesta === quiz.respuesta) {
                res.render('quizes/answer', {
                    quiz: quiz,
                    respuesta: 'Correcto!'
                });
            } else {
                res.render('quizes/answer', {
                    quiz: quiz,
                    respuesta: 'Incorrecto'
                });
            }
        })*/
    var resultado = "Incorrecto";
    if (req.query.respuesta === req.quiz.respuesta) {
        resultado = "Correcto";
    }
    res.render('quizes/answer', {
        quiz: req.quiz,
        respuesta: resultado
        , errors: []
    });
};


// GET /quizes/new
exports.new = function (req, res) {
    var quiz = models.Quiz.build({
        pregunta: "Pregunta",
        respuesta: "Respuesta"
    });
    res.render('quizes/new', {
        quiz: quiz
        , errors: []
    });
};

exports.create = function (req, res) {
    var quiz = models.Quiz.build(req.body.quiz);

    quiz.validate().then(function (err) {
        if (err) {
            res.render("quizes/new", {
                quiz: quiz,
                errors: err.errors
            });
        } else {
            quiz.save({
                fields: ["pregunta", "respuesta"]
            }).then(function () {
                res.redirect('/quizes');
            })
        }

    });
};