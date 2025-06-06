import mongoose from "mongoose";

const livroSchema = new mongoose.Schema(
  {
    id: { type: String },
    titulo: {
      type: String,
      required: [true, "O título do livro é obrigatório"],
    },
    autor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "autores",
      required: [true, "O autor do livro é obrigatório"]
    },
    editora: {
      type: String,
      required: [true, "A editora do livro é obrigatória"],
      enum: {
        values: ["Casa do Código", "Alura"],
        message: "A editora {VALUE} não é válida"
      }
    },
    numeroPaginas: {
      type: Number,
      validate: {
        validator: (valor) => {
          return valor >= 10 && valor <= 5000;
        },
        message: "O número de páginas deve ser entre 10 e 5000. Valor informado: {VALUE}"
      }
    }
  }
);

const livros = mongoose.model("Livros", livroSchema);

export default livros;