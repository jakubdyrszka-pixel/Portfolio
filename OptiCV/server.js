const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');

const root = __dirname;
const port = Number(process.env.PORT || 3000);

function loadEnv() {
  const envPath = path.join(root, '.env');
  if (!fs.existsSync(envPath)) return;
  for (const line of fs.readFileSync(envPath, 'utf8').split(/\r?\n/)) {
    const match = line.match(/^\s*([A-Z0-9_]+)\s*=\s*["']?(.*?)["']?\s*$/);
    if (match && !process.env[match[1]]) process.env[match[1]] = match[2];
  }
}

loadEnv();

const schema = {
  type: 'object',
  properties: {
    sections: { type: 'array', items: { type: 'string' } },
    skills: { type: 'array', items: { type: 'string' } },
    evidence: { type: 'array', items: { type: 'object', properties: { quote: { type: 'string' }, section: { type: 'string' } }, required: ['quote', 'section'] } },
    quantifiedResults: { type: 'array', items: { type: 'string' } }
  },
  required: ['sections', 'skills', 'evidence', 'quantifiedResults']
};

function hasSection(sections, ...names) {
  return names.some((name) => sections.some((section) => section.toLowerCase().includes(name)));
}

function score(extraction, textLength) {
  const sections = extraction.sections || [];
  const evidence = extraction.evidence || [];
  const results = extraction.quantifiedResults || [];
  const scores = {
    experience: Math.min(100, (hasSection(sections, 'experience', 'doświadczenie') ? 42 : 0) + Math.min(38, evidence.filter((item) => /experience|doświadczenie/i.test(item.section)).length * 12) + Math.min(20, results.length * 8)),
    skills: Math.min(100, (hasSection(sections, 'skills', 'umiejętności', 'technologies') ? 45 : 0) + Math.min(55, (extraction.skills || []).length * 11)),
    projects: Math.min(100, (hasSection(sections, 'projects', 'projekty', 'portfolio') ? 45 : 0) + Math.min(35, evidence.filter((item) => /project|projekt|portfolio/i.test(item.section)).length * 12) + (results.length ? 20 : 0)),
    completeness: Math.round((['experience', 'education', 'skills', 'projects', 'languages', 'summary'].filter((name) => hasSection(sections, name, { experience: 'doświadczenie', education: 'wykształcenie', skills: 'umiejętności', projects: 'projekty', languages: 'języki', summary: 'profil' }[name])).length / 6) * 100),
    clarity: Math.min(100, Math.max(20, 48 + Math.min(32, results.length * 8) + (textLength > 900 ? 12 : 0) - (textLength > 9000 ? 8 : 0)))
  };
  const total = Math.round(scores.experience * 0.28 + scores.skills * 0.22 + scores.projects * 0.2 + scores.completeness * 0.15 + scores.clarity * 0.15);
  const reasons = [];
  const suggestions = [];
  if (!hasSection(sections, 'experience', 'doświadczenie')) { reasons.push('Nie znaleziono wyraźnej sekcji doświadczenia zawodowego, więc wynik doświadczenia wynosi 0.'); suggestions.push('Dodaj sekcję „Doświadczenie” z firmą, stanowiskiem, datami i 3–5 zadaniami.'); }
  if (!results.length) { reasons.push('CV nie zawiera mierzalnych rezultatów, więc opis doświadczenia ma słabszą siłę dowodową.'); suggestions.push('Dodaj liczby, skalę lub rezultat do najważniejszych punktów doświadczenia.'); }
  if (!hasSection(sections, 'skills', 'umiejętności', 'technologies')) { reasons.push('Nie znaleziono osobnej sekcji umiejętności.'); suggestions.push('Dodaj umiejętności i połącz każdą kompetencję z konkretnym przykładem użycia.'); }
  if (!hasSection(sections, 'projects', 'projekty', 'portfolio')) { reasons.push('Brakuje sekcji projektów, więc CV ma mniej praktycznych dowodów.'); suggestions.push('Dodaj 1–3 projekty z technologiami, zakresem odpowiedzialności i rezultatem.'); }
  if (!hasSection(sections, 'languages', 'języki')) { reasons.push('Nie znaleziono informacji o językach.'); suggestions.push('Dodaj języki wraz z poziomem, np. „angielski — B2”.'); }
  if (textLength < 500) { reasons.push(`CV zawiera tylko ${textLength} znaków, więc analiza ma mało materiału dowodowego.`); suggestions.push('Uzupełnij opisy doświadczenia i projektów; sama lista stanowisk nie wystarcza.'); }
  return { total, scores, reasons: reasons.slice(0, 5), suggestions: suggestions.slice(0, 5), evidence: evidence.slice(0, 5) };
}

async function analyzeCv(cvText) {
  const key = process.env.GEMINI_API_KEY;
  if (!key) throw new Error('Brak GEMINI_API_KEY w pliku .env');
  const model = process.env.GEMINI_MODEL || 'gemini-3.6-flash';
  const prompt = `Wyodrębnij wyłącznie informacje bezpośrednio podane w poniższym CV. Nie oceniaj kandydata. Nie wnioskuj z nazwy stanowiska. Każdy evidence.quote musi być dosłownym fragmentem CV. Nie wymyślaj kompetencji. Zwróć tylko JSON zgodny ze schematem.\n\nCV:\n${cvText}`;
  const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${encodeURIComponent(key)}`, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }], generationConfig: { responseMimeType: 'application/json', responseSchema: schema } })
  });
  if (!response.ok) throw new Error(`Gemini zwróciło HTTP ${response.status}`);
  const payload = await response.json();
  const raw = payload.candidates?.[0]?.content?.parts?.[0]?.text;
  if (!raw) throw new Error('Gemini nie zwróciło danych analizy');
  const extraction = JSON.parse(raw);
  return { ...score(extraction, cvText.length), extraction };
}

function json(response, status, payload) {
  response.writeHead(status, { 'content-type': 'application/json; charset=utf-8' });
  response.end(JSON.stringify(payload));
}

http.createServer((request, response) => {
  if (request.method === 'POST' && request.url === '/api/analyze') {
    let body = '';
    request.on('data', (chunk) => { body += chunk; });
    request.on('end', async () => {
      try {
        const { cvText } = JSON.parse(body || '{}');
        if (!cvText?.trim()) return json(response, 400, { error: 'Wklej treść CV.' });
        return json(response, 200, await analyzeCv(cvText.trim()));
      } catch (error) {
        return json(response, 500, { error: error.message });
      }
    });
    return;
  }
  const relativePath = request.url === '/' ? '/index.html' : request.url;
  const filePath = path.join(root, relativePath);
  if (!filePath.startsWith(root) || !fs.existsSync(filePath)) return json(response, 404, { error: 'Not found' });
  const contentType = filePath.endsWith('.js') ? 'text/javascript' : filePath.endsWith('.css') ? 'text/css' : 'text/html';
  response.writeHead(200, { 'content-type': `${contentType}; charset=utf-8` });
  fs.createReadStream(filePath).pipe(response);
}).listen(port, () => console.log(`TrafCV działa na http://localhost:${port}`));
