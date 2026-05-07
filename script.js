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

/*
================================================================================
EMAILJS CONFIGURATION
================================================================================
To make the form work, you need to:

1. Go to https://dashboard.emailjs.com
2. Sign up (free) or log in
3. Add a new service (Gmail, Outlook, etc.)
4. Create an email template with these variables:
   - {{user_name}} - Full Name
   - {{user_phone}} - Phone Number
   - {{user_email}} - Email Address
   - {{treatment_needed}} - Treatment Needed
   - {{message}} - Message

5. Replace the values below with your own:
================================================================================
*/
emailjs.init("8TFDxrhq4HBAitG9r");   
const EMAILJS_CONFIG = {
  PUBLIC_KEY: '8TFDxrhq4HBAitG9r',      // Get from EmailJS dashboard
  SERVICE_ID: 'service_h3987vg',      // Get from EmailJS dashboard
  TEMPLATE_ID: 'template_v4hjqp9'     // Get from EmailJS dashboard
};

// Initialize EmailJS (call this once when the page loads)
if (EMAILJS_CONFIG.PUBLIC_KEY !== '8TFDxrhq4HBAitG9r') {
  emailjs.init(EMAILJS_CONFIG.PUBLIC_KEY);
}

/*
================================================================================
FORM VALIDATION & SUBMISSION
================================================================================
*/

class FormValidator {
  constructor(form) {
    this.form = form;
    this.inputs = {
      fullName: form.querySelector('#fullName'),
      phone: form.querySelector('#phone'),
      email: form.querySelector('#email'),
      treatment: form.querySelector('#treatment'),
      message: form.querySelector('#message')
    };
    this.errorElements = {
      fullName: form.querySelector('#nameError'),
      phone: form.querySelector('#phoneError'),
      email: form.querySelector('#emailError'),
      treatment: form.querySelector('#treatmentError'),
      message: form.querySelector('#messageError')
    };
    this.setupListeners();
  }

  setupListeners() {
    // Real-time validation on blur
    Object.values(this.inputs).forEach(input => {
      if (input) {
        input.addEventListener('blur', () => this.validateField(input));
        input.addEventListener('input', () => {
          if (input.classList.contains('error')) {
            this.validateField(input);
          }
        });
      }
    });
  }

  validateField(input) {
    const fieldName = input.name || input.id;
    let error = '';

    // Check if empty
    if (!input.value.trim()) {
      error = 'This field is required';
    } else {
      // Specific validation based on field type
      switch (fieldName) {
        case 'user_name':
          if (input.value.trim().length < 2) {
            error = 'Name must be at least 2 characters';
          }
          break;

        case 'user_phone':
          if (!this.isValidPhone(input.value)) {
            error = 'Please enter a valid phone number';
          }
          break;

        case 'user_email':
          if (!this.isValidEmail(input.value)) {
            error = 'Please enter a valid email address';
          }
          break;

        case 'treatment_needed':
          if (!input.value) {
            error = 'Please select a treatment';
          }
          break;

        case 'message':
          if (input.value.trim().length < 5) {
            error = 'Message must be at least 5 characters';
          }
          break;
      }
    }

    this.setFieldError(input, error);
    return !error;
  }

  setFieldError(input, error) {
    const errorElement = this.errorElements[input.name || input.id];
    
    if (error) {
      input.classList.add('error');
      input.classList.remove('success');
      if (errorElement) errorElement.textContent = error;
    } else {
      input.classList.remove('error');
      input.classList.add('success');
      if (errorElement) errorElement.textContent = '';
    }
  }

  isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  isValidPhone(phone) {
    // Accept various phone formats (with +, dashes, spaces)
    const phoneRegex = /^[+]?[(]?[0-9]{1,4}[)]?[-\\s.]?[(]?[0-9]{1,4}[)]?[-\\s.]?[0-9]{1,9}$/;
    return phoneRegex.test(phone.replace(/\\s/g, ''));
  }

