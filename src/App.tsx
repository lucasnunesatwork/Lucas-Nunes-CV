import React, { useState, useEffect } from 'react';
import { 
  GraduationCap, 
  Mail, 
  Phone, 
  Instagram, 
  Linkedin, 
  Award, 
  BookOpen, 
  Sparkles, 
  TrendingUp, 
  BarChart3, 
  Users, 
  CheckCircle2, 
  ArrowUpRight, 
  Download, 
  Briefcase, 
  FileText, 
  Clock, 
  Coffee,
  ChevronDown,
  ChevronUp,
  MapPin,
  ExternalLink,
  Target,
  FileCheck
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

// Modular imports
import { Project, ExperienceItem } from './types';
import { projectsList, experienceList, persuasiveRecruiterArguments } from './data';

const translations = {
  pt: {
    cvInteractive: 'CV INTERATIVO',
    academicStatus: 'Marketing Finalista @ Politécnico de Leiria (ESTG)',
    availableBadge: 'À procura de emprego • Leiria / Lisboa',
    heroTitle: 'Não é apenas um CV. É uma demonstração de Estratégia.',
    heroDescription1: 'Olá! Sou o Lucas Nunes, estudante finalista da Licenciatura em Marketing no Politécnico de Leiria (ESTG) e futuro mestrando em Data-driven Marketing (com especialização em Customer Experience) a partir de setembro de 2026.',
    heroDescription2: 'O que verdadeiramente me apaixona é estudar dados e ligá-los às reais intenções de quem consome. Gosto imenso de branding e marketing digital — compreender como uma marca pode ser empática, memorável e adaptar-se com agilidade às tendências de mercado. Acredito que a versatilidade e a adaptabilidade são os dois valores cruciais para o profissional de amanhã (especialmente perante a evolução acelerada da IA).',
    heroDescription3: 'Até agora, colaborei em 3 associações juvenis e empresariais distintas (AJPH - Atemphar, Startup Leiria e AAPI) e estive em contacto com clientes de 4 setores diferentes (desde a saúde e desporto à inovação e internacionalização). Tudo isto com muito dinamismo, rigor estatístico e uma abordagem focada em resultados práticos e mensuráveis!',
    heroQuote: '"Este espaço reúne sete projetos originais que desenvolvi e defendi. Cada relatório de projeto abaixo resume com absoluta fidelidade a metodologia aplicada, os dados reais recolhidos e as conclusões aprovadas."',
    keyFacts: 'Métricas de Impacto',
    academicInstitution: 'Instituição de Ensino',
    academicCourse: 'Curso Académico',
    associativeActivity: 'Atividade Associativa',
    associativeRole: 'Presidente da Direção @ Atemphar',
    evidenceProjects: 'Projetos de Evidência',
    genuineProjectsCount: '7 Projetos Genuínos',
    sessionMonitor: 'Monitor de Sessão',
    sessionStarted: 'Sessão iniciada há',
    projectsHeading: 'Evidência Técnica Académica',
    projectsTitle: 'Grelha de Projetos e Relatórios',
    projectsDescription: 'Estes são os sete projetos genuínos elaborados pelo Lucas. Três deles estão integrados e disponíveis para visualização e descarregamento imediato em formato PDF real (alojados diretamente no servidor).',
    filterLabel: 'Filtros Rápidos:',
    all: 'Todos',
    branding: 'Branding & Produto',
    digital: 'Marketing Digital',
    services: 'Gestão & Serviços',
    research: 'Estudo de Caso / Pesquisa',
    analysis: 'Análise de Marcas',
    pdfIntegrated: 'PDF Integrado',
    academicWork: 'Trabalho Académico',
    associativeProject: 'Projeto Associativo / Ativação',
    hideDetails: 'OCULTAR DETALHES FACTUAIS',
    viewSummary: 'VER SUMÁRIO EXECUTIVO',
    synopsis: 'Sinopse do Trabalho',
    keyOutcomes: 'Principais Entregáveis & Conclusões',
    openPdf: 'Abrir PDF Real',
    downloadPdf: 'Descarregar PDF',
    viewFullProject: 'Ver Projeto Completo',
    trajectoryHeading: 'Trajetória Real',
    trajectoryTitle: 'Formação Académica & Atividade Associativa',
    trajectoryDescription: 'Estrutura simples e transparente sobre os estudos formais do Lucas Nunes no Politécnico de Leiria e a sua experiência ativa em liderança de comunicação voluntária.',
    trajectoryDetail: 'Detalhe Factual de Trajetória',
    skillsTools: 'Capacidades e Ferramentas Práticas',
    recruiterDilemmaHeading: 'O Dilema do Recrutador & Índice de Sintonia Tática',
    recruiterDilemmaDesc: 'O mercado exige recém-licenciados com 10 anos de experiência prática e proficiência em ferramentas seniores. Vamos simular de forma divertida o seu Índice de Sintonia Tática com o Lucas Nunes, com base nos seus parâmetros de vaga e nos benefícios que oferece!',
    yearsRequiredLabel: 'Anos de Experiência Exigidos para a vaga:',
    yearsExpSingular: 'ano',
    yearsExpPlural: 'anos',
    bestPerkLabel: 'Melhor benefício em destaque no vosso escritório:',
    pingpong: 'Mesa de Ping-Pong',
    snacksHealthy: 'Snacks Saudáveis',
    hybridWork: 'Trabalho Híbrido',
    isPaidLabel: 'A sua empresa oferece estágio remunerado?',
    yesOfCourse: 'Sim, remuneramos',
    noPrestige: 'Não, por prestígio',
    analyzeAlignment: 'Analisar a minha sintonia',
    myPerspective: 'A minha perspetiva sincera',
    expDilemma: '1. Dilema da Experiência',
    perfectMatch: '✓ Sintonia excelente! Se procura alguém dinâmico, motivado e focado em aprender, estou pronto para arregaçar as mangas. No meu percurso académico e associativo já lidei com 7 projetos complexos — estou mais do que preparado para integrar a vossa equipa.',
    reasonableFair: '✓ Parece-me muito justo. Com a minha experiência como Presidente da Atemphar e o desenvolvimento destes 7 planos de marketing, trago a autonomia e a proatividade de que necessita para um cargo júnior.',
    paradoxDetected: '⚠️ Temos aqui um pequeno paradoxo: Tenho apenas 20 anos. Para cumprir o vosso requisito de {yearsRequired} anos de experiência, teria de ter começado a elaborar planos estratégicos aos {calcAge} anos de idade! No entanto, se espreitar o meu projeto para a Timberland ou para a Folha Skimboards, verá que a minha dedicação e rigor gráfico estão ao nível de um profissional sénior.',
    envMotivation: '2. Ambiente & Motivação',
    pingpongDesc: '🏓 Mesa de Ping-Pong: Adoro jogar, mas com o ritmo das vossas campanhas duvido que tenhamos muito tempo livre! Ainda assim, fica espetacular nas fotos de employer branding no vosso Instagram.',
    snacksDesc: '🥑 Snacks Saudáveis: Excelente escolha! Como estudei a fundo a Oh! My Snacks no meu projeto de internacionalização para Singapura, sei muito bem como uma alimentação equilibrada previne o cansaço quando estamos a tratar dados complexos no SPSS.',
    hybridDesc: '💻 Trabalho Híbrido & Flexibilidade: Para mim, esta é a chave para a alta performance. Menos reuniões redundantes de uma hora e muito mais foco em entregas rigorosas e criativas.',
    humanFeasibility: '3. Análise de Viabilidade Humana',
    ethicalViable: '✓ Valorização mútua: Fico imensamente grato pelo vosso profissionalismo. Acredito que valorizar o trabalho de quem está a começar é a melhor forma de construir uma parceria forte e com motivação a 100%.',
    prestigeOpinion: '💡 Uma reflexão honesta: O prestígio é excelente para o currículo, mas as propinas da faculdade não se pagam sozinhas! Acredito no valor do meu trabalho e gostava imenso de contar com a vossa valorização mútua.',
    tacticalIndex: 'Índice de Sintonia Tática:',
    compatibility: 'Compatibilidade:',
    verdict: 'Veredito:',
    verdictExcel: 'Sintonia Excelente! (Equipa de Alta Performance) 🚀',
    verdictBalanced: 'Sintonia Equilibrada. Prontos para alinhar objetivos!',
    verdictParadox: 'Alerta de Paradoxos. Alinhamento estratégico recomendado ⚠️',
    footerCourse: 'Politécnico de Leiria (ESTG) • Proibido o uso de jargão e mock-ups sem nexo profissional.',
    hoursSpentText: 's',
    minsAndSecsText: 'm e',
    secText: 's',
    ctaHeading: 'Pronto para dar vida à sua estratégia? Vamos conversar.',
    ctaSub: 'Estou disponível para novas oportunidades profissionais, estágios de excelência ou projetos onde possa aplicar rigor analítico, empatia de marca e foco em resultados práticos.',
    ctaPrimaryButton: 'Solicite o meu CV detalhado em PDF',
    ctaSecondaryButton: 'Ligar por Telefone',
    strategicChallengeTitle: 'O Desafio Estratégico',
    strategicProblem: '» Qual era o problema?',
    strategicInsight: '» Que dados ou insight usaste para resolver?',
    strategicImpact: '» Qual foi o impacto?',
    manifestoTitle: 'O Meu Manifesto',
    manifestoDescription: 'Sou o Lucas. Acredito que o marketing sem empatia é apenas ruído, e dados sem interpretação são apenas números. A minha abordagem foca-se em unir a precisão estatística com a criatividade humana, garantindo que cada marca se liga de forma genuína ao seu público. Porque no final do dia, fazemos marketing para pessoas.',
    ctaBadge: 'CONTACTO DIRETO & OPORTUNIDADES'
  },
  en: {
    cvInteractive: 'INTERACTIVE CV',
    academicStatus: 'Final-Year Marketing Student @ Politécnico de Leiria (ESTG)',
    availableBadge: 'Looking for a Job • Leiria / Lisbon',
    heroTitle: 'Not just a CV. A demonstration of Strategy.',
    heroDescription1: 'Hello! I am Lucas Nunes, a final-year undergraduate Marketing student at Politécnico de Leiria (ESTG) and an incoming Master\'s student in Data-driven Marketing (specializing in Customer Experience) starting September 2026.',
    heroDescription2: 'What truly excites me is studying data and connecting it to the real motivations behind consumer actions. I am deeply interested in branding and digital marketing — understanding how a brand can be empathetic, memorable, and agile in adapting to market trends. I believe versatility and adaptability are the two most critical values for tomorrow\'s professional (especially in the face of rapid AI evolution).',
    heroDescription3: 'So far, I have collaborated with 3 different youth and business associations (AJPH - Atemphar, Startup Leiria, and AAPI) and have worked with clients across 4 different sectors (from health and sports to innovation and internationalization). All of this with a highly dynamic, statistically rigorous approach, focused on practical and measurable results!',
    heroQuote: '"This space features seven original projects I have developed and defended. Each project report below faithfully summarizes the applied methodology, real collected data, and approved conclusions."',
    keyFacts: 'Impact Metrics',
    academicInstitution: 'Educational Institution',
    academicCourse: 'Academic Course',
    associativeActivity: 'Association Activity',
    associativeRole: 'President of the Board @ Atemphar',
    evidenceProjects: 'Evidence Projects',
    genuineProjectsCount: '7 Genuine Projects',
    sessionMonitor: 'Session Monitor',
    sessionStarted: 'Session started',
    projectsHeading: 'Academic Technical Evidence',
    projectsTitle: 'Projects & Reports Grid',
    projectsDescription: 'These are the seven genuine projects developed by Lucas. Three of them are integrated and available for immediate viewing and downloading in real PDF format (hosted directly on the server).',
    filterLabel: 'Quick Filters:',
    all: 'All',
    branding: 'Branding & Product',
    digital: 'Digital Marketing',
    services: 'Management & Services',
    research: 'Case Study / Research',
    analysis: 'Brand Analysis',
    pdfIntegrated: 'Integrated PDF',
    academicWork: 'Academic Work',
    associativeProject: 'Associative / Activation Project',
    hideDetails: 'HIDE FACTUAL DETAILS',
    viewSummary: 'VIEW EXECUTIVE SUMMARY',
    synopsis: 'Work Synopsis',
    keyOutcomes: 'Key Deliverables & Conclusions',
    openPdf: 'Open Real PDF',
    downloadPdf: 'Download PDF',
    viewFullProject: 'View Full Project',
    trajectoryHeading: 'Real Trajectory',
    trajectoryTitle: 'Academic Training & Association Activity',
    trajectoryDescription: 'Simple and transparent overview of Lucas Nunes\' formal studies at Politécnico de Leiria and his active volunteer leadership experience.',
    trajectoryDetail: 'Factual Trajectory Detail',
    skillsTools: 'Practical Capabilities & Tools',
    recruiterDilemmaHeading: 'The Recruiter\'s Dilemma & Tactical Alignment Index',
    recruiterDilemmaDesc: 'The market demands recent graduates with 10 years of practical experience and proficiency in senior tools. Let\'s simulate in a fun way your Tactical Alignment Index with Lucas Nunes, based on your job parameters and the benefits you offer!',
    yearsRequiredLabel: 'Years of Experience Required for the role:',
    yearsExpSingular: 'year',
    yearsExpPlural: 'years',
    bestPerkLabel: 'Best highlighted perk in your office:',
    pingpong: 'Ping-Pong Table',
    snacksHealthy: 'Healthy Snacks',
    hybridWork: 'Hybrid Work',
    isPaidLabel: 'Does your company offer a paid internship?',
    yesOfCourse: 'Yes, we pay',
    noPrestige: 'No, just prestige',
    analyzeAlignment: 'Analyze my alignment',
    myPerspective: 'My honest perspective',
    expDilemma: '1. The Experience Dilemma',
    perfectMatch: '✓ Excellent alignment! If you are looking for someone dynamic, motivated, and eager to learn, I am ready to roll up my sleeves. In my academic and association journey, I have already tackled 7 complex projects — I am more than ready to join your team.',
    reasonableFair: '✓ Seems very fair to me. With my experience as President of Atemphar and the development of these 7 marketing plans, I bring the autonomy and proactivity you need for a junior role.',
    paradoxDetected: '⚠️ We have a small paradox here: I am only 20 years old. To meet your requirement of {yearsRequired} years of experience, I would have had to start developing strategic plans at {calcAge} years of age! However, if you look at my project for Timberland or Folha Skimboards, you will see that my dedication and graphic rigor are on par with a senior professional.',
    envMotivation: '2. Environment & Motivation',
    pingpongDesc: '🏓 Ping-Pong Table: I love to play, but with the pace of your campaigns, I doubt we will have much free time! Still, it looks spectacular in the employer branding photos on your Instagram.',
    snacksDesc: '🥑 Healthy Snacks: Excellent choice! Having studied Oh! My Snacks in depth for my internationalization project to Singapore, I know very well how balanced nutrition prevents fatigue when processing complex data in SPSS.',
    hybridDesc: '💻 Hybrid Work & Flexibility: For me, this is the key to high performance. Fewer redundant one-hour meetings and much more focus on rigorous and creative deliverables.',
    humanFeasibility: '3. Human Feasibility Analysis',
    ethicalViable: '✓ Mutual valuation: I am immensely grateful for your professionalism. I believe that valuing the work of those starting out is the best way to build a strong partnership with 100% motivation.',
    prestigeOpinion: '💡 An honest reflection: Prestige is great for the resume, but college tuition doesn\'t pay itself! I believe in the value of my work and would love to count on your mutual valuation.',
    tacticalIndex: 'Tactical Alignment Index:',
    compatibility: 'Compatibility:',
    verdict: 'Verdict:',
    verdictExcel: 'Excellent Alignment! (High-Performance Team) 🚀',
    verdictBalanced: 'Balanced Alignment. Ready to align goals!',
    verdictParadox: 'Paradox Alert. Strategic alignment recommended ⚠️',
    footerCourse: 'Politécnico de Leiria (ESTG) • Corporate jargon and meaningless mock-ups strictly forbidden.',
    hoursSpentText: 's',
    minsAndSecsText: 'm and',
    secText: 's',
    ctaHeading: 'Ready to bring your strategy to life? Let\'s talk.',
    ctaSub: 'I am available for new professional opportunities, high-caliber internships, or projects where I can apply analytical rigor, brand empathy, and a strong focus on practical results.',
    ctaPrimaryButton: 'Request my CV in PDF',
    ctaSecondaryButton: 'Call via Phone',
    strategicChallengeTitle: 'The Strategic Challenge',
    strategicProblem: '» What was the problem?',
    strategicInsight: '» What data or insight did you use?',
    strategicImpact: '» What was the impact?',
    manifestoTitle: 'My Manifesto',
    manifestoDescription: 'I am Lucas. I believe that marketing without empathy is just noise, and data without interpretation are just numbers. My approach focuses on blending statistical precision with human creativity, ensuring every brand connects genuinely with its audience. Because at the end of the day, we do marketing for people.',
    ctaBadge: 'DIRECT CONTACT & OPPORTUNITIES'
  }
};

export default function App() {
  // --- STATE ---
  const [lang, setLang] = useState<'pt' | 'en'>('pt');
  const t = translations[lang];

  const currentProjectsList = projectsList[lang];
  const currentExperienceList = experienceList[lang];
  const currentPersuasiveRecruiterArguments = persuasiveRecruiterArguments[lang];

  const [expandedProject, setExpandedProject] = useState<string | null>(null);
  const [selectedExperience, setSelectedExperience] = useState<string>('atemphar-board');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  
  const [imgError, setImgError] = useState(false);
  
  // Filtered Projects
  const filteredProjects = currentProjectsList.filter(
    (p) => categoryFilter === 'all' || p.category === categoryFilter
  );

  // Time spent on portfolio (interactive wink)
  const [secondsSpent, setSecondsSpent] = useState<number>(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setSecondsSpent(prev => prev + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const formatTimeSpent = (totalSeconds: number) => {
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    if (mins === 0) return `${secs}${t.hoursSpentText}`;
    return `${mins}${t.minsAndSecsText} ${secs}${t.secText}`;
  };

  const selectedExperienceObj = currentExperienceList.find(e => e.id === selectedExperience) || currentExperienceList[0];

  return (
    <div className="min-h-screen bg-zinc-50 text-[#1a1a1a] font-sans antialiased selection:bg-emerald-100 selection:text-emerald-950">
      
      {/* HEADER: Elegância Suíça & Linhas Limpas */}
      <header className="border-b border-zinc-200 bg-white sticky top-0 z-40">
        <div className="max-w-5xl mx-auto px-6 py-5 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="flex items-center gap-4">
            {/* Elegant profile avatar container with hover scale effect */}
            <div className="relative w-14 h-14 rounded-full overflow-hidden border-2 border-zinc-200 bg-zinc-100 flex items-center justify-center shrink-0 shadow-sm group">
              {!imgError ? (
                <img
                  src="/Clam-10hhhh.jpg"
                  alt="Lucas Nunes"
                  onError={() => setImgError(true)}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                />
              ) : (
                <LucasVectorAvatar />
              )}
            </div>

            <div className="space-y-1">
              <div className="flex items-center gap-3">
                <h1 className="text-2xl sm:text-3xl font-black font-display uppercase tracking-tighter text-zinc-900 flex items-center gap-2">
                  LUCAS NUNES
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse inline-block"></span>
                </h1>
                {/* Premium segmented control for language selection */}
                <div className="flex items-center bg-zinc-100 p-0.5 rounded border border-zinc-200">
                  <button
                    onClick={() => setLang('pt')}
                    className={`px-2 py-0.5 text-[9px] font-mono font-bold uppercase transition rounded-sm ${
                      lang === 'pt'
                        ? 'bg-white text-zinc-900 shadow-sm'
                        : 'text-zinc-500 hover:text-zinc-800'
                    }`}
                  >
                    PT
                  </button>
                  <button
                    onClick={() => setLang('en')}
                    className={`px-2 py-0.5 text-[9px] font-mono font-bold uppercase transition rounded-sm ${
                      lang === 'en'
                        ? 'bg-white text-zinc-900 shadow-sm'
                        : 'text-zinc-500 hover:text-zinc-800'
                    }`}
                  >
                    EN
                  </button>
                </div>
              </div>
              <p className="text-xs font-mono text-zinc-500 font-bold uppercase tracking-wider">
                {t.academicStatus}
              </p>
            </div>
          </div>
          
          {/* Contact Details */}
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 font-mono text-[11px] text-zinc-600">
            <a href="mailto:lucasnunesatwork@gmail.com" className="flex items-center gap-1.5 hover:text-emerald-600 transition">
              <Mail className="w-3.5 h-3.5" />
              <span>lucasnunesatwork@gmail.com</span>
            </a>
            <a href="tel:+351927208212" className="flex items-center gap-1.5 hover:text-emerald-600 transition">
              <Phone className="w-3.5 h-3.5" />
              <span>+351 927 208 212</span>
            </a>
            <span className="flex items-center gap-1.5 text-zinc-400">
              <MapPin className="w-3.5 h-3.5 text-zinc-400" />
              <span>Leiria / Lisboa, Portugal</span>
            </span>
          </div>
        </div>
      </header>

      {/* CORE WRAPPER */}
      <main className="max-w-5xl mx-auto px-6 py-12 space-y-20">
        
        {/* INTRO HERO: Factual, Minimalista e Direto */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          <div className="lg:col-span-8 space-y-6">
            <div className="inline-flex items-center gap-2 bg-zinc-900 text-white font-mono text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-sm shadow-[2px_2px_0px_0px_rgba(16,185,129,1)]">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse inline-block"></span>
              <span>{t.availableBadge}</span>
            </div>
            
            <h2 className="text-4xl sm:text-5xl font-black font-display uppercase tracking-tight text-zinc-900 leading-[1.05]">
              {t.heroTitle}
            </h2>
            
            <div className="text-zinc-600 leading-relaxed text-sm space-y-4">
              <p>
                {t.heroDescription1}
              </p>
              <p>
                {t.heroDescription2}
              </p>
              <p>
                {t.heroDescription3}
              </p>
            </div>
            
            <p className="text-zinc-500 leading-relaxed text-sm italic font-serif pt-1">
              {t.heroQuote}
            </p>

            {/* Quick Badges Link */}
            <div className="flex flex-wrap gap-3 pt-2">
              <a 
                href="https://www.linkedin.com/in/the-lucasnunes/" 
                target="_blank" 
                rel="noreferrer" 
                className="inline-flex items-center gap-1.5 bg-zinc-900 text-white font-mono text-[11px] font-bold uppercase tracking-wider px-4 py-2 border border-black hover:bg-emerald-600 hover:border-emerald-600 transition shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:shadow-none"
              >
                <Linkedin className="w-4 h-4" />
                <span>LinkedIn /the-lucasnunes/</span>
              </a>
              <a 
                href="https://www.instagram.com/markethentic/" 
                target="_blank" 
                rel="noreferrer" 
                className="inline-flex items-center gap-1.5 bg-white text-zinc-800 font-mono text-[11px] font-bold uppercase tracking-wider px-4 py-2 border border-zinc-300 hover:border-emerald-600 hover:text-emerald-700 transition"
              >
                <Instagram className="w-4 h-4 text-rose-500" />
                <span>Instagram @markethentic</span>
              </a>
            </div>
          </div>

          {/* Quick Factual Summary Panel */}
          <div className="lg:col-span-4 bg-white border border-zinc-200 p-6 space-y-4 rounded-lg shadow-sm">
            <h3 className="font-mono font-black text-xs uppercase tracking-wider text-zinc-400 border-b border-zinc-100 pb-2 flex items-center justify-between">
              <span>{t.keyFacts}</span>
              <span className="text-emerald-600">● ACTIVE</span>
            </h3>
            
            <div className="space-y-4 font-mono text-xs text-zinc-700">
              <div className="space-y-0.5">
                <span className="text-[10px] text-zinc-400 uppercase">{t.academicInstitution}</span>
                <p className="font-black text-zinc-900">Politécnico de Leiria (ESTG)</p>
              </div>
              <div className="space-y-0.5">
                <span className="text-[10px] text-zinc-400 uppercase">{t.academicCourse}</span>
                <p className="font-black text-zinc-900">Licenciatura em Marketing</p>
              </div>
              <div className="space-y-0.5">
                <span className="text-[10px] text-zinc-400 uppercase">{t.associativeActivity}</span>
                <p className="font-black text-zinc-900">{t.associativeRole}</p>
              </div>
              <div className="space-y-0.5">
                <span className="text-[10px] text-zinc-400 uppercase">{t.evidenceProjects}</span>
                <p className="font-black text-zinc-900">{t.genuineProjectsCount}</p>
              </div>
              <div className="bg-zinc-50 p-2.5 border border-zinc-200 text-[10px] space-y-1">
                <span className="text-zinc-500 uppercase tracking-widest block font-bold">{t.sessionMonitor}</span>
                <p className="text-zinc-600">{t.sessionStarted} <strong className="text-emerald-600">{formatTimeSpent(secondsSpent)}</strong></p>
              </div>
            </div>
          </div>
          
        </section>

        {/* PROJETOS: O Coração das Evidências Técnicas */}
        <section className="space-y-6">
          <div className="space-y-1 border-b border-zinc-200 pb-4">
            <span className="font-mono text-xs text-emerald-600 uppercase font-black">{t.projectsHeading}</span>
            <h3 className="text-2xl sm:text-3xl font-black font-display uppercase tracking-tight text-zinc-900">
              {t.projectsTitle}
            </h3>
            <p className="text-sm text-zinc-500 leading-normal max-w-3xl">
              {t.projectsDescription}
            </p>
          </div>

          {/* Interactive Category Selector Filter */}
          <div className="flex flex-wrap items-center gap-2 pt-2 pb-1 text-xs font-mono">
            <span className="text-zinc-400 font-bold uppercase tracking-wider mr-2">{t.filterLabel}</span>
            {[
              { id: 'all', label: t.all },
              { id: 'branding', label: t.branding },
              { id: 'digital', label: t.digital },
              { id: 'services', label: t.services },
              { id: 'research', label: t.research },
              { id: 'analysis', label: t.analysis }
            ].map(filter => (
              <button
                key={filter.id}
                onClick={() => setCategoryFilter(filter.id)}
                className={`px-3 py-1.5 transition border rounded-sm font-bold uppercase tracking-tight text-[10px] ${
                  categoryFilter === filter.id
                    ? 'bg-emerald-600 border-emerald-600 text-white shadow-sm'
                    : 'bg-white border-zinc-200 hover:border-zinc-400 text-zinc-600'
                }`}
              >
                {filter.label}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((project) => {
              const isExpanded = expandedProject === project.id;
              const hasRealPdf = !!project.pdfUrl;
              
              return (
                <div 
                  key={project.id}
                  className={`bg-white border transition-all duration-200 hover:-translate-y-1 flex flex-col justify-between ${
                    isExpanded 
                      ? 'border-emerald-600 shadow-md ring-1 ring-emerald-600/20' 
                      : 'border-zinc-200 hover:border-zinc-400 shadow-sm'
                  }`}
                >
                  <div className="p-5 space-y-4">
                    
                    {/* Header line */}
                    <div className="flex justify-between items-center text-[10px] font-mono">
                      <span className="px-2 py-0.5 font-black uppercase bg-zinc-100 text-zinc-700 tracking-wider">
                        {project.category}
                      </span>
                      {hasRealPdf ? (
                        <span className="text-emerald-600 font-bold uppercase tracking-wider flex items-center gap-1">
                          <FileCheck className="w-3 h-3" />
                          {t.pdfIntegrated}
                        </span>
                      ) : (
                        <span className="text-zinc-400 font-bold uppercase tracking-wider">
                          {t.academicWork}
                        </span>
                      )}
                    </div>

                    <div className="space-y-1">
                      <h4 className="font-black text-sm uppercase tracking-tight text-zinc-900 font-display min-h-[36px] line-clamp-2">
                        {project.title}
                      </h4>
                      <p className="text-xs text-zinc-500 font-mono italic">
                        {project.period}
                      </p>
                    </div>

                    <p className="text-xs text-zinc-600 line-clamp-3 leading-relaxed">
                      {project.subtitle}
                    </p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-1 pt-1">
                      {project.tags.slice(0, 3).map((tag, idx) => (
                        <span key={idx} className="bg-zinc-50 text-zinc-500 text-[9px] px-1.5 py-0.5 rounded-sm border border-zinc-200">
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Accordion expand button */}
                    <button 
                      onClick={() => setExpandedProject(isExpanded ? null : project.id)}
                      className="w-full flex justify-between items-center text-left py-2 border-t border-zinc-100 font-mono text-[10px] font-bold text-zinc-700 hover:text-emerald-700 transition"
                    >
                      <span>{isExpanded ? t.hideDetails : t.viewSummary}</span>
                      {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                    </button>

                    {/* Expanded Content with motion-inspired animation */}
                    {isExpanded && (
                      <div className="pt-3 border-t border-zinc-100 space-y-4 animate-fade-in text-xs font-sans text-zinc-700">
                        
                        {project.strategicChallenge && (
                          <div className="space-y-3 bg-zinc-50 p-3.5 border border-zinc-200 rounded-sm">
                            <span className="block font-mono text-[10px] font-black text-emerald-700 uppercase tracking-wider">{t.strategicChallengeTitle}</span>
                            <div className="space-y-2.5">
                              <div>
                                <span className="font-bold text-zinc-900 block font-mono text-[10px]">{t.strategicProblem}</span>
                                <p className="text-zinc-600 mt-0.5 leading-relaxed">{project.strategicChallenge.problem}</p>
                              </div>
                              <div>
                                <span className="font-bold text-zinc-900 block font-mono text-[10px]">{t.strategicInsight}</span>
                                <p className="text-zinc-600 mt-0.5 leading-relaxed">{project.strategicChallenge.insight}</p>
                              </div>
                              <div>
                                <span className="font-bold text-zinc-900 block font-mono text-[10px]">{t.strategicImpact}</span>
                                <p className="text-zinc-600 mt-0.5 leading-relaxed">{project.strategicChallenge.impact}</p>
                              </div>
                            </div>
                          </div>
                        )}

                        <div className="space-y-1.5">
                          <span className="block font-mono text-[9px] font-black text-zinc-400 uppercase">{t.synopsis}</span>
                          <p className="leading-relaxed bg-zinc-50 p-2.5 border-l-2 border-emerald-600 italic">
                            "{project.description}"
                          </p>
                        </div>
                        
                        <div className="space-y-1.5">
                          <span className="block font-mono text-[9px] font-black text-zinc-400 uppercase">{t.keyOutcomes}</span>
                          <ul className="list-disc list-inside space-y-1 leading-relaxed pl-1 text-[11px]">
                            {project.outcomes.map((out, idx) => (
                              <li key={idx} className="pl-1">
                                <span className="text-zinc-700">{out}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div className="bg-emerald-50/60 p-2.5 border border-emerald-100 flex justify-between items-center font-mono text-[10px]">
                          <span className="text-emerald-900 font-bold uppercase">{project.metricLabel || 'Outcome'}</span>
                          <strong className="text-emerald-950 font-black">{project.metricValue || '100%'}</strong>
                        </div>
                      </div>
                    )}

                  </div>

                  {/* PDF Download/View actions */}
                  <div className="bg-zinc-50 border-t border-zinc-100 p-4 flex gap-2">
                    {hasRealPdf ? (
                      <>
                        <a 
                          href={project.pdfUrl} 
                          target="_blank" 
                          rel="noreferrer"
                          className="flex-1 text-center bg-zinc-900 hover:bg-emerald-600 text-white font-mono font-bold text-[10px] uppercase tracking-wider py-2 transition shadow-sm rounded-sm flex items-center justify-center gap-1"
                        >
                          <ExternalLink className="w-3 h-3" />
                          <span>{t.openPdf}</span>
                        </a>
                        <a 
                          href={project.pdfUrl} 
                          download 
                          className="px-3 bg-white hover:bg-zinc-200 text-zinc-800 font-mono font-bold text-[10px] py-2 transition border border-zinc-300 rounded-sm flex items-center justify-center"
                          title={t.downloadPdf}
                        >
                          <Download className="w-3.5 h-3.5" />
                        </a>
                      </>
                    ) : (
                      <button 
                        onClick={() => setExpandedProject(isExpanded ? null : project.id)}
                        className="w-full text-center bg-zinc-100 hover:bg-zinc-200 text-zinc-600 font-mono font-bold text-[10px] uppercase tracking-wider py-2 transition border border-zinc-300 rounded-sm"
                      >
                        {t.viewFullProject}
                      </button>
                    )}
                  </div>

                </div>
              );
            })}
          </div>
        </section>

        {/* HISTÓRICO ACADÉMICO & VOLUNTARIADO */}
        <section className="space-y-6">
          <div className="space-y-1 border-b border-zinc-200 pb-4">
            <span className="font-mono text-xs text-emerald-600 uppercase font-black">{t.trajectoryHeading}</span>
            <h3 className="text-2xl sm:text-3xl font-black font-display uppercase tracking-tight text-zinc-900">
              {t.trajectoryTitle}
            </h3>
            <p className="text-sm text-zinc-500 leading-normal max-w-3xl">
              {t.trajectoryDescription}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left selector bar (5 cols) */}
            <div className="lg:col-span-5 space-y-3">
              {currentExperienceList.map((exp) => {
                const isSelected = selectedExperience === exp.id;
                return (
                  <button
                    key={exp.id}
                    onClick={() => setSelectedExperience(exp.id)}
                    className={`w-full text-left p-4 transition border rounded-md ${
                      isSelected 
                        ? 'bg-white border-emerald-600 shadow-[3px_3px_0px_0px_rgba(16,185,129,0.15)] ring-1 ring-emerald-500/20' 
                        : 'bg-[#fafafa] hover:bg-white border-zinc-200 hover:border-zinc-300'
                    }`}
                  >
                    <div className="flex justify-between items-center text-[10px] font-mono mb-1.5">
                      <span className="px-2 py-0.5 bg-zinc-100 text-zinc-600 font-bold uppercase rounded-sm">
                        {exp.category}
                      </span>
                      <span className="text-emerald-700 font-bold">{exp.period}</span>
                    </div>
                    <h4 className="font-black text-sm uppercase tracking-tight font-display text-zinc-900">
                      {exp.role}
                    </h4>
                    <p className="text-xs text-zinc-500 font-mono mt-0.5">
                      {exp.company}
                    </p>
                  </button>
                );
              })}
            </div>

            {/* Right details box (7 cols) */}
            <div className="lg:col-span-7 bg-white border border-zinc-200 p-6 rounded-md shadow-sm space-y-4">
              <div className="border-b border-zinc-100 pb-3">
                <span className="text-[9px] font-mono text-emerald-600 uppercase font-black block">{t.trajectoryDetail}</span>
                <h4 className="text-lg font-black font-display uppercase text-zinc-900 mt-0.5">{selectedExperienceObj.role}</h4>
                <p className="text-xs font-mono text-zinc-400">{selectedExperienceObj.company} • <strong>{selectedExperienceObj.period}</strong></p>
              </div>

              <ul className="list-disc list-inside space-y-2 text-xs sm:text-sm text-zinc-700 leading-relaxed font-sans">
                {selectedExperienceObj.description.map((bullet, idx) => (
                  <li key={idx} className="pl-1">
                    <span className="text-zinc-700">{bullet}</span>
                  </li>
                ))}
              </ul>

              <div className="pt-4 border-t border-zinc-100 space-y-2.5">
                <span className="block font-mono text-[9px] font-black text-emerald-700 uppercase">{t.skillsTools}</span>
                <div className="flex flex-wrap gap-1.5">
                  {selectedExperienceObj.tools.map((tool, idx) => (
                    <span key={idx} className="bg-emerald-50 text-emerald-950 font-mono text-[10px] px-2.5 py-1 border border-emerald-100 rounded-sm">
                      {tool}
                    </span>
                  ))}
                </div>
              </div>

            </div>

          </div>
        </section>

        {/* MANIFESTO / ABORDAGEM */}
        <section className="py-12 border-t border-zinc-200 mt-12">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center bg-white p-8 border border-zinc-200 shadow-sm rounded-lg">
            <div className="md:col-span-3 flex justify-center">
               <div className="w-24 h-24 sm:w-32 sm:h-32 border-2 border-emerald-100 rounded-full p-1 bg-zinc-50 overflow-hidden">
                 <img src="/Clam-10hhhh.jpg" alt="Lucas Nunes" className="w-full h-full object-cover rounded-full" />
               </div>
            </div>
            <div className="md:col-span-9 space-y-4">
               <h3 className="text-2xl sm:text-3xl font-black font-display uppercase tracking-tight text-zinc-900 flex items-center gap-2">
                 <Sparkles className="w-5 h-5 text-emerald-500" />
                 {t.manifestoTitle}
               </h3>
               <p className="text-zinc-600 leading-relaxed font-sans text-sm sm:text-base max-w-3xl italic">
                 "{t.manifestoDescription}"
               </p>
               {/* Abstract signature representation */}
               <div className="pt-3 border-t border-zinc-100 mt-4 flex items-center gap-4">
                 <svg width="100" height="30" viewBox="0 0 100 30" fill="none" xmlns="http://www.w3.org/2000/svg" className="opacity-70">
                   <path d="M5 25 C 15 5, 25 20, 30 15 S 40 5, 45 20 S 55 10, 65 22 S 80 5, 95 18" stroke="#10b981" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
                   <path d="M20 28 L 90 28" stroke="#e4e4e7" strokeWidth="1" strokeDasharray="2 2" fill="none"/>
                 </svg>
                 <span className="text-[9px] font-mono font-bold text-zinc-400 uppercase tracking-widest">Lucas Nunes</span>
               </div>
            </div>
          </div>
        </section>

        {/* PROFESSIONAL CALL-TO-ACTION (CTA) SECTION */}
        <section className="bg-zinc-950 text-white p-8 sm:p-12 border border-zinc-800 rounded-xl relative overflow-hidden shadow-2xl mt-12">
          {/* Accent decoration */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none transform translate-x-32 -translate-y-32" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none transform -translate-x-32 translate-y-32" />
          
          <div className="relative z-10 max-w-3xl mx-auto text-center space-y-6 sm:space-y-8">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/80 border border-emerald-500/30 text-emerald-400 text-[10px] font-mono tracking-widest uppercase font-bold mx-auto">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{t.ctaBadge}</span>
            </span>
            
            <div className="space-y-4">
              <h3 className="text-2xl sm:text-4xl font-black font-display uppercase tracking-tight text-white leading-tight">
                {t.ctaHeading}
              </h3>
              <p className="text-zinc-400 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto font-sans">
                {t.ctaSub}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
              <a 
                href="mailto:lucasnunesatwork@gmail.com" 
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-mono font-bold uppercase tracking-wider px-6 py-4 rounded shadow-lg transition duration-200"
              >
                <Mail className="w-4 h-4" />
                <span>{t.ctaPrimaryButton}</span>
                <ArrowUpRight className="w-3.5 h-3.5 opacity-60" />
              </a>
              
              <a 
                href="tel:+351927208212" 
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 hover:border-zinc-700 text-zinc-300 text-xs font-mono font-bold uppercase tracking-wider px-6 py-4 rounded transition duration-200"
              >
                <Phone className="w-4 h-4" />
                <span>{t.ctaSecondaryButton}</span>
              </a>
            </div>
          </div>
        </section>

      </main>

      {/* FOOTER: Minimalista, Elegante e Discreto */}
      <footer className="border-t border-zinc-200 bg-white py-10 mt-12 text-center text-xs font-mono text-zinc-400 space-y-1">
        <p>LUCAS NUNES • {t.cvInteractive}</p>
        <p className="text-[10px]">{t.footerCourse}</p>
      </footer>

    </div>
  );
}

// Custom, highly styled SVG Vector representation of Lucas Nunes (glasses, wavy brown hair, friendly look)
function LucasVectorAvatar() {
  return (
    <svg viewBox="0 0 100 100" className="w-full h-full object-cover" xmlns="http://www.w3.org/2000/svg">
      {/* Background with light grey */}
      <circle cx="50" cy="50" r="50" fill="#f4f4f5" />
      
      {/* Neck */}
      <rect x="44" y="65" width="12" height="15" fill="#fdd1b0" />
      
      {/* Shirt Collar */}
      <path d="M35 75 L50 85 L65 75 L50 71 Z" fill="#0f172a" />
      
      {/* Head */}
      <circle cx="50" cy="45" r="22" fill="#ffe4cf" />
      
      {/* Hair (Wavy/Curly Brown) */}
      <path d="M28 42 C24 35, 30 23, 40 21 C45 20, 55 20, 60 21 C70 23, 76 35, 72 42 C70 45, 68 35, 62 30 C58 27, 42 27, 38 30 C32 35, 30 45, 28 42 Z" fill="#4a3728" />
      <circle cx="35" cy="30" r="6" fill="#4a3728" />
      <circle cx="45" cy="24" r="7" fill="#4a3728" />
      <circle cx="55" cy="24" r="7" fill="#4a3728" />
      <circle cx="65" cy="30" r="6" fill="#4a3728" />
      <circle cx="40" cy="26" r="6" fill="#4a3728" />
      <circle cx="60" cy="26" r="6" fill="#4a3728" />
      <circle cx="50" cy="22" r="7" fill="#4a3728" />

      {/* Eyes */}
      <circle cx="42" cy="44" r="2" fill="#2d1d13" />
      <circle cx="58" cy="44" r="2" fill="#2d1d13" />

      {/* Glasses (Thin Wire Frames) */}
      <circle cx="42" cy="44" r="7" fill="none" stroke="#3f3f46" strokeWidth="1.5" />
      <circle cx="58" cy="44" r="7" fill="none" stroke="#3f3f46" strokeWidth="1.5" />
      <line x1="49" y1="44" x2="51" y2="44" stroke="#3f3f46" strokeWidth="1.5" />
      <line x1="32" y1="42" x2="35" y2="43" stroke="#3f3f46" strokeWidth="1.2" />
      <line x1="68" y1="42" x2="65" y2="43" stroke="#3f3f46" strokeWidth="1.2" />

      {/* Nose */}
      <path d="M49 43 L49 49 C49 50, 51 50, 51 49" stroke="#e0a980" strokeWidth="1.5" fill="none" strokeLinecap="round" />

      {/* Smile */}
      <path d="M43 53 C46 56, 54 56, 57 53" stroke="#b45309" strokeWidth="1.5" fill="none" strokeLinecap="round" />

      {/* Mustache */}
      <path d="M41 51 C43 49, 47 50, 49 51 L51 51 C53 50, 57 49, 59 51 C60 52, 58 52, 57 52 C54 52, 53 51, 50 52 C47 51, 46 52, 43 52 C42 52, 40 52, 41 51 Z" fill="#322015" />

      {/* Goatee */}
      <path d="M46 58 L54 58 L50 63 Z" fill="#322015" />
    </svg>
  );
}
