// Dessin du décor, du slime et des objets. Tout est tracé au canvas.

function dessinerBambou(ctx, x, cote) {
  ctx.save();
  ctx.translate(x, HAUTEUR);
  ctx.strokeStyle = COULEURS.bambou;
  ctx.lineWidth = 9;
  ctx.lineCap = "round";
  ctx.beginPath();
  ctx.moveTo(0, 0);
  ctx.quadraticCurveTo(cote * 7, -HAUTEUR * 0.42, cote * 2, -HAUTEUR * 0.86);
  ctx.stroke();
  ctx.lineWidth = 2;
  ctx.strokeStyle = "#272a1b";
  for (let i = 0; i < 6; i++) {
    const y = -40 - i * 105;
    ctx.beginPath();
    ctx.moveTo(-4 + cote * i * 0.4, y);
    ctx.lineTo(5 + cote * i * 0.4, y);
    ctx.stroke();
  }
  ctx.restore();
}
function dessinerFond(ctx, temps) {
  const degrade = ctx.createLinearGradient(0, 0, 0, HAUTEUR);
  degrade.addColorStop(0, "#32143b");
  degrade.addColorStop(0.48, "#d75b55");
  degrade.addColorStop(1, "#f08a58");
  ctx.fillStyle = degrade;
  ctx.fillRect(0, 0, LARGEUR, HAUTEUR);

  const horizon = HAUTEUR * 0.62;
  const soleil = ctx.createRadialGradient(LARGEUR / 2, horizon * 0.74, 8, LARGEUR / 2, horizon * 0.74, 90);
  soleil.addColorStop(0, "#ff3232");
  soleil.addColorStop(0.75, "#e51e2a");
  soleil.addColorStop(1, "rgba(229, 30, 42, 0)");
  ctx.fillStyle = soleil;
  ctx.beginPath();
  ctx.arc(LARGEUR / 2, horizon * 0.74, 58, 0, Math.PI * 2);
  ctx.fill();

  const halo = ctx.createRadialGradient(LARGEUR / 2, horizon, 4, LARGEUR / 2, horizon, LARGEUR * 0.8);
  halo.addColorStop(0, "rgba(255, 196, 120, 0.3)");
  halo.addColorStop(1, "rgba(255, 196, 120, 0)");
  ctx.fillStyle = halo;
  ctx.fillRect(0, 0, LARGEUR, HAUTEUR);

  ctx.fillStyle = "rgba(83, 34, 32, 0.35)";
  ctx.fillRect(0, horizon, LARGEUR, HAUTEUR - horizon);
  dessinerBambou(ctx, 22, 1);
  dessinerBambou(ctx, LARGEUR - 22, -1);

  ctx.save();
  ctx.shadowColor = "#ff8965";
  ctx.shadowBlur = 16;
  ctx.strokeStyle = "rgba(255, 174, 112, 0.55)";
  ctx.beginPath();
  ctx.moveTo(0, horizon);
  ctx.lineTo(LARGEUR, horizon);
  ctx.stroke();
  ctx.restore();
}
function dessinerPanier(ctx, panier, temps, bouclierActif) {
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
  if (bouclierActif) {
    ctx.fillStyle = COULEURS.noir;
    ctx.strokeStyle = COULEURS.violet;
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(-largeur * 0.34, -hauteur * 0.75);
    ctx.quadraticCurveTo(0, -hauteur * 1.65, largeur * 0.34, -hauteur * 0.75);
    ctx.lineTo(largeur * 0.27, -hauteur * 0.42);
    ctx.lineTo(-largeur * 0.27, -hauteur * 0.42);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
    ctx.fillStyle = COULEURS.violet;
    ctx.fillRect(-largeur * 0.39, -hauteur * 0.52, largeur * 0.78, 4);
    ctx.beginPath();
    ctx.moveTo(-largeur * 0.36, -hauteur * 0.65);
    ctx.lineTo(-largeur * 0.52, -hauteur * 0.38);
    ctx.moveTo(largeur * 0.36, -hauteur * 0.65);
    ctx.lineTo(largeur * 0.52, -hauteur * 0.38);
    ctx.stroke();
  }
  ctx.restore();
}
function dessinerBranche(ctx, objet, temps) {
  const r = objet.rayon;
  const battement = 1 + 0.06 * Math.sin(temps * 5 + objet.pulsation);
  ctx.rotate(objet.rotation);
  ctx.scale(battement, battement);
  ctx.strokeStyle = COULEURS.branche;
  ctx.lineWidth = 5;
  ctx.lineCap = "round";
  ctx.beginPath();
  ctx.moveTo(-r * 1.5, r * 0.85);
  ctx.bezierCurveTo(-r * 0.85, r * 0.35, -r * 0.55, -r * 0.8, 0, -r * 0.2);
  ctx.bezierCurveTo(r * 0.55, r * 0.35, r * 0.65, -r * 0.85, r * 1.45, -r * 0.95);
  ctx.stroke();
  ctx.lineWidth = 2.5;
  ctx.strokeStyle = "#6b3b25";
  ctx.beginPath();
  ctx.moveTo(-r * 0.65, r * 0.35);
  ctx.quadraticCurveTo(-r * 1.05, -r * 0.25, -r * 1.25, -r * 0.8);
  ctx.moveTo(r * 0.45, r * 0.12);
  ctx.quadraticCurveTo(r * 0.95, r * 0.1, r * 1.15, r * 0.65);
  ctx.stroke();
  ctx.fillStyle = COULEURS.fleur;
  const fleurs = [
    { x: -r * 1.5, y: r * 0.85 },
    { x: -r * 1.25, y: -r * 0.8 },
    { x: r * 1.45, y: -r * 0.95 },
    { x: r * 1.15, y: r * 0.65 }
  ];
  for (const fleur of fleurs) {
    ctx.beginPath();
    ctx.arc(fleur.x - r * 0.14, fleur.y, r * 0.18, 0, Math.PI * 2);
    ctx.arc(fleur.x + r * 0.14, fleur.y, r * 0.18, 0, Math.PI * 2);
    ctx.arc(fleur.x, fleur.y - r * 0.16, r * 0.18, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = "#f3b267";
    ctx.beginPath();
    ctx.arc(fleur.x, fleur.y, r * 0.07, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = COULEURS.fleur;
  }
}
function dessinerSabre(ctx, objet, temps) {
  const r = objet.rayon;
  ctx.rotate(objet.rotation);
  ctx.strokeStyle = "#eee6d4";
  ctx.lineWidth = 7;
  ctx.beginPath();
  ctx.moveTo(-r * 0.65, r * 0.15);
  ctx.quadraticCurveTo(r * 0.5, -r * 0.25, r * 1.8, -r * 0.95);
  ctx.stroke();
  ctx.strokeStyle = "#a8adb8";
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(-r * 0.52, r * 0.03);
  ctx.quadraticCurveTo(r * 0.55, -r * 0.37, r * 1.68, -r * 0.93);
  ctx.stroke();
  ctx.strokeStyle = COULEURS.noir;
  ctx.lineWidth = 10;
  ctx.beginPath();
  ctx.moveTo(-r * 1.35, r * 0.7);
  ctx.lineTo(-r * 0.45, r * 0.2);
  ctx.stroke();
  ctx.strokeStyle = COULEURS.violet;
  ctx.lineWidth = 4;
  ctx.beginPath();
  ctx.moveTo(-r * 1.4, r * 0.32);
  ctx.lineTo(-r * 1.2, r * 0.9);
  ctx.moveTo(-r * 1.32, r * 0.45);
  ctx.lineTo(-r * 0.58, r * 0.05);
  ctx.stroke();
  ctx.strokeStyle = "#8b6a43";
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.moveTo(-r * 0.35, r * 0.15);
  ctx.lineTo(-r * 0.12, -r * 0.05);
  ctx.stroke();
}
function dessinerOni(ctx, objet, temps) {
  const r = objet.rayon * (1 + 0.09 * Math.sin(temps * 9 + objet.pulsation));
  ctx.rotate(objet.rotation * 0.4);
  ctx.strokeStyle = COULEURS.noir;
  ctx.lineWidth = 4;
  ctx.beginPath();
  ctx.moveTo(-r * 0.75, -r * 0.65);
  ctx.lineTo(-r * 0.5, -r * 1.25);
  ctx.lineTo(-r * 0.1, -r * 0.75);
  ctx.moveTo(r * 0.75, -r * 0.65);
  ctx.lineTo(r * 0.5, -r * 1.25);
  ctx.lineTo(r * 0.1, -r * 0.75);
  ctx.stroke();
  ctx.beginPath();
  ctx.ellipse(0, 0, r, r * 0.82, 0, 0, Math.PI * 2);
  ctx.fillStyle = COULEURS.noir;
  ctx.fill();
  ctx.strokeStyle = COULEURS.rouge;
  ctx.lineWidth = 2;
  ctx.stroke();
  ctx.fillStyle = COULEURS.rouge;
  ctx.beginPath();
  ctx.ellipse(0, r * 0.08, r * 0.78, r * 0.7, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = COULEURS.noir;
  ctx.beginPath();
  ctx.ellipse(-r * 0.34, -r * 0.1, r * 0.13, r * 0.2, 0, 0, Math.PI * 2);
  ctx.ellipse(r * 0.34, -r * 0.1, r * 0.13, r * 0.2, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = COULEURS.blanc;
  ctx.beginPath();
  ctx.arc(-r * 0.34, -r * 0.1, r * 0.05, 0, Math.PI * 2);
  ctx.arc(r * 0.34, -r * 0.1, r * 0.05, 0, Math.PI * 2);
  ctx.fill();
  ctx.strokeStyle = COULEURS.noir;
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.moveTo(-r * 0.48, r * 0.34);
  ctx.quadraticCurveTo(0, r * 0.62, r * 0.48, r * 0.34);
  ctx.moveTo(-r * 0.2, r * 0.34);
  ctx.lineTo(-r * 0.28, r * 0.5);
  ctx.moveTo(r * 0.2, r * 0.34);
  ctx.lineTo(r * 0.28, r * 0.5);
  ctx.stroke();
  ctx.fillStyle = "#f3b267";
  ctx.beginPath();
  ctx.arc(-r * 0.5, -r * 0.52, r * 0.08, 0, Math.PI * 2);
  ctx.arc(r * 0.5, -r * 0.52, r * 0.08, 0, Math.PI * 2);
  ctx.fill();
}
function dessinerTorii(ctx, objet, temps) {
  const r = objet.rayon;
  ctx.rotate(Math.sin(temps * 2 + objet.pulsation) * 0.04);
  ctx.strokeStyle = COULEURS.noir;
  ctx.fillStyle = COULEURS.noir;
  ctx.lineCap = "square";
  ctx.lineWidth = r * 0.18;
  ctx.beginPath();
  ctx.moveTo(-r * 0.9, r * 0.95);
  ctx.lineTo(-r * 0.68, -r * 0.85);
  ctx.moveTo(r * 0.9, r * 0.95);
  ctx.lineTo(r * 0.68, -r * 0.85);
  ctx.stroke();
  ctx.lineWidth = r * 0.16;
  ctx.beginPath();
  ctx.moveTo(-r * 1.05, -r * 0.9);
  ctx.quadraticCurveTo(0, -r * 1.18, r * 1.05, -r * 0.9);
  ctx.stroke();
  ctx.lineWidth = r * 0.11;
  ctx.beginPath();
  ctx.moveTo(-r * 0.92, -r * 0.62);
  ctx.quadraticCurveTo(0, -r * 0.85, r * 0.92, -r * 0.62);
  ctx.stroke();
  ctx.fillRect(-r * 1.15, -r * 0.98, r * 2.3, r * 0.12);
  ctx.fillRect(-r * 0.86, r * 0.7, r * 0.18, r * 0.25);
  ctx.fillRect(r * 0.68, r * 0.7, r * 0.18, r * 0.25);
  ctx.strokeStyle = "#342b26";
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(-r * 0.95, -r * 0.98);
  ctx.lineTo(r * 0.95, -r * 0.98);
  ctx.stroke();
}
function dessinerObjet(ctx, objet, temps) {
  ctx.save();
  ctx.translate(objet.x, objet.y);
  if (objet.type === TORII) dessinerTorii(ctx, objet, temps);
  else if (objet.type === ONI) dessinerOni(ctx, objet, temps);
  else if (objet.type === SABRE) dessinerSabre(ctx, objet, temps);
  else dessinerBranche(ctx, objet, temps);
  ctx.restore();
}
