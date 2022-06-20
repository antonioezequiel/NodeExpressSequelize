const express = require('express');
const PessoaController = require('../controllers/PessoaController.js')

const router = express();

router.get('/pessoas', PessoaController.getAll);
router.get('/pessoas/ativo', PessoaController.getAllActive);
router.get('/pessoas/:estudanteId/matriculas', PessoaController.getAllMatriculas);
router.get('/pessoas/name/:name', PessoaController.getById);
router.get('/pessoas/matriculas/:turmaId/confirmadas', PessoaController.getMatriculaTurma);
router.get('/pessoas/matriculas/turmaTotal', PessoaController.getMatriculaTurmaTotal);
router.get('/pessoas/:estudanteId/matricula/:matriculaId', PessoaController.getMatriculaDePessoa);
router.get('/pessoas/:id', PessoaController.getById);
router.put('/pessoas/:id', PessoaController.update);
router.put('/pessoas/:estudanteId/matricula/:matriculaId', PessoaController.updateMatricula);
router.delete('/pessoas/:id', PessoaController.remove);
router.delete('/pessoas/:estudanteId/matricula/:matriculaId', PessoaController.removeMatricula);
router.post('/pessoas', PessoaController.create);
router.post('/pessoas', PessoaController.create);
router.post('/pessoas/:estudanteId/cancela', PessoaController.inativateEstudante);
router.post('/pessoas/:estudanteId/matricula', PessoaController.createMatricula);

module.exports = router;