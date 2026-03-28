// Stats de base par classe au niveau 1
const statsBase = {
  assassin: {
    "Attack Power": 120,
    "Critical Rate": 15,
    "Critical DMG": 150,
    "Max HP": 3500,
    "Defense": 80,
    "Evasion": 12,
    "Rage": 100
  },
  chevalier: {
    "Attack Power": 100,
    "Critical Rate": 8,
    "Critical DMG": 130,
    "Max HP": 5000,
    "Defense": 150,
    "Evasion": 5,
    "Rage": 100
  },
  mercenaire: {
    "Attack Power": 150,
    "Critical Rate": 10,
    "Critical DMG": 140,
    "Max HP": 4200,
    "Defense": 110,
    "Evasion": 7,
    "Rage": 100
  }
};

// Progression des stats par niveau
const progressionParNiveau = {
  "Attack Power": 18,
  "Critical Rate": 0.3,
  "Critical DMG": 1.5,
  "Max HP": 420,
  "Defense": 12,
  "Evasion": 0.1,
  "Rage": 0
};

// Unités d'affichage pour chaque stat
const unites = {
  "Attack Power": "",
  "Critical Rate": "%",
  "Critical DMG": "%",
  "Max HP": "",
  "Defense": "",
  "Evasion": "%",
  "Rage": ""
};

function calculerStats(classe, niveau) {
  const base = statsBase[classe];
  const result = {};
  for (const stat in base) {
    const valeur = base[stat] + (progressionParNiveau[stat] * (niveau - 1));
    result[stat] = Math.round(valeur * 10) / 10;
  }
  return result;
}

function renderCalculator() {
  const container = document.getElementById('calculator-app');
  container.innerHTML = `
    <div class="calculator-form">
      <div class="form-group">
        <label>Classe</label>
        <select id="calc-classe" onchange="updateCalculator()">
          <option value="assassin">Assassin</option>
          <option value="chevalier">Chevalier</option>
          <option value="mercenaire">Mercenaire</option>
        </select>
      </div>
      <div class="form-group">
        <label>Niveau (<span id="niveau-display">1</span>)</label>
        <input 
          type="range" 
          id="calc-niveau" 
          min="1" max="60" value="1"
          oninput="document.getElementById('niveau-display').textContent = this.value; updateCalculator()"
          style="width:100%; accent-color: var(--gold);"
        >
      </div>
      <div id="stats-result" class="stats-result"></div>
    </div>
  `;
  updateCalculator();
}

function updateCalculator() {
  const classe = document.getElementById('calc-classe').value;
  const niveau = parseInt(document.getElementById('calc-niveau').value);
  const stats = calculerStats(classe, niveau);

  document.getElementById('stats-result').innerHTML = Object.entries(stats).map(([nom, valeur]) => `
    <div class="stat-row">
      <span class="stat-name">${nom}</span>
      <span class="stat-value">${valeur}${unites[nom]}</span>
    </div>
  `).join('');
}

// Initialisation
renderCalculator();