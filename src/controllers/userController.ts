import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import User from "../models/User";

// Cadastrar usuário Post
export const criarUsuario = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const { nome, email, senha } = req.body;

  const usuarioExiste = await User.findOne({ email });
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

// GET Listar todos os usuários
export const listarUsuarios = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const usuarios = await User.find().select("-senha");
  res.status(200).json(usuarios);
};

// GET  Buscar usuário por ID
export const buscarUsuario = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const usuario = await User.findById(req.params["id"]).select("-senha");

  if (!usuario) {
    res.status(404).json({ erro: "Usuário não encontrado" });
    return;
  }

  res.status(200).json(usuario);
};

// PUT Atualizar usuário
export const atualizarUsuario = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const { nome, email, senha } = req.body;
  const dados: { nome?: string; email?: string; senha?: string } = {};

  if (nome) dados.nome = nome;
  if (email) dados.email = email;
  if (senha) dados.senha = await bcrypt.hash(senha, 10);

  const usuario = await User.findByIdAndUpdate(req.params["id"], dados, {
    new: true,
  }).select("-senha");

  if (!usuario) {
    res.status(404).json({ erro: "Usuário não encontrado" });
    return;
  }

  res.status(200).json(usuario);
};

// DELETE Deletar usuário
export const deletarUsuario = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const usuario = await User.findByIdAndDelete(req.params["id"]);

  if (!usuario) {
    res.status(404).json({ erro: "Usuário não encontrado" });
    return;
  }

  res.status(200).json({ mensagem: "Usuário deletado com sucesso" });
};
