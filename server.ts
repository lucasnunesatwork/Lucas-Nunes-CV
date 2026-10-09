import express from 'express';
import path from 'path';
import fs from 'fs';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const app = express();
app.use(express.json());

// Handle PDF requests with automatic aliasing and friendly missing-file page
app.use((req, res, next) => {
  const decodedPath = decodeURIComponent(req.path);
  if (!decodedPath.toLowerCase().endsWith('.pdf')) {
    return next();
  }

  const publicDir = path.resolve(process.cwd(), 'public');
  const filename = path.basename(decodedPath);
  const directPath = path.join(publicDir, filename);

  if (fs.existsSync(directPath)) {
    return res.sendFile(directPath);
  }

  // Alias lookup for Gazela Rebranding project
  if (
    filename.toLowerCase().includes('gazela') ||
    filename.toLowerCase().includes('cvdg') ||
    filename.toLowerCase().includes('tl2') ||
    filename.toLowerCase().includes('apresentação') ||
    filename.toLowerCase().includes('apresentacao')
  ) {
    const candidates = [
      'Apresentação CVDG TL2.pdf',
      'Apresentacao CVDG TL2.pdf',
      'Gazela Manual_compressed.pdf',
      'Gazela Manual.pdf',
    ];
    for (const cand of candidates) {
      const candPath = path.join(publicDir, cand);
      if (fs.existsSync(candPath)) {
        return res.sendFile(candPath);
      }
    }
    // Also scan public directory for any file containing 'gazela' or 'cvdg'
    try {
      const files = fs.readdirSync(publicDir);
      const match = files.find(f => {
        const lf = f.toLowerCase();
        return (lf.includes('gazela') || lf.includes('cvdg')) && lf.endsWith('.pdf');
      });
      if (match) {
        return res.sendFile(path.join(publicDir, match));
      }
    } catch {
      // Ignore
    }
  }

  // Alias lookup for Portefólio Lucas Nunes
  if (
    filename.toLowerCase().includes('portef') ||
    filename.toLowerCase().includes('portf')
  ) {
    const portfolioCandidates = [
      'Portefólio_Lucas Nunes.pdf',
      'Portefolio_Lucas Nunes.pdf',
      'Portfólio_Lucas Nunes.pdf',
      'Portfolio_Lucas Nunes.pdf',
    ];
    for (const cand of portfolioCandidates) {
      const candPath = path.join(publicDir, cand);
      if (fs.existsSync(candPath)) {
        return res.sendFile(candPath);
      }
    }
    try {
      const files = fs.readdirSync(publicDir);
      const match = files.find(f => {
        const lf = f.toLowerCase();
        return (lf.includes('portef') || lf.includes('portf')) && lf.endsWith('.pdf');
      });
      if (match) {
        return res.sendFile(path.join(publicDir, match));
      }
    } catch {
      // Ignore
    }
  }

  // If a PDF is requested but not on disk, return a dedicated page rather than falling through to SPA index.html
  res.status(404).send(`<!DOCTYPE html>
<html lang="pt">
  <head>
    <meta charset="utf-8" />
    <title>Documento PDF Pendente | Portfólio Lucas Nunes</title>
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <style>
      body { font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; background: #09090b; color: #f4f4f5; display: flex; align-items: center; justify-content: center; min-height: 100vh; margin: 0; padding: 24px; box-sizing: border-box; }
      .card { max-width: 580px; background: #18181b; border: 1px solid #27272a; border-radius: 12px; padding: 32px; box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.5); }
      h1 { margin-top: 0; font-size: 20px; font-weight: 700; color: #fff; display: flex; align-items: center; gap: 10px; }
      p { color: #a1a1aa; line-height: 1.6; font-size: 14px; }
      .badge { background: #27272a; color: #10b981; padding: 4px 10px; border-radius: 6px; font-family: monospace; font-size: 13px; display: inline-block; }
      .steps { background: #09090b; border: 1px solid #27272a; border-radius: 8px; padding: 16px 20px; margin: 20px 0; font-size: 13px; line-height: 1.7; color: #d4d4d8; }
      .btn { display: inline-block; background: #10b981; color: #000; font-weight: 700; text-decoration: none; padding: 10px 20px; border-radius: 6px; font-size: 13px; transition: 0.2s; }
      .btn:hover { background: #059669; }
    </style>
  </head>
  <body>
    <div class="card">
      <h1>📄 Ficheiro PDF original pronto para ser carregado</h1>
      <p>O link do projeto Gazela procura o teu documento original: <span class="badge">Apresentação CVDG TL2.pdf</span> ou <span class="badge">Gazela Manual_compressed.pdf</span>.</p>
      <div class="steps">
        <strong>Como colocar o teu PDF original no site:</strong><br />
        1. No explorador de ficheiros do AI Studio (no painel à esquerda), abre a pasta <strong>public/</strong>.<br />
        2. Arrasta o teu ficheiro <strong>Apresentação CVDG TL2.pdf</strong> diretamente para a pasta public (exatamente como fizeste com os outros 8 PDFs).<br />
        3. Recarrega o site ou clica novamente em "Ver PDF Original" — ele abrirá imediatamente o teu ficheiro original com a máxima qualidade!
      </div>
      <a class="btn" href="javascript:history.back()">← Voltar ao Portfólio</a>
    </div>
  </body>
</html>`);
});

