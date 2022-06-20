const dataBase = require('../models');

class Service {
    nomeModelo
    dataBase
    constructor(nomeModelo){
        this.nomeModelo = nomeModelo;
        this.dataBase = dataBase;
    }

    async getAll(where){
        return this.dataBase[this.nomeModelo].findAll({where});
    }

    async getById(id){
        return this.dataBase[this.nomeModelo].findOne({
            where: {
                id: Number(id)
            }
        });
    }

    async create(body){
        return this.dataBase[this.nomeModelo].create(body);
    }

    async remove(id){
       return this.dataBase[this.nomeModelo].destroy({
            where: {
                id: id
            }
        })
    }

    async updateWithId(body, id, transaction = {}){
        return this.dataBase[this.nomeModelo].update(body, {where: {id: id}}, transaction);
    }

    async updateWithWhere(body, where, transaction = {}){
        return this.dataBase[this.nomeModelo].update(body, {where:{...where}}, transaction);
    }
}

module.exports = Service;