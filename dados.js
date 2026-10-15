/* ==========================================================
   DADOS DO SITE - Ativa Informática
   Edite SOMENTE este arquivo para mudar preços, aparelhos,
   promoções e contatos. Preços são números (ex.: 200 ou 199.9).
   Use ponto, não vírgula. Deixe sem preço para mostrar
   "Consulte o valor".
   ========================================================== */

const CONFIG = {
  nome: "Ativa Informática",
  whatsapp: "5566996805419",
  telefone: "(66) 99680-5419",
  instagram: "ativa_informaticaa",
  email: "ativainformatica652@gmail.com",
  endereco: "Rua Goiás, nº 21, Vila Concórdia",
  cidade: "",      // preencha para melhorar o Google Maps. Ex.: "Cidade - MT"
  mapsUrl: "",     // opcional: cole aqui o link do Google Maps da loja
  horario: ""      // Ex.: "Segunda a sexta, 8h às 18h". Vazio = "em breve"
};

/* Marcas e tipos de reparo que aparecem nos filtros.
   Marcas usadas nos aparelhos entram nos filtros automaticamente. */
const MARCAS = ["Samsung", "Motorola", "Xiaomi", "Infinix"];
const CATEGORIAS_REPARO = ["Troca de tela", "Troca de bateria", "Conector de carga", "Software", "Outros"];

/* Cards da seção Serviços. Ícones: celular, tela, notebook, sistema,
   upgrade, programas, impressao, digital */
const SERVICOS = [
  { icone: "celular", titulo: "Assistência técnica de celulares", descricao: "Diagnóstico e reparo para Samsung, Motorola, Xiaomi, Infinix e outras marcas." },
  { icone: "tela", titulo: "Troca de telas e displays", descricao: "Substituição de tela e display com orçamento claro." },
  { icone: "notebook", titulo: "Manutenção de computadores e notebooks", descricao: "Limpeza, reparo e solução de lentidão e defeitos." },
  { icone: "sistema", titulo: "Formatação e instalação de sistemas", descricao: "Instalação e configuração de sistema operacional." },
  { icone: "upgrade", titulo: "Upgrade de computadores", descricao: "Mais velocidade e desempenho para o seu equipamento." },
  { icone: "programas", titulo: "Instalação de programas e drivers", descricao: "Programas e drivers instalados e funcionando." },
  { icone: "impressao", titulo: "Impressões e cópias", descricao: "Impressões e cópias para o dia a dia." },
  { icone: "digital", titulo: "Serviços digitais e outros atendimentos", descricao: "Pergunte pelo atendimento que você precisa." }
];

/* Catálogo de reparos. Comece vazio e adicione um bloco por serviço:
   { marca:"Samsung", modelo:"Galaxy A05", categoria:"Troca de tela",
     descricao:"", preco:0, precoPromo:null, obs:"", disponivel:true },
   Sem preco = "Consulte o valor". precoPromo só aparece se existir. */
const APARELHOS = [
];

/* Alexas e receptores à venda. grupo: "Alexa" ou "Receptores e TV box".
   disponivel:false mostra "Indisponível". */
const PRODUTOS = [
  { grupo: "Alexa", nome: "Alexa Echo Dot 5", preco: 425, obs: "Cores: preta, azul ou branca", disponivel: true },
  { grupo: "Alexa", nome: "Alexa Echo Dot Max", preco: 650, obs: "Cor: preta", disponivel: true },
  { grupo: "Alexa", nome: "Alexa Echo Show 5", preco: 620, obs: "Cores: preta ou branca", disponivel: true },
  { grupo: "Alexa", nome: "Alexa Echo Show 8", preco: 950, obs: "Cor: branca", disponivel: false },
  { grupo: "Receptores e TV box", nome: "HTV-9", preco: 1100, obs: "", disponivel: true },
  { grupo: "Receptores e TV box", nome: "BTV B13", preco: 880, obs: "Já com app liberado (ESPN liberado)", disponivel: true },
  { grupo: "Receptores e TV box", nome: "UNI TV S1", preco: 380, obs: "Caixa preta", disponivel: true },
  { grupo: "Receptores e TV box", nome: "UNI TV V10", preco: 290, obs: "Caixa branca", disponivel: true },
  { grupo: "Receptores e TV box", nome: "EAI PRO TV", preco: 330, obs: "", disponivel: true },
  { grupo: "Receptores e TV box", nome: "Amazon Fire Stick 4K", preco: 300, obs: "", disponivel: true },
  { grupo: "Receptores e TV box", nome: "Xiaomi Mi TV 4K (lançamento)", preco: 300, obs: "", disponivel: true },
  { grupo: "Receptores e TV box", nome: "Xiaomi Mi TV Stick Full HD", preco: 250, obs: "", disponivel: true }
];
const AVISO_PRODUTOS = "Garantia de 30 dias do aparelho. Não garantimos servidor.";

/* Promoções. Datas no formato "AAAA-MM-DD". Só aparecem dentro do período.
   { titulo:"", descricao:"", modelos:["Samsung A05"], servico:"Troca de tela",
     precoNormal:200, precoPromo:150, inicio:"2026-10-01", fim:"2026-10-31" } */
const PROMOCOES = [
];
