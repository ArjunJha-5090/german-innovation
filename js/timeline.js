// Universal Timeline Animation for All Pages
document.addEventListener('DOMContentLoaded', function() {
  // Find timeline - works for both automotive and history pages
  const autoTimeline = document.getElementById('autoTimeline');
  const historyTimeline = document.getElementById('historyTimeline');
  const timeline = autoTimeline || historyTimeline;
  
  if(!timeline) {
    console.log('No timeline found on this page');
    return;
  }
  
  const timelineItems = timeline.querySelectorAll('.timeline-item');
  const isAutomotive = timeline.id === 'autoTimeline';
  const isHistory = timeline.id === 'historyTimeline';
  
  console.log('Timeline found:', timeline.id, 'Items:', timelineItems.length);
  
  if(timelineItems.length === 0) {
    console.error('No timeline items found!');
    return;
  }

  // Icons for automotive timeline
  const autoIcons = ['🚗', '🏎️', '🔧', '🚙', '🏁', '🛡️', '⚡', '🔋'];
  const autoYears = ['1886', '1901', '1926', '1938', '1963', '1980', '2020', '2023'];
  
  // Icons for history timeline
  const historyIcons = ['🏰', '🇩🇪', '🏭', '🎭', '🏗️', '🧱', '🤖', '🔮'];
  const historyYears = ['962', '1871', '1871', '1919', '1950s', '1990', '2010s', 'Future'];
  
  const icons = isAutomotive ? autoIcons : historyIcons;
  const years = isAutomotive ? autoYears : historyYears;
  
  // Add icons and year badges to each timeline item
  timelineItems.forEach((item, index) => {
    // Remove 'reveal' class
    item.classList.remove('reveal');
    
    // Add year badge
    const yearBadge = document.createElement('div');
    yearBadge.className = 'timeline-year';
    yearBadge.textContent = years[index] || '';
    item.insertBefore(yearBadge, item.firstChild);
    
    // Add icon
    const icon = document.createElement('div');
    icon.className = 'timeline-icon';
    icon.textContent = icons[index] || '📌';
    item.insertBefore(icon, item.firstChild);
    
    // Add alternating sides for BOTH timelines
    if(isAutomotive || isHistory) {
      if(index % 2 === 0) {
        item.classList.add('timeline-left');
        console.log('Item', index, 'set to LEFT');
      } else {
        item.classList.add('timeline-right');
        console.log('Item', index, 'set to RIGHT');
      }
    }
    
    // Animate items one by one continuously
    setTimeout(() => {
      item.classList.add('visible');
      console.log('Item', index, 'animated in');
    }, index * 300); // 300ms delay between each card
  });
  
  // Create progress line for automotive timeline
  if(isAutomotive) {
    const progressLine = document.createElement('div');
    progressLine.className = 'timeline-progress';
    timeline.appendChild(progressLine);
  }
  
  // Scroll progress indicator
  function updateProgress() {
    const timelineRect = timeline.getBoundingClientRect();
    const viewportHeight = window.innerHeight;
    const scrollStart = timelineRect.top + window.scrollY - viewportHeight;
    const scrollEnd = timelineRect.bottom + window.scrollY;
    const scrollRange = scrollEnd - scrollStart;
    const currentScroll = window.scrollY + viewportHeight / 2;
    
    let progress = (currentScroll - scrollStart) / scrollRange;
    progress = Math.max(0, Math.min(1, progress));
    
    // Update progress line for automotive
    if(isAutomotive) {
      const progressLine = document.querySelector('.timeline-progress');
      if(progressLine) {
        progressLine.style.height = `${progress * 100}%`;
      }
    }
    
    // Highlight active items based on scroll
    timelineItems.forEach((item, index) => {
      const itemProgress = (index + 1) / timelineItems.length;
      if(progress >= itemProgress - 0.15) {
        item.classList.add('active');
      } else {
        item.classList.remove('active');
      }
    });
  }
  
  // Update on scroll with throttling
  let ticking = false;
  window.addEventListener('scroll', () => {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        updateProgress();
        ticking = false;
      });
      ticking = true;
    }
  });
  
  // Initial update
  updateProgress();
  console.log('Timeline animation initialized');
});
