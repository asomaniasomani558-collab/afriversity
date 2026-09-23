import express, { Request, Response } from 'express';
import path from 'path';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const app = express();
const PORT = parseInt(process.env.PORT || '3000', 10);

app.use(express.json());

// API health endpoint
app.get('/api/health', (_req: Request, res: Response) => {
  res.json({
    status: 'ok',
    service: 'AfriVersity Education Platform API',
    hasApiKey: !!process.env.GEMINI_API_KEY,
    timestamp: new Date().toISOString()
  });
});

// Gemini AI Educational Advisor endpoint
app.post('/api/advisor', async (req: Request, res: Response) => {
  try {
    const { message, history = [], userProfile, context } = req.body;

    if (!message || typeof message !== 'string') {
      res.status(400).json({ error: 'A valid message string is required.' });
      return;
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      res.status(503).json({
        error: 'Gemini API key is not configured on the server. Falling back to structured local database.',
        isFallback: true
      });
      return;
    }

    const ai = new GoogleGenAI({ apiKey });

    // Grounding prompt with African higher education knowledge rules
    const systemInstruction = `You are the AfriVersity Educational Advisor, a professional, empathetic, and knowledgeable guide for African university students, high school graduates, and parents across Ghana and the wider African continent.

KNOWLEDGE BASE & GUIDELINES:
1. Provide accurate, practical advice on African university admissions (e.g. University of Ghana, KNUST, UCC, Ashesi, UDS, GCTU, UPSA, UMaT, UEW, UENR, Academic City, UCT, Wits, Makerere, Univ of Ibadan, etc.).
2. For Ghanaian admissions, understand the West African Senior School Certificate Examination (WASSCE) grading system:
   - Core subjects: English Language, Integrated Science, Core Mathematics, Social Studies.
   - Elective subjects: 3 relevant electives (e.g. Elective Maths, Physics, Chemistry for Engineering/Computer Science; Biology, Chemistry, Physics/Elective Maths for Medicine).
   - Best aggregate is calculated from 3 core subjects + 3 electives (best 6 subjects, lower aggregate number is better, aggregate 06 is maximum possible excellence).
   - Highly competitive programmes (Medicine cut-off usually aggregate 08-09, BSc Computer Science at KNUST/UG usually aggregate 09-12).
3. Distinguish between general university admission requirements and programme-specific requirements.
4. Always encourage verifying with official university admissions portals (e.g. admissions.knust.edu.gh, admission.ug.edu.gh, ashesi.edu.gh).
5. Highlight real scholarship opportunities (Mastercard Foundation Scholars Program, MTN Ghana Bright Scholarship, Tullow Tertiary STEM, GNPC Foundation, DAAD In-Country/In-Region).
6. Connect academic fields to high-demand careers in Africa (FinTech, Software Engineering, AgriTech, Renewable Energy, Public Health, Infrastructure).
7. Speak in an encouraging, respectful, and articulate African educational voice. Never fabricate requirements or make up universities. When uncertain, advise checking the official admissions office.

User Context:
${userProfile ? `User Role: ${userProfile.role || 'Student'}, Target Field: ${userProfile.fieldOfInterest || 'Not specified'}, Country: ${userProfile.country || 'Ghana'}` : 'Prospective African Student'}
${context ? `Active Page Context: ${context}` : ''}`;

    // Format conversation history
    const contents: any[] = [];
    if (Array.isArray(history) && history.length > 0) {
      for (const msg of history.slice(-6)) {
        contents.push({
          role: msg.role === 'assistant' ? 'model' : 'user',
          parts: [{ text: msg.content }]
        });
      }
    }
    contents.push({
      role: 'user',
      parts: [{ text: message }]
    });

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: contents,
      config: {
        systemInstruction,
        temperature: 0.7,
        maxOutputTokens: 1200,
      }
    });

    const reply = response.text || 'I apologize, but I could not generate a response at this moment. Please check the university profiles directly.';

    res.json({
      reply,
      provider: 'Google Gemini 3.8 Flash',
      sources: [
        'AfriVersity Verified Institution Database',
        'Official University Admissions Portals (UG, KNUST, Ashesi, UCC)',
        'West African Examinations Council (WAEC/WASSCE) Standards'
      ]
    });
  } catch (error: any) {
    console.error('Gemini Advisor Error:', error);
    res.status(500).json({
      error: 'Failed to process inquiry with educational advisor.',
      details: error?.message || 'Server error',
      isFallback: true
    });
  }
});

// Setup Vite dev server or serve production build
async function startServer() {
  const isProduction = process.env.NODE_ENV === 'production';

  if (!isProduction) {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.resolve(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req: Request, res: Response) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`AfriVersity Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('Server startup failed:', err);
  process.exit(1);
});
