const express = require('express');
const TurmaController = require('../controllers/TurmaController.js')

const router = express();

router.get('/turmas', TurmaController.getAll);
router.get('/turmas/:id', TurmaController.getById);
//router.get('/turmas/name/:name', TurmaController.getByName);
router.put('/turmas/:id', TurmaController.update);
router.delete('/turmas/:id', TurmaController.remove);
router.post('/turmas', TurmaController.create);

module.exports = router;