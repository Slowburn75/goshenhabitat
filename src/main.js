import './style.css'
import './gallery.js'

document.querySelector('#app').innerHTML = `

`
const slides = document.querySelectorAll('.testimonial-slide');
let index = 0;

function showSlide(i) {
  slides.forEach((slide, idx) => {
    slide.classList.toggle('hidden', idx !== i);
  });
}

if (document.getElementById('next')) {
  document.getElementById('next').onclick = () => {
    index = (index + 1) % slides.length;
    showSlide(index);
  };
}

if (document.getElementById('prev')) {
  document.getElementById('prev').onclick = () => {
    index = (index - 1 + slides.length) % slides.length;
    showSlide(index);
  };
}

// Optional auto-play
if (slides.length > 0) {
  setInterval(() => {
    index = (index + 1) % slides.length;
    showSlide(index);
  }, 6000);
}

document.addEventListener("DOMContentLoaded", () => {
  const reveals = document.querySelectorAll(".reveal");

  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("reveal-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.30 }
  );

  reveals.forEach(el => observer.observe(el));

  // Mobile Menu Logic
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const closeMenuBtn = document.getElementById('close-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');

  if (mobileMenuBtn && mobileMenu) {
    const toggleMenu = () => {
      const isHidden = mobileMenu.classList.contains('hidden');
      if (isHidden) {
        mobileMenu.classList.remove('hidden');
        document.body.classList.add('overflow-hidden');
      } else {
        mobileMenu.classList.add('hidden');
        document.body.classList.remove('overflow-hidden');
      }
    };

    mobileMenuBtn.addEventListener('click', toggleMenu);

    if (closeMenuBtn) {
      closeMenuBtn.addEventListener('click', toggleMenu);
    }

    // Close on link click
    mobileMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
        document.body.classList.remove('overflow-hidden');
      });
    });
  }
});

const header = document.querySelector('header');
if (header) {
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      header.classList.add('bg-black/70');
      header.classList.remove('bg-black/40');
    } else {
      header.classList.add('bg-black/40');
      header.classList.remove('bg-black/70');
    }
  });
}

