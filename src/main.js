console.log('Autoškola JEĎ! – ready');

document.addEventListener('DOMContentLoaded', () => {
  const menuToggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('nav');
  const body = document.body;
  const header = document.querySelector('header');

  // Scroll effect na header
  let lastScrollY = 0;
  const scrollIndicator = document.getElementById('scroll-indicator');
  let isScrolledPastHero = false;
  
  window.addEventListener('scroll', () => {
    const currentScrollY = window.scrollY;
    
    if (currentScrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
    
    // Otočit scroll indicator po scrollu dolů
    if (scrollIndicator) {
      if (currentScrollY > 100) {
        if (!isScrolledPastHero) {
          scrollIndicator.classList.add('flipped');
          isScrolledPastHero = true;
        }
      } else {
        if (isScrolledPastHero) {
          scrollIndicator.classList.remove('flipped');
          isScrolledPastHero = false;
        }
      }
    }
    
    lastScrollY = currentScrollY;
  });

  // Kliknutí na scroll indicator - dynamické přepínání
  if (scrollIndicator) {
    scrollIndicator.addEventListener('click', () => {
      if (isScrolledPastHero) {
        // Jsme dole od hero - scrollnout nahoru na začátek
        smoothScrollTo(0);
      } else {
        // Jsme nahoře - scrollnout dolů o blok
        smoothScrollTo(window.innerHeight);
      }
    });
  }

  // Kliknutí na druhou scroll indicator (dole) - dynamické přepínání
  const scrollIndicatorBottom = document.getElementById('scroll-indicator-bottom');
  let isScrolledToBottom = false;
  
  if (scrollIndicatorBottom) {
    // Sledování scrollu pro otočení šipky
    window.addEventListener('scroll', () => {
      const scrollHeight = document.documentElement.scrollHeight;
      const scrollTop = window.scrollY;
      const clientHeight = window.innerHeight;
      const bottomThreshold = 200; // Tolerance pro "jsem dole"
      
      // Zjistit, jestli jsme dole
      if (scrollHeight - scrollTop - clientHeight < bottomThreshold) {
        if (!isScrolledToBottom) {
          scrollIndicatorBottom.classList.add('flipped');
          isScrolledToBottom = true;
        }
      } else {
        if (isScrolledToBottom) {
          scrollIndicatorBottom.classList.remove('flipped');
          isScrolledToBottom = false;
        }
      }
    });
    
    // Kliknutí na šipku
    scrollIndicatorBottom.addEventListener('click', () => {
      if (isScrolledToBottom) {
        // Jsme dole - scrollnout o blok nahoru
        const currentPosition = window.scrollY;
        const targetPosition = Math.max(0, currentPosition - window.innerHeight);
        smoothScrollTo(targetPosition);
      } else {
        // Nejsme dole - scrollnout dolů
        smoothScrollTo(document.body.scrollHeight);
      }
    });
  }

  // Smooth scroll funkce pro opakované použití
  function smoothScrollTo(targetPosition, duration = 1500) {
    const startPosition = window.pageYOffset;
    const distance = targetPosition - startPosition;
    let start = null;
    
    function animation(currentTime) {
      if (start === null) start = currentTime;
      const timeElapsed = currentTime - start;
      const run = ease(timeElapsed, startPosition, distance, duration);
      window.scrollTo(0, run);
      if (timeElapsed < duration) requestAnimationFrame(animation);
    }
    
    function ease(t, b, c, d) {
      t /= d / 2;
      if (t < 1) return c / 2 * t * t + b;
      t--;
      return -c / 2 * (t * (t - 2) - 1) + b;
    }
    
    requestAnimationFrame(animation);
  }

  // Kliknutí na tlačítko "Kontaktujte nás"
  const kontaktBtn = document.getElementById('kontakt-btn');
  if (kontaktBtn) {
    kontaktBtn.addEventListener('click', (e) => {
      e.preventDefault();
      const footer = document.getElementById('kontakt');
      if (footer) {
        const footerPosition = footer.offsetTop;
        smoothScrollTo(footerPosition);
      }
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
      
      // Reset scroll position modalu na začátek
      const modalContent = cenikModal.querySelector('.modal-content');
      if (modalContent) {
        modalContent.scrollTop = 0;
      }
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
    kontaktFromModal.addEventListener('click', (e) => {
      e.preventDefault();
      cenikModal.classList.remove('active');
      body.style.overflow = '';
      
      // Scrollnout na footer
      const footer = document.getElementById('kontakt');
      if (footer) {
        const footerPosition = footer.offsetTop;
        smoothScrollTo(footerPosition);
      }
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
