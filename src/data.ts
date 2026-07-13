import { Project, ExperienceItem, FunnelStage } from './types';

export const funnelStages: Record<'pt' | 'en', FunnelStage[]> = {
  pt: [
    {
      id: 'awareness',
      label: '1. Descoberta & Perfil',
      description: 'Quem é o Lucas? O candidato ideal em números, atitude e visão estratégica de marketing.',
      badge: 'Sobre Mim',
      percentage: 100
    },
    {
      id: 'proof',
      label: '2. Evidência Técnica (Projetos)',
      description: 'Acesso direto aos trabalhos académicos e profissionais estruturados em PDF de alta qualidade.',
      badge: 'Projetos Reais',
      percentage: 50
    }
  ],
  en: [
    {
      id: 'awareness',
      label: '1. Discovery & Profile',
      description: 'Who is Lucas? The ideal candidate in numbers, attitude, and strategic marketing vision.',
      badge: 'About Me',
      percentage: 100
    },
    {
      id: 'proof',
      label: '2. Technical Evidence (Projects)',
      description: 'Direct access to high-quality PDF academic and professional works.',
      badge: 'Real Projects',
      percentage: 50
    }
  ]
};

export const projectsList: Record<'pt' | 'en', Project[]> = {
  pt: [
    {
      id: 'zara-fitting-room',
      category: 'research',
      title: 'Provador Digital da Zara: Estudo de Caso',
      subtitle: 'Análise de marketing relacional, experiencial e privacidade de dados biométricos',
      period: 'Marketing Relacional - ESTG Politécnico de Leiria',
      institution: 'Politécnico de Leiria (ESTG)',
      description: 'Estudo focado no provador digital da Zara, analisando o funcionamento tecnológico, impactos logísticos (redução de devoluções) e ambientais (consumo da IA). Avalia os desafios de privacidade dos dados biométricos e potenciais deepfakes.',
      strategicChallenge: {
        problem: 'Baixa adoção do provador digital e problemas de privacidade na recolha de dados biométricos.',
        insight: 'Inquérito a 36 consumidores revelou falta de comunicação da ferramenta na jornada de compra e fortes preocupações com RGPD.',
        impact: 'Proposta de estratégia de marketing one-to-one focada em transparência para impulsionar a adoção.'
      },
      outcomes: [
        'Realização de um inquérito online sobre "A digitalização da experiência de compra online" com 36 respostas recolhidas.',
        'Identificação de baixa notoriedade da ferramenta entre consumidores devido a falhas de comunicação e integração na jornada.',
        'Recomendações estratégicas de marketing one-to-one e experiencial para adoção segura e de alta notoriedade.'
      ],
      tags: ['Marketing Relacional', 'Marketing Experiencial', 'Privacidade de Dados', 'Estudo de Caso', 'Inquéritos'],
      metricLabel: 'Respostas ao Inquérito',
      metricValue: '36 Respostas',
      pdfUrl: '/Caso de Estudo do Provador Digital da Zara.pdf'
    },
    {
      id: 'vitapen-pitch',
      category: 'branding',
      title: 'Dispositivo de Saúde Portátil: VitaPen',
      subtitle: 'Pitch comercial de um conceito inovador de análises clínicas domésticas com inteligência artificial',
      period: 'Projeto Académico de Marketing - Politécnico de Leiria',
      institution: 'Politécnico de Leiria',
      description: 'Conceito de um dispositivo portátil em formato de caneta com cartuchos descartáveis para exames clínicos rápidos em casa, enviando dados para uma app assistida por Inteligência Artificial.',
      strategicChallenge: {
        problem: 'Dificuldade no acesso rápido e indolor a análises clínicas de rotina sem sair de casa.',
        insight: 'A análise ao comportamento preventivo de saúde apontou para a viabilidade do uso de IA domiciliária na leitura instantânea de dados biométricos.',
        impact: 'Estruturação de um modelo de negócio por subscrição recorrente (cartuchos) e plano Go-To-Market focado no retalho farmacêutico.'
      },
      outcomes: [
        'Desenvolvimento de um questionário de aceitação de mercado com 19 respostas favoráveis.',
        'Validação técnica e médica junto de especialistas de saúde indicando exames iniciais de glicose, colesterol e alergias.',
        'Estruturação de modelo de negócio com venda de caneta a 110€, cartuchos de 1.5€ a 8€ e subscrições VitaCare (15€/30€).',
        'Estratégia de expansão regulamentar via Infarmed, certificação CE/ISO e canais de retalho em farmácias.'
      ],
      tags: ['Pitch de Negócio', 'Marketing de Produto', 'Estudo de Viabilidade', 'Modelo de Subscrição', 'Estratégia Go-To-Market'],
      metricLabel: 'Validação de Mercado',
      metricValue: '19 Resp. Favoráveis',
      pdfUrl: '/PITCH da VitaPen.pdf'
    },
    {
      id: 'folha-skimboard',
      category: 'services',
      title: 'Plano Estratégico: Folha Skimboards',
      subtitle: 'Plano de serviços de marketing e expansão ibérica e internacional de marca nacional',
      period: 'Marketing de Serviços - Politécnico de Leiria',
      institution: 'Politécnico de Leiria (ESTG)',
      description: 'Plano estratégico para a Folha Skimboards focado em consolidar a liderança ibérica e estruturar a expansão internacional para o mercado francês com novas linhas de produtos.',
      strategicChallenge: {
        problem: 'Necessidade de defender a cota ibérica enquanto se estrutura, com segurança, uma expansão internacional num nicho super-específico.',
        insight: 'O cruzamento de dados de matrizes BCG/Ansoff com o contexto competitivo (Porter) revelou oportunidade tática no segmento de Bodyboard em França.',
        impact: 'Definição de metas rigorosas (+30% vendas) e implementação do Balanced Scorecard para monitorização contínua.'
      },
      outcomes: [
        'Aplicação profunda de ferramentas analíticas: STEEPLE, VUCA, BANI, 5 Forças de Porter, Cadeia de Valor, Matrizes BCG e Ansoff.',
        'Definição de objetivos SMART claros: aumentar as vendas em 30% na Península Ibérica e expandir com Bodyboard em França.',
        'Monitorização rigorosa utilizando o Balanced Scorecard (BSC) e Modelo 7S da McKinsey, visando taxa de defeitos inferior a 1%.'
      ],
      tags: ['Plano Estratégico', 'Análise STEEPLE', 'Balanced Scorecard', 'Expansão de Mercado', 'Matriz Ansoff'],
      metricLabel: 'Meta de Vendas Ibérica',
      metricValue: '+30% Crescimento',
      pdfUrl: '/Plano Estratégico de Serviços para a FOLHA Skimboard.pdf'
    },
    {
      id: 'oh-my-snacks-singapore',
      category: 'digital',
      title: 'Plano de Marketing Internacional: Oh! My Snacks',
      subtitle: 'Estratégia de exportação e penetração de mercado saudável em Singapura',
      period: 'Marketing Internacional - Politécnico de Leiria (2024/2025)',
      institution: 'Politécnico de Leiria',
      description: 'Plano estratégico de exportação para a marca portuguesa Oh! My Snacks para Singapura, fundamentando as estratégias de segmentação demográfica, psicográfica e comportamental.',
      strategicChallenge: {
        problem: 'Levar uma marca local de snacks saudáveis para um dos mercados asiáticos mais competitivos e exigentes.',
        insight: 'Análise de dados demográficos indicou alto poder de compra (15.473 SGD médios) num público jovem altamente focado na produtividade urbana.',
        impact: 'Decisão de entrada por exportação direta (e-commerce) combinada com preço Premium Skimming e ativação via influenciadores.'
      },
      outcomes: [
        'Decisão de Entrada por Exportação: Baixo risco financeiro, alta flexibilidade e aproveitamento da excelente infraestrutura digital e logística de Singapura.',
        'Segmentação do Público: Foco em Jovens Profissionais Urbanos de Alto Rendimento (25-40 anos) e Estudantes Universitários da Geração Z (18-25 anos).',
        'Preço Premium via Skimming (Desnatação): Fundamentado no alto poder de compra local (rendimento médio mensal SGD 15.473) e imagem de qualidade exclusiva.',
        'Logística e Distribuição: Canal direto via e-commerce com entrega assegurada em 24-48h e forte publicidade e marketing de influência digital.'
      ],
      tags: ['Marketing Internacional', 'Preço Skimming', 'Singapore GTM', 'Exportação', 'Oh! My Snacks'],
      metricLabel: 'Rendimento Alvo (SGD)',
      metricValue: '15.473 SGD /mês',
      pdfUrl: '/Plano de Marketing Internacional - Oh! My Snacks Singapura.pdf'
    },
    {
      id: 'outfit21-marketing',
      category: 'digital',
      title: 'Plano de Marketing Digital: Outfit21',
      subtitle: 'Renovação de e-commerce de alfaiataria de luxo e automação de funis de e-mail marketing',
      period: 'Marketing Digital - Politécnico de Leiria',
      institution: 'Politécnico de Leiria (ESTG)',
      description: 'Plano estratégico digital para a alfaiataria Outfit21.pt, renovando o seu e-commerce com design sofisticado e implementando funis de conversão automatizados.',
      strategicChallenge: {
        problem: 'Um e-commerce de luxo com taxas de conversão sub-otimizadas e sem retenção ativa de leads.',
        insight: 'Dados de pesquisa orgânica e análise de jornadas de compra ditaram a urgência em automatizar o follow-up para reduzir o abandono de carrinho.',
        impact: 'Implementação de fluxos de automação (E-goi/Brevo) focados em resposta imediata, alocando estrategicamente o budget anual (6.600€).'
      },
      outcomes: [
        'Criação de novos fluxos de automação e e-mail marketing (Brevo/E-goi) com oferta de 5% de desconto após 3 horas de registo.',
        'Planeamento de conteúdos orgânicos e pagos (Google Ads, LinkedIn e Instagram Ads) segmentados por género (16F / 10M).',
        'Definição de objetivos de SEO on-page focados em palavras-chave como "criar uma marca de roupa em 2026" no site renovado na Base44.',
        'Orçamento anual detalhado de 6.600€ focado em canais de alto retorno de leads.'
      ],
      tags: ['E-commerce', 'Automação de Leads', 'Brevo Emailing', 'SEO On-Page', 'Google Ads'],
      metricLabel: 'Orçamento Planeado',
      metricValue: '6.600 € Anual',
      pdfUrl: '/Plano de Marketing Digital - Outfit21.pdf'
    },
    {
      id: 'campoaves-bioplus',
      category: 'analysis',
      title: 'Reposicionamento de Marca: Campoaves Bio+',
      subtitle: 'Gestão de marca e ativações estratégicas para a gama de frango biológico',
      period: 'Gestão de Marcas - Politécnico de Leiria',
      institution: 'Politécnico de Leiria (ESTG)',
      description: 'Projeto de reposicionamento focado em destacar a gama "Campoaves Bio+" ("Do Campo, em modo bio+") no linear através de embalagens sustentáveis, ativações de rádio/TV e co-branding estratégico.',
      strategicChallenge: {
        problem: 'Falta de diferenciação visual da linha biológica nos lineares dos supermercados, prejudicando o valor percebido.',
        insight: 'Os consumidores bio baseiam a sua decisão não só no selo, mas na sustentabilidade 360º (packaging e impacto social).',
        impact: 'Redesign da embalagem com bioplástico e proposta de co-branding solidário (Banco Alimentar), transformando a compra numa decisão ética.'
      },
      outcomes: [
        'Desenho de embalagem sustentável com base em cana de açúcar, tampa em PLA (bioplástico vegetal) e destaque de selos biológicos.',
        'Proposta de co-branding inovador com marcas como Banco Alimentar (doação de 5%), A Saloinha, Origens Bio e Paladin.',
        'Grelha editorial e calendário de conteúdos (educar, inspirar, entreter) alinhados com patrocínios de rádio/TV (Tia Cátia, Goucha).'
      ],
      tags: ['Gestão de Marcas', 'Co-Branding', 'Embalagem Ecológica', 'Calendário Editorial', 'Product Placement'],
      metricLabel: 'Proposta de Doação Co-Brand',
      metricValue: '5% dos Lucros',
      pdfUrl: '/Rebranding para a Campoaves Bio_compressed.pdf'
    },
    {
      id: 'timberland-upcycling',
      category: 'branding',
      title: 'Projeto de Upcycling: Timberland TimberNest',
      subtitle: 'Design e marketing de novos produtos a partir de caixas de calçado abandonadas',
      period: 'Design e Marketing de Novos Produtos - Politécnico de Leiria',
      institution: 'Politécnico de Leiria',
      description: 'Solução sustentável de economia circular transformando caixas de cartão Timberland em casas de pássaros ("TimberNest"), alinhando a marca com os ODS 12 e ODS 15.',
      strategicChallenge: {
        problem: 'O desperdício imediato das caixas de sapatos pós-compra e a perda do vínculo da marca em casa.',
        insight: 'Alinhar o DNA "Outdoor" da Timberland com uma ativação de economia circular de zero atrito para o consumidor.',
        impact: 'Criação do kit DIY TimberNest, convertendo o packaging numa experiência partilhável (UGC) de alto impacto orgânico e ambiental.'
      },
      outcomes: [
        'Criação de um passo a passo prático reutilizando cordel, rolos de papel higiénico/cozinha e recipientes de iogurte para sementes/água.',
        'Delineamento de campanha de comunicação nas redes sociais: "Um pequeno gesto. Um grande impacto."',
        'Alinhamento da identidade visual robusta da Timberland com práticas concretas que reduzem o desperdício doméstico a custo zero.'
      ],
      tags: ['Economia Circular', 'ODS Sustentáveis', 'Upcycling', 'Design de Produto', 'Ativação de Marca'],
      metricLabel: 'Alinhamento ODS ONU',
      metricValue: 'ODS 12 & ODS 15',
      pdfUrl: '/Projeto de Upcycling - Timberland TimberNest.pdf'
    }
  ],
  en: [
    {
      id: 'zara-fitting-room',
      category: 'research',
      title: 'Zara Digital Fitting Room: Case Study',
      subtitle: 'Relationship & experiential marketing analysis and biometric data privacy',
      period: 'Relationship Marketing - ESTG Politécnico de Leiria',
      institution: 'Politécnico de Leiria (ESTG)',
      description: 'Study focused on Zara\'s digital fitting room, analyzing technical operations, logistical impacts (reduction in returns), and environmental impact (AI power consumption). Evaluates biometric data privacy challenges and potential deepfakes.',
      strategicChallenge: {
        problem: 'Low adoption of the digital fitting room and privacy issues regarding biometric data collection.',
        insight: 'A survey of 36 consumers revealed a lack of communication about the tool in the shopping journey and strong GDPR concerns.',
        impact: 'Proposed a one-to-one marketing strategy focused on transparency to boost adoption.'
      },
      outcomes: [
        'Conducted an online survey on "The digitalization of the online shopping experience" with 36 responses collected.',
        'Identified low awareness of the tool among consumers due to communication failures and integration gaps in the journey.',
        'Formulated strategic recommendations for one-to-one and experiential marketing to drive safe and high-awareness adoption.'
      ],
      tags: ['Relationship Marketing', 'Experiential Marketing', 'Data Privacy', 'Case Study', 'Surveys'],
      metricLabel: 'Survey Responses',
      metricValue: '36 Responses',
      pdfUrl: '/Caso de Estudo do Provador Digital da Zara.pdf'
    },
    {
      id: 'vitapen-pitch',
      category: 'branding',
      title: 'Portable Health Device: VitaPen',
      subtitle: 'Commercial pitch of an innovative concept for home clinical analysis with artificial intelligence',
      period: 'Academic Marketing Project - Politécnico de Leiria',
      institution: 'Politécnico de Leiria',
      description: 'Concept of a pen-shaped portable device with disposable cartridges for rapid home clinical testing, sending data to an AI-assisted application.',
      strategicChallenge: {
        problem: 'Difficulty in quickly and painlessly accessing routine clinical tests from home.',
        insight: 'Analysis of preventive health behavior pointed to the viability of home AI for instant reading of biometric data.',
        impact: 'Structured a recurring subscription business model (cartridges) and a Go-To-Market plan focused on retail pharmacies.'
      },
      outcomes: [
        'Developed a market acceptance questionnaire collecting 19 favorable responses.',
        'Conducted technical and medical validation with healthcare specialists, pointing to initial glucose, cholesterol, and allergy tests.',
        'Structured a business model featuring the pen at €110, cartridges from €1.50 to €8, and VitaCare subscriptions (€15/€30).',
        'Designed a regulatory expansion strategy via Infarmed, CE/ISO certification, and retail pharmacy distribution channels.'
      ],
      tags: ['Business Pitch', 'Product Marketing', 'Feasibility Study', 'Subscription Model', 'Go-To-Market Strategy'],
      metricLabel: 'Market Validation',
      metricValue: '19 Favorable Resp.',
      pdfUrl: '/PITCH da VitaPen.pdf'
    },
    {
      id: 'folha-skimboard',
      category: 'services',
      title: 'Strategic Plan: Folha Skimboards',
      subtitle: 'Marketing services and Iberian/international expansion plan for a national brand',
      period: 'Services Marketing - Politécnico de Leiria',
      institution: 'Politécnico de Leiria (ESTG)',
      description: 'Strategic plan for Folha Skimboards focused on consolidating Iberian market leadership and structuring international expansion into the French market with new product lines.',
      strategicChallenge: {
        problem: 'Need to defend Iberian market share while safely structuring international expansion in a highly specific niche.',
        insight: 'Crossing BCG/Ansoff matrix data with competitive context (Porter) revealed a tactical opportunity in the Bodyboard segment in France.',
        impact: 'Defined strict targets (+30% sales) and implemented the Balanced Scorecard for continuous monitoring.'
      },
      outcomes: [
        'Deep application of analytical frameworks: STEEPLE, VUCA, BANI, Porter\'s 5 Forces, Value Chain, and BCG & Ansoff matrices.',
        'Definition of clear SMART objectives: increase sales by 30% in the Iberian Peninsula and expand with Bodyboard in France.',
        'Rigorous monitoring using the Balanced Scorecard (BSC) and McKinsey 7S Framework, targeting a defect rate under 1%.'
      ],
      tags: ['Strategic Plan', 'STEEPLE Analysis', 'Balanced Scorecard', 'Market Expansion', 'Ansoff Matrix'],
      metricLabel: 'Iberian Sales Goal',
      metricValue: '+30% Growth',
      pdfUrl: '/Plano Estratégico de Serviços para a FOLHA Skimboard.pdf'
    },
    {
      id: 'oh-my-snacks-singapore',
      category: 'digital',
      title: 'International Marketing Plan: Oh! My Snacks',
      subtitle: 'Export strategy and healthy snack market penetration in Singapore',
      period: 'International Marketing - Politécnico de Leiria (2024/2025)',
      institution: 'Politécnico de Leiria',
      description: 'Strategic export plan for the Portuguese brand Oh! My Snacks to Singapore, establishing demographic, psychographic, and behavioral segmentation strategies.',
      strategicChallenge: {
        problem: 'Taking a local healthy snack brand to one of the most competitive and demanding Asian markets.',
        insight: 'Demographic data analysis indicated high purchasing power (average 15,473 SGD) in a young audience highly focused on urban productivity.',
        impact: 'Decision to enter via direct export (e-commerce) combined with Premium Skimming pricing and influencer activation.'
      },
      outcomes: [
        'Export-Based Entry Decision: Low financial risk, high flexibility, and leveraging Singapore\'s excellent digital and logistical infrastructure.',
        'Target Segmentation: Focus on high-income young urban professionals (25-40 years) and Gen Z university students (18-25 years).',
        'Premium Skimming Price Strategy: Justified by high local purchasing power (average monthly household income of SGD 15,473) and exclusive quality image.',
        'Logistics and Distribution: Direct-to-consumer e-commerce channel with 24-48h delivery and robust digital influence marketing.'
      ],
      tags: ['International Marketing', 'Skimming Pricing', 'Singapore GTM', 'Exportation', 'Oh! My Snacks'],
      metricLabel: 'Target Income (SGD)',
      metricValue: '15,473 SGD /month',
      pdfUrl: '/Plano de Marketing Internacional - Oh! My Snacks Singapura.pdf'
    },
    {
      id: 'outfit21-marketing',
      category: 'digital',
      title: 'Digital Marketing Plan: Outfit21',
      subtitle: 'E-commerce revamp for luxury tailoring and email marketing funnel automation',
      period: 'Digital Marketing - Politécnico de Leiria',
      institution: 'Politécnico de Leiria (ESTG)',
      description: 'Digital strategic plan for Outfit21.pt luxury tailoring, modernizing its e-commerce platform and deploying automated conversion funnels.',
      strategicChallenge: {
        problem: 'A luxury e-commerce with sub-optimized conversion rates and no active lead retention.',
        insight: 'Organic search data and shopping journey analysis dictated the urgency to automate follow-ups to reduce cart abandonment.',
        impact: 'Implementation of automation workflows (E-goi/Brevo) focused on immediate response, strategically allocating the annual budget (€6,600).'
      },
      outcomes: [
        'Designed automated email marketing workflows (Brevo/E-goi) offering a 5% discount 3 hours post-registration.',
        'Planned organic and paid content strategies (Google Ads, LinkedIn, and Instagram Ads) segmented by gender (16F / 10M).',
        'Set on-page SEO targets targeting keywords like "criar uma marca de roupa em 2026" on the newly rebuilt Base44 site.',
        'Detailed a €6,600 annual budget optimized for high-return lead generation channels.'
      ],
      tags: ['E-commerce', 'Lead Automation', 'Brevo Emailing', 'On-Page SEO', 'Google Ads'],
      metricLabel: 'Planned Budget',
      metricValue: '€6,600 Annual',
      pdfUrl: '/Plano de Marketing Digital - Outfit21.pdf'
    },
    {
      id: 'campoaves-bioplus',
      category: 'analysis',
      title: 'Brand Repositioning: Campoaves Bio+',
      subtitle: 'Brand management and strategic activations for the organic chicken range',
      period: 'Brand Management - Politécnico de Leiria',
      institution: 'Politécnico de Leiria (ESTG)',
      description: 'Repositioning project focused on making the "Campoaves Bio+" range ("From the Field, in bio mode") stand out on shelves through sustainable packaging, radio/TV activations, and strategic co-branding.',
      strategicChallenge: {
        problem: 'Lack of visual differentiation of the organic line on supermarket shelves, hurting perceived value.',
        insight: 'Organic consumers base their decisions not just on the seal, but on 360º sustainability (packaging and social impact).',
        impact: 'Redesigned the packaging with bioplastic and proposed solidarity co-branding (Food Bank), turning the purchase into an ethical decision.'
      },
      outcomes: [
        'Designed sustainable packaging using sugarcane pulp, a PLA (plant-based bioplastic) lid, and highly visible organic certification seals.',
        'Proposed innovative co-branding partnerships with brands like Banco Alimentar (5% profit donation), A Saloinha, Origens Bio, and Paladin.',
        'Mapped a complete editorial calendar (educate, inspire, entertain) aligned with radio/TV sponsorships (Tia Cátia, Goucha).'
      ],
      tags: ['Brand Management', 'Co-Branding', 'Eco-Packaging', 'Editorial Calendar', 'Product Placement'],
      metricLabel: 'Proposed Co-Brand Donation',
      metricValue: '5% of Profits',
      pdfUrl: '/Rebranding para a Campoaves Bio_compressed.pdf'
    },
    {
      id: 'timberland-upcycling',
      category: 'branding',
      title: 'Upcycling Project: Timberland TimberNest',
      subtitle: 'Product design and marketing of new products from discarded shoeboxes',
      period: 'Design & Marketing of New Products - Politécnico de Leiria',
      institution: 'Politécnico de Leiria',
      description: 'Sustainable circular economy solution transforming cardboard Timberland boxes into birdhouses ("TimberNest"), aligning the brand with UN SDGs 12 and 15.',
      strategicChallenge: {
        problem: 'The immediate waste of post-purchase shoe boxes and the loss of the brand bond at home.',
        insight: 'Align Timberland\'s "Outdoor" DNA with a zero-friction circular economy activation for the consumer.',
        impact: 'Creation of the DIY TimberNest kit, converting packaging into a shareable experience (UGC) with high organic and environmental impact.'
      },
      outcomes: [
        'Created a practical step-by-step DIY guide reusing twine, cardboard tubes, and empty yogurt containers for seeds/water.',
        'Designed a social media communication campaign: "A small gesture. A big impact."',
        'Aligned Timberland\'s robust visual identity with concrete, zero-cost domestic waste reduction practices.'
      ],
      tags: ['Circular Economy', 'Sustainable SDGs', 'Upcycling', 'Product Design', 'Brand Activation'],
      metricLabel: 'UN SDG Alignment',
      metricValue: 'SDG 12 & SDG 15',
      pdfUrl: '/Projeto de Upcycling - Timberland TimberNest.pdf'
    }
  ]
};

