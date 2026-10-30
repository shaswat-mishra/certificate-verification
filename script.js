/*
  DEMO DATA ONLY
  Replace/add records here only when you are authorized to publish the certificate details.
  For a real production verification system, use a secure backend/API instead of public JavaScript data.
*/
const certificates = {
  "83610f2": {
    studentName: "SHASWAT MISHRA",
    domain: "C Programming Internship",
    duration: "4 week",
    certificateNo: "83610f2",
    startingDate: "20/Jul/2026",
    awardDate: "20/Aug/2026"
  }
};

const pages = {
  home: document.getElementById('homePage'),
  verify: document.getElementById('verifyPage'),
  result: document.getElementById('resultPage')
};
const form = document.getElementById('verifyForm');
const codeInput = document.getElementById('certificateCode');
const searchError = document.getElementById('searchError');
const resultCard = document.getElementById('resultCard');
const resultTitle = document.getElementById('resultTitle');
const statusBadge = document.getElementById('statusBadge');
const menuButton = document.getElementById('menuButton');
const navLinks = document.querySelector('.nav-links');

document.getElementById('year').textContent = new Date().getFullYear();

function showPage(pageName) {
  Object.entries(pages).forEach(([key, element]) => element.classList.toggle('hidden', key !== pageName));
  navLinks.classList.remove('open');
  menuButton.setAttribute('aria-expanded', 'false');
  window.scrollTo({ top: 0, behavior: 'smooth' });
  if (pageName === 'verify') setTimeout(() => codeInput.focus(), 250);
  if (pageName === 'home') history.replaceState(null, '', '#home');
  if (pageName === 'verify') history.replaceState(null, '', '#verify');
  if (pageName === 'result') history.replaceState(null, '', '#result');
}

function addResultRow(label, value) {
  const row = document.createElement('div');
  row.className = 'result-row';
  const title = document.createElement('strong');
  title.textContent = label + ':';
  const text = document.createElement('span');
  text.className = 'value';
  text.textContent = value;
  row.append(title, text);
  resultCard.appendChild(row);
}

function showCertificateResult(code) {
  const normalizedCode = code.trim().toLowerCase();
  const record = certificates[normalizedCode];
  resultCard.replaceChildren();

  if (!record) {
    resultTitle.textContent = 'Certificate Not Found';
    statusBadge.textContent = 'Not Found';
    statusBadge.classList.add('invalid');
    const panel = document.createElement('div');
    panel.className = 'invalid-panel';
    const icon = document.createElement('div');
    icon.className = 'error-icon';
    icon.textContent = '!';
    const heading = document.createElement('h3');
    heading.textContent = 'No matching certificate';
    const message = document.createElement('p');
    message.textContent = 'We could not find a certificate with ID “' + code.trim() + '”. Check the code and try again.';
    panel.append(icon, heading, message);
    resultCard.appendChild(panel);
  } else {
    resultTitle.textContent = 'Certificate Result';
    statusBadge.textContent = 'Record Found';
    statusBadge.classList.remove('invalid');
    addResultRow('Student Name', record.studentName);
    addResultRow('Domain', record.domain);
    addResultRow('Duration', record.duration);
    addResultRow('Certification No', record.certificateNo);
    addResultRow('Starting Date', record.startingDate);
    addResultRow('Award Date', record.awardDate);
  }
  showPage('result');
}

form.addEventListener('submit', (event) => {
  event.preventDefault();
  const code = codeInput.value.trim();
  if (!code) {
    searchError.classList.remove('hidden');
    codeInput.focus();
    return;
  }
  searchError.classList.add('hidden');
  showCertificateResult(code);
});
codeInput.addEventListener('input', () => searchError.classList.add('hidden'));
menuButton.addEventListener('click', () => {
  const open = navLinks.classList.toggle('open');
  menuButton.setAttribute('aria-expanded', String(open));
});

// Support direct QR links such as https://your-site.example/#verify?code=83610f2
function openFromUrl() {
  const hash = window.location.hash;
  const match = hash.match(/code=([^&]+)/i);
  if (match) {
    let code = '';
    try { code = decodeURIComponent(match[1]); } catch (_) { code = match[1]; }
    codeInput.value = code;
    showCertificateResult(code);
  } else if (hash.startsWith('#verify')) {
    showPage('verify');
  } else {
    showPage('home');
  }
}
window.addEventListener('hashchange', openFromUrl);
openFromUrl();
