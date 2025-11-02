// Enhanced Interactive Features
(function() {
  'use strict';

  const page = document.body.getAttribute('data-page');
  
  // Initialize enhancements based on page
  if(page === 'brands') initBrandModals();
  if(page === 'people') initPeopleModals();
  if(page === 'automotive' || page === 'history') initTimelineAnimations();
  if(page === 'dashboard') initDashboardFlip();
  
  // Enhanced language translation
  initFullTranslation();
  
  // Add back to dashboard button on content pages
  if(page !== 'home' && page !== 'login' && page !== 'dashboard') {
    addBackToDashboardButton();
  }
  
  // ==================== BRAND MODALS ====================
  async function initBrandModals() {
    const brands = await fetchJSON('data/brands.json');
    const grid = document.getElementById('brandGrid');
    if(!grid) return;
    
    // Create modal
    const modal = createModal('brandModal');
    
    // Add click handlers to brand cards
    grid.addEventListener('click', (e) => {
      const card = e.target.closest('.card');
      if(!card) return;
      
      const index = Array.from(grid.children).indexOf(card);
      const brand = brands[index];
      if(!brand) return;
      
      showBrandModal(brand, modal);
    });
  }
  
  function showBrandModal(brand, modal) {
    const content = `
      <div style="text-align: center;">
        <img src="${brand.logo}" alt="${brand.name}" style="max-width: 200px; height: auto; margin: 0 auto 1.5rem; display: block;" onerror="this.style.display='none'">
        <h2>${brand.name}</h2>
        <p style="font-size: 1.1rem; line-height: 1.8;">${brand.description}</p>
        <button onclick="document.getElementById('brandModal').classList.remove('open')" class="btn primary" style="margin-top: 1.5rem;">Close</button>
      </div>
    `;
    modal.querySelector('.modal-body').innerHTML = content;
    modal.classList.add('open');
  }
  
  // ==================== PEOPLE MODALS ====================
  async function initPeopleModals() {
    const people = await fetchJSON('data/people.json');
    const list = document.getElementById('peopleList');
    if(!list) return;
    
    // Create modal
    const modal = createModal('peopleModal');
    
    // Add click handlers
    list.addEventListener('click', (e) => {
      const card = e.target.closest('.card');
      if(!card) return;
      
      const index = Array.from(list.children).indexOf(card);
      const person = people[index];
      if(!person) return;
      
      showPersonModal(person, modal);
    });
  }
  
  function showPersonModal(person, modal) {
    const imageUrl = getScientistImage(person.name);
    const content = `
      <div style="text-align: center;">
        <div style="width: 150px; height: 150px; margin: 0 auto 1.5rem; border-radius: 50%; overflow: hidden; border: 4px solid var(--primary); box-shadow: var(--shadow-lg);">
          <img src="${imageUrl}" alt="${person.name}" style="width: 100%; height: 100%; object-fit: cover;" onerror="this.src='https://via.placeholder.com/150/3b82f6/ffffff?text=${person.name.split(' ')[0]}'">
        </div>
        <h2>${person.name}</h2>
        <p style="color: var(--primary); font-weight: 600; margin-bottom: 0.5rem;">${person.role}</p>
        <p style="color: var(--text-muted); margin-bottom: 1.5rem;">${person.lifespan}</p>
        <p style="font-size: 1.05rem; line-height: 1.8; text-align: left; max-width: 600px; margin: 0 auto;">${person.bio}</p>
        <button onclick="document.getElementById('peopleModal').classList.remove('open')" class="btn primary" style="margin-top: 2rem;">Close</button>
      </div>
    `;
    modal.querySelector('.modal-body').innerHTML = content;
    modal.classList.add('open');
  }
  
  function getScientistImage(name) {
    const images = {
      'Albert Einstein': 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Albert_Einstein_Head.jpg/220px-Albert_Einstein_Head.jpg',
      'Carl Benz': 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/Carl-Benz_coloriert.jpg/220px-Carl-Benz_coloriert.jpg',
      'Wilhelm Conrad Röntgen': 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/71/Roentgen2.jpg/220px-Roentgen2.jpg',
      'Max Planck': 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c7/Max_Planck_1933.jpg/220px-Max_Planck_1933.jpg',
      'Konrad Zuse': 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b0/Konrad_Zuse_%281992%29.jpg/220px-Konrad_Zuse_%281992%29.jpg'
    };
    return images[name] || `https://via.placeholder.com/150/3b82f6/ffffff?text=${name.split(' ')[0]}`;
  }
  
  // ==================== TIMELINE ANIMATIONS ====================
  function initTimelineAnimations() {
    const items = document.querySelectorAll('.timeline-item');
    if(!items.length) return;
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry, index) => {
        if(entry.isIntersecting) {
          setTimeout(() => {
            entry.target.classList.add('animate-in');
          }, index * 100);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });
    
    items.forEach(item => {
      item.classList.add('timeline-animate');
      observer.observe(item);
    });
  }
  
  // ==================== DASHBOARD FLIP CARDS ====================
  function initDashboardFlip() {
    // Wait for DOM to be ready
    setTimeout(() => {
      const cards = document.querySelectorAll('.flip-card');
      console.log('Found flip cards:', cards.length);
      
      cards.forEach((card, index) => {
        // Remove any existing listeners
        const newCard = card.cloneNode(true);
        card.parentNode.replaceChild(newCard, card);
        
        newCard.addEventListener('click', (e) => {
          // Don't flip if clicking a link
          if(e.target.tagName === 'A' || e.target.closest('a')) {
            return;
          }
          
          console.log('Flipping card', index);
          
          // If this card is already flipped, just unflip it
          if(newCard.classList.contains('flipped')) {
            newCard.classList.remove('flipped');
          } else {
            // Unflip all other cards first
            document.querySelectorAll('.flip-card.flipped').forEach(otherCard => {
              if(otherCard !== newCard) {
                otherCard.classList.remove('flipped');
              }
            });
            
            // Then flip this card
            newCard.classList.add('flipped');
          }
        });
      });
    }, 100);
  }
  
  // ==================== FULL PAGE TRANSLATION ====================
  function initFullTranslation() {
    const langBtn = document.getElementById('langToggle');
    if(!langBtn) return;
    
    // Override the click handler
    langBtn.onclick = () => {
      const current = localStorage.getItem('lang') || 'en';
      const next = current === 'en' ? 'de' : 'en';
      localStorage.setItem('lang', next);
      langBtn.textContent = next === 'en' ? '🇩🇪 DE' : '🇬🇧 EN';
      translatePage(next);
    };
    
    // Apply on load
    const saved = localStorage.getItem('lang') || 'en';
    if(saved === 'de') translatePage('de');
  }
  
  function translatePage(lang) {
    const translations = getTranslations();
    console.log('Translating page to:', lang);
    
    // Translate all elements with data-translate attribute
    document.querySelectorAll('[data-translate]').forEach(el => {
      const key = el.getAttribute('data-translate');
      if(translations[lang] && translations[lang][key]) {
        el.textContent = translations[lang][key];
      }
    });
    
    // Translate page titles
    const h1 = document.querySelector('h1');
    if(h1) {
      if(page === 'technologies' && translations[lang].tech_title) {
        h1.textContent = translations[lang].tech_title;
      }
      if(page === 'automotive' && translations[lang].auto_title) {
        h1.textContent = translations[lang].auto_title;
      }
      if(page === 'brands' && translations[lang].brands_title) {
        h1.textContent = translations[lang].brands_title;
      }
      if(page === 'people' && translations[lang].people_title) {
        h1.textContent = translations[lang].people_title;
      }
      if(page === 'history' && translations[lang].history_title) {
        h1.textContent = translations[lang].history_title;
      }
      if(page === 'dashboard' && translations[lang].dashboard_title) {
        h1.textContent = translations[lang].dashboard_title;
      }
    }
    
    // Translate dashboard flip cards
    if(page === 'dashboard') {
      translateFlipCards(lang, translations);
    }
    
    // Translate buttons
    const authBtn = document.getElementById('authBtn');
    if(authBtn) {
      if(authBtn.textContent.includes('Get Started') || authBtn.textContent.includes('Loslegen')) {
        authBtn.textContent = translations[lang].get_started;
      } else if(authBtn.textContent.includes('Logout') || authBtn.textContent.includes('Abmelden')) {
        authBtn.textContent = translations[lang].logout;
      }
    }
    
    console.log('Translation complete');
  }
  
  function translateFlipCards(lang, translations) {
    // Technologies card
    const techCard = document.querySelector('[data-topic="technologies"]');
    if(techCard) {
      const frontH3 = techCard.querySelector('.flip-card-front h3');
      const backH3 = techCard.querySelector('.flip-card-back h3');
      const backP = techCard.querySelector('.flip-card-back p');
      const backBtn = techCard.querySelector('.flip-card-back .btn');
      if(frontH3) frontH3.textContent = translations[lang].card_tech_title;
      if(backH3) backH3.textContent = translations[lang].card_tech_title;
      if(backP) backP.textContent = translations[lang].card_tech_desc;
      if(backBtn) backBtn.textContent = translations[lang].explore;
    }
    
    // Automotive card
    const autoCard = document.querySelector('[data-topic="automotive"]');
    if(autoCard) {
      const frontH3 = autoCard.querySelector('.flip-card-front h3');
      const backH3 = autoCard.querySelector('.flip-card-back h3');
      const backP = autoCard.querySelector('.flip-card-back p');
      const backBtn = autoCard.querySelector('.flip-card-back .btn');
      if(frontH3) frontH3.textContent = translations[lang].card_auto_title;
      if(backH3) backH3.textContent = translations[lang].card_auto_title;
      if(backP) backP.textContent = translations[lang].card_auto_desc;
      if(backBtn) backBtn.textContent = translations[lang].view_timeline;
    }
    
    // Brands card
    const brandsCard = document.querySelector('[data-topic="brands"]');
    if(brandsCard) {
      const frontH3 = brandsCard.querySelector('.flip-card-front h3');
      const backH3 = brandsCard.querySelector('.flip-card-back h3');
      const backP = brandsCard.querySelector('.flip-card-back p');
      const backBtn = brandsCard.querySelector('.flip-card-back .btn');
      if(frontH3) frontH3.textContent = translations[lang].card_brands_title;
      if(backH3) backH3.textContent = translations[lang].card_brands_title;
      if(backP) backP.textContent = translations[lang].card_brands_desc;
      if(backBtn) backBtn.textContent = translations[lang].discover;
    }
    
    // People card
    const peopleCard = document.querySelector('[data-topic="people"]');
    if(peopleCard) {
      const frontH3 = peopleCard.querySelector('.flip-card-front h3');
      const backH3 = peopleCard.querySelector('.flip-card-back h3');
      const backP = peopleCard.querySelector('.flip-card-back p');
      const backBtn = peopleCard.querySelector('.flip-card-back .btn');
      if(frontH3) frontH3.textContent = translations[lang].card_people_title;
      if(backH3) backH3.textContent = translations[lang].card_people_title;
      if(backP) backP.textContent = translations[lang].card_people_desc;
      if(backBtn) backBtn.textContent = translations[lang].meet_pioneers;
    }
    
    // History card
    const historyCard = document.querySelector('[data-topic="history"]');
    if(historyCard) {
      const frontH3 = historyCard.querySelector('.flip-card-front h3');
      const backH3 = historyCard.querySelector('.flip-card-back h3');
      const backP = historyCard.querySelector('.flip-card-back p');
      const backBtn = historyCard.querySelector('.flip-card-back .btn');
      if(frontH3) frontH3.textContent = translations[lang].card_history_title;
      if(backH3) backH3.textContent = translations[lang].card_history_title;
      if(backP) backP.textContent = translations[lang].card_history_desc;
      if(backBtn) backBtn.textContent = translations[lang].see_timeline;
    }
    
    // Gallery card
    const galleryCard = document.querySelector('[data-topic="gallery"]');
    if(galleryCard) {
      const frontH3 = galleryCard.querySelector('.flip-card-front h3');
      const backH3 = galleryCard.querySelector('.flip-card-back h3');
      const backP = galleryCard.querySelector('.flip-card-back p');
      const backBtn = galleryCard.querySelector('.flip-card-back .btn');
      if(frontH3) frontH3.textContent = translations[lang].card_gallery_title;
      if(backH3) backH3.textContent = translations[lang].card_gallery_title;
      if(backP) backP.textContent = translations[lang].card_gallery_desc;
      if(backBtn) backBtn.textContent = translations[lang].browse;
    }
    
    // Translate "Click to flip" hints
    document.querySelectorAll('.flip-hint').forEach(hint => {
      hint.textContent = translations[lang].click_to_flip;
    });
  }
  
  function getTranslations() {
    return {
      en: {
        dashboard_title: 'Explore German Innovation',
        tech_title: 'German Technologies',
        auto_title: 'Automotive Evolution',
        brands_title: 'Leading German Brands',
        people_title: 'Scientists & Engineers',
        history_title: 'Germany History',
        gallery_title: 'Gallery',
        get_started: 'Get Started',
        logout: 'Logout',
        back_to_dashboard: '← Back to Dashboard',
        click_to_flip: 'Click to flip',
        // Card titles
        card_tech_title: 'Technologies',
        card_auto_title: 'Automotive Evolution',
        card_brands_title: 'Leading Brands',
        card_people_title: 'Scientists & Engineers',
        card_history_title: 'Germany History',
        card_gallery_title: 'Gallery',
        // Card descriptions
        card_tech_desc: "From Gutenberg's printing press to Industry 4.0, explore groundbreaking German innovations.",
        card_auto_desc: '130+ years from Benz\'s first car to modern EVs. Precision, safety, and performance defined.',
        card_brands_desc: 'Mercedes, BMW, Siemens, Bosch, SAP—companies built on German engineering excellence.',
        card_people_desc: 'Einstein, Röntgen, Diesel, Planck—meet the scientists who changed everything.',
        card_history_desc: 'From Holy Roman Empire to Industry 4.0—a journey through time and innovation.',
        card_gallery_desc: 'Logos, historic images, and technological achievements in one place.',
        // Card buttons
        explore: 'Explore',
        view_timeline: 'View Timeline',
        discover: 'Discover',
        meet_pioneers: 'Meet Pioneers',
        see_timeline: 'See Timeline',
        browse: 'Browse'
      },
      de: {
        dashboard_title: 'Deutsche Innovation Erkunden',
        tech_title: 'Deutsche Technologien',
        auto_title: 'Automobilentwicklung',
        brands_title: 'Führende Deutsche Marken',
        people_title: 'Wissenschaftler & Ingenieure',
        history_title: 'Deutsche Geschichte',
        gallery_title: 'Galerie',
        get_started: 'Loslegen',
        logout: 'Abmelden',
        back_to_dashboard: '← Zurück zum Dashboard',
        click_to_flip: 'Klicken zum Umdrehen',
        // Card titles
        card_tech_title: 'Technologien',
        card_auto_title: 'Automobilentwicklung',
        card_brands_title: 'Führende Marken',
        card_people_title: 'Wissenschaftler & Ingenieure',
        card_history_title: 'Deutsche Geschichte',
        card_gallery_title: 'Galerie',
        // Card descriptions
        card_tech_desc: 'Von Gutenbergs Druckerpresse bis Industrie 4.0—entdecken Sie bahnbrechende deutsche Innovationen.',
        card_auto_desc: '130+ Jahre von Benz erstem Auto bis zu modernen Elektrofahrzeugen. Präzision, Sicherheit und Leistung definiert.',
        card_brands_desc: 'Mercedes, BMW, Siemens, Bosch, SAP—Unternehmen auf deutscher Ingenieurskunst aufgebaut.',
        card_people_desc: 'Einstein, Röntgen, Diesel, Planck—treffen Sie die Wissenschaftler, die alles veränderten.',
        card_history_desc: 'Vom Heiligen Römischen Reich bis Industrie 4.0—eine Reise durch Zeit und Innovation.',
        card_gallery_desc: 'Logos, historische Bilder und technologische Errungenschaften an einem Ort.',
        // Card buttons
        explore: 'Erkunden',
        view_timeline: 'Zeitleiste Ansehen',
        discover: 'Entdecken',
        meet_pioneers: 'Pioniere Treffen',
        see_timeline: 'Zeitleiste Sehen',
        browse: 'Durchsuchen'
      }
    };
  }
  
  // ==================== MODAL HELPER ====================
  function createModal(id) {
    let modal = document.getElementById(id);
    if(!modal) {
      modal = document.createElement('div');
      modal.id = id;
      modal.className = 'modal-overlay';
      modal.innerHTML = `
        <div class="modal-content">
          <div class="modal-body"></div>
        </div>
      `;
      document.body.appendChild(modal);
      
      // Close on overlay click
      modal.addEventListener('click', (e) => {
        if(e.target === modal) modal.classList.remove('open');
      });
    }
    return modal;
  }
  
  // ==================== BACK TO DASHBOARD BUTTON ====================
  function addBackToDashboardButton() {
    const header = document.querySelector('.header-actions');
    if(!header) return;
    
    // Check if button already exists
    if(document.getElementById('backToDashboard')) return;
    
    const btn = document.createElement('a');
    btn.id = 'backToDashboard';
    btn.href = 'dashboard.html';
    btn.className = 'btn';
    btn.style.cssText = 'background: var(--secondary); color: white; border: none;';
    
    const lang = localStorage.getItem('lang') || 'en';
    const translations = getTranslations();
    btn.textContent = translations[lang].back_to_dashboard;
    
    // Insert as first button
    header.insertBefore(btn, header.firstChild);
    
    // Update text when language changes
    const langBtn = document.getElementById('langToggle');
    if(langBtn) {
      const originalClick = langBtn.onclick;
      langBtn.onclick = () => {
        if(originalClick) originalClick();
        setTimeout(() => {
          const currentLang = localStorage.getItem('lang') || 'en';
          btn.textContent = translations[currentLang].back_to_dashboard;
        }, 50);
      };
    }
  }
  
  // ==================== UTILITIES ====================
  async function fetchJSON(path) {
    try {
      const res = await fetch(path);
      return await res.json();
    } catch(e) {
      console.error('Failed to load:', path, e);
      return [];
    }
  }
  
})();
