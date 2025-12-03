// src/types.ts

export type Cor = {
  id: number;
  nome: string;
  linha: string;
  colecao: string;
  tipo: string;
  imagem: string;
  createdAt: string;
};

export type Projeto = {
  id: number;
  nome: string;
  ambiente: string;
  descricao: string;
  capa: string;
  createdAt: string;

  imagens: { id: number; url: string }[];

  tags: { id: number; tag: string }[];

  coresUsadas: {
    id: number;
    cor: Cor;
  }[];
};
