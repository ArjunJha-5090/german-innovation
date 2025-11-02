// Brands Page Animation
document.addEventListener('DOMContentLoaded', function() {
  const brandCards = document.querySelectorAll('.brand-card');
  
  if(brandCards.length === 0) return;
  
  console.log('Animating', brandCards.length, 'brand cards');
  
  // Animate cards one by one
  brandCards.forEach((card, index) => {
    setTimeout(() => {
      card.classList.add('visible');
      console.log('Brand card', index, 'visible');
    }, index * 150); // 150ms delay between each card
  });
});
