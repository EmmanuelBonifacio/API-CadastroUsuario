import { Request, Response } from "express";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import User from "../models/User";

export const criarUsuario = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const { nome, email, senha } = req.body;

  if (!nome || !email || !senha) {
    res.status(400).json({ erro: "Nome, email e senha são obrigatórios" });
    return;
  }

  const usuarioExiste = await User.findOne({ email: email.toLowerCase() });
  if (usuarioExiste) {
    res.status(400).json({ erro: "Email já cadastrado" });
    return;
  }

  const senhaCriptografada = await bcrypt.hash(senha, 10);

  const usuario = await User.create({
    nome,
    email,
    senha: senhaCriptografada,
  });

  res.status(201).json({
    _id: usuario._id,
    nome: usuario.nome,
    email: usuario.email,
    criadoEm: usuario.criadoEm,
  });
};

export const listarUsuarios = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const usuarios = await User.find().select("-senha");
  res.status(200).json(usuarios);
};

export const buscarUsuario = async (
  req: Request,
  res: Response,
): Promise<void> => {
  if (!mongoose.isValidObjectId(req.params["id"])) {
    res.status(400).json({ erro: "ID inválido" });
    return;
  }

  const usuario = await User.findById(req.params["id"]).select("-senha");

  if (!usuario) {
    res.status(404).json({ erro: "Usuário não encontrado" });
    return;
  }

  res.status(200).json(usuario);
};

export const atualizarUsuario = async (
  req: Request,
  res: Response,
): Promise<void> => {
  if (!mongoose.isValidObjectId(req.params["id"])) {
    res.status(400).json({ erro: "ID inválido" });
    return;
  }

  const { nome, email, senha } = req.body;
  const dados: { nome?: string; email?: string; senha?: string } = {};

  if (nome) dados.nome = nome;
  if (email) dados.email = email;
  if (senha) dados.senha = await bcrypt.hash(senha, 10);

  if (Object.keys(dados).length === 0) {
    res.status(400).json({ erro: "Nenhum campo para atualizar foi enviado" });
    return;
  }

  const usuario = await User.findByIdAndUpdate(req.params["id"], dados, {
    new: true,
    runValidators: true,
  }).select("-senha");

  if (!usuario) {
    res.status(404).json({ erro: "Usuário não encontrado" });
    return;
  }

  res.status(200).json(usuario);
};

export const deletarUsuario = async (
  req: Request,
  res: Response,
): Promise<void> => {
  if (!mongoose.isValidObjectId(req.params["id"])) {
    res.status(400).json({ erro: "ID inválido" });
    return;
  }

  const usuario = await User.findByIdAndDelete(req.params["id"]);

  if (!usuario) {
    res.status(404).json({ erro: "Usuário não encontrado" });
    return;
  }

  res.status(200).json({ mensagem: "Usuário deletado com sucesso" });
};
