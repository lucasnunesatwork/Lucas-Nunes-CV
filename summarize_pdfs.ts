import { GoogleGenAI } from '@google/genai';
import * as fs from 'fs';
import * as path from 'path';
import 'dotenv/config';

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    }
  }
});

async function summarizeFile(filename: string) {
  console.log(`Processing file ${filename}...`);
  const filePath = path.resolve(filename);
  if (!fs.existsSync(filePath)) {
    console.error(`File ${filename} not found at ${filePath}`);
    return;
  }

  const fileData = fs.readFileSync(filePath);
  const base64Data = fileData.toString('base64');

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3.5-flash',
      contents: [
        {
          inlineData: {
            mimeType: 'application/pdf',
            data: base64Data
          }
        },
        'Este é um ficheiro PDF contendo um projeto académico ou profissional do Lucas Nunes. Escreve um resumo detalhado e factual de 3 a 4 frases em Português sobre o que este projeto realmente trata, incluindo objetivos específicos, metodologias aplicadas (ex. inquéritos, SPSS, análise competitiva, etc.) e resultados ou propostas reais. Sê extremamente fiel aos factos contidos no documento, sem inventar nada.'
      ]
    });

    console.log(`\n=== RESUMO DE ${filename} ===`);
    console.log(response.text);
    console.log('===============================\n');
  } catch (error) {
    console.error(`Error processing ${filename}:`, error);
  }
}

async function main() {
  await summarizeFile('Caso de Estudo do Provador Digital da Zara.pdf');
  await summarizeFile('PITCH da VitaPen.pdf');
  await summarizeFile('Plano Estratégico de Serviços para a FOLHA Skimboard.pdf');
}

main().catch(console.error);
