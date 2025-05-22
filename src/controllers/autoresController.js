import autores from "../models/Autor.js";
import mongoose from "mongoose";

class AutorController {

  static listarAutores = async(req, res) => {
    try{
      const autoresResultado = await autores.find();
       res.status(200).json(autoresResultado);
    } catch(error) {
      res.status(500).send({message: "Erro interno do servidor"});
    }
  };

  static listarAutorPorId = async (req, res) => {
    try {
      const id = req.params.id;
      const autorResultado = await autores.findById(id);

      if(autorResultado !== null) {
        res.status(200).send(autorResultado);
      } else {
        res.status(404).send({message: "Id do Autor não localizado"});
      }
    } catch (error) {
      if(error instanceof mongoose.CastError) {
      res.status(400).send({message: "Um ou mais dados fornecidos estão incorretos"});
      } else {
         res.status(500).send({message: "Erro interno do servidor"});
      }
    }
  };

  static cadastrarAutor = async (req, res) => {
    try {
       let autor = new autores(req.body);
       const autorResultado = await autor.save();
       res.status(201).send(autorResultado.toJSON());
    } catch (error) {
      res.status(500).send({message: `${err.message} - falha ao cadastrar Autor.`});
    }
  };

  static atualizarAutor = async (req, res) => {
    try {
      const id = req.params.id;
      await autores.findByIdAndUpdate(id, {$set: req.body});
      res.status(200).send({message: "Autor atualizado com sucesso"});
    } catch (error) {
      res.status(500).send({message: error.message});
    }
  };

  static excluirAutor = async (req, res) => {
    try {
      const id = req.params.id;
      await autores.findByIdAndDelete(id);
      res.status(200).send({message: "Autor removido com sucesso"});
    } catch (error) {
      res.status(500).send({message: error.message});
    }
  };

}

export default AutorController;