// Navigation entre les pages
const navBtns = document.querySelectorAll('.nav-btn');
const pages = document.querySelectorAll('.page');

navBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    navBtns.forEach(b => b.classList.remove('active'));
    pages.forEach(p => p.classList.remove('active'));
    btn.classList.add('active');
    document.getElementById('page-' + btn.dataset.page).classList.add('active');
  });
});

// Données des builds
let builds = JSON.parse(localStorage.getItem('kingsroad-builds')) || [
  {
    id: 1,
    nom: "Assassin Critique",
    classe: "assassin",
    style: "PvE",
    description: "Maximise les dégâts critiques pour one-shot les ennemis.",
    traits: ["Lame acérée", "Frappe fatale", "Ombre furtive"],
    lien: "https://got-kingsroad.com"
  },
  {
    id: 2,
    nom: "Chevalier Tank",
    classe: "chevalier",
    style: "Boss",
    description: "Build défensif pour survivre aux boss les plus difficiles.",
    traits: ["Bouclier de fer", "Endurance", "Contre-attaque"],
    lien: "https://got-kingsroad.com"
  },
  {
    id: 3,
    nom: "Mercenaire Berserker",
    classe: "mercenaire",
    style: "PvE",
    description: "Dégâts bruts maximisés avec la grande hache.",
    traits: ["Furie", "Frappe lourde", "Berserker"],
    lien: "https://got-kingsroad.com"
  }
];

// Afficher les builds
function renderBuilds(filtre = 'all') {
  const container = document.getElementById('builds-list');
  const filtered = filtre === 'all' ? builds : builds.filter(b => b.classe === filtre);

  if (filtered.length === 0) {
    container.innerHTML = '<p style="color:var(--text-muted);text-align:center;padding:40px">Aucun build pour cette classe.</p>';
    return;
  }

  container.innerHTML = filtered.map(build => `
    <div class="build-card">
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px">
        <span class="class-badge badge-${build.classe}">${build.classe}</span>
        <span class="style-badge">${build.style}</span>
      </div>
      <h3>${build.nom}</h3>
      <p>${build.description}</p>
      <div class="build-traits">
        ${build.traits.map(t => `<span class="trait-chip">${t}</span>`).join('')}
      </div>
      ${build.lien ? `
        <a href="${build.lien}" target="_blank" class="gear-link">
          Voir le gear sur got-kingsroad.com →
        </a>
      ` : ''}
    </div>
  `).join('');
}

// Filtres par classe
const filterBtns = document.querySelectorAll('#page-builds .filter-btn');
filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    renderBuilds(btn.dataset.class);
  });
});

// Bouton créer un build
document.getElementById('btn-new-build').addEventListener('click', afficherFormulaireNouveauBuild);

function afficherFormulaireNouveauBuild() {
  const container = document.getElementById('builds-list');
  container.innerHTML = `
    <div class="build-card">
      <h3 style="color:var(--gold);margin-bottom:16px">Nouveau build</h3>
      <div class="form-group">
        <label>Nom du build</label>
        <input type="text" id="new-nom" placeholder="Ex: Assassin PvP Burst">
      </div>
      <div class="form-group">
        <label>Classe</label>
        <select id="new-classe">
          <option value="assassin">Assassin</option>
          <option value="chevalier">Chevalier</option>
          <option value="mercenaire">Mercenaire</option>
        </select>
      </div>
      <div class="form-group">
        <label>Style de jeu</label>
        <select id="new-style">
          <option value="PvE">PvE</option>
          <option value="PvP">PvP</option>
          <option value="Boss">Boss</option>
          <option value="Farming">Farming</option>
        </select>
      </div>
      <div class="form-group">
        <label>Description</label>
        <input type="text" id="new-desc" placeholder="Décris ton build en une phrase">
      </div>
      <div class="form-group">
        <label>Traits principaux (séparés par des virgules)</label>
        <input type="text" id="new-traits" placeholder="Ex: Lame acérée, Frappe fatale">
      </div>
      <div class="form-group">
        <label>Lien Gear Planner (optionnel)</label>
        <input type="text" id="new-lien" placeholder="https://got-kingsroad.com/...">
      </div>
      <div style="display:flex;gap:8px;margin-top:8px">
        <button onclick="sauvegarderBuild()" class="btn-primary">Sauvegarder</button>
        <button onclick="renderBuilds()" class="btn-secondary">Annuler</button>
      </div>
    </div>
  `;
}

function sauvegarderBuild() {
  const nom = document.getElementById('new-nom').value.trim();
  const classe = document.getElementById('new-classe').value;
  const style = document.getElementById('new-style').value;
  const desc = document.getElementById('new-desc').value.trim();
  const traits = document.getElementById('new-traits').value.split(',').map(t => t.trim()).filter(t => t);
  const lien = document.getElementById('new-lien').value.trim();

  if (!nom) { alert('Donne un nom à ton build !'); return; }

  builds.push({ id: Date.now(), nom, classe, style, description: desc || 'Pas de description.', traits, lien });
  localStorage.setItem('kingsroad-builds', JSON.stringify(builds));
  renderBuilds();
}

// Initialisation
renderBuilds();