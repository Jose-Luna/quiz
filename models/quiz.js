// Definición del modelo de QUiz

module.exports = function (sequelize, DataTypes) {
    return sequelize.define('Quiz', {
        pregunta: {
            type: DataTypes.STRING, validate: {
                notEmpty: {
                    msg: "Falta el contenido de la pregunta"
                }
            }
        },
        respuesta: {
            type: DataTypes.STRING, validate: {
                notEmpty: {
                    msg: "Falta el contenido de la respuesta"
                }
            }
        }
    });
}