'use strict';

window.addEventListener('load', () => {
  const loader = document.getElementById('loader');

  setTimeout(() => {
    loader.classList.add('loaded');
    triggerHeroEntrance();

    const heroImg = document.getElementById('heroImg');
    if (heroImg) heroImg.classList.add('zoomed');
  }, 1800);
});

function triggerHeroEntrance() {
  const heroEls = document.querySelectorAll('#hero .reveal-up');
  heroEls.forEach((el, index) => {
    setTimeout(() => {
      el.classList.add('visible');
    }, index * 140);
  });
}

const navbar = document.getElementById('navbar');
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('section[id]');
const hamburger = document.getElementById('hamburger');
const navLinksEl = document.getElementById('navLinks');

window.addEventListener('scroll', () => {
  const scrollY = window.scrollY;

  if (scrollY > 60) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }

  let current = '';
  sections.forEach(section => {
    const sectionTop = section.offsetTop - 120;
    const sectionHeight = section.offsetHeight;
    if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
      current = section.getAttribute('id');
    }
  });

  navLinks.forEach(link => {
    link.classList.toggle('active', link.getAttribute('href') === `#${current}`);
  });
}, { passive: true });

if (hamburger && navLinksEl) {
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    navLinksEl.classList.toggle('open');
  });

  navLinksEl.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('open');
      navLinksEl.classList.remove('open');
    });
  });
}

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, {
  threshold: 0.12,
  rootMargin: '0px 0px -40px 0px'
});

document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right').forEach(el => {
  if (!el.closest('#hero')) {
    revealObserver.observe(el);
  }
});

document.querySelectorAll('.ripple').forEach(btn => {
  btn.addEventListener('click', function(e) {
    const rect = this.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height) * 2;
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;

    const wave = document.createElement('span');
    wave.classList.add('ripple-wave');
    wave.style.cssText = `width:${size}px;height:${size}px;left:${x}px;top:${y}px;`;
    this.appendChild(wave);
    wave.addEventListener('animationend', () => wave.remove());
  });
});

const track = document.getElementById('testimonialTrack');
const dotsContainer = document.getElementById('sliderDots');
const prevBtn = document.getElementById('sliderPrev');
const nextBtn = document.getElementById('sliderNext');

if (track && dotsContainer && prevBtn && nextBtn) {
  const cards = track.querySelectorAll('.testimonial-card');
  let currentIndex = 0;
  let autoSlideInterval;

  function getVisibleCount() {
    if (window.innerWidth <= 768) return 1;
    if (window.innerWidth <= 1100) return 2;
    return 3;
  }

  function getMaxIndex() {
    return Math.max(0, cards.length - getVisibleCount());
  }

  function buildDots() {
    dotsContainer.innerHTML = '';
    const max = getMaxIndex();
    for (let i = 0; i <= max; i += 1) {
      const dot = document.createElement('button');
      dot.type = 'button';
      dot.className = `dot${i === currentIndex ? ' active' : ''}`;
      dot.setAttribute('aria-label', `Go to review set ${i + 1}`);
      dot.addEventListener('click', () => goTo(i));
      dotsContainer.appendChild(dot);
    }
  }

  function updateDots() {
    dotsContainer.querySelectorAll('.dot').forEach((dot, index) => {
      dot.classList.toggle('active', index === currentIndex);
    });
  }

  function goTo(index) {
    const max = getMaxIndex();
    currentIndex = Math.max(0, Math.min(index, max));
    const cardWidth = cards[0].offsetWidth + 24;
    track.style.transform = `translateX(-${currentIndex * cardWidth}px)`;
    updateDots();
  }

  function startAuto() {
    autoSlideInterval = setInterval(() => {
      const max = getMaxIndex();
      goTo(currentIndex >= max ? 0 : currentIndex + 1);
    }, 4500);
  }

  function resetAuto() {
    clearInterval(autoSlideInterval);
    startAuto();
  }

  prevBtn.addEventListener('click', () => {
    goTo(currentIndex - 1);
    resetAuto();
  });

  nextBtn.addEventListener('click', () => {
    const max = getMaxIndex();
    goTo(currentIndex >= max ? 0 : currentIndex + 1);
    resetAuto();
  });

  let touchStartX = 0;
  track.addEventListener('touchstart', e => {
    touchStartX = e.touches[0].clientX;
  }, { passive: true });

  track.addEventListener('touchend', e => {
    const diff = touchStartX - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) {
      goTo(diff > 0 ? currentIndex + 1 : currentIndex - 1);
      resetAuto();
    }
  }, { passive: true });

  buildDots();
  goTo(0);
  startAuto();

  window.addEventListener('resize', () => {
    buildDots();
    goTo(Math.min(currentIndex, getMaxIndex()));
  });
}

const contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', function(e) {
    e.preventDefault();

    const submitBtn = this.querySelector('.btn-primary');
    const originalText = submitBtn.textContent;

    submitBtn.textContent = 'Request Sent';
    submitBtn.style.background = 'linear-gradient(135deg, #2e7d32, #4caf50)';

    setTimeout(() => {
      submitBtn.textContent = originalText;
      submitBtn.style.background = '';
      this.reset();
    }, 3000);
  });
}

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const targetId = this.getAttribute('href');
    if (targetId === '#') return;

    const target = document.querySelector(targetId);
    if (!target) return;

    e.preventDefault();
    const offset = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--nav-h'), 10) || 78;

    window.scrollTo({
      top: target.offsetTop - offset,
      behavior: 'smooth'
    });
  });
});

const heroImg = document.getElementById('heroImg');
if (heroImg) {
  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    if (scrollY < window.innerHeight) {
      heroImg.style.transform = `scale(1) translateY(${scrollY * 0.16}px)`;
    }
  }, { passive: true });
}

const counters = document.querySelectorAll('.stat strong');
const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting && !entry.target.dataset.animated) {
      const target = entry.target;
      target.dataset.animated = 'true';

      const text = target.textContent;
      const numMatch = text.match(/(\d+)/);
      if (!numMatch) return;

      const num = parseInt(numMatch[1], 10);
      const suffix = text.replace(numMatch[0], '');
      let count = 0;
      const increment = Math.ceil(num / 60);

      const timer = setInterval(() => {
        count = Math.min(count + increment, num);
        target.textContent = `${count}${suffix}`;
        if (count >= num) clearInterval(timer);
      }, 25);
    }
  });
}, { threshold: 0.5 });

counters.forEach(counter => counterObserver.observe(counter));

document.querySelectorAll('.service-card').forEach(card => {
  card.addEventListener('mousemove', function(e) {
    if (window.innerWidth <= 768) return;
    const rect = this.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const xPct = (x / rect.width - 0.5) * 10;
    const yPct = (y / rect.height - 0.5) * 10;
    this.style.transform = `translateY(-8px) perspective(600px) rotateX(${-yPct * 0.25}deg) rotateY(${xPct * 0.25}deg)`;
  });

  card.addEventListener('mouseleave', function() {
    this.style.transform = '';
  });
});

const progressBar = document.createElement('div');
progressBar.id = 'scrollProgress';
progressBar.style.cssText = 'position:fixed;top:0;left:0;z-index:9998;height:3px;width:0%;background:linear-gradient(90deg,#4FC3F7,#1976D2);transition:width 0.1s linear;pointer-events:none;';
document.body.prepend(progressBar);

window.addEventListener('scroll', () => {
  const scrolled = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
  progressBar.style.width = `${scrolled}%`;
}, { passive: true });

const waBtn = document.querySelector('.whatsapp-float');
if (waBtn) {
  setInterval(() => {
    waBtn.style.transform = 'scale(1.08)';
    setTimeout(() => {
      waBtn.style.transform = '';
    }, 300);
  }, 5000);
}

document.querySelectorAll('.footer-bottom p').forEach(p => {
  if (p.textContent.includes('2025')) {
    p.innerHTML = p.innerHTML.replace('2025', new Date().getFullYear());
  }
});
