// Dessin du décor, du panier et des objets. Tout est tracé au canvas.

const etoiles = [];
for (let i = 0; i < 64; i++) {
  etoiles.push({ x: Math.random() * LARGEUR, y: Math.random() * HAUTEUR * 0.6, taille: Math.random() + 0.5, phase: Math.random() * 6.28 });
}
function dessinerFond(ctx, temps) {
  const degrade = ctx.createLinearGradient(0, 0, 0, HAUTEUR);
  degrade.addColorStop(0, "#170b32");
  degrade.addColorStop(0.52, COULEURS.fond);
  degrade.addColorStop(1, "#02010a");
  ctx.fillStyle = degrade;
  ctx.fillRect(0, 0, LARGEUR, HAUTEUR);

  const horizon = HAUTEUR * 0.58;
  const halo = ctx.createRadialGradient(LARGEUR / 2, horizon, 4, LARGEUR / 2, horizon, LARGEUR * 0.8);
  halo.addColorStop(0, "rgba(255, 62, 165, 0.2)");
  halo.addColorStop(0.5, "rgba(122, 92, 255, 0.07)");
  halo.addColorStop(1, "rgba(0, 0, 0, 0)");
  ctx.fillStyle = halo;
  ctx.fillRect(0, 0, LARGEUR, HAUTEUR);

  for (const etoile of etoiles) {
    const lueur = 0.2 + 0.4 * Math.abs(Math.sin(temps + etoile.phase));
    ctx.fillStyle = "rgba(245, 247, 255, " + lueur + ")";
    ctx.fillRect(etoile.x, etoile.y, etoile.taille, etoile.taille);
  }

  ctx.strokeStyle = COULEURS.grille;
  ctx.lineWidth = 1;
  ctx.beginPath();
  for (let i = -9; i <= 9; i++) {
    ctx.moveTo(LARGEUR / 2, horizon);
    ctx.lineTo(LARGEUR / 2 + i * 78, HAUTEUR);
  }
  ctx.stroke();
  for (let i = 0; i < 14; i++) {
    const avancee = (i + (temps * 0.3) % 1) / 14;
    const y = horizon + Math.pow(avancee, 2.3) * (HAUTEUR - horizon);
    ctx.globalAlpha = 0.12 + avancee * 0.5;
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(LARGEUR, y);
    ctx.stroke();
  }
  ctx.globalAlpha = 1;

  ctx.save();
  ctx.shadowColor = COULEURS.magenta;
  ctx.shadowBlur = 16;
  ctx.strokeStyle = "rgba(255, 62, 165, 0.5)";
  ctx.beginPath();
  ctx.moveTo(0, horizon);
  ctx.lineTo(LARGEUR, horizon);
  ctx.stroke();
  ctx.restore();
}
function dessinerPanier(ctx, panier, temps) {
  const inclinaison = Math.max(-0.16, Math.min(0.16, panier.vitesse * 0.0002));
  const pulsation = 1 + 0.04 * Math.sin(temps * 5);
  const largeur = panier.largeur * pulsation;
  const hauteur = panier.hauteur * pulsation;
  ctx.save();
  ctx.translate(panier.x + panier.largeur / 2, panier.y + panier.hauteur / 2 - 13);
  ctx.rotate(inclinaison);
  ctx.shadowColor = COULEURS.slime;
  ctx.shadowBlur = 24;
  ctx.fillStyle = COULEURS.slime;
  ctx.beginPath();
  ctx.moveTo(-largeur / 2, hauteur / 2);
  ctx.lineTo(-largeur / 2, -hauteur * 0.08);
  ctx.quadraticCurveTo(-largeur * 0.38, -hauteur * 0.9, 0, -hauteur * 0.82);
  ctx.quadraticCurveTo(largeur * 0.38, -hauteur * 0.9, largeur / 2, -hauteur * 0.08);
  ctx.lineTo(largeur / 2, hauteur / 2);
  ctx.quadraticCurveTo(0, hauteur * 0.72, -largeur / 2, hauteur / 2);
  ctx.closePath();
  ctx.fill();
  ctx.shadowBlur = 8;
  ctx.strokeStyle = COULEURS.slimeOmbre;
  ctx.lineWidth = 2;
  ctx.stroke();
  ctx.shadowBlur = 0;
  ctx.fillStyle = COULEURS.blanc;
  ctx.beginPath();
  ctx.ellipse(-largeur * 0.2, -hauteur * 0.16, 5, 7, 0, 0, Math.PI * 2);
  ctx.ellipse(largeur * 0.2, -hauteur * 0.16, 5, 7, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = "#18233b";
  ctx.beginPath();
  ctx.arc(-largeur * 0.2, -hauteur * 0.1, 2.5, 0, Math.PI * 2);
  ctx.arc(largeur * 0.2, -hauteur * 0.1, 2.5, 0, Math.PI * 2);
  ctx.fill();
  ctx.strokeStyle = "#24734f";
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.arc(0, hauteur * 0.08, 7, 0.15, Math.PI - 0.15);
  ctx.stroke();
  ctx.fillStyle = "rgba(255, 62, 165, 0.5)";
  ctx.beginPath();
  ctx.ellipse(-largeur * 0.36, hauteur * 0.12, 5, 2.5, 0, 0, Math.PI * 2);
  ctx.ellipse(largeur * 0.36, hauteur * 0.12, 5, 2.5, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();
}
function dessinerCristal(ctx, objet, temps) {
  const r = objet.rayon;
  const dore = objet.type === DORE;
  const couleur = dore ? COULEURS.or : COULEURS.cyan;
  const battement = 1 + 0.06 * Math.sin(temps * 5 + objet.pulsation);
  ctx.rotate(objet.rotation);
  ctx.scale(battement, battement);
  ctx.shadowColor = couleur;
  ctx.shadowBlur = 20;
  ctx.beginPath();
  ctx.moveTo(0, -r);
  ctx.lineTo(r * 0.62, 0);
  ctx.lineTo(0, r);
  ctx.lineTo(-r * 0.62, 0);
  ctx.closePath();
  ctx.fillStyle = dore ? "rgba(255, 209, 102, 0.22)" : "rgba(40, 240, 255, 0.2)";
  ctx.fill();
  ctx.strokeStyle = couleur;
  ctx.lineWidth = 2;
  ctx.stroke();
  ctx.fillStyle = COULEURS.blanc;
  ctx.beginPath();
  ctx.arc(0, 0, r * 0.28, 0, Math.PI * 2);
  ctx.fill();
}
function dessinerBombe(ctx, objet, temps) {
  const r = objet.rayon * (1 + 0.09 * Math.sin(temps * 9 + objet.pulsation));
  ctx.rotate(objet.rotation * 0.4);
  ctx.shadowColor = COULEURS.rouge;
  ctx.shadowBlur = 22;
  ctx.strokeStyle = COULEURS.rouge;
  ctx.lineWidth = 3;
  ctx.beginPath();
  for (let i = 0; i < 8; i++) {
    const angle = i * Math.PI / 4;
    ctx.moveTo(Math.cos(angle) * r, Math.sin(angle) * r);
    ctx.lineTo(Math.cos(angle) * (r + 7), Math.sin(angle) * (r + 7));
  }
  ctx.stroke();
  ctx.beginPath();
  ctx.arc(0, 0, r, 0, Math.PI * 2);
  ctx.fillStyle = "#1a0614";
  ctx.fill();
  ctx.strokeStyle = COULEURS.magenta;
  ctx.lineWidth = 2;
  ctx.stroke();
  ctx.fillStyle = COULEURS.rouge;
  ctx.beginPath();
  ctx.arc(0, 0, r * 0.34, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = COULEURS.blanc;
  ctx.beginPath();
  ctx.arc(-r * 0.12, -r * 0.12, r * 0.1, 0, Math.PI * 2);
  ctx.fill();
}
function dessinerObjet(ctx, objet, temps) {
  ctx.save();
  ctx.translate(objet.x, objet.y);
  if (objet.type === BOMBE) dessinerBombe(ctx, objet, temps);
  else dessinerCristal(ctx, objet, temps);
  ctx.restore();
}
