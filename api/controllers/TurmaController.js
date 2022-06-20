const db = require('../models');
const { Op } = require("sequelize");

const {TurmaService} = require('../services/');
const turmaService = new TurmaService();

class TurmaController{

    static async create (req, resp) {
        try {
            const body = req.body;
            const turma = await turmaService.create(body);
            if(!turma)
                throw new Error('Erro ao cadastrar um nível');
            resp.status(201).json({ ...turma.dataValues, message: 'Nível Cadastrado com sucesso'});
        }catch (err)  {
            resp.status(500).json({message: `${err.message}`});
        }
    }

    static async remove(req, resp){
        try {
            const id = req.params.id;
            let turma = await turmaService.remove(id);

            if(!turma)
                throw new Error('Erro ao remover uma turma');
            resp.status(201).json({message: 'turma removida com sucesso'});
        } catch (err){
            resp.status(500).json({message: `${err.message}`});
        }
    }

    static async update(req, resp) {
        try {
            const id = req.params.id;
            const body = req.body;
            let turma = await db.Turmas.update(body, {
                where: {
                    id: id
                }
            })
            if(!turma)
                throw new Error('Erro ao atualizar uma turma');
            else {
                turma = await db.Turmas.findOne({
                    where: {
                        id: Number(id)
                    }
                });
            }
            resp.status(201).json(turma);
        }catch(err){
            resp.status(500).json({message: `${err.message}`});
        }
    }
     

    static async getAll(req, resp) {
        try{
            const {data_inicial, data_final} = req.query;
            let where = {};

            data_final || data_inicial ? where['data_inicio'] = {} : null;
            data_final ? where.data_inicio[Op.lte] = data_final : null;
            data_inicial ? where.data_inicio[Op.gte] = data_inicial : null;

            const Turmas = await turmaService.getAll(where);
            resp.status(201).json(Turmas);
        }catch(err){
            resp.status(500).json({message: `${err.message}`});
        }
    }

    static async getById(req, resp) {
        try {
            const id = req.params.id;
            const turma = await turmaService.getById(id);
            if(!turma)
                throw new Error('turma não encontrada com esse ID');
            resp.status(201).json(turma);
        } catch (err){
            resp.status(500).json({message: `${err.message} - erro ao procurar uma turma pelo ID`})
        }

    }

   /* static async getByName(req, resp) {
        try {
            const name = req.params.name;
            const turma = await db.Turmas.findAll({raw: true,
                where: {
                    descr_turma:{
                        [Op.substring]: name
                    }
                }
            });

            if(!turma[0])
                throw new Error('turma não encontrada com esse nome');
            resp.status(201).json(turma);
        } catch (err){
            resp.status(500).json({message: `${err.message} - erro ao procurar uma turma pelo nome`})
        }

    }*/

 }

module.exports = TurmaController;