// Loader + reveal
window.addEventListener('load', ()=> document.getElementById('loading')?.classList.add('hidden'));
const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting)e.target.classList.add('visible')}),{threshold:.15});
document.querySelectorAll('.reveal').forEach(el=>io.observe(el));

// i18n EN/IT
const dict={
  en:{nav_home:"Home",nav_tours:"Tours",nav_book:"Book",hero_h1:"Ride Rome on a Vespa",hero_p:"Pick a tour, book, and ride.",tours_title:"Our Tours",book_title:"Book Your Vespa Tour",book_hint:"Pick a date, add details, then pay (demo).",pay_stripe:"Pay (Demo)",pay_paypal:"Pay (Demo)",my_title:"My Bookings",my_note:"Your device-stored bookings are shown below.",opt_90:"90 minute — €30",opt_180:"180 minute — €60",hero_sub:"Simple. Powerful. Yours.",cta_reserve:"Reserve",cta_browse:"Browse Tours",why_title:"Why Vespa Tours?",why_text:"Local guides, safe scooters, special routes and great memories."},
  it:{nav_home:"Home",nav_tours:"Tour",nav_book:"Prenota",hero_h1:"Scopri Roma in Vespa",hero_p:"Scegli un tour, prenota e parti.",tours_title:"I Nostri Tour",book_title:"Prenota il tuo Tour in Vespa",book_hint:"Scegli una data, inserisci i dettagli, poi paga (demo).",pay_stripe:"Paga (Demo)",pay_paypal:"Paga (Demo)",my_title:"Le mie prenotazioni",my_note:"Le prenotazioni memorizzate sul tuo dispositivo sono elencate qui.",opt_90:"90 minuti — €30",opt_180:"180 minuti — €60",hero_sub:"Semplice. Potente. Tua.",cta_reserve:"Prenota",cta_browse:"Scopri i Tour",why_title:"Perché Vespa Tours?",why_text:"Guide locali, scooter sicuri, percorsi speciali e grandi ricordi."},hero_sub:"Simple. Powerful. Yours.",cta_reserve:"Reserve",cta_browse:"Browse Tours",why_title:"Why Vespa Tours?",why_text:"Local guides, safe scooters, special routes."
};
window.__DICT = dict;
function setLang(lang){
  try {
    localStorage.setItem('lang',lang);
    document.documentElement.setAttribute('lang', lang);
    const d = window.__DICT || {};
    document.querySelectorAll('[data-i18n]').forEach(el=>{
      const k = el.getAttribute('data-i18n');
      if(d[lang] && typeof d[lang][k] !== 'undefined'){
        el.textContent = d[lang][k];
      }
    });
    document.querySelectorAll('[data-i18n-placeholder]').forEach(el=>{
      const k = el.getAttribute('data-i18n-placeholder');
      if(d[lang] && typeof d[lang][k] !== 'undefined'){
        el.setAttribute('placeholder', d[lang][k]);
      }
    });
  } catch(e){ console.warn('i18n error', e); }
  try{ if(typeof window.onLangChange==='function'){ window.onLangChange(lang); } }catch(e){}
}
window.addEventListener('DOMContentLoaded',()=>{
  const current=localStorage.getItem('lang')||'en';
  setLang(current);
  document.getElementById('langEn')?.addEventListener('click',()=>setLang('en'));
  document.getElementById('langIt')?.addEventListener('click',()=>setLang('it'));
});

// Booking storage (localStorage)
function saveBooking(b){
  const key='vespa_bookings';
  const arr=JSON.parse(localStorage.getItem(key)||'[]');
  arr.push({...b, createdAt:new Date().toISOString(), provider:'demo'});
  localStorage.setItem(key, JSON.stringify(arr));
}
function getBookings(){ return JSON.parse(localStorage.getItem('vespa_bookings')||'[]'); }
function cancelBooking(createdAt){
  const key='vespa_bookings';
  const arr=JSON.parse(localStorage.getItem(key)||'[]');
  const next=arr.filter(b=>b.createdAt!==createdAt);
  localStorage.setItem(key, JSON.stringify(next));
}
function clearBookings(){ localStorage.setItem('vespa_bookings','[]'); }
window.VESPA_STORE={saveBooking,getBookings,cancelBooking,clearBookings};

// Theme (light/dark) handling
function setTheme(theme){
  localStorage.setItem('theme', theme);
  document.documentElement.classList.toggle('theme-dark', theme==='dark');
}
function initTheme(){
  const saved = localStorage.getItem('theme');
  const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  setTheme(saved || (prefersDark ? 'dark' : 'light'));
  const toggle = document.getElementById('themeToggle');
  toggle?.addEventListener('click', ()=>{
    const next = document.documentElement.classList.contains('theme-dark') ? 'light' : 'dark';
    setTheme(next);
    const ic = document.querySelector('#themeToggle .icon');
    if(ic) ic.textContent = next==='dark' ? '☀️' : '🌙';
  });
  const ic = document.querySelector('#themeToggle .icon');
  if(ic) ic.textContent = document.documentElement.classList.contains('theme-dark') ? '☀️' : '🌙';
}
window.addEventListener('DOMContentLoaded', initTheme);
