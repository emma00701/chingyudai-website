const GALLERIES = {
  digital: {
    subtitle: 'Product and UX design work.',
    items: [
      { src: 'images/Kuma_1.png', title: 'Kuma', meta: 'AI Personal Expense Tracking Agent', link: 'https://get-kuma.com' }
    ]
  },
  circus: {
    subtitle: 'Acrylics, oil pastels.',
    items: [
      { src: 'images/circus_1.jpg', title: 'Circus', meta: 'Acrylics, Oil Pastels' },
      { src: 'images/circus_2.jpg', title: 'Circus', meta: 'Acrylics, Oil Pastels' },
      { src: 'images/circus_3.jpg', title: 'Circus', meta: 'Acrylics, Oil Pastels' }
    ]
  },
  joker: {
    subtitle: 'Painting.',
    items: [
      { src: 'images/painting-joker.jpg', title: 'Untitled', meta: '' }
    ]
  },
  figures: {
    subtitle: 'Painting.',
    items: [
      { src: 'images/painting-figures.jpg', title: 'Untitled', meta: '' }
    ]
  },
  market: {
    subtitle: 'Painting.',
    items: [
      { src: 'images/painting-market.jpg', title: 'Untitled', meta: '' }
    ]
  }
};

const CATEGORY_LABELS = { digital: 'Digital / Product', circus: 'Painting', joker: 'Painting', figures: 'Painting', market: 'Painting' };

let currentGallery = 'digital';
let currentLbIndex = 0;

/* shows the pig-outline placeholder in place of a photo that hasn't been added yet */
function imgFallback(imgEl) {
  const wrap = imgEl.closest('.gallery-thumb, .lightbox-img-wrap, .lightbox-thumb');
  if (wrap) wrap.classList.add('img-fallback');
}

/* madhurima-style scannable work list */
function renderWorkList() {
  const list = document.getElementById('work-list');
  if (!list) return;
  let rows = '';
  Object.keys(GALLERIES).forEach(category => {
    GALLERIES[category].items.forEach((item, index) => {
      rows += `
        <button class="work-row" onclick="openLightbox('${category}', ${index})">
          <span class="work-cat">${CATEGORY_LABELS[category]}</span>
          <span class="work-title">${item.title}</span>
          <span class="work-meta">${item.meta}</span>
          <span class="work-view">View <span>&rarr;</span></span>
        </button>`;
    });
  });
  list.innerHTML = rows;
}

/* plain image grid: one cover tile per category (its first item); the rest of
   that category's images are viewed via the lightbox's thumbnail strip */
function renderGalleryGrid() {
  const grid = document.getElementById('gallery-grid');
  if (!grid) return;
  const covers = Object.keys(GALLERIES).map(category => ({ category, item: GALLERIES[category].items[0] }));
  grid.innerHTML = covers.map(entry => {
    const tag = entry.item.link ? 'a' : 'button';
    const openAttr = entry.item.link
      ? `href="${entry.item.link}" target="_blank" rel="noopener"`
      : `onclick="openLightbox('${entry.category}', 0)"`;
    return `
    <${tag} class="gallery-item" ${openAttr}>
      <span class="gallery-thumb">
        <img src="${entry.item.src}" alt="${entry.item.title}" loading="lazy" onerror="imgFallback(this)">
      </span>
      <span class="gallery-caption">
        <span class="gallery-title">${entry.item.title}</span>
        <span class="gallery-meta">${entry.item.meta}</span>
      </span>
    </${tag}>
  `;
  }).join('');
}

function openLightbox(category, index) {
  currentGallery = category;
  currentLbIndex = index;
  renderLightbox();
  document.getElementById('lightbox').classList.add('open');
  document.body.style.overflow = 'hidden';
}

function renderLightbox() {
  const items = GALLERIES[currentGallery].items;
  const item = items[currentLbIndex];
  const img = document.getElementById('lb-img');
  img.closest('.lightbox-img-wrap').classList.remove('img-fallback');
  img.onerror = () => imgFallback(img);
  img.src = item.src;
  img.alt = item.title;
  document.getElementById('lb-title').textContent = item.title;
  document.getElementById('lb-meta').textContent = item.meta;
  document.getElementById('lb-meta-sep').hidden = !item.meta;

  const thumbs = document.getElementById('lb-thumbs');
  if (thumbs) {
    thumbs.hidden = items.length <= 1;
    thumbs.innerHTML = items.map((thumbItem, index) => `
      <button class="lightbox-thumb${index === currentLbIndex ? ' active' : ''}" onclick="jumpLightbox(${index})" aria-label="View image ${index + 1}">
        <img src="${thumbItem.src}" alt="" loading="lazy" onerror="imgFallback(this)">
      </button>
    `).join('');
  }
}

function jumpLightbox(index) {
  currentLbIndex = index;
  renderLightbox();
}

function closeLightbox() {
  document.getElementById('lightbox').classList.remove('open');
  document.body.style.overflow = '';
}

function closeLightboxOutside(event) {
  if (event.target === document.getElementById('lightbox')) closeLightbox();
}

function lbNav(direction) {
  const items = GALLERIES[currentGallery].items;
  currentLbIndex = (currentLbIndex + direction + items.length) % items.length;
  renderLightbox();
}

document.addEventListener('keydown', event => {
  const lb = document.getElementById('lightbox');
  if (!lb || !lb.classList.contains('open')) return;
  if (event.key === 'Escape') closeLightbox();
  if (event.key === 'ArrowRight') lbNav(1);
  if (event.key === 'ArrowLeft') lbNav(-1);
});

/* ---- Pig splash intro (index.html only) ---- */
let pigReady = false;
function enterSite() {
  if (!pigReady) return;
  document.body.classList.remove('intro-active');
  document.body.classList.remove('pig-ready');
  document.body.classList.add('intro-complete');
}

if (document.querySelector('.intro-animation')) {
  setTimeout(() => {
    pigReady = true;
    document.body.classList.add('pig-ready');
  }, 5000);
}

/* render the gallery grid if present */
if (document.getElementById('gallery-grid')) {
  renderGalleryGrid();
}

/* render the single-page work list if present */
if (document.getElementById('work-list')) {
  renderWorkList();
}
