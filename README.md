MASO Móveis — Frontend (React + TS + Vite + Tailwind v4)

Site institucional com landing, galeria de projetos e catálogo de cores (com texturas) para conectar depois no backend (Spring Boot).

Stack

Vite + React 18 + TypeScript

Tailwind CSS v4 (@tailwindcss/postcss)

Framer Motion (animações, carrossel/FAQ)

React Router DOM

Requisitos

Node.js ≥ 20.19.0 (recomendado)

versões menores podem mostrar EBADENGINE, mas ainda rodam; prefira atualizar.

npm (ou pnpm/yarn se preferir)

Rodando do zero (máquina nova)
# 1) Clonar
git clone <repo-url> maso-frontend
cd maso-frontend

# 2) Instalar dependências
npm i

# 3) (confira que estes arquivos existem — já estão no repo)
# postcss.config.js
#   export default { plugins: { "@tailwindcss/postcss": {}, autoprefixer: {} } }
# src/index.css
#   @import "tailwindcss";
#   @theme { --color-brand-primary:#0F172A; --color-brand-accent:#002EB8; --color-brand-accent-hover:#1A44FF; }

# 4) Dev
npm run dev
# abre: http://localhost:5173/

# 5) Build / Preview
npm run build
npm run preview


Editor: o VS Code pode marcar @theme como “Unknown at rule”. É só aviso.
Dica: crie .vscode/settings.json e ignore:

{ "css.lint.unknownAtRules":"ignore", "files.associations":{"*.css":"postcss"} }

Scripts

npm run dev – ambiente de desenvolvimento

npm run build – build de produção (dist/)

npm run preview – serve o build localmente

npm run lint – (opcional) regras básicas do Vite/TS

Estrutura das pastas (essencial)
public/
  hero/               # imagens do carrossel do hero (1.webp, 2.webp, 3.webp…)
  projetos/           # imagens da galeria (p1.webp…)
  catalogo/
    cores.json        # catálogo de cores (urls)
    texturas/         # se usar arquivos locais de textura
  icons/
    whatsapp-round.png
src/
  components/
    Header.tsx  Footer.tsx
    CTAButton.tsx  WhatsAppFloat.tsx
    HeroCarousel.tsx  FAQ.tsx  ColorCard.tsx  ColorModal.tsx
  pages/
    LandingPage.tsx  CatalogoCores.tsx  Projects.tsx (se existir)
  services/
    catalogo.ts       # fetch do catálogo (JSON estático ou API)
  main.tsx  App.tsx  index.css
tailwind.config.js
postcss.config.js

Tailwind v4 — notas importantes

Import único em src/index.css:

@import "tailwindcss";


Cores da marca via @theme (transforma em util classes):

@theme {
  --color-brand-primary: #0F172A;
  --color-brand-accent:  #002EB8;
  --color-brand-accent-hover: #1A44FF;
}


Use: bg-brand-accent, hover:bg-brand-accent-hover, from-brand-primary, etc.

Prefira valores arbitrários para larguras máximas:

<div class="mx-auto w-full max-w-[80rem] px-4">...</div>


(em vez de max-w-7xl / max-w-screen-2xl, que não existem no v4)

Conteúdo & componentes
1) Hero Carousel

Imagens em public/hero/1.webp, 2.webp, 3.webp…

Uso:

<HeroCarousel
  images={[
    { src: "/hero/1.webp", alt: "Cozinha com ilha" },
    { src: "/hero/2.webp", alt: "Closet iluminado" },
    { src: "/hero/3.webp", alt: "Home office" },
  ]}
  intervalMs={4500}
/>

2) Botão flutuante do WhatsApp

Ícone PNG redondo em public/icons/whatsapp-round.png

Uso (geral, dentro de App.tsx):

<WhatsAppFloat size={80} offsetX={40} offsetY={56} />


Mantém pulse suave e linka para wa.me.

3) Catálogo de Cores

Fonte: public/catalogo/cores.json
Estrutura (simples, com URL da imagem):

[
  { "code": "AM-110", "name": "Amantea",         "line": "Madeira", "url": "https://.../Cores-Amantea.jpg" },
  { "code": "CN-200", "name": "Cinamomo",        "line": "Madeira", "url": "https://.../Cores-Cinamomo.jpg" },
  { "code": "AB-900", "name": "Absoluto",        "line": "Neutros", "url": "https://.../Absoluto.png" },
  { "code": "BT-300", "name": "Beton Matt",      "line": "Neutros", "url": "https://.../Cores-Beton-Matt.jpg" },
  { "code": "PV-330", "name": "Pecan Vel (BRK)", "line": "Madeira", "url": "https://.../MDF-Pecan-Vel-Berneck.png" }
]


Carregamento: src/services/catalogo.ts (getCores() com cache simples)

Adicionar novas cores: só subir a imagem (local ou URL de fornecedor) e incluir a entrada no cores.json. O site lê sem rebuild.

4) FAQ / Reviews

FAQ.tsx usa acordeão com animação (framer-motion).

Reviews.tsx traz cards animados; substitua os textos pelos reais assim que tiver.

Variáveis de ambiente (pra quando plugar o backend)

Crie .env:

VITE_API_BASE_URL=https://api.maso.com.br


Se existir, getCores() busca GET ${VITE_API_BASE_URL}/cores.

Em desenvolvimento, mantenha cores.json como fallback.

Dicas de conteúdo/imagem

Formato: prefira WebP (ou AVIF) para fotos.

Hero: largura ≥ 1600px; object-cover.

PNG com transparência (ex.: placas MDF recortadas): remova bordas no arquivo para não parecer “menor” do que o container.

Galeria: public/projetos/p1.webp… com loading="lazy" já implementado.

SEO básico

Ajuste <title> e meta description por rota.

Open Graph (og:title/description/image) com imagem do hero.

robots.txt e sitemap.xml no public/ para deploy.

Troubleshooting

Botão não fica azul (bg-brand-accent)
→ confirme @theme no index.css, postcss.config.js com @tailwindcss/postcss, reinicie npm run dev e faça hard reload.

VS Code mostra “Unknown at rule @theme”
→ é do linter. Ignore com .vscode/settings.json (ver acima).

Erro “Cannot apply unknown utility class max-w-7xl”
→ use max-w-[80rem].

Porta 5173 ocupada
→ npm run dev -- --port=5174 ou feche o processo anterior.

Node warning EBADENGINE
→ atualize para Node ≥ 20.19.0.

Próximos passos (roadmap curto)

 Conectar ao backend Spring (/cores, /projetos) via VITE_API_BASE_URL.

 Deep-link no catálogo: abrir modal com ?code=LF-110.

 Página /projetos/:slug com mais fotos e materiais.

 Depoimentos reais + logos de fornecedores (Berneck, Arauco…).

 Monitoramento: Sentry (front) + logs de erro.

 Deploy Vercel/Netlify (preview por PR).