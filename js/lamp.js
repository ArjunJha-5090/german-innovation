// Lamp toggle -> Simple authentication for static site
(function(){
  const toggle = document.getElementById('lampToggle');
  const modal = document.getElementById('loginModal');
  const cone = document.getElementById('light-cone');
  const head = document.getElementById('head');
  const form = document.getElementById('loginForm');

  if(!toggle) return;

  // If already authed, send to target page directly
  const params = new URLSearchParams(location.search);
  const next = params.get('next') || 'index.html';
  if(localStorage.getItem('authed') === '1'){
    window.location.href = next;
    return;
  }

  toggle.addEventListener('change', () => {
    const on = toggle.checked;
    cone.style.transition = 'opacity .35s ease';
    cone.style.opacity = on ? '1' : '0';
    if(on){
      // Simple client-side authentication for static site
      localStorage.setItem('authed', '1');
      setTimeout(()=>{ 
        window.location.href = 'technologies.html'; 
      }, 800);
    }
  });

  // subtle head follow
  document.addEventListener('mousemove', (e)=>{
    const svg = document.querySelector('.lamp-svg');
    if(!svg) return;
    const rect = svg.getBoundingClientRect();
    const cx = rect.left + rect.width/2;
    const cy = rect.top + rect.height/2 - 40;
    const dx = (e.clientX - cx)/rect.width * 20;
    const dy = (e.clientY - cy)/rect.height * 20;
    head.setAttribute('transform', `rotate(${dx.toFixed(1)} 150 110)`);
  });

  // Handle form login
  if(form){
    form.addEventListener('submit', (e)=>{
      e.preventDefault();
      // Simple demo validation for static site
      const email = form.elements['email'].value.trim();
      const pass = form.elements['password'].value.trim();
      if(email && pass){
        // Simple client-side auth
        localStorage.setItem('authed', '1');
        window.location.href = next;
      } else {
        alert('Please enter email and password.');
      }
    });
  }
})();
