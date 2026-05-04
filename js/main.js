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

/* ===== Back to Top ===== */
const toTopBtn = document.getElementById('toTopBtn');
if (toTopBtn) {
  window.addEventListener('scroll', () => {
    toTopBtn.classList.toggle('visible', window.scrollY > 300);
  });
  toTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

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

/* ===== Contact Form ===== */
const contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const btn = document.getElementById('formSubmit');
    const status = document.getElementById('formStatus');
    const jaSpan = btn.querySelector('.lang-ja');
    const koSpan = btn.querySelector('.lang-ko');

    btn.disabled = true;
    if (jaSpan) jaSpan.textContent = '送信中...';
    if (koSpan) koSpan.textContent = '전송 중...';
    status.className = 'form-status';

    try {
      const res = await fetch(contactForm.action, {
        method: 'POST',
        body: new FormData(contactForm),
        headers: { Accept: 'application/json' }
      });
      if (res.ok) {
        contactForm.reset();
        status.className = 'form-status success';
        status.innerHTML =
          '<span class="lang-ja">お問い合わせありがとうございます。内容を確認のうえ、ご返信いたします。</span>' +
          '<span class="lang-ko">문의해 주셔서 감사합니다. 확인 후 빠른 시일 내에 답변 드리겠습니다.</span>';
      } else {
        throw new Error();
      }
    } catch {
      status.className = 'form-status error';
      status.innerHTML =
        '<span class="lang-ja">送信に失敗しました。お電話にてお問い合わせください。</span>' +
        '<span class="lang-ko">전송에 실패했습니다. 전화로 문의해 주세요.</span>';
    } finally {
      btn.disabled = false;
      if (jaSpan) jaSpan.textContent = '送信する';
      if (koSpan) koSpan.textContent = '전송하기';
    }
  });
}

/* ===== FAQ Accordion ===== */
document.querySelectorAll('.faq-question').forEach(btn => {
  btn.addEventListener('click', () => {
    const answer = btn.nextElementSibling;
    const isOpen = btn.getAttribute('aria-expanded') === 'true';
    btn.setAttribute('aria-expanded', String(!isOpen));
    answer.style.maxHeight = isOpen ? '0' : answer.scrollHeight + 'px';
  });
});