export const experienceList: Record<'pt' | 'en', ExperienceItem[]> = {
  pt: [
    {
      id: 'atemphar-board',
      role: 'Presidente da Direção da Atemphar',
      company: 'Atemphar - AJPH (Associação Juvenil Potencial Humano)',
      period: '2025 - Presente',
      description: [
        'Liderança executiva máxima da associação juvenil regional, garantindo o planeamento anual de atividades e expansão local.',
        'Supervisão e design editorial da Atemphar Magazine, elaborando a sua grelha de paginação, tipografia e arranjo de espaço negativo.',
        'Gestão ativa de equipas de voluntariado e coordenação estratégica de toda a comunicação digital e relações públicas.',
        'Coordenação das redes sociais corporativas da associação, produzindo reels dinâmicos e cartazes promocionais.'
      ],
      tools: ['Liderança Associativa', 'Design Editorial', 'Edição de Vídeo (Premiere/CapCut)', 'Gestão de Redes Sociais'],
      category: 'Liderança & Voluntariado',
      deliverables: [
        { title: 'Paginação Revista Atemphar', description: 'Layout editorial moderno, equilibrando imagens expressivas e colunas de texto.', previewType: 'magazine' },
        { title: 'Reels Promocionais', description: 'Trailers e pequenos clips dinâmicos com alto engagement local.', previewType: 'photo' }
      ]
    },
    {
      id: 'startup-leiria-internship',
      role: 'Estagiário de Comunicação & Marketing de Inovação',
      company: 'Startup Leiria',
      period: '2026',
      description: [
        'Promoção e dinamização de eventos do ecossistema de empreendedorismo e incubação de startups da região de Leiria.',
        'Criação de pitches de vendas, apresentações institucionais e press-releases para meios de comunicação locais e nacionais.',
        'Colaboração direta com empreendedores na definição de estratégias de posicionamento de mercado e atração de investimento inicial.'
      ],
      tools: ['Branding de Inovação', 'Relações Públicas', 'Design de Apresentações', 'Estratégia de Pitch'],
      category: 'Estágios Práticos',
      deliverables: [
        { title: 'Pitch-Deck de Sucesso', description: 'Estruturação de storytelling visual para investidores.', previewType: 'magazine' }
      ]
    },
    {
      id: 'aapi-internship',
      role: 'Estagiário de Marketing & Internacionalização',
      company: 'AAPI - Associação Ação Para a Internacionalização',
      period: '2023',
      description: [
        'Apoio no planeamento de campanhas digitais e marketing B2B focado na atração de PMEs para processos de internacionalização.',
        'Pesquisa de mercado internacional e segmentação setorial para apoio a missões empresariais de exportação portuguesas.',
        'Gestão e atualização do website corporativo e automação de e-mail marketing para envio de newsletters de incentivos europeus.'
      ],
      tools: ['Gestão de Leads', 'Pesquisa de Mercado', 'WordPress', 'E-mail Marketing (Brevo)'],
      category: 'Estágios Práticos',
      deliverables: [
        { title: 'Pesquisa de Exportação', description: 'Análise de dados de atratividade e barreiras comerciais.', previewType: 'analytics' }
      ]
    },
    {
      id: 'atemphar-internship',
      role: 'Estagiário de Marketing & Comunicação',
      company: 'Atemphar - AJPH (Associação Juvenil Potencial Humano)',
      period: '2023',
      description: [
        'Planeamento e criação de campanhas de ativação de marca e comunicação interna para iniciativas juvenis.',
        'Criação de conteúdos dinâmicos para redes sociais (Instagram, TikTok e LinkedIn) aumentando a visibilidade e retenção.',
        'Apoio no desenvolvimento editorial e na paginação de edições especiais da revista associativa Atemphar Magazine.'
      ],
      tools: ['Canva', 'Adobe Premiere', 'Copywriting', 'Instagram Ads'],
      category: 'Estágios Práticos',
      deliverables: [
        { title: 'Plano de Ativação', description: 'Campanhas de envolvimento jovem de impacto local.', previewType: 'leads' }
      ]
    },
    {
      id: 'ipleiria-studies',
      role: 'Estudante de Licenciatura em Marketing',
      company: 'Escola Superior de Tecnologia e Gestão (ESTG) - Politécnico de Leiria',
      period: '2023 - 2026 (Finalista)',
      description: [
        'Formação teórica e prática abrangente em marketing estratégico, internacional, digital e comportamento do consumidor.',
        'Desenvolvimento de estudos de caso exaustivos e projetos multidisciplinares com empresas reais (Oh! My Snacks, Zara, Timberland, Campoaves, Folha Skimboards, Outfit21).',
        'Domínio de modelação e análise estatística quantitativa de inquéritos de mercado usando a ferramenta SPSS.',
        'Larga experiência na apresentação estruturada de propostas de produtos, planos de comunicação e pitches comerciais.'
      ],
      tools: ['Modelação SPSS', 'Estatística Descritiva', 'Diagnóstico Estratégico (STEEPLE/Porter)', 'Marketing Digital & de Serviços'],
      category: 'Formação Académica',
      deliverables: [
        { title: 'Base de Dados de Inquéritos', description: 'Inquéritos reais com tratamentos de correlação demográfica.', previewType: 'analytics' },
        { title: 'Apresentações & Defesas de Planos', description: 'Pitches de novos conceitos de serviços e branding empresarial.', previewType: 'magazine' }
      ]
    }
  ],
  en: [
    {
      id: 'atemphar-board',
      role: 'President of the Board of Atemphar',
      company: 'Atemphar - AJPH (Human Potential Youth Association)',
      period: '2025 - Present',
      description: [
        'Highest executive leadership of the regional youth association, securing annual activity planning and regional growth.',
        'Supervised editorial design of Atemphar Magazine, designing layouts, typography, and negative space arrangements.',
        'Active management of volunteer teams and strategic coordination of all digital communication and public relations.',
        'Coordinated the association\'s official social media accounts, producing dynamic video reels and promotional flyers.'
      ],
      tools: ['Association Leadership', 'Editorial Design', 'Video Editing (Premiere/CapCut)', 'Social Media Management'],
      category: 'Leadership & Volunteering',
      deliverables: [
        { title: 'Atemphar Magazine Layout', description: 'Modern editorial layout balancing expressive visuals and clean text columns.', previewType: 'magazine' },
        { title: 'Promotional Reels', description: 'Dynamic video trailers and shorts with high local engagement.', previewType: 'photo' }
      ]
    },
    {
      id: 'startup-leiria-internship',
      role: 'Innovation Marketing & Communication Intern',
      company: 'Startup Leiria',
      period: '2026',
      description: [
        'Promoted and energized events in the entrepreneurship and startup incubation ecosystem of the Leiria region.',
        'Created sales pitches, institutional presentations, and press releases for local and national media outlets.',
        'Collaborated directly with founders on market positioning strategies and early-stage investment attraction.'
      ],
      tools: ['Innovation Branding', 'Public Relations', 'Presentation Design', 'Pitch Strategy'],
      category: 'Practical Internships',
      deliverables: [
        { title: 'Successful Pitch-Deck', description: 'Visual storytelling structure for investors.', previewType: 'magazine' }
      ]
    },
    {
      id: 'aapi-internship',
      role: 'Marketing & Internationalization Intern',
      company: 'AAPI - Associação Ação Para a Internacionalização',
      period: '2023',
      description: [
        'Supported the planning of digital campaigns and B2B marketing focused on attracting SMEs to internationalization processes.',
        'International market research and sector segmentation to support Portuguese export business missions.',
        'Managed and updated the corporate website and automated email marketing for European funding newsletters.'
      ],
      tools: ['Lead Management', 'Market Research', 'WordPress', 'Email Marketing (Brevo)'],
      category: 'Practical Internships',
      deliverables: [
        { title: 'Export Research', description: 'Commercial barrier and market attractiveness analysis.', previewType: 'analytics' }
      ]
    },
    {
      id: 'atemphar-internship',
      role: 'Marketing & Communication Intern',
      company: 'Atemphar - AJPH (Human Potential Youth Association)',
      period: '2023',
      description: [
        'Planning and creation of brand activation and internal communication campaigns for youth initiatives.',
        'Creation of dynamic content for social media (Instagram, TikTok, LinkedIn) to increase visibility and retention.',
        'Assisted in editorial development and layout design for special editions of Atemphar Magazine.'
      ],
      tools: ['Canva', 'Adobe Premiere', 'Copywriting', 'Instagram Ads'],
      category: 'Practical Internships',
      deliverables: [
        { title: 'Activation Plan', description: 'Local youth engagement campaign design.', previewType: 'leads' }
      ]
    },
    {
      id: 'ipleiria-studies',
      role: 'Marketing Undergraduate Student',
      company: 'School of Technology and Management (ESTG) - Politécnico de Leiria',
      period: '2023 - 2026 (Finalist)',
      description: [
        'Comprehensive theoretical and practical training in strategic, international, and digital marketing, and consumer behavior.',
        'Developed exhaustive case studies and multidisciplinary projects featuring real companies (Oh! My Snacks, Zara, Timberland, Campoaves, Folha Skimboards, Outfit21).',
        'Mastery of quantitative statistical modeling and market survey analysis using SPSS.',
        'Extensive experience in the structured presentation of product proposals, communication plans, and commercial pitches.'
      ],
      tools: ['SPSS Modeling', 'Descriptive Statistics', 'Strategic Diagnostics (STEEPLE/Porter)', 'Digital & Services Marketing'],
      category: 'Academic Training',
      deliverables: [
        { title: 'Survey Database', description: 'Real market survey data with demographic correlation analysis.', previewType: 'analytics' },
        { title: 'Plan Presentations & Defenses', description: 'Pitches for brand repositioning and innovative service concepts.', previewType: 'magazine' }
      ]
    }
  ]
};

