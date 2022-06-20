const db = require('../models');
const { Op } = require("sequelize");
const sequelize  = require("sequelize");
const {PessoaService} = require('../services')
const pessoaService = new PessoaService();

class PessoaController{

    static async create (req, resp) {
        try {
            const body = req.body;
            const pessoa = await pessoaService.create(body);
            if(!pessoa)
                throw new Error('Erro ao cadastrar uma pessoa');
            resp.status(201).json({ ...pessoa.dataValues, message: 'Pessoa Cadastrada com sucesso'});
        }catch (err)  {
            resp.status(500).json({message: `${err.message}`});
        }
    }

    static async createMatricula (req, resp) {
        try {
            const id_estudante = req.params.estudanteId;
            const body = {...req.body, estudante_id: Number(id_estudante)};
            const matricula = await db.Matriculas.create(body);
            if(!matricula)
                throw new Error(`Erro ao cadastrar uma matricula para o esudante de id ${id_estudante}`);
            resp.status(201).json({ ...matricula.dataValues, message: 'Matricula Cadastrada com sucesso'});
        }catch (err)  {
            resp.status(500).json({message: `${err.message}`});
        }
    }

    static async remove(req, resp){
        try {
            const id = req.params.id;
            let pessoa = await pessoaService.remove(id);
            if(!pessoa)
                throw new Error('Erro ao remover uma pessoa');
            resp.status(201).json({message: 'Pessoa removida com sucesso'});
        } catch (err){
            resp.status(500).json({message: `${err.message}`});
        }
    }

    static async activetedPessoa(req, resp){
        try {
            const id = req.params.id;
            await db.Pesssoa.restore({
                where: {
                    id: Number(id)
                }
            })
            resp.status(201).json({message: 'Pessoa ativada com sucesso'});
        } catch(err) {
            resp.status(500).json({message: err.message + 'Pessoa não encontrada com esse ID'});
        }
    }

    static async removeMatricula(req, resp){
        try {
            const id = req.params.matriculaId;
            const estudanteId = req.params.estudanteId;
            const body = req.body;
            let matricula = await db.Matriculas.destroy({
                where: {
                    id: id,
                    estudante_id: estudanteId
                }
            })
            if(!matricula)
                throw new Error('Erro ao remover uma matricula do estudante');
            resp.status(201).json({message: 'Matricula removida com sucesso'});
        } catch (err){
            resp.status(500).json({message: `${err.message}`});
        }
    }

    static async update(req, resp) {
        console.log('aqui');
        try {
            const id = req.params.id;
            const body = req.body;
            let pessoa = await db.Pesssoa.update(body, {
                where: {
                    id: id,
                    ativo: {
                        [Op.or]: [true, false]
                      }
                }
            })
            if(!pessoa)
                throw new Error('Erro ao atualizar uma pessoa');
            else {
                pessoa = await db.Pesssoa.findOne({
                    where: {
                        id: Number(id)
                    }
                });
            }
            resp.status(201).json(pessoa);
        }catch(err){
            resp.status(500).json({message: `${err.message}`});
        }
    }

    static async updateMatricula(req, resp) {
        try {
            const id = req.params.matriculaId;
            const estudanteId = req.params.estudanteId
            const body = {...req.body, estudante_id: Number(estudanteId)};
            let matricula = await db.Matriculas.update(body, {
                where: {
                    id: id,
                    estudante_id: Number(estudanteId)
                }
            })
            if(!matricula)
                throw new Error('Erro ao atualizar uma matricula');
            else {
                matricula = await db.Matriculas.findOne({
                    where: {
                        id: Number(id)
                    }
                });
            }
            resp.status(201).json(matricula);
        }catch(err){
            resp.status(500).json({message: `${err.message}`});
        }
    }
     
    static async getAll(req, resp) {
        try{
            const pessoas = await pessoaService.getAll();
            resp.status(201).json(pessoas);
        }catch(err){
            resp.status(500).json({message: `${err.message}`});
        }
    }

    static async getAllActive(req, resp) {
        try{
            const pessoas = await pessoaService.getAllActive();
            resp.status(201).json(pessoas);
        }catch(err){
            resp.status(500).json({message: `${err.message}`});
        }
    }

