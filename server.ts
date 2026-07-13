import express from 'express';
import path from 'path';
import fs from 'fs';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const app = express();
app.use(express.json());

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

// Serve real PDF files securely from the root
app.get('/api/pdfs/:name', (req, res) => {
  const name = req.params.name;
  if (name.includes('..') || name.includes('/') || name.includes('\\')) {
    return res.status(400).send('Invalid file name');
  }
  const filePath = path.resolve(process.cwd(), name);
  if (fs.existsSync(filePath) && filePath.endsWith('.pdf')) {
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `inline; filename="${encodeURIComponent(name)}"`);
    return res.sendFile(filePath);
  }
  res.status(404).send('File not found');
});

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

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT} in ${isProd ? 'production' : 'development'} mode`);
});