app.use(express.static(path.resolve(process.cwd(), 'public')));

const PORT = 3000;

// Initialize Gemini Client
const apiKey = process.env.GEMINI_API_KEY;
let aiClient: GoogleGenAI | null = null;

if (apiKey) {
  aiClient = new GoogleGenAI({
    apiKey: apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });
} else {
  console.warn("WARNING: GEMINI_API_KEY environment variable is not set. The AI Marketing Assistant will run in simulated mode.");
}

app.post('/api/generate-copy', async (req, res) => {
  try {
    const { product, targetAudience, framework, tone, extraInfo } = req.body;
    
    if (!aiClient) {
      // Fallback fallback if no API key is set
      const simulatedText = `[DEMO MODE: No Gemini API Key configured in Secrets]
      
Here is a simulated high-converting copy using the **${framework}** framework for **${product || 'your product'}**:

📢 **[Attention]** 
Are you a member of our target audience, **${targetAudience || 'the general market'}**? Discover the ultimate solution designed with a modern, authentic **${tone}** tone. 

✨ **[Interest]**
Lucas Nunes presents a compelling strategy. With our robust analytical skills, we turn challenge into market-leading opportunities. This meets your exact specifications and solves major bottlenecks.

🚀 **[Desire]**
Backed by the training of Polytechnic of Leiria and actual hands-on internships at AAPI and Startup Leiria, our strategic vision is unparalleled.

🎯 **[Action]**
Contact us today at lucasinworking@gmail.com and let's build something exceptional together!

---
*Configure your GEMINI_API_KEY in the AI Studio Secrets panel to enable real, live AI generation!*`;
      return res.json({ text: simulatedText });
    }

    let prompt = `You are an elite, highly creative marketing copywriter assisting Lucas Nunes.
Generate high-converting, premium marketing copy for the following:
- Product/Service: ${product}
- Target Audience: ${targetAudience}
- Copywriting Framework: ${framework} (AIDA = Attention, Interest, Desire, Action; PAS = Problem, Agitate, Solve; FAB = Features, Advantages, Benefits)
- Brand Tone: ${tone}
`;
    if (extraInfo) {
      prompt += `- Additional Context: ${extraInfo}\n`;
    }

    prompt += `\nPlease structure the copy clearly according to the framework specified (${framework}). Use bold headings, short paragraphs, bullet points, and section tags (e.g. [Attention], [Problem] etc.) to make it highly readable and ready for a digital marketing campaign. Inject Lucas Nunes' personal marketing expertise, brand authenticity, or data-driven insights where relevant to showcase his copywriting value.`;

    const response = await aiClient.models.generateContent({
      model: "gemini-3.5-flash",
      contents: prompt,
      config: {
        temperature: 0.8,
      }
    });

    res.json({ text: response.text });
  } catch (error: any) {
    console.error("Error generating copy:", error);
    res.status(500).json({ error: error.message || "Failed to generate marketing copy." });
  }
});

// Configure Vite or Static files depending on environment
const isProd = process.env.NODE_ENV === 'production';

if (!isProd) {
  // Integrate Vite dev server in middleware mode
  const { createServer: createViteServer } = await import('vite');
  const vite = await createViteServer({
    server: { middlewareMode: true },
    appType: 'custom',
  });
  
  app.use(vite.middlewares);
  
  app.use('*', async (req, res, next) => {
    const url = req.originalUrl;
    try {
      let template = fs.readFileSync(path.resolve(process.cwd(), 'index.html'), 'utf-8');
      template = await vite.transformIndexHtml(url, template);
      res.status(200).set({ 'Content-Type': 'text/html' }).end(template);
    } catch (e) {
      vite.ssrFixStacktrace(e as Error);
      next(e);
    }
  });
} else {
  // Serve static assets from dist/
  app.use(express.static(path.resolve(process.cwd(), 'dist')));
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(process.cwd(), 'dist', 'index.html'));
  });
}

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server is running on port ${PORT} in ${isProd ? 'production' : 'development'} mode`);
});
