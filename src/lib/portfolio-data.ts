import capaDoAlbum from '@/assets/capa-do-album.png.asset.json';

// Acrescente um objeto nesta lista para criar uma nova entrega.
// Preencha data, aprendizado e URL; só então marque como concluída.
// "cover" é opcional: use a URL de uma imagem real sua para trocar o desenho pelo trabalho.
export type Delivery = {
  number: string;
  title: string;
  date: string;
  learning: string;
  status: 'Concluída' | 'Em breve';
  url?: string;
  cover?: string;
  tracks?: { title: string; note: string }[];
  art: 'album' | 'dashboard' | 'tree' | 'anchor' | 'manifesto';
};

export const deliveries: Delivery[] = [
  { number: '01', title: 'Capa do Meu Álbum', date: '[PREENCHER]', learning: 'Através dessa atividade, pude compreender um pouco mais sobre mim.', status: 'Concluída', url: 'https://github.com/AranzaNataly/portfolio', cover: capaDoAlbum.url, art: 'album', tracks: [
    { title: 'O Invisível Também Me Guia', note: 'A fé e a confiança no que vai além do que posso ver ou provar.' },
    { title: 'O Que Fica Quando Ninguém Vê', note: 'Lealdade e sinceridade como caráter, mesmo longe de qualquer olhar.' },
    { title: 'Transformar Pontos em Possibilidades', note: 'Criatividade, curiosidade e tecnologia ligando ideias e criando coisas novas.' },
    { title: 'E Se o Horizonte Não Bastar?', note: 'O medo do desconhecido, com vulnerabilidade e esperança lado a lado.' },
    { title: 'Além do Mapa', note: 'Carreira, independência, orgulho da família e lugares novos, num futuro ainda por desenhar.' },
  ] },
  { number: '02', title: 'Dashboard Quem Sou Eu', date: '[PREENCHER]', learning: '[PREENCHER]', status: 'Em breve', art: 'dashboard' },
  { number: '03', title: 'Árvore das Profissões 2.0', date: '[PREENCHER]', learning: '[PREENCHER]', status: 'Em breve', art: 'tree' },
  { number: '04', title: 'Âncoras de Carreira', date: '[PREENCHER]', learning: '[PREENCHER]', status: 'Em breve', art: 'anchor' },
  { number: '05', title: 'Manifesto', date: '[PREENCHER]', learning: '[PREENCHER]', status: 'Em breve', art: 'manifesto' },
];

// Uma entrega futura nunca recebe um link, mesmo se uma URL for preenchida.
export function deliveryLink(delivery: Delivery) {
  return delivery.status === 'Concluída' ? delivery.url : undefined;
}

export const aboutParagraphs = [
  'Sou uma pessoa curiosa, criativa e determinada, que gosta de aprender coisas novas e descobrir diferentes possibilidades. Tenho interesse por tecnologia, especialmente pela área de Ciência da Computação, mas também gosto de Biologia, Matemática, leitura, música e atividades criativas, como crochê e culinária.',
  'Valorizo muito minha família, minha fé, a lealdade e a sinceridade. Gosto de desafios, de desenvolver minhas habilidades e de transformar minhas ideias em projetos. Tenho muitos sonhos e acredito que, com dedicação, esforço e esperança, posso conquistar meus objetivos.',
];
export const manifestoParagraphs = [
  'Acredito que a vida é feita de descobertas, aprendizados e oportunidades. Sou movida pela curiosidade, pela criatividade e pela vontade de construir um futuro melhor. Gosto de aprender, explorar novas ideias e transformar desafios em oportunidades de crescimento.',
  'Valorizo minha família, minha fé, a sinceridade e a lealdade. Tenho sonhos, especialmente na área da tecnologia, e quero conquistar meus objetivos sem perder minha essência. Acredito que, com dedicação, esperança e coragem, posso transformar minhas ideias em realidade e construir uma história da qual me orgulhe.',
];