export type Dimension = 'temps' | 'capital' | 'competences' | 'reseau' | 'experience' | 'risque';

export interface Answer {
  text: string;
  score: number;
}

export interface Question {
  id: string;
  dimension: Dimension;
  text: string;
  answers: Answer[];
}

export const questions: Question[] = [
  // DIMENSION 1 — Temps disponible
  {
    id: 't1',
    dimension: 'temps',
    text: 'Combien d’heures par semaine pouvez-vous consacrer au marchand de biens ?',
    answers: [
      { text: 'Moins de 3h', score: 0 },
      { text: '3 à 5h', score: 25 },
      { text: '5 à 10h', score: 50 },
      { text: '10 à 20h', score: 75 },
      { text: 'Temps plein', score: 100 },
    ],
  },
  {
    id: 't2',
    dimension: 'temps',
    text: 'Quelle est votre situation professionnelle actuelle ?',
    answers: [
      { text: 'Salarié temps plein', score: 20 },
      { text: 'Salarié temps partiel', score: 60 },
      { text: 'Indépendant', score: 70 },
      { text: 'Entrepreneur', score: 80 },
      { text: 'Sans activité', score: 100 },
    ],
  },
  {
    id: 't3',
    dimension: 'temps',
    text: 'Votre travail vous laisse-t-il de la flexibilité ?',
    answers: [
      { text: 'Très peu', score: 0 },
      { text: 'Un peu', score: 30 },
      { text: 'Assez', score: 60 },
      { text: 'Beaucoup', score: 100 },
    ],
  },
  {
    id: 't4',
    dimension: 'temps',
    text: 'Pouvez-vous vous libérer en journée pour des visites ou des rendez-vous artisans ?',
    answers: [
      { text: 'Jamais', score: 0 },
      { text: 'Rarement', score: 25 },
      { text: 'Parfois', score: 50 },
      { text: 'Souvent', score: 75 },
      { text: 'Toujours', score: 100 },
    ],
  },
  {
    id: 't5',
    dimension: 'temps',
    text: 'Êtes-vous prêt à travailler le week-end sur vos projets ?',
    answers: [
      { text: 'Non', score: 0 },
      { text: 'Un peu', score: 50 },
      { text: 'Oui, totalement', score: 100 },
    ],
  },
  {
    id: 't6',
    dimension: 'temps',
    text: 'Quel est votre horizon de temps pour réaliser votre première opération ?',
    answers: [
      { text: 'Plus d\'un an', score: 20 },
      { text: 'Dans les 6 à 12 mois', score: 50 },
      { text: 'Dans les 3 à 6 mois', score: 80 },
      { text: 'Immédiatement', score: 100 },
    ],
  },
  {
    id: 't7',
    dimension: 'temps',
    text: 'Avez-vous des obligations familiales très prenantes ?',
    answers: [
      { text: 'Oui, très', score: 0 },
      { text: 'Moyennement', score: 50 },
      { text: 'Non, peu', score: 100 },
    ],
  },

  // DIMENSION 2 — Capital et financement
  {
    id: 'c1',
    dimension: 'capital',
    text: 'Quel apport personnel pouvez-vous mobiliser ?',
    answers: [
      { text: 'Moins de 10k', score: 10 },
      { text: '10k – 30k', score: 30 },
      { text: '30k – 70k', score: 60 },
      { text: '70k – 150k', score: 80 },
      { text: '150k +', score: 100 },
    ],
  },
  {
    id: 'c2',
    dimension: 'capital',
    text: 'Avez-vous une relation bancaire solide ?',
    answers: [
      { text: 'Non', score: 0 },
      { text: 'Moyenne', score: 50 },
      { text: 'Oui', score: 100 },
    ],
  },
  {
    id: 'c3',
    dimension: 'capital',
    text: 'Avez-vous accès à des investisseurs ou associés potentiels ?',
    answers: [
      { text: 'Non', score: 0 },
      { text: 'Peut-être', score: 50 },
      { text: 'Oui', score: 100 },
    ],
  },
  {
    id: 'c4',
    dimension: 'capital',
    text: 'Quelle est votre capacité d\'endettement actuelle ?',
    answers: [
      { text: 'Nulle', score: 0 },
      { text: 'Faible', score: 30 },
      { text: 'Moyenne', score: 60 },
      { text: 'Forte', score: 100 },
    ],
  },
  {
    id: 'c5',
    dimension: 'capital',
    text: 'Avez-vous déjà obtenu un crédit immobilier ?',
    answers: [
      { text: 'Non', score: 0 },
      { text: 'Oui, pour ma RP', score: 50 },
      { text: 'Oui, pour de l\'investissement', score: 100 },
    ],
  },
  {
    id: 'c6',
    dimension: 'capital',
    text: 'Êtes-vous propriétaire de votre résidence principale ?',
    answers: [
      { text: 'Non', score: 0 },
      { text: 'En cours de remboursement', score: 50 },
      { text: 'Oui, totalement payée', score: 100 },
    ],
  },
  {
    id: 'c7',
    dimension: 'capital',
    text: 'Quel est votre niveau d\'épargne de précaution (hors apport) ?',
    answers: [
      { text: 'Aucun', score: 0 },
      { text: '1 à 3 mois', score: 30 },
      { text: '3 à 6 mois', score: 60 },
      { text: 'Plus de 6 mois', score: 100 },
    ],
  },

  // DIMENSION 3 — Compétences
  {
    id: 'co1',
    dimension: 'competences',
    text: 'Savez-vous analyser un bien immobilier (points forts/faibles) ?',
    answers: [
      { text: 'Non', score: 0 },
      { text: 'Un peu', score: 50 },
      { text: 'Oui', score: 100 },
    ],
  },
  {
    id: 'co2',
    dimension: 'competences',
    text: 'Savez-vous calculer une rentabilité et une marge de marchand de biens ?',
    answers: [
      { text: 'Non', score: 0 },
      { text: 'Un peu', score: 50 },
      { text: 'Oui', score: 100 },
    ],
  },
  {
    id: 'co3',
    dimension: 'competences',
    text: 'Savez-vous estimer des travaux de rénovation ?',
    answers: [
      { text: 'Non', score: 0 },
      { text: 'Approximativement', score: 50 },
      { text: 'Bien', score: 100 },
    ],
  },
  {
    id: 'co4',
    dimension: 'competences',
    text: 'Connaissez-vous la fiscalité du marchand de biens (TVA, IS, etc.) ?',
    answers: [
      { text: 'Non', score: 0 },
      { text: 'Les bases', score: 50 },
      { text: 'Oui, je maîtrise', score: 100 },
    ],
  },
  {
    id: 'co5',
    dimension: 'competences',
    text: 'Avez-vous des notions en urbanisme (PLU, permis de construire, DP) ?',
    answers: [
      { text: 'Non', score: 0 },
      { text: 'Quelques notions', score: 50 },
      { text: 'Oui, je suis à l\'aise', score: 100 },
    ],
  },
  {
    id: 'co6',
    dimension: 'competences',
    text: 'Savez-vous négocier le prix d\'un bien immobilier ?',
    answers: [
      { text: 'Non', score: 0 },
      { text: 'Moyennement', score: 50 },
      { text: 'Oui, très bien', score: 100 },
    ],
  },
  {
    id: 'co7',
    dimension: 'competences',
    text: 'Êtes-vous à l\'aise avec la gestion administrative et juridique ?',
    answers: [
      { text: 'Non', score: 0 },
      { text: 'Je me débrouille', score: 50 },
      { text: 'Oui', score: 100 },
    ],
  },

  // DIMENSION 4 — Réseau
  {
    id: 'r1',
    dimension: 'reseau',
    text: 'Connaissez-vous des agents immobiliers dans votre secteur cible ?',
    answers: [
      { text: 'Aucun', score: 0 },
      { text: '1 ou 2', score: 50 },
      { text: 'Plusieurs', score: 100 },
    ],
  },
  {
    id: 'r2',
    dimension: 'reseau',
    text: 'Connaissez-vous des artisans fiables ?',
    answers: [
      { text: 'Non', score: 0 },
      { text: 'Quelques-uns', score: 50 },
      { text: 'Plusieurs équipes', score: 100 },
    ],
  },
  {
    id: 'r3',
    dimension: 'reseau',
    text: 'Avez-vous accès à des opportunités off-market ?',
    answers: [
      { text: 'Non', score: 0 },
      { text: 'Parfois', score: 50 },
      { text: 'Oui, régulièrement', score: 100 },
    ],
  },
  {
    id: 'r4',
    dimension: 'reseau',
    text: 'Avez-vous un notaire réactif et de bon conseil ?',
    answers: [
      { text: 'Non', score: 0 },
      { text: 'J\'en connais un', score: 50 },
      { text: 'Oui, un excellent partenaire', score: 100 },
    ],
  },
  {
    id: 'r5',
    dimension: 'reseau',
    text: 'Connaissez-vous un courtier en financement ou un banquier pro ?',
    answers: [
      { text: 'Non', score: 0 },
      { text: 'Oui', score: 100 },
    ],
  },
  {
    id: 'r6',
    dimension: 'reseau',
    text: 'Êtes-vous en contact avec d\'autres investisseurs ou marchands de biens ?',
    answers: [
      { text: 'Non', score: 0 },
      { text: 'Quelques-uns', score: 50 },
      { text: 'J\'ai un réseau solide', score: 100 },
    ],
  },
  {
    id: 'r7',
    dimension: 'reseau',
    text: 'Connaissez-vous un expert-comptable spécialisé en immobilier ?',
    answers: [
      { text: 'Non', score: 0 },
      { text: 'Oui', score: 100 },
    ],
  },

  // DIMENSION 5 — Expérience immobilière
  {
    id: 'e1',
    dimension: 'experience',
    text: 'Combien de biens possédez-vous actuellement ?',
    answers: [
      { text: 'Aucun', score: 0 },
      { text: '1 à 2', score: 40 },
      { text: '3 à 5', score: 70 },
      { text: '5+', score: 100 },
    ],
  },
  {
    id: 'e2',
    dimension: 'experience',
    text: 'Avez-vous déjà suivi et géré des travaux ?',
    answers: [
      { text: 'Non', score: 0 },
      { text: 'Petits travaux', score: 50 },
      { text: 'Rénovation lourde', score: 100 },
    ],
  },
  {
    id: 'e3',
    dimension: 'experience',
    text: 'Avez-vous déjà revendu un bien immobilier ?',
    answers: [
      { text: 'Non', score: 0 },
      { text: 'Oui, ma RP', score: 50 },
      { text: 'Oui, un investissement', score: 100 },
    ],
  },
  {
    id: 'e4',
    dimension: 'experience',
    text: 'Avez-vous déjà fait une opération d\'achat-revente (même en tant que particulier) ?',
    answers: [
      { text: 'Non', score: 0 },
      { text: 'Oui', score: 100 },
    ],
  },
  {
    id: 'e5',
    dimension: 'experience',
    text: 'Avez-vous déjà divisé un bien (officiellement ou non) ?',
    answers: [
      { text: 'Non', score: 0 },
      { text: 'Oui', score: 100 },
    ],
  },
  {
    id: 'e6',
    dimension: 'experience',
    text: 'Avez-vous déjà géré un litige immobilier (artisan, locataire, copropriété) ?',
    answers: [
      { text: 'Non', score: 0 },
      { text: 'Oui', score: 100 },
    ],
  },
  {
    id: 'e7',
    dimension: 'experience',
    text: 'Quelle est votre expérience en investissement locatif ?',
    answers: [
      { text: 'Aucune', score: 0 },
      { text: 'Un peu', score: 50 },
      { text: 'Expérimenté', score: 100 },
    ],
  },

  // DIMENSION 6 — Tolérance au risque
  {
    id: 'ri1',
    dimension: 'risque',
    text: 'Comment réagissez-vous face au risque financier ?',
    answers: [
      { text: 'Très mal', score: 0 },
      { text: 'Moyen', score: 50 },
      { text: 'Bien', score: 100 },
    ],
  },
  {
    id: 'ri2',
    dimension: 'risque',
    text: 'Seriez-vous prêt à perdre 20 000€ sur un projet d\'apprentissage ?',
    answers: [
      { text: 'Non', score: 0 },
      { text: 'Difficilement', score: 50 },
      { text: 'Oui', score: 100 },
    ],
  },
  {
    id: 'ri3',
    dimension: 'risque',
    text: 'Êtes-vous à l’aise avec l’incertitude et les imprévus ?',
    answers: [
      { text: 'Non', score: 0 },
      { text: 'Moyennement', score: 50 },
      { text: 'Oui', score: 100 },
    ],
  },
  {
    id: 'ri4',
    dimension: 'risque',
    text: 'Si un chantier prend 3 mois de retard, comment réagissez-vous ?',
    answers: [
      { text: 'Panique totale', score: 0 },
      { text: 'Stress mais je gère', score: 50 },
      { text: 'Je trouve des solutions calmement', score: 100 },
    ],
  },
  {
    id: 'ri5',
    dimension: 'risque',
    text: 'Êtes-vous prêt à vous endetter fortement pour un projet très rentable ?',
    answers: [
      { text: 'Non', score: 0 },
      { text: 'Avec prudence', score: 50 },
      { text: 'Oui', score: 100 },
    ],
  },
  {
    id: 'ri6',
    dimension: 'risque',
    text: 'Comment prenez-vous vos décisions d\'investissement ?',
    answers: [
      { text: 'Je n\'arrive pas à me lancer', score: 0 },
      { text: 'J\'analyse longuement', score: 50 },
      { text: 'Je décide vite avec les bons chiffres', score: 100 },
    ],
  },
];
