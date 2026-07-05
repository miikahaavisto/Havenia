(function () {
  var GA_ID = 'G-TB6SLCV68S';
  var KEY = 'havenia_consent';

  function loadGA() {
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
      + '#havenia-consent .hc-actions{display:flex;gap:12px;flex-shrink:0;}'
      + '#havenia-consent .hc-btn{font-family:"Cormorant Garamond",serif;cursor:pointer;font-size:12px;letter-spacing:0.2em;'
      + 'text-transform:uppercase;padding:13px 28px;border:none;transition:background .3s,color .3s,border-color .3s;}'
      + '#havenia-consent .hc-accept{background:var(--accent,#8B7355);color:var(--cream,#efedea);}'
      + '#havenia-consent .hc-accept:hover{background:#7a6448;}'
      + '#havenia-consent .hc-decline{background:transparent;color:rgba(200,191,176,0.6);border:1px solid rgba(200,191,176,0.25);}'
      + '#havenia-consent .hc-decline:hover{color:var(--cream,#efedea);border-color:var(--stone,#C8BFB0);}'
      + '@media (max-width:600px){#havenia-consent{flex-direction:column;align-items:stretch;gap:18px;padding:22px 22px;}'
      + '#havenia-consent .hc-actions{justify-content:stretch;}#havenia-consent .hc-btn{flex:1;}}';
    var st = document.createElement('style');
    st.id = 'havenia-consent-style';
    st.textContent = css;
    document.head.appendChild(st);
  }

  function showBanner() {
    injectStyles();
    var wrap = document.createElement('div');
    wrap.id = 'havenia-consent';
    wrap.setAttribute('role', 'dialog');
    wrap.setAttribute('aria-label', 'Evästesuostumus');

    var text = document.createElement('div');
    text.className = 'hc-text';
    text.textContent = 'Havenia käyttää evästeitä kävijätilastointiin, jotta voimme kehittää sivustoa. Voit hyväksyä tai hylätä seurannan.';

    var actions = document.createElement('div');
    actions.className = 'hc-actions';

    var accept = document.createElement('button');
    accept.className = 'hc-btn hc-accept';
    accept.type = 'button';
    accept.textContent = 'Hyväksy';
    accept.onclick = function () {
      setChoice('granted');
      removeBanner();
      loadGA();
    };

    var decline = document.createElement('button');
    decline.className = 'hc-btn hc-decline';
    decline.type = 'button';
    decline.textContent = 'Hylkää';
    decline.onclick = function () {
      setChoice('denied');
      removeBanner();
    };

    actions.appendChild(accept);
    actions.appendChild(decline);
    wrap.appendChild(text);
    wrap.appendChild(actions);
    document.body.appendChild(wrap);
  }

  var choice = getChoice();
  if (choice === 'granted') {
    loadGA();
  } else if (choice === 'denied') {
    // Ei seurantaa, ei banneria.
  } else {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', showBanner);
    } else {
      showBanner();
    }
  }
})();
