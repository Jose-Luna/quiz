var path = require('path');

//Cargar Modelo ORM

var Sequelize = require('sequelize');

// Usar BD SQLite

var sequelize = new Sequelize(null, null, null, {
    dialect: "sqlite",
    storage: "quiz.sqlite"
});

// Importar la definición de la tabla Quiz en quiz.jz

var Quiz = sequelize.import(path.join(__dirname, 'quiz'));

exports.Quiz = Quiz; // Exportación de tabla Quiz

// sequelize.sync() crea tabla de preguntas

sequelize.sync().then(function () {
    //success() ejecuta el manejador una vez creada la tabla
    Quiz.count().then(function (count) {
        if (count === 0) { //la tabla se inicializa cuando no existe
            Quiz.create({
                    pregunta: 'Capital de Italia',
                    respuesta: 'Roma'
                })
                .then(function () {
                    console.log('Base de datos arrancada')
                });
        };
    });
});