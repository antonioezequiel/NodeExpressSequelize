const Service = require('../services/Service.js');
const MatriculaService = require('./MatriculaService.js');

class PessoaService extends Service {
    constructor(){
        super('Pesssoa');
        this.matriculaService = new MatriculaService();
    }

    async getAllActive(){
       return this.dataBase[this.nomeModelo].findAll({where: { ativo: true}});
    }

    async inativatedEstudante(id){
        return this.dataBase.sequelize.transaction(async transacao => {
            this.updateWithId({ativo: false}, id,  {transaction: transacao});
            this.matriculaService.updateWithWhere({status: 'cancelado'}, 
                {estudante_id: Number(id)}, 
                {transaction: transacao})
        });
    }

}

module.exports = PessoaService;