import ResquisicaoIncorreta from "./requisicaoIncorreta.js";

class ErroValidacao extends ResquisicaoIncorreta {
    constructor(error) {
        const mensagensErro = Object.values(error.errors)
            .map(erro => erro.message)
            .join(", ");

        super(`Os seguintes erros ocorreram: ${mensagensErro}`);
    }
}

export default ErroValidacao;