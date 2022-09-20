const express = require('express');
const router = express.Router();
const {listarLeilao, salvarLeilao, atualizarLeilao, pegaLeilaoId,removerLeilao} = require('../controllers/LeilaoController');

router.get('/leiloes',listarLeilao).post('/leiloes',salvarLeilao);
router.put('/leiloes/:id',atualizarLeilao).get('/leiloes/:id',pegaLeilaoId).delete('/produtos/:id',removerLeilao);
module.exports = router;