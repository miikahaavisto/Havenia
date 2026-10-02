(function () {
  var GA_ID = 'G-TB6SLCV68S';
  var KEY = 'havenia_consent';
  var loaded = false;
  var dlg = null, statusEl = null;

  function loadGA() {
    if (loaded) return;
    loaded = true;
    window['ga-disable-' + GA_ID] = false;
    var s = document.createElement('script');
    s.async = true;
    s.src = 'https://www.googletagmanager.com/gtag/js?id=' + GA_ID;
    document.head.appendChild(s);
    window.dataLayer = window.dataLayer || [];
    function gtag() { dataLayer.push(arguments); }
    window.gtag = gtag;
    gtag('js', new Date());
    gtag('config', GA_ID, { anonymize_ip: true });
  }

  // Kun seuranta hylätään: sammutetaan seuranta ja poistetaan GA-evästeet
  function dropGA() {
    window['ga-disable-' + GA_ID] = true;
    var names = ['_ga', '_ga_' + GA_ID.replace('G-', '')];
    var host = location.hostname, parts = host.split('.');
    var domains = ['', host, '.' + host];
    if (parts.length > 2) domains.push('.' + parts.slice(-2).join('.'));
    names.forEach(function (n) {
      domains.forEach(function (d) {
        document.cookie = n + '=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/' + (d ? '; domain=' + d : '');
      });
    });
  }

  // Lähettää GA-tapahtuman vain jos seuranta on hyväksytty
  window.haveniaTrack = function (name, params) {
    if (typeof window.gtag === 'function') {
      window.gtag('event', name, params || {});
    }
  };

  function getChoice() {
    try { return localStorage.getItem(KEY); } catch (e) { return null; }
  }
  function setChoice(v) {
    try { localStorage.setItem(KEY, v); } catch (e) {}
  }

  function removeBanner() {
    var b = document.getElementById('havenia-consent');
    if (b && b.parentNode) b.parentNode.removeChild(b);
  }

  function choose(v) {
    setChoice(v);
    if (v === 'granted') loadGA(); else dropGA();
    removeBanner();
    updateStatus();
  }

  function updateStatus() {
    if (!statusEl) return;
    var c = getChoice();
    statusEl.textContent = 'Nykyinen valinta: ' + (c === 'granted' ? 'seuranta hyväksytty' : c === 'denied' ? 'seuranta hylätty' : 'ei valintaa');
  }

  function injectStyles() {
    if (document.getElementById('havenia-consent-style')) return;
    var css = ''
      + '#havenia-consent{position:fixed;left:24px;right:24px;bottom:24px;z-index:12000;max-width:760px;margin:0 auto;'
      + 'background:var(--dark,#2d2930);color:var(--cream,#efedea);border:1px solid rgba(200,191,176,0.15);'
      + 'padding:24px 30px;display:flex;align-items:center;gap:28px;flex-wrap:wrap;'
      + 'box-shadow:0 12px 50px rgba(0,0,0,0.45);font-family:"Cormorant Garamond",serif;'
      + 'animation:hcUp .5s ease;}'
      + '@keyframes hcUp{from{opacity:0;transform:translateY(16px);}to{opacity:1;transform:translateY(0);}}'
      + '#havenia-consent .hc-text{flex:1;min-width:240px;font-size:16px;line-height:1.65;font-style:italic;color:rgba(200,191,176,0.75);}'
      + '#havenia-consent .hc-actions,.hc-dialog .hc-actions{display:flex;gap:12px;flex-shrink:0;flex-wrap:wrap;}'
      + '.hc-btn{font-family:"Cormorant Garamond",serif;cursor:pointer;font-size:12px;letter-spacing:0.2em;'
      + 'text-transform:uppercase;padding:13px 28px;border:none;transition:background .3s,color .3s,border-color .3s;}'
      + '.hc-accept{background:var(--accent,#8B7355);color:var(--cream,#efedea);}'
      + '.hc-accept:hover{background:#7a6448;}'
      + '.hc-decline{background:transparent;color:rgba(200,191,176,0.6);border:1px solid rgba(200,191,176,0.25);}'
      + '.hc-decline:hover{color:var(--cream,#efedea);border-color:var(--stone,#C8BFB0);}'
      + '.hc-link{background:none;border:0;padding:0;font:inherit;letter-spacing:inherit;text-transform:inherit;color:inherit;'
      + 'cursor:pointer;text-decoration:underline;text-underline-offset:3px;text-decoration-color:rgba(200,191,176,0.35);transition:color .3s;}'
      + '.hc-link:hover{color:var(--cream,#efedea);}'
      + '#havenia-consent .hc-link{color:var(--stone,#C8BFB0);}'
      + 'footer .hc-link{color:rgba(200,191,176,0.5);}footer .hc-link:hover{color:var(--cream,#efedea);}'
      + '.hc-sep{margin:0 10px;opacity:.6;}'
      + 'dialog.hc-dialog{margin:auto;background:var(--dark,#2d2930);color:var(--cream,#efedea);border:1px solid rgba(200,191,176,0.2);'
      + 'padding:40px;width:calc(100% - 32px);max-width:640px;max-height:calc(100vh - 32px);overflow-y:auto;font-family:"Cormorant Garamond",serif;'
      + 'box-shadow:0 12px 50px rgba(0,0,0,0.45);}'
      + 'dialog.hc-dialog::backdrop{background:rgba(20,18,22,0.78);}'
      + '.hc-dialog h2{font-weight:300;font-size:30px;line-height:1.2;margin:0 0 18px;color:var(--cream,#efedea);}'
      + '.hc-dialog p{font-size:17px;line-height:1.65;margin:0 0 12px;color:rgba(200,191,176,0.75);}'
      + '.hc-dialog p.hc-status{font-style:italic;color:var(--cream,#efedea);margin-top:18px;}'
      + '.hc-dialog .hc-actions{margin-top:20px;}'
      + '@media (max-width:600px){#havenia-consent{flex-direction:column;align-items:stretch;gap:18px;padding:22px 22px;left:12px;right:12px;bottom:12px;}'
      + '#havenia-consent .hc-actions{justify-content:stretch;}#havenia-consent .hc-btn{flex:1;}'
      + 'dialog.hc-dialog{padding:28px 22px;}.hc-dialog .hc-btn{flex:1;padding:13px 16px;}}';
    var st = document.createElement('style');
    st.id = 'havenia-consent-style';
    st.textContent = css;
    document.head.appendChild(st);
  }

  function el(tag, cls, text) {
    var e = document.createElement(tag);
    if (cls) e.className = cls;
    if (text) e.textContent = text;
    return e;
  }
  function btn(label, cls, fn) {
    var b = el('button', 'hc-btn ' + cls, label);
    b.type = 'button';
    b.onclick = fn;
    return b;
  }

  function buildDialog() {
    if (dlg) return dlg;
    injectStyles();
    dlg = el('dialog', 'hc-dialog');
    dlg.setAttribute('aria-labelledby', 'hc-title');
    var h = el('h2', '', 'Tietosuoja ja evästeet');
    h.id = 'hc-title';
    dlg.appendChild(h);
    [
      'Sivusto käyttää Google Analytics -palvelua kävijämäärien ja sivuston käytön seuraamiseen. Seuranta alkaa vasta, kun hyväksyt sen, ja voit muuttaa valintaasi milloin tahansa tästä.',
      'Seuranta asettaa selaimeesi evästeitä ja kerää tilastotietoa: käytetty laite ja selain, likimääräinen sijainti (maa ja kaupunki), katsotut sivut ja vierailun kesto. Google Analytics 4 ei tallenna IP-osoitteita. Tietoja ei käytetä yksittäisen kävijän tunnistamiseen.',
      'Sivuston lomakkeilla (yhteydenotto, kohde-ehdotus ja sisäpiiriin liittyminen) antamasi tiedot, kuten nimi, sähköpostiosoite, puhelinnumero ja viesti, lähetetään sähköpostitse Havenialle ja niitä käytetään vain yhteydenottoon.',
      'Rekisterinpitäjä on Havenia, info@havenia.fi. Analytics-tietojen käsittelijänä toimii Google. Voit pyytää tietojasi koskevia oikeuksia sähköpostitse.'
    ].forEach(function (t) { dlg.appendChild(el('p', '', t)); });
    statusEl = el('p', 'hc-status');
    dlg.appendChild(statusEl);
    var act = el('div', 'hc-actions');
    act.appendChild(btn('Hyväksy seuranta', 'hc-accept', function () { choose('granted'); }));
    act.appendChild(btn('Hylkää seuranta', 'hc-decline', function () { choose('denied'); }));
    act.appendChild(btn('Sulje', 'hc-decline', function () { dlg.close(); }));
    dlg.appendChild(act);
    dlg.addEventListener('click', function (e) { if (e.target === dlg) dlg.close(); });
    document.body.appendChild(dlg);
    return dlg;
  }

  function openDialog() {
    buildDialog();
    updateStatus();
    if (typeof dlg.showModal === 'function') dlg.showModal(); else dlg.setAttribute('open', '');
  }

  function showBanner() {
    injectStyles();
    var wrap = el('div');
    wrap.id = 'havenia-consent';
    wrap.setAttribute('role', 'dialog');
    wrap.setAttribute('aria-label', 'Evästesuostumus');

    var text = el('div', 'hc-text', 'Havenia käyttää evästeitä kävijätilastointiin, jotta voimme kehittää sivustoa. Voit hyväksyä tai hylätä seurannan. ');
    var more = el('button', 'hc-link', 'Lue lisää');
    more.type = 'button';
    more.onclick = openDialog;
    text.appendChild(more);

    var actions = el('div', 'hc-actions');
    actions.appendChild(btn('Hyväksy', 'hc-accept', function () { choose('granted'); }));
    actions.appendChild(btn('Hylkää', 'hc-decline', function () { choose('denied'); }));

    wrap.appendChild(text);
    wrap.appendChild(actions);
    document.body.appendChild(wrap);
  }

  // Alatunnisteen linkki, josta seloste ja valinnan muutos aukeavat
  function addFooterLink() {
    var targets = document.querySelectorAll('.footer-copy');
    if (!targets.length) return;
    injectStyles();
    Array.prototype.forEach.call(targets, function (t) {
      if (t.querySelector('.hc-link')) return;
      t.appendChild(el('span', 'hc-sep', '·'));
      var b = el('button', 'hc-link', 'Tietosuoja ja evästeet');
      b.type = 'button';
      b.onclick = openDialog;
      t.appendChild(b);
    });
  }

  function init() {
    addFooterLink();
    var choice = getChoice();
    if (choice === 'granted') loadGA();
    else if (choice !== 'denied') showBanner();
  }

  if (getChoice() === 'granted') loadGA();

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
