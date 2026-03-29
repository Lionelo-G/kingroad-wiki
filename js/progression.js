const progressionData = [
  {
    titre: "🌱 Early game — Débuter",
    etape: "Momentum 1 à 20",
    items: [
      "Fais toutes les quêtes principales — elles donnent le meilleur équipement en early",
      "Complète les donjons normaux en solo avant de passer en difficile",
      "Investis tes premiers points de traits dans la branche Attaque",
      "Rejoins une guilde dès que possible — les bonus de guilde sont importants",
      "Ne dépense pas tes ressources rares (cristaux, parchemins) trop tôt",
      "Objectif : débloquer les donjons d'élite"
    ]
  },
  {
    titre: "⚔️ Mid game — Se renforcer",
    etape: "Momentum 20 à 40",
    items: [
      "Priorise l'amélioration de ton équipement principal (arme et armure torse)",
      "Fais les donjons quotidiens sans exception — c'est la source de progression principale",
      "Commence à spécialiser tes traits selon ton style de jeu (PvE ou PvP)",
      "Participe aux événements de guilde pour obtenir des ressources exclusives",
      "Explore la carte pour débloquer les zones cachées et coffres secrets",
      "Objectif : atteindre le contenu de guilde avancé"
    ]
  },
  {
    titre: "💎 Late game — Optimiser",
    etape: "Momentum 40 à 60",
    items: [
      "Focus sur les artefacts — ils font une différence massive en late game",
      "Optimise ton build de traits pour le contenu que tu vises (boss, PvP, farming)",
      "Fais les raids de guilde chaque semaine sans faute",
      "Utilise le Gear Planner de got-kingsroad.com pour simuler tes améliorations",
      "Participe aux classements PvP si tu joues Assassin ou build burst",
      "Objectif : maîtriser le contenu end game et aider les nouveaux joueurs"
    ]
  },
  {
    titre: "📅 Routine quotidienne",
    etape: "Chaque jour",
    items: [
      "Donjons quotidiens (ne pas manquer les récompenses de streak)",
      "Missions de guilde",
      "Collecter les ressources passives (mines, fermes...)",
      "Vérifier les événements limités en cours",
      "Arène PvP si tu vises le classement"
    ]
  }
];

function renderProgression() {
  const container = document.getElementById('progression-content');
  container.innerHTML = progressionData.map(step => `
    <div class="progression-step">
      <h3>${step.titre}</h3>
      <p style="font-size:12px;color:var(--gold);margin-bottom:10px">${step.etape}</p>
      <ul>
        ${step.items.map(item => `<li>${item}</li>`).join('')}
        </ul>
    </div>
  `).join('');
}

renderProgression();