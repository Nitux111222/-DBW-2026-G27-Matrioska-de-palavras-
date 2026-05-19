import mongoose from "mongoose";

const { Schema, model } = mongoose;
/*
Criar o nosso schema que é constituído por:
=> nome (String)
=> email (String)
=> imagem (String)
=> password (String)
*/
const userSchema = new Schema({
nome: String,
email: String,
imagem: String,
password: String
});
// Vamos criar um model chamado "Livro" e exportá-lo
export default model("User", userSchema);