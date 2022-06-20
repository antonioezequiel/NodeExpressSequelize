'use strict';
const {
  Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Pesssoa extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Pesssoa.hasMany(models.Turmas, {
        foreignKey: 'docente_id'
      })
      Pesssoa.hasMany(models.Matriculas, {
        foreignKey: 'estudante_id',
        scope: {
          status: 'confirmado'
        }, 
        as: 'aulasMatriculadas'
      })
    }
  }
  Pesssoa.init({
    nome: { 
      type: DataTypes.STRING,
      allowNull:false,
      validate: {
          validaNome: function(dado) {
            if(dado.length < 3) throw new Error('Tamanho do nome é inválido')
          },
          notEmpty: true
      }
    },
    ativo: DataTypes.BOOLEAN,
    email: {
      type: DataTypes.STRING, 
      allowNull:false,
      validate: {
        notEmpty: true,
        isEmail: {
          args: true,
          msg: 'O e-mail é inválido'
        }
      }
    },
    role: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Pesssoa',
    paranoid: true,
    defaultScope: {
     // where: {ativo: true }
    }
  });
  return Pesssoa;
};
