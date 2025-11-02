// Common JS for navigation, year, and dynamic content rendering
(function(){
  document.getElementById('year') && (document.getElementById('year').textContent = new Date().getFullYear());

  const page = document.body.getAttribute('data-page');
  initTheme();
  initAuth();
  initSearch();
  initI18n();
  if(page === 'technologies') { loadTechnologies(); loadTalkSections(); }
  if(page === 'brands') loadBrands();
  if(page === 'people') loadPeople();
  if(page === 'history') loadHistory();
  if(page === 'gallery') loadGallery();
  if(page === 'automotive') loadAutomotiveTimeline();
  initInteractivity();

  async function fetchJSON(path){
    const res = await fetch(path);
    return res.json();
  }

  // -------------------- Global Search --------------------
  function initSearch(){
    // Create search button
    let btn = document.getElementById('globalSearchBtn');
    if(!btn){
      btn = document.createElement('button');
      btn.id = 'globalSearchBtn';
      btn.className = 'search-btn';
      btn.textContent = 'Search';
      const wrap = document.querySelector('.header-inner .header-actions');
      wrap && wrap.appendChild(btn);
    }

    // Create modal structure once
    let modal = document.getElementById('searchModal');
    if(!modal){
      modal = document.createElement('div');
      modal.id = 'searchModal';
      modal.className = 'search-modal';
      modal.innerHTML = `
        <div class="search-panel">
          <div class="search-header">
            <input id="searchInput" class="search-input" placeholder="Search Germany: technologies, brands, people, history..." />
            <button id="searchClose" class="btn">Close</button>
          </div>
          <div id="searchResults" class="search-results"></div>
        </div>`;
      document.body.appendChild(modal);
    }

    btn.onclick = openSearch;
    document.getElementById('searchClose').onclick = closeSearch;
    document.getElementById('searchInput').addEventListener('input', debounce(doSearch, 150));

    // Keyboard shortcuts
    window.addEventListener('keydown', (e)=>{
      if(e.key === '/' && !isTypingInInput(e)) { e.preventDefault(); openSearch(); }
      if(e.key === 'Escape') closeSearch();
    });

    async function openSearch(){
      modal.classList.add('open');
      const input = document.getElementById('searchInput');
      input.value = '';
      await ensureDatasetLoaded();
      input.focus();
      renderResults([]);
    }
    function closeSearch(){ modal.classList.remove('open'); }

    let dataset = null;
    async function ensureDatasetLoaded(){
      if(dataset) return;
      const [brands, people, history, auto, talk] = await Promise.all([
        fetchSafe('data/brands.json'),
        fetchSafe('data/people.json'),
        fetchSafe('data/history.json'),
        fetchSafe('data/automotive.json'),
        fetchSafe('data/talk.json')
      ]);
      const sectors = [
        {title:'Printing Press',desc:'Gutenberg’s Buchdruck transformed knowledge (1440).', link:'technologies.html'},
        {title:'X-rays & Optics',desc:'Röntgen and modern imaging technologies.', link:'technologies.html'},
        {title:'Automotive',desc:'From Benz to electric mobility and safety.', link:'automotive.html'},
        {title:'Diesel Engine',desc:'Rudolf Diesel revolutionized transport.', link:'technologies.html'},
        {title:'Industry 4.0',desc:'AI, robotics, and smart factories.', link:'technologies.html'},
        {title:'Renewable Energy',desc:'Wind, solar, and grid tech by Siemens Energy.', link:'technologies.html'},
        {title:'Aerospace',desc:'From Junkers to modern aviation.', link:'technologies.html'},
        {title:'Semiconductors & MP3',desc:'Chips and audio innovations from German labs.', link:'technologies.html'}
      ];
      const I18N = {
        en: {
          'home.hero_title':'German Engineering and Innovation',
          'home.hero_subtitle':'The Power of Precision and Creativity',
          'home.cta_login':'Enter via Lamp Login',
          'home.cta_explore':'Explore Overview',
          'home.intro_title':'Introduction',
          'home.card_tech_title':'Technologies',
          'home.card_tech_desc':'From printing press to Industry 4.0 and renewables.',
          'home.card_explore':'Explore',
          'home.card_auto_title':'Automotive Evolution',
          'home.card_auto_desc':'Benz to EVs with safety, quality, and performance.',
          'home.card_view_timeline':'View Timeline',
          'home.card_people_title':'People & Brands',
          'home.card_people_desc':'Engineers, scientists, and world-leading companies.',
          'home.card_meet':'Meet the Pioneers',
          'home.mig_title':'Why "Made in Germany" Matters',
          'home.discover_title':'Discover German Wonders',
          'common.technologies':'Technologies',
          'common.automotive':'Automotive Evolution',
          'common.brands':'Leading Brands',
          'common.people':'Scientists & Engineers',
          'common.history':'Germany History',
          'common.gallery':'Gallery'
        },
        de: {
          'home.hero_title':'Deutsche Ingenieurkunst und Innovation',
          'home.hero_subtitle':'Die Kraft von Präzision und Kreativität',
          'home.cta_login':'Mit Lampe einloggen',
          'home.cta_explore':'Überblick erkunden',
          'home.intro_title':'Einführung',
          'home.card_tech_title':'Technologien',
          'home.card_tech_desc':'Vom Buchdruck bis Industrie 4.0 und erneuerbaren Energien.',
          'home.card_explore':'Erkunden',
          'home.card_auto_title':'Automobilentwicklung',
          'home.card_auto_desc':'Von Benz bis EVs – Sicherheit, Qualität, Leistung.',
          'home.card_view_timeline':'Zeitleiste ansehen',
          'home.card_people_title':'Menschen & Marken',
          'home.card_people_desc':'Ingenieure, Wissenschaftler und Weltunternehmen.',
          'home.card_meet':'Die Pioniere',
          'home.mig_title':'Warum „Made in Germany" zählt',
          'home.discover_title':'Entdecke deutsche Wunder',
          'common.technologies':'Technologien',
          'common.automotive':'Automobilentwicklung',
          'common.brands':'Führende Marken',
          'common.people':'Wissenschaftler & Ingenieure',
          'common.history':'Deutsche Geschichte',
          'common.gallery':'Galerie'
        }
      };
      dataset = [];
      (brands||[]).forEach(b=> dataset.push({type:'Brand', title:b.name, text:(b.description||''), link:'brands.html'}));
      (people||[]).forEach(p=> dataset.push({type:'Person', title:p.name, text:p.bio||'', link:'people.html'}));
      (history||[]).forEach(h=> dataset.push({type:'History', title:h.period, text:h.summary||'', link:'history.html'}));
      (auto||[]).forEach(a=> dataset.push({type:'Automotive', title:String(a.year)+' – '+a.title, text:a.text||'', link:'automotive.html'}));
      (talk||[]).forEach(t=> dataset.push({type:'Talk', title:t.title, text:t.content||'', link:'technologies.html'}));
      sectors.forEach(s=> dataset.push({type:'Technology', title:s.title, text:s.desc, link:s.link}));
    }

    async function doSearch(){
      const q = document.getElementById('searchInput').value.trim().toLowerCase();
      if(!q){ renderResults([]); return; }
      await ensureDatasetLoaded();
      const results = dataset.filter(item =>
        (item.title && item.title.toLowerCase().includes(q)) ||
        (item.text && item.text.toLowerCase().includes(q))
      ).slice(0, 30);
      renderResults(results);
    }

    function renderResults(items){
      const box = document.getElementById('searchResults');
      box.innerHTML = '';
      if(!items.length){ box.innerHTML = '<div class="search-item"><em>No results yet. Try typing a keyword…</em></div>'; return; }
      for(const it of items){
        const el = document.createElement('a');
        el.href = it.link;
        el.className = 'search-item';
        el.innerHTML = `<h4>${escapeHtml(it.title)} <span style="color:var(--muted);font-weight:400">• ${it.type}</span></h4><p>${escapeHtml(it.text)}</p>`;
        box.appendChild(el);
      }
    }

    function fetchSafe(url){ return fetch(url).then(r=> r.ok ? r.json() : []).catch(()=> []); }
    function debounce(fn, ms){ let t; return (...a)=>{ clearTimeout(t); t=setTimeout(()=>fn.apply(this,a), ms); }; }
    function isTypingInInput(e){ const a = e.target; return a && (a.tagName==='INPUT' || a.tagName==='TEXTAREA' || a.isContentEditable); }
    function escapeHtml(str=''){ return str.replace(/[&<>"']/g, s=>({"&":"&amp;","<":"&lt;",">":"&gt;","\"":"&quot;","'":"&#39;"}[s])); }
  }

  // -------------------- Theme System --------------------
  function initTheme(){
    const saved = localStorage.getItem('theme') || 'light';
    applyTheme(saved);
    // Ensure toggle exists
    let toggle = document.getElementById('themeToggle');
    if(!toggle){
      toggle = document.createElement('button');
      toggle.id = 'themeToggle';
      toggle.className = 'theme-toggle';
      const wrap = document.querySelector('.header-inner .header-actions');
      wrap && wrap.prepend(toggle);
    }
    setToggleLabel(toggle);
    toggle.onclick = () => {
      const order = ['light','dark','flag'];
      const current = document.documentElement.getAttribute('data-theme') || 'light';
      const next = order[(order.indexOf(current) + 1) % order.length];
      applyTheme(next);
      localStorage.setItem('theme', next);
      setToggleLabel(toggle);
    };
  }

  function setToggleLabel(btn){
    const t = document.documentElement.getAttribute('data-theme') || 'light';
    const label = t === 'light' ? 'Theme: Light' : t === 'dark' ? 'Theme: Dark' : 'Theme: Flag';
    btn.textContent = label;
  }

  function applyTheme(theme){
    document.documentElement.setAttribute('data-theme', theme);
  }

  // -------------------- Interactivity (reveal, ripple, tilt) --------------------
  function initInteractivity(){
    // Reveal on scroll
    const revealEls = Array.from(document.querySelectorAll('.card, .tech-card, .brand-card, .person-card, .timeline-item'));
    revealEls.forEach(el => el.classList.add('reveal'));
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if(entry.isIntersecting){ entry.target.classList.add('revealed'); io.unobserve(entry.target); }
      });
    }, {threshold: 0.1});
    revealEls.forEach(el => io.observe(el));

    // Ripple on buttons and interactive cards
    function addRipple(e){
      const target = e.currentTarget;
      const rect = target.getBoundingClientRect();
      const ripple = document.createElement('span');
      ripple.className = 'ripple-effect';
      const size = Math.max(rect.width, rect.height);
      ripple.style.width = ripple.style.height = size + 'px';
      const x = e.clientX - rect.left - size/2;
      const y = e.clientY - rect.top - size/2;
      ripple.style.left = x + 'px';
      ripple.style.top = y + 'px';
      target.appendChild(ripple);
      setTimeout(()=> ripple.remove(), 600);
    }
    document.querySelectorAll('.btn, .interactive').forEach(el => {
      el.style.position = el.style.position || 'relative';
      el.addEventListener('click', addRipple);
    });

    // Subtle tilt on interactive cards
    document.querySelectorAll('.interactive').forEach(card => {
      card.addEventListener('mousemove', (e) => {
        const r = card.getBoundingClientRect();
        const px = (e.clientX - r.left) / r.width - 0.5;
        const py = (e.clientY - r.top) / r.height - 0.5;
        card.style.transform = `perspective(600px) rotateX(${-py * 4}deg) rotateY(${px * 6}deg) translateY(-3px)`;
      });
      card.addEventListener('mouseleave', () => {
        card.style.transform = '';
      });
    });

    // Detail modal for brands and people
    initDetails();
  }

  function initDetails(){
    let modal = document.getElementById('detailModal');
    if(!modal){
      modal = document.createElement('div');
      modal.id = 'detailModal';
      modal.className = 'detail-modal';
      modal.innerHTML = `
        <div class="detail-panel">
          <div class="detail-header">
            <h3 id="detailTitle"></h3>
            <button id="detailClose" class="detail-close">Close</button>
          </div>
          <div id="detailBody" class="detail-body"></div>
        </div>`;
      document.body.appendChild(modal);
      document.getElementById('detailClose').onclick = ()=> modal.classList.remove('open');
      modal.addEventListener('click', (e)=>{ if(e.target===modal) modal.classList.remove('open'); });
    }

    const brandGrid = document.getElementById('brandGrid');
    if(brandGrid){
      brandGrid.addEventListener('click', async (e)=>{
        const card = e.target.closest('.brand-card');
        if(!card) return;
        const name = card.querySelector('h3')?.textContent || 'Brand';
        const img = card.querySelector('img')?.outerHTML || '';
        openDetail(name, `${img}<p>${card.querySelector('p')?.textContent||''}</p>`);
      });
    }
    const peopleList = document.getElementById('peopleList');
    if(peopleList){
      peopleList.addEventListener('click', (e)=>{
        const card = e.target.closest('.person-card');
        if(!card) return;
        const title = card.querySelector('h3')?.textContent || 'Profile';
        openDetail(title, card.innerHTML);
      });
    }

    function openDetail(title, html){
      document.getElementById('detailTitle').textContent = title;
      document.getElementById('detailBody').innerHTML = html;
      document.getElementById('detailModal').classList.add('open');
    }
  }

  // -------------------- Auth & Navigation Guard (backend session) --------------------
  async function getAuthStatus(){
    try{ const res = await fetch('/api/status', {credentials:'include'}); const j = await res.json(); return !!j.authed; }catch(e){ return false; }
  }

  async function initAuth(){
    const authed = await getAuthStatus();
    
    // Show/hide home page sections based on auth
    if(document.body.getAttribute('data-page') === 'home'){
      const before = document.getElementById('beforeLogin');
      const after = document.getElementById('afterLogin');
      if(before && after){
        if(authed){
          before.classList.add('hidden');
          after.classList.remove('hidden');
        } else {
          before.classList.remove('hidden');
          after.classList.add('hidden');
        }
      }
    }
    
    // Protect all pages except home and login
    const publicPages = ['home','login'];
    const current = document.body.getAttribute('data-page');
    // Server already redirects protected pages; this is just a client-side fallback/UX guard

    // Lock all protected links across the page if not logged in
    const protectedHrefs = ['technologies.html','automotive.html','brands.html','people.html','history.html','gallery.html','contact.html'];
    document.querySelectorAll('a[href]')?.forEach(a => {
      const href = a.getAttribute('href');
      if(!href) return;
      if(protectedHrefs.includes(href)){
        if(!authed){
          a.classList.add('locked');
          a.addEventListener('click', (e)=>{
            e.preventDefault();
            window.location.href = 'login.html?next=' + encodeURIComponent(href);
          });
        } else {
          a.classList.remove('locked');
        }
      }
    });

    // Inject/Update auth control (Login/Logout)
    let ctrl = document.getElementById('authCtrlBtn');
    if(!ctrl){
      ctrl = document.createElement('button');
      ctrl.id = 'authCtrlBtn';
      ctrl.className = 'btn primary';
      const header = document.querySelector('.header-inner .header-actions');
      header && header.appendChild(ctrl);
    }
    if(authed){
      ctrl.textContent = 'Logout';
      ctrl.onclick = async ()=>{ try{ await fetch('/api/logout', {method:'POST', credentials:'include'});}catch(_){} window.location.href = 'index.html'; };
    } else {
      ctrl.textContent = 'Start';
      ctrl.onclick = ()=>{ window.location.href = 'login.html'; };
    }
  }

  // -------------------- Talk Sections (no speaker names) --------------------
  async function loadTalkSections(){
    try{
      const data = await fetchJSON('data/talk.json');
      const wrap = document.getElementById('talkSections');
      if(!wrap) return;
      data.forEach(sec=>{
        const el = document.createElement('div');
        el.className = 'card';
        el.innerHTML = `
          <h3>${sec.title}</h3>
          <p>${sec.content}</p>
        `;
        wrap.appendChild(el);
      });
    } catch(e){ console.error(e); }
  }

  async function loadTechnologies(){
    const sectors = [
      {title:'Printing Press',desc:'Gutenberg’s Buchdruck transformed knowledge (1440).'},
      {title:'X-rays & Optics',desc:'Röntgen and modern imaging technologies.'},
      {title:'Automotive',desc:'From Benz to electric mobility and safety.'},
      {title:'Diesel Engine',desc:'Rudolf Diesel revolutionized transport.'},
      {title:'Industry 4.0',desc:'AI, robotics, and smart factories.'},
      {title:'Renewable Energy',desc:'Wind, solar, and grid tech by Siemens Energy.'},
      {title:'Aerospace',desc:'From Junkers to modern aviation.'},
      {title:'Semiconductors & MP3',desc:'Chips and audio innovations from German labs.'}
    ];
    const wrap = document.getElementById('techSectors');
    sectors.forEach(s=>{
      const el = document.createElement('div');
      el.className = 'tech-card interactive';
      el.tabIndex = 0;
      el.innerHTML = `<h3>${s.title}</h3><p>${s.desc}</p>`;
      wrap.appendChild(el);
    });
  }

  async function loadBrands(){
    const data = await fetchJSON('data/brands.json');
    const grid = document.getElementById('brandGrid');
    data.forEach(b=>{
      const card = document.createElement('a');
      card.href = '#';
      card.className = 'brand-card';
      card.innerHTML = `
        <img class="brand-logo" src="${b.logo}" alt="${b.name} logo"/>
        <h3>${b.name}</h3>
        <p>${b.description}</p>
      `;
      grid.appendChild(card);
    });
  }

  async function loadPeople(){
    const data = await fetchJSON('data/people.json');
    const grid = document.getElementById('peopleList');
    data.forEach(p=>{
      const card = document.createElement('div');
      card.className = 'person-card';
      card.innerHTML = `
        <h3>${p.name}</h3>
        <p><strong>${p.role}</strong> (${p.lifespan})</p>
        <p>${p.bio}</p>
      `;
      grid.appendChild(card);
    });
  }

  async function loadHistory(){
    const data = await fetchJSON('data/history.json');
    const wrap = document.getElementById('historyTimeline');
    data.forEach(item=>{
      const el = document.createElement('div');
      el.className = 'timeline-item';
      el.innerHTML = `<h3>${item.period}</h3><p>${item.summary}</p>`;
      wrap.appendChild(el);
    });
  }

  async function loadGallery(){
    const data = await fetchJSON('data/brands.json');
    const grid = document.getElementById('galleryGrid');
    data.forEach(b=>{
      const card = document.createElement('div');
      card.className = 'card';
      card.innerHTML = `<img src="${b.logo}" alt="${b.name}"><p style="color:#b2b2c7">${b.name}</p>`;
      grid.appendChild(card);
    });
  }

  async function loadAutomotiveTimeline(){
    const data = await fetchJSON('data/automotive.json');
    const grid = document.getElementById('autoTimeline');
    data.forEach(ev=>{
      const el = document.createElement('div');
      el.className = 'timeline-item';
      el.innerHTML = `<h3>${ev.year} – ${ev.title}</h3><p>${ev.text}</p>`;
      grid.appendChild(el);
    });
  }
})();
