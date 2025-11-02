// Image Fallback Handler
document.addEventListener('DOMContentLoaded', function() {
  console.log('Image fallback handler loaded');
  
  // Handle scientist photos
  const personPhotos = document.querySelectorAll('.person-photo');
  personPhotos.forEach((img, index) => {
    const name = img.alt || 'Scientist';
    
    img.onerror = function() {
      console.error('Failed to load image:', img.src);
      // Fallback to UI Avatars
      const fallbackUrl = `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&size=200&background=3b82f6&color=fff&bold=true`;
      console.log('Using fallback:', fallbackUrl);
      this.src = fallbackUrl;
      this.onerror = null; // Prevent infinite loop
    };
    
    img.onload = function() {
      console.log('Image loaded successfully:', name);
    };
  });
  
  // Handle brand logos
  const brandLogos = document.querySelectorAll('.brand-logo');
  brandLogos.forEach((img, index) => {
    const name = img.alt || 'Brand';
    
    img.onerror = function() {
      console.error('Failed to load logo:', img.src);
      // Fallback to UI Avatars
      const fallbackUrl = `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&size=200&background=1e40af&color=fff&bold=true`;
      console.log('Using fallback:', fallbackUrl);
      this.src = fallbackUrl;
      this.onerror = null;
    };
    
    img.onload = function() {
      console.log('Logo loaded successfully:', name);
    };
  });
});
