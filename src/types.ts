export type Linha = "Madeira" | "Neutros" | "Coloridos";

export type Cor = {
  code: string;
  name: string;
  hex: string;
  linha: Linha;
};

export type Project = {
  id: string;
  title: string;
  ambiente: "Cozinha" | "Dormitório" | "Sala" | "Banheiro" | "Escritório" | "Área Gourmet";
  cidade?: string;
  ano?: number;
  cores: string[];      // códigos de cor
  cover?: string;       // URL da capa (pode ser /public/...)
  images?: string[];    // URLs extras
  descricao?: string;
  tags?: string[];
};
