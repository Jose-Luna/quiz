var models = require('../models/models.js');


/*exports.question = function (req, res) {
    models.Quiz.findAll().then(function (quiz) {
        res.render('quizes/question', {
            pregunta: quiz[0].pregunta
        });
    })
};*/

//GET /quizes/:id
exports.show = function (req, res) {
    models.Quiz.findById(req.params.quizId).then(function (quiz) {
        res.render('quizes/show', {
            quiz: quiz
        });
    })
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
    models.Quiz.findById(req.params.quizId).then(function (quiz) {
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
    })
};

exports.index = function (req, res) {
    models.Quiz.findAll().then(function (quizes) {
        res.render('quizes/index.ejs', {
            quizes: quizes
        });
    })
};