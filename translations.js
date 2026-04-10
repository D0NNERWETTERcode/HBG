// HBG Language Switcher – Google Translate Integration
function googleTranslateElementInit() {
  new google.translate.TranslateElement({
    pageLanguage: 'de',
    includedLanguages: 'en,sq,ar,fr,it,pl,ru,es,tr',
    autoDisplay: false
  }, 'google_translate_element');
}

function toggleLangMenu(e) {
  e.stopPropagation();
  var dd = document.getElementById('lang-dropdown');
  dd.classList.toggle('hidden');
}

function setLang(langCode, label) {
  var currentLang = localStorage.getItem('hbg-lang') || 'de';

  // Update button label
  var btn = document.getElementById('lang-btn-label');
  if (btn) btn.textContent = label;

  var dd = document.getElementById('lang-dropdown');
  if (dd) dd.classList.add('hidden');

  try {
    localStorage.setItem('hbg-lang', langCode);
    localStorage.setItem('hbg-lang-label', label);
  } catch(e) {}

  if (langCode === 'de') {
    if (currentLang !== 'de') {
      document.cookie = 'googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
      document.cookie = 'googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=' + window.location.hostname;
      window.location.reload();
    }
    return;
  }

  var select = document.querySelector('.goog-te-combo');
  if (select) {
    select.value = langCode;
    var evt = document.createEvent('HTMLEvents');
    evt.initEvent('change', false, true);
    select.dispatchEvent(evt);
  }
}

// Close dropdown on outside click
document.addEventListener('click', function (e) {
  var wrap = document.getElementById('lang-switcher-wrap');
  if (wrap && !wrap.contains(e.target)) {
    var dd = document.getElementById('lang-dropdown');
    if (dd) dd.classList.add('hidden');
  }
});

// Restore saved language on page load
window.addEventListener('load', function () {
  try {
    var lang  = localStorage.getItem('hbg-lang');
    var label = localStorage.getItem('hbg-lang-label');
    var btn   = document.getElementById('lang-btn-label');
    if (lang && label && btn && lang !== 'de') {
      btn.textContent = label;
      // Wait for Google Translate to initialize
      setTimeout(function () { setLang(lang, label); }, 1800);
    }
  } catch(e) {}
});
