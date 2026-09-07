const fileInput = document.querySelector('#cv-file');
const dropzone = document.querySelector('#dropzone');
const fileLabel = document.querySelector('#file-label');
const fileHelper = document.querySelector('#file-helper');
const cvText = document.querySelector('#cv-text');
const analyzeButton = document.querySelector('#analyze-btn');
const results = document.querySelector('#results');

function showAnalysis(analysis) {
  document.querySelector('#score-total').textContent = analysis.total;
  document.querySelector('.score-bar span').style.width = `${analysis.total}%`;
  document.querySelector('.score-card p').textContent = analysis.total >= 70
    ? 'CV ma dobrą bazę. Skup się na dopracowaniu dowodów i konkretów.'
    : 'CV ma bazę do dalszej pracy. Największy efekt dadzą konkretne, mierzalne przykłady.';
  const metricValues = [analysis.scores.skills, analysis.scores.experience, analysis.scores.projects, analysis.scores.completeness, analysis.scores.clarity];
  document.querySelectorAll('.metric').forEach((metric, index) => {
    const value = metricValues[index];
    metric.querySelector('b').textContent = value;
    metric.querySelector('i span').style.width = `${value}%`;
  });
  document.querySelector('#score-reasons').innerHTML = analysis.reasons.map((reason) => `<li><span class="detail-bullet">!</span><span>${reason}</span></li>`).join('');
  document.querySelector('#score-suggestions').innerHTML = analysis.suggestions.map((suggestion) => `<li><span class="detail-bullet check">✓</span><span>${suggestion}</span></li>`).join('');
}

fileInput.addEventListener('change', () => {
  const file = fileInput.files[0];
  if (!file) return;
  dropzone.classList.add('selected');
  fileLabel.textContent = file.name;
  if (file.type === 'text/plain' || file.name.toLowerCase().endsWith('.txt')) {
    const reader = new FileReader();
    reader.onload = () => {
      cvText.value = reader.result;
      fileHelper.textContent = 'Tekst został odczytany';
    };
    reader.readAsText(file);
  } else {
    fileHelper.textContent = 'Wklej tekst CV, aby uruchomić analizę';
  }
});

dropzone.addEventListener('dragover', (event) => {
  event.preventDefault();
  dropzone.classList.add('selected');
});

dropzone.addEventListener('dragleave', () => dropzone.classList.remove('selected'));

dropzone.addEventListener('drop', (event) => {
  event.preventDefault();
  const file = event.dataTransfer.files[0];
  if (!file) return;
  fileInput.files = event.dataTransfer.files;
  fileLabel.textContent = file.name;
  fileHelper.textContent = file.type === 'text/plain' ? 'Tekst został odczytany po wybraniu pliku' : 'Wklej tekst CV, aby uruchomić analizę';
});

analyzeButton.addEventListener('click', () => {
  if (!fileInput.files.length && !cvText.value.trim()) {
    cvText.focus();
    cvText.setAttribute('placeholder', 'Najpierw dodaj plik albo wklej treść CV');
    return;
  }
  if (fileInput.files.length && !cvText.value.trim()) {
    cvText.focus();
    cvText.setAttribute('placeholder', 'PDF/DOCX jest wybrany, ale parser nie jest jeszcze podłączony. Wklej tutaj tekst CV.');
    return;
  }
  analyzeButton.disabled = true;
  analyzeButton.querySelector('span').textContent = 'Analizuję CV…';
  window.setTimeout(async () => {
    try {
      const response = await fetch('/api/analyze', { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ cvText: cvText.value }) });
      const payload = await response.json();
      if (!response.ok) throw new Error(payload.error || 'Nie udało się przeanalizować CV');
      showAnalysis(payload);
    } catch (error) {
      cvText.focus();
      cvText.setAttribute('placeholder', error.message);
    }
    results.classList.add('visible');
    analyzeButton.disabled = false;
    analyzeButton.querySelector('span').textContent = 'Sprawdź ponownie';
    results.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, 700);
});
