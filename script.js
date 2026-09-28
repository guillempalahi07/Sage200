// Sage200 - interactivitat de la pàgina

document.addEventListener('DOMContentLoaded', () => {
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');
  const progressBar = document.getElementById('progressBar');
  const backToTop = document.getElementById('backToTop');
  const sections = document.querySelectorAll('.section[id]');
  const links = document.querySelectorAll('.nav-links a');
  const reveals = document.querySelectorAll('.reveal');

  // Menú hamburguesa (mòbil)
  navToggle.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('open');
    navToggle.classList.toggle('active', isOpen);
    navToggle.setAttribute('aria-expanded', isOpen);
  });

  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
      navToggle.classList.remove('active');
      navToggle.setAttribute('aria-expanded', 'false');
    });
  });

  // Barra de progrés de lectura
  window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    progressBar.style.width = progress + '%';

    backToTop.classList.toggle('show', scrollTop > 400);
  });

  // Marcar l'enllaç actiu segons la secció visible
  const navObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        links.forEach(l => l.classList.remove('active'));
        const activeLink = document.querySelector(`.nav-links a[href="#${entry.target.id}"]`);
        if (activeLink) activeLink.classList.add('active');
      }
    });
  }, { rootMargin: '-40% 0px -55% 0px' });

  sections.forEach(section => navObserver.observe(section));

  // Animació d'aparició en fer scroll
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  reveals.forEach(section => revealObserver.observe(section));

  // Botó de tornar amunt
  backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  // Comptador de visites (requereix servidor PHP; si no n'hi ha, s'oculta)
  const visitCountEl = document.getElementById('visitCount');
  if (visitCountEl) {
    fetch('visites.php')
      .then(res => {
        if (!res.ok) throw new Error('No disponible');
        return res.json();
      })
      .then(data => {
        visitCountEl.textContent = data.visites;
      })
      .catch(() => {
        visitCountEl.closest('.visits').style.display = 'none';
      });
  }
});