    static async getAllMatriculas(req, resp) {
        try{
            const estudanteId = req.params.estudanteId
            const pessoa = await db.Pesssoa.findOne({
                where: {
                    id : Number(estudanteId)
                }
            });
            //console.log(pessoa)
            const matriculas = await pessoa.getAulasMatriculadas();

            if(!matriculas[0])
                throw new Error('Não Existe matrículas para esse estudante');
            resp.status(201).json(matriculas);
        }catch(err){
            resp.status(500).json({message: `${err.message}`});
        }
    }

    static async getById(req, resp) {
        try {
            const id = req.params.id;
            const pessoa = await pessoaService.getById(id);
            if(!pessoa)
                throw new Error('Pessoa não encontrada com esse ID');
            resp.status(201).json(pessoa);
        } catch (err){
            resp.status(500).json({message: `${err.message} - erro ao procurar uma pessoa pelo ID`})
        }
    }

    static async getByName(req, resp) {
        try {
            const name = req.params.name;
            const pessoas = await db.Pesssoa.findAll({raw: true,
                where: {
                    nome:{
                        [Op.substring]: name
                    }
                }
            });

            if(!pessoas[0])
                throw new Error('Pessoa não encontrada com esse nome');
            resp.status(201).json(pessoas);
        } catch (err){
            resp.status(500).json({message: `${err.message} - erro ao procurar uma pessoa pelo nome`})
        }
    }

    static async getMatriculaDePessoa(req, resp) {
        try {
            const estudanteID = req.params.estudanteId;
            const matriculaID = req.params.matriculaId;
            const matricula = await db.Matriculas.findOne({
                where: {
                    id: Number(matriculaID),
                    estudante_id: Number(estudanteID)
                }
            });
            if(!matricula)
                throw new Error('Matricula não encontrada para essa pessoa');
            resp.status(201).json(matricula);
        } catch (err){
            resp.status(500).json({message: `${err.message} - erro ao procurar uma matricula pelo ID`})
        }
    }

    static async getMatriculaTurma(req, resp) {
        try {
            const turmaId = req.params.turmaId;
            const matriculas = await db.Matriculas.findAndCountAll({
                where: {
                    turma_id: Number(turmaId),
                    status: "confirmado"
                },
                order: [['estudante_id', 'DESC']]
            });
            if(!matriculas)
                throw new Error('Não existe matriculas em turmas');
            resp.status(201).json(matriculas);
        } catch (err){
            resp.status(500).json({message: `${err.message}`})
        }
    }

    static async getMatriculaTurmaTotal(req, resp) {
        try {
            const total = 2;
            const matriculas = await db.Matriculas.findAndCountAll({
                where: {
                    status: "confirmado"
                },
                attributes: ['turma_id', 'status'],
                group: ['turma_id'],
                having: sequelize.literal(`count(turma_id) >= ${total}`)
            });
            if(!matriculas)
                throw new Error('Não existe matriculas em turmas');
            resp.status(201).json(matriculas.count);
        } catch (err){
            resp.status(500).json({message: `${err.message}`})
        }
    }

    static async inativateEstudante(req, resp) {
        try {
            const estudanteId = req.params.estudanteId;

            /*db.sequelize.transaction(async transacao => {
                const pessoa = await db.Pesssoa.update({ativo: false},{ 
                where: {
                        id: Number(estudanteId)
                    }
                }, {transaction: transacao});
                let matricula = await db.Matriculas.update({status: 'cancelado'}, {
                    where: {
                        estudante_id: Number(estudanteId)
                    }
                }, {transaction: transacao})

                if(!pessoa || ! matricula)
                    throw new Error('Não existe matriculas em turmas');

                resp.status(201).json({message: 'Estudante e suas respectivas matrículas inativadas com sucesso'});                
            })*/

            await pessoaService.inativatedEstudante(estudanteId).then();
            resp.status(201).json({message: 'Estudante e suas respectivas matrículas inativadas com sucesso'});
        } catch (err){
            resp.status(500).json({message: `${err.message}`})
        }
    }
 }

module.exports = PessoaController;