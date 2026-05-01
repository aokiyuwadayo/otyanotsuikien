/* ===== Language Toggle ===== */
const body = document.body;
const langBtn = document.getElementById('langToggle');

function setLang(lang) {
  if (lang === 'ko') {
    body.classList.add('ko');
    if (langBtn) langBtn.textContent = '日本語';
  } else {
    body.classList.remove('ko');
    if (langBtn) langBtn.textContent = '한국어';
  }
  localStorage.setItem('chikujoen-lang', lang);
}

const savedLang = localStorage.getItem('chikujoen-lang') || 'ja';
setLang(savedLang);

langBtn?.addEventListener('click', () => {
  setLang(body.classList.contains('ko') ? 'ja' : 'ko');
});

/* ===== Mobile Menu ===== */
const menuBtn = document.getElementById('menuToggle');
const siteNav = document.getElementById('siteNav');

menuBtn?.addEventListener('click', () => {
  const isOpen = siteNav.classList.toggle('open');
  menuBtn.textContent = isOpen ? '✕' : '☰';
});

document.querySelectorAll('.site-nav a').forEach(a => {
  a.addEventListener('click', () => {
    siteNav?.classList.remove('open');
    if (menuBtn) menuBtn.textContent = '☰';
  });
});

/* ===== Active Nav ===== */
const page = location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('.site-nav a').forEach(a => {
  if (a.getAttribute('href') === page) a.classList.add('active');
});

/* ===== Product Filter ===== */
const filterBtns = document.querySelectorAll('.filter-btn');
const productCards = document.querySelectorAll('[data-category]');

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const f = btn.dataset.filter;
    productCards.forEach(card => {
      card.style.display = (f === 'all' || card.dataset.category === f) ? '' : 'none';
    });
  });
});

/* ===== Thumbnail Gallery ===== */
const mainImg = document.getElementById('mainImg');
document.querySelectorAll('.thumb').forEach(t => {
  t.addEventListener('click', () => {
    document.querySelectorAll('.thumb').forEach(x => x.classList.remove('active'));
    t.classList.add('active');
    if (mainImg) mainImg.src = t.src;
  });
});

/* ===== Scroll Fade-in ===== */
const observer = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.style.opacity = '1';
      e.target.style.transform = 'translateY(0)';
      observer.unobserve(e.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('.reveal').forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(22px)';
  el.style.transition = 'opacity .6s ease, transform .6s ease';
  observer.observe(el);
});
