const tierlistData = {
  pve: {
    S: ["Lame acérée", "Frappe fatale", "Furie berserker", "Endurance de fer"],
    A: ["Ombre furtive", "Contre-attaque", "Rage déchaînée", "Bouclier de foi"],
    B: ["Esquive parfaite", "Frappe lourde", "Résistance", "Concentration"],
    C: ["Parade basique", "Récupération", "Instinct", "Vigilance"]
  },
  pvp: {
    S: ["Ombre furtive", "Frappe fatale", "Bouclier de foi", "Contre-attaque"],
    A: ["Lame acérée", "Esquive parfaite", "Rage déchaînée", "Endurance de fer"],
    B: ["Furie berserker", "Concentration", "Résistance", "Parade basique"],
    C: ["Frappe lourde", "Récupération", "Instinct", "Vigilance"]
  },
  boss: {
    S: ["Furie berserker", "Frappe lourde", "Endurance de fer", "Rage déchaînée"],
    A: ["Lame acérée", "Frappe fatale", "Bouclier de foi", "Concentration"],
    B: ["Contre-attaque", "Résistance", "Parade basique", "Ombre furtive"],
    C: ["Esquive parfaite", "Récupération", "Instinct", "Vigilance"]
  }
};

function renderTierlist(mode = 'pve') {
  const data = tierlistData[mode];
  const container = document.getElementById('tierlist-content');

  container.innerHTML = `
    <p style="font-size:12px;color:var(--text-muted);margin-bottom:16px">
      ⚠️ Cette tier list est basée sur l'expérience de la communauté — elle sera mise à jour régulièrement.
    </p>
    ${['S', 'A', 'B', 'C'].map(tier => `
      <div class="tier-row">
        <div class="tier-label tier-${tier}">${tier}</div>
        <div class="tier-items">
          ${data[tier].map(trait => `
            <span class="tier-item">${trait}</span>
          `).join('')}
        </div>
      </div>
    `).join('')}
    <p style="font-size:12px;color:var(--text-muted);margin-top:16px">
      Pour simuler tes traits : <a href="https://got-kingsroad.com" target="_blank" style="color:var(--gold)">got-kingsroad.com →</a>
    </p>
  `;
}

// Filtres tier list
const tierlistBtns = document.querySelectorAll('#page-tierlist .filter-btn');
tierlistBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    tierlistBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    renderTierlist(btn.dataset.mode);
  });
});

// Initialisation
renderTierlist('pve');