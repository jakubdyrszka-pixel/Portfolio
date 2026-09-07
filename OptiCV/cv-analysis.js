(function () {
  const sectionPatterns = {
    experience: /(?:doświadczenie|experience|zatrudnienie|employment)/i,
    education: /(?:wykształcenie|education|edukacja|studia)/i,
    skills: /(?:umiejętności|skills|technologie|narzędzia)/i,
    projects: /(?:projekty|projects|portfolio)/i,
    languages: /(?:języki|languages|angielski|english)/i,
    summary: /(?:profil|podsumowanie|about me|summary)/i
  };

  function redact(text) {
    return text
      .replace(/[\w.+-]+@[\w-]+\.[\w.-]+/gi, '[EMAIL]')
      .replace(/(?:\+?\d[\d\s().-]{7,}\d)/g, '[PHONE]')
      .replace(/(?:https?:\/\/|www\.)\S+/gi, '[LINK]');
  }

  function linesWithEvidence(text) {
    return redact(text).split(/\r?\n/).map((line, index) => ({
      text: line.trim(),
      sourceStart: text.split(/\r?\n/).slice(0, index).join('\n').length,
      sourceEnd: text.split(/\r?\n/).slice(0, index + 1).join('\n').length
    })).filter((line) => line.text.length > 2);
  }

  function detectSection(line) {
    return Object.entries(sectionPatterns).find(([, pattern]) => pattern.test(line))?.[0] || 'other';
  }

  function analyze(text) {
    const source = text.trim();
    const lines = linesWithEvidence(source);
    const sections = lines.reduce((result, line) => {
      const section = detectSection(line.text);
      if (!result[section]) result[section] = [];
      result[section].push(line);
      return result;
    }, {});
    const quantified = lines.filter(({ text: line }) => /\b\d+(?:%|\+|\s*(?:osób|projektów|klientów|zł|miesięcy|lat))\b/i.test(line));
    const technicalTerms = lines.filter(({ text: line }) => /\b(?:sql|javascript|typescript|react|python|java|git|api|figma|excel|jira|html|css|docker|aws|postman)\b/i.test(line));
    const contactSignals = [/@/.test(source), /(?:telefon|phone|tel\.?|linkedin)/i.test(source), /(?:miasto|lokalizacja|location)/i.test(source)];
    const has = (section) => Boolean(sections[section]?.length);
    const scores = {
      experience: Math.min(100, (has('experience') ? 42 : 0) + Math.min(38, sections.experience?.length * 8 || 0) + Math.min(20, quantified.length * 8)),
      skills: Math.min(100, (has('skills') ? 45 : 0) + Math.min(55, technicalTerms.length * 11)),
      projects: Math.min(100, (has('projects') ? 45 : 0) + Math.min(35, (sections.projects?.length || 0) * 10) + (quantified.length ? 20 : 0)),
      completeness: Math.round((Object.keys(sectionPatterns).filter(has).length / 6) * 100),
      clarity: Math.min(100, Math.max(20, 48 + Math.min(32, quantified.length * 8) + (source.length > 900 ? 12 : 0) - (source.length > 9000 ? 8 : 0)))
    };
    const total = Math.round(scores.experience * 0.28 + scores.skills * 0.22 + scores.projects * 0.2 + scores.completeness * 0.15 + scores.clarity * 0.15);
    const evidence = technicalTerms.slice(0, 3).map((line) => ({ label: 'Potwierdzona informacja', quote: line.text, section: detectSection(line.text) }));
    const reasons = [];
    const suggestions = [];
    if (!has('experience')) { reasons.push('Nie znaleziono wyraźnej sekcji doświadczenia zawodowego, więc wynik doświadczenia wynosi 0.'); suggestions.push('Dodaj sekcję „Doświadczenie” z nazwą firmy, stanowiskiem, datami i 3–5 zadaniami.'); }
    else if (!quantified.length) { reasons.push('Doświadczenie jest opisane bez liczb, skali lub rezultatów — dlatego CV traci punkty za siłę dowodów.'); suggestions.push('Zamień obowiązki na efekty, np. „obsługiwałem klientów” → „obsłużyłem średnio 40 klientów dziennie”.'); }
    if (!has('skills')) { reasons.push('Nie znaleziono osobnej sekcji umiejętności.'); suggestions.push('Dodaj krótką sekcję umiejętności i połącz każdą ważną kompetencję z przykładem użycia.'); }
    else if (technicalTerms.length < 2) { reasons.push('Lista kompetencji zawiera za mało rozpoznawalnych technologii lub narzędzi.'); suggestions.push('Wymień konkretne narzędzia i poziom znajomości, ale tylko te, których faktycznie używasz.'); }
    if (!has('projects')) { reasons.push('Brakuje sekcji projektów, więc nie ma dodatkowych dowodów praktycznych umiejętności.'); suggestions.push('Dodaj 1–3 projekty z technologiami, własnym zakresem odpowiedzialności i rezultatem.'); }
    if (!has('languages')) { reasons.push('Nie znaleziono informacji o językach.'); suggestions.push('Dodaj języki wraz z poziomem, np. „angielski — B2”.'); }
    if (source.length < 500) { reasons.push(`CV zawiera tylko ${source.length} znaków, więc analiza ma zbyt mało materiału dowodowego.`); suggestions.push('Uzupełnij opisy doświadczenia i projektów; sama lista stanowisk i umiejętności nie wystarcza.'); }
    if (!reasons.length) reasons.push('CV zawiera główne sekcje i wystarczająco dużo dowodów; wynik ogranicza głównie brak mierzalnych rezultatów.');
    if (!suggestions.length) suggestions.push('Dodaj mierzalne rezultaty do najważniejszych punktów i skróć ogólne opisy.');
    return { text: redact(source), sections, scores, total, evidence, quantifiedCount: quantified.length, reasons: reasons.slice(0, 5), suggestions: suggestions.slice(0, 5) };
  }

  window.CVAnalysis = { analyze };
}());