export const persuasiveRecruiterArguments: Record<'pt' | 'en', any[]> = {
  pt: [
    {
      title: 'Competência Prática e Académica',
      description: 'Com apenas 20 anos, o Lucas já é Presidente da Direção da Atemphar e desenhou sete planos estratégicos detalhados para marcas nacionais e globais.',
      icon: 'Sparkles',
      metric: '7 Planos Reais',
      detail: 'De experiência académica e associativa documentada.'
    },
    {
      title: 'Domínio de Dados e Metodologias',
      description: 'Domina ferramentas avançadas de diagnóstico e modelação estatística (SPSS, inquéritos de mercado) aplicadas a estudos de relevância económica.',
      icon: 'BarChart3',
      metric: 'Foco em Métricas',
      detail: 'SPSS, STEEPLE, Porter e Balanced Scorecard aplicados.'
    },
    {
      title: 'Visão Sustentável e Inovadora',
      description: 'Capacidade comprovada de pensar fora da caixa, como demonstrado na transformação de caixas Timberland em casas de pássaros aplicando economia circular.',
      icon: 'Layers',
      metric: 'Economia Circular',
      detail: 'Alinhamento prático com ODS 12 e ODS 15.'
    },
    {
      title: 'Liderança e Autonomia',
      description: 'Como Presidente da Direção da Atemphar, sabe gerir equipas, negociar parcerias e coordenar toda a comunicação digital e editorial de publicações.',
      icon: 'Users',
      metric: 'Líder Associativo',
      detail: 'Presidente da Direção com experiência no terreno.'
    }
  ],
  en: [
    {
      title: 'Practical & Academic Competence',
      description: 'At just 20 years old, Lucas is already President of the Board of Atemphar and has designed seven detailed strategic plans for national and global brands.',
      icon: 'Sparkles',
      metric: '7 Real Plans',
      detail: 'Documented academic and associative experience.'
    },
    {
      title: 'Data & Methodology Mastery',
      description: 'Mastery of advanced diagnostic and statistical modeling tools (SPSS, market surveys) applied to studies of economic relevance.',
      icon: 'BarChart3',
      metric: 'Focus on Metrics',
      detail: 'SPSS, STEEPLE, Porter, and Balanced Scorecard applied.'
    },
    {
      title: 'Sustainable & Innovative Vision',
      description: 'Proven ability to think outside the box, as demonstrated by transforming Timberland shoeboxes into birdhouses using circular economy principles.',
      icon: 'Layers',
      metric: 'Circular Economy',
      detail: 'Practical alignment with SDGs 12 and 15.'
    },
    {
      title: 'Leadership & Autonomy',
      description: 'As President of Atemphar, knows how to manage teams, negotiate partnerships, and coordinate digital/editorial communications.',
      icon: 'Users',
      metric: 'Association Leader',
      detail: 'President of the Board with real field experience.'
    }
  ]
};
