// Timeline Card Modal System
document.addEventListener('DOMContentLoaded', function() {
  // Create modal HTML
  const modalHTML = `
    <div id="timelineModal" class="timeline-modal" style="display: none;">
      <div class="timeline-modal-overlay"></div>
      <div class="timeline-modal-content">
        <button class="timeline-modal-close">&times;</button>
        <div class="timeline-modal-body">
          <div class="modal-icon"></div>
          <div class="modal-year"></div>
          <h2 class="modal-title"></h2>
          <div class="modal-description"></div>
          <div class="modal-details"></div>
        </div>
      </div>
    </div>
  `;
  
  document.body.insertAdjacentHTML('beforeend', modalHTML);
  
  const modal = document.getElementById('timelineModal');
  const closeBtn = modal.querySelector('.timeline-modal-close');
  const overlay = modal.querySelector('.timeline-modal-overlay');
  
  // Timeline data with extended details
  const timelineData = {
    automotive: [
      {
        year: '1886',
        icon: '🚗',
        title: 'Benz Patent-Motorwagen',
        description: 'Carl Benz patents the first automobile in Mannheim, Germany.',
        details: `
          <h3>The Birth of the Automobile</h3>
          <p><strong>Patent Number:</strong> DRP 37435 (January 29, 1886)</p>
          <p><strong>Specifications:</strong></p>
          <ul>
            <li>Three-wheeled vehicle</li>
            <li>Single-cylinder four-stroke engine</li>
            <li>0.75 HP (0.55 kW) at 400 rpm</li>
            <li>Top speed: 16 km/h (10 mph)</li>
            <li>Weight: 265 kg</li>
          </ul>
          <p><strong>Historical Impact:</strong> Bertha Benz's famous 106 km road trip in 1888 proved the car's reliability and sparked public interest. This journey is considered the first long-distance automobile trip in history.</p>
          <p><strong>Legacy:</strong> Founded the global automotive industry worth trillions today.</p>
        `
      },
      {
        year: '1901',
        icon: '🏎️',
        title: 'Mercedes 35 HP',
        description: 'Daimler-Motoren-Gesellschaft introduces the Mercedes 35 HP.',
        details: `
          <h3>The First Modern Car</h3>
          <p><strong>Designer:</strong> Wilhelm Maybach</p>
          <p><strong>Specifications:</strong></p>
          <ul>
            <li>35 HP four-cylinder engine</li>
            <li>5.9-liter displacement</li>
            <li>Top speed: 85 km/h (53 mph)</li>
            <li>Low center of gravity</li>
            <li>Honeycomb radiator</li>
          </ul>
          <p><strong>Innovation:</strong> First car with a modern configuration - engine in front, driver in center, pressed steel frame. Set the template for all future automobiles.</p>
          <p><strong>Named After:</strong> Mercedes Jellinek, daughter of businessman Emil Jellinek who commissioned the car.</p>
        `
      },
      {
        year: '1926',
        icon: '🔧',
        title: 'Daimler-Benz Merger',
        description: 'Daimler and Benz merge to form Mercedes-Benz.',
        details: `
          <h3>Birth of an Icon</h3>
          <p><strong>Merger Date:</strong> June 28, 1926</p>
          <p><strong>Reason:</strong> Economic challenges of post-WWI Germany forced competitors to unite.</p>
          <p><strong>Result:</strong> Daimler-Benz AG created, combining two pioneering automotive companies.</p>
          <p><strong>Brand Identity:</strong></p>
          <ul>
            <li>Three-pointed star (Daimler) symbolizing land, sea, and air</li>
            <li>Laurel wreath (Benz) symbolizing victory</li>
            <li>Mercedes-Benz name combining both legacies</li>
          </ul>
          <p><strong>Impact:</strong> Created one of the world's most prestigious automotive brands, synonymous with luxury, safety, and engineering excellence.</p>
        `
      },
      {
        year: '1938',
        icon: '🚙',
        title: 'Volkswagen Beetle',
        description: 'Ferdinand Porsche designs the Volkswagen Beetle.',
        details: `
          <h3>The People's Car</h3>
          <p><strong>Designer:</strong> Ferdinand Porsche</p>
          <p><strong>Original Name:</strong> KdF-Wagen (Kraft durch Freude - Strength through Joy)</p>
          <p><strong>Design Goals:</strong></p>
          <ul>
            <li>Affordable for average German family</li>
            <li>Reliable and easy to maintain</li>
            <li>Fuel-efficient</li>
            <li>Capable of carrying 2 adults + 3 children</li>
          </ul>
          <p><strong>Production:</strong> 21.5 million units (1938-2003) - one of the best-selling cars ever.</p>
          <p><strong>Cultural Icon:</strong> Featured in movies (Herbie), became symbol of 1960s counterculture, and remains beloved worldwide.</p>
        `
      },
      {
        year: '1963',
        icon: '🏁',
        title: 'Porsche 911 Launch',
        description: 'Porsche unveils the iconic 911 sports car.',
        details: `
          <h3>The Ultimate Sports Car</h3>
          <p><strong>Designer:</strong> Ferdinand "Butzi" Porsche (grandson of Ferdinand Porsche)</p>
          <p><strong>Original Specs:</strong></p>
          <ul>
            <li>2.0L flat-six engine</li>
            <li>130 HP</li>
            <li>Top speed: 210 km/h</li>
            <li>Rear-engine, rear-wheel drive</li>
          </ul>
          <p><strong>Evolution:</strong> Still in production today (60+ years), continuously refined but maintaining core design philosophy.</p>
          <p><strong>Racing Success:</strong> Over 30,000 race victories, including 19 overall wins at Le Mans.</p>
          <p><strong>Legacy:</strong> Defines the sports car category, combining daily usability with track performance.</p>
        `
      },
      {
        year: '1980',
        icon: '🛡️',
        title: 'ABS Technology',
        description: 'Bosch introduces electronic Anti-lock Braking System.',
        details: `
          <h3>Revolutionary Safety Technology</h3>
          <p><strong>Developer:</strong> Bosch in collaboration with Mercedes-Benz</p>
          <p><strong>First Car:</strong> Mercedes-Benz S-Class (W126)</p>
          <p><strong>How It Works:</strong></p>
          <ul>
            <li>Prevents wheel lockup during hard braking</li>
            <li>Maintains steering control</li>
            <li>Reduces stopping distance on most surfaces</li>
            <li>Pulses brakes up to 15 times per second</li>
          </ul>
          <p><strong>Impact:</strong> Now mandatory in most countries. Estimated to prevent 20% of fatal crashes.</p>
          <p><strong>Evolution:</strong> Led to ESP (Electronic Stability Program), traction control, and modern driver assistance systems.</p>
        `
      },
      {
        year: '2020',
        icon: '⚡',
        title: 'Volkswagen ID.3 & ID.4',
        description: 'VW's MEB platform brings mass-market EVs to Europe.',
        details: `
          <h3>Electric Revolution</h3>
          <p><strong>Platform:</strong> MEB (Modular Electric Drive Matrix)</p>
          <p><strong>ID.3 Specs:</strong></p>
          <ul>
            <li>Battery: 45-77 kWh</li>
            <li>Range: up to 550 km</li>
            <li>Power: 150-204 HP</li>
            <li>0-100 km/h: 7.3 seconds</li>
          </ul>
          <p><strong>Strategy:</strong> VW's €35 billion investment in electric mobility by 2025.</p>
          <p><strong>Goal:</strong> Carbon-neutral by 2050. Electric vehicles for everyone, not just luxury buyers.</p>
          <p><strong>Impact:</strong> Making EVs affordable and practical for mass market, following the original Beetle philosophy.</p>
        `
      },
      {
        year: '2023',
        icon: '🔋',
        title: 'Mercedes EQS',
        description: 'Mercedes-Benz EQS sets new standards for luxury EVs.',
        details: `
          <h3>The Electric S-Class</h3>
          <p><strong>Specifications:</strong></p>
          <ul>
            <li>Battery: 107.8 kWh</li>
            <li>Range: up to 770 km (WLTP)</li>
            <li>Power: up to 523 HP (EQS 53)</li>
            <li>0-100 km/h: 3.4 seconds</li>
            <li>Drag coefficient: 0.20 Cd (most aerodynamic production car)</li>
          </ul>
          <p><strong>Technology:</strong></p>
          <ul>
            <li>MBUX Hyperscreen - 56" curved display</li>
            <li>Level 3 autonomous driving capability</li>
            <li>Air suspension with curve tilting</li>
            <li>Over-the-air updates</li>
          </ul>
          <p><strong>Luxury:</strong> Combines S-Class comfort with zero emissions and cutting-edge technology.</p>
        `
      }
    ],
    history: [
      // Add history timeline data if needed
    ]
  };
  
  // Get all timeline items
  const timelineItems = document.querySelectorAll('.automotive-timeline .timeline-item, #historyTimeline .timeline-item');
  
  timelineItems.forEach((item, index) => {
    item.addEventListener('click', function() {
      const isAutomotive = this.closest('#autoTimeline') !== null;
      const data = isAutomotive ? timelineData.automotive[index] : timelineData.history[index];
      
      if (data) {
        // Populate modal
        modal.querySelector('.modal-icon').textContent = data.icon;
        modal.querySelector('.modal-year').textContent = data.year;
        modal.querySelector('.modal-title').textContent = data.title;
        modal.querySelector('.modal-description').textContent = data.description;
        modal.querySelector('.modal-details').innerHTML = data.details;
        
        // Show modal
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
      }
    });
  });
  
  // Close modal
  function closeModal() {
    modal.style.display = 'none';
    document.body.style.overflow = '';
  }
  
  closeBtn.addEventListener('click', closeModal);
  overlay.addEventListener('click', closeModal);
  
  // Close on Escape key
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && modal.style.display === 'block') {
      closeModal();
    }
  });
});
