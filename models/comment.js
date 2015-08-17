module.exports = function (sequelize, DataTypes) {
    return sequelize.define(
        'Comment', {
            texto: {
                type: DataTypes.STRING,
                validate: {
                    notEmpty: {
                        msg: " Comentario necesario"
                    }

                }

            },
            publicado: {
                type: DataTypes.BOOLEAN,
                defaultValue: false
            }
        }

    );
}