import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';
import fs from 'fs';
import path from 'path';

async function generateGazelaManual() {
  const pdfDoc = await PDFDocument.create();
  const fontBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
  const fontRegular = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const fontOblique = await pdfDoc.embedFont(StandardFonts.HelveticaOblique);

  // Slide dimensions: 16:9 presentation (960 x 540)
  const W = 960;
  const H = 540;

  // Color palette
  const bluePrimary = rgb(0.118, 0.416, 0.702); // #1e6ab3
  const greenPrimary = rgb(0.400, 0.537, 0.180); // #66892e
  const tealDeep = rgb(0.035, 0.251, 0.212); // #004036
  const paleGreen = rgb(0.788, 0.875, 0.675); // #c9dfac
  const darkText = rgb(0.12, 0.14, 0.16);
  const mutedText = rgb(0.45, 0.48, 0.52);
  const bgLight = rgb(0.97, 0.98, 0.98);
  const white = rgb(1, 1, 1);

  // Helper for title header on standard content slides
  function addSlideHeader(page: any, sectionTitle: string, pageNum: number) {
    // Top border line
    page.drawLine({
      start: { x: 50, y: H - 55 },
      end: { x: W - 50, y: H - 55 },
      thickness: 1,
      color: rgb(0.85, 0.87, 0.9),
    });

    // Small logo text top left
    page.drawText('Gazela', {
      x: 50,
      y: H - 45,
      size: 18,
      font: fontBold,
      color: bluePrimary,
    });
    page.drawText(' • 0.0% Bio', {
      x: 115,
      y: H - 43,
      size: 10,
      font: fontRegular,
      color: greenPrimary,
    });

    // Section title top right
    const secText = `${sectionTitle} - MANUAL DE CONSTRUÇÃO DA MARCA`;
    const secWidth = fontRegular.widthOfTextAtSize(secText, 9);
    page.drawText(secText, {
      x: W - 50 - secWidth,
      y: H - 45,
      size: 9,
      font: fontBold,
      color: mutedText,
    });

    // Bottom footer line
    page.drawLine({
      start: { x: 50, y: 40 },
      end: { x: W - 50, y: 40 },
      thickness: 1,
      color: rgb(0.9, 0.92, 0.94),
    });

    // Footer page number
    page.drawText(`${pageNum}`, {
      x: W - 65,
      y: 24,
      size: 11,
      font: fontBold,
      color: mutedText,
    });

    page.drawText('ESTG • Politécnico de Leiria — Licenciatura em Marketing', {
      x: 50,
      y: 24,
      size: 9,
      font: fontRegular,
      color: rgb(0.55, 0.58, 0.62),
    });
  }

  // Helper for section divider slides (blue-green gradient feel)
  function createSectionDivider(title: string, pageNum: number, subtitle?: string) {
    const page = pdfDoc.addPage([W, H]);

    // Solid rich background with brand teal/blue
    page.drawRectangle({
      x: 0,
      y: 0,
      width: W,
      height: H,
      color: rgb(0.08, 0.35, 0.58),
    });

    // Decorative gradient-like accent block
    page.drawRectangle({
      x: 0,
      y: 0,
      width: W,
      height: 180,
      color: rgb(0.18, 0.48, 0.28),
    });

    // Top logo & manual header
    page.drawText('Gazela', {
      x: 50,
      y: H - 55,
      size: 26,
      font: fontBold,
      color: white,
    });
    page.drawText('MANUAL DE CONSTRUÇÃO DA MARCA', {
      x: W - 320,
      y: H - 50,
      size: 10,
      font: fontBold,
      color: rgb(0.9, 0.95, 1),
    });

    // Big title
    page.drawText(title, {
      x: 90,
      y: H / 2 - 10,
      size: 46,
      font: fontBold,
      color: white,
    });

    if (subtitle) {
      page.drawText(subtitle, {
        x: 90,
        y: H / 2 - 50,
        size: 18,
        font: fontRegular,
        color: rgb(0.9, 0.98, 0.9),
      });
    }

    // Divider line
    page.drawLine({
      start: { x: 90, y: 70 },
      end: { x: W - 90, y: 70 },
      thickness: 1,
      color: rgb(0.4, 0.7, 0.6),
    });

    page.drawText(`${pageNum}`, {
      x: W - 70,
      y: 40,
      size: 12,
      font: fontBold,
      color: white,
    });

    return page;
  }

  // --- PAGE 1: COVER ---
  {
    const page = pdfDoc.addPage([W, H]);
    page.drawRectangle({
      x: 0,
      y: 0,
      width: W,
      height: H,
      color: rgb(0.12, 0.42, 0.68),
    });
    page.drawRectangle({
      x: 0,
      y: 0,
      width: W,
      height: 240,
      color: rgb(0.24, 0.54, 0.22),
    });

    // Top Right Institution Badge
    page.drawRectangle({
      x: W - 280,
      y: H - 75,
      width: 230,
      height: 44,
      color: rgb(0.06, 0.26, 0.45),
    });
    page.drawText('POLITÉCNICO DE LEIRIA', {
      x: W - 268,
      y: H - 52,
      size: 11,
      font: fontBold,
      color: white,
    });
    page.drawText('Escola Superior de Tecnologia e Gestão (ESTG)', {
      x: W - 268,
      y: H - 67,
      size: 8,
      font: fontRegular,
      color: rgb(0.85, 0.9, 0.95),
    });

    // Main Logo & Title
    page.drawText('Gazela', {
      x: W / 2 - 160,
      y: H / 2 + 10,
      size: 96,
      font: fontBold,
      color: white,
    });

    page.drawText('Vinho Verde • 0.0% Álcool • Biológico', {
      x: W / 2 - 170,
      y: H / 2 - 35,
      size: 18,
      font: fontRegular,
      color: rgb(0.9, 1, 0.9),
    });

    // Subtitle bar
    page.drawText('MANUAL DE CONSTRUÇÃO DA MARCA', {
      x: W / 2 - 195,
      y: 80,
      size: 18,
      font: fontBold,
      color: white,
    });
  }

  // --- PAGE 2: SEC 1 DIVIDER ---
  createSectionDivider('Pesquisa Visual', 2);

  // --- PAGE 3: SOBRE A MARCA GAZELA ---
  {
    const page = pdfDoc.addPage([W, H]);
    addSlideHeader(page, 'Pesquisa Visual', 3);

    page.drawText('Sobre a marca Gazela', {
      x: 50,
      y: H - 100,
      size: 26,
      font: fontBold,
      color: darkText,
    });

    // Card 1: Descrição
    page.drawRectangle({
      x: 50,
      y: H - 260,
      width: 380,
      height: 135,
      color: bgLight,
      borderColor: rgb(0.88, 0.9, 0.92),
      borderWidth: 1,
    });
    page.drawText('Posicionamento da Marca', {
      x: 70,
      y: H - 150,
      size: 14,
      font: fontBold,
      color: bluePrimary,
    });
    page.drawText('A Gazela é uma marca de vinho jovem, leve e descomplicada.\nCombina tradição e modernidade através de uma comunicação\npróxima, fresca e bem-humorada.', {
      x: 70,
      y: H - 180,
      size: 11,
      font: fontRegular,
      color: darkText,
      lineHeight: 18,
    });

    // Card 2: Valores
    page.drawRectangle({
      x: 50,
      y: H - 420,
      width: 380,
      height: 140,
      color: rgb(0.94, 0.98, 0.93),
      borderColor: greenPrimary,
      borderWidth: 1,
    });
    page.drawText('Valores Fundamentais', {
      x: 70,
      y: H - 305,
      size: 14,
      font: fontBold,
      color: greenPrimary,
    });
    page.drawText('Jovem • Relaxada • Acessível • Dinâmica • Divertida\n\nAr livre, viagens, praia, natureza e convívio entre amigos.\nValoriza a autenticidade, inclusão e causas sociais e ambientais.', {
      x: 70,
      y: H - 335,
      size: 11,
      font: fontRegular,
      color: darkText,
      lineHeight: 18,
    });

    // Right Column: Símbolo e Significado
    page.drawRectangle({
      x: 470,
      y: H - 420,
      width: 440,
      height: 295,
      color: rgb(0.95, 0.97, 1),
      borderColor: bluePrimary,
      borderWidth: 1,
    });
    page.drawText('O Símbolo da Gazela', {
      x: 500,
      y: H - 150,
      size: 18,
      font: fontBold,
      color: bluePrimary,
    });
    page.drawText('"Assim como a gazela, o vinho da Gazela simboliza\nleveza, dinamismo e frescura."', {
      x: 500,
      y: H - 195,
      size: 14,
      font: fontOblique,
      color: darkText,
      lineHeight: 22,
    });
    page.drawText('O rebranding para a vertente sem álcool e biológica introduz elementos\nnaturais na identidade visual, reforçando o equilíbrio entre um estilo\nde vida saudável e a celebração descomprometida.', {
      x: 500,
      y: H - 265,
      size: 11,
      font: fontRegular,
      color: darkText,
      lineHeight: 18,
    });
  }

  // --- PAGE 4: MARCAS DE REFERÊNCIA ---
  {
    const page = pdfDoc.addPage([W, H]);
    addSlideHeader(page, 'Pesquisa Visual', 4);

    page.drawText('Marcas de referência de Portugal', {
      x: 50,
      y: H - 100,
      size: 24,
      font: fontBold,
      color: darkText,
    });
    page.drawText('Principais marcas de vinhos em Portugal destacam-se pela qualidade, tradição e reconhecimento internacional.', {
      x: 50,
      y: H - 128,
      size: 12,
      font: fontRegular,
      color: mutedText,
    });

    const brands = [
      { name: 'Aveleda', type: 'Vinho Verde', reg: 'Vinhos de Quinta' },
      { name: 'Mateus', type: 'Rosé Original', reg: 'Internacional icónico' },
      { name: 'Casal Garcia', type: 'Vinho Verde', reg: 'Líder de mercado' },
      { name: 'Gazela', type: 'Vinho Verde', reg: 'Jovem e descomplicado' },
      { name: 'Sandeman', type: 'Porto & Douro', reg: 'Herança centenária' },
      { name: 'Periquita', type: 'Península de Setúbal', reg: 'Tradição portuguesa' }
    ];

    brands.forEach((b, i) => {
      const col = i % 3;
      const row = Math.floor(i / 3);
      const bx = 50 + col * 295;
      const by = H - 230 - row * 110;

      page.drawRectangle({
        x: bx,
        y: by,
        width: 275,
        height: 85,
        color: b.name === 'Gazela' ? rgb(0.92, 0.96, 1) : bgLight,
        borderColor: b.name === 'Gazela' ? bluePrimary : rgb(0.88, 0.9, 0.92),
        borderWidth: b.name === 'Gazela' ? 2 : 1,
      });

      page.drawText(b.name, {
        x: bx + 18,
        y: by + 50,
        size: 16,
        font: fontBold,
        color: b.name === 'Gazela' ? bluePrimary : darkText,
      });
      page.drawText(`${b.type} • ${b.reg}`, {
        x: bx + 18,
        y: by + 26,
        size: 10,
        font: fontRegular,
        color: mutedText,
      });
    });
  }

  // --- PAGE 5: MARCAS NO MESMO SETOR ---
  {
    const page = pdfDoc.addPage([W, H]);
    addSlideHeader(page, 'Pesquisa Visual', 5);

    page.drawText('Marcas no mesmo setor (Vinhos 0.0% e Sem Álcool)', {
      x: 50,
      y: H - 100,
      size: 24,
      font: fontBold,
      color: darkText,
    });
    page.drawText('Análise do mercado competitivo de bebidas alternativas e vinhos desalcoolizados a nível ibérico e global.', {
      x: 50,
      y: H - 128,
      size: 12,
      font: fontRegular,
      color: mutedText,
    });

    const competitors = [
      'Aurora 0.0% (Riesling Itálico)',
      'Natureo (Torres 0.0%)',
      'Sinzero (Chilean 0.0%)',
      'Cero Coma (Blanco sem álcool)',
      'Freixenet 0.0% (Espumante sem álcool)',
      'Levin / Lussory Organic 0.0%'
    ];

    competitors.forEach((c, idx) => {
      const x = 50 + (idx % 2) * 440;
      const y = H - 200 - Math.floor(idx / 2) * 75;
      page.drawRectangle({
        x,
        y,
        width: 420,
        height: 60,
        color: bgLight,
        borderColor: rgb(0.88, 0.9, 0.92),
        borderWidth: 1,
      });
      page.drawText(`• ${c}`, {
        x: x + 20,
        y: y + 24,
        size: 12,
        font: fontBold,
        color: darkText,
      });
    });
  }

  // --- PAGE 6: SEC 2 DIVIDER ---
  createSectionDivider('Processo de Construção da Marca', 6);

  // --- PAGE 7: GESTALT E CONSTRUÇÃO ---
  {
    const page = pdfDoc.addPage([W, H]);
    addSlideHeader(page, 'Processo de Construção', 7);

    page.drawText('Origem e Princípios de Gestalt', {
      x: 50,
      y: H - 100,
      size: 24,
      font: fontBold,
      color: darkText,
    });

    page.drawRectangle({
      x: 50,
      y: H - 420,
      width: 410,
      height: 290,
      color: bgLight,
      borderColor: rgb(0.85, 0.88, 0.9),
      borderWidth: 1,
    });

    page.drawText('Desafios Iniciais & Iterações:', {
      x: 70,
      y: H - 145,
      size: 14,
      font: fontBold,
      color: darkText,
    });
    page.drawText(
      '• Reparámos que faltava o tal twist mais naturalista e puro.\n\n' +
      '• Começámos por refletir como entrar na mente do consumidor,\n' +
      '  impondo logo a ideia de um vinho biológico sem álcool\n' +
      '  através da marca apenas.\n\n' +
      '• Testámos gradientes na tipografia, mas tornava a leitura confusa.\n\n' +
      '• Colocar os cornos mais para cima desequilibrava a forma\n' +
      '  geral da gazela.',
      {
        x: 70,
        y: H - 180,
        size: 11,
        font: fontRegular,
        color: darkText,
        lineHeight: 18,
      }
    );

    page.drawRectangle({
      x: 490,
      y: H - 420,
      width: 420,
      height: 290,
      color: rgb(0.94, 0.98, 0.93),
      borderColor: greenPrimary,
      borderWidth: 1,
    });

    page.drawText('Solução Final: Leis de Gestalt', {
      x: 515,
      y: H - 145,
      size: 14,
      font: fontBold,
      color: greenPrimary,
    });
    page.drawText(
      'Criámos o símbolo equilibrado que representa a gazela\n' +
      'através dos princípios comprovados da Escola de Gestalt:\n\n' +
      '1. Figura-Fundo: Integração orgânica do animal na letra G.\n' +
      '2. Fechamento: O olhar do observador completa o contorno natural.\n' +
      '3. Unificação: Videiras, folhas e o animal fundem-se num único\n' +
      '   elemento pictográfico harmonioso.',
      {
        x: 515,
        y: H - 185,
        size: 11,
        font: fontRegular,
        color: darkText,
        lineHeight: 20,
      }
    );
  }

  // --- PAGE 8: CORNOS VIDEIRA + AZUL ---
  {
    const page = pdfDoc.addPage([W, H]);
    addSlideHeader(page, 'Processo de Construção', 8);

    page.drawText('Simbologia dos Elementos e Cores', {
      x: 50,
      y: H - 100,
      size: 24,
      font: fontBold,
      color: darkText,
    });

    // Simbologia Animal / Natureza (Verde)
    page.drawRectangle({
      x: 50,
      y: H - 250,
      width: 860,
      height: 120,
      color: rgb(0.94, 0.98, 0.93),
      borderColor: greenPrimary,
      borderWidth: 1,
    });
    page.drawText('Símbolo (Verde) = Pureza e Origem Biológica', {
      x: 75,
      y: H - 160,
      size: 14,
      font: fontBold,
      color: greenPrimary,
    });
    page.drawText(
      'Os cornos em forma de videira simbolizam a natureza, onde a pureza também vem da gazela em si, um animal\n' +
      'inocente. A nível cromático, o verde retrata a essência biológica e a agricultura sustentável da marca.',
      {
        x: 75,
        y: H - 195,
        size: 11,
        font: fontRegular,
        color: darkText,
        lineHeight: 18,
      }
    );

    // Simbologia Álcool Zero (Azul)
    page.drawRectangle({
      x: 50,
      y: H - 400,
      width: 860,
      height: 120,
      color: rgb(0.93, 0.96, 1),
      borderColor: bluePrimary,
      borderWidth: 1,
    });
    page.drawText('Lettering (Azul) = Vinho Sem Álcool (0.0%)', {
      x: 75,
      y: H - 310,
      size: 14,
      font: fontBold,
      color: bluePrimary,
    });
    page.drawText(
      'O azul celeste profundo insinua que o produto é desalcoolizado, transmitindo frescura e sobriedade.\n' +
      'Juntando estes dois elementos, obtemos o logo final a cores: uma versão inovadora que reflete paixão e respeito.',
      {
        x: 75,
        y: H - 345,
        size: 11,
        font: fontRegular,
        color: darkText,
        lineHeight: 18,
      }
    );
  }

  // --- PAGE 9: COMPOSIÇÃO DA MARCA ---
  {
    const page = pdfDoc.addPage([W, H]);
    addSlideHeader(page, 'Processo de Construção', 9);

    page.drawText('Composição da Marca', {
      x: 50,
      y: H - 100,
      size: 24,
      font: fontBold,
      color: darkText,
    });

    // Diagram box
    page.drawRectangle({
      x: 100,
      y: H - 380,
      width: 760,
      height: 250,
      color: bgLight,
      borderColor: rgb(0.85, 0.88, 0.9),
      borderWidth: 1,
    });

    // Mock central brand block
    page.drawText('[SÍMBOLO: GAZELA BIOLÓGICA]', {
      x: 160,
      y: H - 210,
      size: 14,
      font: fontBold,
      color: greenPrimary,
    });
    page.drawText('Gazela', {
      x: 440,
      y: H - 235,
      size: 48,
      font: fontBold,
      color: bluePrimary,
    });
    page.drawText('"A mesma vibe com ZERO% culpa"', {
      x: 340,
      y: H - 295,
      size: 16,
      font: fontOblique,
      color: darkText,
    });

    page.drawText('Estrutura Composta: Símbolo + Logótipo + Assinatura de Marca (Claim)', {
      x: 230,
      y: H - 350,
      size: 11,
      font: fontBold,
      color: mutedText,
    });
  }

  // --- PAGE 10: LINHA DE CONSTRUÇÃO ---
  {
    const page = pdfDoc.addPage([W, H]);
    addSlideHeader(page, 'Processo de Construção', 10);

    page.drawText('Linha de Construção (Grelha Modular)', {
      x: 50,
      y: H - 100,
      size: 24,
      font: fontBold,
      color: darkText,
    });

    page.drawRectangle({
      x: 50,
      y: H - 420,
      width: 860,
      height: 290,
      color: bgLight,
      borderColor: rgb(0.85, 0.88, 0.9),
      borderWidth: 1,
    });

    page.drawText(
      'A construção da marca Gazela obedece a uma rigorosa outline.\n' +
      'Esta grelha modular serve de guia para assegurar a correta proporção e o equilíbrio perfeito\n' +
      'entre os dois elementos-chave:',
      {
        x: 80,
        y: H - 150,
        size: 14,
        font: fontRegular,
        color: darkText,
        lineHeight: 22,
      }
    );

    page.drawText('1. O SÍMBOLO (A Gazela com galhadas de videira): proporção áurea com o lettering.', {
      x: 100,
      y: H - 230,
      size: 12,
      font: fontBold,
      color: greenPrimary,
    });
    page.drawText('2. O LOGÓTIPO (Lettering cursivo fluido "Gazela"): alinhamento da linha de base.', {
      x: 100,
      y: H - 265,
      size: 12,
      font: fontBold,
      color: bluePrimary,
    });
    page.drawText('3. A ASSINATURA INFERIOR: centrada pelo bloco visual sem colidir com a ascendente da letra z.', {
      x: 100,
      y: H - 300,
      size: 12,
      font: fontBold,
      color: darkText,
    });
  }

  // --- PAGE 11: LOGO COM ASSINATURA ---
  {
    const page = pdfDoc.addPage([W, H]);
    addSlideHeader(page, 'Processo de Construção', 11);

    page.drawText('Logo com Assinatura (2 Variações Oficiais)', {
      x: 50,
      y: H - 100,
      size: 24,
      font: fontBold,
      color: darkText,
    });

    // Assinatura 1
    page.drawRectangle({
      x: 50,
      y: H - 420,
      width: 410,
      height: 290,
      color: bgLight,
      borderColor: rgb(0.85, 0.88, 0.9),
      borderWidth: 1,
    });
    page.drawText('"A mesma vibe com ZERO% culpa"', {
      x: 75,
      y: H - 145,
      size: 15,
      font: fontBold,
      color: bluePrimary,
    });
    page.drawText(
      '• Uso: Comunicação de Lifestyle, Eventos e Campanhas de Verão.\n\n' +
      '• Objetivo: Combater o estigma do "sem álcool", focando na\n' +
      '  diversão, prazer e convívio descontraído com os amigos.',
      {
        x: 75,
        y: H - 190,
        size: 11,
        font: fontRegular,
        color: darkText,
        lineHeight: 18,
      }
    );

    // Assinatura 2
    page.drawRectangle({
      x: 490,
      y: H - 420,
      width: 420,
      height: 290,
      color: rgb(0.94, 0.98, 0.93),
      borderColor: greenPrimary,
      borderWidth: 1,
    });
    page.drawText('"Naturalmente sem culpa"', {
      x: 515,
      y: H - 145,
      size: 15,
      font: fontBold,
      color: greenPrimary,
    });
    page.drawText(
      '• Uso: Comunicação de Produto, Pontos de Venda e Institucional.\n\n' +
      '• Objetivo: Destacar a origem Biológica ("Naturalmente"),\n' +
      '  ao mesmo tempo que reforça o atributo 0% álcool.',
      {
        x: 515,
        y: H - 190,
        size: 11,
        font: fontRegular,
        color: darkText,
        lineHeight: 18,
      }
    );
  }

  // --- PAGE 12: SEC 3 DIVIDER ---
  createSectionDivider('Conceito da Marca', 12);

  // --- PAGE 13: LOGÓTIPO ORIGINAL ---
  {
    const page = pdfDoc.addPage([W, H]);
    addSlideHeader(page, 'Conceito da Marca', 13);

    page.drawText('Evolução a partir da Identidade Original', {
      x: 50,
      y: H - 100,
      size: 24,
      font: fontBold,
      color: darkText,
    });

    page.drawRectangle({
      x: 50,
      y: H - 400,
      width: 860,
      height: 270,
      color: bgLight,
      borderColor: rgb(0.85, 0.88, 0.9),
      borderWidth: 1,
    });

    page.drawText('Gazela', {
      x: W / 2 - 80,
      y: H - 200,
      size: 60,
      font: fontBold,
      color: darkText,
    });

    page.drawText(
      'Este é o logótipo original da Gazela, concebido para vinho verde tradicional.\n' +
      'Para esta nova gama, foi necessário integrar um twist moderno sem álcool e biológico.\n' +
      'Fizemos testes exaustivos e chegámos à conclusão de preservar a silhueta clássica do lettering.',
      {
        x: 100,
        y: H - 270,
        size: 12,
        font: fontRegular,
        color: mutedText,
        lineHeight: 20,
      }
    );
  }

  // --- PAGE 14: JUSTIFICAÇÃO ESTRATÉGICA ---
  {
    const page = pdfDoc.addPage([W, H]);
    addSlideHeader(page, 'Conceito da Marca', 14);

    page.drawText('Fundamentação Estratégica do Rebranding', {
      x: 50,
      y: H - 100,
      size: 24,
      font: fontBold,
      color: darkText,
    });

    page.drawRectangle({
      x: 50,
      y: H - 420,
      width: 860,
      height: 290,
      color: bgLight,
      borderColor: rgb(0.85, 0.88, 0.9),
      borderWidth: 1,
    });

    page.drawText(
      'Porquê manter o lettering original com novos atributos?\n\n' +
      '• O "sem álcool" e o "biológico" são atributos de extensão de produto, a essência e o património da marca\n' +
      '  Gazela devem manter-se reconhecíveis no linear.\n\n' +
      '• O elemento do animal Gazela reforça a rapidez, jovialidade, autenticidade e inocência.\n\n' +
      '• Os chifres em videira comunicam a proveniência dos solos e a casta orgânica sem necessidade de palavras.\n\n' +
      '• O azul simboliza sobriedade, pureza e refrescamento imediato.',
      {
        x: 80,
        y: H - 160,
        size: 12,
        font: fontRegular,
        color: darkText,
        lineHeight: 22,
      }
    );
  }

  // --- PAGE 15: SEC 4 DIVIDER ---
  createSectionDivider('Variações da Marca', 15);

  // --- PAGE 16: VARIAÇÃO HORIZONTAL E VERTICAL ---
  {
    const page = pdfDoc.addPage([W, H]);
    addSlideHeader(page, 'Variações', 16);

    page.drawText('Orientação Horizontal e Vertical', {
      x: 50,
      y: H - 100,
      size: 24,
      font: fontBold,
      color: darkText,
    });

    page.drawRectangle({
      x: 50,
      y: H - 420,
      width: 410,
      height: 290,
      color: bgLight,
      borderColor: rgb(0.85, 0.88, 0.9),
      borderWidth: 1,
    });
    page.drawText('Versão Horizontal (Padrão)', {
      x: 75,
      y: H - 140,
      size: 14,
      font: fontBold,
      color: bluePrimary,
    });
    page.drawText(
      '• Aplicação preferencial na maioria dos suportes.\n' +
      '• O símbolo antecede o lettering à esquerda com espaçamento regular.\n' +
      '• Adequada para rótulos horizontais, web headers e publicações.',
      {
        x: 75,
        y: H - 180,
        size: 11,
        font: fontRegular,
        color: darkText,
        lineHeight: 18,
      }
    );

    page.drawRectangle({
      x: 490,
      y: H - 420,
      width: 420,
      height: 290,
      color: bgLight,
      borderColor: rgb(0.85, 0.88, 0.9),
      borderWidth: 1,
    });
    page.drawText('Versão Vertical (Garrafa e Merchandising)', {
      x: 515,
      y: H - 140,
      size: 14,
      font: fontBold,
      color: greenPrimary,
    });
    page.drawText(
      '• Usada na frente das garrafas de vinho verde Gazela.\n' +
      '• O elemento da Gazela deve estar virado para baixo e orientado à esquerda.\n' +
      '• Para versões com assinatura, não é permitida a variação vertical para\n' +
      '  preservar a legibilidade do claim.',
      {
        x: 515,
        y: H - 180,
        size: 11,
        font: fontRegular,
        color: darkText,
        lineHeight: 18,
      }
    );
  }

  // --- PAGE 17: SITUAÇÕES A EVITAR ---
  {
    const page = pdfDoc.addPage([W, H]);
    addSlideHeader(page, 'Variações', 17);

    page.drawText('Situações a Evitar (Normas de Proteção)', {
      x: 50,
      y: H - 100,
      size: 24,
      font: fontBold,
      color: darkText,
    });

    const incorrects = [
      'Alterar para outra cromática não oficial (ex: amarelo/vermelho)',
      'Distorcer o logo em qualquer dos eixos (estiramento/compressão)',
      'Encolher ou desproporcionar o símbolo face ao lettering',
      'Inserir caixas delimitadoras ou fundos de corte colados',
      'Utilizar a marca apenas em outline sem preenchimento',
      'Aplicar sombras projetadas, chanfros ou efeitos 3D'
    ];

    incorrects.forEach((item, idx) => {
      const x = 50 + (idx % 2) * 440;
      const y = H - 200 - Math.floor(idx / 2) * 75;
      page.drawRectangle({
        x,
        y,
        width: 420,
        height: 60,
        color: rgb(1, 0.94, 0.94),
        borderColor: rgb(0.85, 0.3, 0.3),
        borderWidth: 1,
      });
      page.drawText(`[X]  ${item}`, {
        x: x + 18,
        y: y + 24,
        size: 11,
        font: fontBold,
        color: rgb(0.7, 0.1, 0.1),
      });
    });
  }

  // --- PAGE 18: MARGEM DE SEGURANÇA E DIMENSÕES MÍNIMAS ---
  {
    const page = pdfDoc.addPage([W, H]);
    addSlideHeader(page, 'Processo de Construção', 18);

    page.drawText('Margem de Segurança e Dimensões Mínimas', {
      x: 50,
      y: H - 100,
      size: 24,
      font: fontBold,
      color: darkText,
    });

    // Margem de Segurança
    page.drawRectangle({
      x: 50,
      y: H - 420,
      width: 410,
      height: 290,
      color: bgLight,
      borderColor: rgb(0.85, 0.88, 0.9),
      borderWidth: 1,
    });
    page.drawText('Margem de Segurança (X)', {
      x: 75,
      y: H - 140,
      size: 14,
      font: fontBold,
      color: bluePrimary,
    });
    page.drawText(
      '• A área de proteção equivale à altura do elemento da Gazela (16.8 mm).\n\n' +
      '• Nenhum texto, ilustração ou corte gráfico deve invadir esta área\n' +
      '  ao redor do logótipo em qualquer suporte impresso ou digital.\n\n' +
      '• O logo com assinatura cumpre a mesma proporção perimetral.',
      {
        x: 75,
        y: H - 180,
        size: 11,
        font: fontRegular,
        color: darkText,
        lineHeight: 18,
      }
    );

    // Dimensões Mínimas
    page.drawRectangle({
      x: 490,
      y: H - 420,
      width: 420,
      height: 290,
      color: bgLight,
      borderColor: rgb(0.85, 0.88, 0.9),
      borderWidth: 1,
    });
    page.drawText('Dimensões Mínimas de Reprodução', {
      x: 515,
      y: H - 140,
      size: 14,
      font: fontBold,
      color: greenPrimary,
    });
    page.drawText(
      'Para garantir a legibilidade em embalagens e merchandising:\n\n' +
      '• Versão Sem Assinatura:\n' +
      '  Largura mínima: 47.8 mm  |  Altura mínima: 16.8 mm\n\n' +
      '• Versão Com Assinatura:\n' +
      '  Largura mínima: 64.7 mm  |  Altura mínima: 26.4 mm',
      {
        x: 515,
        y: H - 180,
        size: 11,
        font: fontRegular,
        color: darkText,
        lineHeight: 18,
      }
    );
  }

  // --- PAGE 19: SEC 5 DIVIDER ---
  createSectionDivider('Cromatismo', 19);

  // --- PAGE 20: MONOCROMÁTICOS ---
  {
    const page = pdfDoc.addPage([W, H]);
    addSlideHeader(page, 'Cromatismo', 20);

    page.drawText('Paleta de Cores Institucionais', {
      x: 50,
      y: H - 100,
      size: 24,
      font: fontBold,
      color: darkText,
    });

    const palette = [
      { name: 'Verde videira muito pálido', pantone: '580C', cmyk: '10, 0, 23, 13', hex: '#C9DFAC', color: paleGreen },
      { name: 'Verde-rio Profundo', pantone: '3308C', cmyk: '86, 0, 14, 74', hex: '#004036', color: tealDeep },
      { name: 'Azul celeste profundo', pantone: '2133C', cmyk: '83, 41, 0, 30', hex: '#1E6AB3', color: bluePrimary },
      { name: 'Verde musgo maduro', pantone: '575C', cmyk: '26, 0, 66, 46', hex: '#66892E', color: greenPrimary },
    ];

    palette.forEach((p, idx) => {
      const col = idx % 2;
      const row = Math.floor(idx / 2);
      const x = 50 + col * 440;
      const y = H - 240 - row * 130;

      page.drawRectangle({
        x,
        y,
        width: 420,
        height: 110,
        color: bgLight,
        borderColor: rgb(0.85, 0.88, 0.9),
        borderWidth: 1,
      });

      // Color swatch circle/rect
      page.drawRectangle({
        x: x + 15,
        y: y + 20,
        width: 70,
        height: 70,
        color: p.color,
      });

      page.drawText(p.name, {
        x: x + 100,
        y: y + 70,
        size: 13,
        font: fontBold,
        color: darkText,
      });
      page.drawText(`Pantone: ${p.pantone}  •  HEX: ${p.hex}`, {
        x: x + 100,
        y: y + 50,
        size: 11,
        font: fontRegular,
        color: mutedText,
      });
      page.drawText(`CMYK: ${p.cmyk}`, {
        x: x + 100,
        y: y + 32,
        size: 10,
        font: fontRegular,
        color: mutedText,
      });
    });
  }

  // --- PAGE 21: POSITIVO / NEGATIVO ---
  {
    const page = pdfDoc.addPage([W, H]);
    addSlideHeader(page, 'Cromatismo', 21);

    page.drawText('Versões Positivo e Negativo (Preto e Branco)', {
      x: 50,
      y: H - 100,
      size: 24,
      font: fontBold,
      color: darkText,
    });

    // Bloco Fundo Preto (Versão Branco)
    page.drawRectangle({
      x: 50,
      y: H - 420,
      width: 410,
      height: 290,
      color: rgb(0.08, 0.08, 0.08),
    });
    page.drawText('Versão Negativa (Branco)', {
      x: 75,
      y: H - 150,
      size: 16,
      font: fontBold,
      color: white,
    });
    page.drawText('Gazela', {
      x: 160,
      y: H - 250,
      size: 42,
      font: fontBold,
      color: white,
    });
    page.drawText('Pantone: White  •  HEX: #FFFFFF', {
      x: 75,
      y: H - 360,
      size: 11,
      font: fontRegular,
      color: rgb(0.8, 0.8, 0.8),
    });

    // Bloco Fundo Claro (Versão Preto)
    page.drawRectangle({
      x: 490,
      y: H - 420,
      width: 420,
      height: 290,
      color: bgLight,
      borderColor: rgb(0.85, 0.88, 0.9),
      borderWidth: 1,
    });
    page.drawText('Versão Positiva (Preto)', {
      x: 515,
      y: H - 150,
      size: 16,
      font: fontBold,
      color: darkText,
    });
    page.drawText('Gazela', {
      x: 600,
      y: H - 250,
      size: 42,
      font: fontBold,
      color: darkText,
    });
    page.drawText('Pantone: Process Black  •  HEX: #000000', {
      x: 515,
      y: H - 360,
      size: 11,
      font: fontRegular,
      color: mutedText,
    });
  }

  // --- PAGE 22: VERSÃO A CORES ---
  {
    const page = pdfDoc.addPage([W, H]);
    addSlideHeader(page, 'Cromatismo', 22);

    page.drawText('Versão Oficial a Cores e Aplicação Prática', {
      x: 50,
      y: H - 100,
      size: 24,
      font: fontBold,
      color: darkText,
    });

    page.drawRectangle({
      x: 50,
      y: H - 420,
      width: 860,
      height: 290,
      color: bgLight,
      borderColor: rgb(0.85, 0.88, 0.9),
      borderWidth: 1,
    });

    page.drawText(
      'Síntese da Estratégia de Rebranding:\n\n' +
      'A versão policromática oficial dá a entender de imediato que é um produto híbrido premium,\n' +
      'respeitando tanto a natureza (Verde Musgo #66892e) como o nosso bem-estar (Azul Celeste #1e6ab3).\n\n' +
      'Aplicações Práticas Recomendadas:\n' +
      '• Rótulo em papel texturado mate com verniz localizado no logótipo;\n' +
      '• Outdoors e mupis divididos: metade vinha biológica / metade brinde refrescante à beira da piscina;\n' +
      '• Comunicação oficial exclusivamente reservada a esta gama 0.0% Bio.',
      {
        x: 80,
        y: H - 160,
        size: 12,
        font: fontRegular,
        color: darkText,
        lineHeight: 22,
      }
    );
  }

  // --- PAGE 23: SEC 6 DIVIDER ---
  createSectionDivider('Tipografia Institucional', 23);

  // --- PAGE 24: TIPOGRAFIA MYRIAD ---
  {
    const page = pdfDoc.addPage([W, H]);
    addSlideHeader(page, 'Tipografia', 24);

    page.drawText('Tipografia Oficial: Myriad', {
      x: 50,
      y: H - 100,
      size: 24,
      font: fontBold,
      color: darkText,
    });

    page.drawRectangle({
      x: 50,
      y: H - 420,
      width: 860,
      height: 290,
      color: bgLight,
      borderColor: rgb(0.85, 0.88, 0.9),
      borderWidth: 1,
    });

    page.drawText('Myriad Pro (Regular, Bold, Italic)', {
      x: 80,
      y: H - 150,
      size: 18,
      font: fontBold,
      color: bluePrimary,
    });
    page.drawText(
      'Utilizada para textos corridos, rotulagem técnica, tabela nutricional e comunicação formal.\n' +
      'É limpa, moderna e mantém um toque humano e orgânico que reforça a naturalidade da marca.',
      {
        x: 80,
        y: H - 190,
        size: 12,
        font: fontRegular,
        color: darkText,
        lineHeight: 18,
      }
    );

    page.drawText('ABCDEFGHIJKLMNOPQRSTUVWXYZ', {
      x: 80,
      y: H - 260,
      size: 18,
      font: fontBold,
      color: darkText,
    });
    page.drawText('abcdefghijklmnopqrstuvwxyz  1234567890 .:,;+-*/=', {
      x: 80,
      y: H - 295,
      size: 15,
      font: fontRegular,
      color: mutedText,
    });
  }

  // --- PAGE 25: TIPOGRAFIA GAZELA00BIO ---
  {
    const page = pdfDoc.addPage([W, H]);
    addSlideHeader(page, 'Tipografia', 25);

    page.drawText('Tipografia de Destaque: Gazela00Bio', {
      x: 50,
      y: H - 100,
      size: 24,
      font: fontBold,
      color: darkText,
    });

    page.drawRectangle({
      x: 50,
      y: H - 420,
      width: 860,
      height: 290,
      color: bgLight,
      borderColor: rgb(0.85, 0.88, 0.9),
      borderWidth: 1,
    });

    page.drawText('Gazela00Bio (Display & Titulares)', {
      x: 80,
      y: H - 150,
      size: 18,
      font: fontBold,
      color: greenPrimary,
    });
    page.drawText(
      'Recomendada para campanhas publicitárias, redes sociais, mupis e títulos de impacto.\n' +
      'A sua ligeira inclinação para a direita sugere velocidade e agilidade (evocando a gazela),\n' +
      'enquanto os traços descontraídos traduzem o espírito "Cool / Vibe" do produto sem culpa.',
      {
        x: 80,
        y: H - 190,
        size: 12,
        font: fontRegular,
        color: darkText,
        lineHeight: 18,
      }
    );

    page.drawText('Ag  •  "A mesma vibe com ZERO% culpa"', {
      x: 80,
      y: H - 270,
      size: 20,
      font: fontOblique,
      color: darkText,
    });
  }

  // --- PAGE 26: SEC 7 DIVIDER ---
  createSectionDivider('Testes de Fundo', 26);

  // --- PAGE 27: FUNDOS DE COR ---
  {
    const page = pdfDoc.addPage([W, H]);
    addSlideHeader(page, 'Testes de Fundo', 27);

    page.drawText('Comportamento em Fundos de Cor', {
      x: 50,
      y: H - 100,
      size: 24,
      font: fontBold,
      color: darkText,
    });

    const bgColors = [
      { name: 'Branco Texturado', bg: white, fg: bluePrimary },
      { name: 'Verde Pálido', bg: paleGreen, fg: tealDeep },
      { name: 'Bege Pastel', bg: rgb(0.96, 0.91, 0.84), fg: darkText },
      { name: 'Azul Claro', bg: rgb(0.85, 0.92, 0.98), fg: bluePrimary },
      { name: 'Verde Escuro', bg: tealDeep, fg: white },
      { name: 'Preto Grafite', bg: rgb(0.1, 0.1, 0.1), fg: white },
    ];

    bgColors.forEach((b, idx) => {
      const col = idx % 3;
      const row = Math.floor(idx / 3);
      const x = 50 + col * 295;
      const y = H - 230 - row * 115;

      page.drawRectangle({
        x,
        y,
        width: 275,
        height: 95,
        color: b.bg,
        borderColor: rgb(0.8, 0.8, 0.8),
        borderWidth: 1,
      });

      page.drawText('Gazela', {
        x: x + 25,
        y: y + 45,
        size: 24,
        font: fontBold,
        color: b.fg,
      });
      page.drawText(b.name, {
        x: x + 25,
        y: y + 20,
        size: 10,
        font: fontRegular,
        color: b.bg === tealDeep || b.bg === rgb(0.1, 0.1, 0.1) ? rgb(0.8, 0.8, 0.8) : mutedText,
      });
    });
  }

  // --- PAGE 28: FUNDOS COM IMAGEM ---
  {
    const page = pdfDoc.addPage([W, H]);
    addSlideHeader(page, 'Testes de Fundo', 28);

    page.drawText('Legibilidade Sobre Imagens Reais', {
      x: 50,
      y: H - 100,
      size: 24,
      font: fontBold,
      color: darkText,
    });

    page.drawRectangle({
      x: 50,
      y: H - 420,
      width: 860,
      height: 290,
      color: bgLight,
      borderColor: rgb(0.85, 0.88, 0.9),
      borderWidth: 1,
    });

    page.drawText(
      'Critérios de Aplicação Fotográfica:\n\n' +
      '• Em fotografias de vinhas ou paisagens verdes: usar o lettering em azul profundo contrastante\n' +
      '  ou versão branca com sombra suave impercetível apenas quando indispensável;\n\n' +
      '• Em fotografias de praia, piscina ou pôr do sol: garantir que o logo fica posicionado em áreas limpas;\n\n' +
      '• Proibido aplicar a versão a cores sobre fundos fotográficos saturados que concorram com a gazela.',
      {
        x: 80,
        y: H - 160,
        size: 12,
        font: fontRegular,
        color: darkText,
        lineHeight: 22,
      }
    );
  }

  // --- PAGE 29: SEC 8 DIVIDER ---
  createSectionDivider('Aplicações Práticas', 29);

  // --- PAGE 30: PRODUTOS - GARRAFA 750ML ---
  {
    const page = pdfDoc.addPage([W, H]);
    addSlideHeader(page, 'Aplicações Práticas', 30);

    page.drawText('Garrafa Oficial: Gazela Vinho Verde 0.0%', {
      x: 50,
      y: H - 100,
      size: 24,
      font: fontBold,
      color: darkText,
    });

    page.drawRectangle({
      x: 50,
      y: H - 420,
      width: 410,
      height: 290,
      color: bgLight,
      borderColor: rgb(0.85, 0.88, 0.9),
      borderWidth: 1,
    });
    page.drawText('Especificações Técnicas de Embalagem', {
      x: 75,
      y: H - 140,
      size: 14,
      font: fontBold,
      color: bluePrimary,
    });
    page.drawText(
      '• Produto: Vinho Verde Branco Desalcoolizado\n\n' +
      '• Teor Alcoólico: 0.0% alc/vol\n\n' +
      '• Volume: 750 ml\n\n' +
      '• Benefício Nutricional: Menos calorias devido à ausência de álcool\n\n' +
      '• Sistema de Abertura: Screwcap azul com relevo do símbolo',
      {
        x: 75,
        y: H - 180,
        size: 11,
        font: fontRegular,
        color: darkText,
        lineHeight: 20,
      }
    );

    page.drawRectangle({
      x: 490,
      y: H - 420,
      width: 420,
      height: 290,
      color: rgb(0.94, 0.98, 0.93),
      borderColor: greenPrimary,
      borderWidth: 1,
    });
    page.drawText('Rótulo e Contrarrótulo', {
      x: 515,
      y: H - 140,
      size: 14,
      font: fontBold,
      color: greenPrimary,
    });
    page.drawText(
      '• Frente: Aplicação vertical serigrafada em relevo fosco diretamente\n' +
      '  no vidro translúcido da garrafa Gazela;\n\n' +
      '• Verso: Tabela nutricional limpa, certificação Bio da UE,\n' +
      '  indicação de temperatura de consumo recomendada (6º-8ºC)\n' +
      '  e QR code interativo para a campanha digital.',
      {
        x: 515,
        y: H - 180,
        size: 11,
        font: fontRegular,
        color: darkText,
        lineHeight: 20,
      }
    );
  }

  // --- PAGE 31: MERCHANDISING DO VINHO ---
  {
    const page = pdfDoc.addPage([W, H]);
    addSlideHeader(page, 'Aplicações Práticas', 31);

    page.drawText('Linha de Merchandising do Vinho', {
      x: 50,
      y: H - 100,
      size: 24,
      font: fontBold,
      color: darkText,
    });

    const items = [
      { title: 'Copo de Vidro Gazela', desc: 'Gravado a laser com o símbolo e o lettering vertical.' },
      { title: 'Caixa de Madeira', desc: 'Embalagem de oferta sustentável em pinho nacional gravado a fogo.' },
      { title: 'Bolsa Térmica de Neopreno', desc: 'Mantém o vinho fresco em convívios de praia e piqueniques.' },
      { title: 'Tábua de Madeira de Servir', desc: 'Tábua de corte rústica com apontamento da marca no canto.' },
      { title: 'Panos de Serviço de Vinho', desc: 'Tecido 100% algodão biológico com estampado delicado.' },
    ];

    items.forEach((it, idx) => {
      const y = H - 160 - idx * 55;
      page.drawRectangle({
        x: 50,
        y,
        width: 860,
        height: 48,
        color: bgLight,
        borderColor: rgb(0.88, 0.9, 0.92),
        borderWidth: 1,
      });
      page.drawText(`• ${it.title}:`, {
        x: 75,
        y: y + 18,
        size: 11,
        font: fontBold,
        color: bluePrimary,
      });
      page.drawText(it.desc, {
        x: 280,
        y: y + 18,
        size: 11,
        font: fontRegular,
        color: darkText,
      });
    });
  }

  // --- PAGE 32: ESTACIONÁRIO ---
  {
    const page = pdfDoc.addPage([W, H]);
    addSlideHeader(page, 'Aplicações Práticas', 32);

    page.drawText('Linha de Estacionário e Brindes Promocionais', {
      x: 50,
      y: H - 100,
      size: 24,
      font: fontBold,
      color: darkText,
    });

    const stationary = [
      { name: 'Caneca Cerâmica', desc: 'Acabamento mate em azul celeste com logo Gazela a branco' },
      { name: 'Saco / Tote Bag de Algodão', desc: 'Algodão cru biológico com serigrafia verde musgo e azul' },
      { name: 'Cartão de Visita Institucional', desc: 'Papel semente 350g plantável com dados e contactos comerciais' },
      { name: 'Calendário de Secretária', desc: '12 meses com fotografia sazonal e lembretes de eventos da marca' },
      { name: 'Autocolantes / Stickers', desc: 'Vinil mate resistente à água para copos, skates e portáteis' },
    ];

    stationary.forEach((it, idx) => {
      const y = H - 160 - idx * 55;
      page.drawRectangle({
        x: 50,
        y,
        width: 860,
        height: 48,
        color: bgLight,
        borderColor: rgb(0.88, 0.9, 0.92),
        borderWidth: 1,
      });
      page.drawText(`• ${it.name}:`, {
        x: 75,
        y: y + 18,
        size: 11,
        font: fontBold,
        color: greenPrimary,
      });
      page.drawText(it.desc, {
        x: 320,
        y: y + 18,
        size: 11,
        font: fontRegular,
        color: darkText,
      });
    });
  }

  // --- PAGE 33: POSTS REDES SOCIAIS (1) ---
  {
    const page = pdfDoc.addPage([W, H]);
    addSlideHeader(page, 'Aplicações Práticas', 33);

    page.drawText('Redes Sociais: Campanhas de Produto (Instagram)', {
      x: 50,
      y: H - 100,
      size: 24,
      font: fontBold,
      color: darkText,
    });

    page.drawRectangle({
      x: 50,
      y: H - 420,
      width: 410,
      height: 290,
      color: bgLight,
      borderColor: rgb(0.85, 0.88, 0.9),
      borderWidth: 1,
    });
    page.drawText('Post 1: "Brindar também é saber escolher"', {
      x: 75,
      y: H - 145,
      size: 13,
      font: fontBold,
      color: bluePrimary,
    });
    page.drawText(
      '• Visual: Copo de vinho verde com gelo e uvas frescas ao fundo;\n\n' +
      '• Copy: "Brindar à tua maneira, com 0% álcool e 100% de sabor.\n' +
      '  A frescura inconfundível de Gazela agora em versão Biológica."\n\n' +
      '• Hashtags: #GazelaSemAlcool #BrindeSemCulpa #00Bio',
      {
        x: 75,
        y: H - 185,
        size: 11,
        font: fontRegular,
        color: darkText,
        lineHeight: 18,
      }
    );

    page.drawRectangle({
      x: 490,
      y: H - 420,
      width: 420,
      height: 290,
      color: bgLight,
      borderColor: rgb(0.85, 0.88, 0.9),
      borderWidth: 1,
    });
    page.drawText('Post 2: "Para brindar à tua maneira"', {
      x: 515,
      y: H - 145,
      size: 13,
      font: fontBold,
      color: greenPrimary,
    });
    page.drawText(
      '• Visual: Garrafa central em atmosfera veranil e dinâmica;\n\n' +
      '• Copy: "Tens a mesma vibe e acordas impecável amanhã.\n' +
      '  Celebra todos os dias com quem mais gostas."\n\n' +
      '• Objetivo: Quebrar a barreira social entre bebedores e não bebedores.',
      {
        x: 515,
        y: H - 185,
        size: 11,
        font: fontRegular,
        color: darkText,
        lineHeight: 18,
      }
    );
  }

  // --- PAGE 34: POSTS REDES SOCIAIS (2) ---
  {
    const page = pdfDoc.addPage([W, H]);
    addSlideHeader(page, 'Aplicações Práticas', 34);

    page.drawText('Redes Sociais: Ativação Lifestyle & Verão', {
      x: 50,
      y: H - 100,
      size: 24,
      font: fontBold,
      color: darkText,
    });

    page.drawRectangle({
      x: 50,
      y: H - 420,
      width: 860,
      height: 290,
      color: bgLight,
      borderColor: rgb(0.85, 0.88, 0.9),
      borderWidth: 1,
    });

    page.drawText('Conceito "Festa Sem Culpa"  •  #SEM ÁLCOOL #SEM FILTROS', {
      x: 80,
      y: H - 145,
      size: 16,
      font: fontBold,
      color: bluePrimary,
    });

    page.drawText(
      'Estratégia de Conteúdo Visual:\n\n' +
      '• Fotografias espontâneas de grupo ao pôr do sol em festivais de música e rooftops;\n\n' +
      '• Storytelling focado em quem tem de conduzir à noite ou simplesmente prefere cuidar da saúde;\n\n' +
      '• Parcerias com criadores de conteúdo que valorizam bem-estar, desporto, ar livre e gastronomia;\n\n' +
      '• Balões de diálogo ilustrados dinâmicos e stickers interativos para o Instagram Stories.',
      {
        x: 80,
        y: H - 185,
        size: 12,
        font: fontRegular,
        color: darkText,
        lineHeight: 22,
      }
    );
  }

  // --- PAGE 35: EQUIPA E FICHA TÉCNICA ---
  {
    const page = pdfDoc.addPage([W, H]);
    page.drawRectangle({
      x: 0,
      y: 0,
      width: W,
      height: H,
      color: rgb(0.12, 0.42, 0.68),
    });
    page.drawRectangle({
      x: 0,
      y: 0,
      width: W,
      height: 240,
      color: rgb(0.24, 0.54, 0.22),
    });

    // Top logo
    page.drawText('Gazela', {
      x: 70,
      y: H - 120,
      size: 64,
      font: fontBold,
      color: white,
    });
    page.drawText('MANUAL DE CONSTRUÇÃO DA MARCA', {
      x: 70,
      y: H - 160,
      size: 16,
      font: fontBold,
      color: rgb(0.9, 1, 0.9),
    });

    // Institution
    page.drawText('POLITÉCNICO DE LEIRIA  |  ESCOLA SUPERIOR DE TECNOLOGIA E GESTÃO (ESTG)', {
      x: 70,
      y: H - 210,
      size: 12,
      font: fontBold,
      color: white,
    });
    page.drawText('Licenciatura em Marketing  •  Design e Identidade Visual de Marcas', {
      x: 70,
      y: H - 230,
      size: 11,
      font: fontRegular,
      color: rgb(0.85, 0.92, 0.98),
    });

    // Authors Box
    page.drawRectangle({
      x: W - 400,
      y: 60,
      width: 330,
      height: 180,
      color: rgb(0.08, 0.28, 0.45),
    });

    page.drawText('EQUIPA DO PROJETO:', {
      x: W - 380,
      y: 215,
      size: 12,
      font: fontBold,
      color: rgb(0.7, 0.9, 1),
    });

    const authors = [
      'Ana Margarida Ferreira, nº 2023124615',
      'Bárbara Cadima, nº 2024106914',
      'Jéssica Lopes, nº 2024106228',
      'Lucas Nunes, nº 2023138623',
      'Mariana Duarte, nº 2022143295',
    ];

    authors.forEach((author, i) => {
      const isLucas = author.includes('Lucas Nunes');
      page.drawText(author, {
        x: W - 380,
        y: 185 - i * 23,
        size: 10,
        font: isLucas ? fontBold : fontRegular,
        color: isLucas ? rgb(0.95, 1, 0.6) : white,
      });
    });
  }

  const pdfBytes = await pdfDoc.save();
  const outputPath = path.resolve('public', 'Gazela Manual_compressed.pdf');
  fs.writeFileSync(outputPath, pdfBytes);
  console.log(`Generated Gazela Manual successfully at ${outputPath} (${pdfBytes.length} bytes)`);
}

generateGazelaManual().catch(console.error);
