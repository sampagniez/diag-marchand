import { GoogleGenAI } from '@google/genai';
import { Dimension } from './data';

export interface Synthesis {
  profil: {
    nom: string;
    description: string;
    strategie: string[];
  };
  planAction: {
    etape1: string;
    etape2: string;
    etape3: string;
    etape4: string;
  };
}

export async function generateSynthesis(scores: Record<Dimension, number>): Promise<Synthesis> {
  try {
    const response = await fetch('/api/generate-synthesis', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(scores),
    });

    if (response.ok) {
      return await response.json() as Synthesis;
    } else {
      console.error("Erreur de réponse de l'API locale:", await response.text());
    }
  } catch (error) {
    console.error("Erreur lors de la génération IA:", error);
  }

  return getDefaultSynthesis(scores);
}

function getDefaultSynthesis(scores: Record<Dimension, number>): Synthesis {
  return {
    profil: {
      nom: "Analyse Désactivée",
      description: "Pour obtenir votre analyse détaillée, veuillez configurer une clé API.",
      strategie: ["Ajoutez une clé API Gemini pour débloquer l'analyse de votre profil."]
    },
    planAction: {
      etape1: "Sélectionnez un ou deux quartiers à analyser.",
      etape2: "Visitez 10 propriétés pour comprendre le marché.",
      etape3: "Sélectionnez les 3 biens les plus rentables potentiels.",
      etape4: "Montez un dossier de financement pour la meilleure opportunité."
    }
  };
}
