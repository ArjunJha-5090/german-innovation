// Automotive Timeline Animation
document.addEventListener('DOMContentLoaded', function() {
  const timeline = document.getElementById('autoTimeline');
  const timelineItems = document.querySelectorAll('.timeline-item');
  
  console.log('Timeline loaded, items:', timelineItems.length);
  
  if(!timeline || timelineItems.length === 0) {
    console.error('Timeline not found!');
    return;
  }

  // Add icons and year badges to each timeline item
  const icons = ['🚗', '🏎️', '🔧', '🚙', '🏁', '🛡️', '⚡', '🔋'];
  const years = ['1886', '1901', '1926', '1938', '1963', '1980', '2020', '2023'];
  
  timelineItems.forEach((item, index) => {
    // Add year badge
    const yearBadge = document.createElement('div');
    yearBadge.className = 'timeline-year';
    yearBadge.textContent = years[index] || '';
    item.insertBefore(yearBadge, item.firstChild);
    
    // Add icon
    const icon = document.createElement('div');
    icon.className = 'timeline-icon';
    icon.textContent = icons[index] || '🚗';
    item.insertBefore(icon, item.firstChild);
    
    // Add alternating sides
    if(index % 2 === 0) {
      item.classList.add('timeline-left');
    } else {
      item.classList.add('timeline-right');
    }
    
    // Make items visible immediately with stagger
    setTimeout(() => {
      item.classList.add('visible');
      console.log('Item', index, 'visible');
    }, index * 100);
  });
  
  // Intersection Observer - only adds visible, never removes
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px'
  };
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if(entry.isIntersecting) {
        // Add visible class and never remove it
        entry.target.classList.add('visible');
        // Stop observing once visible
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);
  
  // Only observe items that aren't already visible
  timelineItems.forEach(item => {
    if(!item.classList.contains('visible')) {
      observer.observe(item);
    }
  });
  
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
    
    // Update progress line if it exists
    const progressLine = document.querySelector('.timeline-progress');
    if(progressLine) {
      progressLine.style.height = `${progress * 100}%`;
    }
    
    // Highlight active items based on scroll
    timelineItems.forEach((item, index) => {
      const itemProgress = (index + 1) / timelineItems.length;
      if(progress >= itemProgress - 0.1) {
        item.classList.add('active');
      } else {
        item.classList.remove('active');
      }
    });
  }
  
  // Create progress line
  const progressLine = document.createElement('div');
  progressLine.className = 'timeline-progress';
  timeline.appendChild(progressLine);
  
  // Update on scroll
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
  
  updateProgress();
});
