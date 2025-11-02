// Flip card interactions
(function(){
  document.querySelectorAll('.flip-card').forEach(card => {
    card.addEventListener('click', (e) => {
      // Don't flip if clicking on a link
      if(e.target.tagName === 'A') return;
      card.classList.toggle('flipped');
    });
  });
})();
