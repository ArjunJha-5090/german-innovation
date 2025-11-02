// Technology Card Popup Handler
document.addEventListener('DOMContentLoaded', function() {
  // Create modal HTML
  const modalHTML = `
    <div id="techModal" class="tech-modal" style="display: none;">
      <div class="tech-modal-overlay"></div>
      <div class="tech-modal-content">
        <button class="tech-modal-close">&times;</button>
        <div class="tech-modal-body">
          <div class="modal-tech-icon"></div>
          <h2 class="modal-tech-title"></h2>
          <div class="modal-tech-inventor"></div>
          <div class="modal-tech-desc"></div>
          <div class="modal-tech-details"></div>
        </div>
      </div>
    </div>
  `;
  
  document.body.insertAdjacentHTML('beforeend', modalHTML);
  
  const modal = document.getElementById('techModal');
  const closeBtn = modal.querySelector('.tech-modal-close');
  const overlay = modal.querySelector('.tech-modal-overlay');
  
  // Get all tech cards
  const techCards = document.querySelectorAll('.tech-card-clickable');
  
  techCards.forEach(card => {
    const button = card.querySelector('button');
    
    if (button) {
      button.addEventListener('click', function(e) {
        e.stopPropagation();
        
        // Get card data
        const icon = card.querySelector('div[style*="font-size: 3rem"]').textContent;
        const title = card.querySelector('h3').textContent;
        const inventor = card.querySelector('div[style*="font-size: 0.875rem"]').textContent;
        const description = card.querySelector('p').textContent;
        const extraContent = card.querySelector('.tech-card-extra');
        
        // Populate modal
        modal.querySelector('.modal-tech-icon').textContent = icon;
        modal.querySelector('.modal-tech-title').textContent = title;
        modal.querySelector('.modal-tech-inventor').textContent = inventor;
        modal.querySelector('.modal-tech-desc').textContent = description;
        modal.querySelector('.modal-tech-details').innerHTML = extraContent ? extraContent.innerHTML : '';
        
        // Show modal
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
      });
    }
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
