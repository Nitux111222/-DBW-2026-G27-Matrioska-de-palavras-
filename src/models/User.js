import { PhoneMissed } from "lucide-react";
import mongoose from "mongoose";

const { Schema, model } = mongoose;
/*
Criar o nosso schema que é constituído por:
=> username (String)
=> email (String)
=> imagem (String)
=> password (String)
*/
const userSchema = new Schema({
username: String,
email: String,
imagem: String,
password: String,
Pnome: String,
Unome: String,
pontosTotais: { type: Number, default: 0 },
recorde: { type: Number, default: 0 },
jogosGanhos: { type: Number, default: 0 },
respostasCorretas: { type: Number, default: 0 },
respostasErradas: { type: Number, default: 0 },
tempoJogo: { type: Number, default: 0 }
});
// Vamos criar um model chamado "User" e exportá-lo
export default model("User", userSchema);