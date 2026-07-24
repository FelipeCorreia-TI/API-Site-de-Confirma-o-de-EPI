const estoqueService = require("../services/estoqueService");

const listarEstoque = async (req,res) =>{
    try{
        const estoque = await estoqueService.buscarTodoEstoque();
        return res.status(200).json(estoque);
    }catch(error){
        console.error("Erro ao buscar estoque:", error);
        return res.status(500).json({
            error:"Erro interno ao buscar o estoque.",
        });
    }
};

module.exports ={
    listarEstoque,
};