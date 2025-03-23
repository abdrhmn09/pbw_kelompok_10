function toggleMenu() {
  const navCenter = document.querySelector('.nav-center');
  const hamburger = document.querySelector('.hamburger');
  
  navCenter.classList.toggle('active');
  hamburger.classList.toggle('active');
  document.body.classList.toggle('nav-open'); // Tambahkan atau hapus class pada body
}

// Close menu when clicking outside
document.addEventListener('click', (e) => {
  const navCenter = document.querySelector('.nav-center');
  const hamburger = document.querySelector('.hamburger');
  
  if (!navCenter.contains(e.target) && !hamburger.contains(e.target)) {
    navCenter.classList.remove('active');
    hamburger.classList.remove('active');
    document.body.classList.remove('nav-open'); // Hapus class saat menu ditutup
  }
});

// Smooth scroll + offset header + tutup menu setelah klik
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    
    const targetId = this.getAttribute('href');
    const targetElement = document.querySelector(targetId);
    if (!targetElement) return;
    
    const headerHeight = document.querySelector('header').offsetHeight;
    const elementPosition = targetElement.getBoundingClientRect().top;
    const offsetPosition = window.pageYOffset + elementPosition - headerHeight;
    
    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth'
    });
    
    // Tutup menu mobile dan hapus class .nav-open
    const navCenter = document.querySelector('.nav-center');
    const hamburger = document.querySelector('.hamburger');
    navCenter.classList.remove('active');
    hamburger.classList.remove('active');
    document.body.classList.remove('nav-open');
  });
});
