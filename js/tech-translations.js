// Technologies Page Translation
(function() {
  const page = document.body.getAttribute('data-page');
  if(page !== 'technologies') return;
  
  // Apply translations on load
  const savedLang = localStorage.getItem('lang') || 'en';
  if(savedLang === 'de') {
    setTimeout(() => translateTechPage('de'), 200);
  }
  
  // Listen for language changes
  document.addEventListener('click', (e) => {
    if(e.target.id === 'langToggle' || e.target.closest('#langToggle')) {
      setTimeout(() => {
        const lang = localStorage.getItem('lang') || 'en';
        translateTechPage(lang);
      }, 100);
    }
  });
  
  function translateTechPage(lang) {
    const translations = getTechTranslations();
    const t = translations[lang];
    
    // Translate all elements with data-tech attribute
    document.querySelectorAll('[data-tech]').forEach(el => {
      const key = el.getAttribute('data-tech');
      if(t[key]) {
        el.textContent = t[key];
      }
    });
  }
  
  function getTechTranslations() {
    return {
      en: {
        title: 'German Technologies',
        subtitle: 'From revolutionary inventions to cutting-edge innovations shaping tomorrow',
        key_title: 'Key German Technologies',
        printing: 'Printing Press',
        printing_desc: "Johannes Gutenberg's movable-type printing press (1440) revolutionized knowledge dissemination, making books accessible and sparking the Renaissance and Reformation.",
        xray: 'X-Ray Technology',
        xray_desc: "Wilhelm Röntgen's discovery of X-rays (1895) transformed medical diagnostics, earning him the first Nobel Prize in Physics and saving countless lives.",
        auto: 'Automobile',
        auto_desc: "Carl Benz's Patent-Motorwagen (1886) was the world's first production automobile, launching an industry that would transform global transportation.",
        diesel: 'Diesel Engine',
        diesel_desc: "Rudolf Diesel's compression-ignition engine (1892) became fundamental to shipping, trucking, and heavy industry worldwide due to its efficiency.",
        industry4: 'Industry 4.0',
        industry4_desc: 'Germany pioneered the fourth industrial revolution, integrating AI, IoT, and robotics into smart factories for unprecedented efficiency and flexibility.',
        renewable: 'Renewable Energy',
        renewable_desc: 'Leading the Energiewende (energy transition), Germany develops advanced wind turbines, solar technology, and smart grids for a sustainable future.',
        history_title: 'Innovation Through History',
        era1_title: '1440-1600: The Knowledge Revolution',
        era1_desc: "Gutenberg's printing press democratized knowledge. Books became affordable, literacy spread, and ideas flowed freely across Europe. This innovation laid the groundwork for the Scientific Revolution and Enlightenment.",
        era2_title: '1800-1900: Industrial Powerhouse',
        era2_desc: 'Germany unified and industrialized rapidly. Carl Benz created the automobile, Rudolf Diesel perfected his engine, and Wilhelm Röntgen discovered X-rays. German chemistry, optics, and electrical engineering led the world.',
        era3_title: '1900-1945: Scientific Golden Age',
        era3_desc: 'Albert Einstein revolutionized physics with relativity. Max Planck founded quantum mechanics. Werner Heisenberg, Max Born, and others made Germany the center of theoretical physics. Konrad Zuse built the first programmable computer (Z3, 1941).',
        era4_title: '1950-2000: Wirtschaftswunder & Precision',
        era4_desc: 'Post-war reconstruction led to the "economic miracle." German engineering became synonymous with quality: Mercedes, BMW, Porsche, Bosch, Siemens. The MP3 format was developed at Fraunhofer Institute (1987).',
        era5_title: '2000-Present: Digital & Green Transition',
        era5_desc: 'Germany leads Industry 4.0, combining automation with AI. The Energiewende pushes renewable energy to 50%+ of electricity. SAP dominates enterprise software. German engineering focuses on sustainability and smart systems.',
        future_title: 'The Future of German Innovation',
        future1_title: '🔋 Hydrogen Economy',
        future1_desc: 'Germany invests billions in green hydrogen production and infrastructure. By 2030, hydrogen will power heavy industry, shipping, and aviation, replacing fossil fuels with clean energy from wind and solar.',
        future2_title: '🧠 Quantum Computing',
        future2_desc: "German research institutes and companies develop quantum computers for drug discovery, materials science, and cryptography. IBM's quantum system in Ehningen and Fraunhofer's quantum research lead Europe.",
        future3_title: '🤖 AI & Autonomous Systems',
        future3_desc: 'German AI focuses on trustworthy, explainable systems. Autonomous vehicles from Mercedes and BMW, industrial AI from Siemens, and medical AI from university hospitals push boundaries responsibly.',
        future4_title: '🌍 Circular Economy',
        future4_desc: 'Germany pioneers closed-loop manufacturing where waste becomes resource. Advanced recycling, biodegradable materials, and product-as-a-service models reduce environmental impact while maintaining economic growth.',
        culture_title: 'The German Innovation Culture',
        culture_desc: 'German innovation is built on Gründlichkeit (thoroughness), Präzision (precision), and Nachhaltigkeit (sustainability). The Fraunhofer Society, Max Planck Institutes, and technical universities collaborate with industry through the "Mittelstand"—small and medium enterprises that are world leaders in niche technologies. This ecosystem of research, education, and practical application drives continuous innovation.',
        stat1: 'Annual R&D Investment',
        stat2: 'Research Institutes',
        stat3: 'GDP in R&D'
      },
      de: {
        title: 'Deutsche Technologien',
        subtitle: 'Von revolutionären Erfindungen bis zu zukunftsweisenden Innovationen',
        key_title: 'Wichtige Deutsche Technologien',
        printing: 'Druckerpresse',
        printing_desc: 'Johannes Gutenbergs Druckerpresse mit beweglichen Lettern (1440) revolutionierte die Wissensverbreitung, machte Bücher zugänglich und löste Renaissance und Reformation aus.',
        xray: 'Röntgentechnologie',
        xray_desc: 'Wilhelm Röntgens Entdeckung der Röntgenstrahlen (1895) verwandelte die medizinische Diagnostik, brachte ihm den ersten Nobelpreis für Physik ein und rettete unzählige Leben.',
        auto: 'Automobil',
        auto_desc: 'Carl Benz Patent-Motorwagen (1886) war das erste Serienautomobil der Welt und startete eine Industrie, die den globalen Transport transformieren sollte.',
        diesel: 'Dieselmotor',
        diesel_desc: 'Rudolf Diesels Kompressionszündungsmotor (1892) wurde aufgrund seiner Effizienz grundlegend für Schifffahrt, Lkw-Verkehr und Schwerindustrie weltweit.',
        industry4: 'Industrie 4.0',
        industry4_desc: 'Deutschland war Pionier der vierten industriellen Revolution und integrierte KI, IoT und Robotik in intelligente Fabriken für beispiellose Effizienz und Flexibilität.',
        renewable: 'Erneuerbare Energie',
        renewable_desc: 'Deutschland führt die Energiewende an und entwickelt fortschrittliche Windturbinen, Solartechnologie und intelligente Netze für eine nachhaltige Zukunft.',
        history_title: 'Innovation durch die Geschichte',
        era1_title: '1440-1600: Die Wissensrevolution',
        era1_desc: 'Gutenbergs Druckerpresse demokratisierte Wissen. Bücher wurden erschwinglich, Alphabetisierung verbreitete sich und Ideen flossen frei durch Europa. Diese Innovation legte den Grundstein für die wissenschaftliche Revolution und Aufklärung.',
        era2_title: '1800-1900: Industrielle Großmacht',
        era2_desc: 'Deutschland vereinigte sich und industrialisierte sich schnell. Carl Benz schuf das Automobil, Rudolf Diesel perfektionierte seinen Motor und Wilhelm Röntgen entdeckte Röntgenstrahlen. Deutsche Chemie, Optik und Elektrotechnik führten die Welt an.',
        era3_title: '1900-1945: Wissenschaftliches Goldenes Zeitalter',
        era3_desc: 'Albert Einstein revolutionierte die Physik mit der Relativitätstheorie. Max Planck begründete die Quantenmechanik. Werner Heisenberg, Max Born und andere machten Deutschland zum Zentrum der theoretischen Physik. Konrad Zuse baute den ersten programmierbaren Computer (Z3, 1941).',
        era4_title: '1950-2000: Wirtschaftswunder & Präzision',
        era4_desc: 'Der Wiederaufbau nach dem Krieg führte zum "Wirtschaftswunder". Deutsche Ingenieurskunst wurde zum Synonym für Qualität: Mercedes, BMW, Porsche, Bosch, Siemens. Das MP3-Format wurde am Fraunhofer-Institut entwickelt (1987).',
        era5_title: '2000-Heute: Digitaler & Grüner Wandel',
        era5_desc: 'Deutschland führt Industrie 4.0 an und kombiniert Automatisierung mit KI. Die Energiewende treibt erneuerbare Energien auf über 50% des Stroms. SAP dominiert Unternehmenssoftware. Deutsche Ingenieurskunst konzentriert sich auf Nachhaltigkeit und intelligente Systeme.',
        future_title: 'Die Zukunft Deutscher Innovation',
        future1_title: '🔋 Wasserstoffwirtschaft',
        future1_desc: 'Deutschland investiert Milliarden in grüne Wasserstoffproduktion und Infrastruktur. Bis 2030 wird Wasserstoff Schwerindustrie, Schifffahrt und Luftfahrt antreiben und fossile Brennstoffe durch saubere Energie aus Wind und Sonne ersetzen.',
        future2_title: '🧠 Quantencomputing',
        future2_desc: 'Deutsche Forschungsinstitute und Unternehmen entwickeln Quantencomputer für Arzneimittelforschung, Materialwissenschaft und Kryptographie. IBMs Quantensystem in Ehningen und Fraunhofers Quantenforschung führen Europa an.',
        future3_title: '🤖 KI & Autonome Systeme',
        future3_desc: 'Deutsche KI konzentriert sich auf vertrauenswürdige, erklärbare Systeme. Autonome Fahrzeuge von Mercedes und BMW, industrielle KI von Siemens und medizinische KI von Universitätskliniken erweitern verantwortungsvoll Grenzen.',
        future4_title: '🌍 Kreislaufwirtschaft',
        future4_desc: 'Deutschland ist Vorreiter bei geschlossenen Fertigungskreisläufen, bei denen Abfall zur Ressource wird. Fortschrittliches Recycling, biologisch abbaubare Materialien und Product-as-a-Service-Modelle reduzieren Umweltbelastungen bei gleichzeitigem Wirtschaftswachstum.',
        culture_title: 'Die Deutsche Innovationskultur',
        culture_desc: 'Deutsche Innovation basiert auf Gründlichkeit, Präzision und Nachhaltigkeit. Die Fraunhofer-Gesellschaft, Max-Planck-Institute und technische Universitäten arbeiten mit der Industrie durch den "Mittelstand" zusammen—kleine und mittlere Unternehmen, die Weltmarktführer in Nischentechnologien sind. Dieses Ökosystem aus Forschung, Bildung und praktischer Anwendung treibt kontinuierliche Innovation voran.',
        stat1: 'Jährliche F&E-Investition',
        stat2: 'Forschungsinstitute',
        stat3: 'BIP in F&E'
      }
    };
  }
})();
