const GALLERIES = {
  paintings: {
    subtitle: 'Acrylic, colored pencil, crayon, and mixed media.',
    items: [
      { src: 'images/paintings/markets.jpg', title: 'Fruit and Vegetable Market in Hong Kong', meta: '18 × 20 in · acrylic on canvas', desc: 'A vibrant scene of daily life in Hong Kong, with vendors, color, and movement rendered in bold, expressive brushwork.' },
      { src: 'images/paintings/joker.jpg', title: 'The Joker', meta: '16 × 20 in · mixed media on canvas', desc: 'A figure surrounded by playing cards, exploring chance, performance, and the faces we wear.' },
      { src: 'images/paintings/circus.jpg', title: 'The Forgotten Childhood', meta: '16 × 20 in · colored pencil, crayon, acrylic on paper', desc: 'The multifaceted positions held by circus performers represent the many talents a young self aspires to acquire.' },
      { src: 'images/paintings/circus-large.jpg', title: 'The Forgotten Childhood (detail)', meta: 'close-up · colored pencil, crayon, acrylic on paper', desc: 'Close-up detail revealing the dense layering of color and texture across the surface.' },
      { src: 'images/paintings/circus-small.jpg', title: 'The Forgotten Childhood (detail II)', meta: 'close-up · colored pencil, crayon, acrylic on paper', desc: 'A second close-up capturing the intricate mark-making and layered media.' }
    ]
  },
  drawings: {
    subtitle: 'Ink, pencil, charcoal, and mixed media on paper.',
    items: [
      { src: 'images/drawings/hallway.jpg', title: 'Last Hope in the Middle of the Covid-19 Outbreak', meta: '16 × 20 in · pencil, charcoal, acrylic on paper', desc: 'Confetti remaining in the hall after everyone left campus in spring 2020, with a lone red boat adrift in the silence.' },
      { src: 'images/drawings/capitalism-food.jpg', title: 'Capitalism in Food', meta: '23 × 33 in · ink and posca markers on paper', desc: 'Four vignettes examining food and capitalism through surrealist industrial elements.' }
    ]
  },
  '3d': {
    subtitle: 'Sculpture, architectural models, and mixed materials.',
    items: [
      { src: 'images/3d/block.jpg', title: 'Block', meta: 'dutch paper, wooden strips & boards · 2022', desc: 'Inspired by model assembly, this piece draws from depression-era architecture and the armor structure of a Gundam model.' },
      { src: 'images/3d/emotions.jpg', title: 'Emotions: Joy, Fear & Anger', meta: 'clay, paper, woodsticks, PVC boards, steel wire · 2022', desc: 'Three sculptures representing distinct emotional states: joy, fear, and anger.' },
      { src: 'images/3d/junk-food-house.jpg', title: 'Junk Food House', meta: 'straws, molded pulp trays, bamboo, LED light', desc: 'Built entirely from junk-food packaging and lit from within by red LED.' },
      { src: 'images/3d/giant-small-town.jpg', title: 'Giant in a Small Town', meta: 'wood, ink, construction paper', desc: 'Two elongated giants stand at the entrance of a street market, exploring how scale changes perspective in the city.' }
    ]
  }
};

const CATEGORY_LABELS = { paintings: 'Painting', drawings: 'Drawing', '3d': '3D / Sculpture' };

let currentGallery = 'paintings';
let currentLbIndex = 0;

/* shows the pig-outline placeholder in place of a photo that hasn't been added yet */
function imgFallback(imgEl) {
  const wrap = imgEl.closest('.gallery-thumb, .lightbox-img-wrap');
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

/* plain image grid: every item across every category, one flat sequence */
function renderGalleryGrid() {
  const grid = document.getElementById('gallery-grid');
  if (!grid) return;
  const flat = [];
  Object.keys(GALLERIES).forEach(category => {
    GALLERIES[category].items.forEach((item, index) => flat.push({ category, index, item }));
  });
  grid.innerHTML = flat.map(entry => `
    <button class="gallery-item" onclick="openLightbox('${entry.category}', ${entry.index})">
      <span class="gallery-thumb">
        <img src="${entry.item.src}" alt="${entry.item.title}" loading="lazy" onerror="imgFallback(this)">
      </span>
    </button>
  `).join('');
}

function openLightbox(category, index) {
  currentGallery = category;
  currentLbIndex = index;
  renderLightbox();
  document.getElementById('lightbox').classList.add('open');
  document.body.style.overflow = 'hidden';
}

function renderLightbox() {
  const item = GALLERIES[currentGallery].items[currentLbIndex];
  const img = document.getElementById('lb-img');
  img.closest('.lightbox-img-wrap').classList.remove('img-fallback');
  img.onerror = () => imgFallback(img);
  img.src = item.src;
  img.alt = item.title;
  document.getElementById('lb-title').textContent = item.title;
  document.getElementById('lb-meta').textContent = item.meta;
  document.getElementById('lb-desc').textContent = item.desc;
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
