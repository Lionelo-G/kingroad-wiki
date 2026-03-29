const SUPABASE_URL = 'https://tffbirgikaqvkmzhvzdk.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRmZmJpcmdpa2Fxdmttemh2emRrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQ3ODU3OTksImV4cCI6MjA5MDM2MTc5OX0.4xhcg8giKATCoOim-osJk5WeHmiJ_skVqVtGwUiWXcg';

// Client Supabase
const db = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

// Navigation
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

// Charger les builds depuis Supabase
async function chargerBuilds(filtre = 'all') {
  const container = document.getElementById('builds-list');
  container.innerHTML = '<p style="color:var(--text-muted);text-align:center;padding:40px;font-style:italic">Chargement...</p>';

  let query = db.from('builds').select('*').order('created_at', { ascending: false });
  if (filtre !== 'all') query = query.eq('classe', filtre);

  const { data, error } = await query;

  if (error) {
    container.innerHTML = '<p style="color:#cc4444;text-align:center;padding:40px">Erreur de chargement.</p>';
    return;
  }

  if (!data || data.length === 0) {
    container.innerHTML = '<p style="color:var(--text-muted);text-align:center;padding:40px;font-style:italic">Aucun build pour cette classe.</p>';
    return;
  }

  container.innerHTML = data.map(build => {
    const traits = build.traits ? build.traits.split(',').map(t => t.trim()) : [];
    return `
      <div class="build-card">
        <div class="build-card-top">
          <span class="class-badge badge-${build.classe}">${build.classe}</span>
          <span class="style-badge">${build.style || ''}</span>
        </div>
        <h3>${build.nom}</h3>
        <p>${build.description || ''}</p>
        <div class="build-traits">
          ${traits.map(t => `<span class="trait-chip">${t}</span>`).join('')}
        </div>
        ${build.lien ? `<a href="${build.lien}" target="_blank" class="gear-link">Voir le gear sur got-kingsroad.com →</a>` : ''}
      </div>
    `;
  }).join('');
}

// Filtres
const filterBtns = document.querySelectorAll('#page-builds .filter-btn');
filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    chargerBuilds(btn.dataset.class);
  });
});

// Bouton nouveau build
document.getElementById('btn-new-build').addEventListener('click', afficherFormulaireNouveauBuild);

function afficherFormulaireNouveauBuild() {
  const container = document.getElementById('builds-list');
  container.innerHTML = `
    <div class="build-card">
      <h3 style="font-family:'Cinzel',serif;color:var(--gold);margin-bottom:16px;letter-spacing:1px">Forger un build</h3>
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
        <button onclick="sauvegarderBuild()" class="btn-primary">Forger</button>
        <button onclick="chargerBuilds()" class="btn-secondary">Annuler</button>
      </div>
    </div>
  `;
}

async function sauvegarderBuild() {
  const nom = document.getElementById('new-nom').value.trim();
  const classe = document.getElementById('new-classe').value;
  const style = document.getElementById('new-style').value;
  const description = document.getElementById('new-desc').value.trim();
  const traits = document.getElementById('new-traits').value.trim();
  const lien = document.getElementById('new-lien').value.trim();

  if (!nom) { alert('Donne un nom à ton build !'); return; }

  const { error } = await db.from('builds').insert([{
    nom, classe, style, description, traits, lien
  }]);

  if (error) {
    alert('Erreur lors de la sauvegarde. Réessaie.');
    return;
  }

  chargerBuilds();
}

// Initialisation
chargerBuilds();