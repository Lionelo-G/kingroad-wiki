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

// Données des builds (on commence avec quelques exemples)
let builds = JSON.parse(localStorage.getItem('kingsroad-builds')) || [
  {
    id: 1,
    nom: "Assassin Critique",
    classe: "assassin",
    description: "Maximise les dégâts critiques pour one-shot les ennemis.",
    stats: { "Crit Rate": "45%", "Crit DMG": "180%", "ATK": "1250" }
  },
  {
    id: 2,
    nom: "Chevalier Tank",
    classe: "chevalier",
    description: "Build défensif pour survivre aux boss les plus difficiles.",
    stats: { "HP": "25000", "DEF": "850", "Parry": "30%" }
  },
  {
    id: 3,
    nom: "Mercenaire Berserker",
    classe: "mercenaire",
    description: "Dégâts bruts maximisés avec la grande hache.",
    stats: { "ATK": "1800", "Rage Gain": "+25%", "Mighty Strike": "220%" }
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
      <span class="class-badge badge-${build.classe}">${build.classe}</span>
      <h3>${build.nom}</h3>
      <p>${build.description}</p>
      <div class="build-stats">
        ${Object.entries(build.stats).map(([k, v]) => `
          <span class="stat-chip">${k}: ${v}</span>
        `).join('')}
      </div>
    </div>
  `).join('');
}

// Filtres par classe
const filterBtns = document.querySelectorAll('.filter-btn');
filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    renderBuilds(btn.dataset.class);
  });
});

// Bouton créer un build
document.getElementById('btn-new-build').addEventListener('click', () => {
  afficherFormulaireNouveauBuild();
});

function afficherFormulaireNouveauBuild() {
  const container = document.getElementById('builds-list');
  container.innerHTML = `
    <div class="build-card">
      <h3 style="color:var(--gold);margin-bottom:16px">Nouveau build</h3>
      <div class="form-group">
        <label>Nom du build</label>
        <input type="text" id="new-nom" placeholder="Ex: Assassin PvP">
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
        <label>Description</label>
        <input type="text" id="new-desc" placeholder="Décris ton build en une phrase">
      </div>
      <button onclick="sauvegarderBuild()" style="
        background: var(--gold);
        color: var(--darker);
        border: none;
        padding: 12px 24px;
        border-radius: 4px;
        cursor: pointer;
        font-weight: 600;
        font-size: 14px;
        margin-top: 8px;
      ">Sauvegarder</button>
      <button onclick="renderBuilds()" style="
        background: transparent;
        color: var(--text-muted);
        border: 1px solid var(--text-muted);
        padding: 12px 24px;
        border-radius: 4px;
        cursor: pointer;
        font-size: 14px;
        margin-top: 8px;
        margin-left: 8px;
      ">Annuler</button>
    </div>
  `;
}

function sauvegarderBuild() {
  const nom = document.getElementById('new-nom').value.trim();
  const classe = document.getElementById('new-classe').value;
  const desc = document.getElementById('new-desc').value.trim();

  if (!nom) {
    alert('Donne un nom à ton build !');
    return;
  }

  const nouveauBuild = {
    id: Date.now(),
    nom,
    classe,
    description: desc || 'Pas de description.',
    stats: {}
  };

  builds.push(nouveauBuild);
  localStorage.setItem('kingsroad-builds', JSON.stringify(builds));
  renderBuilds();
}

// Initialisation
renderBuilds();