const db = require('../models');
const { Op } = require("sequelize");
const {NivelService} = require('../services')
const nivelService = new NivelService();

class NivelController{

    static async create (req, resp) {
        try {
            const body = req.body;
            const nivel = await nivelService.create(body);
            if(!nivel)
                throw new Error('Erro ao cadastrar um nível');
            resp.status(201).json({ ...nivel.dataValues, message: 'Nível Cadastrado com sucesso'});
        }catch (err)  {
            resp.status(500).json({message: `${err.message}`});
        }
    }

    static async remove(req, resp){
        try {
            const id = req.params.id;
            let nivel = await nivelService.remove(id);
            if(!nivel)
                throw new Error('Erro ao remover uma nivel');
            resp.status(201).json({message: 'Nivel removida com sucesso'});
        } catch (err){
            resp.status(500).json({message: `${err.message}`});
        }
    }

    static async update(req, resp) {
        try {
            const id = req.params.id;
            const body = req.body;
            let nivel = await db.Niveis.update(body, {
                where: {
                    id: id
                }
            })
            if(!nivel)
                throw new Error('Erro ao atualizar uma nivel');
            else {
                nivel = await db.Niveis.findOne({
                    where: {
                        id: Number(id)
                    }
                });
            }
            resp.status(201).json(nivel);
        }catch(err){
            resp.status(500).json({message: `${err.message}`});
        }
    }
     

    static async getAll(req, resp) {
        try{
            const niveis = await nivelService.getAll();
            resp.status(201).json(niveis);
        }catch(err){
            resp.status(500).json({message: `${err.message}`});
        }
    }

    static async getById(req, resp) {
        try {
            const id = req.params.id;
            const nivel = await nivelService.getById(id);
            if(!nivel)
                throw new Error('nivel não encontrada com esse ID');
            resp.status(201).json(nivel);
        } catch (err){
            resp.status(500).json({message: `${err.message} - erro ao procurar uma nivel pelo ID`})
        }

    }

    static async getByName(req, resp) {
        try {
            const name = req.params.name;
            const nivel = await db.Niveis.findAll({raw: true,
                where: {
                    descr_nivel:{
                        [Op.substring]: name
                    }
                }
            });

            if(!nivel[0])
                throw new Error('nivel não encontrada com esse nome');
            resp.status(201).json(nivel);
        } catch (err){
            resp.status(500).json({message: `${err.message} - erro ao procurar uma nivel pelo nome`})
        }

    }

 }

module.exports = NivelController;