  validateAll() {
    let isValid = true;
    Object.values(this.inputs).forEach(input => {
      if (input && !this.validateField(input)) {
        isValid = false;
      }
    });
    return isValid;
  }

  getFormData() {
    return {
      user_name: this.inputs.fullName.value.trim(),
      user_phone: this.inputs.phone.value.trim(),
      user_email: this.inputs.email.value.trim(),
      treatment_needed: this.inputs.treatment.value,
      message: this.inputs.message.value.trim()
    };
  }

  reset() {
    this.form.reset();
    Object.values(this.inputs).forEach(input => {
      if (input) {
        input.classList.remove('error', 'success');
        const errorElement = this.errorElements[input.name || input.id];
        if (errorElement) errorElement.textContent = '';
      }
    });
  }
}

// Toast Notification System
class Toast {
  static show(message, type = 'info', duration = 4000) {
    const container = document.getElementById('toastContainer');
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    
    const icon = this.getIcon(type);
    toast.innerHTML = `
      <div class="toast-icon">${icon}</div>
      <div class="toast-message">${message}</div>
      <button class="toast-close">&times;</button>
    `;

    container.appendChild(toast);

    const closeBtn = toast.querySelector('.toast-close');
    closeBtn.addEventListener('click', () => this.removeToast(toast));

    // Auto remove after duration
    const timeoutId = setTimeout(() => this.removeToast(toast), duration);

    closeBtn.addEventListener('click', () => clearTimeout(timeoutId));

    return toast;
  }

  static getIcon(type) {
    const icons = {
      success: '✓',
      error: '✕',
      info: 'ℹ'
    };
    return icons[type] || icons.info;
  }

  static removeToast(toast) {
    toast.classList.add('hide');
    setTimeout(() => toast.remove(), 400);
  }
}

// Form submission handler
const contactForm = document.getElementById('contactForm');
if (contactForm) {
  const validator = new FormValidator(contactForm);
  const submitBtn = contactForm.querySelector('#submitBtn');

  contactForm.addEventListener('submit', async function(e) {
    e.preventDefault();

    // Validate all fields
    if (!validator.validateAll()) {
      Toast.show('Please fix the errors above before submitting', 'error');
      return;
    }

    // Check if EmailJS is configured
    if (EMAILJS_CONFIG.PUBLIC_KEY === 'YOUR_PUBLIC_KEY') {
      Toast.show('EmailJS is not configured. Contact the administrator.', 'error');
      console.error('EmailJS configuration missing. Please add your credentials to script.js');
      return;
    }

    // Get form data
    const formData = validator.getFormData();

    // Show loading state
    submitBtn.classList.add('loading');
    submitBtn.disabled = true;
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Sending...';

    try {
      // Send email via EmailJS
      const response = await emailjs.send(
        EMAILJS_CONFIG.SERVICE_ID,
        EMAILJS_CONFIG.TEMPLATE_ID,
        formData
      );

      if (response.status === 200) {
        // Success
        submitBtn.classList.remove('loading');
        submitBtn.textContent = '✓ Request Sent!';
        
        Toast.show('Your appointment request has been sent successfully! We will contact you soon.', 'success');
        
        // Reset form
        validator.reset();

        // Reset button after 3 seconds
        setTimeout(() => {
          submitBtn.disabled = false;
          submitBtn.textContent = originalText;
        }, 3000);
      }
    } catch (error) {
      // Error occurred
      console.error('Email send error:', error);
      
      submitBtn.classList.remove('loading');
      submitBtn.disabled = false;
      submitBtn.textContent = originalText;

      // Show error message
      const errorMessage = error.text || 'Failed to send request. Please try again or call us directly.';
      Toast.show(errorMessage, 'error', 5000);

      // Fallback: Suggest alternative contact methods
      Toast.show('You can also call us at +91 81878 97896', 'info', 6000);
    }
  });
}

'use strict';

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
