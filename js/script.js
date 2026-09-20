const EMOTIONS_JOY_DESC = "The first model, representing joy, was made out of clay, and reflectice triangle pieces I made from woodsticks and laser paper. GIven the reflective nature of the laser paper, I envisioned the memories from a dream were all captured and incapsulated by the triangole. However, I usally have multiple different memories all intertwined together, forming a dream that jumps from one memory to another. The pieces of reflective triangles are great mediums to illustrate such feelings.";
const EMOTIONS_FEAR_DESC = "The second model, representing fear, was made out of woodsticks, boxes I made from PVC boards, and balls entangled by steel wires. This model has strong structure, yet they are hollow on the inside, creating a sense of fear and uncertainty.";
const EMOTIONS_ANGER_DESC = "the third model, representing anger, is made out of woodsticks and paper. I wanted to deliver how broken the emotions are when anger takes control of it through a dilapitated building. The windows are in dark colors in order to emphasize the structure.";
const BLOCKMODEL_DESC = "The inspiration of this project was from one of my hobbies—assembling models. I finished this project with similar process of assembling models as well, made different components of each part then put them together. I chose the armour of a GUNDAM model to be the prototype of my main structure. Other parts were distributed sporadically around the main building are like the missiles and lasers launched by the armour.";
const JUNKFOODHOUSE_DESC = "The inspiration of this model building is my ideal house using materials that I got from ordering or delievery food that were considered not very healthy. The straws and the molded pulp trays were from the bubble tea I would order on a daily basis, and the bamboo sticks were the skewers from the barbeque. I collected all of them from the summer, cleaned them, and glued them together to from a sense of space. The LED light on the bottom were tangled within the house, making the details from those particular materials stand out.";
const GIANT_DESC = "How would the our perspective of the space that we are in? Growing up, as I got taller, my vision of shelves in the supermarket was gradually brought up, opening up more options for me to buy. However, when wandering around in a city, I was never tall enough to gain a new perspective for the buildings.\n\nI imagined two giants, tall and skinny, standing in front of the entrance of a street market in my neighborhood and took pictures from their point of view. The things they see entirely different from me, which inspired my to discover more about perspectives in real life and how that affects us.";

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
  },
  sculpture: {
    subtitle: 'Sculpture.',
    cover: 'images/emotions-cover.jpg',
    coverTitle: 'Emotions: Joy, Fear & Anger',
    coverMeta: 'Clay, woodsticks, PVC boards, steel wire, paper',
    items: [
      { src: 'images/sculpture-1.jpg', title: 'Joy', meta: 'Clay, woodsticks, reflective triangle pieces', desc: EMOTIONS_JOY_DESC },
      { src: 'images/sculpture-2.webp', title: 'Joy', meta: 'Clay, woodsticks, reflective triangle pieces', desc: EMOTIONS_JOY_DESC },
      { src: 'images/emotions-fear.jpg', title: 'Fear', meta: 'Woodsticks, PVC boards, steel wire', desc: EMOTIONS_FEAR_DESC },
      { src: 'images/emotions-anger-1.jpg', title: 'Anger', meta: 'Woodsticks, paper', desc: EMOTIONS_ANGER_DESC },
      { src: 'images/emotions-anger-2.jpg', title: 'Anger', meta: 'Woodsticks, paper', desc: EMOTIONS_ANGER_DESC },
      { src: 'images/emotions-anger-3.jpg', title: 'Anger', meta: 'Woodsticks, paper', desc: EMOTIONS_ANGER_DESC }
    ]
  },
  blockmodel: {
    subtitle: 'Sculpture.',
    items: [
      { src: 'images/blockmodel-1.jpg', title: 'Untitled', meta: '' },
      { src: 'images/blockmodel-2.jpg', title: 'Untitled', meta: '' },
      { src: 'images/blockmodel-3.jpg', title: 'Untitled', meta: '' },
      { src: 'images/blockmodel-4.jpg', title: 'Untitled', meta: '', desc: BLOCKMODEL_DESC }
    ]
  },
  junkfoodhouse: {
    subtitle: 'Sculpture.',
    items: [
      { src: 'images/junkfoodhouse-1.jpg', title: 'Junk Food House', meta: 'Straws, molded pulp trays, bamboo sticks, wooden boards, LED light · L24 × W18 × H16 in', desc: JUNKFOODHOUSE_DESC }
    ]
  },
  giant: {
    subtitle: 'Sculpture.',
    items: [
      { src: 'images/giant-1.jpg', title: 'Giant in a Small Town', meta: 'Wooden blocks, construction paper, ink, white gel pen · L17 × W11 × H4 in', desc: GIANT_DESC }
    ]
  },
  capitalismInFood: {
    subtitle: 'Drawing.',
    items: [
      { src: 'images/capitalism-in-food.jpg', title: 'Capitalism in Food', meta: '' }
    ]
  }
};

const CATEGORY_LABELS = { digital: 'Digital / Product', circus: 'Painting', joker: 'Painting', figures: 'Painting', market: 'Painting', sculpture: '3D / Sculpture', blockmodel: '3D / Sculpture', junkfoodhouse: '3D / Sculpture', giant: '3D / Sculpture', capitalismInFood: 'Drawing' };

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
  const covers = Object.keys(GALLERIES).map(category => {
    const gallery = GALLERIES[category];
    const firstItem = gallery.items[0];
    return {
      category,
      src: gallery.cover || firstItem.src,
      title: gallery.coverTitle || firstItem.title,
      meta: gallery.coverMeta || firstItem.meta,
      link: firstItem.link
    };
  });
  grid.innerHTML = covers.map(entry => {
    const tag = entry.link ? 'a' : 'button';
    const openAttr = entry.link
      ? `href="${entry.link}" target="_blank" rel="noopener"`
      : `onclick="openLightbox('${entry.category}', 0)"`;
    return `
    <${tag} class="gallery-item" ${openAttr}>
      <span class="gallery-thumb">
        <img src="${entry.src}" alt="${entry.title}" loading="lazy" onerror="imgFallback(this)">
      </span>
      <span class="gallery-caption">
        <span class="gallery-title">${entry.title}</span>
        <span class="gallery-meta">${entry.meta}</span>
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
  const descEl = document.getElementById('lb-desc');
  descEl.textContent = item.desc || '';
  descEl.hidden = !item.desc;

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
