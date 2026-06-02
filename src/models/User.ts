import mongoose, { Document, Schema } from "mongoose";

export interface IUser extends Document {
  nome: string;
  email: string;
  senha: string;
  criadoEm: Date;
}

const userSchema = new Schema<IUser>({
  nome: {
    type: String,
    required: [true, "Nome é obrigatório"],
    trim: true,
    minlength: [2, "Nome deve ter no mínimo 2 caracteres"],
  },
  email: {
    type: String,
    required: [true, "Email é obrigatório"],
    unique: true,
    lowercase: true,
    trim: true,
    match: [/^\S+@\S+\.\S+$/, "Formato de email inválido"],
  },
  senha: {
    type: String,
    required: [true, "Senha é obrigatória"],
    minlength: [6, "Senha deve ter no mínimo 6 caracteres"],
  },
  criadoEm: {
    type: Date,
    default: Date.now,
  },
});

const User = mongoose.model<IUser>("User", userSchema);

export default User;
