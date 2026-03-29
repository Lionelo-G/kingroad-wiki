const guidesData = {
  assassin: {
    nom: "Assassin",
    icone: "🗡️",
    intro: "L'Assassin est un personnage orienté dégâts critiques et mobilité. Difficile à maîtriser mais redoutable entre de bonnes mains.",
    sections: [
      {
        titre: "Points forts / Points faibles",
        contenu: `<ul>
          <li><strong>Points forts :</strong> Burst damage élevé, esquive excellente, idéal en PvP</li>
          <li><strong>Points faibles :</strong> Fragile, nécessite une bonne gestion de la Rage, difficile en early game</li>
        </ul>`
      },
      {
        titre: "Early game (débutant)",
        contenu: `<ul>
          <li>Priorise les competences qui augmentent ton <strong>Critical Rate</strong> en premier</li>
          <li>Ne néglige pas l'Evasion — tu es fragile, esquiver est vital</li>
          <li>Fais les donjons normaux avant de passer en difficile</li>
          <li>Équipement : vise les pièces avec bonus Crit Rate / Crit DMG</li>
        </ul>`
      },
      {
        titre: "Mid game",
        contenu: `<ul>
          <li>Commence à investir dans les competences de branche Attaque</li>
          <li>Optimise ta rotation de compétences pour maximiser le burst</li>
          <li>Rejoins une guilde pour accéder aux contenus de groupe</li>
        </ul>`
      },
      {
        titre: "End game",
        contenu: `<ul>
          <li>Vise un Critical Rate de 45%+ et Critical DMG de 180%+</li>
          <li>Les artefacts orientés Crit sont prioritaires</li>
          <li>En PvP : maîtrise le timing de ton burst pour one-shot avant d'être tué</li>
        </ul>`
      },
      {
        titre: "Ressources utiles",
        contenu: `<p>Pour planifier ton équipement : <a href="https://got-kingsroad.com" target="_blank" style="color:var(--gold)">Gear Planner sur got-kingsroad.com →</a></p>`
      }
    ]
  },
  chevalier: {
    nom: "Chevalier",
    icone: "🛡️",
    intro: "Le Chevalier est la classe la plus accessible du jeu. Solide, polyvalent, il excelle en contenu PvE et dans les combats de boss.",
    sections: [
      {
        titre: "Points forts / Points faibles",
        contenu: `<ul>
          <li><strong>Points forts :</strong> Très résistant, facile à prendre en main, excellent pour les boss</li>
          <li><strong>Points faibles :</strong> Dégâts plus faibles, moins efficace en PvP contre des joueurs expérimentés</li>
        </ul>`
      },
      {
        titre: "Early game (débutant)",
        contenu: `<ul>
          <li>Investis dans les competences de branche Défense pour survivre facilement</li>
          <li>Priorise les pièces d'équipement avec bonus HP et Defense</li>
          <li>Idéal pour apprendre les mécaniques du jeu sans mourir constamment</li>
        </ul>`
      },
      {
        titre: "Mid game",
        contenu: `<ul>
          <li>Commence à équilibrer Attaque et Défense dans tes competences</li>
          <li>Le Chevalier est très demandé en groupe pour les donjons difficiles</li>
          <li>Travaille ta Parry — c'est la mécanique clé de la classe</li>
        </ul>`
      },
      {
        titre: "End game",
        contenu: `<ul>
          <li>Build Tank : maximise HP et Defense pour le contenu de guilde</li>
          <li>Build Hybride : équilibre ATK et DEF pour être utile partout</li>
          <li>En PvP : joue sur l'endurance et les contre-attaques</li>
        </ul>`
      },
      {
        titre: "Ressources utiles",
        contenu: `<p>Pour planifier ton équipement : <a href="https://got-kingsroad.com" target="_blank" style="color:var(--gold)">Gear Planner sur got-kingsroad.com →</a></p>`
      }
    ]
  },
  mercenaire: {
    nom: "Mercenaire",
    icone: "⚔️",
    intro: "Le Mercenaire est le spécialiste des dégâts bruts. Sa grande hache lui permet d'infliger des dégâts massifs, surtout contre les boss à grosse HP.",
    sections: [
      {
        titre: "Points forts / Points faibles",
        contenu: `<ul>
          <li><strong>Points forts :</strong> Dégâts bruts très élevés, excellent contre les boss, Mighty Strike dévastateur</li>
          <li><strong>Points faibles :</strong> Moins mobile que l'Assassin, vulnérable si mal positionné</li>
        </ul>`
      },
      {
        titre: "Early game (débutant)",
        contenu: `<ul>
          <li>Priorise l'Attack Power avant tout</li>
          <li>Apprends à gérer ta Rage — le Mighty Strike est ton outil principal</li>
          <li>Équipement : pièces avec bonus ATK et Mighty Strike DMG</li>
        </ul>`
      },
      {
        titre: "Mid game",
        contenu: `<ul>
          <li>Investis dans les competences qui boostent le Rage Gain</li>
          <li>Le Mercenaire est redoutable en donjon boss — propose-toi en groupe</li>
          <li>Commence à travailler ton positionnement pour éviter les dégâts</li>
        </ul>`
      },
      {
        titre: "End game",
        contenu: `<ul>
          <li>Vise un Mighty Strike DMG de 220%+ pour le contenu end game</li>
          <li>Build Berserker : maximise ATK et Rage Gain</li>
          <li>Les artefacts qui réduisent le cooldown de Mighty Strike sont prioritaires</li>
        </ul>`
      },
      {
        titre: "Ressources utiles",
        contenu: `<p>Pour planifier ton équipement : <a href="https://got-kingsroad.com" target="_blank" style="color:var(--gold)">Gear Planner sur got-kingsroad.com →</a></p>`
      }
    ]
  }
};

function ouvrirGuide(classe) {
  const guide = guidesData[classe];
  const detail = document.getElementById('guide-detail');

  detail.style.display = 'block';
  detail.innerHTML = `
    <div style="display:flex;align-items:center;gap:12px;margin-bottom:16px">
      <span style="font-size:28px">${guide.icone}</span>
      <h2 style="border:none;margin:0">${guide.nom}</h2>
      <button onclick="fermerGuide()" style="
        margin-left:auto;
        background:transparent;
        border:1px solid var(--text-muted);
        color:var(--text-muted);
        padding:6px 12px;
        border-radius:4px;
        cursor:pointer;
        font-size:12px;
      ">✕ Fermer</button>
    </div>
    <p style="font-size:13px;color:var(--text-muted);margin-bottom:20px;line-height:1.7">${guide.intro}</p>
    ${guide.sections.map(s => `
      <div class="guide-section">
        <h3>${s.titre}</h3>
        ${s.contenu}
      </div>
    `).join('')}
  `;

  detail.scrollIntoView({ behavior: 'smooth' });
}

function fermerGuide() {
  document.getElementById('guide-detail').style.display = 'none';
}