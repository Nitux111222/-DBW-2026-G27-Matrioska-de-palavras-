import mongoose from "mongoose";

const { Schema, model } = mongoose;
/*
Criar o nosso schema que é constituído por:
=> palavra (String)
=> listaDeRespostas [(]String], lista de (String)
*/
const wordSchema = new Schema({
palavra: String,
listaDeRespostas: [String]
});
// Vamos criar um model chamado "Livro" e exportá-lo
export default model("Word", wordSchema);