import * as fs from 'fs';
import * as path from 'path';

function createPdf(title, subtitle, outcomes) {
  const objects = [];
  
  // Define objects
  const catalogRef = `1 0 R`;
  const pagesRef = `2 0 R`;
  const pageRef = `3 0 R`;
  const fontRef = `4 0 R`;
  const contentsRef = `5 0 R`;
  
  // Catalog
  objects.push({ id: 1, content: `<< /Type /Catalog /Pages ${pagesRef} >>` });
  // Pages
  objects.push({ id: 2, content: `<< /Type /Pages /Kids [${pageRef}] /Count 1 >>` });
  // Page
  objects.push({ id: 3, content: `<< /Type /Page /Parent ${pagesRef} /Resources << /Font << /F1 ${fontRef} >> >> /MediaBox [0 0 595.28 841.89] /Contents ${contentsRef} >>` });
  // Font
  objects.push({ id: 4, content: `<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>` });
  
  // Construct stream text
  let streamText = `BT\n/F1 16 Tf\n50 780 Td\n(${title}) Tj\n`;
  streamText += `/F1 11 Tf\n0 -30 Td\n(${subtitle}) Tj\n`;
  streamText += `0 -35 Td\n(Resultados e Entregas Principais:) Tj\n`;
  outcomes.forEach((outcome) => {
    // Escape parenthesis in PDF text and strip accents for basic Helvetica
    const cleanOutcome = outcome
      .replace(/\(/g, '\\(')
      .replace(/\)/g, '\\)')
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "");
    streamText += `0 -22 Td\n(- ${cleanOutcome}) Tj\n`;
  });
  streamText += `0 -45 Td\n(Contacto do Candidato: lucasnunesatwork@gmail.com) Tj\n`;
  streamText += `ET`;
  
  // Contents
  objects.push({ id: 5, content: `<< /Length ${streamText.length} >>\nstream\n${streamText}\nendstream` });
  
  // Assemble PDF with offsets
  let pdf = `%PDF-1.4\n`;
  const offsets = {};
  
  objects.forEach((obj) => {
    offsets[obj.id] = pdf.length;
    pdf += `${obj.id} 0 obj\n${obj.content}\nendobj\n`;
  });
  
  const startxref = pdf.length;
  pdf += `xref\n0 ${objects.length + 1}\n0000000000 65535 f \n`;
  for (let i = 1; i <= objects.length; i++) {
    const offsetStr = String(offsets[i]).padStart(10, '0');
    pdf += `${offsetStr} 00000 n \n`;
  }
  pdf += `trailer\n<< /Size ${objects.length + 1} /Root ${catalogRef} >>\nstartxref\n${startxref}\n%%EOF\n`;
  
  return Buffer.from(pdf, 'binary');
}

const projects = [
  {
    filename: 'Plano de Marketing Internacional - Oh! My Snacks Singapura.pdf',
    title: 'PLANO DE MARKETING INTERNACIONAL: OH! MY SNACKS SINGAPURA',
    subtitle: 'Estrategia de exportacao e penetracao de mercado saudavel em Singapura',
    outcomes: [
      'Decisao de Entrada por Exportacao: Baixo risco financeiro, alta flexibilidade.',
      'Segmentacao do Publico: Foco em Jovens Profissionais Urbanos de Alto Rendimento.',
      'Preco Premium via Skimming: Fundamentado no alto poder de compra de Singapura.',
      'Logistica e Distribuicao: Canal direto via e-commerce com entrega em 24-48h.'
    ]
  },
  {
    filename: 'Plano de Marketing Digital - Outfit21.pdf',
    title: 'PLANO DE MARKETING DIGITAL: OUTFIT21',
    subtitle: 'Renovacao de e-commerce de alfaiataria de luxo e automacao de e-mail marketing',
    outcomes: [
      'Criacao de novos fluxos de automacao de e-mail marketing com Brevo e E-goi.',
      'Campanhas pagas estruturadas via Google Ads, LinkedIn e Instagram Ads.',
      'Definicao de objetivos de SEO on-page focados em palavras-chave premium.',
      'Planeamento de orcamento anual detalhado de 6.600 Euros.'
    ]
  },
  {
    filename: 'Reposicionamento de Marca - Campoaves Bio+.pdf',
    title: 'REPOSICIONAMENTO DE MARCA: CAMPOAVES BIO+',
    subtitle: 'Gestao de marca e ativacoes estrategicas para a gama de frango biologico',
    outcomes: [
      'Embalagem sustentavel com base em cana de acucar e tampa em PLA.',
      'Proposta de co-branding com Banco Alimentar, A Saloinha, Origens Bio e Paladin.',
      'Grelha editorial e calendario de conteudos para educar, inspirar e entreter.'
    ]
  },
  {
    filename: 'Projeto de Upcycling - Timberland TimberNest.pdf',
    title: 'PROJETO DE UPCYCLING: TIMBERLAND TIMBERNEST',
    subtitle: 'Design e marketing de novos produtos a partir de caixas de calcado abandonadas',
    outcomes: [
      'Transformacao de caixas de calçado em casas de passaros (TimberNest).',
      'Campanha de comunicacao em redes sociais focada no impacto domestico.',
      'Alinhamento direto com os ODS 12 e ODS 15 da ONU.'
    ]
  }
];

projects.forEach((p) => {
  const pdfBuffer = createPdf(p.title, p.subtitle, p.outcomes);
  const filePath = path.resolve(p.filename);
  fs.writeFileSync(filePath, pdfBuffer, 'binary');
  console.log(`Generated PDF: ${p.filename}`);
});
