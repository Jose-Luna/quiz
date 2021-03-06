var path = require('path');

var url = process.env.DATABASE_URL.match(/(.*)\:\/\/(.*?)\:(.*)@(.*)\:(.*)\/(.*)/);
var DB_name = (url[6] || null);
var user = (url[2] || null);
var pwd = (url[3] || null);
var protocol = (url[1] || null);
var dialect = (url[1] || null);
var port = (url[5] || null);
var host = (url[4] || null);
var storage = process.env.DATABASE_STORAGE;

//Cargar Modelo ORM

var Sequelize = require('sequelize');

// Usar BD SQLite

/*var sequelize = new Sequelize(null, null, null, {
    dialect: "sqlite",
    storage: "quiz.sqlite"
});*/

// Se escoge SQLite o Postgres

var sequelize = new Sequelize(DB_name, user, pwd, {
    dialect: protocol,
    protocol: protocol,
    port: port,
    host: host,
    storage: storage,
    omitNull: true
});

// Importar la definición de la tabla Quiz en quiz.jz

var quiz_path = (path.join(__dirname, 'quiz'));
var Quiz = sequelize.import(quiz_path);

var comment_path = path.join(__dirname, 'comment');
var Comment = sequelize.import(comment_path);

Comment.belongsTo(Quiz);
Quiz.hasMany(Comment);

exports.Quiz = Quiz; // Exportación de tabla Quiz
exports.Comment = Comment;

// sequelize.sync() crea tabla de preguntas

sequelize.sync().then(function () {
    //success() ejecuta el manejador una vez creada la tabla
    Quiz.count().then(function (count) {
        if (count === 0) { //la tabla se inicializa cuando no existe
            Quiz.create({
                pregunta: 'Capital de Italia',
                respuesta: 'Roma',
                tema: 'ocio'
            });
            Quiz.create({
                    pregunta: 'Capital de Portugal',
                    respuesta: 'Lisboa',
                    tema: 'ocio'
                })
                .then(function () {
                    console.log('Base de datos arrancada')
                });
        };
    });
});