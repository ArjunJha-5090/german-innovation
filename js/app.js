// Production-Ready German Innovation Site
(function() {
  'use strict';

  // Initialize
  document.getElementById('year') && (document.getElementById('year').textContent = new Date().getFullYear());
  
  const page = document.body.getAttribute('data-page');
  
  // Initialize all systems
  initTheme();
  initAuth();
  initLanguage();
  
  // Load page-specific content
  if(page === 'technologies') loadTechnologies();
  if(page === 'automotive') loadAutomotive();
  if(page === 'brands') loadBrands();
  if(page === 'people') loadPeople();
  if(page === 'history') loadHistory();
  if(page === 'gallery') loadGallery();
  
  // ==================== THEME SYSTEM ====================
  function initTheme() {
    const saved = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', saved);
    
    let btn = document.getElementById('themeToggle');
    if(!btn) {
      btn = document.createElement('button');
      btn.id = 'themeToggle';
      btn.className = 'btn';
      const actions = document.querySelector('.header-actions');
      if(actions) actions.appendChild(btn);
    }
    
    updateThemeButton();
    btn.onclick = toggleTheme;
    
    function toggleTheme() {
      const current = document.documentElement.getAttribute('data-theme');
      const next = current === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', next);
      localStorage.setItem('theme', next);
      updateThemeButton();
    }
    
    function updateThemeButton() {
      const theme = document.documentElement.getAttribute('data-theme');
      btn.textContent = theme === 'dark' ? '☀️ Light' : '🌙 Dark';
    }
  }
  
  // ==================== LANGUAGE SYSTEM ====================
  function initLanguage() {
    const saved = localStorage.getItem('lang') || 'en';
    
    let btn = document.getElementById('langToggle');
    if(!btn) {
      btn = document.createElement('button');
      btn.id = 'langToggle';
      btn.className = 'btn';
      const actions = document.querySelector('.header-actions');
      if(actions) {
        // Insert before auth button
        const authBtn = document.getElementById('authBtn');
        if(authBtn) {
          actions.insertBefore(btn, authBtn);
        } else {
          actions.appendChild(btn);
        }
      }
    }
    
    updateLangButton();
    btn.onclick = toggleLang;
    
    function toggleLang() {
      const current = localStorage.getItem('lang') || 'en';
      const next = current === 'en' ? 'de' : 'en';
      localStorage.setItem('lang', next);
      updateLangButton();
      applyTranslations();
    }
    
    function updateLangButton() {
      const lang = localStorage.getItem('lang') || 'en';
      btn.textContent = lang === 'en' ? '🇩🇪 DE' : '🇬🇧 EN';
    }
    
    function applyTranslations() {
      const lang = localStorage.getItem('lang') || 'en';
      const translations = {
        en: {
          'hero_title': 'German Engineering and Innovation',
          'hero_subtitle': 'The Power of Precision and Creativity',
          'get_started': 'Get Started',
          'logout': 'Logout'
        },
        de: {
          'hero_title': 'Deutsche Ingenieurkunst und Innovation',
          'hero_subtitle': 'Die Kraft von Präzision und Kreativität',
          'get_started': 'Loslegen',
          'logout': 'Abmelden'
        }
      };
      
      // Apply translations to common elements
      const authBtn = document.getElementById('authBtn');
      if(authBtn && authBtn.textContent === 'Get Started') {
        authBtn.textContent = translations[lang].get_started;
      } else if(authBtn && authBtn.textContent === 'Logout') {
        authBtn.textContent = translations[lang].logout;
      }
    }
  }
  
  // ==================== AUTH SYSTEM ====================
  async function initAuth() {
    const authed = await getAuthStatus();
    
    // Create auth button
    let btn = document.getElementById('authBtn');
    if(!btn) {
      btn = document.createElement('button');
      btn.id = 'authBtn';
      btn.className = 'btn primary';
      const actions = document.querySelector('.header-actions');
      if(actions) actions.appendChild(btn);
    }
    
    if(authed) {
      btn.textContent = 'Logout';
      btn.onclick = logout;
    } else {
      btn.textContent = 'Get Started';
      btn.onclick = () => window.location.href = 'login.html';
    }
    
    // Show/hide home sections
    if(page === 'home') {
      const before = document.getElementById('beforeLogin');
      const after = document.getElementById('afterLogin');
      if(before && after) {
        before.classList.toggle('hidden', authed);
        after.classList.toggle('hidden', !authed);
      }
    }
  }
  
  async function getAuthStatus() {
    try {
      const res = await fetch('/api/status', {credentials: 'include'});
      const data = await res.json();
      return !!data.authed;
    } catch(e) {
      return false;
    }
  }
  
  async function logout() {
    try {
      await fetch('/api/logout', {method: 'POST', credentials: 'include'});
    } catch(e) {}
    window.location.href = 'index.html';
  }
  
  // ==================== DATA LOADING ====================
  async function fetchJSON(path) {
    try {
      const res = await fetch(path);
      return await res.json();
    } catch(e) {
      console.error('Failed to load:', path, e);
      return [];
    }
  }
  
  // Technologies Page
  async function loadTechnologies() {
    const talk = await fetchJSON('data/talk.json');
    const container = document.getElementById('talkSections');
    if(!container || !talk.length) return;
    
    container.innerHTML = '';
    talk.forEach(section => {
      const card = document.createElement('div');
      card.className = 'card fade-in';
      card.innerHTML = `
        <h3>${escapeHTML(section.title)}</h3>
        <p>${escapeHTML(section.content)}</p>
      `;
      container.appendChild(card);
    });
  }
  
  // Automotive Page
  async function loadAutomotive() {
    const data = await fetchJSON('data/automotive.json');
    const container = document.getElementById('autoTimeline');
    if(!container || !data.length) return;
    
    container.innerHTML = '';
    data.forEach(item => {
      const div = document.createElement('div');
      div.className = 'timeline-item fade-in';
      div.innerHTML = `
        <h3>${item.year} – ${escapeHTML(item.title)}</h3>
        <p>${escapeHTML(item.text)}</p>
      `;
      container.appendChild(div);
    });
  }
  
  // Brands Page
  async function loadBrands() {
    const data = await fetchJSON('data/brands.json');
    const container = document.getElementById('brandGrid');
    if(!container || !data.length) return;
    
    container.innerHTML = '';
    data.forEach(brand => {
      const card = document.createElement('div');
      card.className = 'card fade-in';
      card.innerHTML = `
        <img src="${brand.logo}" alt="${escapeHTML(brand.name)}" class="brand-logo" onerror="this.style.display='none'">
        <h3>${escapeHTML(brand.name)}</h3>
        <p>${escapeHTML(brand.description)}</p>
      `;
      container.appendChild(card);
    });
  }
  
  // People Page
  async function loadPeople() {
    const data = await fetchJSON('data/people.json');
    const container = document.getElementById('peopleList');
    if(!container || !data.length) return;
    
    container.innerHTML = '';
    data.forEach(person => {
      const card = document.createElement('div');
      card.className = 'card fade-in';
      card.innerHTML = `
        <h3>${escapeHTML(person.name)}</h3>
        <p><strong>${escapeHTML(person.role)}</strong> (${escapeHTML(person.lifespan)})</p>
        <p>${escapeHTML(person.bio)}</p>
      `;
      container.appendChild(card);
    });
  }
  
  // History Page
  async function loadHistory() {
    const data = await fetchJSON('data/history.json');
    const container = document.getElementById('historyTimeline');
    if(!container || !data.length) return;
    
    container.innerHTML = '';
    data.forEach(item => {
      const div = document.createElement('div');
      div.className = 'timeline-item fade-in';
      div.innerHTML = `
        <h3>${escapeHTML(item.period)}</h3>
        <p>${escapeHTML(item.summary)}</p>
      `;
      container.appendChild(div);
    });
  }
  
  // Gallery Page
  async function loadGallery() {
    const brands = await fetchJSON('data/brands.json');
    const container = document.getElementById('galleryGrid');
    if(!container || !brands.length) return;
    
    container.innerHTML = '';
    brands.forEach(brand => {
      const card = document.createElement('div');
      card.className = 'card text-center fade-in';
      card.innerHTML = `
        <img src="${brand.logo}" alt="${escapeHTML(brand.name)}" class="brand-logo" style="height: 80px; margin: 0 auto 1rem;" onerror="this.style.display='none'">
        <h4>${escapeHTML(brand.name)}</h4>
      `;
      container.appendChild(card);
    });
  }
  
  // ==================== UTILITIES ====================
  function escapeHTML(str) {
    const div = document.createElement('div');
    div.textContent = str || '';
    return div.innerHTML;
  }
  
})();
