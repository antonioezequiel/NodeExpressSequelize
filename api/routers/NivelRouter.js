const express = require('express');
const NivelController = require('../controllers/NivelController.js')

const router = express();

router.get('/niveis', NivelController.getAll);
router.get('/niveis/:id', NivelController.getById);
router.get('/niveis/name/:name', NivelController.getByName);
router.put('/niveis/:id', NivelController.update);
router.delete('/niveis/:id', NivelController.remove);
router.post('/niveis', NivelController.create);

module.exports = router;