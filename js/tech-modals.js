// Technology Detail Modals with Maps
(function() {
  const page = document.body.getAttribute('data-page');
  if(page !== 'technologies') return;
  
  // Initialize click handlers for tech cards
  document.querySelectorAll('.tech-card-clickable').forEach(card => {
    card.addEventListener('click', () => {
      const techId = card.getAttribute('data-tech-id');
      showTechModal(techId);
    });
  });
  
  // Initialize click handlers for future cards
  document.querySelectorAll('.future-card-clickable').forEach(card => {
    card.addEventListener('click', () => {
      const futureId = card.getAttribute('data-future-id');
      showFutureModal(futureId);
    });
  });
  
  // Initialize click handler for culture card
  const cultureCard = document.querySelector('.culture-card-clickable');
  if(cultureCard) {
    cultureCard.addEventListener('click', () => {
      showCultureModal();
    });
  }
  
  function showTechModal(techId) {
    const lang = localStorage.getItem('lang') || 'en';
    const data = getTechData()[techId];
    if(!data) return;
    
    const content = lang === 'en' ? data.en : data.de;
    
    const modal = createModal();
    modal.innerHTML = `
      <div class="modal-content" style="max-width: 900px;">
        <button class="modal-close" onclick="this.closest('.modal-overlay').classList.remove('open')" style="position: absolute; top: 1rem; right: 1rem; background: none; border: none; font-size: 2rem; cursor: pointer; color: var(--text-muted);">&times;</button>
        <div class="modal-body">
          <div style="text-align: center; margin-bottom: 2rem;">
            <div style="font-size: 4rem; margin-bottom: 1rem;">${content.icon}</div>
            <h2 style="margin-bottom: 0.5rem;">${content.title}</h2>
            <p style="color: var(--text-muted); font-size: 1.125rem;">${content.subtitle}</p>
          </div>
          
          <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 1rem; margin-bottom: 2rem;">
            <div style="background: var(--bg-alt); padding: 1.5rem; border-radius: 0.75rem; text-align: center;">
              <div style="font-weight: 600; color: var(--text-muted); font-size: 0.875rem; margin-bottom: 0.5rem;">${lang === 'en' ? '📍 Location' : '📍 Standort'}</div>
              <div style="font-size: 1.125rem; font-weight: 700;">${content.location}</div>
            </div>
            <div style="background: var(--bg-alt); padding: 1.5rem; border-radius: 0.75rem; text-align: center;">
              <div style="font-weight: 600; color: var(--text-muted); font-size: 0.875rem; margin-bottom: 0.5rem;">${lang === 'en' ? '👤 Inventor' : '👤 Erfinder'}</div>
              <div style="font-size: 1.125rem; font-weight: 700;">${content.inventor}</div>
            </div>
            <div style="background: var(--bg-alt); padding: 1.5rem; border-radius: 0.75rem; text-align: center;">
              <div style="font-weight: 600; color: var(--text-muted); font-size: 0.875rem; margin-bottom: 0.5rem;">${lang === 'en' ? '💥 Impact' : '💥 Auswirkung'}</div>
              <div style="font-size: 1.125rem; font-weight: 700;">${content.impact}</div>
            </div>
          </div>
          
          <div style="margin-bottom: 2rem;">
            <h3 style="margin-bottom: 1rem; color: var(--primary);">${lang === 'en' ? '📖 Detailed History' : '📖 Detaillierte Geschichte'}</h3>
            <p style="line-height: 1.8; font-size: 1.05rem;">${content.history}</p>
          </div>
          
          <div style="background: linear-gradient(135deg, #1e293b 0%, #334155 100%); padding: 2rem; border-radius: 1rem; border-left: 4px solid ${content.borderColor}; margin-bottom: 2rem; color: #ffffff;">
            <h3 style="margin-bottom: 1rem; color: #ffffff;">${lang === 'en' ? '🔮 Modern Relevance' : '🔮 Moderne Relevanz'}</h3>
            <p style="line-height: 1.8; color: #e2e8f0;">${content.modern}</p>
          </div>
          
          <div>
            <h3 style="margin-bottom: 1rem; color: var(--primary); text-align: center;">${lang === 'en' ? '🧠 Innovation Impact Map' : '🧠 Innovations-Auswirkungs-Map'}</h3>
            <div style="background: linear-gradient(135deg, ${content.gradient}); padding: 2rem; border-radius: 1rem; border-left: 4px solid ${content.borderColor};">
              <div style="display: flex; align-items: center; justify-content: center; gap: 2rem; flex-wrap: wrap;">
                <div style="text-align: center; background: white; padding: 1.5rem; border-radius: 1rem; box-shadow: 0 4px 6px rgba(0,0,0,0.1); min-width: 200px;">
                  <div style="font-size: 2rem; margin-bottom: 0.5rem;">${content.icon}</div>
                  <div style="font-weight: 700; font-size: 1.25rem; color: ${content.borderColor};">${content.title}</div>
                  <div style="font-size: 0.875rem; color: var(--text-muted); margin-top: 0.5rem;">${content.year}</div>
                </div>
                ${content.mindMap.map((node, index) => `
                  <div style="position: relative;">
                    <div style="position: absolute; left: -2rem; top: 50%; width: 2rem; height: 2px; background: ${content.borderColor};"></div>
                    <div style="background: white; padding: 1rem 1.5rem; border-radius: 0.75rem; border: 2px solid ${content.borderColor}; min-width: 150px;">
                      <div style="font-weight: 600; color: ${content.borderColor}; margin-bottom: 0.25rem;">${node.title}</div>
                      <div style="font-size: 0.75rem; color: var(--text-muted);">${node.desc}</div>
                    </div>
                  </div>
                `).join('')}
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
    
    modal.classList.add('open');
  }
  
  function createModal() {
    let modal = document.getElementById('techModal');
    if(!modal) {
      modal = document.createElement('div');
      modal.id = 'techModal';
      modal.className = 'modal-overlay';
      document.body.appendChild(modal);
      
      modal.addEventListener('click', (e) => {
        if(e.target === modal) modal.classList.remove('open');
      });
    }
    return modal;
  }
  
  function getTechData() {
    return {
      printing: {
        en: {
          icon: '📖',
          title: 'Printing Press',
          subtitle: 'The Innovation That Changed the World',
          location: 'Mainz, Germany',
          year: '1440',
          inventor: 'Johannes Gutenberg',
          impact: 'Renaissance & Reformation',
          mindMap: [
            { title: 'Literacy', desc: 'Mass education' },
            { title: 'Science', desc: 'Knowledge sharing' },
            { title: 'Religion', desc: 'Reformation spread' },
            { title: 'Democracy', desc: 'Informed citizens' }
          ],
          history: 'Johannes Gutenberg invented the movable-type printing press around 1440 in Mainz. His innovation combined the screw press, movable type, and oil-based ink in a revolutionary way. The Gutenberg Bible (1455) was the first major book printed. This invention made books affordable, spreading literacy across Europe and fueling the Renaissance, Reformation, and Scientific Revolution.',
          modern: 'Today\'s digital revolution echoes Gutenberg\'s impact. Just as the printing press democratized knowledge in the 15th century, the internet does so in the 21st. Desktop publishing, e-books, and online content are direct descendants. Germany continues this legacy with world-leading book fairs (Frankfurt) and publishing houses.',
          gradient: '#fef3c7 0%, #fde68a 100%',
          borderColor: '#f59e0b'
        },
        de: {
          icon: '📖',
          title: 'Druckerpresse',
          subtitle: 'Die Innovation, die die Welt veränderte',
          location: 'Mainz, Deutschland',
          year: '1440',
          inventor: 'Johannes Gutenberg',
          impact: 'Renaissance & Reformation',
          mindMap: [
            { title: 'Alphabetisierung', desc: 'Massenbildung' },
            { title: 'Wissenschaft', desc: 'Wissensaustausch' },
            { title: 'Religion', desc: 'Reformationsverbreitung' },
            { title: 'Demokratie', desc: 'Informierte Bürger' }
          ],
          history: 'Johannes Gutenberg erfand um 1440 in Mainz die Druckerpresse mit beweglichen Lettern. Seine Innovation kombinierte Schraubenpresse, bewegliche Lettern und ölbasierte Tinte revolutionär. Die Gutenberg-Bibel (1455) war das erste große gedruckte Buch. Diese Erfindung machte Bücher erschwinglich, verbreitete Alphabetisierung in Europa und befeuerte Renaissance, Reformation und wissenschaftliche Revolution.',
          modern: 'Die heutige digitale Revolution spiegelt Gutenbergs Einfluss wider. So wie die Druckerpresse im 15. Jahrhundert Wissen demokratisierte, tut dies das Internet im 21. Jahrhundert. Desktop-Publishing, E-Books und Online-Inhalte sind direkte Nachkommen. Deutschland setzt dieses Erbe mit weltweit führenden Buchmessen (Frankfurt) und Verlagshäusern fort.',
          gradient: '#fef3c7 0%, #fde68a 100%',
          borderColor: '#f59e0b'
        }
      },
      xray: {
        en: {
          icon: '🔬',
          title: 'X-Ray Technology',
          subtitle: 'Seeing the Invisible',
          location: 'Würzburg, Germany',
          year: '1895',
          inventor: 'Wilhelm Röntgen',
          impact: 'Medical Revolution',
          mindMap: [
            { title: 'Medicine', desc: 'Non-invasive diagnosis' },
            { title: 'Security', desc: 'Airport scanning' },
            { title: 'Industry', desc: 'Material testing' },
            { title: 'Astronomy', desc: 'Space observation' }
          ],
          history: 'On November 8, 1895, Wilhelm Conrad Röntgen discovered X-rays while experimenting with cathode rays at the University of Würzburg. His first X-ray image was of his wife\'s hand, showing bones and her wedding ring. He published his findings in December 1895, and within months, X-rays were being used in medicine worldwide.',
          modern: 'Modern X-ray technology is far more advanced. Digital X-rays reduce radiation exposure by 80%. 3D imaging and CT scans provide detailed views. Synchrotron X-ray sources enable cutting-edge research. Germany remains a leader through companies like Siemens Healthineers.',
          gradient: '#dbeafe 0%, #bfdbfe 100%',
          borderColor: '#3b82f6'
        },
        de: {
          icon: '🔬',
          title: 'Röntgentechnologie',
          subtitle: 'Das Unsichtbare sehen',
          location: 'Würzburg, Deutschland',
          year: '1895',
          inventor: 'Wilhelm Röntgen',
          impact: 'Medizinische Revolution',
          mindMap: [
            { title: 'Medizin', desc: 'Nicht-invasive Diagnose' },
            { title: 'Sicherheit', desc: 'Flughafen-Scanning' },
            { title: 'Industrie', desc: 'Materialprüfung' },
            { title: 'Astronomie', desc: 'Weltraumbeobachtung' }
          ],
          history: 'Am 8. November 1895 entdeckte Wilhelm Conrad Röntgen Röntgenstrahlen, während er an der Universität Würzburg mit Kathodenstrahlen experimentierte. Sein erstes Röntgenbild war von der Hand seiner Frau und zeigte Knochen und ihren Ehering. Er veröffentlichte seine Erkenntnisse im Dezember 1895, und innerhalb von Monaten wurden Röntgenstrahlen weltweit in der Medizin eingesetzt.',
          modern: 'Moderne Röntgentechnologie ist weit fortgeschrittener. Digitale Röntgenstrahlen reduzieren die Strahlenbelastung um 80%. 3D-Bildgebung und CT-Scans bieten detaillierte Ansichten. Synchrotron-Röntgenquellen ermöglichen Spitzenforschung. Deutschland bleibt durch Unternehmen wie Siemens Healthineers führend.',
          gradient: '#dbeafe 0%, #bfdbfe 100%',
          borderColor: '#3b82f6'
        }
      },
      auto: {
        en: {
          icon: '🚗',
          title: 'Automobile',
          subtitle: 'The Birth of Personal Transportation',
          location: 'Mannheim, Germany',
          year: '1886',
          inventor: 'Carl Benz',
          impact: 'Transportation Revolution',
          mindMap: [
            { title: 'Mobility', desc: 'Personal freedom' },
            { title: 'Industry', desc: 'Mass production' },
            { title: 'Cities', desc: 'Urban planning' },
            { title: 'Economy', desc: 'Global trade' }
          ],
          history: 'On January 29, 1886, Carl Benz received patent DRP 37435 for his "vehicle powered by a gas engine"—the Benz Patent-Motorwagen. In 1888, Benz\'s wife Bertha made the first long-distance automobile trip (106 km), proving the vehicle\'s practicality. This journey is considered the world\'s first road trip.',
          modern: 'Germany remains the automotive powerhouse with Mercedes-Benz, BMW, Volkswagen, Audi, and Porsche. The industry is undergoing its biggest transformation: electrification. German automakers invest billions in EVs like the Mercedes EQS, BMW iX, and VW ID series. Autonomous driving and sustainable manufacturing continue Benz\'s legacy.',
          gradient: '#fce7f3 0%, #fbcfe8 100%',
          borderColor: '#ec4899'
        },
        de: {
          icon: '🚗',
          title: 'Automobil',
          subtitle: 'Die Geburt des Personentransports',
          location: 'Mannheim, Deutschland',
          year: '1886',
          inventor: 'Carl Benz',
          impact: 'Transportrevolution',
          mindMap: [
            { title: 'Mobilität', desc: 'Persönliche Freiheit' },
            { title: 'Industrie', desc: 'Massenproduktion' },
            { title: 'Städte', desc: 'Stadtplanung' },
            { title: 'Wirtschaft', desc: 'Globaler Handel' }
          ],
          history: 'Am 29. Januar 1886 erhielt Carl Benz das Patent DRP 37435 für sein "durch einen Gasmotor angetriebenes Fahrzeug"—den Benz Patent-Motorwagen. 1888 unternahm Benz\' Frau Bertha die erste Langstreckenfahrt mit dem Automobil (106 km) und bewies die Praktikabilität. Diese Fahrt gilt als die erste Autofahrt der Welt.',
          modern: 'Deutschland bleibt die Automobilmacht mit Mercedes-Benz, BMW, Volkswagen, Audi und Porsche. Die Industrie durchläuft ihre größte Transformation: Elektrifizierung. Deutsche Autohersteller investieren Milliarden in Elektrofahrzeuge wie den Mercedes EQS, BMW iX und die VW ID-Serie. Autonomes Fahren und nachhaltige Fertigung setzen Benz\' Vermächtnis fort.',
          gradient: '#fce7f3 0%, #fbcfe8 100%',
          borderColor: '#ec4899'
        }
      },
      diesel: {
        en: {
          icon: '⚙️',
          title: 'Diesel Engine',
          subtitle: 'Efficiency Through Innovation',
          location: 'Augsburg, Germany',
          year: '1892',
          inventor: 'Rudolf Diesel',
          impact: 'Industrial Efficiency',
          mindMap: [
            { title: 'Shipping', desc: 'Global trade' },
            { title: 'Trucks', desc: 'Land transport' },
            { title: 'Trains', desc: 'Rail freight' },
            { title: 'Power', desc: 'Generators' }
          ],
          history: 'Rudolf Diesel developed his compression-ignition engine from 1892-1897 in Augsburg, working for MAN. His goal was to create an engine more efficient than steam and gasoline engines. The diesel engine achieved 75% thermal efficiency compared to 10% for steam engines. The first successful test was on August 10, 1893.',
          modern: 'Modern diesel technology has evolved dramatically. Common-rail injection, turbocharging, and advanced emissions controls have made diesels cleaner and more powerful. Germany leads in diesel innovation through Bosch, MTU, and automotive manufacturers. The future includes renewable diesel from biomass and synthetic fuels.',
          gradient: '#e0e7ff 0%, #c7d2fe 100%',
          borderColor: '#6366f1'
        },
        de: {
          icon: '⚙️',
          title: 'Dieselmotor',
          subtitle: 'Effizienz durch Innovation',
          location: 'Augsburg, Deutschland',
          year: '1892',
          inventor: 'Rudolf Diesel',
          impact: 'Industrieeffizienz',
          mindMap: [
            { title: 'Schifffahrt', desc: 'Globaler Handel' },
            { title: 'Lkw', desc: 'Landtransport' },
            { title: 'Züge', desc: 'Schienenfracht' },
            { title: 'Energie', desc: 'Generatoren' }
          ],
          history: 'Rudolf Diesel entwickelte seinen Kompressionszündungsmotor von 1892-1897 in Augsburg bei MAN. Sein Ziel war es, einen effizienteren Motor als Dampf- und Benzinmotoren zu schaffen. Der Dieselmotor erreichte 75% thermischen Wirkungsgrad im Vergleich zu 10% bei Dampfmaschinen. Der erste erfolgreiche Test fand am 10. August 1893 statt.',
          modern: 'Moderne Dieseltechnologie hat sich dramatisch weiterentwickelt. Common-Rail-Einspritzung, Turboaufladung und fortschrittliche Emissionskontrollen haben Diesel sauberer und leistungsstärker gemacht. Deutschland führt in Dieselinnovation durch Bosch, MTU und Automobilhersteller. Die Zukunft umfasst erneuerbaren Diesel aus Biomasse und synthetische Kraftstoffe.',
          gradient: '#e0e7ff 0%, #c7d2fe 100%',
          borderColor: '#6366f1'
        }
      },
      industry4: {
        en: {
          icon: '🤖',
          title: 'Industry 4.0',
          subtitle: 'The Smart Factory Revolution',
          location: 'Nationwide',
          year: '2011',
          inventor: 'German Initiative',
          impact: 'Manufacturing 4.0',
          mindMap: [
            { title: 'IoT', desc: 'Connected machines' },
            { title: 'AI', desc: 'Smart decisions' },
            { title: 'Robotics', desc: 'Automation' },
            { title: 'Big Data', desc: 'Analytics' }
          ],
          history: 'Industry 4.0 was introduced at the Hannover Messe in 2011 as part of Germany\'s High-Tech Strategy. It represents the fourth industrial revolution, integrating IoT, AI, big data, cloud computing, and robotics into manufacturing. Germany invested billions through research programs and the Plattform Industrie 4.0.',
          modern: 'Industry 4.0 is transforming global manufacturing. Smart factories use sensors, AI, and automation for unprecedented efficiency. German companies like Siemens, Bosch, and SAP lead in providing Industry 4.0 solutions. The concept has been adopted worldwide, with Germany remaining the innovation leader.',
          gradient: '#dcfce7 0%, #bbf7d0 100%',
          borderColor: '#10b981'
        },
        de: {
          icon: '🤖',
          title: 'Industrie 4.0',
          subtitle: 'Die Smart-Factory-Revolution',
          location: 'Bundesweit',
          year: '2011',
          inventor: 'Deutsche Initiative',
          impact: 'Fertigung 4.0',
          mindMap: [
            { title: 'IoT', desc: 'Vernetzte Maschinen' },
            { title: 'KI', desc: 'Intelligente Entscheidungen' },
            { title: 'Robotik', desc: 'Automatisierung' },
            { title: 'Big Data', desc: 'Analytik' }
          ],
          history: 'Industrie 4.0 wurde 2011 auf der Hannover Messe als Teil der deutschen High-Tech-Strategie vorgestellt. Sie repräsentiert die vierte industrielle Revolution und integriert IoT, KI, Big Data, Cloud Computing und Robotik in die Fertigung. Deutschland investierte Milliarden durch Forschungsprogramme und die Plattform Industrie 4.0.',
          modern: 'Industrie 4.0 transformiert die globale Fertigung. Intelligente Fabriken nutzen Sensoren, KI und Automatisierung für beispiellose Effizienz. Deutsche Unternehmen wie Siemens, Bosch und SAP führen bei Industrie-4.0-Lösungen. Das Konzept wurde weltweit übernommen, wobei Deutschland Innovationsführer bleibt.',
          gradient: '#dcfce7 0%, #bbf7d0 100%',
          borderColor: '#10b981'
        }
      },
      renewable: {
        en: {
          icon: '🌱',
          title: 'Renewable Energy',
          subtitle: 'Leading the Energy Transition',
          location: 'Nationwide',
          year: '2000-Present',
          inventor: 'Energiewende',
          impact: 'Climate Leadership',
          mindMap: [
            { title: 'Wind', desc: 'Offshore farms' },
            { title: 'Solar', desc: 'Photovoltaics' },
            { title: 'Storage', desc: 'Batteries' },
            { title: 'Grid', desc: 'Smart networks' }
          ],
          history: 'Germany\'s Energiewende (energy transition) began in earnest in 2000 with the Renewable Energy Act. The goal: transition from nuclear and fossil fuels to renewables. Germany invested heavily in wind turbines, solar panels, and smart grids. By 2023, renewables provided over 50% of electricity. Siemens Energy, Enercon, and others became global leaders.',
          modern: 'Germany continues leading the energy transition. Offshore wind farms in the North and Baltic Seas generate massive power. Solar installations cover rooftops nationwide. Smart grids balance supply and demand. The next phase includes green hydrogen, energy storage, and sector coupling. Germany aims for 80% renewable electricity by 2030 and climate neutrality by 2045.',
          gradient: '#d1fae5 0%, #a7f3d0 100%',
          borderColor: '#059669'
        },
        de: {
          icon: '🌱',
          title: 'Erneuerbare Energie',
          subtitle: 'Führend in der Energiewende',
          location: 'Bundesweit',
          year: '2000-Heute',
          inventor: 'Energiewende',
          impact: 'Klimaführerschaft',
          mindMap: [
            { title: 'Wind', desc: 'Offshore-Parks' },
            { title: 'Solar', desc: 'Photovoltaik' },
            { title: 'Speicher', desc: 'Batterien' },
            { title: 'Netz', desc: 'Intelligente Netze' }
          ],
          history: 'Deutschlands Energiewende begann ernsthaft im Jahr 2000 mit dem Erneuerbare-Energien-Gesetz. Das Ziel: Übergang von Atom- und fossilen Brennstoffen zu Erneuerbaren. Deutschland investierte massiv in Windturbinen, Solarpanels und intelligente Netze. Bis 2023 lieferten Erneuerbare über 50% des Stroms. Siemens Energy, Enercon und andere wurden globale Marktführer.',
          modern: 'Deutschland führt weiterhin die Energiewende an. Offshore-Windparks in Nord- und Ostsee erzeugen massive Energie. Solaranlagen bedecken Dächer bundesweit. Intelligente Netze balancieren Angebot und Nachfrage. Die nächste Phase umfasst grünen Wasserstoff, Energiespeicherung und Sektorkopplung. Deutschland strebt 80% erneuerbare Elektrizität bis 2030 und Klimaneutralität bis 2045 an.',
          gradient: '#d1fae5 0%, #a7f3d0 100%',
          borderColor: '#059669'
        }
      }
    };
  }
  
  function showFutureModal(futureId) {
    const lang = localStorage.getItem('lang') || 'en';
    const data = getFutureData()[futureId];
    if(!data) return;
    
    const content = lang === 'en' ? data.en : data.de;
    
    const modal = createModal();
    modal.innerHTML = `
      <div class="modal-content" style="max-width: 900px;">
        <button class="modal-close" onclick="this.closest('.modal-overlay').classList.remove('open')" style="position: absolute; top: 1rem; right: 1rem; background: none; border: none; font-size: 2rem; cursor: pointer; color: var(--text-muted);">&times;</button>
        <div class="modal-body">
          <div style="text-align: center; margin-bottom: 2rem;">
            <div style="font-size: 4rem; margin-bottom: 1rem;">${content.icon}</div>
            <h2 style="margin-bottom: 0.5rem;">${content.title}</h2>
            <p style="color: var(--text-muted); font-size: 1.125rem;">${content.subtitle}</p>
          </div>
          
          <div style="background: linear-gradient(135deg, ${content.gradient}); padding: 2rem; border-radius: 1rem; border-left: 4px solid ${content.borderColor}; margin-bottom: 2rem;">
            <h3 style="margin-bottom: 1rem; color: ${content.headerColor};">${lang === 'en' ? '🎯 Vision 2030' : '🎯 Vision 2030'}</h3>
            <p style="line-height: 1.8; font-size: 1.05rem;">${content.vision}</p>
          </div>
          
          <div style="margin-bottom: 2rem;">
            <h3 style="margin-bottom: 1rem; color: var(--primary);">${lang === 'en' ? '🔬 Current Research & Development' : '🔬 Aktuelle Forschung & Entwicklung'}</h3>
            <p style="line-height: 1.8; font-size: 1.05rem; margin-bottom: 1rem;">${content.research}</p>
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem;">
              ${content.projects.map(project => `
                <div style="background: var(--bg-alt); padding: 1rem; border-radius: 0.5rem; border-left: 3px solid ${content.borderColor};">
                  <div style="font-weight: 600; margin-bottom: 0.5rem;">${project.name}</div>
                  <div style="font-size: 0.875rem; color: var(--text-muted);">${project.desc}</div>
                </div>
              `).join('')}
            </div>
          </div>
          
          <div style="margin-bottom: 2rem;">
            <h3 style="margin-bottom: 1rem; color: var(--primary);">${lang === 'en' ? '💼 Key Players' : '💼 Hauptakteure'}</h3>
            <div style="display: flex; gap: 1rem; flex-wrap: wrap;">
              ${content.players.map(player => `
                <div style="background: var(--bg-alt); padding: 0.75rem 1.5rem; border-radius: 2rem; font-weight: 600; border: 2px solid ${content.borderColor};">
                  ${player}
                </div>
              `).join('')}
            </div>
          </div>
          
          <div style="background: var(--bg-alt); padding: 2rem; border-radius: 1rem;">
            <h3 style="margin-bottom: 1rem; color: var(--primary);">${lang === 'en' ? '📊 Expected Impact' : '📊 Erwartete Auswirkung'}</h3>
            <p style="line-height: 1.8;">${content.impact}</p>
          </div>
        </div>
      </div>
    `;
    
    modal.classList.add('open');
  }
  
  function getFutureData() {
    return {
      hydrogen: {
        en: {
          icon: '🔋',
          title: 'Hydrogen Economy',
          subtitle: 'Clean Energy for Heavy Industry',
          vision: 'By 2030, Germany aims to produce 5 million tons of green hydrogen annually. Massive offshore wind farms will power electrolyzers, splitting water into hydrogen and oxygen. This clean fuel will replace coal in steel production, power long-haul trucks and ships, and serve as energy storage for the grid.',
          research: 'Germany invests €9 billion in hydrogen infrastructure through the National Hydrogen Strategy. Research focuses on efficient electrolyzers, hydrogen storage, fuel cells, and distribution networks. Pilot projects test hydrogen in steel mills, chemical plants, and transportation.',
          projects: [
            { name: 'H2Global', desc: 'International hydrogen import mechanism' },
            { name: 'H2Giga', desc: 'Mass production of electrolyzers' },
            { name: 'TransHyDE', desc: 'Hydrogen transport technologies' },
            { name: 'H2Mare', desc: 'Offshore hydrogen production' }
          ],
          players: ['Siemens Energy', 'Linde', 'ThyssenKrupp', 'RWE', 'Uniper', 'Fraunhofer ISE'],
          impact: 'Green hydrogen will decarbonize sectors where electrification is difficult: steel, chemicals, aviation, shipping. It creates 800,000 jobs, reduces CO2 by 90 million tons annually, and positions Germany as a global hydrogen technology leader. By 2045, hydrogen could provide 20% of Germany\'s energy needs.',
          gradient: '#eff6ff 0%, #dbeafe 100%',
          borderColor: '#3b82f6',
          headerColor: '#1e40af'
        },
        de: {
          icon: '🔋',
          title: 'Wasserstoffwirtschaft',
          subtitle: 'Saubere Energie für die Schwerindustrie',
          vision: 'Bis 2030 will Deutschland jährlich 5 Millionen Tonnen grünen Wasserstoff produzieren. Massive Offshore-Windparks werden Elektrolyseure antreiben, die Wasser in Wasserstoff und Sauerstoff spalten. Dieser saubere Kraftstoff wird Kohle in der Stahlproduktion ersetzen, Fernlaster und Schiffe antreiben und als Energiespeicher für das Netz dienen.',
          research: 'Deutschland investiert 9 Milliarden Euro in Wasserstoffinfrastruktur durch die Nationale Wasserstoffstrategie. Die Forschung konzentriert sich auf effiziente Elektrolyseure, Wasserstoffspeicherung, Brennstoffzellen und Verteilnetze. Pilotprojekte testen Wasserstoff in Stahlwerken, Chemieanlagen und im Transport.',
          projects: [
            { name: 'H2Global', desc: 'Internationaler Wasserstoff-Importmechanismus' },
            { name: 'H2Giga', desc: 'Massenproduktion von Elektrolyseuren' },
            { name: 'TransHyDE', desc: 'Wasserstoff-Transporttechnologien' },
            { name: 'H2Mare', desc: 'Offshore-Wasserstoffproduktion' }
          ],
          players: ['Siemens Energy', 'Linde', 'ThyssenKrupp', 'RWE', 'Uniper', 'Fraunhofer ISE'],
          impact: 'Grüner Wasserstoff wird Sektoren dekarbonisieren, in denen Elektrifizierung schwierig ist: Stahl, Chemie, Luftfahrt, Schifffahrt. Er schafft 800.000 Arbeitsplätze, reduziert CO2 um 90 Millionen Tonnen jährlich und positioniert Deutschland als globalen Wasserstofftechnologieführer. Bis 2045 könnte Wasserstoff 20% des deutschen Energiebedarfs decken.',
          gradient: '#eff6ff 0%, #dbeafe 100%',
          borderColor: '#3b82f6',
          headerColor: '#1e40af'
        }
      },
      quantum: {
        en: {
          icon: '🧠',
          title: 'Quantum Computing',
          subtitle: 'Computing Beyond Classical Limits',
          vision: 'By 2030, Germany will have multiple operational quantum computers with 1000+ qubits, accessible to researchers and industry. These machines will solve problems impossible for classical computers: drug discovery, materials design, cryptography, and optimization. Germany aims to be quantum-ready across key industries.',
          research: 'The Federal Ministry of Education invests €2 billion in quantum technologies. Research focuses on superconducting qubits, ion traps, photonic quantum computers, and quantum algorithms. Universities and Fraunhofer institutes collaborate with IBM, Google, and startups.',
          projects: [
            { name: 'IBM Quantum Ehningen', desc: 'First European quantum computer' },
            { name: 'Munich Quantum Valley', desc: '€300M quantum ecosystem' },
            { name: 'QPIC', desc: 'Photonic quantum computing' },
            { name: 'QSolid', desc: 'Solid-state quantum systems' }
          ],
          players: ['IBM', 'Fraunhofer', 'Max Planck', 'TU Munich', 'IQM', 'HQS Quantum'],
          impact: 'Quantum computing will revolutionize drug development (simulating molecules), materials science (designing batteries), logistics (optimizing routes), and finance (risk analysis). Germany\'s quantum industry could create 50,000 high-tech jobs and €10 billion in value by 2030. Early adoption gives competitive advantage in AI, chemistry, and cybersecurity.',
          gradient: '#f0fdf4 0%, #dcfce7 100%',
          borderColor: '#10b981',
          headerColor: '#065f46'
        },
        de: {
          icon: '🧠',
          title: 'Quantencomputing',
          subtitle: 'Computing jenseits klassischer Grenzen',
          vision: 'Bis 2030 wird Deutschland mehrere betriebsbereite Quantencomputer mit über 1000 Qubits haben, zugänglich für Forscher und Industrie. Diese Maschinen werden Probleme lösen, die für klassische Computer unmöglich sind: Arzneimittelentdeckung, Materialdesign, Kryptographie und Optimierung. Deutschland will in Schlüsselindustrien quantenbereit sein.',
          research: 'Das Bundesministerium für Bildung investiert 2 Milliarden Euro in Quantentechnologien. Die Forschung konzentriert sich auf supraleitende Qubits, Ionenfallen, photonische Quantencomputer und Quantenalgorithmen. Universitäten und Fraunhofer-Institute arbeiten mit IBM, Google und Startups zusammen.',
          projects: [
            { name: 'IBM Quantum Ehningen', desc: 'Erster europäischer Quantencomputer' },
            { name: 'Munich Quantum Valley', desc: '300 Mio. € Quanten-Ökosystem' },
            { name: 'QPIC', desc: 'Photonisches Quantencomputing' },
            { name: 'QSolid', desc: 'Festkörper-Quantensysteme' }
          ],
          players: ['IBM', 'Fraunhofer', 'Max Planck', 'TU München', 'IQM', 'HQS Quantum'],
          impact: 'Quantencomputing wird Arzneimittelentwicklung (Molekülsimulation), Materialwissenschaft (Batteriedesign), Logistik (Routenoptimierung) und Finanzen (Risikoanalyse) revolutionieren. Deutschlands Quantenindustrie könnte bis 2030 50.000 Hightech-Jobs und 10 Milliarden Euro Wert schaffen. Frühe Adoption verschafft Wettbewerbsvorteile in KI, Chemie und Cybersicherheit.',
          gradient: '#f0fdf4 0%, #dcfce7 100%',
          borderColor: '#10b981',
          headerColor: '#065f46'
        }
      },
      ai: {
        en: {
          icon: '🤖',
          title: 'AI & Autonomous Systems',
          subtitle: 'Trustworthy Intelligence',
          vision: 'By 2030, German AI will be synonymous with trustworthy, explainable systems. Level 4 autonomous vehicles will operate in cities. Industrial AI will optimize factories in real-time. Medical AI will assist diagnosis and drug discovery. Germany leads in AI ethics, privacy, and human-centric design.',
          research: 'Germany invests €5 billion in AI through the National AI Strategy. Research focuses on explainable AI, federated learning, edge computing, and human-AI collaboration. The German Research Center for AI (DFKI) leads with 1,200 researchers across 8 locations.',
          projects: [
            { name: 'DFKI', desc: 'German Research Center for AI' },
            { name: 'Cyber Valley', desc: 'AI research hub in Tübingen' },
            { name: 'AI Campus', desc: 'National AI learning platform' },
            { name: 'KI Park', desc: 'AI startup accelerator' }
          ],
          players: ['Siemens', 'SAP', 'Bosch', 'BMW', 'Mercedes', 'DFKI', 'Max Planck ETH'],
          impact: 'AI will boost German productivity by 15%, adding €330 billion to GDP by 2030. Autonomous trucks reduce logistics costs by 30%. Industrial AI increases manufacturing efficiency by 20%. Medical AI improves diagnosis accuracy by 40%. Germany\'s focus on trustworthy AI builds public acceptance and regulatory leadership.',
          gradient: '#fef3c7 0%, #fde68a 100%',
          borderColor: '#f59e0b',
          headerColor: '#92400e'
        },
        de: {
          icon: '🤖',
          title: 'KI & Autonome Systeme',
          subtitle: 'Vertrauenswürdige Intelligenz',
          vision: 'Bis 2030 wird deutsche KI synonym mit vertrauenswürdigen, erklärbaren Systemen sein. Autonome Fahrzeuge der Stufe 4 werden in Städten operieren. Industrielle KI wird Fabriken in Echtzeit optimieren. Medizinische KI wird Diagnose und Arzneimittelforschung unterstützen. Deutschland führt in KI-Ethik, Datenschutz und menschenzentriertem Design.',
          research: 'Deutschland investiert 5 Milliarden Euro in KI durch die Nationale KI-Strategie. Die Forschung konzentriert sich auf erklärbare KI, föderiertes Lernen, Edge Computing und Mensch-KI-Kollaboration. Das Deutsche Forschungszentrum für Künstliche Intelligenz (DFKI) führt mit 1.200 Forschern an 8 Standorten.',
          projects: [
            { name: 'DFKI', desc: 'Deutsches Forschungszentrum für KI' },
            { name: 'Cyber Valley', desc: 'KI-Forschungszentrum in Tübingen' },
            { name: 'KI Campus', desc: 'Nationale KI-Lernplattform' },
            { name: 'KI Park', desc: 'KI-Startup-Accelerator' }
          ],
          players: ['Siemens', 'SAP', 'Bosch', 'BMW', 'Mercedes', 'DFKI', 'Max Planck ETH'],
          impact: 'KI wird die deutsche Produktivität um 15% steigern und bis 2030 330 Milliarden Euro zum BIP beitragen. Autonome Lkw reduzieren Logistikkosten um 30%. Industrielle KI erhöht Fertigungseffizienz um 20%. Medizinische KI verbessert Diagnosegenauigkeit um 40%. Deutschlands Fokus auf vertrauenswürdige KI schafft öffentliche Akzeptanz und regulatorische Führerschaft.',
          gradient: '#fef3c7 0%, #fde68a 100%',
          borderColor: '#f59e0b',
          headerColor: '#92400e'
        }
      },
      circular: {
        en: {
          icon: '🌍',
          title: 'Circular Economy',
          subtitle: 'From Waste to Resource',
          vision: 'By 2030, Germany will recycle 70% of all materials, up from 50% today. Products will be designed for disassembly and reuse. Chemical recycling will break plastics into raw materials. Product-as-a-service models will replace ownership. Germany aims for a closed-loop economy where waste doesn\'t exist.',
          research: 'Germany invests €3 billion in circular economy research. Focus areas: advanced recycling technologies, biodegradable materials, product lifecycle management, and industrial symbiosis. Fraunhofer institutes develop chemical recycling, bio-based plastics, and remanufacturing processes.',
          projects: [
            { name: 'Circular Valley', desc: 'Circular economy innovation hub' },
            { name: 'ChemCycling', desc: 'Chemical plastic recycling' },
            { name: 'ReUse', desc: 'Product remanufacturing network' },
            { name: 'BioEconomy', desc: 'Bio-based materials research' }
          ],
          players: ['BASF', 'Henkel', 'BMW', 'Bosch', 'Fraunhofer', 'Ellen MacArthur Foundation'],
          impact: 'Circular economy will reduce raw material imports by 40%, saving €100 billion annually. It creates 200,000 jobs in recycling, remanufacturing, and repair. CO2 emissions drop by 50 million tons. Germany becomes a global leader in circular design, exporting technologies and consulting services worth €20 billion by 2030.',
          gradient: '#fce7f3 0%, #fbcfe8 100%',
          borderColor: '#ec4899',
          headerColor: '#9f1239'
        },
        de: {
          icon: '🌍',
          title: 'Kreislaufwirtschaft',
          subtitle: 'Von Abfall zu Ressource',
          vision: 'Bis 2030 wird Deutschland 70% aller Materialien recyceln, gegenüber 50% heute. Produkte werden für Demontage und Wiederverwendung konzipiert. Chemisches Recycling wird Kunststoffe in Rohstoffe zerlegen. Product-as-a-Service-Modelle werden Besitz ersetzen. Deutschland strebt eine geschlossene Kreislaufwirtschaft an, in der Abfall nicht existiert.',
          research: 'Deutschland investiert 3 Milliarden Euro in Kreislaufwirtschaftsforschung. Schwerpunkte: fortschrittliche Recyclingtechnologien, biologisch abbaubare Materialien, Produktlebenszyklusmanagement und industrielle Symbiose. Fraunhofer-Institute entwickeln chemisches Recycling, biobasierte Kunststoffe und Wiederaufbereitungsprozesse.',
          projects: [
            { name: 'Circular Valley', desc: 'Kreislaufwirtschafts-Innovationszentrum' },
            { name: 'ChemCycling', desc: 'Chemisches Kunststoffrecycling' },
            { name: 'ReUse', desc: 'Produkt-Wiederaufbereitungsnetzwerk' },
            { name: 'BioEconomy', desc: 'Biobasierte Materialforschung' }
          ],
          players: ['BASF', 'Henkel', 'BMW', 'Bosch', 'Fraunhofer', 'Ellen MacArthur Foundation'],
          impact: 'Kreislaufwirtschaft wird Rohstoffimporte um 40% reduzieren und jährlich 100 Milliarden Euro sparen. Sie schafft 200.000 Arbeitsplätze in Recycling, Wiederaufbereitung und Reparatur. CO2-Emissionen sinken um 50 Millionen Tonnen. Deutschland wird globaler Marktführer im zirkulären Design und exportiert Technologien und Beratungsdienstleistungen im Wert von 20 Milliarden Euro bis 2030.',
          gradient: '#fce7f3 0%, #fbcfe8 100%',
          borderColor: '#ec4899',
          headerColor: '#9f1239'
        }
      }
    };
  }
  
  function showCultureModal() {
    const lang = localStorage.getItem('lang') || 'en';
    const data = getCultureData();
    const content = lang === 'en' ? data.en : data.de;
    
    const modal = createModal();
    modal.innerHTML = `
      <div class="modal-content" style="max-width: 1000px;">
        <button class="modal-close" onclick="this.closest('.modal-overlay').classList.remove('open')" style="position: absolute; top: 1rem; right: 1rem; background: none; border: none; font-size: 2rem; cursor: pointer; color: var(--text-muted);">&times;</button>
        <div class="modal-body">
          <div style="text-align: center; margin-bottom: 2rem;">
            <div style="font-size: 4rem; margin-bottom: 1rem;">🏛️</div>
            <h2 style="margin-bottom: 0.5rem;">${content.title}</h2>
            <p style="color: var(--text-muted); font-size: 1.125rem;">${content.subtitle}</p>
          </div>
          
          <div style="background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%); padding: 2rem; border-radius: 1rem; border-left: 4px solid #f59e0b; margin-bottom: 2rem;">
            <h3 style="margin-bottom: 1rem; color: #92400e;">${lang === 'en' ? '🎯 Core Values' : '🎯 Kernwerte'}</h3>
            <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 1.5rem;">
              ${content.values.map(value => `
                <div style="background: rgba(255,255,255,0.7); padding: 1.5rem; border-radius: 0.75rem;">
                  <div style="font-size: 2rem; margin-bottom: 0.5rem;">${value.icon}</div>
                  <div style="font-weight: 700; margin-bottom: 0.5rem; color: #92400e;">${value.name}</div>
                  <div style="font-size: 0.875rem; color: #78350f;">${value.desc}</div>
                </div>
              `).join('')}
            </div>
          </div>
          
          <div style="margin-bottom: 2rem;">
            <h3 style="margin-bottom: 1rem; color: var(--primary);">${lang === 'en' ? '🏢 Innovation Ecosystem' : '🏢 Innovations-Ökosystem'}</h3>
            <p style="line-height: 1.8; margin-bottom: 1.5rem;">${content.ecosystem}</p>
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem;">
              ${content.institutions.map(inst => `
                <div style="background: var(--bg-alt); padding: 1.5rem; border-radius: 0.75rem; border-left: 3px solid #3b82f6;">
                  <div style="font-weight: 700; margin-bottom: 0.5rem; color: var(--primary);">${inst.name}</div>
                  <div style="font-size: 0.875rem; color: var(--text-muted); margin-bottom: 0.5rem;">${inst.desc}</div>
                  <div style="font-size: 0.75rem; color: var(--primary); font-weight: 600;">${inst.stat}</div>
                </div>
              `).join('')}
            </div>
          </div>
          
          <div style="margin-bottom: 2rem;">
            <h3 style="margin-bottom: 1rem; color: var(--primary);">${lang === 'en' ? '🏭 The Mittelstand Model' : '🏭 Das Mittelstand-Modell'}</h3>
            <div style="background: linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%); padding: 2rem; border-radius: 1rem; border-left: 4px solid #3b82f6;">
              <p style="line-height: 1.8; margin-bottom: 1rem;">${content.mittelstand}</p>
              <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 1rem; margin-top: 1.5rem;">
                ${content.mittelstandStats.map(stat => `
                  <div style="background: rgba(255,255,255,0.7); padding: 1rem; border-radius: 0.5rem; text-align: center;">
                    <div style="font-size: 1.75rem; font-weight: 700; color: #1e40af; margin-bottom: 0.25rem;">${stat.value}</div>
                    <div style="font-size: 0.75rem; color: #1e40af;">${stat.label}</div>
                  </div>
                `).join('')}
              </div>
            </div>
          </div>
          
          <div style="margin-bottom: 2rem;">
            <h3 style="margin-bottom: 1rem; color: var(--primary);">${lang === 'en' ? '🎓 Education & Training' : '🎓 Bildung & Ausbildung'}</h3>
            <p style="line-height: 1.8; margin-bottom: 1rem;">${content.education}</p>
            <div style="display: flex; gap: 1rem; flex-wrap: wrap;">
              ${content.educationFeatures.map(feature => `
                <div style="background: var(--bg-alt); padding: 0.75rem 1.5rem; border-radius: 2rem; font-weight: 600; border: 2px solid #10b981;">
                  ${feature}
                </div>
              `).join('')}
            </div>
          </div>
          
          <div style="background: linear-gradient(135deg, #fce7f3 0%, #fbcfe8 100%); padding: 2rem; border-radius: 1rem; border-left: 4px solid #ec4899;">
            <h3 style="margin-bottom: 1rem; color: #9f1239;">${lang === 'en' ? '🌟 Global Impact' : '🌟 Globale Auswirkung'}</h3>
            <p style="line-height: 1.8;">${content.impact}</p>
          </div>
        </div>
      </div>
    `;
    
    modal.classList.add('open');
  }
  
  function getCultureData() {
    return {
      en: {
        title: 'The German Innovation Culture',
        subtitle: 'Engineering Excellence Through Values & Collaboration',
        values: [
          { icon: '⚙️', name: 'Gründlichkeit', desc: 'Thoroughness and attention to detail in every aspect of work' },
          { icon: '🎯', name: 'Präzision', desc: 'Precision engineering and exacting standards of quality' },
          { icon: '🌱', name: 'Nachhaltigkeit', desc: 'Sustainability and long-term thinking in innovation' }
        ],
        ecosystem: 'Germany\'s innovation ecosystem is unique in its integration of research, industry, and education. Public-private partnerships drive applied research, while strong intellectual property protection encourages investment. Regional clusters (automotive in Stuttgart, chemicals in Ludwigshafen, tech in Munich) create knowledge networks.',
        institutions: [
          { name: 'Fraunhofer Society', desc: 'Applied research for industry', stat: '76 institutes, 30,000 employees' },
          { name: 'Max Planck Society', desc: 'Basic research excellence', stat: '86 institutes, 24,000 researchers' },
          { name: 'Helmholtz Association', desc: 'Large-scale research infrastructure', stat: '18 centers, 43,000 employees' },
          { name: 'Leibniz Association', desc: 'Interdisciplinary research', stat: '96 institutes, 20,000 employees' }
        ],
        mittelstand: 'The Mittelstand—family-owned small and medium enterprises—is the backbone of German innovation. These companies focus on niche markets, achieving global leadership through specialization. Long-term thinking (generations, not quarters), employee loyalty, and deep technical expertise create "hidden champions" that dominate specialized industries worldwide.',
        mittelstandStats: [
          { value: '99.5%', label: 'of companies' },
          { value: '60%', label: 'of jobs' },
          { value: '1,500+', label: 'hidden champions' },
          { value: '70%', label: 'of apprentices' }
        ],
        education: 'Germany\'s dual education system (Ausbildung) combines classroom learning with hands-on apprenticeships. Students spend 3-4 days per week working in companies, learning practical skills while earning wages. This creates a highly skilled workforce and ensures industry needs drive education. Universities of Applied Sciences (Fachhochschulen) bridge academic research and practical application.',
        educationFeatures: ['Dual Apprenticeships', 'Technical Universities', 'Industry Partnerships', 'Lifelong Learning', 'Meister Certification'],
        impact: 'German innovation culture produces consistent results: 110+ Nobel Prizes, world-leading exports in machinery and automotive, and the highest number of patent applications per capita in Europe. The focus on quality over quantity, long-term relationships, and continuous improvement (Kaizen) has made "Made in Germany" synonymous with excellence for over a century.'
      },
      de: {
        title: 'Die Deutsche Innovationskultur',
        subtitle: 'Ingenieursexzellenz durch Werte & Zusammenarbeit',
        values: [
          { icon: '⚙️', name: 'Gründlichkeit', desc: 'Sorgfalt und Liebe zum Detail in jedem Arbeitsaspekt' },
          { icon: '🎯', name: 'Präzision', desc: 'Präzisionstechnik und höchste Qualitätsstandards' },
          { icon: '🌱', name: 'Nachhaltigkeit', desc: 'Nachhaltigkeit und langfristiges Denken in Innovation' }
        ],
        ecosystem: 'Deutschlands Innovations-Ökosystem ist einzigartig in seiner Integration von Forschung, Industrie und Bildung. Öffentlich-private Partnerschaften treiben angewandte Forschung voran, während starker Schutz geistigen Eigentums Investitionen fördert. Regionale Cluster (Automotive in Stuttgart, Chemie in Ludwigshafen, Tech in München) schaffen Wissensnetzwerke.',
        institutions: [
          { name: 'Fraunhofer-Gesellschaft', desc: 'Angewandte Forschung für Industrie', stat: '76 Institute, 30.000 Mitarbeiter' },
          { name: 'Max-Planck-Gesellschaft', desc: 'Grundlagenforschung-Exzellenz', stat: '86 Institute, 24.000 Forscher' },
          { name: 'Helmholtz-Gemeinschaft', desc: 'Großforschungsinfrastruktur', stat: '18 Zentren, 43.000 Mitarbeiter' },
          { name: 'Leibniz-Gemeinschaft', desc: 'Interdisziplinäre Forschung', stat: '96 Institute, 20.000 Mitarbeiter' }
        ],
        mittelstand: 'Der Mittelstand—familiengeführte kleine und mittlere Unternehmen—ist das Rückgrat deutscher Innovation. Diese Unternehmen fokussieren sich auf Nischenmärkte und erreichen globale Führerschaft durch Spezialisierung. Langfristiges Denken (Generationen, nicht Quartale), Mitarbeiterloyalität und tiefe technische Expertise schaffen "Hidden Champions", die spezialisierte Industrien weltweit dominieren.',
        mittelstandStats: [
          { value: '99,5%', label: 'der Unternehmen' },
          { value: '60%', label: 'der Arbeitsplätze' },
          { value: '1.500+', label: 'Hidden Champions' },
          { value: '70%', label: 'der Azubis' }
        ],
        education: 'Deutschlands duales Bildungssystem (Ausbildung) kombiniert Unterricht mit praktischen Lehrstellen. Schüler verbringen 3-4 Tage pro Woche in Unternehmen, lernen praktische Fähigkeiten und verdienen Geld. Dies schafft hochqualifizierte Arbeitskräfte und stellt sicher, dass Industriebedürfnisse die Bildung antreiben. Fachhochschulen überbrücken akademische Forschung und praktische Anwendung.',
        educationFeatures: ['Duale Ausbildung', 'Technische Universitäten', 'Industriepartnerschaften', 'Lebenslanges Lernen', 'Meister-Zertifizierung'],
        impact: 'Deutsche Innovationskultur produziert konsistente Ergebnisse: 110+ Nobelpreise, weltführende Exporte in Maschinen und Automotive, und die höchste Anzahl an Patentanmeldungen pro Kopf in Europa. Der Fokus auf Qualität statt Quantität, langfristige Beziehungen und kontinuierliche Verbesserung (Kaizen) haben "Made in Germany" seit über einem Jahrhundert zum Synonym für Exzellenz gemacht.'
      }
    };
  }
})();
