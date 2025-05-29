import RequisicaIncorreta from "../erros/requisicaoIncorreta.js";
async function paginar(req, res, next) {
    try {
        let { limite = 3, pagina = 1, ordenacao = "_id: -1" } = req.query;

        let [campoOrdenacao, ordem] = ordenacao.split(":");

        limite = parseInt(limite);
        pagina = parseInt(pagina);
        ordem = parseInt(ordem);

        const resultado = req.resultado;

        if (limite > 0 && pagina > 0) {
            const resultadoPaginado = await resultado
                .find() // Busca todos os livros
                .sort({ [campoOrdenacao]: ordem }) // Ordena os livros pelo campo especificado e na ordem especificada
                .skip((pagina - 1) * limite) // Pula os livros das páginas anteriores
                .limit(limite) // Limita o número de livros retornados
                .exec(); // Executa a consulta

            res.status(200).json(resultadoPaginado);
        } else {
            next(new RequisicaIncorreta("Limite e pagina devem ser maiores que zero"));
        }
    } catch (error) {
        next(error);
    }
}

export default paginar;