console.log('Autoškola JEĎ! – ready');

document.addEventListener('DOMContentLoaded', () => {
  const menuToggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('nav');
  const body = document.body;
  const header = document.querySelector('header');

  // Scroll effect na header
  let lastScrollY = 0;
  const scrollIndicator = document.getElementById('scroll-indicator');
  
  window.addEventListener('scroll', () => {
    const currentScrollY = window.scrollY;
    
    if (currentScrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
    
    // Skrýt scroll indicator po scrollu
    if (scrollIndicator) {
      if (currentScrollY > 100) {
        scrollIndicator.classList.add('hidden');
      } else {
        scrollIndicator.classList.remove('hidden');
      }
    }
    
    lastScrollY = currentScrollY;
  });

  // Kliknutí na scroll indicator
  if (scrollIndicator) {
    scrollIndicator.addEventListener('click', () => {
      window.scrollTo({
        top: window.innerHeight,
        behavior: 'smooth'
      });
    });
  }

  // Modal pro Ceník
  const cenikBtn = document.getElementById('cenik-btn');
  const cenikModal = document.getElementById('cenik-modal');
  const modalClose = document.querySelector('.modal-close');
  const kontaktFromModal = document.getElementById('kontakt-from-modal');

  if (cenikBtn && cenikModal) {
    cenikBtn.addEventListener('click', (e) => {
      e.preventDefault();
      cenikModal.classList.add('active');
      body.style.overflow = 'hidden';
    });

    modalClose.addEventListener('click', () => {
      cenikModal.classList.remove('active');
      body.style.overflow = '';
    });

    // Zavření modalu po kliknutí mimo něj
    cenikModal.addEventListener('click', (e) => {
      if (e.target === cenikModal) {
        cenikModal.classList.remove('active');
        body.style.overflow = '';
      }
    });

    // Zavření modalu po kliknutí na "Kontaktovat"
    kontaktFromModal.addEventListener('click', () => {
      cenikModal.classList.remove('active');
      body.style.overflow = '';
    });

    // Zavření modalu na ESC
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && cenikModal.classList.contains('active')) {
        cenikModal.classList.remove('active');
        body.style.overflow = '';
      }
    });
  }

  if (menuToggle && nav) {
    menuToggle.addEventListener('click', () => {
      menuToggle.classList.toggle('active');
      nav.classList.toggle('active');
      body.style.overflow = nav.classList.contains('active') ? 'hidden' : '';
    });

    nav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        menuToggle.classList.remove('active');
        nav.classList.remove('active');
        body.style.overflow = '';
      });
    });

    document.addEventListener('click', (e) => {
      if (nav.classList.contains('active') &&
          !nav.contains(e.target) &&
          !menuToggle.contains(e.target)) {
        menuToggle.classList.remove('active');
        nav.classList.remove('active');
        body.style.overflow = '';
      }
    });
  }
});
