const asyncHandler = require('express-async-handler');
const Leilao = require('../models/Leilao');
const colors = require('colors');

// @desc Listar Produtos
// @route GET /api/leilao/produtos
// @access private
const listarLeilao = asyncHandler(async (req,res)=>{
    const listaDeLeiloes = await leilao.find();
    console.log(colors.bgBlue(listaDeLeiloes));
    res.status(200).json(listaDeLeiloes);
});


// @desc Salvar Produto
// @route POST /api/leilao/produtos
// @access private
const salvarLeilao = asyncHandler(async (req,res)=>{
    console.log(colors.bgWhite(req.body));
    const leilao = new Leilao(req.body);
    console.log('Leilao '+colors.green(leilao));

    await leilao.save((err)=>{
       if(err){
        res.status(500).send({message:`${err.message} - falha ao registrar Produto.`});
            } else{
                res.status(201).send(leilao.toJSON());
            }
    })  
});

// @desc Atualizar Produto
// @route PUT /api/leilao/produtos/id
// @access private
const atualizarLeilao = asyncHandler(async (req,res)=>{
    console.log('body '.bgBlue+req.body.lances.valor);
    console.log('param '.bgGreen+req.params.id);
    const filter = {_id:req.params.id};
    const update = {
            'lances.email':req.body.email,
            'lances.valor': req.body.valor
}
    const atualizaLeilao =  await leilao.findOneAndUpdate({filter,"lances.email":req.body.email}, {$set:{"lances.$.valor":req.body.valor}});
    console.log(atualizaLeilao);
    res.status(200).json(atualizaLeilao);

});

// @desc Pegar Produto por Id
// @route GET /api/leilao/produtos/id
// @access private
const pegaLeilaoId = asyncHandler(async (req,res)=>{
    const id = req.params.id;
    leilao.findById(id,(err,leilaoResult)=>{
        if(err){
            res.status(500).send({message:err.message});
            return;
        }
        res.status(200).send(produtoResult); 
    });
  
    
});

// @desc Remover Produto
// @route DELETE /api/leilao/produtos/id
// @access private

const removerLeilao = asyncHandler(async (req,res)=>{
    console.log('id '+req.params.id);
    const leilao = await leilao.findOneAndDelete({_id:req.params.id});

    if(!leilao){
        res.status(400).send({message:'Operation not executed. Produto not found.'});
    }else{
    res.status(200).send(leilao);
}
})

module.exports = {listarLeilao, salvarLeilao,atualizarLeilao,pegaLeilaoId,removerLeilao}