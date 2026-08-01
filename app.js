const sidebar = document.getElementById('sidebar');
const overlay = document.getElementById('overlay');
const menuBtn = document.getElementById('menu-btn');
const closeMenuBtn = document.getElementById('close-menu');
const searchInput = document.getElementById('search');
const listEl = document.getElementById('recipe-list');
const detail = document.getElementById('detail');
const homeBtn = document.getElementById('home-btn');

function openMenu() {
  sidebar.classList.add('open');
  overlay.classList.add('open');
  menuBtn.classList.add('open');
}

function closeMenu() {
  sidebar.classList.remove('open');
  overlay.classList.remove('open');
  menuBtn.classList.remove('open');
}

function toggleMenu() {
  sidebar.classList.contains('open') ? closeMenu() : openMenu();
}

menuBtn.addEventListener('click', toggleMenu);
closeMenuBtn.addEventListener('click', closeMenu);
overlay.addEventListener('click', closeMenu);

const ORDINE_CATEGORII = ['Feluri de mâncare', 'Gustări', 'Deserturi'];

function renderList(list) {
  listEl.innerHTML = '';

  if (list.length === 0) {
    listEl.innerHTML = '<li class="empty">Nicio rețetă găsită.</li>';
    return;
  }

  const categoriiGasite = ORDINE_CATEGORII.filter(c => list.some(r => r.categorie === c));
  const altele = list.filter(r => !ORDINE_CATEGORII.includes(r.categorie));
  if (altele.length) categoriiGasite.push(null);

  categoriiGasite.forEach(cat => {
    const dinCategorie = cat === null ? altele : list.filter(r => r.categorie === cat);

    const titluCat = document.createElement('li');
    titluCat.className = 'cat-title';
    titluCat.textContent = cat === null ? 'Altele' : cat;
    listEl.appendChild(titluCat);

    dinCategorie.forEach(r => {
      const li = document.createElement('li');
      li.className = 'recipe-item';
      li.innerHTML = `<span class="r-name">${r.titlu}</span>`;
      li.addEventListener('click', () => {
        openDetail(r);
        closeMenu();
      });
      listEl.appendChild(li);
    });
  });
}

function flattenText(items) {
  return items.map(i => {
    if (typeof i === 'string') return i;
    if (i && i.sectiune) return i.sectiune + ' ' + (i.itemi || []).join(' ');
    return '';
  }).join(' ').toLowerCase();
}

searchInput.addEventListener('input', (e) => {
  const q = e.target.value.toLowerCase().trim();
  const filtered = RECIPES.filter(r =>
    r.titlu.toLowerCase().includes(q) ||
    (r.categorie || '').toLowerCase().includes(q) ||
    flattenText(r.ingrediente).includes(q)
  );
  renderList(filtered);
});

// Transformă lista (text simplu și/sau secțiuni) în grupuri: [{titlu, itemi}]
function groupItems(items) {
  const grupuri = [];
  let curent = null;

  items.forEach(item => {
    if (typeof item === 'string') {
      if (!curent || curent.titlu !== null) {
        curent = { titlu: null, itemi: [] };
        grupuri.push(curent);
      }
      curent.itemi.push(item);
    } else if (item && item.sectiune) {
      curent = { titlu: item.sectiune, itemi: (item.itemi || []).slice() };
      grupuri.push(curent);
    }
  });

  return grupuri;
}

function renderIngrediente(container, items) {
  container.innerHTML = '';

  groupItems(items).forEach(grup => {
    const card = document.createElement('div');
    card.className = 'ing-card';

    if (grup.titlu) {
      const h = document.createElement('h5');
      h.textContent = grup.titlu;
      card.appendChild(h);
    }

    const ul = document.createElement('ul');
    grup.itemi.forEach(text => {
      const li = document.createElement('li');
      li.textContent = text;
      ul.appendChild(li);
    });

    card.appendChild(ul);
    container.appendChild(card);
  });
}

function renderPasi(container, items) {
  container.innerHTML = '';
  let nr = 0;

  groupItems(items).forEach(grup => {
    if (grup.titlu) {
      const h = document.createElement('h5');
      h.className = 'step-group';
      h.textContent = grup.titlu;
      container.appendChild(h);
    }

    grup.itemi.forEach(text => {
      nr++;

      const card = document.createElement('div');
      card.className = 'step-card';

      const num = document.createElement('span');
      num.className = 'step-num';
      num.textContent = nr;

      const p = document.createElement('p');
      p.textContent = text;

      card.appendChild(num);
      card.appendChild(p);
      container.appendChild(card);
    });
  });
}

function statBox(label, kcal, proteina) {
  return `<div class="nutri-stat">
    <span class="n-label">${label}</span>
    <span class="n-kcal">${kcal} kCal</span>
    ${proteina != null ? `<span class="n-prot">${proteina}g proteină</span>` : ''}
  </div>`;
}

function renderNutritie(r) {
  const nutBox = document.getElementById('d-nutritie');
  const n = r.nutritie;

  if (!n) {
    nutBox.style.display = 'none';
    return;
  }

  let html = '<h4>🔥 Valori nutriționale</h4><div class="nutri-stats">';

  if (n.per100) {
    html += statBox(n.per100.nume || '100 g', n.per100.kcal, n.per100.proteina);
  }
  if (n.portie) {
    const label = n.portie.nume || (n.portie.gramaj ? `O porție (${n.portie.gramaj}g)` : 'O porție');
    html += statBox(label, n.portie.kcal, n.portie.proteina);
  }
  if (n.portii) {
    n.portii.forEach(p => {
      const label = p.nume + (p.gramaj ? ` (${p.gramaj}g)` : '');
      html += statBox(label, p.kcal, p.proteina);
    });
  }
  html += '</div>';

  if (n.sfat) html += `<p class="nutri-sfat">💡 ${n.sfat}</p>`;

  nutBox.innerHTML = html;
  nutBox.style.display = 'block';
}

function openDetail(r) {
  document.getElementById('d-cat').textContent = r.categorie || '';
  document.getElementById('d-cat').style.display = r.categorie ? '' : 'none';
  document.getElementById('d-title').textContent = r.titlu;

  renderNutritie(r);

  renderIngrediente(document.getElementById('d-ingrediente'), r.ingrediente);
  renderPasi(document.getElementById('d-pasi'), r.pasi);

  const imgWrap = document.getElementById('d-img-wrap');
  const img = document.getElementById('d-img');
  imgWrap.classList.remove('no-img');
  img.style.display = '';
  img.onerror = () => imgWrap.classList.add('no-img');
  img.src = r.poza || '';
  if (!r.poza) imgWrap.classList.add('no-img');

  detail.classList.add('open');
  detail.scrollTop = 0;
  document.body.classList.add('locked');
  homeBtn.classList.add('visible');
}

function closeDetail() {
  detail.classList.remove('open');
  document.body.classList.remove('locked');
  homeBtn.classList.remove('visible');
}

homeBtn.addEventListener('click', closeDetail);

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    closeDetail();
    closeMenu();
  }
});

RECIPES.sort((a, b) => a.titlu.localeCompare(b.titlu, 'ro'));
renderList(RECIPES);
