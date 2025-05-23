import mongoose from "mongoose";
function manipuladorDeErros(error, req, res, next){
    if (error instanceof mongoose.Error.CastError) {
      res.status(400).send({message: "Um ou mais dados fornecidos estão incorretos"});
    } else if (error instanceof mongoose.Error.ValidationError) {
      const mensagensErro = Object.values(error.errors).map(erro => erro.message).join(", ");
        
      res.status(400).send({message: `Os seguintes erros ocorreram: ${mensagensErro}`});
    } else {
      res.status(500).send({message: "Erro interno do servidor"});
    }
}

export default manipuladorDeErros;