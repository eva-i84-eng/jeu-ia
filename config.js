// Réglages de la pluie de cerisiers.
// Modifie ces valeurs pour équilibrer le jeu sans toucher au reste du code.

const LARGEUR = 480; // largeur logique du canvas
const HAUTEUR = 720; // hauteur logique du canvas

// Types d'objets qui tombent.
const BRANCHE = "branche";
const ONI = "oni";
const SABRE = "sabre";
const TORII = "torii";

const COULEURS = {
  fond: "#26152c",
  cyan: "#e85d75",
  magenta: "#6d1f45",
  or: "#bfc4cf",
  rouge: "#e53232",
  branche: "#482719",
  fleur: "#d9384b",
  violet: "#6e3aa8",
  noir: "#120d18",
  bambou: "#11130f",
  slime: "#9dfc8a",
  slimeOmbre: "#39b873",
  blanc: "#f5f7ff",
  grille: "rgba(111, 44, 44, 0.2)"
};

const REGLAGES = {
  viesDepart: 3,
  vitessePanier: 560,    // pixels par seconde au clavier
  vitesseChute: 145,     // vitesse du premier niveau
  vitesseChuteMax: 430,
  intervalleObjet: 0.95, // secondes entre deux objets
  intervalleMin: 0.34,
  dureeNiveau: 18,       // secondes avant d'accélérer
  dureeCombo: 3,         // secondes pour enchaîner
  multiplicateurMax: 5,
  hasardOni: 0.14,
  hasardSabre: 0.05,
  dureeBouclier: 5,
  seuilTorii: 100,
  largeurPanier: 86,
  hauteurPanier: 28,
  margePanier: 12
};

const CLE_RECORD = "pluieDeNeonRecord";
