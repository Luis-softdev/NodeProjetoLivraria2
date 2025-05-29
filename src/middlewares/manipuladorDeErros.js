import mongoose from "mongoose";
import ErroBase from "../erros/erroBase.js";
import ResquisicaoIncorreta from "../erros/requisicaoIncorreta.js";
import ErroValidacao from "../erros/erroValidacao.js";

function manipuladorDeErros(error, req, res, next){
    if (error instanceof mongoose.Error.CastError) {
      new ResquisicaoIncorreta().enviarResposta(res);
    } else if (error instanceof mongoose.Error.ValidationError) {
      new ErroValidacao(error).enviarResposta(res);
    } else if (error instanceof ErroBase){
      error.enviarResposta(res);
    } else {
      new ErroBase().enviarResposta(res);
    }
}

export default manipuladorDeErros;